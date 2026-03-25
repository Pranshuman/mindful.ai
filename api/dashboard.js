const {
  extractBearerToken,
  fetchEpisodes,
  isReleasedEpisode,
  normalizeProfile,
  recommendationForEpisode,
  sendJson,
  supabaseRestRequest,
  userEmailFromToken,
  userIdFromToken
} = require('./_shared');

async function fetchProfileForUser({ token, userId }) {
  const primary = await supabaseRestRequest({
    env: process.env,
    token,
    path: `/rest/v1/user_profiles?select=id,email,full_name,preferred_language,preferred_episode_length_min,goals,preferred_tags,preferred_time_slot,onboarding_completed&id=eq.${encodeURIComponent(
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
        path: `/rest/v1/user_profiles?select=id,email,full_name,preferred_language,preferred_episode_length_min,goals,onboarding_completed&id=eq.${encodeURIComponent(
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

  try {
    const episodesResult = await fetchEpisodes(process.env);
    const episodes = episodesResult.ok ? episodesResult.episodes : [];
    const released = episodes.filter((episode) => isReleasedEpisode(episode));
    const upcoming = episodes.filter((episode) => !isReleasedEpisode(episode));
    const latestRelease = released.length
      ? [...released].sort((a, b) => new Date(b.releaseAt) - new Date(a.releaseAt))[0]
      : null;

    const token = extractBearerToken(req);
    const userId = userIdFromToken(token);
    if (!token || !userId) {
      sendJson(res, 200, {
        authenticated: false,
        stats: {
          released_count: released.length,
          upcoming_count: upcoming.length,
          saved_count: 0,
          continue_listening_count: 0,
          play_starts_count: 0
        },
        latest_release: latestRelease,
        featured: null,
        profile: normalizeProfile({})
      });
      return;
    }

    const [profileRaw, savedRes, progressRes] = await Promise.all([
      fetchProfileForUser({ token, userId }),
      supabaseRestRequest({
        env: process.env,
        token,
        path: '/rest/v1/user_saved_episodes?select=episode_id'
      }),
      supabaseRestRequest({
        env: process.env,
        token,
        path: '/rest/v1/user_episode_progress?select=episode_id,progress_percent,play_count,last_listened_at'
      })
    ]);

    const savedRows = Array.isArray(savedRes.data) ? savedRes.data : [];
    const progressRows = Array.isArray(progressRes.data) ? progressRes.data : [];
    const playStartsCount = progressRows.reduce((sum, row) => sum + Number(row.play_count || 0), 0);
    const continueListeningCount = progressRows.filter((row) => {
      const p = Number(row.progress_percent || 0);
      return p > 0 && p < 100;
    }).length;

    const profile = normalizeProfile(profileRaw || {});
    const featured = released
      .map((episode) => recommendationForEpisode(episode, profile))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.episode.releaseAt) - new Date(a.episode.releaseAt);
      })[0] || null;

    sendJson(res, 200, {
      authenticated: true,
      user: {
        id: userId,
        email: profileRaw?.email || userEmailFromToken(token) || '',
        full_name: profileRaw?.full_name || ''
      },
      profile,
      stats: {
        released_count: released.length,
        upcoming_count: upcoming.length,
        saved_count: savedRows.length,
        continue_listening_count: continueListeningCount,
        play_starts_count: playStartsCount
      },
      latest_release: latestRelease,
      featured
    });
  } catch (error) {
    sendJson(res, 200, {
      authenticated: false,
      stats: {
        released_count: 0,
        upcoming_count: 0,
        saved_count: 0,
        continue_listening_count: 0,
        play_starts_count: 0
      },
      latest_release: null,
      featured: null,
      profile: normalizeProfile({}),
      reason: 'request_failed',
      details: error.message
    });
  }
};

