const curriculum = window.CURRICULUM;
const verbData = window.VERB_DATA || {};
const storageKey = "nyelv-edzo-state-v1";
const builtInDictionary = [
  { hu: "fej", en: "head", es: "cabeza" },
  { hu: "arc", en: "face", es: "cara" },
  { hu: "szem", en: "eye", es: "ojo" },
  { hu: "kéz", en: "hand", es: "mano" },
  { hu: "kar", en: "arm", es: "brazo" },
  { hu: "láb", en: "leg", es: "pierna" },
  { hu: "lábfej", en: "foot", es: "pie" },
  { hu: "fül", en: "ear", es: "oreja" },
  { hu: "orr", en: "nose", es: "nariz" },
  { hu: "száj", en: "mouth", es: "boca" },
  { hu: "fog", en: "tooth", es: "diente" },
  { hu: "haj", en: "hair", es: "pelo" },
  { hu: "hát", en: "back", es: "espalda" },
  { hu: "has", en: "stomach", es: "estómago" },
  { hu: "szív", en: "heart", es: "corazón" },
  { hu: "ember", en: "person", es: "persona" },
  { hu: "férfi", en: "man", es: "hombre" },
  { hu: "nő", en: "woman", es: "mujer" },
  { hu: "lány", en: "girl", es: "chica" },
  { hu: "fiú", en: "boy", es: "chico" },
  { hu: "gyerek", en: "child", es: "niño" },
  { hu: "ház", en: "house", es: "casa" },
  { hu: "víz", en: "water", es: "agua" },
  { hu: "étel", en: "food", es: "comida" },
  { hu: "alma", en: "apple", es: "manzana" },
  { hu: "könyv", en: "book", es: "libro" },
  { hu: "autó", en: "car", es: "coche" },
  { hu: "disznó", en: "pig", es: "cerdo" },
  { hu: "gép", en: "computer", es: "computadora" },
  { hu: "nap", en: "day", es: "día" },
  { hu: "beszélni", en: "speak", es: "hablar", type: "verb" },
  { hu: "fogni", en: "hold", es: "agarrar", type: "verb" },
  { hu: "futni", en: "run", es: "correr", type: "verb" },
  { hu: "írni", en: "write", es: "escribir", type: "verb", aliases: ["ír"] },
  { hu: "olvasni", en: "read", es: "leer", type: "verb" },
  { hu: "enni", en: "eat", es: "comer", type: "verb" },
  { hu: "inni", en: "drink", es: "beber", type: "verb" }
];
const quickDictionary = [...(window.DICTIONARY_DATA || []), ...builtInDictionary];
const newWordsPerLesson = 8;
const coreVocabularyLimit = 500;
const pluralExceptions = {
  hu: {
    férfi: "férfiak",
    fiú: "fiúk",
    lány: "lányok",
    nő: "nők",
    gyerek: "gyerekek",
    ember: "emberek",
    kéz: "kezek",
    láb: "lábak",
    ló: "lovak",
    fa: "fák",
    víz: "vizek",
    fog: "fogak",
    nap: "napok"
  },
  en: {
    man: "men",
    woman: "women",
    child: "children",
    person: "people",
    foot: "feet",
    tooth: "teeth",
    mouse: "mice"
  },
  es: {
    lápiz: "lápices",
    pez: "peces"
  }
};

const defaultState = {
  language: "en",
  level: "a1",
  xp: 0,
  streak: 0,
  lastStudyDate: "",
  completed: {},
  attempts: 0,
  correct: 0,
  skipped: 0,
  currentLessonId: "",
  currentStep: 0,
  selectedAnswer: "",
  sentenceAnswer: []
};

let state = loadState();
let dictionaryRendered = false;

const elements = {
  appName: document.querySelector("#app-name"),
  screenTitle: document.querySelector("#screen-title"),
  streak: document.querySelector("#streak-count"),
  xp: document.querySelector("#xp-count"),
  homeHeading: document.querySelector("#home-heading"),
  dailyNote: document.querySelector("#daily-note"),
  todayProgress: document.querySelector("#today-progress"),
  courseInfo: document.querySelector("#course-info"),
  lessonPath: document.querySelector("#lesson-path"),
  language: document.querySelector("#language-select"),
  level: document.querySelector("#level-select"),
  lessonLevel: document.querySelector("#lesson-level"),
  lessonTitle: document.querySelector("#lesson-title"),
  lessonProgress: document.querySelector("#lesson-progress-bar"),
  taskType: document.querySelector("#task-type"),
  taskPrompt: document.querySelector("#task-prompt"),
  answerArea: document.querySelector("#answer-area"),
  feedback: document.querySelector("#feedback"),
  check: document.querySelector("#check-answer"),
  skip: document.querySelector("#skip-task"),
  wordList: document.querySelector("#word-list"),
  completed: document.querySelector("#completed-count"),
  completedMobile: document.querySelector("#completed-count-mobile"),
  accuracy: document.querySelector("#accuracy-count"),
  accuracyMobile: document.querySelector("#accuracy-count-mobile"),
  known: document.querySelector("#known-count"),
  profileSummary: document.querySelector("#profile-summary"),
  nextLevel: document.querySelector("#next-level"),
  verbInput: document.querySelector("#verb-input"),
  verbSearch: document.querySelector("#verb-search"),
  verbResult: document.querySelector("#verb-result")
};

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function activeCourse() {
  return curriculum[state.language] || curriculum.en;
}

