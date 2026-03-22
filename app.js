const STORE_KEY = 'gitaflow_state_v2';
const APP_LANGUAGE = 'Hinglish';
const RELEASE_START = new Date('2026-03-03T08:00:00+05:30');
const RELEASE_GAP_DAYS = 2;

const FILTERS = ['All', 'Released', 'Coming Soon'];
const SPEEDS = [0.85, 1, 1.15, 1.3];
const AUTH_REDIRECT_PATH = '/';

const LOCAL_EPISODES = [
  {
    id: 'hard-decisions',
    title: 'Why we freeze before hard decisions',
    durationMin: 7,
    category: 'Duty and decision-making',
    tags: ['clarity', 'anxiety', 'decision', 'work'],
    source: 'Inspired by Gita Chapter 1-2',
    reflection: 'What decision are you delaying because you are waiting to feel perfect certainty?',
    variants: {
      English: {
        summary: 'A grounded way to move when your mind is split between options.',
        transcript:
          'Most decision paralysis is not lack of intelligence, it is fear of regret. The Gita invites us to return to right action, not perfect prediction. You cannot control every consequence. You can control honesty, effort, and alignment. So before your next decision, ask a simpler question: what action is most aligned with my role and values right now? Let that answer be enough for this moment.'
      },
      Hindi: {
        summary: 'Kathin faislon mein atakne par spashtata wapas lane ka short reflection.',
        transcript:
          'Faisla na kar paana aksar samajh ki kami se nahi, pachtave ke dar se hota hai. Gita ka sanket hai ki perfect guarantee mat dhundo. Sahi karm dhundo. Tum sab parinam control nahi kar sakte, lekin niyat aur imandari control kar sakte ho. Agla kadam chhota rakho, par sachcha rakho.'
      },
      Hinglish: {
        summary: 'Decision freeze se bahar nikalne ka practical reset.',
        transcript:
          'Hard decision ke time hum future ke hundred scenarios mein chale jaate hain. Tab action ruk jata hai. Gita yaad dilati hai: perfect prediction impossible hai, right effort possible hai. Bas yeh dekho, meri values aur meri role ke hisaab se next right step kya hai. Wahi lo. Clarity action ke baad badhti hai.'
      }
    }
  },
  {
    id: 'action-over-outcome',
    title: 'Focus on action, not outcome',
    durationMin: 5,
    category: 'Work stress and performance',
    tags: ['work', 'stress', 'clarity', 'discipline'],
    source: 'Inspired by Gita 2.47',
    reflection: 'What outcome pressure can you release for the next 30 minutes?',
    variants: {
      English: {
        summary: 'Reframe pressure with effort-led thinking.',
        transcript:
          'When your mind clings to outcomes, action becomes tense. The Gita reframes this: your authority is on action, not final result. This is not passive. It is focused. Work with sincerity. Learn with humility. Let outcomes arrive through many causes, not only your anxiety.'
      },
      Hindi: {
        summary: 'Phal ki chinta se karm par wapas aane ka sankshipt episode.',
        transcript:
          'Jab man sirf result par tik jata hai, tab kaam bhaari ho jata hai. Gita kehti hai, tumhara adhikar karm par hai. Iska matlab beparwah hona nahi, balki ghabrahat ke bina poori imandari se kaam karna hai.'
      },
      Hinglish: {
        summary: 'Outcome anxiety ko effort clarity mein convert karo.',
        transcript:
          'Result important hai, but obsession draining hai. Gita ka idea simple hai: control zone mein raho. Tumhara control effort, process aur integrity par hai. Bas next focused action lo. Panic kam hoga, quality better hogi.'
      }
    }
  },
  {
    id: 'arjuna-anxiety',
    title: "Arjuna's anxiety is still our anxiety",
    durationMin: 6,
    category: 'Overthinking and anxiety',
    tags: ['anxiety', 'overthinking', 'purpose'],
    source: 'Inspired by Arjuna Vishada Yoga',
    reflection: 'Where are your emotions loud but your values still clear underneath?',
    variants: {
      English: {
        summary: 'Anxious moments through Arjuna’s lens.',
        transcript:
          'Arjuna trembles before action. That honesty is the gift of his story. Anxiety does not mean you are weak. It means this moment matters. The practice is to feel fully, and still act from values. Breathe, remember your role, then move one step.'
      },
      Hindi: {
        summary: 'Arjuna ki ghabrahat ko aaj ke stress se jodne wala reflection.',
        transcript:
          'Arjuna ka kampna weakness nahi tha, balki gahri manasik uljhan ka sanket tha. Chinta ko mehsoos karo, par steering wheel use mat do. Apne kartavya ko yaad karo aur ek sahi kadam lo.'
      },
      Hinglish: {
        summary: 'Overthinking phase mein role clarity ke saath move karna.',
        transcript:
          'Arjuna ki story relatable isliye lagti hai kyunki woh freeze hota hai, exactly jaise hum hote hain. Emotion ko ignore mat karo, but usko driver seat mat do. Pause lo, role clarity lao, then next step lo.'
      }
    }
  },
  {
    id: 'attachment-suffering',
    title: 'Why attachment creates suffering',
    durationMin: 5,
    category: 'Inner steadiness',
    tags: ['anxiety', 'purpose', 'relationships'],
    source: 'Inspired by Gita 2.62-63',
    reflection: 'What are you gripping so tightly that it is gripping you back?',
    variants: {
      English: {
        summary: 'Detach from grip, not from care.',
        transcript:
          'Attachment is not love. Attachment is fear disguised as love. The tighter the grip, the louder the fear. The Gita teaches engaged action without inner clutching. Care deeply. Show up fully. But let life breathe.'
      },
      Hindi: {
        summary: 'Asakti aur dayitva ke beech ka antar samajhne ka episode.',
        transcript:
          'Asakti mein pakad hoti hai, prem mein sthirta hoti hai. Gita ka marg hai: dayitva nibhao, par andruni pakad dheeli rakho. Tab man halka rehta hai aur vivek bana rehta hai.'
      },
      Hinglish: {
        summary: 'Care karo, cling mat karo.',
        transcript:
          'Detachment ka matlab cold hona nahi. Matlab yeh hai ki tum poore dil se kaam karo, but panic grip ke bina. Jab grip loose hoti hai tab clarity wapas aati hai.'
      }
    }
  },
  {
    id: 'restless-mind-training',
    title: 'The restless mind needs training',
    durationMin: 6,
    category: 'Discipline and self-control',
    tags: ['discipline', 'focus', 'mind'],
    source: 'Inspired by Gita 6.26',
    reflection: 'What one repeatable ritual will help your mind return today?',
    variants: {
      English: {
        summary: 'No shame, just return.',
        transcript:
          'The mind wandering is normal. The return is practice. Every gentle return builds strength. One breath before reaction. One focused block before distraction. This is spiritual training in everyday life.'
      },
      Hindi: {
        summary: 'Bhatakta man dushman nahi, abhyas ka kshetra hai.',
        transcript:
          'Man ka bhatakna swabhavik hai. Abhyas hai use baar baar wapas lana. Har wapsi antarik shakti banati hai. Chhote niyamit abhyas hi bade parivartan ka aadhaar hain.'
      },
      Hinglish: {
        summary: 'Mind ko punish nahi, train karo.',
        transcript:
          'Distract hona normal hai. Real win tab hai jab tum bina drama ke attention wapas laate ho. Har return ek rep hai. Isi se discipline muscle build hoti hai.'
      }
    }
  },
  {
    id: 'true-duty',
    title: 'What true duty really means',
    durationMin: 6,
    category: 'Duty and decision-making',
    tags: ['duty', 'clarity', 'purpose', 'work'],
    source: 'Inspired by Svadharma teaching',
    reflection: 'What is your responsibility in this situation, beyond your ego?',
    variants: {
      English: {
        summary: 'Duty as aligned responsibility, not social pressure.',
        transcript:
          'Duty is not blind obedience. Duty is aligned responsibility. It asks: what is truly mine to do here? When we act from duty, we stop chasing image and start serving reality.'
      },
      Hindi: {
        summary: 'Kartavya ko dabav nahi, samanjasya ke roop mein samajhna.',
        transcript:
          'Sahi kartavya wahi hai jo role, neeti aur hit ke saath mail khata ho. Jab kartavya spasht hota hai, tulna kam hoti hai aur sankalp badhta hai.'
      },
      Hinglish: {
        summary: 'Duty matlab role-aligned action, not people pleasing.',
        transcript:
          'Duty ka point impress karna nahi, serve karna hai. Bas poochho, iss context mein meri real responsibility kya hai? Wahi anchor banta hai.'
      }
    }
  },
  {
    id: 'balanced-success-failure',
    title: 'Staying balanced in success and failure',
    durationMin: 5,
    category: 'Handling success and failure',
    tags: ['work', 'balance', 'stress'],
    source: 'Inspired by Gita 2.48',
    reflection: 'Can you stay steady whether feedback is praise or criticism?',
    variants: {
      English: {
        summary: 'A steadier center during highs and lows.',
        transcript:
          'Success can inflate. Failure can collapse. Both can distract from growth. Balance is not numbness. It is stable learning in both conditions.'
      },
      Hindi: {
        summary: 'Safalta-asafalta dono mein samatva.',
        transcript:
          'Safalta se phoolna aur asafalta se tootna, dono hi man ko asantulit karte hain. Samatva ka abhyas karo. Parinam dekho, seekho, par apni pehchan usme mat gholo.'
      },
      Hinglish: {
        summary: 'Highs aur lows dono mein grounded rehna.',
        transcript:
          'Praise aaya toh hawa mein mat jao, setback aaya toh khud ko khatam mat samjho. Balance ka matlab hai dono se seekhna, dono se hilna nahi.'
      }
    }
  },
  {
    id: 'desire-anger-clarity',
    title: 'Desire, anger, and clarity',
    durationMin: 5,
    category: 'Character and inner state',
    tags: ['anger', 'relationships', 'mind'],
    source: 'Inspired by Gita 2.62-63',
    reflection: 'What pause can protect your clarity before reacting today?',
    variants: {
      English: {
        summary: 'How reactivity narrows perception, and how pause restores it.',
        transcript:
          'Unmet desire often becomes frustration, then anger. Anger reduces perspective and harms judgment. A small pause breaks this chain. Pause is not suppression. Pause is protection for wise action.'
      },
      Hindi: {
        summary: 'Krodh ke pehle viram ka mahatva.',
        transcript:
          'Ichchha jab badhkar asantosh banti hai, tab krodh janm leta hai. Krodh vivek ko dhundla karta hai. Chhota sa viram is shrinkhla ko tod sakta hai.'
      },
      Hinglish: {
        summary: 'Pause karo, react mat karo.',
        transcript:
          'Jab trigger hota hai tab instant reply tempting lagta hai. Par wahi clarity ko nuksan pahunchata hai. One breath pause lo. Response better hoga, damage kam hoga.'
      }
    }
  },
  {
    id: 'discipline-over-motivation',
    title: 'Why discipline beats motivation',
    durationMin: 4,
    category: 'Discipline and self-control',
    tags: ['discipline', 'focus', 'work'],
    source: 'Inspired by Karma Yoga',
    reflection: 'What routine can carry you even when mood is low?',
    variants: {
      English: {
        summary: 'Consistency from structure, not mood.',
        transcript:
          'Motivation comes and goes. Routine remains. Discipline is compassion for your future self. Keep systems small, clear, and repeatable.'
      },
      Hindi: {
        summary: 'Prerna se zyada niyamit abhyas par zor.',
        transcript:
          'Prerna sthir nahi rehti, par niyamit abhyas reh sakta hai. Chhoti routines banao jo mushkil dinon mein bhi chal sakein.'
      },
      Hinglish: {
        summary: 'System banega to momentum banega.',
        transcript:
          'Motivation wait karne se progress slow hoti hai. Discipline setup karo. Same time, same start ritual, same tiny action. Bas repeat.'
      }
    }
  },
  {
    id: 'inner-strength',
    title: 'Krishna on inner strength',
    durationMin: 5,
    category: 'Purpose and identity',
    tags: ['purpose', 'clarity', 'peace'],
    source: 'Inspired by Atma and steadiness teachings',
    reflection: 'Where can you act from your deeper self, not your fear today?',
    variants: {
      English: {
        summary: 'Strength as inner alignment, not outer aggression.',
        transcript:
          'Inner strength is quiet. It does not need constant proof. When you act from deeper alignment, fear loses volume. You still feel difficulty, but you are no longer ruled by it.'
      },
      Hindi: {
        summary: 'Antarik shakti ka shaant roop.',
        transcript:
          'Sahi shakti shor nahi karti. Woh antarik sthirta se aati hai. Jab aap gahri pehchan se kaam karte hain, bhay kamzor padta hai.'
      },
      Hinglish: {
        summary: 'Real strength loud nahi hoti.',
        transcript:
          'Inner strength ka matlab aggressive hona nahi. Matlab anchored hona. Jab tum aligned ho, fear rahega par control uske paas nahi rahega.'
      }
    }
  },
  {
    id: 'sleep-reflection',
    title: 'Short reflection before sleep',
    durationMin: 3,
    category: 'Calm before sleep',
    tags: ['sleep', 'peace', 'anxiety'],
    source: 'Inspired by letting-go practice',
    reflection: 'What can you gently put down tonight?',
    variants: {
      English: {
        summary: 'Unclench from the day before rest.',
        transcript:
          'Tonight you do not need to solve everything. Let unfinished tasks remain unfinished for now. Exhale control. Inhale softness. Rest prepares clear action tomorrow.'
      },
      Hindi: {
        summary: 'Raat se pehle man ko halka karne ka reflection.',
        transcript:
          'Aaj sab kuchh suljhana zaruri nahi. Jo adhoora hai use kal ke liye chhod dijiye. Saans chhodiye, pakad dheeli kijiye, vishram ko anumati dijiye.'
      },
      Hinglish: {
        summary: 'Night reset for busy minds.',
        transcript:
          'Abhi solve mode band karo. Kal ke kaam kal honge. Aaj bas grip loose karo, breath slow karo, aur rest ko allow karo.'
      }
    }
  },
  {
    id: 'purpose-identity',
    title: 'Purpose and identity in modern life',
    durationMin: 5,
    category: 'Purpose and identity',
    tags: ['purpose', 'identity', 'clarity'],
    source: 'Inspired by Svadharma and self-knowledge',
    reflection: 'What is aligned for you, even if it is not flashy?',
    variants: {
      English: {
        summary: 'Purpose as alignment, not applause.',
        transcript:
          'Purpose is often quieter than ego. Ego asks how it looks. Purpose asks whether it aligns. Move toward alignment and the noise of comparison fades.'
      },
      Hindi: {
        summary: 'Uddeshya ko prashansa se alag dekhne ka drishtikon.',
        transcript:
          'Ahankar puchta hai log kya kahenge. Uddeshya puchta hai kya yeh sach mein mera marg hai. Jab aap samanjasya chunte hain, man mein sthirta aati hai.'
      },
      Hinglish: {
        summary: 'Purpose > performance.',
        transcript:
          'Applause chase karoge to comparison badega. Alignment chase karoge to energy stable rahegi. Quiet path bhi powerful hota hai.'
      }
    }
  }
];

