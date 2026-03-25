const STORE_KEY = 'gitaflow_state_v2';
const APP_LANGUAGE = 'Hinglish';
const RELEASE_START = new Date('2026-03-03T08:00:00+05:30');
const RELEASE_GAP_DAYS = 2;

const FILTERS = ['All', 'Released', 'Coming Soon'];
const SPEEDS = [0.85, 1, 1.15, 1.3];
const AUTH_REDIRECT_PATH = '/';
const LANGUAGE_OPTIONS = ['English', 'Hindi', 'Hinglish'];
const GOAL_OPTIONS = [
  'Reduce Stress',
  'Improve Focus',
  'Better Decisions',
  'Build Discipline',
  'Sleep Better',
  'Find Purpose'
];
const TIME_SLOT_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Night'];
const LENGTH_OPTIONS = [3, 5, 10];

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

// Episodes are API-driven only. Keep empty until /api/episodes responds.
let EPISODES = [];

function defaultPreferences() {
  return {
    preferred_language: null,
    preferred_episode_length_min: null,
    goals: [],
    preferred_tags: [],
    preferred_time_slot: null,
    onboarding_completed: false
  };
}

function normalizeChoiceList(values, allowed, maxCount) {
  if (!Array.isArray(values)) return [];
  const allowedSet = new Set(allowed);
  const deduped = [];
  for (const raw of values) {
    const value = String(raw || '').trim();
    if (!value || !allowedSet.has(value) || deduped.includes(value)) continue;
    deduped.push(value);
    if (maxCount && deduped.length >= maxCount) break;
  }
  return deduped;
}

function normalizeTopicList(values, maxCount = 3) {
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

function allTopicOptions() {
  const topics = new Set();
  EPISODES.forEach((episode) => {
    episode.tags.forEach((tag) => {
      const normalized = String(tag || '').trim().toLowerCase();
      if (normalized) topics.add(normalized);
    });
  });
  return Array.from(topics).sort((a, b) => a.localeCompare(b));
}

function normalizePreferences(raw = {}) {
  const preferredLanguage = LANGUAGE_OPTIONS.includes(raw.preferred_language)
    ? raw.preferred_language
    : null;
  const preferredLength = LENGTH_OPTIONS.includes(Number(raw.preferred_episode_length_min))
    ? Number(raw.preferred_episode_length_min)
    : null;
  const preferredTimeSlot = TIME_SLOT_OPTIONS.includes(raw.preferred_time_slot)
    ? raw.preferred_time_slot
    : null;

  return {
    preferred_language: preferredLanguage,
    preferred_episode_length_min: preferredLength,
    goals: normalizeChoiceList(raw.goals, GOAL_OPTIONS, 2),
    preferred_tags: normalizeTopicList(raw.preferred_tags, 3),
    preferred_time_slot: preferredTimeSlot,
    onboarding_completed: Boolean(raw.onboarding_completed)
  };
}

function onboardingRequired(preferences) {
  const normalized = normalizePreferences(preferences);
  if (!normalized.onboarding_completed) return true;
  if (!LANGUAGE_OPTIONS.includes(normalized.preferred_language)) return true;
  if (!LENGTH_OPTIONS.includes(Number(normalized.preferred_episode_length_min))) return true;
  if (!TIME_SLOT_OPTIONS.includes(normalized.preferred_time_slot)) return true;
  if (!Array.isArray(normalized.goals) || normalized.goals.length < 1 || normalized.goals.length > 2) return true;
  if (!Array.isArray(normalized.preferred_tags) || normalized.preferred_tags.length < 1 || normalized.preferred_tags.length > 3) return true;
  return false;
}

function activeLanguage() {
  return state?.preferences?.preferred_language || APP_LANGUAGE;
}

function speechLocaleForLanguage(language) {
  if (language === 'Hindi') return 'hi-IN';
  if (language === 'Hinglish') return 'en-IN';
  return 'en-US';
}

function preferencesPayload(preferences) {
  const normalized = normalizePreferences(preferences);
  return {
    preferred_language: normalized.preferred_language,
    preferred_episode_length_min: normalized.preferred_episode_length_min,
    goals: normalized.goals,
    preferred_tags: normalized.preferred_tags,
    preferred_time_slot: normalized.preferred_time_slot,
    onboarding_completed: normalized.onboarding_completed
  };
}

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
const preferencesButton = document.getElementById('openPreferences');
const authAreaEl = document.getElementById('authArea');

const DEFAULT_STATE = {
  tab: 'home',
  ui: {
    search: '',
    filter: 'All',
    modalEpisodeId: null,
    onboardingMode: null,
    onboardingStep: 0
  },
  preferences: defaultPreferences(),
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
let onboardingDraft = normalizePreferences(state.preferences);
let onboardingSaving = false;
let remoteSyncInFlight = false;
let remoteData = {
  me: null,
  dashboard: null,
  recommendations: [],
  library: null,
  progress: null
};

const authState = {
  enabled: false,
  status: 'loading',
  user: null,
  providerError: ''
};

function resetRemoteData() {
  remoteData = {
    me: null,
    dashboard: null,
    recommendations: [],
    library: null,
    progress: null
  };
}

function isUserSignedIn() {
  return Boolean(authState.user);
}

function hideOverlays() {
  clearTick();
  clearSleepTimer();
  stopSpeech();

  modalEl.classList.add('hidden');
  modalEl.setAttribute('aria-hidden', 'true');
  modalEl.innerHTML = '';

  playerEl.classList.add('hidden');
  playerEl.innerHTML = '';
}

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
    const episodes = Array.isArray(payload.episodes) ? payload.episodes : [];
    const normalized = normalizeEpisodes(episodes);

    EPISODES = normalized;
    reconcileStateWithEpisodes();

    track('episodes_hydrated', {
      source: payload.source || 'unknown',
      count: EPISODES.length
    });
    persist();
    render();

    if (payload.source === 'supabase' && normalized.length > 0) {
      toast('Synced latest releases from Supabase');
    }
  } catch (error) {
    console.warn('Episode hydration failed.', error);
  }
}