function levelIds() {
  return Object.keys(activeCourse().levels);
}

function activeLevel() {
  return activeCourse().levels[state.level] || activeCourse().levels.a1;
}

function activeLessons() {
  return activeLevel().lessons;
}

function courseKey() {
  return `${state.language}-${state.level}`;
}

function completedLessons() {
  return state.completed[courseKey()] || [];
}

function setCompletedLessons(value) {
  state.completed = { ...state.completed, [courseKey()]: value };
}

function currentLesson() {
  if (state.currentLessonId === "__free__") return state.freeLesson;
  return activeLessons().find((lesson) => lesson.id === state.currentLessonId) || activeLessons()[0];
}

function learningItemsForLesson(lesson) {
  const limit = lesson.id === "free-practice" ? 6 : newWordsPerLesson;
  return lesson.items.slice(0, limit);
}

function sentenceForItem(item) {
  return {
    target: `I use ${item.term}`,
    meaning: `Használom: ${item.meaning}`,
    words: ["I", "use", item.term]
  };
}

function lessonSteps(lesson) {
  const items = learningItemsForLesson(lesson);
  const learn = items.map((item) => ({ type: "learn", ...item }));
  const recognition = items.map((item, index) => ({
    type: "choice",
    prompt: `Mit jelent: ${item.term}?`,
    answer: item.meaning,
    options: optionsFrom(items.map((row) => row.meaning), index)
  }));
  const sentencePool = [
    ...(lesson.sentences || []),
    ...items.slice(0, Math.max(0, 4 - (lesson.sentences || []).length)).map(sentenceForItem)
  ].slice(0, 4);
  const builds = sentencePool.map((sentence) => ({
    type: "build",
    prompt: sentence.meaning,
    answer: sentence.target,
    words: shuffle(sentence.words)
  }));
  const inputs = items.slice(0, 4).map((item) => ({
    type: "input",
    prompt: `\u00cdrd c\u00e9lnyelven: ${item.meaning}`,
    answer: item.term
  }));
  const review = items.slice(0, 4).map((item, index) => ({
    type: "choice",
    prompt: `Ism\u00e9tl\u00e9s: ${item.meaning}`,
    answer: item.term,
    options: optionsFrom(items.map((row) => row.term), index)
  }));
  return [...learn, ...recognition, ...builds, ...inputs, ...review];
}
function currentSteps() {
  return lessonSteps(currentLesson());
}

function currentStep() {
  return currentSteps()[state.currentStep];
}

function optionsFrom(values, answerIndex) {
  const answer = values[answerIndex];
  return [answer, ...values.filter((_, index) => index !== answerIndex)].slice(0, 4);
}

function shuffle(values) {
  return [...values].sort(() => Math.random() - 0.5);
}

function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[?.!¿?¡!]/g, "")
    .replace(/\s+/g, " ");
}

function renderSelectors() {
  elements.language.value = state.language;
  elements.level.innerHTML = "";
  Object.entries(activeCourse().levels).forEach(([id, level]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = level.label;
    elements.level.appendChild(option);
  });
  elements.level.value = state.level;
}

function updateStats() {
  const completed = completedLessons();
  const knownWords = activeLessons()
    .filter((lesson) => completed.includes(lesson.id))
    .reduce((sum, lesson) => sum + lesson.items.length, 0);
  const lessonCount = activeLessons().length;
  const totalLessons = Object.values(activeCourse().levels).reduce((sum, level) => sum + level.lessons.length, 0);
  const nextLevel = getNextLevel();

  elements.appName.textContent = `${activeCourse().name} Edző`;
  elements.xp.textContent = state.xp;
  elements.streak.textContent = state.streak;
  elements.completed.textContent = completed.length;
  if (elements.completedMobile) elements.completedMobile.textContent = completed.length;
  elements.accuracy.textContent = state.attempts ? `${Math.round((state.correct / state.attempts) * 100)}%` : "0%";
  if (elements.accuracyMobile) elements.accuracyMobile.textContent = elements.accuracy.textContent;
  elements.known.textContent = knownWords;
  elements.todayProgress.textContent = state.lastStudyDate === todayKey() ? "100%" : "0%";
  elements.homeHeading.textContent = activeLevel().title;
  elements.dailyNote.textContent = state.lastStudyDate === todayKey()
    ? "A napi cél kész, de ettől még folytathatod a tanulást vagy indíthatsz szabad gyakorlást."
    : "Napi 5-8 új szó, több ismétlés: tanítókártya, felismerés, mondatépítés, gépelés, majd visszakérdezés.";
  elements.courseInfo.textContent = `${activeCourse().name}: ${lessonCount} lecke ezen a szinten, ${totalLessons} lecke összesen. Mostani szint: ${completed.length}/${lessonCount} kész.`;
  elements.profileSummary.textContent = `${state.correct} jó válasz, ${state.skipped} kihagyás. A tempó számít, nem a kapkodás.`;
  elements.nextLevel.disabled = !nextLevel;
}

