const englishScenarioLessons = {
  a1: [
    {
      id: "en-a1-survival-help",
      title: "Túlélő mondatok",
      icon: "A1",
      summary: "help, water, bathroom",
      level: "A1",
      topic: "Alap túlélő kommunikáció",
      grammarFocus: "I am / I need / Can I / Where is",
      sentencePatterns: ["I need ...", "Can I have ...?", "Where is ...?", "I don't understand."],
      items: [
        { term: "help", meaning: "segítség", example: "I need help." },
        { term: "water", meaning: "víz", example: "Can I have some water?" },
        { term: "bathroom", meaning: "mosdó", example: "Where is the bathroom?" },
        { term: "question", meaning: "kérdés", example: "I have a question." },
        { term: "tired", meaning: "fáradt", example: "I'm tired." }
      ],
      exampleSentences: [
        ["I need help", "Segítségre van szükségem"],
        ["I don't understand", "Nem értem"],
        ["Can I have some water", "Kaphatok egy kis vizet?"],
        ["Where is the bathroom", "Hol van a mosdó?"],
        ["I have a question", "Van egy kérdésem"]
      ],
      miniDialogues: [
        [["Can I have some water", "Kaphatok egy kis vizet?"], ["Yes, of course", "Igen, persze"]]
      ],
      translationTasks: [
        { sourceHu: "Segítségre van szükségem.", target: "I need help" },
        { sourceHu: "Nem értem.", target: "I don't understand" }
      ],
      wordOrderTasks: [
        ["I have a question", "Van egy kérdésem", ["I", "have", "a", "question"]]
      ],
      notesHu: "A1-ben az a cél, hogy kevés szóval is tudj kérni, jelezni és visszakérdezni."
    },
    {
      id: "en-a1-basic-needs",
      title: "Kell, van, szeretem",
      icon: "NE",
      summary: "need, have, like",
      level: "A1",
      topic: "Napi szükségletek",
      grammarFocus: "I have / I like / I need / This is",
      sentencePatterns: ["I have ...", "I like ...", "I need ...", "This is ..."],
      items: [
        { term: "phone", meaning: "telefon", example: "I have my phone." },
        { term: "key", meaning: "kulcs", example: "I need the key." },
        { term: "bread", meaning: "kenyér", example: "I like bread." },
        { term: "coffee", meaning: "kávé", example: "This is my coffee." },
        { term: "money", meaning: "pénz", example: "I have money." }
      ],
      exampleSentences: [
        ["I have my phone", "Nálam van a telefonom"],
        ["I need the key", "Szükségem van a kulcsra"],
        ["I like this coffee", "Szeretem ezt a kávét"],
        ["This is my bag", "Ez az én táskám"]
      ],
      miniDialogues: [
        [["Do you have the key", "Nálad van a kulcs?"], ["Yes, I have it", "Igen, nálam van"]]
      ],
      translationTasks: [
        { sourceHu: "Szükségem van a kulcsra.", target: "I need the key" },
        { sourceHu: "Szeretem ezt a kávét.", target: "I like this coffee" }
      ],
      wordOrderTasks: [
        ["This is my phone", "Ez az én telefonom", ["This", "is", "my", "phone"]]
      ],
      notesHu: "A have/need/like szerkezetekkel rengeteg hétköznapi helyzetet le lehet fedni."
    }
  ],
  a2: [
    {
      id: "en-a2-daily-actions",
      title: "Most, tegnap, később",
      icon: "A2",
      summary: "working, went, going to",
      level: "A2",
      topic: "Napi események időben",
      grammarFocus: "present continuous / past simple / going to future",
      sentencePatterns: ["I'm ... right now.", "I went ... yesterday.", "I'm going to ... later."],
      items: [
        { term: "right now", meaning: "éppen most", example: "I'm working right now." },
        { term: "yesterday", meaning: "tegnap", example: "I went shopping yesterday." },
        { term: "later", meaning: "később", example: "I'm going to call you later." },
        { term: "problem", meaning: "probléma", example: "There is a problem." },
        { term: "better", meaning: "jobb", example: "This is better than the old one." }
      ],
      exampleSentences: [
        ["I'm working right now", "Éppen dolgozom"],
        ["I went shopping yesterday", "Tegnap vásárolni mentem"],
        ["I'm going to call you later", "Később fel foglak hívni"],
        ["There is a problem", "Van egy probléma"],
        ["This is better than the old one", "Ez jobb, mint a régi"]
      ],
      miniDialogues: [
        [["Are you busy right now", "Elfoglalt vagy most?"], ["Yes, I'm working right now", "Igen, éppen dolgozom"]]
      ],
      translationTasks: [
        { sourceHu: "Később fel foglak hívni.", target: "I'm going to call you later" },
        { sourceHu: "Van egy probléma.", target: "There is a problem" }
      ],
      wordOrderTasks: [
        ["I went shopping yesterday", "Tegnap vásárolni mentem", ["I", "went", "shopping", "yesterday"]]
      ],
      notesHu: "A2-ben már időben mozgatjuk a mondatot: most, múltban, jövőben."
    },
    {
      id: "en-a2-city-service",
      title: "Ügyintézés városban",
      icon: "CS",
      summary: "near here, receipt, cheaper",
      level: "A2",
      topic: "Bolt, útbaigazítás, egyszerű ügyintézés",
      grammarFocus: "there is / comparatives / polite requests",
      sentencePatterns: ["Is there ... near here?", "Can I have ...?", "This is cheaper than ..."],
      items: [
        { term: "near here", meaning: "a közelben", example: "Is there a shop near here?" },
        { term: "receipt", meaning: "blokk", example: "Can I have a receipt?" },
        { term: "cheaper", meaning: "olcsóbb", example: "This one is cheaper." },
        { term: "station", meaning: "állomás", example: "The station is near here." },
        { term: "ticket", meaning: "jegy", example: "I need a ticket." }
      ],
      exampleSentences: [
        ["Is there a shop near here", "Van bolt a közelben?"],
        ["Can I have a receipt", "Kaphatok blokkot?"],
        ["The station is near here", "Az állomás a közelben van"],
        ["This one is cheaper", "Ez olcsóbb"]
      ],
      miniDialogues: [
        [["Can I have a ticket, please", "Kaphatok egy jegyet?"], ["Yes, one ticket", "Igen, egy jegy"]]
      ],
      translationTasks: [
        { sourceHu: "Van bolt a közelben?", target: "Is there a shop near here" },
        { sourceHu: "Kaphatok blokkot?", target: "Can I have a receipt" }
      ],
      wordOrderTasks: [
        ["The station is near here", "Az állomás a közelben van", ["The", "station", "is", "near", "here"]]
      ],
      notesHu: "Itt már nem csak tárgyakat nevezünk meg, hanem egyszerű helyzeteket intézünk."
    }
  ],
  b1: [
    {
      id: "en-b1-problems-progress",
      title: "Probléma és haladás",
      icon: "B1",
      summary: "already, because, should",
      level: "B1",
      topic: "Munka közbeni magyarázat és probléma",
      grammarFocus: "present perfect / because / should / first conditional",
      sentencePatterns: ["I've already ...", "I couldn't ... because ...", "You should ...", "If I have time, I'll ..."],
      items: [
        { term: "already", meaning: "már", example: "I've already sent the email." },
        { term: "because", meaning: "mert", example: "I couldn't finish it because I had a problem." },
        { term: "should", meaning: "kellene", example: "You should check it again." },
        { term: "fix", meaning: "javítani", example: "I'll fix it today." },
        { term: "website", meaning: "weboldal", example: "You should check the website again." }
      ],
      exampleSentences: [
        ["I've already sent the email", "Már elküldtem az emailt"],
        ["I couldn't finish it because I had a problem", "Nem tudtam befejezni, mert problémám volt"],
        ["You should check the website again", "Újra meg kellene nézned a weboldalt"],
        ["If I have time, I'll fix it today", "Ha lesz időm, ma kijavítom"]
      ],
      miniDialogues: [
        [["Have you sent the email", "Elküldted az emailt?"], ["Yes, I've already sent it", "Igen, már elküldtem"]]
      ],
      translationTasks: [
        { sourceHu: "Ha lesz időm, ma kijavítom.", target: "If I have time, I'll fix it today" },
        { sourceHu: "Újra meg kellene nézned a weboldalt.", target: "You should check the website again" }
      ],
      wordOrderTasks: [
        ["I've already sent the email", "Már elküldtem az emailt", ["I've", "already", "sent", "the", "email"]]
      ],
      notesHu: "B1-ben már okokat, eredményeket és következő lépéseket magyarázunk."
    },
    {
      id: "en-b1-opinions-plans",
      title: "Vélemény és terv",
      icon: "OP",
      summary: "think, although, have to",
      level: "B1",
      topic: "Vélemény, terv, enyhe ellentét",
      grammarFocus: "I think / although / have to / relative clauses",
      sentencePatterns: ["I think ...", "Although ..., ...", "We have to ...", "The page that ..."],
      items: [
        { term: "opinion", meaning: "vélemény", example: "In my opinion, this is useful." },
        { term: "although", meaning: "bár / habár", example: "Although it's late, I can help." },
        { term: "plan", meaning: "terv", example: "My plan is simple." },
        { term: "useful", meaning: "hasznos", example: "This feature is useful." },
        { term: "clear", meaning: "érthető / világos", example: "The message is clear." }
      ],
      exampleSentences: [
        ["I think this feature is useful", "Szerintem ez a funkció hasznos"],
        ["Although it's late, I can help", "Bár késő van, tudok segíteni"],
        ["We have to make the message clearer", "Érthetőbbé kell tennünk az üzenetet"],
        ["The page that opens first is confusing", "Az oldal, ami először megnyílik, zavaros"]
      ],
      miniDialogues: [
        [["What do you think", "Mit gondolsz?"], ["I think we should make it clearer", "Szerintem érthetőbbé kellene tennünk"]]
      ],
      translationTasks: [
        { sourceHu: "Szerintem ez hasznos.", target: "I think this is useful" },
        { sourceHu: "Érthetőbbé kell tennünk.", target: "We have to make it clearer" }
      ],
      wordOrderTasks: [
        ["Although it's late, I can help", "Bár késő van, tudok segíteni", ["Although", "it's", "late", "I", "can", "help"]]
      ],
      notesHu: "A B1 mondatok már nem csak tényeket mondanak, hanem álláspontot és indoklást adnak."
    }
  ],
  b2: [
    {
      id: "en-b2-client-communication",
      title: "Ügyfélkommunikáció",
      icon: "CL",
      summary: "updated, client said, user perspective",
      level: "B2",
      topic: "Ügyfél, weboldal, javítások",
      grammarFocus: "passive voice / reported speech / linking phrases",
      sentencePatterns: ["The website has been ...", "The client said ...", "From a user perspective, ..."],
      items: [
        { term: "updated", meaning: "frissítve", example: "The website has been updated." },
        { term: "client", meaning: "ügyfél", example: "The client said the form wasn't working." },
        { term: "form", meaning: "űrlap", example: "The form wasn't working." },
        { term: "layout", meaning: "elrendezés", example: "I would change the layout." },
        { term: "user perspective", meaning: "felhasználói szemszög", example: "From a user perspective, this is not clear." }
      ],
      exampleSentences: [
        ["The website has been updated", "A weboldal frissítve lett"],
        ["The client said the form wasn't working", "Az ügyfél azt mondta, hogy az űrlap nem működött"],
        ["I would change the layout if we had more time", "Megváltoztatnám az elrendezést, ha több időnk lenne"],
        ["From a user perspective, this section is not clear enough", "Felhasználói szemszögből ez a rész nem elég világos"]
      ],
      miniDialogues: [
        [["What did the client say", "Mit mondott az ügyfél?"], ["The client said the form wasn't working", "Azt mondta, hogy az űrlap nem működött"]]
      ],
      translationTasks: [
        { sourceHu: "A weboldal frissítve lett.", target: "The website has been updated" },
        { sourceHu: "Felhasználói szemszögből ez nem elég világos.", target: "From a user perspective, this is not clear enough" }
      ],
      wordOrderTasks: [
        ["The client said the form wasn't working", "Az ügyfél azt mondta, hogy az űrlap nem működött", ["The", "client", "said", "the", "form", "wasn't", "working"]]
      ],
      notesHu: "B2-ben már professzionális helyzeteket kezelünk: passzív szerkezet, ügyfél-visszajelzés, udvarias javaslat."
    },
    {
      id: "en-b2-explaining-decisions",
      title: "Döntések magyarázata",
      icon: "EX",
      summary: "however, therefore, would",
      level: "B2",
      topic: "Érvelés és döntés webes munkában",
      grammarFocus: "second conditional / advanced modals / linking phrases",
      sentencePatterns: ["I would ... if ...", "However, ...", "Therefore, ...", "It might be better to ..."],
      items: [
        { term: "however", meaning: "azonban", example: "However, the page is still confusing." },
        { term: "therefore", meaning: "ezért", example: "Therefore, we should simplify it." },
        { term: "might", meaning: "lehet, hogy / talán", example: "It might be better to wait." },
        { term: "simplify", meaning: "egyszerűsíteni", example: "We should simplify the page." },
        { term: "decision", meaning: "döntés", example: "This decision makes sense." }
      ],
      exampleSentences: [
        ["I would simplify the page if the client agreed", "Egyszerűsíteném az oldalt, ha az ügyfél beleegyezne"],
        ["However, the main problem is still the navigation", "Azonban a fő probléma még mindig a navigáció"],
        ["Therefore, we should test it on mobile first", "Ezért először mobilon kellene tesztelnünk"],
        ["It might be better to remove this section", "Lehet, hogy jobb lenne eltávolítani ezt a részt"]
      ],
      miniDialogues: [
        [["Why would you change it", "Miért változtatnád meg?"], ["Because the current version is not clear enough", "Mert a jelenlegi verzió nem elég világos"]]
      ],
      translationTasks: [
        { sourceHu: "Lehet, hogy jobb lenne eltávolítani ezt a részt.", target: "It might be better to remove this section" },
        { sourceHu: "Ezért először mobilon kellene tesztelnünk.", target: "Therefore, we should test it on mobile first" }
      ],
      wordOrderTasks: [
        ["However, the main problem is still the navigation", "Azonban a fő probléma még mindig a navigáció", ["However", "the", "main", "problem", "is", "still", "the", "navigation"]]
      ],
      notesHu: "B2-n már fontos a kapcsolat a mondatok között: however, therefore, might, would."
    }
  ],
  c1: [
    {
      id: "en-c1-professional-nuance",
      title: "Árnyalt szakmai vélemény",
      icon: "C1",
      summary: "better approach, user flow",
      level: "C1",
      topic: "Finom egyet nem értés és profi javaslat",
      grammarFocus: "complex clauses / soft disagreement / professional tone",
      sentencePatterns: ["I see your point, but ...", "The main issue is not ..., but ...", "I'd recommend ..."],
      items: [
        { term: "approach", meaning: "megközelítés", example: "There is a better approach." },
        { term: "user flow", meaning: "felhasználói folyamat", example: "The user flow is not clear." },
        { term: "premium feel", meaning: "prémium érzet", example: "We can keep the premium feel." },
        { term: "clarity", meaning: "érthetőség", example: "Clarity is more important here." },
        { term: "recommend", meaning: "javasolni", example: "I'd recommend focusing on clarity." }
      ],
      exampleSentences: [
        ["I see your point, but I think there's a better approach", "Értem, mire gondolsz, de szerintem van jobb megközelítés"],
        ["The main issue is not the design itself, but the user flow", "A fő gond nem maga a dizájn, hanem a felhasználói folyamat"],
        ["We could simplify the page without losing the premium feel", "Egyszerűsíthetnénk az oldalt anélkül, hogy elveszne a prémium érzet"],
        ["I'd recommend focusing on clarity before adding more features", "Azt javasolnám, hogy előbb az érthetőségre fókuszáljunk, mielőtt több funkciót adunk hozzá"]
      ],
      miniDialogues: [
        [["Do you think the design is the problem", "Szerinted a dizájn a probléma?"], ["Not exactly. The main issue is the user flow", "Nem pontosan. A fő gond a felhasználói folyamat"]]
      ],
      translationTasks: [
        { sourceHu: "Szerintem van jobb megközelítés.", target: "I think there's a better approach" },
        { sourceHu: "Előbb az érthetőségre fókuszálnék.", target: "I'd focus on clarity first" }
      ],
      wordOrderTasks: [
        ["The main issue is not the design itself, but the user flow", "A fő gond nem maga a dizájn, hanem a felhasználói folyamat", ["The", "main", "issue", "is", "not", "the", "design", "itself", "but", "the", "user", "flow"]]
      ],
      notesHu: "C1-ben már nem csak helyesen beszélünk, hanem finoman, pontosan és szakmailag természetesen."
    },
    {
      id: "en-c1-negotiation-scope",
      title: "Egyeztetés és hatókör",
      icon: "SC",
      summary: "scope, trade-off, priority",
      level: "C1",
      topic: "Projekt-egyeztetés és kompromisszum",
      grammarFocus: "negotiation language / nuance / precise explanation",
      sentencePatterns: ["The trade-off is ...", "What I'm concerned about is ...", "We can ..., as long as ..."],
      items: [
        { term: "scope", meaning: "hatókör", example: "The scope is too broad." },
        { term: "trade-off", meaning: "kompromisszumos döntés", example: "There is a trade-off here." },
        { term: "priority", meaning: "prioritás", example: "Clarity should be the priority." },
        { term: "concerned", meaning: "aggódik / fenntartása van", example: "I'm concerned about the deadline." },
        { term: "as long as", meaning: "amíg / feltéve hogy", example: "We can do it as long as we keep it simple." }
      ],
      exampleSentences: [
        ["The trade-off is that we gain speed but lose some flexibility", "A kompromisszum az, hogy nyerünk sebességet, de veszítünk némi rugalmasságot"],
        ["What I'm concerned about is the scope, not the idea itself", "Ami miatt aggódom, az a hatókör, nem maga az ötlet"],
        ["We can add this feature as long as we keep the first version simple", "Hozzáadhatjuk ezt a funkciót, feltéve hogy az első verzió egyszerű marad"],
        ["At this stage, clarity should be the priority", "Ebben a szakaszban az érthetőségnek kellene prioritásnak lennie"]
      ],
      miniDialogues: [
        [["Can we add one more feature", "Hozzáadhatunk még egy funkciót?"], ["Yes, as long as we keep the first version simple", "Igen, feltéve hogy az első verzió egyszerű marad"]]
      ],
      translationTasks: [
        { sourceHu: "A hatókör miatt aggódom, nem az ötlet miatt.", target: "I'm concerned about the scope, not the idea" },
        { sourceHu: "Ebben a szakaszban az érthetőség a prioritás.", target: "At this stage, clarity is the priority" }
      ],
      wordOrderTasks: [
        ["We can add this feature as long as we keep the first version simple", "Hozzáadhatjuk ezt a funkciót, feltéve hogy az első verzió egyszerű marad", ["We", "can", "add", "this", "feature", "as", "long", "as", "we", "keep", "the", "first", "version", "simple"]]
      ],
      notesHu: "C1-ben a mondat célja gyakran nem csak információ, hanem hangnem: udvarias, pontos, tárgyalóképes."
    }
  ]
};