let EPISODES = normalizeEpisodes(LOCAL_EPISODES);

function fallbackReleaseAt(index) {
  return new Date(RELEASE_START.getTime() + index * RELEASE_GAP_DAYS * 24 * 60 * 60 * 1000);
}

function normalizeVariant(variant = {}) {
  return {
    summary: String(variant.summary || ''),
    transcript: String(variant.transcript || '')
  };
}

function normalizeEpisode(episode = {}, index = 0) {
  const rawReleaseAt = episode.releaseAt || episode.release_at;
  const parsedReleaseAt = rawReleaseAt ? new Date(rawReleaseAt) : fallbackReleaseAt(index);
  const releaseAt = Number.isNaN(parsedReleaseAt.getTime()) ? fallbackReleaseAt(index) : parsedReleaseAt;

  const baseSummary = String(episode.summary || '');
  const baseTranscript = String(episode.transcript || '');
  const rawVariants = episode.variants && typeof episode.variants === 'object' ? episode.variants : {};

  const english = normalizeVariant(rawVariants.English || rawVariants.english || {
    summary: episode.summary_en || baseSummary,
    transcript: episode.transcript_en || baseTranscript
  });

  const hindi = normalizeVariant(rawVariants.Hindi || rawVariants.hindi || {
    summary: episode.summary_hi || episode.summary_hindi || baseSummary,
    transcript: episode.transcript_hi || episode.transcript_hindi || baseTranscript
  });

  const hinglish = normalizeVariant(rawVariants.Hinglish || rawVariants.hinglish || {
    summary: episode.summary_hinglish || episode.summary_hi_en || baseSummary,
    transcript: episode.transcript_hinglish || episode.transcript_hi_en || baseTranscript
  });

  return {
    id: String(episode.id || `episode-${index + 1}`),
    title: String(episode.title || `Episode ${index + 1}`),
    durationMin: Number(episode.durationMin ?? episode.duration_min ?? 5),
    category: String(episode.category || 'General'),
    tags: Array.isArray(episode.tags)
      ? episode.tags.map((tag) => String(tag))
      : typeof episode.tags === 'string'
        ? episode.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    source: String(episode.source || episode.source_note || 'Inspired by Bhagavad Gita'),
    reflection: String(episode.reflection || episode.reflection_prompt || 'What stood out for you?'),
    releaseAt,
    variants: {
      English: english,
      Hindi: hindi,
      Hinglish: hinglish
    }
  };
}