function renderLessons() {
  const completed = completedLessons();
  elements.lessonPath.innerHTML = "";
  activeLessons().forEach((lesson, index) => {
    const unlocked = index === 0 || completed.includes(activeLessons()[index - 1].id);
    const done = completed.includes(lesson.id);
    const button = document.createElement("button");
    button.className = `lesson-tile ${unlocked ? "" : "locked"}`;
    button.type = "button";
    button.disabled = !unlocked;
    button.innerHTML = `
      <span class="lesson-icon">${lesson.icon}</span>
      <span>
        <h3>${lesson.title}</h3>
        <p>${lesson.summary} - ${learningItemsForLesson(lesson).length} új szó, ${lessonSteps(lesson).length} lépés</p>
      </span>
      <span class="lesson-state">${done ? "Kész" : unlocked ? "Start" : "Zárva"}</span>
    `;
    button.addEventListener("click", () => startLesson(lesson.id));
    elements.lessonPath.appendChild(button);
  });
}

function renderReview() {
  dictionaryRendered = true;
  elements.wordList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  dictionaryGroups().forEach((group) => {
    const section = document.createElement("section");
    section.className = "dictionary-group";
    section.innerHTML = `
      <div class="dictionary-head">
        <h2>${escapeHtml(group.title)}</h2>
        <span>${group.rows.length} szó</span>
      </div>
      <div class="dictionary-table">
        <div class="dictionary-row dictionary-row-head">
          <span>Magyar</span>
          <span>Angol</span>
          <span>Spanyol</span>
        </div>
      </div>
    `;
    const table = section.querySelector(".dictionary-table");
    group.rows.forEach((item) => {
      const row = document.createElement("div");
      row.className = "dictionary-row";
      row.innerHTML = `
        <strong>${escapeHtml(item.hu)}</strong>
        <span class="dict-cell">
          <span>${escapeHtml(item.en || "-")}</span>
          ${item.en ? `<button class="icon-button dict-sound" type="button" data-lang="en" data-term="${escapeHtml(item.en)}" aria-label="Angol kiejtés">▶</button>` : ""}
        </span>
        <span class="dict-cell">
          <span>${escapeHtml(item.es || "-")}</span>
          ${item.es ? `<button class="icon-button dict-sound" type="button" data-lang="es" data-term="${escapeHtml(item.es)}" aria-label="Spanyol kiejtés">▶</button>` : ""}
        </span>
      `;
      table.appendChild(row);
    });
    fragment.appendChild(section);
  });
  elements.wordList.appendChild(fragment);
}

function dictionaryGroups() {
  const groups = new Map();

  quickDictionary.slice(0, coreVocabularyLimit).forEach((entry) => {
    const category = entry.category || "Alapszótár";
    addDictionaryEntry(groups, category, termWithPlural(entry, "hu"), "en", termWithPlural(entry, "en"));
    addDictionaryEntry(groups, category, termWithPlural(entry, "hu"), "es", termWithPlural(entry, "es"));
  });

  Object.entries(curriculum).forEach(([languageId, course]) => {
    Object.values(course.levels).forEach((level) => {
      level.lessons.forEach((lesson) => {
        lesson.items.forEach((item) => {
          addDictionaryEntry(groups, lesson.title, item.meaning, languageId, item.term);
        });
      });
    });
  });

  return [...groups.entries()].map(([title, rows]) => ({
    title,
    rows: [...rows.values()]
      .filter((row) => row.en || row.es)
      .sort((a, b) => a.hu.localeCompare(b.hu, "hu"))
  })).filter((group) => group.rows.length);
}

function addDictionaryEntry(groups, title, meaning, languageId, term) {
  if (!groups.has(title)) groups.set(title, new Map());
  const rows = groups.get(title);
  const key = normalize(meaning);
  const existing = rows.get(key) || { hu: meaning, en: "", es: "" };
  existing[languageId] = existing[languageId] || term;
  rows.set(key, existing);
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  document.querySelector(`#${screenId}`).classList.add("active");
  if (screenId === "review-screen" && !dictionaryRendered) renderReview();
  document.querySelectorAll(".nav-button").forEach((button) => {
    const label = button.getAttribute("aria-label");
    const primary = screenId === "home-screen" ? "Tanulás" : screenId === "review-screen" ? "Szavak" : "Statisztika";
    button.classList.toggle("active", button.dataset.screen === screenId && label === primary);
  });
  elements.screenTitle.textContent = {
    "home-screen": "Mai pálya",
    "review-screen": "Szavak",
    "profile-screen": "Profil"
  }[screenId] || "Lecke";
  updateStats();
}

function startLesson(id) {
  state.currentLessonId = id;
  state.currentStep = 0;
  state.selectedAnswer = "";
  state.sentenceAnswer = [];
  saveState();
  renderTask();
  showScreen("lesson-screen");
  elements.screenTitle.textContent = "Lecke";
}

function startFreePractice() {
  const items = shuffle(activeLessons().flatMap((lesson) => lesson.items)).slice(0, 8);
  if (items.length < 5) return;
  state.freeLesson = {
    id: "free-practice",
    title: "Szabad gyakorlás",
    icon: "GY",
    summary: "vegyes ismétlés",
    items,
    sentences: []
  };
  state.currentLessonId = "__free__";
  state.currentStep = 0;
  state.selectedAnswer = "";
  state.sentenceAnswer = [];
  saveState();
  renderTask();
  showScreen("lesson-screen");
  elements.screenTitle.textContent = "Gyakorlás";
}

