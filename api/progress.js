const {
  extractBearerToken,
  readJsonBody,
  sendJson,
  supabaseRestRequest,
  userIdFromToken
} = require('./_shared');

function clampPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

module.exports = async function handler(req, res) {
  const method = req.method || 'GET';
  if (!['GET', 'POST'].includes(method)) {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const token = extractBearerToken(req);
  const userId = userIdFromToken(token);
  if (!token || !userId) {
    sendJson(res, 401, { error: 'Missing or invalid bearer token' });
    return;
  }

  if (method === 'GET') {
    try {
      const response = await supabaseRestRequest({
        env: process.env,
        token,
        path: '/rest/v1/user_episode_progress?select=episode_id,progress_percent,last_position_sec,play_count,last_listened_at,completed_at&order=last_listened_at.desc'
      });

      sendJson(res, 200, {
        items: Array.isArray(response.data) ? response.data : [],
        source: response.ok ? 'supabase' : 'local',
        reason: response.ok ? 'ok' : response.reason
      });
    } catch (error) {
      sendJson(res, 200, {
        items: [],
        source: 'local',
        reason: 'request_failed',
        details: error.message
      });
    }
    return;
  }

  const body = await readJsonBody(req);
  if (!body || typeof body !== 'object') {
    sendJson(res, 400, { error: 'Invalid JSON body' });
    return;
  }

  const episodeId = String(body.episode_id || body.episodeId || '').trim();
  if (!episodeId) {
    sendJson(res, 400, { error: 'episode_id is required' });
    return;
  }

  const percent = clampPercent(body.progress_percent ?? body.percent ?? 0);
  const lastPosition = Math.max(
    0,
    Math.floor(Number(body.last_position_sec ?? body.lastPositionSec ?? 0) || 0)
  );
  const event = String(body.event || '').trim();

  try {
    let playCount = 0;
    const existing = await supabaseRestRequest({
      env: process.env,
      token,
      path: `/rest/v1/user_episode_progress?select=play_count&episode_id=eq.${encodeURIComponent(
        episodeId
      )}&limit=1`
    });
    if (existing.ok && Array.isArray(existing.data) && existing.data[0]) {
      playCount = Number(existing.data[0].play_count || 0);
    }
    if (event === 'start') {
      playCount += 1;
    }

    const payload = {
      user_id: userId,
      episode_id: episodeId,
      progress_percent: percent,
      last_position_sec: lastPosition,
      play_count: playCount,
      last_listened_at: new Date().toISOString(),
      completed_at: percent >= 100 ? new Date().toISOString() : null
    };

    const upsert = await supabaseRestRequest({
      env: process.env,
      token,
      method: 'POST',
      path: '/rest/v1/user_episode_progress',
      prefer: 'resolution=merge-duplicates,return=minimal',
      body: payload
    });

    if (!upsert.ok) {
      sendJson(res, 200, {
        ok: false,
        reason: upsert.reason,
        details: (upsert.text || '').slice(0, 240)
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      episode_id: episodeId,
      progress_percent: percent,
      play_count: playCount
    });
  } catch (error) {
    sendJson(res, 200, {
      ok: false,
      reason: 'request_failed',
      details: error.message
    });
  }
};