function normalizeEpisodes(items) {
  if (!Array.isArray(items)) return [];
  return items.map((episode, index) => normalizeEpisode(episode, index));
}

const appEl = document.getElementById('app');
const modalEl = document.getElementById('episodeModal');
const playerEl = document.getElementById('playerDock');
const toastEl = document.getElementById('toast');
const resetButton = document.getElementById('resetProfile');
const authAreaEl = document.getElementById('authArea');

const DEFAULT_STATE = {
  tab: 'home',
  ui: {
    search: '',
    filter: 'All',
    modalEpisodeId: null
  },
  savedIds: [],
  recentIds: [],
  progress: {},
  analytics: {
    events: []
  },
  player: {
    episodeId: null,
    status: 'idle',
    percent: 0,
    speed: 1,
    sleepMinutes: 0,
    transcriptOpen: true,
    reflectionEpisodeId: null
  }
};

let state = loadState();
let tickHandle = null;
let sleepHandle = null;
let speechToken = null;
let lastTick = 0;
let supabaseClient = null;
let authSubscription = null;

const authState = {
  enabled: false,
  status: 'loading',
  user: null
};

function reconcileStateWithEpisodes() {
  const knownIds = new Set(EPISODES.map((episode) => episode.id));

  state.savedIds = state.savedIds.filter((id) => knownIds.has(id));
  state.recentIds = state.recentIds.filter((id) => knownIds.has(id));

  const nextProgress = {};
  Object.entries(state.progress || {}).forEach(([id, progress]) => {
    if (knownIds.has(id)) {
      nextProgress[id] = progress;
    }
  });
  state.progress = nextProgress;

  if (state.player.episodeId && !knownIds.has(state.player.episodeId)) {
    clearTick();
    clearSleepTimer();
    stopSpeech();
    state.player.status = 'idle';
    state.player.episodeId = null;
    state.player.percent = 0;
    state.player.reflectionEpisodeId = null;
  }
}