function authDisplayName(user) {
  return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Signed in';
}

function profilePayloadFromUser(user) {
  if (!user?.id) return null;

  return {
    email: user.email || null,
    full_name: user?.user_metadata?.full_name || user?.user_metadata?.name || null,
    avatar_url: user?.user_metadata?.avatar_url || null
  };
}

async function upsertUserProfile(payload, { showToastOnError = false } = {}) {
  if (!payload || !isUserSignedIn()) return false;
  const response = await apiFetchJson('/api/me', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (!response.ok || response.payload?.ok === false) {
    console.warn('Could not sync user profile:', response.payload?.details || response.status);
    if (showToastOnError) {
      toast('Could not save preferences. Please retry.');
    }
    return false;
  }

  const nextProfile = response.payload?.profile || null;
  if (nextProfile) {
    setPreferencesFromSource(nextProfile);
  }
  if (response.payload?.user) {
    remoteData.me = {
      ...(remoteData.me || {}),
      user: response.payload.user,
      profile: nextProfile || remoteData.me?.profile || null
    };
  }
  return true;
}

async function syncUserProfile(user) {
  if (!supabaseClient || !user?.id) return;
  const payload = profilePayloadFromUser(user);
  if (!payload) return;
  await upsertUserProfile(payload);
}

async function fetchUserProfile(userId) {
  if (!supabaseClient || !userId) return null;
  const response = await apiFetchJson('/api/me');
  if (!response.ok) {
    console.warn('Could not load user preferences:', response.payload?.details || response.status);
    toast('Could not load preferences. Using local defaults.');
    return null;
  }
  const profile = response.payload?.profile || null;
  const responseUserId = response.payload?.user?.id || '';
  if (responseUserId && responseUserId !== userId) {
    return null;
  }
  return profile;
}

function setPreferencesFromSource(source) {
  state.preferences = normalizePreferences(source || state.preferences);
  onboardingDraft = normalizePreferences(state.preferences);
  persist();
}

function setOnboardingMode(mode = null) {
  state.ui.onboardingMode = mode;
  state.ui.onboardingStep = 0;
  if (mode) {
    onboardingDraft = normalizePreferences(state.preferences);
  }
  persist();
}

function needsBlockingOnboarding() {
  return onboardingRequired(state.preferences);
}

async function accessTokenForApi() {
  if (!supabaseClient) return '';
  try {
    const {
      data: { session }
    } = await supabaseClient.auth.getSession();
    return session?.access_token || '';
  } catch (_error) {
    return '';
  }
}

async function apiFetchJson(path, options = {}) {
  const token = await accessTokenForApi();
  const headers = {
    Accept: 'application/json',
    ...(options.headers || {})
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(path, {
    ...options,
    headers
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (_error) {
    payload = null;
  }

  return {
    ok: response.ok,
    status: response.status,
    payload
  };
}

function normalizeRecommendationItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item, index) => {
      if (!item || typeof item !== 'object' || !item.episode) return null;
      return {
        ...item,
        episode: normalizeEpisode(item.episode, index)
      };
    })
    .filter(Boolean);
}

function applyRemoteLibrary(payload) {
  if (!payload || typeof payload !== 'object') return;
  if (Array.isArray(payload.saved_ids)) {
    state.savedIds = payload.saved_ids.map((item) => String(item)).filter(Boolean);
  }
  if (Array.isArray(payload.recent_ids)) {
    state.recentIds = payload.recent_ids.map((item) => String(item)).filter(Boolean).slice(0, 12);
  }
}

function applyRemoteProgress(payload) {
  if (!payload || !Array.isArray(payload.items)) return;
  const nextProgress = {};
  const recent = [];
  payload.items.forEach((row) => {
    const episodeId = String(row.episode_id || '');
    if (!episodeId) return;
    const percent = Number(row.progress_percent || 0);
    nextProgress[episodeId] = { percent };
    recent.push(episodeId);
  });
  state.progress = nextProgress;
  if (recent.length) {
    state.recentIds = recent.filter((id, index) => recent.indexOf(id) === index).slice(0, 12);
  }
}

async function refreshRemoteData({ silent = true } = {}) {
  if (!isUserSignedIn() || !supabaseClient) return;
  if (remoteSyncInFlight) return;
  remoteSyncInFlight = true;

  try {
    const [meRes, dashboardRes, recRes, libraryRes, progressRes] = await Promise.all([
      apiFetchJson('/api/me'),
      apiFetchJson('/api/dashboard'),
      apiFetchJson('/api/recommendations'),
      apiFetchJson('/api/library'),
      apiFetchJson('/api/progress')
    ]);

    if (meRes.ok) {
      remoteData.me = meRes.payload;
    }
    if (dashboardRes.ok) {
      const dashboardPayload = dashboardRes.payload || null;
      if (dashboardPayload && dashboardPayload.featured?.episode) {
        dashboardPayload.featured = {
          ...dashboardPayload.featured,
          episode: normalizeEpisode(dashboardPayload.featured.episode, 0)
        };
      }
      if (dashboardPayload?.latest_release) {
        dashboardPayload.latest_release = normalizeEpisode(dashboardPayload.latest_release, 0);
      }
      remoteData.dashboard = dashboardPayload;
    }
    if (recRes.ok) {
      remoteData.recommendations = normalizeRecommendationItems(recRes.payload?.items);
    }
    if (libraryRes.ok) {
      remoteData.library = libraryRes.payload || null;
      applyRemoteLibrary(libraryRes.payload);
    }
    if (progressRes.ok) {
      remoteData.progress = progressRes.payload || null;
      applyRemoteProgress(progressRes.payload);
    }

    persist();
    renderAuth();
    render();
  } catch (error) {
    console.warn('Could not refresh remote data:', error.message);
    if (!silent) {
      toast('Could not sync live dashboard data.');
    }
  } finally {
    remoteSyncInFlight = false;
  }
}

async function syncSaveToApi(episodeId, saved) {
  if (!isUserSignedIn()) return;
  const response = await apiFetchJson('/api/library', {
    method: 'POST',
    body: JSON.stringify({
      episode_id: episodeId,
      saved
    })
  });
  if (!response.ok || response.payload?.ok === false) {
    console.warn('Could not sync save state:', response.payload?.details || response.status);
    return;
  }
  await refreshRemoteData({ silent: true });
}

async function syncProgressToApi({ episodeId, percent, event = '', refreshDashboard = false }) {
  if (!isUserSignedIn() || !episodeId) return;
  const response = await apiFetchJson('/api/progress', {
    method: 'POST',
    body: JSON.stringify({
      episode_id: episodeId,
      progress_percent: Number(percent),
      event
    })
  });
  if (!response.ok || response.payload?.ok === false) {
    console.warn('Could not sync progress:', response.payload?.details || response.status);
    return;
  }
  if (refreshDashboard) {
    await refreshRemoteData({ silent: true });
  }
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
    authAreaEl.innerHTML = '';
    return;
  }

  const displayName = remoteData.me?.user?.full_name || authDisplayName(authState.user);

  authAreaEl.innerHTML = `
    <div class="auth-user">
      <span class="auth-chip">${escapeHtml(displayName)}</span>
      <button class="soft-btn" data-action="auth-logout" type="button">Sign out</button>
    </div>
  `;
}

