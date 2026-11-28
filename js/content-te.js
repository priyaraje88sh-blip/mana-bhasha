// మన భాష — Telugu course content.
// Every word here must be checked by a fluent Telugu speaker before launch (Rule 1).
// pic = emoji (rendered by the device's own font; no image files are shipped).
"use strict";

const VOWEL_SIGNS = ["", "ా", "ి", "ీ", "ు", "ూ", "ృ", "ౄ", "ె", "ే", "ై", "ొ", "ో", "ౌ", "ం", "ః"];

const TE = {
  lang: "te",
  name: "తెలుగు",
  worlds: [
    {
      id: "achulu", te: "అచ్చుల లోకం", en: "Vowels", icon: "అ", color: "#ff7a59", free: true,
      intro: "Vowels are the 'breath' letters. Telugu has 16. Let's meet them!",
      lessons: [
        { id: "v1", title: "అ ఆ ఇ ఈ", type: "letters", items: [
          { t: "అ", s: "a", hint: "like 'a' in about", w: "అమ్మ", en: "Mother", pic: "👩‍👧" },
          { t: "ఆ", s: "aa", hint: "like 'a' in father", w: "ఆవు", en: "Cow", pic: "🐄" },
          { t: "ఇ", s: "i", hint: "like 'i' in sit", w: "ఇల్లు", en: "House", pic: "🏠" },
          { t: "ఈ", s: "ee", hint: "like 'ee' in see", w: "ఈగ", en: "Housefly", pic: "🪰" },
        ]},
        { id: "v2", title: "ఉ ఊ ఋ ౠ", type: "letters", items: [
          { t: "ఉ", s: "u", hint: "like 'u' in put", w: "ఉడుత", en: "Squirrel", pic: "🐿️" },
          { t: "ఊ", s: "oo", hint: "like 'oo' in moon", w: "ఊరు", en: "Village", pic: "🏘️" },
          { t: "ఋ", s: "ru", hint: "a short 'ru'", w: "ఋషి", en: "Sage", pic: "🧘" },
          { t: "ౠ", s: "roo", hint: "a long 'roo' — rarely used", w: null, en: "Rarely used in words", pic: "✨" },
        ]},
        { id: "v3", title: "ఎ ఏ ఐ ఒ", type: "letters", items: [
          { t: "ఎ", s: "e", hint: "like 'e' in pen", w: "ఎలుక", en: "Mouse", pic: "🐭" },
          { t: "ఏ", s: "ē", hint: "long 'e', like 'a' in late", w: "ఏనుగు", en: "Elephant", pic: "🐘" },
          { t: "ఐ", s: "ai", hint: "like 'i' in kite", w: "ఐదు", en: "Five", pic: "🖐️" },
          { t: "ఒ", s: "o", hint: "a short 'o'", w: "ఒంటె", en: "Camel", pic: "🐪" },
        ]},
        { id: "v4", title: "ఓ ఔ అం అః", type: "letters", items: [
          { t: "ఓ", s: "ō", hint: "long 'o', like 'oa' in boat", w: "ఓడ", en: "Ship", pic: "🚢" },
          { t: "ఔ", s: "au", hint: "like 'ou' in out", w: "ఔషధం", en: "Medicine", pic: "💊" },
          { t: "అం", s: "am", hint: "'a' with a soft 'm' (sunna)", w: "అంగడి", en: "Shop", pic: "🏪" },
          { t: "అః", s: "aha", hint: "'a' with a breath (visargam)", w: null, en: "Rarely starts a word", pic: "🌬️" },
        ]},
      ],
    },
    {
      id: "hallulu", te: "హల్లుల లోకం", en: "Consonants", icon: "క", color: "#4d9de0",
      intro: "Consonants are the 'body' letters. Telugu has 36. Each one already has 'a' inside it: క = k + a.",
      lessons: [
        { id: "h1", title: "క ఖ గ ఘ ఙ", type: "letters", items: [
          { t: "క", s: "ka", w: "కప్ప", en: "Frog", pic: "🐸" },
          { t: "ఖ", s: "kha", hint: "'k' with a puff of air", w: "ఖర్జూరం", en: "Dates (fruit)", pic: "🌴" },
          { t: "గ", s: "ga", w: "గంట", en: "Bell", pic: "🔔" },
          { t: "ఘ", s: "gha", hint: "'g' with a puff of air", w: "ఘటం", en: "Pot", pic: "🏺" },
          { t: "ఙ", s: "ṅa", hint: "nasal 'ng' — rarely used", w: null, en: "Rarely used", pic: "✨" },
        ]},
        { id: "h2", title: "చ ఛ జ ఝ ఞ", type: "letters", items: [
          { t: "చ", s: "cha", w: "చేప", en: "Fish", pic: "🐟" },
          { t: "ఛ", s: "chha", hint: "'ch' with a puff of air", w: "ఛత్రం", en: "Umbrella", pic: "☂️" },
          { t: "జ", s: "ja", w: "జెండా", en: "Flag", pic: "🚩" },
          { t: "ఝ", s: "jha", hint: "'j' with a puff of air — rarely used", w: null, en: "Rarely used", pic: "✨" },
          { t: "ఞ", s: "ña", hint: "nasal 'ny' — found in జ్ఞానం (knowledge)", w: null, en: "Rarely used", pic: "✨" },
        ]},
        { id: "h3", title: "ట ఠ డ ఢ ణ", type: "letters", items: [
          { t: "ట", s: "ṭa", hint: "tongue curled back", w: "టమాట", en: "Tomato", pic: "🍅" },
          { t: "ఠ", s: "ṭha", hint: "found in కంఠం (throat)", w: null, en: "Rarely starts a word", pic: "✨" },
          { t: "డ", s: "ḍa", hint: "tongue curled back", w: "డప్పు", en: "Drum", pic: "🥁" },
          { t: "ఢ", s: "ḍha", hint: "rarely used", w: null, en: "Rarely used", pic: "✨" },
          { t: "ణ", s: "ṇa", hint: "found in బాణం (arrow)", w: null, en: "Never starts a word", pic: "🏹" },
        ]},
        { id: "h4", title: "త థ ద ధ న", type: "letters", items: [
          { t: "త", s: "ta", hint: "tongue touches teeth", w: "తాబేలు", en: "Tortoise", pic: "🐢" },
          { t: "థ", s: "tha", hint: "found in రథం (chariot)", w: null, en: "Rarely starts a word", pic: "✨" },
          { t: "ద", s: "da", hint: "tongue touches teeth", w: "దీపం", en: "Lamp", pic: "🪔" },
          { t: "ధ", s: "dha", w: "ధనం", en: "Money", pic: "💰" },
          { t: "న", s: "na", w: "నెమలి", en: "Peacock", pic: "🦚" },
        ]},
        { id: "h5", title: "ప ఫ బ భ మ", type: "letters", items: [
          { t: "ప", s: "pa", w: "పువ్వు", en: "Flower", pic: "🌸" },
          { t: "ఫ", s: "pha", w: "ఫలం", en: "Fruit", pic: "🍎" },
          { t: "బ", s: "ba", w: "బంతి", en: "Ball", pic: "⚽" },
          { t: "భ", s: "bha", w: "భవనం", en: "Building", pic: "🏢" },
          { t: "మ", s: "ma", w: "మామిడి", en: "Mango", pic: "🥭" },
        ]},
        { id: "h6", title: "య ర ల వ", type: "letters", items: [
          { t: "య", s: "ya", w: "యంత్రం", en: "Machine", pic: "⚙️" },
          { t: "ర", s: "ra", w: "రైలు", en: "Train", pic: "🚂" },
          { t: "ల", s: "la", w: "లేడి", en: "Deer", pic: "🦌" },
          { t: "వ", s: "va", w: "వంకాయ", en: "Brinjal", pic: "🍆" },
        ]},
        { id: "h7", title: "శ ష స హ", type: "letters", items: [
          { t: "శ", s: "śa", hint: "soft 'sh'", w: "శంఖం", en: "Conch shell", pic: "🐚" },
          { t: "ష", s: "ṣa", hint: "hard 'sh' — found in వర్షం (rain)", w: null, en: "Rarely starts a word", pic: "🌧️" },
          { t: "స", s: "sa", w: "సూర్యుడు", en: "Sun", pic: "☀️" },
          { t: "హ", s: "ha", w: "హంస", en: "Swan", pic: "🦢" },
        ]},
        { id: "h8", title: "ళ క్ష ఱ", type: "letters", items: [
          { t: "ళ", s: "ḷa", hint: "tongue curled back 'l' — found in కళ్ళు (eyes)", w: null, en: "Never starts a word", pic: "👀" },
          { t: "క్ష", s: "kṣa", hint: "k + sh together — found in పక్షి (bird)", w: null, en: "Rarely starts a word", pic: "🐦" },
          { t: "ఱ", s: "ṟa", hint: "old letter, rarely used today", w: null, en: "Old letter", pic: "📜" },
        ]},
      ],
    },
    {
      id: "gunintalu", te: "గుణింతాల లోకం", en: "Guninthalu", icon: "కా", color: "#2bb673",
      intro: "Add a vowel sign to a consonant and it changes its sound: క + ా = కా. This is గుణింతం.",
      lessons: [
        { id: "g1", title: "క గుణింతం", type: "gunintham", base: "క" },
        { id: "g2", title: "గ గుణింతం", type: "gunintham", base: "గ" },
        { id: "g3", title: "చ గుణింతం", type: "gunintham", base: "చ" },
        { id: "g4", title: "ప గుణింతం", type: "gunintham", base: "ప" },
        { id: "g5", title: "మ గుణింతం", type: "gunintham", base: "మ" },
        { id: "g6", title: "గుణింతం పదాలు", type: "words", items: [
          { t: "కాకి", en: "Crow", pic: "🐦‍⬛" },
          { t: "కిటికీ", en: "Window", pic: "🪟" },
          { t: "కోతి", en: "Monkey", pic: "🐒" },
          { t: "గూడు", en: "Nest", pic: "🪺" },
          { t: "పాలు", en: "Milk", pic: "🥛" },
          { t: "మేక", en: "Goat", pic: "🐐" },
          { t: "చీమ", en: "Ant", pic: "🐜" },
          { t: "పులి", en: "Tiger", pic: "🐅" },
        ]},
      ],
    },
    {
      id: "vattulu", te: "ఒత్తుల లోకం", en: "Double letters", icon: "క్క", color: "#8e5cd9",
      intro: "When two consonants join, the second one sits under the first as an 'ఒత్తు'.",
      lessons: [
        { id: "o1", title: "ఒకే ఒత్తు", type: "words", items: [
          { t: "అక్క", en: "Elder sister", pic: "👧", note: "క్క = క + క" },
          { t: "అమ్మ", en: "Mother", pic: "👩", note: "మ్మ = మ + మ" },
          { t: "అన్న", en: "Elder brother", pic: "👦", note: "న్న = న + న" },
          { t: "పిల్లి", en: "Cat", pic: "🐈", note: "ల్లి = ల + లి" },
          { t: "కప్ప", en: "Frog", pic: "🐸", note: "ప్ప = ప + ప" },
          { t: "చెట్టు", en: "Tree", pic: "🌳", note: "ట్టు = ట + టు" },
          { t: "అత్త", en: "Aunt", pic: "👩‍🦳", note: "త్త = త + త" },
          { t: "పెద్ద", en: "Big", pic: "🐘", note: "ద్ద = ద + ద" },
        ]},
        { id: "o2", title: "వేరే ఒత్తు", type: "words", items: [
          { t: "పుస్తకం", en: "Book", pic: "📖", note: "స్త = స + త" },
          { t: "రాత్రి", en: "Night", pic: "🌙", note: "త్రి = త + రి" },
          { t: "చక్రం", en: "Wheel", pic: "🛞", note: "క్రం = క + రం" },
          { t: "పక్షి", en: "Bird", pic: "🐦", note: "క్షి = క + షి" },
          { t: "కష్టం", en: "Difficult", pic: "😓", note: "ష్టం = ష + టం" },
          { t: "వర్షం", en: "Rain", pic: "🌧️", note: "ర్షం = ర + షం" },
        ]},
      ],
    },
    {
      id: "padalu", te: "పదాల లోకం", en: "Words", icon: "🏠", color: "#f2a900",
      intro: "Words you will use every day at home.",
      lessons: [
        { id: "p1", title: "కుటుంబం · Family", type: "words", items: [
          { t: "అమ్మ", en: "Mother", pic: "👩" }, { t: "నాన్న", en: "Father", pic: "👨" },
          { t: "అక్క", en: "Elder sister", pic: "👧" }, { t: "అన్న", en: "Elder brother", pic: "👦" },
          { t: "చెల్లి", en: "Younger sister", pic: "👧" }, { t: "తమ్ముడు", en: "Younger brother", pic: "👦" },
          { t: "అమ్మమ్మ", en: "Grandma (mother's mother)", pic: "👵" }, { t: "తాతయ్య", en: "Grandpa", pic: "👴" },
          { t: "అత్త", en: "Aunt", pic: "👩‍🦳" }, { t: "మామయ్య", en: "Uncle", pic: "👨‍🦳" },
        ]},
        { id: "p2", title: "శరీరం · Body", type: "words", items: [
          { t: "తల", en: "Head", pic: "🙂" }, { t: "కళ్ళు", en: "Eyes", pic: "👀" },
          { t: "ముక్కు", en: "Nose", pic: "👃" }, { t: "చెవులు", en: "Ears", pic: "👂" },
          { t: "నోరు", en: "Mouth", pic: "👄" }, { t: "పళ్ళు", en: "Teeth", pic: "🦷" },
          { t: "చేతులు", en: "Hands", pic: "🙌" }, { t: "కాళ్ళు", en: "Legs", pic: "🦵" },
        ]},
        { id: "p3", title: "ఆహారం · Food", type: "words", items: [
          { t: "అన్నం", en: "Rice", pic: "🍚" }, { t: "పప్పు", en: "Dal", pic: "🍲" },
          { t: "పెరుగు", en: "Curd / yogurt", pic: "🥣" }, { t: "పాలు", en: "Milk", pic: "🥛" },
          { t: "నీళ్ళు", en: "Water", pic: "💧" }, { t: "దోశ", en: "Dosa", pic: "🫓" },
          { t: "అరటిపండు", en: "Banana", pic: "🍌" }, { t: "మామిడిపండు", en: "Mango", pic: "🥭" },
        ]},
        { id: "p4", title: "రంగులు · Colours", type: "words", items: [
          { t: "ఎరుపు", en: "Red", pic: "🔴" }, { t: "పసుపు", en: "Yellow", pic: "🟡" },
          { t: "ఆకుపచ్చ", en: "Green", pic: "🟢" }, { t: "నీలం", en: "Blue", pic: "🔵" },
          { t: "తెలుపు", en: "White", pic: "⚪" }, { t: "నలుపు", en: "Black", pic: "⚫" },
        ]},
        { id: "p5", title: "అంకెలు · Numbers", type: "words", items: [
          { t: "ఒకటి", en: "One · 1", pic: "1️⃣" }, { t: "రెండు", en: "Two · 2", pic: "2️⃣" },
          { t: "మూడు", en: "Three · 3", pic: "3️⃣" }, { t: "నాలుగు", en: "Four · 4", pic: "4️⃣" },
          { t: "ఐదు", en: "Five · 5", pic: "5️⃣" }, { t: "ఆరు", en: "Six · 6", pic: "6️⃣" },
          { t: "ఏడు", en: "Seven · 7", pic: "7️⃣" }, { t: "ఎనిమిది", en: "Eight · 8", pic: "8️⃣" },
          { t: "తొమ్మిది", en: "Nine · 9", pic: "9️⃣" }, { t: "పది", en: "Ten · 10", pic: "🔟" },
        ]},
        { id: "p6", title: "జంతువులు · Animals", type: "words", items: [
          { t: "కుక్క", en: "Dog", pic: "🐕" }, { t: "పిల్లి", en: "Cat", pic: "🐈" },
          { t: "ఆవు", en: "Cow", pic: "🐄" }, { t: "కోతి", en: "Monkey", pic: "🐒" },
          { t: "సింహం", en: "Lion", pic: "🦁" }, { t: "పులి", en: "Tiger", pic: "🐅" },
          { t: "గుర్రం", en: "Horse", pic: "🐎" }, { t: "కోడి", en: "Hen", pic: "🐔" },
        ]},
        { id: "p7", title: "పండుగలు · Festivals", type: "words", items: [
          { t: "సంక్రాంతి", en: "Sankranti", pic: "🪁" }, { t: "ఉగాది", en: "Ugadi (Telugu New Year)", pic: "🌿" },
          { t: "దీపావళి", en: "Deepavali", pic: "🪔" }, { t: "దసరా", en: "Dasara", pic: "🎉" },
          { t: "వినాయక చవితి", en: "Vinayaka Chavithi", pic: "🐘" },
        ]},
      ],
    },
    {
      id: "matalu", te: "మాటల లోకం", en: "Speaking", icon: "💬", color: "#e2557a",
      intro: "Real sentences to talk with Ammamma and Tatayya on the phone!",
      lessons: [
        { id: "m1", title: "పలకరింపు · Greetings", type: "sentences", items: [
          { t: "నమస్కారం", en: "Hello (respectful)" },
          { t: "బాగున్నావా?", en: "Are you well?" },
          { t: "నేను బాగున్నాను.", en: "I am fine." },
          { t: "నీ పేరు ఏమిటి?", en: "What is your name?" },
          { t: "ధన్యవాదాలు.", en: "Thank you." },
        ]},
        { id: "m2", title: "ఇంట్లో · At home", type: "sentences", items: [
          { t: "నాకు ఆకలిగా ఉంది.", en: "I am hungry." },
          { t: "నాకు దాహంగా ఉంది.", en: "I am thirsty." },
          { t: "అమ్మా, అన్నం పెట్టు.", en: "Amma, please give me food." },
          { t: "రా, ఆడుకుందాం.", en: "Come, let's play." },
          { t: "పడుకునే సమయం అయింది.", en: "It's time to sleep." },
        ]},
        { id: "m3", title: "అమ్మమ్మతో · With Grandma", type: "sentences", items: [
          { t: "అమ్మమ్మా, ఎలా ఉన్నావు?", en: "Ammamma, how are you?" },
          { t: "తాతయ్యా, కథ చెప్పు.", en: "Tatayya, tell me a story." },
          { t: "నువ్వంటే నాకు చాలా ఇష్టం.", en: "I love you very much." },
          { t: "మళ్ళీ ఫోన్ చేస్తాను.", en: "I will call again." },
        ]},
      ],
    },
    {
      id: "chaduvu", te: "చదువు-రాత లోకం", en: "Read & Write", icon: "✍️", color: "#00a6a6",
      intro: "Trace letters with your finger and read little stories.",
      lessons: [
        { id: "r1", title: "వేలితో దిద్దు · Trace", type: "trace", items: ["అ", "ఆ", "ఇ", "క", "గ", "మ"] },
        { id: "r2", title: "చిట్టి కథ · Chitti's story", type: "story", items: [
          { t: "ఇది చిట్టి.", en: "This is Chitti." },
          { t: "చిట్టి ఒక చిలుక.", en: "Chitti is a parrot." },
          { t: "చిట్టికి జామపండు ఇష్టం.", en: "Chitti likes guava." },
          { t: "చిట్టి రోజూ తెలుగు నేర్చుకుంటుంది.", en: "Chitti learns Telugu every day." },
          { t: "నువ్వు కూడా నేర్చుకో!", en: "You learn too!" },
        ]},
      ],
    },
    {
      id: "patalu", te: "పాటల-పద్యాల లోకం", en: "Songs & Poems", icon: "🎵", color: "#c0392b",
      intro: "Traditional Telugu rhymes and poems that families have sung for generations.",
      lessons: [
        { id: "s1", title: "చందమామ రావే", type: "poem", kind: "Traditional lullaby", lines: [
          "చందమామ రావే, జాబిల్లి రావే",
          "కొండెక్కి రావే, గోగుపూలు తేవే",
        ], meaning: "Come, dear moon! Climb over the hill and bring flowers." },
        { id: "s2", title: "వేమన పద్యం", type: "poem", kind: "Vemana (17th century)", lines: [
          "ఉప్పుకప్పురంబు నొక్కపోలికనుండు",
          "చూడ చూడ రుచుల జాడ వేరు",
          "పురుషులందు పుణ్య పురుషులు వేరయా",
          "విశ్వదాభిరామ వినురవేమ",
        ], meaning: "Salt and camphor look alike, but taste different. Among people, the truly good ones are different too." },
        { id: "s3", title: "వేమన పద్యం 2", type: "poem", kind: "Vemana (17th century)", lines: [
          "అనగననగ రాగ మతిశయిల్లుచునుండు",
          "తినగ తినగ వేము తియ్యనుండు",
          "సాధనమున పనులు సమకూరు ధరలోన",
          "విశ్వదాభిరామ వినురవేమ",
        ], meaning: "Singing again and again makes the tune better; practice makes everything possible." },
        { id: "s4", title: "సుమతీ శతకం", type: "poem", kind: "Sumati Shatakam (13th century)", lines: [
          "తన కోపమె తన శత్రువు",
          "తన శాంతమె తనకు రక్ష, దయ చుట్టంబౌ",
          "తన సంతోషమె స్వర్గము",
          "తన దుఃఖమె నరకమండ్రు, తథ్యము సుమతీ",
        ], meaning: "Your anger is your enemy, your calm protects you, your happiness is heaven." },
      ],
    },
  ],
};

// Build gunintham rows from Unicode vowel signs (always correct by construction).
function gunintham(base) {
  const names = ["a", "aa", "i", "ee", "u", "oo", "ru", "roo", "e", "ē", "ai", "o", "ō", "au", "am", "aha"];
  return VOWEL_SIGNS.map((sg, i) => ({ t: base + sg, s: names[i] }));
}
