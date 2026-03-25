const {
  extractBearerToken,
  readJsonBody,
  normalizeProfile,
  sendJson,
  supabaseRestRequest,
  userEmailFromToken,
  userIdFromToken
} = require('./_shared');

module.exports = async function handler(req, res) {
  const method = req.method || 'GET';
  if (!['GET', 'POST', 'PATCH'].includes(method)) {
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
    if (method === 'POST' || method === 'PATCH') {
      const body = await readJsonBody(req);
      if (!body || typeof body !== 'object') {
        sendJson(res, 400, { error: 'Invalid JSON body' });
        return;
      }

      const normalized = normalizeProfile(body);
      const payload = {
        id: userId
      };

      const email = String(body.email || '').trim() || userEmailFromToken(token) || '';
      const fullName = String(body.full_name || body.fullName || '').trim();
      const avatarUrl = String(body.avatar_url || body.avatarUrl || '').trim();

      if (email) payload.email = email;
      if (fullName) payload.full_name = fullName;
      if (avatarUrl) payload.avatar_url = avatarUrl;

      if (body.preferred_language != null) payload.preferred_language = normalized.preferred_language;
      if (body.preferred_episode_length_min != null) {
        payload.preferred_episode_length_min = normalized.preferred_episode_length_min;
      }
      if (body.goals != null) payload.goals = normalized.goals;
      if (body.preferred_tags != null) payload.preferred_tags = normalized.preferred_tags;
      if (body.preferred_time_slot != null) {
        payload.preferred_time_slot = normalized.preferred_time_slot;
      }
      if (Object.prototype.hasOwnProperty.call(body, 'onboarding_completed')) {
        payload.onboarding_completed = Boolean(body.onboarding_completed);
      }

      let upsert = await supabaseRestRequest({
        env: process.env,
        token,
        method: 'POST',
        path: '/rest/v1/user_profiles',
        prefer: 'resolution=merge-duplicates,return=representation',
        body: payload
      });

      if (!upsert.ok) {
        const message = `${upsert.text || ''}`.toLowerCase();
        if (message.includes('preferred_tags') || message.includes('preferred_time_slot')) {
          const legacyPayload = {
            id: userId
          };
          if (email) legacyPayload.email = email;
          if (fullName) legacyPayload.full_name = fullName;
          if (avatarUrl) legacyPayload.avatar_url = avatarUrl;
          if (body.preferred_language != null) {
            legacyPayload.preferred_language = normalized.preferred_language;
          }
          if (body.preferred_episode_length_min != null) {
            legacyPayload.preferred_episode_length_min = normalized.preferred_episode_length_min;
          }
          if (body.goals != null) legacyPayload.goals = normalized.goals;
          if (Object.prototype.hasOwnProperty.call(body, 'onboarding_completed')) {
            legacyPayload.onboarding_completed = Boolean(body.onboarding_completed);
          }

          upsert = await supabaseRestRequest({
            env: process.env,
            token,
            method: 'POST',
            path: '/rest/v1/user_profiles',
            prefer: 'resolution=merge-duplicates,return=representation',
            body: legacyPayload
          });
        }
      }

      if (!upsert.ok) {
        sendJson(res, 200, {
          ok: false,
          reason: upsert.reason,
          details: (upsert.text || '').slice(0, 240)
        });
        return;
      }

      const row = Array.isArray(upsert.data) ? upsert.data[0] || null : null;
      sendJson(res, 200, {
        ok: true,
        user: {
          id: userId,
          email: row?.email || email,
          full_name: row?.full_name || fullName,
          avatar_url: row?.avatar_url || avatarUrl || null
        },
        profile: row
          ? {
              ...normalizeProfile(row),
              email: row.email || email,
              full_name: row.full_name || fullName,
              avatar_url: row.avatar_url || avatarUrl || null
            }
          : null
      });
      return;
    }

    let profile = null;
    const primary = await supabaseRestRequest({
      env: process.env,
      token,
      path: `/rest/v1/user_profiles?select=id,email,full_name,avatar_url,preferred_language,preferred_episode_length_min,goals,preferred_tags,preferred_time_slot,onboarding_completed&id=eq.${encodeURIComponent(
        userId
      )}&limit=1`
    });

    if (primary.ok && Array.isArray(primary.data) && primary.data[0]) {
      profile = primary.data[0];
    } else if (!primary.ok) {
      const message = `${primary.text || ''}`.toLowerCase();
      if (message.includes('preferred_tags') || message.includes('preferred_time_slot')) {
        const legacy = await supabaseRestRequest({
          env: process.env,
          token,
          path: `/rest/v1/user_profiles?select=id,email,full_name,avatar_url,preferred_language,preferred_episode_length_min,goals,onboarding_completed&id=eq.${encodeURIComponent(
            userId
          )}&limit=1`
        });
        if (legacy.ok && Array.isArray(legacy.data) && legacy.data[0]) {
          profile = {
            ...legacy.data[0],
            preferred_tags: [],
            preferred_time_slot: null
          };
        }
      }
    }

    const fullName = profile?.full_name || '';
    const email = profile?.email || userEmailFromToken(token) || '';
    sendJson(res, 200, {
      user: {
        id: userId,
        email,
        full_name: fullName,
        avatar_url: profile?.avatar_url || null
      },
      profile: profile
        ? {
            ...normalizeProfile(profile),
            email: profile.email || email,
            full_name: profile.full_name || fullName,
            avatar_url: profile.avatar_url || null
          }
        : null
    });
  } catch (error) {
    sendJson(res, 200, {
      user: {
        id: userId,
        email: userEmailFromToken(token) || '',
        full_name: '',
        avatar_url: null
      },
      profile: null,
      reason: 'request_failed',
      details: error.message
    });
  }
};