async function hydrateEpisodesFromApi() {
  try {
    const response = await fetch('/api/episodes', {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) return;

    const payload = await response.json();
    if (!Array.isArray(payload.episodes) || payload.episodes.length === 0) return;

    const normalized = normalizeEpisodes(payload.episodes);
    if (!normalized.length) return;

    EPISODES = normalized;
    reconcileStateWithEpisodes();

    track('episodes_hydrated', {
      source: payload.source || 'unknown',
      count: EPISODES.length
    });
    persist();
    render();

    if (payload.source === 'supabase') {
      toast('Synced latest releases from Supabase');
    }
  } catch (error) {
    console.warn('Episode hydration failed. Using local episodes.', error);
  }
}

function authDisplayName(user) {
  return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Signed in';
}

function renderAuth() {
  if (!authAreaEl) return;

  if (authState.status === 'loading') {
    authAreaEl.innerHTML = `<span class="auth-note">Checking sign-in…</span>`;
    return;
  }

  if (!authState.enabled) {
    authAreaEl.innerHTML = `<span class="auth-note">Google login unavailable</span>`;
    return;
  }

  if (!authState.user) {
    authAreaEl.innerHTML = `<button class="primary-btn" data-action="auth-google" type="button">Continue with Google</button>`;
    return;
  }

  authAreaEl.innerHTML = `
    <div class="auth-user">
      <span class="auth-chip">${escapeHtml(authDisplayName(authState.user))}</span>
      <button class="soft-btn" data-action="auth-logout" type="button">Sign out</button>
    </div>
  `;
}

async function initAuth() {
  renderAuth();

  try {
    const response = await fetch('/api/auth-config', {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      authState.enabled = false;
      authState.status = 'disabled';
      renderAuth();
      return;
    }

    const payload = await response.json();
    if (!payload.enabled || !payload.supabaseUrl || !payload.supabaseAnonKey) {
      authState.enabled = false;
      authState.status = 'disabled';
      renderAuth();
      return;
    }

    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      authState.enabled = false;
      authState.status = 'disabled';
      renderAuth();
      return;
    }

    supabaseClient = window.supabase.createClient(payload.supabaseUrl, payload.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    const {
      data: { session },
      error
    } = await supabaseClient.auth.getSession();

    if (error) {
      console.warn('Could not load auth session:', error.message);
    }

    authState.enabled = true;
    authState.user = session?.user || null;
    authState.status = authState.user ? 'signed_in' : 'signed_out';
    renderAuth();

    if (authSubscription?.subscription?.unsubscribe) {
      authSubscription.subscription.unsubscribe();
    }

    const { data } = supabaseClient.auth.onAuthStateChange((_event, nextSession) => {
      authState.user = nextSession?.user || null;
      authState.status = authState.user ? 'signed_in' : 'signed_out';
      renderAuth();
    });
    authSubscription = data;
  } catch (error) {
    console.warn('Auth init failed:', error.message);
    authState.enabled = false;
    authState.status = 'disabled';
    renderAuth();
  }
}

async function signInWithGoogle() {
  if (!supabaseClient) {
    toast('Google login is not configured yet');
    return;
  }

  const redirectTo = `${window.location.origin}${AUTH_REDIRECT_PATH}`;
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo }
  });

  if (error) {
    toast('Could not start Google sign in');
    console.warn('Google sign in failed:', error.message);
  }
}

