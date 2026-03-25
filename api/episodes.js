const { fetchEpisodes, sendJson } = require('./_shared');

module.exports = async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const result = await fetchEpisodes(process.env);
    if (!result.ok) {
      sendJson(res, 200, {
        source: 'local',
        reason: result.reason,
        details: result.details || '',
        episodes: []
      });
      return;
    }

    sendJson(res, 200, {
      source: 'supabase',
      episodes: result.episodes
    });
  } catch (error) {
    sendJson(res, 200, {
      source: 'local',
      reason: 'request_failed',
      details: error.message,
      episodes: []
    });
  }
};
