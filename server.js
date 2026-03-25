const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const ENV_PATH = path.join(ROOT, '.env');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

loadEnvFile();

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const fallback = path.join(ROOT, 'index.html');
        fs.readFile(fallback, (fallbackErr, fallbackData) => {
          if (fallbackErr) {
            sendJson(res, 500, { error: 'Failed to load app shell' });
            return;
          }
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store'
          });
          res.end(fallbackData);
        });
        return;
      }
      sendJson(res, 500, { error: 'Failed to read file' });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(data);
  });
}

function hasLocalApiHandler(apiPathname) {
  const apiName = apiPathname.replace(/^\/api\//, '');
  if (!apiName || apiName.includes('/') || apiName.includes('\\')) return false;
  const candidate = path.join(ROOT, 'api', `${apiName}.js`);
  return fs.existsSync(candidate);
}

async function runLocalApiHandler(req, res, apiPathname) {
  const apiName = apiPathname.replace(/^\/api\//, '');
  const handlerPath = path.join(ROOT, 'api', `${apiName}.js`);
  delete require.cache[require.resolve(handlerPath)];
  const handler = require(handlerPath);
  await handler(req, res);
}

function loadEnvFile() {
  try {
    const raw = fs.readFileSync(ENV_PATH, 'utf8');
    const lines = raw.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const equalsIndex = trimmed.indexOf('=');
      if (equalsIndex === -1) continue;

      const key = trimmed.slice(0, equalsIndex).trim();
      if (!key) continue;

      let value = trimmed.slice(equalsIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('Could not read .env file:', error.message);
    }
  }
}

function pickSupabaseKey() {
  return (
    process.env.SUPABASE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ''
  );
}

function parseJwtPayload(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
}

function pickSupabaseAnonKey() {
  if (process.env.SUPABASE_ANON_KEY) {
    return process.env.SUPABASE_ANON_KEY;
  }

  const fallback = process.env.SUPABASE_KEY || '';
  if (!fallback) return '';

  try {
    const payload = parseJwtPayload(fallback);
    if (payload?.role === 'anon') {
      return fallback;
    }
  } catch (_error) {
    return '';
  }

  return '';
}

function normalizeEpisodeRow(row, index) {
  const fallbackReleaseAt = new Date(
    Date.UTC(2026, 2, 3, 2, 30, 0) + index * 2 * 24 * 60 * 60 * 1000
  ).toISOString();

  const releaseAt = row.release_at || row.releaseAt || fallbackReleaseAt;

  const languageVariantsFromColumns = {
    English: {
      summary: row.summary_en || row.summary || '',
      transcript: row.transcript_en || row.transcript || ''
    },
    Hindi: {
      summary: row.summary_hi || row.summary_hindi || row.summary || '',
      transcript: row.transcript_hi || row.transcript_hindi || row.transcript || ''
    },
    Hinglish: {
      summary: row.summary_hinglish || row.summary_hi_en || row.summary || '',
      transcript: row.transcript_hinglish || row.transcript_hi_en || row.transcript || ''
    }
  };

  const variants =
    row.variants && typeof row.variants === 'object'
      ? row.variants
      : languageVariantsFromColumns;

  return {
    id: String(row.id || `episode-${index + 1}`),
    title: String(row.title || `Episode ${index + 1}`),
    durationMin: Number(row.duration_min ?? row.durationMin ?? 5),
    category: String(row.category || 'General'),
    tags: Array.isArray(row.tags)
      ? row.tags.map((tag) => String(tag))
      : typeof row.tags === 'string'
        ? row.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    source: String(row.source || row.source_note || 'Inspired by Bhagavad Gita'),
    reflection: String(row.reflection || row.reflection_prompt || 'What stands out for you from this episode?'),
    releaseAt,
    variants
  };
}

async function fetchEpisodesFromSupabase() {
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  const supabaseKey = pickSupabaseKey();
  const table = process.env.SUPABASE_EPISODES_TABLE || 'episodes';

  if (!supabaseUrl || !supabaseKey) {
    return {
      ok: false,
      reason: 'missing_config',
      episodes: []
    };
  }

  const endpoint = `${supabaseUrl}/rest/v1/${encodeURIComponent(table)}?select=*&order=release_at.asc.nullslast`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    const body = await response.text();
    return {
      ok: false,
      reason: 'supabase_error',
      details: body.slice(0, 240),
      episodes: []
    };
  }

  const rows = await response.json();
  if (!Array.isArray(rows)) {
    return {
      ok: false,
      reason: 'invalid_payload',
      episodes: []
    };
  }

  return {
    ok: true,
    reason: 'ok',
    episodes: rows.map(normalizeEpisodeRow)
  };
}

function getPublicAuthConfig() {
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  const supabaseAnonKey = pickSupabaseAnonKey();

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      enabled: false,
      reason: 'missing_public_auth_config'
    };
  }

  return {
    enabled: true,
    supabaseUrl,
    supabaseAnonKey
  };
}

const server = http.createServer((req, res) => {
  const origin = `http://${req.headers.host || `${HOST}:${PORT}`}`;
  const url = new URL(req.url, origin);

  if (url.pathname === '/api/health') {
    sendJson(res, 200, {
      status: 'ok',
      app: 'GitaFlow Local MVP',
      runtime: 'node',
      now: new Date().toISOString()
    });
    return;
  }

  if (url.pathname === '/api/episodes') {
    fetchEpisodesFromSupabase()
      .then((result) => {
        if (!result.ok) {
          sendJson(res, 200, {
            source: 'local',
            reason: result.reason,
            episodes: []
          });
          return;
        }

        sendJson(res, 200, {
          source: 'supabase',
          episodes: result.episodes
        });
      })
      .catch((error) => {
        sendJson(res, 200, {
          source: 'local',
          reason: 'request_failed',
          details: error.message,
          episodes: []
        });
      });
    return;
  }

  if (url.pathname === '/api/auth-config') {
    sendJson(res, 200, getPublicAuthConfig());
    return;
  }

  if (url.pathname.startsWith('/api/') && hasLocalApiHandler(url.pathname)) {
    runLocalApiHandler(req, res, url.pathname).catch((error) => {
      sendJson(res, 500, {
        error: 'Local API handler failed',
        details: error.message
      });
    });
    return;
  }

  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.normalize(path.join(ROOT, requestedPath));

  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { error: 'Forbidden path' });
    return;
  }

  sendFile(res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`GitaFlow app running at http://${HOST}:${PORT}`);
  console.log(`Serving from ${ROOT}`);
});
