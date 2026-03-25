const { pickSupabaseAnonKey, sendJson } = require('./_shared');

module.exports = async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  const supabaseAnonKey = pickSupabaseAnonKey(process.env);

  if (!supabaseUrl || !supabaseAnonKey) {
    sendJson(res, 200, {
      enabled: false,
      reason: 'missing_public_auth_config'
    });
    return;
  }

  sendJson(res, 200, {
    enabled: true,
    supabaseUrl,
    supabaseAnonKey
  });
};