function renderTask() {
  const lesson = currentLesson();
  const step = currentStep();
  const steps = currentSteps();
  state.selectedAnswer = "";
  state.sentenceAnswer = [];

  elements.lessonLevel.textContent = `${activeCourse().name} - ${activeLevel().label}`;
  elements.lessonTitle.textContent = lesson.title;
  elements.lessonProgress.style.width = `${(state.currentStep / steps.length) * 100}%`;
  elements.taskType.textContent = {
    learn: "Tanuld meg",
    choice: "Válaszd ki",
    build: "Rakd össze",
    input: "Gépeld be"
  }[step.type];
  elements.taskPrompt.textContent = step.type === "build" ? `Rakd össze: ${step.prompt}` : step.prompt || step.term;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.answerArea.innerHTML = "";
  elements.check.textContent = step.type === "learn" ? "Tovább" : "Ellenőrzés";
  elements.check.disabled = step.type !== "learn";
  elements.check.onclick = step.type === "learn" ? nextTask : checkAnswer;

  if (step.type === "learn") renderLearn(step);
  if (step.type === "choice") renderChoice(step);
  if (step.type === "build") renderSentenceBuilder(step);
  if (step.type === "input") renderInput();
}

function renderLearn(step) {
  elements.answerArea.innerHTML = `
    <div class="learn-card">
      <strong>${step.term}</strong>
      <span>${step.meaning}</span>
      <em>${step.example}</em>
    </div>
  `;
}

function renderChoice(step) {
  step.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      document.querySelectorAll(".choice-button").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      state.selectedAnswer = option;
      elements.check.disabled = false;
    });
    elements.answerArea.appendChild(button);
  });
}

function renderSentenceBuilder(step) {
  const answer = document.createElement("div");
  answer.className = "sentence-answer";
  answer.textContent = "Kattints a szavakra sorrendben";

  const bank = document.createElement("div");
  bank.className = "word-bank";
  step.words.forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "word-chip";
    button.textContent = word;
    button.addEventListener("click", () => {
      button.disabled = true;
      state.sentenceAnswer.push(word);
      answer.textContent = state.sentenceAnswer.join(" ");
      elements.check.disabled = state.sentenceAnswer.length === 0;
    });
    bank.appendChild(button);
  });

  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "text-button";
  clear.textContent = "Törlés";
  clear.addEventListener("click", () => {
    state.sentenceAnswer = [];
    answer.textContent = "Kattints a szavakra sorrendben";
    bank.querySelectorAll("button").forEach((button) => { button.disabled = false; });
    elements.check.disabled = true;
  });

  elements.answerArea.append(answer, bank, clear);
}

function renderInput() {
  const input = document.createElement("input");
  input.className = "text-answer";
  input.type = "text";
  input.autocomplete = "off";
  input.placeholder = "Ide írd a választ";
  input.addEventListener("input", () => {
    state.selectedAnswer = input.value;
    elements.check.disabled = !input.value.trim();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !elements.check.disabled) checkAnswer();
  });
  elements.answerArea.appendChild(input);
  input.focus();
}

function checkAnswer() {
  const step = currentStep();
  const answer = step.type === "build" ? state.sentenceAnswer.join(" ") : state.selectedAnswer;
  const isCorrect = normalize(answer) === normalize(step.answer);
  state.attempts += 1;
  if (isCorrect) {
    state.correct += 1;
    state.xp += 10;
    elements.feedback.textContent = "Helyes! Ez szépen beakadt.";
    elements.feedback.classList.add("good");
  } else {
    elements.feedback.textContent = `Majdnem. A jó válasz: ${step.answer}`;
    elements.feedback.classList.add("bad");
  }
  elements.check.textContent = isLastStep() ? "Lecke befejezése" : "Tovább";
  elements.check.disabled = false;
  elements.check.onclick = nextTask;
  saveState();
  updateStats();
}

function skipTask() {
  const step = currentStep();
  if (step.type !== "learn") {
    state.attempts += 1;
    state.skipped += 1;
  }
  elements.feedback.textContent = step.type === "learn" ? "Rendben, továbblépünk." : `Kihagyva. A jó válasz: ${step.answer}`;
  elements.feedback.className = "feedback";
  elements.check.textContent = isLastStep() ? "Lecke befejezése" : "Tovább";
  elements.check.disabled = false;
  elements.check.onclick = nextTask;
  saveState();
  updateStats();
}

function isLastStep() {
  return state.currentStep === currentSteps().length - 1;
}

function nextTask() {
  if (!isLastStep()) {
    state.currentStep += 1;
    saveState();
    renderTask();
    return;
  }
  completeLesson();
}

function completeLesson() {
  const lesson = currentLesson();
  if (lesson.id !== "free-practice") {
    const completed = completedLessons();
    if (!completed.includes(lesson.id)) setCompletedLessons([...completed, lesson.id]);
    if (state.lastStudyDate !== todayKey()) {
      state.streak += 1;
      state.lastStudyDate = todayKey();
    }
  }
  state.currentLessonId = "";
  state.currentStep = 0;
  state.freeLesson = null;
  saveState();
  refresh();
  showScreen("home-screen");
}

function speak(text) {
  speakIn(text, state.language);
}

