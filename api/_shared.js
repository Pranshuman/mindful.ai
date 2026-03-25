function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function parseJwtPayload(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
}

function pickSupabaseKey(env = process.env) {
  return env.SUPABASE_KEY || env.SUPABASE_ANON_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '';
}

function pickSupabaseAnonKey(env = process.env) {
  if (env.SUPABASE_ANON_KEY) {
    return env.SUPABASE_ANON_KEY;
  }

  const fallback = env.SUPABASE_KEY || '';
  if (!fallback) return '';

  try {
    const payload = parseJwtPayload(fallback);
    if (payload && payload.role === 'anon') {
      return fallback;
    }
  } catch (_error) {
    return '';
  }

  return '';
}

function supabaseUrl(env = process.env) {
  return String(env.SUPABASE_URL || '').replace(/\/+$/, '');
}

function extractBearerToken(req) {
  const header = req?.headers?.authorization || req?.headers?.Authorization || '';
  const value = String(header || '').trim();
  if (!value.toLowerCase().startsWith('bearer ')) return '';
  return value.slice(7).trim();
}

function userIdFromToken(token) {
  try {
    const payload = parseJwtPayload(token);
    return payload?.sub ? String(payload.sub) : '';
  } catch (_error) {
    return '';
  }
}

function userEmailFromToken(token) {
  try {
    const payload = parseJwtPayload(token);
    return payload?.email ? String(payload.email) : '';
  } catch (_error) {
    return '';
  }
}

function chooseApiKeyForUser(env = process.env) {
  return pickSupabaseAnonKey(env) || pickSupabaseKey(env);
}

function buildHeaders({ env = process.env, token = '', prefer = '', contentType = 'application/json' } = {}) {
  const apiKey = chooseApiKeyForUser(env);
  const headers = {
    Accept: 'application/json'
  };

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (apiKey) {
    headers.apikey = apiKey;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (prefer) {
    headers.Prefer = prefer;
  }

  return headers;
}

async function readJsonBody(req) {
  if (req?.body && typeof req.body === 'object') {
    return req.body;
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (_error) {
        resolve(null);
      }
    });
    req.on('error', () => resolve(null));
  });
}

async function supabaseRestRequest({
  env = process.env,
  token = '',
  path = '',
  method = 'GET',
  body = null,
  prefer = '',
  contentType = 'application/json'
} = {}) {
  const url = supabaseUrl(env);
  const apiKey = chooseApiKeyForUser(env);
  if (!url || !apiKey) {
    return {
      ok: false,
      status: 200,
      reason: 'missing_config',
      data: null,
      text: ''
    };
  }

  const endpoint = `${url}${path}`;
  const response = await fetch(endpoint, {
    method,
    headers: buildHeaders({ env, token, prefer, contentType }),
    body: body == null ? undefined : typeof body === 'string' ? body : JSON.stringify(body)
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_error) {
    data = null;
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    text,
    reason: response.ok ? 'ok' : 'supabase_error'
  };
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
    reflection: String(
      row.reflection || row.reflection_prompt || 'What stands out for you from this episode?'
    ),
    releaseAt,
    variants
  };
}

const GOAL_TAG_MAP = {
  'Reduce Stress': ['stress', 'anxiety', 'peace', 'balance'],
  'Improve Focus': ['focus', 'mind', 'discipline'],
  'Better Decisions': ['decision', 'duty', 'clarity'],
  'Build Discipline': ['discipline', 'work', 'focus'],
  'Sleep Better': ['sleep', 'peace', 'anxiety'],
  'Find Purpose': ['purpose', 'identity', 'duty']
};

const TIME_SLOT_TAG_MAP = {
  Morning: ['discipline', 'focus', 'purpose'],
  Afternoon: ['work', 'stress', 'clarity', 'decision'],
  Evening: ['relationships', 'balance', 'peace'],
  Night: ['sleep', 'anxiety', 'overthinking', 'peace']
};

function normalizeChoiceList(values, allowed, maxCount) {
  if (!Array.isArray(values)) return [];
  const allowedSet = new Set(allowed);
  const deduped = [];
  for (const raw of values) {
    const value = String(raw || '').trim();
    if (!value || deduped.includes(value) || !allowedSet.has(value)) continue;
    deduped.push(value);
    if (maxCount && deduped.length >= maxCount) break;
  }
  return deduped;
}

function normalizeTagList(values, maxCount = 3) {
  if (!Array.isArray(values)) return [];
  const deduped = [];
  for (const raw of values) {
    const value = String(raw || '').trim().toLowerCase();
    if (!value || deduped.includes(value)) continue;
    deduped.push(value);
    if (deduped.length >= maxCount) break;
  }
  return deduped;
}