function sentenceWordsForCourse(target) {
  return String(target).replace(/[?.!,]/g, "").split(/\s+/).filter(Boolean);
}

function normalizeSentenceLesson(lesson) {
  const exampleSentences = (lesson.exampleSentences || []).map(([target, meaning]) => ({
    target,
    meaning,
    words: sentenceWordsForCourse(target)
  }));
  const miniDialogues = (lesson.miniDialogues || []).map((lines) => ({
    lines: lines.map(([target, meaning]) => ({ target, meaning }))
  }));
  const wordOrderTasks = (lesson.wordOrderTasks || []).map(([target, meaning, words]) => ({
    target,
    meaning,
    words: words || sentenceWordsForCourse(target)
  }));
  return {
    ...lesson,
    exampleSentences,
    miniDialogues,
    wordOrderTasks,
    sentences: [...exampleSentences, ...wordOrderTasks].slice(0, 6)
  };
}

Object.entries(englishScenarioLessons).forEach(([levelId, lessons]) => {
  const level = window.CURRICULUM?.en?.levels?.[levelId];
  if (!level) return;
  const existingIds = new Set(level.lessons.map((lesson) => lesson.id));
  const fresh = lessons
    .filter((lesson) => !existingIds.has(lesson.id))
    .map(normalizeSentenceLesson);
  level.lessons.unshift(...fresh);
});