async function signOutUser() {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    toast('Could not sign out');
    console.warn('Sign out failed:', error.message);
    return;
  }
  toast('Signed out');
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      ui: {
        ...structuredClone(DEFAULT_STATE).ui,
        ...(parsed.ui || {})
      },
      analytics: {
        events: Array.isArray(parsed.analytics?.events) ? parsed.analytics.events : []
      },
      player: {
        ...structuredClone(DEFAULT_STATE).player,
        ...(parsed.player || {})
      }
    };
  } catch (error) {
    return structuredClone(DEFAULT_STATE);
  }
}

function persist() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function track(event, payload = {}) {
  const entry = {
    event,
    payload,
    ts: new Date().toISOString()
  };
  state.analytics.events = [entry, ...state.analytics.events].slice(0, 400);
}

function getEpisode(id) {
  return EPISODES.find((episode) => episode.id === id);
}

function getVariant(episode) {
  return episode.variants[APP_LANGUAGE] || episode.variants.English;
}

function isReleased(episode, now = new Date()) {
  return episode.releaseAt.getTime() <= now.getTime();
}

function getReleasedEpisodes(now = new Date()) {
  return EPISODES.filter((episode) => isReleased(episode, now)).sort((a, b) => b.releaseAt - a.releaseAt);
}

function getUpcomingEpisodes(now = new Date()) {
  return EPISODES.filter((episode) => !isReleased(episode, now)).sort((a, b) => a.releaseAt - b.releaseAt);
}

function latestRelease(now = new Date()) {
  return getReleasedEpisodes(now)[0] || null;
}

function progressOf(id) {
  return Number(state.progress[id]?.percent || 0);
}

function durationSeconds(episode) {
  return episode.durationMin * 60;
}