function speakIn(text, languageId) {
  if (!("speechSynthesis" in window)) return;
  const spokenText = String(text).split(" / ")[0];
  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = curriculum[languageId]?.speakLang || activeCourse().speakLang;
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function getNextLevel() {
  const ids = levelIds();
  return ids[ids.indexOf(state.level) + 1] || "";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function pluralizeHu(word) {
  if (!word || word.includes(" ") || word[0] === word[0]?.toUpperCase()) return "";
  const lower = word.toLowerCase();
  if (pluralExceptions.hu[lower]) return pluralExceptions.hu[lower];
  if (/[aá]$/.test(lower)) return `${word.slice(0, -1)}ák`;
  if (/[eéiíöőüű]$/.test(lower)) return `${word}k`;
  if (/[oóuú]$/.test(lower)) return `${word}k`;
  return `${word}ok`;
}

function pluralizeEn(word) {
  if (!word || word.includes(" ") || word[0] === word[0]?.toUpperCase()) return "";
  const lower = word.toLowerCase();
  if (pluralExceptions.en[lower]) return pluralExceptions.en[lower];
  if (/[^aeiou]y$/i.test(word)) return `${word.slice(0, -1)}ies`;
  if (/(s|x|z|ch|sh)$/i.test(word)) return `${word}es`;
  return `${word}s`;
}

function pluralizeEs(word) {
  if (!word || word.includes(" ") || word[0] === word[0]?.toUpperCase()) return "";
  const lower = word.toLowerCase();
  if (pluralExceptions.es[lower]) return pluralExceptions.es[lower];
  if (/[aeiouáéíóú]$/i.test(word)) return `${word}s`;
  if (/[z]$/i.test(word)) return `${word.slice(0, -1)}ces`;
  return `${word}es`;
}

function pluralFor(entry, languageId) {
  if (!entry || entry.type === "verb") return "";
  const explicit = entry[`${languageId}Plural`];
  if (explicit) return explicit;
  if (entry.noPlural || entry[languageId] === "Sun" || entry[languageId] === "Sol" || entry.hu === "Nap") return "";
  if (languageId === "hu") return pluralizeHu(entry.hu);
  if (languageId === "en") return pluralizeEn(entry.en);
  if (languageId === "es") return pluralizeEs(entry.es);
  return "";
}

function termWithPlural(entry, languageId) {
  const singular = entry?.[languageId] || "";
  const plural = pluralFor(entry, languageId);
  return plural ? `${singular} / ${plural}` : singular;
}

function meaningMatches(meaning, query) {
  const normalizedQuery = normalize(query);
  return normalize(meaning) === normalizedQuery
    || normalize(meaning).split(/\s*,\s*/).some((part) => part === normalizedQuery);
}

function allCurriculumItems(languageId) {
  const course = curriculum[languageId];
  if (!course) return [];
  return Object.values(course.levels).flatMap((level) => level.lessons.flatMap((lesson) => lesson.items));
}

function findCurriculumItem(languageId, query) {
  const normalizedQuery = normalize(query);
  return allCurriculumItems(languageId).find((item) =>
    normalize(item.term) === normalizedQuery || meaningMatches(item.meaning, normalizedQuery)
  );
}

function findCurriculumItemByMeaning(languageId, meaning) {
  return allCurriculumItems(languageId).find((item) =>
    looksLikeHungarianVerb(item.meaning) && meaningMatches(item.meaning, meaning)
  );
}

function findQuickEntry(query) {
  const rawQuery = query.trim();
  if (!rawQuery) return undefined;
  const exact = quickDictionary.find((entry) =>
    ["hu", "en", "es"].some((key) => entry[key] === rawQuery)
      || ["hu", "en", "es"].some((key) => {
        const plural = pluralFor(entry, key);
        return plural && plural === rawQuery;
      })
      || (entry.aliases || []).some((alias) => alias === rawQuery)
  );
  if (exact) return exact;

  const normalizedQuery = normalize(query);
  const exactQuery = query.trim().toLowerCase();
  return quickDictionary.find((entry) =>
    ["hu", "en", "es"].some((key) => normalize(entry[key]) === normalizedQuery)
      || ["hu", "en", "es"].some((key) => {
        const plural = pluralFor(entry, key);
        return plural && normalize(plural) === normalizedQuery;
      })
      || (entry.aliases || []).some((alias) => alias.trim().toLowerCase() === exactQuery)
  );
}

function findIrregular(languageId, query) {
  const list = verbData[languageId]?.irregular || {};
  const normalizedQuery = normalize(query);
  return Object.entries(list).find(([base, entry]) => {
    const aliases = entry.aliases || [];
    return [base, ...aliases].some((value) => normalize(value) === normalizedQuery)
      || meaningMatches(entry.meaning, normalizedQuery);
  });
}

function englishRegularForms(base) {
  const lower = base.toLowerCase();
  const third = lower.endsWith("y") && !/[aeiou]y$/.test(lower)
    ? `${base.slice(0, -1)}ies`
    : /(?:s|x|z|ch|sh|o)$/.test(lower) ? `${base}es` : `${base}s`;
  const past = lower.endsWith("e")
    ? `${base}d`
    : lower.endsWith("y") && !/[aeiou]y$/.test(lower) ? `${base.slice(0, -1)}ied` : `${base}ed`;
  const gerund = lower.endsWith("ie")
    ? `${base.slice(0, -2)}ying`
    : lower.endsWith("e") && lower !== "be" ? `${base.slice(0, -1)}ing` : `${base}ing`;
  return { base, present: base, presentThird: third, past, participle: past, gerund };
}

function spanishRegularForms(infinitive) {
  const stem = infinitive.slice(0, -2);
  const ending = infinitive.slice(-2);
  const endings = {
    ar: {
      present: ["o", "as", "a", "amos", "an"],
      preterite: ["é", "aste", "ó", "amos", "aron"],
      imperfect: ["aba", "abas", "aba", "ábamos", "aban"],
      future: ["é", "ás", "á", "emos", "án"],
      gerund: "ando",
      participle: "ado"
    },
    er: {
      present: ["o", "es", "e", "emos", "en"],
      preterite: ["í", "iste", "ió", "imos", "ieron"],
      imperfect: ["ía", "ías", "ía", "íamos", "ían"],
      future: ["é", "ás", "á", "emos", "án"],
      gerund: "iendo",
      participle: "ido"
    },
    ir: {
      present: ["o", "es", "e", "imos", "en"],
      preterite: ["í", "iste", "ió", "imos", "ieron"],
      imperfect: ["ía", "ías", "ía", "íamos", "ían"],
      future: ["é", "ás", "á", "emos", "án"],
      gerund: "iendo",
      participle: "ido"
    }
  }[ending];
  if (!endings) return null;
  return {
    infinitive,
    present: endings.present.map((suffix) => `${stem}${suffix}`).join(" / "),
    preterite: endings.preterite.map((suffix) => `${stem}${suffix}`).join(" / "),
    imperfect: endings.imperfect.map((suffix) => `${stem}${suffix}`).join(" / "),
    future: endings.future.map((suffix) => `${infinitive}${suffix}`).join(" / "),
    gerund: `${stem}${endings.gerund}`,
    participle: `${stem}${endings.participle}`
  };
}

function looksLikeHungarianVerb(meaning) {
  if (!meaning) return true;
  return normalize(meaning)
    .split(/[\s,]+/)
    .some((part) => part.endsWith("ni"));
}

function buildEnglishResult(base, meaning, irregularEntry) {
  const forms = irregularEntry?.forms || englishRegularForms(base);
  return {
    language: "Angol",
    title: `${forms.base} - ${meaning || irregularEntry?.meaning || "angol ige"}`,
    note: irregularEntry ? "Rendhagyó ige." : "Szabályos angol képzés alapján.",
    rows: [
      ["Alapalak", forms.base],
      ["Egyszerű jelen: I/you/we/they", forms.present],
      ["Egyszerű jelen: he/she/it", forms.presentThird],
      ["Egyszerű múlt", forms.past],
      ["Present perfect", `have / has ${forms.participle}`],
      ["Past perfect", `had ${forms.participle}`],
      ["Jövő", `will ${forms.base}`],
      ["Folyamatos alak", forms.gerund]
    ]
  };
}

function buildSpanishResult(infinitive, meaning, irregularEntry) {
  const forms = irregularEntry?.forms || spanishRegularForms(infinitive);
  if (!forms) return null;
  return {
    language: "Spanyol",
    title: `${forms.infinitive} - ${meaning || irregularEntry?.meaning || "spanyol ige"}`,
    note: irregularEntry ? "Rendhagyó ige." : `Szabályos -${infinitive.slice(-2)} ige alapján.`,
    rows: [
      ["Főnévi igenév", forms.infinitive],
      ["Jelen idő", forms.present],
      ["Befejezett múlt", forms.preterite],
      ["Folyamatos/szokásos múlt", forms.imperfect],
      ["Jövő idő", forms.future],
      ["Gerundio", forms.gerund],
      ["Participio", forms.participle]
    ]
  };
}

function analyzeVerbForLanguage(languageId, query) {
  const irregular = findIrregular(languageId, query);
  if (irregular) {
    const [base, entry] = irregular;
    return languageId === "en"
      ? buildEnglishResult(base, entry.meaning, entry)
      : buildSpanishResult(base, entry.meaning, entry);
  }

  const curriculumTerm = findCurriculumTerm(languageId, query);
  const candidate = curriculumTerm || query.trim().toLowerCase();
  const knownMeaning = curriculumTerm ? findCurriculumMeaning(languageId, curriculumTerm) : "";

  if (languageId === "en" && /^[a-z]+$/.test(candidate)) {
    if (knownMeaning && !looksLikeHungarianVerb(knownMeaning)) return null;
    return buildEnglishResult(candidate, knownMeaning, null);
  }
  if (languageId === "es" && /^[a-záéíóúñü]+(ar|er|ir)$/i.test(candidate)) {
    return buildSpanishResult(candidate.toLowerCase(), knownMeaning, null);
  }
  return null;
}

function findCurriculumMeaning(languageId, term) {
  const course = curriculum[languageId];
  if (!course) return "";
  const normalizedTerm = normalize(term);
  for (const level of Object.values(course.levels)) {
    for (const lesson of level.lessons) {
      const item = lesson.items.find((row) => normalize(row.term) === normalizedTerm);
      if (item) return item.meaning;
    }
  }
  return "";
}

function searchVerb() {
  const query = elements.verbInput.value.trim();
  if (!query) {
    elements.verbResult.textContent = "Írj be egy igét, például: go, learn, hablar, tener.";
    return;
  }

  const languageOrder = [state.language, ...Object.keys(curriculum).filter((id) => id !== state.language)];
  const result = languageOrder.map((languageId) => analyzeVerbForLanguage(languageId, query)).find(Boolean);
  if (!result) {
    elements.verbResult.innerHTML = `
      <strong>Nincs biztos találat.</strong>
      <span>Próbáld főnévi igenévvel: angolul például <b>go</b>, spanyolul például <b>hablar</b>.</span>
    `;
    return;
  }

  elements.verbResult.innerHTML = `
    <div class="verb-result-head">
      <span>${escapeHtml(result.language)}</span>
      <strong>${escapeHtml(result.title)}</strong>
      <small>${escapeHtml(result.note)}</small>
    </div>
    <div class="verb-table">
      ${result.rows.map(([label, value]) => `
        <div>
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function resolveVerbMeaning(query) {
  const quickEntry = findQuickEntry(query);
  if (quickEntry?.type === "verb") return quickEntry.hu;

  const irregular = Object.keys(curriculum)
    .map((languageId) => findIrregular(languageId, query))
    .find(Boolean);
  if (irregular) return irregular[1].meaning;

  const item = Object.keys(curriculum)
    .map((languageId) => findCurriculumItem(languageId, query))
    .find((row) => row && looksLikeHungarianVerb(row.meaning));
  return item?.meaning || "";
}

function analyzeVerbStrict(languageId, query, sharedMeaning) {
  const quickEntry = sharedMeaning ? findQuickEntry(sharedMeaning) : findQuickEntry(query);
  if (quickEntry?.type === "verb") {
    const candidate = quickEntry[languageId];
    const candidateIrregular = candidate ? findIrregular(languageId, candidate) : null;
    if (candidateIrregular) {
      const [base, entry] = candidateIrregular;
      return languageId === "en"
        ? buildEnglishResult(base, quickEntry.hu, entry)
        : buildSpanishResult(base, quickEntry.hu, entry);
    }
    if (languageId === "en" && candidate) return buildEnglishResult(candidate, quickEntry.hu, null);
    if (languageId === "es" && candidate) return buildSpanishResult(candidate, quickEntry.hu, null);
  }

  const irregular = findIrregular(languageId, query) || (sharedMeaning ? findIrregular(languageId, sharedMeaning) : null);
  if (irregular) {
    const [base, entry] = irregular;
    return languageId === "en"
      ? buildEnglishResult(base, entry.meaning, entry)
      : buildSpanishResult(base, entry.meaning, entry);
  }

  const curriculumItem = sharedMeaning
    ? findCurriculumItemByMeaning(languageId, sharedMeaning)
    : findCurriculumItem(languageId, query);
  const candidate = curriculumItem?.term || query.trim().toLowerCase();
  const knownMeaning = curriculumItem?.meaning || "";

  if (languageId === "en" && curriculumItem && /^[a-z]+$/.test(candidate)) {
    if (!looksLikeHungarianVerb(knownMeaning)) return null;
    return buildEnglishResult(candidate, knownMeaning, null);
  }
  if (languageId === "es" && (curriculumItem || (!sharedMeaning && spanishRegularMeaning(candidate))) && /^[a-záéíóúñü]+(ar|er|ir)$/i.test(candidate)) {
    if (curriculumItem && !looksLikeHungarianVerb(knownMeaning)) return null;
    return buildSpanishResult(candidate.toLowerCase(), knownMeaning || spanishRegularMeaning(candidate), null);
  }
  return null;
}

function renderVerbCard(result) {
  const base = result.title.split(" - ")[0];
  const tenseLabel = result.language === "Angol" ? "present simple" : "presente";
  return `
    <article class="verb-card">
      <div class="verb-result-head">
        <strong>${escapeHtml(result.language)}</strong>
        <small>(${escapeHtml(tenseLabel)})</small>
      </div>
      <div class="verb-table">
        ${verbDisplayRows(result).map((row) => `
          <div class="verb-form-row ${row.highlight ? "is-highlighted" : ""}">
            ${row.label ? `<span>${escapeHtml(row.label)}</span>` : ""}
            <strong>${escapeHtml(row.value)}</strong>
          </div>
        `).join("")}
      </div>
      <small class="verb-note">${escapeHtml(base)} · ${escapeHtml(result.note)}</small>
    </article>
  `;
}

function verbDisplayRows(result) {
  const lookup = Object.fromEntries(result.rows);
  if (result.language === "Angol") {
    const base = lookup["Alapalak"];
    const third = lookup["Egyszerű jelen: he/she/it"];
    return [
      { value: `I ${lookup["Egyszerű jelen: I/you/we/they"] || base}` },
      { value: `You ${lookup["Egyszerű jelen: I/you/we/they"] || base}` },
      { value: `He/She/It ${third || base}`, highlight: true },
      { value: `We ${lookup["Egyszerű jelen: I/you/we/they"] || base}` },
      { value: `They ${lookup["Egyszerű jelen: I/you/we/they"] || base}` }
    ];
  }

  const present = (lookup["Jelen idő"] || "").split(" / ");
  return [
    { value: `yo ${present[0] || ""}` },
    { value: `tú ${present[1] || ""}` },
    { value: `él/ella ${present[2] || ""}`, highlight: true },
    { value: `nosotros ${present[3] || ""}` },
    { value: `ellos/ellas ${present[4] || ""}` }
  ];
}

function spanishRegularMeaning(infinitive) {
  return {
    abrir: "kinyitni",
    aprender: "tanulni",
    bailar: "táncolni",
    beber: "inni",
    caminar: "sétálni",
    comer: "enni",
    comprar: "venni",
    escuchar: "hallgatni",
    esperar: "várni",
    estudiar: "tanulni",
    hablar: "beszélni",
    mirar: "nézni",
    necesitar: "szüksége van",
    agarrar: "fogni",
    correr: "futni",
    escribir: "írni",
    leer: "olvasni",
    trabajar: "dolgozni",
    vivir: "élni"
  }[normalize(infinitive)] || "";
}

function resolveWordMeaning(query) {
  const quickEntry = findQuickEntry(query);
  if (quickEntry) return quickEntry.hu;

  const irregular = Object.keys(curriculum)
    .map((languageId) => findIrregular(languageId, query))
    .find(Boolean);
  if (irregular) return irregular[1].meaning;

  const item = Object.keys(curriculum)
    .map((languageId) => findCurriculumItem(languageId, query))
    .find(Boolean);
  return item?.meaning || "";
}

function findIrregularByMeaning(languageId, meaning) {
  const list = verbData[languageId]?.irregular || {};
  return Object.entries(list).find(([, entry]) => meaningMatches(entry.meaning, meaning));
}

function findTranslationTerm(languageId, meaning, query) {
  const quickEntry = findQuickEntry(query) || findQuickEntry(meaning);
  if (quickEntry) return termWithPlural(quickEntry, languageId);

  const direct = findCurriculumItem(languageId, query);
  if (direct && meaningMatches(direct.meaning, meaning)) return direct.term;

  const irregular = findIrregularByMeaning(languageId, meaning);
  if (irregular) return irregular[0];

  const item = allCurriculumItems(languageId).find((row) => meaningMatches(row.meaning, meaning));
  return item?.term || "";
}

function renderTranslationSummary(meaning, results) {
  const quickEntry = findQuickEntry(elements.verbInput.value.trim()) || findQuickEntry(meaning);
  const en = findTranslationTerm("en", meaning, elements.verbInput.value.trim());
  const es = findTranslationTerm("es", meaning, elements.verbInput.value.trim());
  const hu = quickEntry ? termWithPlural(quickEntry, "hu") : meaning;
  if (!meaning && !en && !es) return "";

  return `
    <div class="translation-summary">
      <div>
        <span>Magyar</span>
        <strong>${escapeHtml(hu || "-")}</strong>
      </div>
      <div>
        <span>Angol</span>
        <strong>${escapeHtml(en || results.find((item) => item.language === "Angol")?.title.split(" - ")[0] || "-")}</strong>
      </div>
      <div>
        <span>Spanyol</span>
        <strong>${escapeHtml(es || results.find((item) => item.language === "Spanyol")?.title.split(" - ")[0] || "-")}</strong>
      </div>
    </div>
  `;
}

function verbTitleForQuery(query, results) {
  const normalizedQuery = normalize(query);
  const direct = results.find((result) => normalize(result.title.split(" - ")[0]) === normalizedQuery);
  return (direct || results[0])?.title.split(" - ")[0] || query;
}

function searchVerb() {
  const query = elements.verbInput.value.trim();
  if (!query) {
    elements.verbResult.textContent = "Írj be egy szót, például: fej, head, cabeza, menni, go, ir.";
    return;
  }

  const sharedMeaning = resolveVerbMeaning(query) || resolveWordMeaning(query);
  const results = ["en", "es"]
    .map((languageId) => analyzeVerbStrict(languageId, query, sharedMeaning))
    .filter(Boolean);

  const translationSummary = renderTranslationSummary(sharedMeaning, results);

  if (!results.length && !translationSummary) {
    elements.verbResult.innerHTML = `
      <strong>Nincs biztos találat.</strong>
      <span>Próbáld magyarul, angolul vagy spanyolul: <b>fej</b>, <b>head</b>, <b>cabeza</b>, <b>menni</b>, <b>go</b>, <b>ir</b>.</span>
    `;
    return;
  }

  elements.verbResult.innerHTML = `
    ${translationSummary}
    ${results.length ? `
      <h3 class="verb-table-title">Igetábla - ${escapeHtml(verbTitleForQuery(query, results))}</h3>
      <div class="verb-columns">
        ${results.map(renderVerbCard).join("")}
      </div>
    ` : `<span>Ez nem ige, ezért csak fordítást mutatok.</span>`}
  `;
}

function refresh() {
  renderSelectors();
  renderLessons();
  updateStats();
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});

elements.language.addEventListener("change", () => {
  state.language = elements.language.value;
  state.level = Object.keys(activeCourse().levels)[0];
  state.currentLessonId = "";
  saveState();
  refresh();
  showScreen("home-screen");
});

elements.level.addEventListener("change", () => {
  state.level = elements.level.value;
  state.currentLessonId = "";
  saveState();
  refresh();
  showScreen("home-screen");
});

document.querySelector("#back-home").addEventListener("click", () => showScreen("home-screen"));
document.querySelector("#speak-task").addEventListener("click", () => speak(currentStep().answer || currentStep().term));
elements.skip.addEventListener("click", skipTask);
document.querySelector("#free-practice").addEventListener("click", startFreePractice);
elements.nextLevel.addEventListener("click", () => {
  const next = getNextLevel();
  if (!next) return;
  state.level = next;
  state.currentLessonId = "";
  saveState();
  refresh();
  showScreen("home-screen");
});
document.querySelector("#reset-progress").addEventListener("click", () => {
  const { language, level } = state;
  state = { ...defaultState, language, level };
  saveState();
  refresh();
});
document.querySelector("#shuffle-review").addEventListener("click", renderReview);
elements.wordList.addEventListener("click", (event) => {
  const button = event.target.closest(".dict-sound");
  if (!button) return;
  speakIn(button.dataset.term, button.dataset.lang);
});
elements.verbSearch.addEventListener("click", searchVerb);
elements.verbInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchVerb();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}

refresh();
