// ═══════════════════════════════════════
// FIELD v2 — Data
// Notice · Hold · Anchor · Integrate
// ═══════════════════════════════════════

const TRANSLATIONS = {
  en: {
    // Home
    arrival: 'What are you holding right now?',
    arrivalSub: 'both things are true',

    // Phases
    noticeLabel:    'Notice',
    holdLabel:      'Hold',
    anchorLabel:    'Anchor',
    integrateLabel: 'Integrate',

    noticeHint:    'what is present',
    holdHint:      'stay without fixing',
    anchorHint:    'find the other truth',
    integrateHint: 'land in the wider place',

    // Phase prompts
    noticePrompt:   'What is present right now?\nName it honestly. No story needed.',
    holdPrompt:     'Stay with it.\nFeel where it lives in your body.\nDon\'t try to change it.',
    anchorPrompt:   'What is also true?\nNot the opposite — the complement.\nSomething your lived experience confirms.',
    integratePrompt:'Hold both.\nBreathe.\nWhat becomes available from this wider place?',

    // Polarity work
    heavyEnd:       'What\'s pulling at you',
    lightEnd:       'What\'s also true',
    bothTrue:       'Both of these are true.\nYou are large enough to hold them.',

    // Thread
    threadPrompt:   'one true thing from this session',
    threadHint:     'speak it or write it',

    // Navigation
    retBtn:         'return',
    beginBtn:       'enter',
    continueBtn:    'continue →',
    skipBtn:        'skip',

    // Settings
    apiNote:        'stored locally · never transmitted',

    // Session
    sessionCount: n => n === 1 ? 'first session' : `${n} sessions`,
    streakLabel: n => `${n} days`,

    // AI system prompts are in app.js
  },
  es: {
    arrival: '¿Qué estás sosteniendo ahora mismo?',
    arrivalSub: 'las dos cosas son verdad',

    noticeLabel:    'Notar',
    holdLabel:      'Sostener',
    anchorLabel:    'Anclar',
    integrateLabel: 'Integrar',

    noticeHint:    'lo que está presente',
    holdHint:      'quedarse sin arreglar',
    anchorHint:    'encontrar la otra verdad',
    integrateHint: 'aterrizar en el lugar más amplio',

    noticePrompt:   '¿Qué está presente ahora mismo?\nNómbralo honestamente. Sin historia.',
    holdPrompt:     'Quédate con ello.\nSiente dónde vive en tu cuerpo.\nNo intentes cambiarlo.',
    anchorPrompt:   '¿Qué también es verdad?\nNo lo opuesto — el complemento.\nAlgo que tu experiencia vivida confirma.',
    integratePrompt:'Sostén ambos.\nRespira.\n¿Qué está disponible desde este lugar más amplio?',

    heavyEnd:       'Lo que te pesa',
    lightEnd:       'Lo que también es verdad',
    bothTrue:       'Las dos cosas son verdad.\nEres suficientemente grande para sostenerlas.',

    threadPrompt:   'una cosa verdadera de esta sesión',
    threadHint:     'dilo o escríbelo',

    retBtn:         'volver',
    beginBtn:       'entrar',
    continueBtn:    'continuar →',
    skipBtn:        'omitir',

    apiNote:        'guardado localmente · nunca transmitido',

    sessionCount: n => n === 1 ? 'primera sesión' : `${n} sesiones`,
    streakLabel: n => `${n} días`,
  }
};

// The contractions — what people carry into the app
// Heavy end of common polarities
const CONTRACTIONS = {
  en: [
    'Anxious',    'Overwhelmed', 'Stuck',
    'Scattered',  'Afraid',      'Heavy',
    'Angry',      'Numb',        'Disconnected',
    'Contracted', 'Unworthy',    'Exhausted'
  ],
  es: [
    'Ansioso',    'Agobiado',    'Bloqueado',
    'Disperso',   'Asustado',    'Pesado',
    'Enojado',    'Apagado',     'Desconectado',
    'Contraído',  'Indigno',     'Agotado'
  ]
};

// The frequencies — what wants to be anchored
// These aren't fixes — they're genuine available states
const FREQUENCIES = {
  en: [
    { name:'Steady',    hint:'the ground beneath the turbulence' },
    { name:'Open',      hint:'wider than this moment' },
    { name:'Clear',     hint:'signal through the noise' },
    { name:'Present',   hint:'only this, only now' },
    { name:'Held',      hint:'you are not alone in this' },
    { name:'Spacious',  hint:'room for all of it' },
    { name:'Trusting',  hint:'the evidence of your life' },
    { name:'Luminous',  hint:'the light that doesn\'t depend on circumstances' },
  ],
  es: [
    { name:'Firme',     hint:'el suelo bajo la turbulencia' },
    { name:'Abierto',   hint:'más amplio que este momento' },
    { name:'Claro',     hint:'señal a través del ruido' },
    { name:'Presente',  hint:'solo esto, solo ahora' },
    { name:'Sostenido', hint:'no estás solo en esto' },
    { name:'Espacioso', hint:'lugar para todo ello' },
    { name:'Confiando', hint:'la evidencia de tu vida' },
    { name:'Luminoso',  hint:'la luz que no depende de las circunstancias' },
  ]
};

