// Mana Bhasha – Level 1: Telugu vowels (అచ్చులు)
// No child data is collected. Progress is stored only in this browser (localStorage).

const VOWELS = [
  { l: "అ", s: "a",   hint: "like 'a' in about",  w: "అమ్మ",   en: "Mother",   pic: "👩‍👧" },
  { l: "ఆ", s: "aa",  hint: "like 'a' in father", w: "ఆవు",    en: "Cow",      pic: "🐄" },
  { l: "ఇ", s: "i",   hint: "like 'i' in sit",    w: "ఇల్లు",   en: "House",    pic: "🏠" },
  { l: "ఈ", s: "ee",  hint: "like 'ee' in see",   w: "ఈగ",     en: "Housefly", pic: "🪰" },
  { l: "ఉ", s: "u",   hint: "like 'u' in put",    w: "ఉడుత",   en: "Squirrel", pic: "🐿️" },
  { l: "ఊ", s: "oo",  hint: "like 'oo' in moon",  w: "ఊయల",   en: "Cradle swing", pic: "🪢" },
  { l: "ఋ", s: "ru",  hint: "a short 'ru'",       w: "ఋషి",    en: "Sage",     pic: "🧘" },
  { l: "ౠ", s: "roo", hint: "a long 'roo'",       w: null,     en: "Rarely used in words", pic: "✨" },
  { l: "ఎ", s: "e",   hint: "like 'e' in pen",    w: "ఎలుక",   en: "Mouse",    pic: "🐭" },
  { l: "ఏ", s: "ē",   hint: "long 'e', like 'a' in late", w: "ఏనుగు", en: "Elephant", pic: "🐘" },
  { l: "ఐ", s: "ai",  hint: "like 'i' in kite",   w: "ఐదు",    en: "Five",     pic: "🖐️" },
  { l: "ఒ", s: "o",   hint: "a short 'o'",        w: "ఒంటె",   en: "Camel",    pic: "🐪" },
  { l: "ఓ", s: "ō",   hint: "long 'o', like 'oa' in boat", w: "ఓడ", en: "Ship", pic: "🚢" },
  { l: "ఔ", s: "au",  hint: "like 'ou' in out",   w: "ఔషధం",  en: "Medicine", pic: "💊" },
  { l: "అం", s: "am", hint: "'a' with a soft 'm' (sunna)", w: "అంగడి", en: "Shop", pic: "🏪" },
  { l: "అః", s: "aha", hint: "'a' with a breath (visargam)", w: null, en: "Rarely starts a word", pic: "🌬️" },
];

const TIPS = [
  "Point to the letter and say it slowly together, 3 times.",
  "Ask: \"What else starts with this sound?\" Any answer is a win!",
  "Draw the letter in the air with your finger, then on your child's palm.",
  "Use the word today at home — e.g. say \"అమ్మ\" every time your child calls you.",
];

const store = {
  get() { try { return JSON.parse(localStorage.getItem("mb") || "{}"); } catch { return {}; } },
  set(v) { localStorage.setItem("mb", JSON.stringify(v)); },
};
let state = Object.assign({ stars: 0, done: {} }, store.get());
const save = () => { store.set(state); paintStars(); };
const $ = (s, r = document) => r.querySelector(s);
const app = $("#app");

function paintStars() { $("#stars").textContent = "⭐ " + state.stars; }
function earn(n = 1) { state.stars += n; save(); }

function go(view, arg) {
  history.pushState({ view, arg }, "", "#" + view + (arg != null ? "-" + arg : ""));
  render(view, arg);
}
window.addEventListener("popstate", e => render(e.state?.view || "home", e.state?.arg));
window.addEventListener("hashchange", () => { const [v, a] = location.hash.slice(1).split("-"); render(v || "home", a != null ? +a : undefined); });
$("#back").onclick = () => history.back();

function render(view = "home", arg) {
  $("#back").hidden = view === "home";
  window.scrollTo(0, 0);
  ({ home, vowels, letter, game }[view] || home)(arg);
}