function normalizeProfile(raw = {}) {
  const languageOptions = ['English', 'Hindi', 'Hinglish'];
  const lengthOptions = [3, 5, 10];
  const goalOptions = [
    'Reduce Stress',
    'Improve Focus',
    'Better Decisions',
    'Build Discipline',
    'Sleep Better',
    'Find Purpose'
  ];
  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

  return {
    preferred_language: languageOptions.includes(raw.preferred_language) ? raw.preferred_language : null,
    preferred_episode_length_min: lengthOptions.includes(Number(raw.preferred_episode_length_min))
      ? Number(raw.preferred_episode_length_min)
      : null,
    goals: normalizeChoiceList(raw.goals, goalOptions, 2),
    preferred_tags: normalizeTagList(raw.preferred_tags, 3),
    preferred_time_slot: timeOptions.includes(raw.preferred_time_slot) ? raw.preferred_time_slot : null,
    onboarding_completed: Boolean(raw.onboarding_completed)
  };
}

function countOverlap(baseTags, targetTags) {
  const targetSet = new Set((targetTags || []).map((tag) => String(tag || '').toLowerCase()));
  return (baseTags || []).filter((tag) => targetSet.has(String(tag || '').toLowerCase())).length;
}

function goalTagSet(goals = []) {
  const tags = new Set();
  goals.forEach((goal) => {
    (GOAL_TAG_MAP[goal] || []).forEach((tag) => tags.add(tag));
  });
  return tags;
}

function recommendationForEpisode(episode, profile) {
  const normalizedProfile = normalizeProfile(profile);
  const episodeTags = (episode.tags || []).map((tag) => String(tag || '').toLowerCase());

  const topicOverlap = countOverlap(episodeTags, normalizedProfile.preferred_tags);
  const topicScore = Math.min(topicOverlap * 4, 12);

  const goalTags = Array.from(goalTagSet(normalizedProfile.goals));
  const goalOverlap = countOverlap(episodeTags, goalTags);
  const goalScore = Math.min(goalOverlap * 3, 9);

  let durationScore = 0;
  const preferredLength = Number(normalizedProfile.preferred_episode_length_min);
  if (preferredLength && preferredLength === Number(episode.durationMin)) {
    durationScore = 2;
  } else if (preferredLength && Math.abs(preferredLength - Number(episode.durationMin)) <= 2) {
    durationScore = 1;
  }

  const slotTags = TIME_SLOT_TAG_MAP[normalizedProfile.preferred_time_slot] || [];
  const slotOverlap = countOverlap(episodeTags, slotTags);
  const timeScore = slotOverlap > 0 ? 1 : 0;

  let reason = 'Recommended from latest releases';
  if (topicOverlap > 0) {
    reason = `${topicOverlap} topic match${topicOverlap === 1 ? '' : 'es'}`;
  } else if (goalOverlap > 0) {
    reason = 'Aligned with your goals';
  } else if (durationScore === 2) {
    reason = 'Matches your preferred length';
  } else if (timeScore > 0 && normalizedProfile.preferred_time_slot) {
    reason = `Fits your ${normalizedProfile.preferred_time_slot.toLowerCase()} listening`;
  }

  return {
    episode,
    score: topicScore + goalScore + durationScore + timeScore,
    reason
  };
}

function isReleasedEpisode(episode, now = new Date()) {
  const releaseAt = new Date(episode.releaseAt);
  return !Number.isNaN(releaseAt.getTime()) && releaseAt.getTime() <= now.getTime();
}

async function fetchEpisodes(env = process.env) {
  const table = env.SUPABASE_EPISODES_TABLE || 'episodes';
  const response = await supabaseRestRequest({
    env,
    path: `/rest/v1/${encodeURIComponent(table)}?select=*&order=release_at.asc.nullslast`
  });

  if (!response.ok) {
    return {
      ok: false,
      reason: response.reason,
      details: response.text ? response.text.slice(0, 240) : '',
      episodes: []
    };
  }

  if (!Array.isArray(response.data)) {
    return {
      ok: false,
      reason: 'invalid_payload',
      episodes: []
    };
  }

  return {
    ok: true,
    reason: 'ok',
    episodes: response.data.map(normalizeEpisodeRow)
  };
}

module.exports = {
  buildHeaders,
  countOverlap,
  extractBearerToken,
  fetchEpisodes,
  goalTagSet,
  isReleasedEpisode,
  normalizeProfile,
  normalizeEpisodeRow,
  parseJwtPayload,
  pickSupabaseAnonKey,
  pickSupabaseKey,
  readJsonBody,
  recommendationForEpisode,
  sendJson,
  supabaseRestRequest,
  supabaseUrl,
  userEmailFromToken,
  userIdFromToken
};