function secClock(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
  return `${mins}:${secs}`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function releaseBadge(episode, now = new Date()) {
  const diffMs = episode.releaseAt.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.ceil(Math.abs(diffMs) / dayMs);

  if (diffMs <= 0) {
    if (days <= 1) return 'Released today';
    return `Released ${days - 1} day${days - 1 === 1 ? '' : 's'} ago`;
  }

  if (days <= 1) return 'Releases today';
  return `Releases in ${days} day${days === 1 ? '' : 's'}`;
}

function continueListening() {
  const released = getReleasedEpisodes();
  return released.filter((episode) => {
    const p = progressOf(episode.id);
    return p > 0 && p < 100;
  });
}

function filterScheduleList(list) {
  const query = state.ui.search.trim().toLowerCase();
  const filter = state.ui.filter;

  return list.filter((episode) => {
    const variant = getVariant(episode);
    const text = [episode.title, episode.category, episode.tags.join(' '), variant.summary]
      .join(' ')
      .toLowerCase();

    const searchOk = !query || text.includes(query);
    const releaseOk =
      filter === 'All' ||
      (filter === 'Released' && isReleased(episode)) ||
      (filter === 'Coming Soon' && !isReleased(episode));

    return searchOk && releaseOk;
  });
}

function toggleSave(id) {
  if (state.savedIds.includes(id)) {
    state.savedIds = state.savedIds.filter((entry) => entry !== id);
    toast('Removed from library');
    track('unsave_episode', { episodeId: id });
  } else {
    state.savedIds = [id, ...state.savedIds];
    toast('Saved to library');
    track('save_episode', { episodeId: id });
  }
  persist();
  render();
}

function ensureRecent(id) {
  state.recentIds = [id, ...state.recentIds.filter((entry) => entry !== id)].slice(0, 8);
}

function startPlayback(id, percent = progressOf(id)) {
  const episode = getEpisode(id);
  if (!episode) return;

  if (!isReleased(episode)) {
    toast(`This episode releases on ${formatDate(episode.releaseAt)}`);
    return;
  }

  stopSpeech();
  clearTick();

  state.player.episodeId = id;
  state.player.status = 'playing';
  state.player.percent = percent;
  state.player.reflectionEpisodeId = null;
  state.progress[id] = { percent };

  ensureRecent(id);
  track('start_playback', { episodeId: id, fromPercent: percent });
  persist();

  lastTick = Date.now();
  startTick();
  playSpeechFromCurrent();
  render();
}

function pausePlayback() {
  if (state.player.status !== 'playing') return;
  state.player.status = 'paused';
  track('pause_playback', { episodeId: state.player.episodeId });
  persist();
  clearTick();

  if ('speechSynthesis' in window && speechSynthesis.speaking) {
    speechSynthesis.pause();
  }

  renderPlayer();
}

function resumePlayback() {
  if (state.player.status !== 'paused') return;
  state.player.status = 'playing';
  track('resume_playback', { episodeId: state.player.episodeId });
  persist();

  lastTick = Date.now();
  startTick();

  if ('speechSynthesis' in window && speechSynthesis.paused) {
    speechSynthesis.resume();
  } else {
    playSpeechFromCurrent();
  }

  renderPlayer();
}

function stopPlayback(showMessage = false) {
  clearTick();
  clearSleepTimer();
  stopSpeech();

  if (state.player.episodeId) {
    track('stop_playback', {
      episodeId: state.player.episodeId,
      percent: state.player.percent
    });
  }

  state.player.status = 'idle';
  state.player.episodeId = null;
  state.player.percent = 0;
  state.player.reflectionEpisodeId = null;
  persist();

  if (showMessage) toast('Playback stopped');

  render();
}

function completePlayback() {
  const episodeId = state.player.episodeId;
  const episode = getEpisode(episodeId);
  if (!episode) return;

  state.player.status = 'paused';
  state.player.percent = 100;
  state.progress[episodeId] = { percent: 100 };
  state.player.reflectionEpisodeId = episodeId;

  clearTick();
  clearSleepTimer();
  stopSpeech();

  track('complete_episode', { episodeId });
  persist();

  toast('Episode complete');
  render();
}

function seekPlayback(percent) {
  if (!state.player.episodeId) return;

  state.player.percent = percent;
  state.progress[state.player.episodeId] = { percent };
  persist();

  if (state.player.status === 'playing') {
    lastTick = Date.now();
    playSpeechFromCurrent();
  }

  renderPlayer();
}

function setSpeed(value) {
  state.player.speed = Number(value);
  track('set_speed', { speed: state.player.speed });
  persist();

  if (state.player.status === 'playing') {
    lastTick = Date.now();
    playSpeechFromCurrent();
  }

  renderPlayer();
}

function setSleepTimer(minutes) {
  state.player.sleepMinutes = Number(minutes);
  clearSleepTimer();

  if (state.player.sleepMinutes > 0) {
    sleepHandle = window.setTimeout(() => {
      stopPlayback(false);
      toast('Sleep timer ended playback');
    }, state.player.sleepMinutes * 60 * 1000);
  }

  track('set_sleep_timer', { minutes: state.player.sleepMinutes });
  persist();
  renderPlayer();
}

function clearSleepTimer() {
  if (sleepHandle) {
    clearTimeout(sleepHandle);
    sleepHandle = null;
  }
}

function startTick() {
  clearTick();
  tickHandle = window.setInterval(() => {
    if (state.player.status !== 'playing' || !state.player.episodeId) return;

    const episode = getEpisode(state.player.episodeId);
    const total = durationSeconds(episode);
    const now = Date.now();
    const delta = (now - lastTick) / 1000;
    lastTick = now;

    const increase = (delta * state.player.speed * 100) / total;
    const next = Math.min(100, state.player.percent + increase);

    state.player.percent = next;
    state.progress[episode.id] = { percent: next };
    persist();
    renderPlayer();

    if (next >= 100) {
      completePlayback();
    }
  }, 300);
}

function clearTick() {
  if (tickHandle) {
    clearInterval(tickHandle);
    tickHandle = null;
  }
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
  speechToken = null;
}

function playSpeechFromCurrent() {
  if (!('speechSynthesis' in window) || !state.player.episodeId) return;

  stopSpeech();

  const episode = getEpisode(state.player.episodeId);
  const transcript = getVariant(episode).transcript;
  const startIndex = Math.floor((state.player.percent / 100) * transcript.length);
  const chunk = transcript.slice(startIndex).trim();

  if (!chunk) return;

  speechToken = new SpeechSynthesisUtterance(chunk);
  speechToken.rate = Number(state.player.speed);
  speechToken.pitch = 1;
  speechToken.lang = APP_LANGUAGE === 'Hindi' ? 'hi-IN' : 'en-IN';
  speechSynthesis.speak(speechToken);
}

function render() {
  renderMain();
  renderModal();
  renderPlayer();
}

function renderMain() {
  const latest = latestRelease();
  const released = getReleasedEpisodes();
  const upcoming = getUpcomingEpisodes();
  const active = continueListening();
  const firstReleaseDate = EPISODES[0]?.releaseAt;

  appEl.innerHTML = `
    <section class="hero card">
      <div class="hero-grid">
        <div>
          <p class="kicker">New Episode Drops</p>
          <h2>GitaFlow release stream</h2>
          <p class="helper">No preference setup. Episodes drop on schedule and appear here as new releases.</p>
          <div class="badges">
            <span class="pill">Language: ${APP_LANGUAGE}</span>
            <span class="pill">Released: ${released.length}</span>
            <span class="pill">Upcoming: ${upcoming.length}</span>
          </div>
          ${latest ? `
            <div class="actions">
              <button class="primary-btn" data-action="play" data-id="${latest.id}">Play New Release</button>
              <button class="soft-btn" data-action="open" data-id="${latest.id}">Open Episode</button>
            </div>
          ` : '<p class="note">First release is coming soon.</p>'}
        </div>
        <div class="stats">
          <article class="stat">
            <span class="label">Latest Release</span>
            <strong>${latest ? latest.title : 'Not Released Yet'}</strong>
            <p class="note">${latest ? `${releaseBadge(latest)} | ${formatDate(latest.releaseAt)}` : firstReleaseDate ? `Starts ${formatDate(firstReleaseDate)}` : 'Release schedule updating'}</p>
          </article>
          <article class="stat">
            <span class="label">Saved</span>
            <strong>${state.savedIds.length}</strong>
            <p class="note">Bookmarked episodes in your local library.</p>
          </article>
          <article class="stat">
            <span class="label">Play Starts</span>
            <strong>${state.analytics.events.filter((entry) => entry.event === 'start_playback').length}</strong>
            <p class="note">Local analytics count from this browser.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="tabs card">
      ${tabButton('home', 'Home')}
      ${tabButton('library', 'Library')}
      ${tabButton('schedule', 'Schedule')}
    </section>

    ${latest ? latestSection(latest) : ''}
    ${state.tab === 'home' ? shelfSection('Continue Listening', 'Resume your in-progress episodes.', active) : ''}
    ${state.tab === 'home' ? shelfSection('Latest Drops', 'Most recently released episodes.', released.slice(0, 6)) : ''}
    ${state.tab === 'home' ? shelfSection('Coming Up', 'Upcoming scheduled releases.', upcoming.slice(0, 4)) : ''}
    ${state.tab === 'library' ? librarySection() : ''}
    ${state.tab === 'schedule' ? scheduleSection() : ''}
  `;
}

function tabButton(tab, label) {
  return `<button class="tab-btn ${state.tab === tab ? 'active' : ''}" data-action="tab" data-tab="${tab}">${label}</button>`;
}

function latestSection(episode) {
  const variant = getVariant(episode);
  return `
    <section class="section card">
      <div class="section-head">
        <div>
          <p class="label">New Episode Released</p>
          <h3>${episode.title}</h3>
        </div>
        <span class="pill">${releaseBadge(episode)}</span>
      </div>
      <p class="summary">${variant.summary}</p>
      <p class="meta">Release date: ${formatDate(episode.releaseAt)} | ${episode.durationMin} min | ${episode.source}</p>
      <div class="quick">
        ${episode.tags.map((tag) => `<span class="pill">${tag}</span>`).join('')}
      </div>
      <div class="actions">
        <button class="primary-btn" data-action="play" data-id="${episode.id}">Play</button>
        <button class="save-btn ${state.savedIds.includes(episode.id) ? 'active' : ''}" data-action="save" data-id="${episode.id}">${state.savedIds.includes(episode.id) ? 'Saved' : 'Save'}</button>
      </div>
    </section>
  `;
}

function shelfSection(title, description, episodes) {
  if (!episodes.length) {
    return '';
  }

  return `
    <section class="section card">
      <div class="section-head">
        <div>
          <p class="label">${title}</p>
          <h3>${title}</h3>
        </div>
        <p class="note">${description}</p>
      </div>
      <div class="row-scroll">
        ${episodes.map((episode) => episodeCard(episode)).join('')}
      </div>
    </section>
  `;
}

function librarySection() {
  const saved = state.savedIds.map(getEpisode).filter(Boolean);
  const recent = state.recentIds.map(getEpisode).filter(Boolean);

  return `
    <section class="section card">
      <div class="section-head">
        <div>
          <p class="label">Library</p>
          <h3>Saved and recent episodes</h3>
        </div>
      </div>
      ${saved.length ? `<div class="grid">${saved.map((episode) => episodeCard(episode)).join('')}</div>` : emptyState('No saved episodes yet', 'Tap Save on any release to keep it in your library.')}
      <div style="margin-top:0.8rem;"></div>
      <p class="label">Recent Listening</p>
      ${recent.length ? `<div class="grid">${recent.map((episode) => episodeCard(episode)).join('')}</div>` : emptyState('No recent listens yet', 'Play any released episode and it will appear here.')}
    </section>
  `;
}

function scheduleSection() {
  const list = filterScheduleList(EPISODES);

  return `
    <section class="section card">
      <div class="section-head">
        <div>
          <p class="label">Release Calendar</p>
          <h3>Episode timeline</h3>
        </div>
        <p class="note">${list.length} episodes</p>
      </div>
      <label>
        <span class="hide">Search episodes</span>
        <input id="searchInput" class="search-box" type="search" placeholder="Search topic, mood, theme..." value="${escapeHtml(state.ui.search)}" />
      </label>
      <div class="filters">
        ${FILTERS.map((filter) => `<button class="filter-btn ${state.ui.filter === filter ? 'active' : ''}" data-action="filter" data-filter="${filter}">${filter}</button>`).join('')}
      </div>
      <div class="grid">
        ${list.map((episode) => episodeCard(episode)).join('')}
      </div>
    </section>
  `;
}

function emptyState(title, body) {
  return `<div class="empty"><h4>${title}</h4><p>${body}</p></div>`;
}

function episodeCard(episode) {
  const variant = getVariant(episode);
  const percent = progressOf(episode.id);
  const released = isReleased(episode);

  return `
    <article class="episode">
      <div class="episode-top">
        <div>
          <p class="label">${episode.category}</p>
          <h4>${episode.title}</h4>
        </div>
        <span class="pill">${episode.durationMin}m</span>
      </div>
      <p class="summary">${variant.summary}</p>
      <div class="quick">
        ${episode.tags.slice(0, 3).map((tag) => `<span class="pill">${tag}</span>`).join('')}
      </div>
      <p class="meta">${released ? 'Released' : 'Coming Soon'} | ${formatDate(episode.releaseAt)} | ${episode.source}</p>
      <div class="progress"><span style="width:${percent}%;"></span></div>
      <div class="actions">
        <button class="primary-btn" data-action="play" data-id="${episode.id}" ${released ? '' : 'disabled'}>${released ? (percent > 0 && percent < 100 ? 'Resume' : 'Play') : 'Releases Soon'}</button>
        <button class="soft-btn" data-action="open" data-id="${episode.id}">Details</button>
        <button class="save-btn ${state.savedIds.includes(episode.id) ? 'active' : ''}" data-action="save" data-id="${episode.id}">${state.savedIds.includes(episode.id) ? 'Saved' : 'Save'}</button>
      </div>
    </article>
  `;
}

function openEpisode(id) {
  state.ui.modalEpisodeId = id;
  track('open_episode_detail', { episodeId: id });
  persist();
  renderModal();
}

function closeModal() {
  state.ui.modalEpisodeId = null;
  persist();
  renderModal();
}

function renderModal() {
  const episode = getEpisode(state.ui.modalEpisodeId);

  if (!episode) {
    modalEl.classList.add('hidden');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML = '';
    return;
  }

  const variant = getVariant(episode);
  const released = isReleased(episode);

  modalEl.classList.remove('hidden');
  modalEl.setAttribute('aria-hidden', 'false');
  modalEl.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-label="${escapeHtml(episode.title)}">
      <div class="section-head">
        <div>
          <p class="label">Episode Detail</p>
          <h3>${episode.title}</h3>
        </div>
        <button class="icon-btn" data-action="close-modal" aria-label="Close">X</button>
      </div>
      <div class="modal-grid">
        <div>
          <p class="summary">${variant.summary}</p>
          <div class="actions" style="margin-top:0.8rem;">
            <button class="primary-btn" data-action="play" data-id="${episode.id}" ${released ? '' : 'disabled'}>${released ? (progressOf(episode.id) > 0 && progressOf(episode.id) < 100 ? 'Resume Episode' : 'Play Episode') : 'Coming Soon'}</button>
            <button class="save-btn ${state.savedIds.includes(episode.id) ? 'active' : ''}" data-action="save" data-id="${episode.id}">${state.savedIds.includes(episode.id) ? 'Saved' : 'Save'}</button>
          </div>
          <p class="meta" style="margin-top:0.6rem;">${released ? 'Released' : 'Releases'} on ${formatDate(episode.releaseAt)} | ${episode.source}</p>
          <div class="transcript" style="margin-top:0.75rem;">${variant.transcript}</div>
        </div>
        <aside>
          <div class="empty">
            <p class="label">Reflection Prompt</p>
            <p>${episode.reflection}</p>
          </div>
          <p class="label" style="margin-top:0.8rem;">Related Episodes</p>
          <div class="related">
            ${EPISODES.filter((item) => item.id !== episode.id)
              .sort((a, b) => sharedTagCount(b, episode) - sharedTagCount(a, episode))
              .slice(0, 3)
              .map((item) => `<button data-action="open" data-id="${item.id}"><strong>${item.title}</strong><p class="note">${getVariant(item).summary}</p></button>`)
              .join('')}
          </div>
        </aside>
      </div>
    </div>
  `;
}

function sharedTagCount(a, b) {
  return a.tags.filter((tag) => b.tags.includes(tag)).length;
}

function renderPlayer() {
  const episode = getEpisode(state.player.episodeId);

  if (!episode) {
    playerEl.classList.add('hidden');
    playerEl.innerHTML = '';
    return;
  }

  const totalSeconds = durationSeconds(episode);
  const elapsedSeconds = (state.player.percent / 100) * totalSeconds;
  const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
  const variant = getVariant(episode);

  playerEl.classList.remove('hidden');
  playerEl.innerHTML = `
    <div class="player-panel">
      <div class="player-head">
        <div class="player-title">
          <p class="label">Now Playing</p>
          <h4>${episode.title}</h4>
          <p class="note">${variant.summary}</p>
          <div class="player-meta">
            <span class="pill">${APP_LANGUAGE}</span>
            <span class="pill">${episode.durationMin} min</span>
            <span class="pill">${state.player.status}</span>
          </div>
        </div>
        <button class="icon-btn" data-action="stop">X</button>
      </div>

      <label>
        <span class="hide">Seek</span>
        <input id="seekRange" class="player-slider" type="range" min="0" max="100" step="0.1" value="${state.player.percent.toFixed(1)}" />
      </label>

      <div class="player-time">
        <span>${secClock(elapsedSeconds)}</span>
        <span>${secClock(totalSeconds)}</span>
        <span>${secClock(remainingSeconds)} left</span>
      </div>

      <div class="player-actions">
        <div class="player-left">
          <button class="primary-btn" data-action="${state.player.status === 'playing' ? 'pause' : 'resume'}">${state.player.status === 'playing' ? 'Pause' : 'Play'}</button>
          <button class="save-btn ${state.savedIds.includes(episode.id) ? 'active' : ''}" data-action="save" data-id="${episode.id}">${state.savedIds.includes(episode.id) ? 'Saved' : 'Save'}</button>
          <button class="soft-btn" data-action="toggle-transcript">${state.player.transcriptOpen ? 'Hide Transcript' : 'Show Transcript'}</button>
        </div>
        <div class="player-right">
          <label>
            <span class="hide">Speed</span>
            <select id="speedSelect" class="select">
              ${SPEEDS.map((speed) => `<option value="${speed}" ${Number(state.player.speed) === speed ? 'selected' : ''}>${speed}x</option>`).join('')}
            </select>
          </label>
          <label>
            <span class="hide">Sleep Timer</span>
            <select id="sleepSelect" class="select">
              ${[
                { value: 0, label: 'No timer' },
                { value: 1, label: '1 min' },
                { value: 3, label: '3 min' },
                { value: 5, label: '5 min' }
              ]
                .map((item) => `<option value="${item.value}" ${Number(state.player.sleepMinutes) === item.value ? 'selected' : ''}>${item.label}</option>`)
                .join('')}
            </select>
          </label>
        </div>
      </div>

      ${state.player.transcriptOpen ? `<div class="transcript">${variant.transcript}</div>` : ''}
      ${state.player.reflectionEpisodeId ? `<div class="empty"><p class="label">Post-Listen Reflection</p><p>${getEpisode(state.player.reflectionEpisodeId).reflection}</p></div>` : ''}
    </div>
  `;
}

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = window.setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 2200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function resetLocalData() {
  stopPlayback(false);
  state = structuredClone(DEFAULT_STATE);
  persist();
  render();
  toast('Local data reset');
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === 'play') startPlayback(id);
  if (action === 'open') openEpisode(id);
  if (action === 'close-modal') closeModal();
  if (action === 'save') toggleSave(id);

  if (action === 'tab') {
    state.tab = target.dataset.tab;
    persist();
    renderMain();
  }

  if (action === 'filter') {
    state.ui.filter = target.dataset.filter;
    persist();
    renderMain();
  }

  if (action === 'pause') pausePlayback();
  if (action === 'resume') resumePlayback();
  if (action === 'stop') stopPlayback(true);
  if (action === 'auth-google') signInWithGoogle();
  if (action === 'auth-logout') signOutUser();

  if (action === 'toggle-transcript') {
    state.player.transcriptOpen = !state.player.transcriptOpen;
    persist();
    renderPlayer();
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'searchInput') {
    state.ui.search = event.target.value;
    persist();
    renderMain();
  }

  if (event.target.id === 'seekRange') {
    seekPlayback(Number(event.target.value));
  }

  if (event.target.id === 'speedSelect') {
    setSpeed(event.target.value);
  }

  if (event.target.id === 'sleepSelect') {
    setSleepTimer(event.target.value);
  }
});

modalEl.addEventListener('click', (event) => {
  if (event.target === modalEl) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.ui.modalEpisodeId) {
    closeModal();
  }
});

resetButton.addEventListener('click', () => {
  resetLocalData();
});

async function bootstrap() {
  render();
  renderAuth();
  await Promise.all([hydrateEpisodesFromApi(), initAuth()]);
}

bootstrap();