function home() {
  app.replaceChildren($("#t-home").content.cloneNode(true));
  const n = Object.keys(state.done).length;
  $("#vowel-progress").textContent = `${n} / ${VOWELS.length} learned`;
  app.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
}

function vowels() {
  app.innerHTML = `<h2>Vowels · <span class="te">అచ్చులు</span></h2>
    <div class="grid">${VOWELS.map((v, i) =>
      `<button class="letter te ${state.done[v.l] ? "done" : ""}" data-i="${i}" aria-label="${v.s}">${v.l}</button>`).join("")}</div>
    <aside class="tip"><b>💡 Tip for Amma &amp; Nanna</b>Tap a letter together. A ⭐ appears when your child has learned it.</aside>`;
  app.querySelectorAll(".letter").forEach(b => b.onclick = () => go("letter", +b.dataset.i));
}

function letter(i = 0) {
  i = Math.max(0, Math.min(VOWELS.length - 1, i | 0));
  const v = VOWELS[i];
  app.innerHTML = `<div class="card">
      <div class="big te">${v.l}</div>
      <div class="say">Say <b>"${v.s}"</b> — ${v.hint}</div>
      <div class="pic" aria-hidden="true">${v.pic}</div>
      ${v.w ? `<div class="word te">${v.w}</div>` : ""}
      <div class="word-en">${v.en}</div>
      <div class="row">
        <button class="btn" id="prev" ${i === 0 ? "disabled" : ""}>← Back</button>
        <button class="btn go" id="learned">${state.done[v.l] ? "Learned ⭐" : "We learned it! ⭐"}</button>
        <button class="btn" id="next" ${i === VOWELS.length - 1 ? "disabled" : ""}>Next →</button>
      </div>
      <div class="note">🔊 Voice audio is coming soon (being checked for 100% correct pronunciation).</div>
    </div>
    <aside class="tip"><b>💡 Tip for Amma &amp; Nanna</b>${TIPS[i % TIPS.length]}</aside>`;
  $("#prev").onclick = () => go("letter", i - 1);
  $("#next").onclick = () => go("letter", i + 1);
  $("#learned").onclick = () => {
    if (!state.done[v.l]) { state.done[v.l] = 1; earn(1); }
    if (i < VOWELS.length - 1) go("letter", i + 1); else go("vowels");
  };
}

function game() {
  const pool = VOWELS.filter(v => v.w);
  const ans = pool[Math.floor(Math.random() * pool.length)];
  const others = VOWELS.filter(v => v !== ans).sort(() => Math.random() - .5).slice(0, 2);
  const opts = [ans, ...others].sort(() => Math.random() - .5);
  app.innerHTML = `<div class="card">
      <div>Which letter does this word start with?</div>
      <div class="q-pic" aria-hidden="true">${ans.pic}</div>
      <div class="q-word te">${ans.w}</div>
      <div class="word-en">${ans.en}</div>
      <div class="choices">${opts.map(o => `<button class="choice te" data-l="${o.l}">${o.l}</button>`).join("")}</div>
      <div class="cheer" id="cheer"></div>
    </div>
    <aside class="tip"><b>💡 Tip for Amma &amp; Nanna</b>Read the word aloud first, then let your child choose.</aside>`;
  let tried = false;
  app.querySelectorAll(".choice").forEach(b => b.onclick = () => {
    if (b.dataset.l === ans.l) {
      b.classList.add("right");
      $("#cheer").textContent = tried ? "Good! 👍" : "బాగుంది! Super! ⭐";
      if (!tried) earn(1);
      setTimeout(() => render("game"), 1200);
    } else { tried = true; b.classList.add("wrong"); $("#cheer").textContent = "Try again 🙂"; }
  });
}

paintStars();
const [v0, a0] = location.hash.slice(1).split("-");
history.replaceState({ view: v0 || "home", arg: a0 != null ? +a0 : undefined }, "");
render(v0 || "home", a0 != null ? +a0 : undefined);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
