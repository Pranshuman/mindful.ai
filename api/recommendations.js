const {
  extractBearerToken,
  fetchEpisodes,
  isReleasedEpisode,
  normalizeProfile,
  recommendationForEpisode,
  sendJson,
  supabaseRestRequest,
  userIdFromToken
} = require('./_shared');

async function fetchProfileForUser({ token, userId }) {
  const primary = await supabaseRestRequest({
    env: process.env,
    token,
    path: `/rest/v1/user_profiles?select=preferred_language,preferred_episode_length_min,goals,preferred_tags,preferred_time_slot,onboarding_completed&id=eq.${encodeURIComponent(
      userId
    )}&limit=1`
  });

  if (primary.ok && Array.isArray(primary.data) && primary.data[0]) {
    return primary.data[0];
  }

  if (!primary.ok) {
    const message = `${primary.text || ''}`.toLowerCase();
    if (message.includes('preferred_tags') || message.includes('preferred_time_slot')) {
      const legacy = await supabaseRestRequest({
        env: process.env,
        token,
        path: `/rest/v1/user_profiles?select=preferred_language,preferred_episode_length_min,goals,onboarding_completed&id=eq.${encodeURIComponent(
          userId
        )}&limit=1`
      });
      if (legacy.ok && Array.isArray(legacy.data) && legacy.data[0]) {
        return {
          ...legacy.data[0],
          preferred_tags: [],
          preferred_time_slot: null
        };
      }
    }
  }

  return null;
}

module.exports = async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const token = extractBearerToken(req);
  const userId = userIdFromToken(token);
  if (!token || !userId) {
    sendJson(res, 401, { error: 'Missing or invalid bearer token' });
    return;
  }

  try {
    const [episodesResult, profileRaw] = await Promise.all([
      fetchEpisodes(process.env),
      fetchProfileForUser({ token, userId })
    ]);

    if (!episodesResult.ok) {
      sendJson(res, 200, {
        items: [],
        profile: normalizeProfile(profileRaw || {}),
        source: 'local',
        reason: episodesResult.reason
      });
      return;
    }

    const profile = normalizeProfile(profileRaw || {});
    const released = episodesResult.episodes.filter((episode) => isReleasedEpisode(episode));
    const items = released
      .map((episode) => recommendationForEpisode(episode, profile))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.episode.releaseAt) - new Date(a.episode.releaseAt);
      })
      .slice(0, 6);

    sendJson(res, 200, {
      source: episodesResult.ok ? 'supabase' : 'local',
      profile,
      items
    });
  } catch (error) {
    sendJson(res, 200, {
      items: [],
      source: 'local',
      reason: 'request_failed',
      details: error.message
    });
  }
};