function renderAuthGate() {
  const isLoading = authState.status === 'loading';
  const loginReady = authState.enabled && !authState.user && !authState.providerError;
  const loginUnavailable = !authState.enabled && !isLoading;
  const providerBlocked = Boolean(authState.providerError);
  const releasedCount = getReleasedEpisodes().length;
  const upcomingCount = getUpcomingEpisodes().length;
  const statusMessage = isLoading
    ? 'Checking your session and preparing Google sign-in...'
    : loginReady
      ? 'Create your account with Google to unlock personalized episodes, saved picks, and progress sync.'
      : providerBlocked
        ? authState.providerError
        : 'Google login is currently unavailable for this build.';

  appEl.innerHTML = `
    <section class="auth-gate card">
      <div class="auth-gate-shell">
        <div class="auth-gate-story">
          <p class="kicker">Mindful Start</p>
          <h2>Build calm momentum in 5-minute episodes.</h2>
          <p class="helper">Short Gita-inspired audio sessions personalized around your language, goals, and listening rhythm.</p>
          <div class="hero-pills">
            <span class="hero-pill">${releasedCount} episodes live</span>
            <span class="hero-pill">${upcomingCount} upcoming</span>
            <span class="hero-pill">Personalized recommendations</span>
          </div>
          <div class="auth-gate-highlights">
            <article class="auth-feature">
              <strong>For You feed</strong>
              <p>Recommendations ranked by your goals, topics, and preferred duration.</p>
            </article>
            <article class="auth-feature">
              <strong>Progress memory</strong>
              <p>Continue listening from where you paused, across sessions.</p>
            </article>
            <article class="auth-feature">
              <strong>Focus-first design</strong>
              <p>No clutter, just a clean stream for daily mental clarity.</p>
            </article>
          </div>
        </div>

        <div class="auth-gate-panel">
          <p class="label">Get Started</p>
          <h3>Create your free account</h3>
          <p class="helper">${statusMessage}</p>
          <div class="auth-gate-actions">
            ${loginReady ? '<button class="google-btn" data-action="auth-google" type="button"><span class="google-mark">G</span>Start with Google</button>' : ''}
            ${isLoading ? '<span class="auth-note">Please wait...</span>' : ''}
            ${loginUnavailable ? '<p class="auth-alert">Configure Supabase auth keys in Vercel to enable Google login.</p>' : ''}
            ${providerBlocked ? '<p class="auth-alert">Google provider is disabled in Supabase Auth. Enable it and retry.</p>' : ''}
          </div>
          <p class="note">No password setup needed. We only sync profile, preferences, and listening progress.</p>
        </div>
      </div>
    </section>
  `;
}

