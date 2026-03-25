const {
  extractBearerToken,
  readJsonBody,
  sendJson,
  supabaseRestRequest,
  userIdFromToken
} = require('./_shared');

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
      const [savedRes, progressRes] = await Promise.all([
        supabaseRestRequest({
          env: process.env,
          token,
          path: '/rest/v1/user_saved_episodes?select=episode_id,saved_at&order=saved_at.desc'
        }),
        supabaseRestRequest({
          env: process.env,
          token,
          path: '/rest/v1/user_episode_progress?select=episode_id,last_listened_at,progress_percent&order=last_listened_at.desc&limit=24'
        })
      ]);

      const savedRows = Array.isArray(savedRes.data) ? savedRes.data : [];
      const progressRows = Array.isArray(progressRes.data) ? progressRes.data : [];
      const savedIds = savedRows.map((row) => String(row.episode_id)).filter(Boolean);
      const recentIds = progressRows
        .map((row) => String(row.episode_id))
        .filter(Boolean)
        .filter((id, index, list) => list.indexOf(id) === index)
        .slice(0, 12);

      sendJson(res, 200, {
        saved_ids: savedIds,
        recent_ids: recentIds,
        saved_count: savedIds.length
      });
    } catch (error) {
      sendJson(res, 200, {
        saved_ids: [],
        recent_ids: [],
        saved_count: 0,
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
  const saved = Boolean(body.saved);
  if (!episodeId) {
    sendJson(res, 400, { error: 'episode_id is required' });
    return;
  }

  try {
    if (saved) {
      const upsert = await supabaseRestRequest({
        env: process.env,
        token,
        method: 'POST',
        path: '/rest/v1/user_saved_episodes',
        prefer: 'resolution=merge-duplicates,return=minimal',
        body: {
          user_id: userId,
          episode_id: episodeId
        }
      });
      if (!upsert.ok) {
        sendJson(res, 200, {
          ok: false,
          reason: upsert.reason,
          details: (upsert.text || '').slice(0, 240)
        });
        return;
      }
    } else {
      const remove = await supabaseRestRequest({
        env: process.env,
        token,
        method: 'DELETE',
        path: `/rest/v1/user_saved_episodes?episode_id=eq.${encodeURIComponent(episodeId)}`
      });
      if (!remove.ok) {
        sendJson(res, 200, {
          ok: false,
          reason: remove.reason,
          details: (remove.text || '').slice(0, 240)
        });
        return;
      }
    }

    sendJson(res, 200, {
      ok: true,
      episode_id: episodeId,
      saved
    });
  } catch (error) {
    sendJson(res, 200, {
      ok: false,
      reason: 'request_failed',
      details: error.message
    });
  }
};