// Polarity pairs — the complementary truth for each contraction
// AI generates bespoke ones, but these seed the practice
const POLARITY_SEEDS = {
  en: {
    Anxious:      "And somewhere in me, there is a stillness that the anxiety moves through.",
    Overwhelmed:  "And I have always found a way through. Every time.",
    Stuck:        "And something in me already knows the next small step.",
    Scattered:    "And my attention, when I choose it, is precise and clear.",
    Afraid:       "And I have met fear before, and I am still here.",
    Heavy:        "And this weight means something matters. I am not empty.",
    Angry:        "And beneath this anger, there is something I care about deeply.",
    Numb:         "And the fact that I notice the numbness means I am still present.",
    Disconnected: "And connection has found me before, without me forcing it.",
    Contracted:   "And expansion is my natural state. Contraction is temporary.",
    Unworthy:     "And I am here. I keep showing up. That is evidence.",
    Exhausted:    "And rest is not weakness. The field replenishes."
  },
  es: {
    Ansioso:      "Y en algún lugar en mí, hay una quietud a través de la cual se mueve la ansiedad.",
    Agobiado:     "Y siempre he encontrado un camino. Cada vez.",
    Bloqueado:    "Y algo en mí ya conoce el siguiente pequeño paso.",
    Disperso:     "Y mi atención, cuando la elijo, es precisa y clara.",
    Asustado:     "Y ya he enfrentado el miedo antes, y sigo aquí.",
    Pesado:       "Y este peso significa que algo importa. No estoy vacío.",
    Enojado:      "Y debajo de este enojo, hay algo que me importa profundamente.",
    Apagado:      "Y el hecho de que noto el entumecimiento significa que sigo presente.",
    Desconectado: "Y la conexión me ha encontrado antes, sin que yo la forzara.",
    Contraído:    "Y la expansión es mi estado natural. La contracción es temporal.",
    Indigno:      "Y estoy aquí. Sigo apareciendo. Eso es evidencia.",
    Agotado:      "Y el descanso no es debilidad. El campo se repone."
  }
};

// Witnessed — the closing reflection after a complete session
const WITNESSED = {
  en: {
    Anxious:      "Anxious was held without being fixed. That is the practice.",
    Overwhelmed:  "You stayed with Overwhelmed and found the ground beneath it.",
    Stuck:        "Stuck was seen. Something moved, even slightly.",
    Scattered:    "You gathered Scattered without forcing it to cohere.",
    Afraid:       "Afraid was met with presence. That took courage.",
    Heavy:        "You held Heavy and found you were large enough.",
    Angry:        "Angry was witnessed. The care beneath it became visible.",
    Numb:         "Even Numb was met. The fact of meeting it is everything.",
    Disconnected: "Disconnected was not avoided. Connection knows the way back.",
    Contracted:   "Contraction was held until expansion became possible.",
    Unworthy:     "Unworthy was seen clearly. The evidence says otherwise.",
    Exhausted:    "Exhausted was honoured. Rest is part of the field."
  },
  es: {
    Ansioso:      "Ansioso fue sostenido sin ser arreglado. Eso es la práctica.",
    Agobiado:     "Te quedaste con Agobiado y encontraste el suelo bajo él.",
    Bloqueado:    "Bloqueado fue visto. Algo se movió, aunque sea ligeramente.",
    Disperso:     "Reuniste Disperso sin forzar la coherencia.",
    Asustado:     "Asustado fue encontrado con presencia. Eso requirió valentía.",
    Pesado:       "Sostuviste Pesado y descubriste que eras suficientemente grande.",
    Enojado:      "Enojado fue atestiguado. El cuidado debajo se hizo visible.",
    Apagado:      "Incluso Apagado fue encontrado. El hecho de encontrarlo lo es todo.",
    Desconectado: "Desconectado no fue evitado. La conexión conoce el camino de regreso.",
    Contraído:    "La contracción fue sostenida hasta que la expansión fue posible.",
    Indigno:      "Indigno fue visto claramente. La evidencia dice lo contrario.",
    Agotado:      "Agotado fue honrado. El descanso es parte del campo."
  }
};

// Body zones for somatic location
const BODY_ZONES = {
  en: ['head', 'throat', 'chest', 'heart', 'solar plexus', 'belly', 'pelvis'],
  es: ['cabeza', 'garganta', 'pecho', 'corazón', 'plexo solar', 'vientre', 'pelvis']
};

// Breath invitations — used during Hold and Anchor phases
const BREATH_CUES = {
  en: {
    inhale: 'breathe in — all of it',
    hold:   'hold — both things at once',
    exhale: 'release — nothing needs resolving'
  },
  es: {
    inhale: 'inhala — todo ello',
    hold:   'sostén — las dos cosas a la vez',
    exhale: 'suelta — nada necesita resolverse'
  }
};