async function initAuth() {
  renderAuth();
  render();

  try {
    const response = await fetch('/api/auth-config', {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      authState.enabled = false;
      authState.status = 'disabled';
      renderAuth();
      render();
      return;
    }

    const payload = await response.json();
    if (!payload.enabled || !payload.supabaseUrl || !payload.supabaseAnonKey) {
      authState.enabled = false;
      authState.status = 'disabled';
      renderAuth();
      render();
      return;
    }

    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      authState.enabled = false;
      authState.status = 'disabled';
      renderAuth();
      render();
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
    authState.providerError = '';
    if (authState.user) {
      await syncUserProfile(authState.user);
      const profile = await fetchUserProfile(authState.user.id);
      setPreferencesFromSource(profile || defaultPreferences());
      if (needsBlockingOnboarding()) {
        setOnboardingMode('blocking');
      } else {
        setOnboardingMode(null);
      }
      await refreshRemoteData({ silent: true });
    } else {
      resetRemoteData();
      setOnboardingMode(null);
    }
    renderAuth();
    render();

    if (authSubscription?.subscription?.unsubscribe) {
      authSubscription.subscription.unsubscribe();
    }

    const { data } = supabaseClient.auth.onAuthStateChange(async (_event, nextSession) => {
      authState.user = nextSession?.user || null;
      authState.status = authState.user ? 'signed_in' : 'signed_out';
      if (authState.user) {
        authState.providerError = '';
        await syncUserProfile(authState.user);
        const profile = await fetchUserProfile(authState.user.id);
        setPreferencesFromSource(profile || defaultPreferences());
        if (needsBlockingOnboarding()) {
          setOnboardingMode('blocking');
        } else if (state.ui.onboardingMode === 'blocking') {
          setOnboardingMode(null);
        }
        await refreshRemoteData({ silent: true });
      } else {
        resetRemoteData();
        setOnboardingMode(null);
      }
      renderAuth();
      render();
    });
    authSubscription = data;
  } catch (error) {
    console.warn('Auth init failed:', error.message);
    authState.enabled = false;
    authState.status = 'disabled';
    renderAuth();
    render();
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
    const msg = String(error.message || '').toLowerCase();
    if (msg.includes('provider is not enabled') || msg.includes('unsupported provider')) {
      authState.providerError = 'Google provider is disabled in Supabase. Enable it in Authentication > Providers > Google, then retry.';
      render();
      toast('Google login disabled in Supabase');
      return;
    }

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

    const parsedUi = parsed.ui || {};
    const parsedPreferences = parsed.preferences || {};

    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      ui: {
        ...structuredClone(DEFAULT_STATE).ui,
        ...parsedUi,
        onboardingMode: parsedUi.onboardingMode === 'edit' ? 'edit' : null,
        onboardingStep: Number.isInteger(parsedUi.onboardingStep) ? parsedUi.onboardingStep : 0
      },
      preferences: normalizePreferences(parsedPreferences),
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
  const language = activeLanguage();
  return episode.variants[language] || episode.variants.English;
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

function isOnboardingActive() {
  return state.ui.onboardingMode === 'blocking' || state.ui.onboardingMode === 'edit';
}

function onboardingSteps() {
  const topics = allTopicOptions();
  const topicMin = topics.length > 0 ? 1 : 0;
  return [
    {
      id: 'preferred_language',
      title: 'Choose your language',
      helper: 'We will prioritize episode transcripts and playback in this language.',
      type: 'single',
      options: LANGUAGE_OPTIONS,
      min: 1,
      max: 1
    },
    {
      id: 'goals',
      title: 'Pick your goals',
      helper: 'Select 1-2 goals so we can focus your recommendations.',
      type: 'multi',
      options: GOAL_OPTIONS,
      min: 1,
      max: 2
    },
    {
      id: 'preferred_tags',
      title: 'Pick topics you care about',
      helper:
        topics.length > 0
          ? 'Select 1-3 topics from our episode catalog.'
          : 'Topics will appear after episodes are published. You can update this later.',
      type: 'multi',
      options: topics,
      min: topicMin,
      max: 3
    },
    {
      id: 'preferred_episode_length_min',
      title: 'Preferred episode length',
      helper: 'Choose the length you are most likely to complete regularly.',
      type: 'single',
      options: LENGTH_OPTIONS.map((item) => String(item)),
      min: 1,
      max: 1
    },
    {
      id: 'preferred_time_slot',
      title: 'Best listening time',
      helper: 'We will lightly boost episodes that fit this listening window.',
      type: 'single',
      options: TIME_SLOT_OPTIONS,
      min: 1,
      max: 1
    }
  ];
}

function currentOnboardingStepConfig() {
  const steps = onboardingSteps();
  const index = Math.min(Math.max(state.ui.onboardingStep || 0, 0), steps.length - 1);
  return {
    steps,
    index,
    config: steps[index]
  };
}

function selectionCountForStep(config, draft) {
  if (config.type === 'single') {
    return draft[config.id] ? 1 : 0;
  }
  return Array.isArray(draft[config.id]) ? draft[config.id].length : 0;
}

function validateOnboardingStep(stepIndex, draft) {
  const steps = onboardingSteps();
  const config = steps[stepIndex];
  if (!config) return { ok: false, message: 'Invalid step' };

  if (config.id === 'preferred_language') {
    const ok = LANGUAGE_OPTIONS.includes(draft.preferred_language);
    return ok ? { ok: true } : { ok: false, message: 'Please choose one language.' };
  }

  if (config.id === 'goals') {
    const count = Array.isArray(draft.goals) ? draft.goals.length : 0;
    if (count < 1 || count > 2) {
      return { ok: false, message: 'Choose 1-2 goals before continuing.' };
    }
    return { ok: true };
  }

  if (config.id === 'preferred_tags') {
    const count = Array.isArray(draft.preferred_tags) ? draft.preferred_tags.length : 0;
    const min = Number(config.min ?? 1);
    const max = Number(config.max ?? 3);
    if (count < min || count > max) {
      return {
        ok: false,
        message: min > 0 ? `Choose ${min}-${max} topics before continuing.` : `Choose up to ${max} topics before continuing.`
      };
    }
    return { ok: true };
  }

  if (config.id === 'preferred_episode_length_min') {
    const ok = LENGTH_OPTIONS.includes(Number(draft.preferred_episode_length_min));
    return ok ? { ok: true } : { ok: false, message: 'Choose your preferred episode length.' };
  }

  if (config.id === 'preferred_time_slot') {
    const ok = TIME_SLOT_OPTIONS.includes(draft.preferred_time_slot);
    return ok ? { ok: true } : { ok: false, message: 'Choose your preferred listening time.' };
  }

  return { ok: false, message: 'Please complete this step.' };
}

function toggleDraftChoice(field, value, maxCount) {
  const current = Array.isArray(onboardingDraft[field]) ? onboardingDraft[field] : [];
  const exists = current.includes(value);
  if (exists) {
    onboardingDraft[field] = current.filter((item) => item !== value);
    return;
  }

  if (current.length >= maxCount) {
    toast(`You can select up to ${maxCount} options.`);
    return;
  }

  onboardingDraft[field] = [...current, value];
}

function handleOnboardingSelection(field, rawValue) {
  if (onboardingSaving) return;
  const value = String(rawValue || '').trim();
  if (!value) return;

  if (field === 'preferred_language' && LANGUAGE_OPTIONS.includes(value)) {
    onboardingDraft.preferred_language = value;
  }

  if (field === 'goals' && GOAL_OPTIONS.includes(value)) {
    toggleDraftChoice(field, value, 2);
  }

  if (field === 'preferred_tags') {
    const normalized = value.toLowerCase();
    const topics = allTopicOptions();
    if (topics.includes(normalized)) {
      toggleDraftChoice(field, normalized, 3);
    }
  }

  if (field === 'preferred_episode_length_min' && LENGTH_OPTIONS.includes(Number(value))) {
    onboardingDraft.preferred_episode_length_min = Number(value);
  }

  if (field === 'preferred_time_slot' && TIME_SLOT_OPTIONS.includes(value)) {
    onboardingDraft.preferred_time_slot = value;
  }

  render();
}

function openPreferencesEditor() {
  if (!isUserSignedIn()) return;
  setOnboardingMode('edit');
  render();
}

function cancelOnboardingEditor() {
  if (state.ui.onboardingMode !== 'edit') return;
  onboardingDraft = normalizePreferences(state.preferences);
  setOnboardingMode(null);
  render();
}

function goToNextOnboardingStep() {
  const { steps, index } = currentOnboardingStepConfig();
  const validation = validateOnboardingStep(index, onboardingDraft);
  if (!validation.ok) {
    toast(validation.message);
    return;
  }

  state.ui.onboardingStep = Math.min(index + 1, steps.length - 1);
  persist();
  render();
}

function goToPreviousOnboardingStep() {
  const { index } = currentOnboardingStepConfig();
  state.ui.onboardingStep = Math.max(index - 1, 0);
  persist();
  render();
}

async function finishOnboarding() {
  if (!authState.user?.id || !supabaseClient || onboardingSaving) return;

  const steps = onboardingSteps();
  for (let i = 0; i < steps.length; i += 1) {
    const validation = validateOnboardingStep(i, onboardingDraft);
    if (!validation.ok) {
      state.ui.onboardingStep = i;
      persist();
      render();
      toast(validation.message);
      return;
    }
  }

  onboardingSaving = true;
  render();

  const payload = {
    ...profilePayloadFromUser(authState.user),
    ...preferencesPayload({
      ...onboardingDraft,
      onboarding_completed: true
    })
  };

  const saved = await upsertUserProfile(payload, { showToastOnError: true });

  onboardingSaving = false;

  if (!saved) {
    render();
    return;
  }

  setPreferencesFromSource(payload);
  setOnboardingMode(null);
  await refreshRemoteData({ silent: true });
  toast('Preferences saved');
  render();
}

function goalTagSet(goals) {
  const set = new Set();
  (goals || []).forEach((goal) => {
    const mapped = GOAL_TAG_MAP[goal] || [];
    mapped.forEach((tag) => set.add(tag));
  });
  return set;
}

function countOverlap(baseTags, preferenceTags) {
  const prefSet = new Set((preferenceTags || []).map((item) => String(item).toLowerCase()));
  return baseTags.filter((tag) => prefSet.has(tag)).length;
}

function recommendationForEpisode(episode, preferences) {
  const episodeTags = episode.tags.map((tag) => String(tag).toLowerCase());
  const topicOverlap = countOverlap(episodeTags, preferences.preferred_tags);
  const topicScore = Math.min(topicOverlap * 4, 12);

  const goalTags = Array.from(goalTagSet(preferences.goals));
  const goalOverlap = countOverlap(episodeTags, goalTags);
  const goalScore = Math.min(goalOverlap * 3, 9);

  let durationScore = 0;
  const preferredLength = Number(preferences.preferred_episode_length_min);
  if (preferredLength === episode.durationMin) {
    durationScore = 2;
  } else if (Math.abs(preferredLength - episode.durationMin) <= 2) {
    durationScore = 1;
  }

  const slotTags = TIME_SLOT_TAG_MAP[preferences.preferred_time_slot] || [];
  const slotOverlap = countOverlap(episodeTags, slotTags);
  const timeScore = slotOverlap > 0 ? 1 : 0;

  const score = topicScore + goalScore + durationScore + timeScore;

  let reason = 'Recommended from latest releases';
  if (topicOverlap > 0) {
    reason = `${topicOverlap} topic match${topicOverlap === 1 ? '' : 'es'}`;
  } else if (goalOverlap > 0) {
    reason = 'Aligned with your goals';
  } else if (durationScore === 2) {
    reason = 'Matches your preferred length';
  } else if (timeScore > 0 && preferences.preferred_time_slot) {
    reason = `Fits your ${preferences.preferred_time_slot.toLowerCase()} listening`;
  }

  return {
    episode,
    score,
    reason
  };
}

function forYouRecommendations() {
  const released = getReleasedEpisodes();
  const preferences = normalizePreferences(state.preferences);
  return released
    .map((episode) => recommendationForEpisode(episode, preferences))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.episode.releaseAt - a.episode.releaseAt;
    })
    .slice(0, 6);
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
  let nextSaved = false;
  if (state.savedIds.includes(id)) {
    state.savedIds = state.savedIds.filter((entry) => entry !== id);
    nextSaved = false;
    toast('Removed from library');
    track('unsave_episode', { episodeId: id });
  } else {
    state.savedIds = [id, ...state.savedIds];
    nextSaved = true;
    toast('Saved to library');
    track('save_episode', { episodeId: id });
  }
  persist();
  render();
  syncSaveToApi(id, nextSaved);
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
  syncProgressToApi({ episodeId: id, percent, event: 'start' });
}

function pausePlayback() {
  if (state.player.status !== 'playing') return;
  const episodeId = state.player.episodeId;
  const percent = state.player.percent;
  state.player.status = 'paused';
  track('pause_playback', { episodeId: state.player.episodeId });
  persist();
  clearTick();

  if ('speechSynthesis' in window && speechSynthesis.speaking) {
    speechSynthesis.pause();
  }

  renderPlayer();
  syncProgressToApi({ episodeId, percent });
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
  const episodeId = state.player.episodeId;
  const percent = state.player.percent;
  clearTick();
  clearSleepTimer();
  stopSpeech();

  if (episodeId) {
    track('stop_playback', {
      episodeId,
      percent
    });
  }

  state.player.status = 'idle';
  state.player.episodeId = null;
  state.player.percent = 0;
  state.player.reflectionEpisodeId = null;
  persist();

  if (showMessage) toast('Playback stopped');

  render();
  syncProgressToApi({ episodeId, percent, refreshDashboard: true });
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
  syncProgressToApi({ episodeId, percent: 100, refreshDashboard: true });
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
  speechToken.lang = speechLocaleForLanguage(activeLanguage());
  speechSynthesis.speak(speechToken);
}

function prettyTopic(topic) {
  return topic
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function onboardingOptionButtons(config) {
  if (!config) return '';
  const currentValue = onboardingDraft[config.id];

  return config.options
    .map((option) => {
      const value = String(option);
      const display = config.id === 'preferred_tags' ? prettyTopic(value) : value;
      const selected =
        config.type === 'single'
          ? String(currentValue) === value
          : Array.isArray(currentValue) && currentValue.includes(value);

      return `
        <button
          type="button"
          class="option-btn ${selected ? 'active' : ''}"
          data-action="onboarding-select"
          data-field="${config.id}"
          data-value="${escapeHtml(value)}"
          ${onboardingSaving ? 'disabled' : ''}
        >
          ${escapeHtml(display)}
        </button>
      `;
    })
    .join('');
}

function renderOnboardingFlow() {
  const { steps, index, config } = currentOnboardingStepConfig();
  const total = steps.length;
  const selectedCount = selectionCountForStep(config, onboardingDraft);
  const isLast = index === total - 1;
  const isBlocking = state.ui.onboardingMode === 'blocking';
  const progressPercent = Math.round(((index + 1) / total) * 100);
  const countHint =
    config.type === 'multi'
      ? `Selected ${selectedCount} of ${config.max} (min ${config.min})`
      : selectedCount
        ? 'Selection complete'
        : 'Select one option';

  appEl.innerHTML = `
    <section class="onboard card">
      <div class="onboard-card">
        <p class="kicker">${isBlocking ? 'Complete Setup' : 'Preferences'}</p>
        <h2>Personalize your listening</h2>
        <p class="helper">Step ${index + 1} of ${total} · ${progressPercent}% complete</p>
        <div class="progress"><span style="width:${progressPercent}%;"></span></div>

        <div class="empty">
          <p class="label">${escapeHtml(config.title)}</p>
          <p class="note">${escapeHtml(config.helper)}</p>
          <p class="note" style="margin-top:0.45rem;">${countHint}</p>
          <div class="onboard-grid" style="margin-top:0.8rem;">
            ${onboardingOptionButtons(config)}
          </div>
        </div>

        <div class="onboard-actions">
          <div class="actions">
            <button type="button" class="soft-btn" data-action="onboarding-back" ${index === 0 || onboardingSaving ? 'disabled' : ''}>Back</button>
            ${!isBlocking ? `<button type="button" class="ghost-btn" data-action="onboarding-cancel" ${onboardingSaving ? 'disabled' : ''}>Cancel</button>` : ''}
          </div>
          <div class="actions">
            ${!isLast ? `<button type="button" class="primary-btn" data-action="onboarding-next" ${onboardingSaving ? 'disabled' : ''}>Next</button>` : `<button type="button" class="primary-btn" data-action="onboarding-finish" ${onboardingSaving ? 'disabled' : ''}>${onboardingSaving ? 'Saving...' : 'Finish'}</button>`}
          </div>
        </div>
      </div>
    </section>
  `;
}

function render() {
  const signedIn = isUserSignedIn();
  if (resetButton) {
    resetButton.hidden = !signedIn;
  }
  if (preferencesButton) {
    preferencesButton.hidden = !signedIn || state.ui.onboardingMode === 'blocking';
  }

  if (!signedIn) {
    renderAuthGate();
    hideOverlays();
    return;
  }

  if (needsBlockingOnboarding() && state.ui.onboardingMode !== 'edit' && state.ui.onboardingMode !== 'blocking') {
    setOnboardingMode('blocking');
  }

  if (isOnboardingActive()) {
    renderOnboardingFlow();
    hideOverlays();
    return;
  }

  renderMain();
  renderModal();
  renderPlayer();
}

function renderMain() {
  const latest = latestRelease();
  const released = getReleasedEpisodes();
  const upcoming = getUpcomingEpisodes();
  const active = continueListening();
  const forYou = remoteData.recommendations.length ? remoteData.recommendations : forYouRecommendations();
  const firstReleaseDate = EPISODES[0]?.releaseAt;
  const dashboardStats = remoteData.dashboard?.stats || null;
  const releasedCountFromApi = Number.isFinite(Number(dashboardStats?.released_count))
    ? Number(dashboardStats.released_count)
    : 0;
  const upcomingCountFromApi = Number.isFinite(Number(dashboardStats?.upcoming_count))
    ? Number(dashboardStats.upcoming_count)
    : 0;
  const savedCountFromApi = Number.isFinite(Number(dashboardStats?.saved_count))
    ? Number(dashboardStats.saved_count)
    : 0;
  const continueCountFromApi = Number.isFinite(Number(dashboardStats?.continue_listening_count))
    ? Number(dashboardStats.continue_listening_count)
    : 0;
  const startCountFromApi = Number.isFinite(Number(dashboardStats?.play_starts_count))
    ? Number(dashboardStats.play_starts_count)
    : 0;

  const releasedCount = Math.max(released.length, releasedCountFromApi);
  const upcomingCount = Math.max(upcoming.length, upcomingCountFromApi);
  const savedCount = Math.max(state.savedIds.length, savedCountFromApi);
  const continueCount = Math.max(active.length, continueCountFromApi);
  const startCount = Math.max(
    state.analytics.events.filter((entry) => entry.event === 'start_playback').length,
    startCountFromApi
  );

  const featuredPick = remoteData.dashboard?.featured || forYou[0] || (latest ? { episode: latest, reason: 'Newest release for you' } : null);
  const featuredEpisode = featuredPick?.episode || null;
  const featuredVariant = featuredEpisode ? getVariant(featuredEpisode) : null;
  const featuredReleased = featuredEpisode ? isReleased(featuredEpisode) : false;
  const todayLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  });
  const rawName = remoteData.me?.user?.full_name || remoteData.dashboard?.user?.full_name || authDisplayName(authState.user);
  const firstName = rawName.includes('@')
    ? rawName.split('@')[0]
    : rawName
        .trim()
        .split(/\s+/)
        .filter(Boolean)[0] || 'there';

  appEl.innerHTML = `
    <section class="home-hero card">
      <div class="home-hero-grid">
        <div class="home-hero-main">
          <p class="kicker">Daily Momentum • ${todayLabel}</p>
          <h2>${escapeHtml(firstName)}, your mindful stream is ready</h2>
          <p class="helper">Built around your language, goals, topics, preferred length, and listening time.</p>
          <div class="hero-pills">
            <span class="hero-pill">Language: ${activeLanguage()}</span>
            <span class="hero-pill">${releasedCount} released</span>
            <span class="hero-pill">${upcomingCount} upcoming</span>
            <span class="hero-pill">${savedCount} saved</span>
          </div>
          ${latest ? `
            <div class="actions">
              <button class="primary-btn" data-action="play" data-id="${latest.id}">Play Latest</button>
              <button class="soft-btn" data-action="open" data-id="${latest.id}">View Episode</button>
            </div>
          ` : '<p class="note">First release is coming soon.</p>'}
        </div>

        ${featuredEpisode ? `
          <article class="hero-spotlight">
            <p class="label">Best Match Right Now</p>
            <h3>${featuredEpisode.title}</h3>
            <p class="summary">${featuredVariant.summary}</p>
            ${featuredPick.reason ? `<p class="match-reason">${escapeHtml(featuredPick.reason)}</p>` : ''}
            <div class="quick">
              ${featuredEpisode.tags.slice(0, 3).map((tag) => `<span class="pill">${tag}</span>`).join('')}
            </div>
            <div class="actions">
              <button class="primary-btn" data-action="play" data-id="${featuredEpisode.id}" ${featuredReleased ? '' : 'disabled'}>${featuredReleased ? 'Play This' : 'Releases Soon'}</button>
              <button class="soft-btn" data-action="open" data-id="${featuredEpisode.id}">Details</button>
            </div>
          </article>
        ` : ''}
      </div>
    </section>

    <section class="home-metrics">
      <article class="dash-stat card">
        <span class="label">Latest Release</span>
        <strong>${latest ? latest.title : 'Not Released Yet'}</strong>
        <p class="note">${latest ? `${releaseBadge(latest)} | ${formatDate(latest.releaseAt)}` : firstReleaseDate ? `Starts ${formatDate(firstReleaseDate)}` : 'Release schedule updating'}</p>
      </article>
      <article class="dash-stat card">
        <span class="label">Continue Listening</span>
        <strong>${continueCount}</strong>
        <p class="note">${continueCount ? 'Pick up where you left off in one tap.' : 'Start one episode to build your rhythm.'}</p>
      </article>
      <article class="dash-stat card">
        <span class="label">Play Starts</span>
        <strong>${startCount}</strong>
        <p class="note">Local listening starts tracked on this device.</p>
      </article>
    </section>

    <section class="tabs card">
      ${tabButton('home', 'Home')}
      ${tabButton('library', 'Library')}
      ${tabButton('schedule', 'Schedule')}
    </section>

    ${state.tab === 'home' ? personalizedSection(forYou) : ''}
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

function personalizedSection(items) {
  if (!items.length) return '';
  const [first, ...rest] = items;
  const secondary = rest.length ? rest : [first];

  return `
    <section class="section card for-you">
      <div class="section-head">
        <div>
          <p class="label">For You</p>
          <h3>Your tailored queue</h3>
        </div>
        <p class="note">Ranked by goals, topics, length, and time slot match.</p>
      </div>
      <div class="for-you-layout">
        <div class="for-you-feature">
          ${episodeCard(first.episode, {
            matchReason: first.reason
          })}
        </div>
        <div class="for-you-list">
          ${secondary
            .map((item) =>
              episodeCard(item.episode, {
                matchReason: item.reason
              })
            )
            .join('')}
        </div>
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
      <div class="shelf-grid">
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

function episodeCard(episode, options = {}) {
  const variant = getVariant(episode);
  const percent = progressOf(episode.id);
  const released = isReleased(episode);
  const matchReason = options.matchReason ? escapeHtml(options.matchReason) : '';

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
      ${matchReason ? `<p class="match-reason">${matchReason}</p>` : ''}
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
            <span class="pill">${activeLanguage()}</span>
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
  onboardingDraft = normalizePreferences(state.preferences);
  persist();
  render();
  toast('Local data reset');
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === 'auth-google') {
    signInWithGoogle();
    return;
  }

  if (action === 'auth-logout') {
    signOutUser();
    return;
  }

  if (!isUserSignedIn()) return;

  if (action === 'open-preferences') {
    openPreferencesEditor();
    return;
  }

  if (action === 'onboarding-select') {
    handleOnboardingSelection(target.dataset.field, target.dataset.value);
    return;
  }

  if (action === 'onboarding-next') {
    goToNextOnboardingStep();
    return;
  }

  if (action === 'onboarding-back') {
    goToPreviousOnboardingStep();
    return;
  }

  if (action === 'onboarding-finish') {
    finishOnboarding();
    return;
  }

  if (action === 'onboarding-cancel') {
    cancelOnboardingEditor();
    return;
  }

  if (isOnboardingActive()) return;

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

  if (action === 'toggle-transcript') {
    state.player.transcriptOpen = !state.player.transcriptOpen;
    persist();
    renderPlayer();
  }
});

document.addEventListener('input', (event) => {
  if (!isUserSignedIn()) return;
  if (isOnboardingActive()) return;

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
  if (!isUserSignedIn()) return;
  resetLocalData();
});

async function bootstrap() {
  render();
  renderAuth();
  await Promise.all([initAuth(), hydrateEpisodesFromApi()]);
}

bootstrap();
