// మన భాష — app
// Privacy: no child data leaves this device. Progress lives in localStorage only.
"use strict";
(() => {
const C = TE;                       // course (Telugu first; other languages plug in the same way)
const $ = (s, r = document) => r.querySelector(s);
const app = $("#app");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const today = () => new Date().toISOString().slice(0, 10);
const PASS = 0.8;
const PREVIEW = new URLSearchParams(location.search).has("preview");

// ---------- state ----------
const KEY = "mb_" + C.lang;
let S = Object.assign({ who: null, stars: 0, done: {}, exams: {}, streak: 0, last: null, plan: "free", name: "" },
  JSON.parse(localStorage.getItem(KEY) || "{}"));
const save = () => { localStorage.setItem(KEY, JSON.stringify(S)); paintChips(); };
function touchStreak() {
  const t = today(); if (S.last === t) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  S.streak = S.last === y ? S.streak + 1 : 1; S.last = t; save();
}
function paintChips() { $("#stars").textContent = "⭐ " + S.stars; $("#streak").textContent = "🔥 " + S.streak; }
function earn(n = 1) { S.stars += n; save(); }
const unlocked = w => PREVIEW || w.free || S.plan === "full";
const adult = () => S.who === "adult";

// ---------- audio ----------
let AMAP = {};
fetch("audio/" + C.lang + "/map.json").then(r => r.ok ? r.json() : {}).then(m => AMAP = m).catch(() => {});
let player, TEV = null;
// Fallback: the phone's own Telugu voice (free, on-device), when we have no recorded clip yet.
function findVoice() { if (!("speechSynthesis" in window)) return; TEV = speechSynthesis.getVoices().find(v => /^te/i.test(v.lang)) || null; }
if ("speechSynthesis" in window) { findVoice(); speechSynthesis.onvoiceschanged = findVoice; }
function speak(text, btn) {
  const f = AMAP[text];
  if (!f) {
    if (!TEV) return false;
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.voice = TEV; u.lang = TEV.lang; u.rate = .8;
    if (btn) { btn.classList.add("playing"); u.onend = u.onerror = () => btn.classList.remove("playing"); }
    speechSynthesis.speak(u); return true;
  }
  if (player) player.pause();
  player = new Audio("audio/" + C.lang + "/" + f);
  if (btn) { btn.classList.add("playing"); player.onended = player.onerror = () => btn.classList.remove("playing"); }
  player.play().catch(() => btn && btn.classList.remove("playing"));
  return true;
}
const audioBtn = text => (AMAP[text] || TEV) ? `<button class="audio" data-say="${esc(text)}" aria-label="Listen">🔊</button>` : "";
function wireAudio(root) { root.querySelectorAll("[data-say]").forEach(b => b.onclick = e => { e.stopPropagation(); speak(b.dataset.say, b); }); }

// ---------- effects ----------
function confetti(n = 24) {
  const fx = $("#fx"); const bits = ["⭐", "🎉", "🌸", "✨", "🎈"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span"); s.textContent = bits[i % bits.length];
    s.style.left = Math.random() * 100 + "vw"; s.style.animationDelay = Math.random() * .6 + "s";
    fx.appendChild(s); setTimeout(() => s.remove(), 2600);
  }
}
const guide = msg => `<div class="guide"><img src="art/chitti.svg" alt=""><div class="bubble">${msg}</div></div>`;

// ---------- router ----------
function go(path) { location.hash = path; }
window.addEventListener("hashchange", route);
$("#back").onclick = () => history.length > 1 ? history.back() : go("");
function route() {
  const [v, a, b] = location.hash.slice(1).split("/");
  $("#back").hidden = !v;
  window.scrollTo(0, 0);
  if (!S.who) return onboarding();
  touchStreak();
  ({ world, lesson, exam, plans, cert, about }[v] || home)(a, b);
}

// ---------- views ----------
function onboarding() {
  $("#back").hidden = true;
  app.innerHTML = `${guide("నమస్తే! I'm <b>Chitti</b> 🦜<br>I'll teach you Telugu. Who is learning today?")}
    <div class="who">
      <button data-w="kid"><span>🧒</span>A child<br><small class="muted">with Amma/Nanna nearby</small></button>
      <button data-w="adult"><span>🧑</span>A grown-up<br><small class="muted">learning for myself</small></button>
    </div>
    <p class="foot">No sign-up. We never collect any data about your child.</p>`;
  app.querySelectorAll("[data-w]").forEach(b => b.onclick = () => { S.who = b.dataset.w; save(); route(); });
}

function worldProgress(w) {
  const ls = w.lessons; const d = ls.filter(l => S.done[l.id]).length;
  return { d, n: ls.length, pct: Math.round(100 * d / ls.length) };
}

function home() {
  document.body.classList.toggle("adult", adult());
  const next = C.worlds.find(w => !S.exams[w.id]) || C.worlds[0];
  const hello = adult() ? `Welcome back! Next up: <b>${next.en}</b>.` : `Hi! Let's play in the <b class="te">${next.te}</b> today! 🎈`;
  app.innerHTML = guide(hello) + `<div class="map">${C.worlds.map((w, i) => {
      const p = worldProgress(w); const lock = !unlocked(w);
      return `${i ? '<div class="path"></div>' : ""}<button class="node ${lock ? "locked" : ""}" style="--c:${w.color};animation-delay:${i * .06}s" data-w="${w.id}">
        <span class="orb te">${w.icon}</span>
        <span style="flex:1"><span class="t1 te">${w.te}</span><br><span class="t2">${i + 1}. ${w.en}${w.free ? " · FREE" : ""}</span>
        <span class="meter"><i style="width:${p.pct}%"></i></span></span>
        ${S.exams[w.id] ? '<span class="badge">🏅</span>' : ""}</button>`;
    }).join("")}<div class="path"></div>
    <button class="node cert-node" data-cert><span class="orb" style="--c:#f2a900">🎓</span><span><span class="t1">Certificate</span><br><span class="t2">Pass all 8 tests</span></span></button></div>
    <aside class="tip"><b>💡 Tip for Amma &amp; Nanna</b>10 minutes a day is enough. Sit together, tap 🔊, repeat aloud, and praise every try. The 🔥 counts days in a row.</aside>
    <div class="row"><button class="btn" data-plans>⭐ Unlock all worlds</button><button class="btn" data-about>ℹ️ About</button></div>
    <p class="foot">We never collect any data about your child. Progress stays only on this device.</p>`;
  app.querySelectorAll("[data-w]").forEach(b => b.onclick = () => {
    const w = C.worlds.find(x => x.id === b.dataset.w); go(unlocked(w) ? "world/" + w.id : "plans");
  });
  $("[data-cert]").onclick = () => go("cert");
  $("[data-plans]").onclick = () => go("plans");
  $("[data-about]").onclick = () => go("about");
}

function world(id) {
  const w = C.worlds.find(x => x.id === id); if (!w) return home();
  if (!unlocked(w)) return plans();
  document.documentElement.style.setProperty("--c", w.color);
  const allDone = w.lessons.every(l => S.done[l.id]);
  app.innerHTML = `<div class="whead"><span class="orb te" style="--c:${w.color}">${w.icon}</span><div><h2 class="te" style="margin:0">${w.te}</h2><div class="muted">${w.en}</div></div></div>
    ${guide(w.intro)}
    <div class="lessons">${w.lessons.map((l, i) => `<button class="lesson ${S.done[l.id] ? "done" : ""}" data-l="${l.id}" style="animation-delay:${i * .05}s">
      <span class="n">${S.done[l.id] ? "✓" : i + 1}</span><span class="lt te">${l.title}</span><span>›</span></button>`).join("")}
      <button class="lesson exam" data-exam><span class="n">${S.exams[w.id] ? "🏅" : "📝"}</span><span class="lt">పరీక్ష · Test${S.exams[w.id] ? " — passed " + S.exams[w.id] + "%" : allDone ? "" : " (finish the lessons first, or try anyway!)"}</span><span>›</span></button>
    </div>`;
  app.querySelectorAll("[data-l]").forEach(b => b.onclick = () => go(`lesson/${w.id}/${b.dataset.l}`));
  $("[data-exam]").onclick = () => go("exam/" + w.id);
}

// Build "pages" for a lesson
function pagesFor(l) {
  if (l.type === "letters") return l.items.map(it => `
      <div class="big te">${it.t}</div>
      ${it.s ? `<div class="say">Say <b>"${esc(it.s)}"</b>${it.hint ? " — " + esc(it.hint) : ""}</div>` : ""}
      <div class="pic">${it.pic}</div>
      ${it.w ? `<div class="word te">${it.w}</div>` : ""}<div class="en">${esc(it.en)}</div>
      ${audioBtn(it.w ? it.t + ". " + it.w : it.t)}`);
  if (l.type === "gunintham") {
    const row = gunintham(l.base);
    return [`<div class="mid te">${l.base} + ా = ${l.base}ా</div><div class="say">Each vowel sign changes the sound of <b class="te">${l.base}</b>.</div>
        <div class="grid4">${row.map((r, i) => `<span class="cell te" style="animation-delay:${i * .04}s">${r.t}</span>`).join("")}</div>`,
      ...row.map(r => `<div class="big te">${r.t}</div><div class="say">${l.base} + "${r.s}"</div>${audioBtn(r.t)}`)];
  }
  if (l.type === "words") return l.items.map(it => `
      <div class="pic">${it.pic}</div><div class="mid te">${it.t}</div><div class="en">${esc(it.en)}</div>
      ${it.note ? `<div class="note te">${it.note}</div>` : ""}${audioBtn(it.t)}`);
  if (l.type === "sentences" || l.type === "story") return l.items.map(it => `
      ${l.type === "story" ? '<img src="art/chitti.svg" alt="" style="width:110px;animation:bob 2.6s infinite">' : '<div class="pic">💬</div>'}
      <div class="sent te">${it.t}</div><div class="en">${esc(it.en)}</div>${audioBtn(it.t)}`);
  if (l.type === "poem") return [
      `<div class="pic">🎵</div><div class="mid te">${l.title}</div><div class="en">${esc(l.kind)}</div>`,
      `<div class="poem te">${l.lines.map((x, i) => `<div style="animation-delay:${i * .3}s">${x}</div>`).join("")}</div>${audioBtn(l.lines.join(" "))}`,
      `<div class="pic">💡</div><div class="say"><b>Meaning</b></div><div class="en" style="font-size:18px">${esc(l.meaning)}</div>`];
  return [];
}

function lesson(wid, lid) {
  const w = C.worlds.find(x => x.id === wid); const l = w && w.lessons.find(x => x.id === lid);
  if (!l || !unlocked(w)) return home();
  document.documentElement.style.setProperty("--c", w.color);
  if (l.type === "trace") return trace(w, l);
  const pages = pagesFor(l); let i = 0;
  app.innerHTML = `<h2 class="te">${l.title}</h2><div class="book" id="book"></div>
    <div class="navrow"><button class="btn" id="prev">←</button><div class="dots" id="dots"></div><button class="btn go" id="next">→</button></div>
    <aside class="tip"><b>💡 Tip for Amma &amp; Nanna</b>${adult() ? "Say each one aloud 3 times. Swipe to turn the page." : "Tap 🔊, then say it together. Swipe like a real book!"}</aside>`;
  const book = $("#book");
  function show(dir) {
    const old = book.querySelector(".page");
    const p = document.createElement("div"); p.className = "page" + (dir ? (dir > 0 ? " in-next" : " in-prev") : "");
    p.innerHTML = pages[i] + `<span class="pg-no">${i + 1} / ${pages.length}</span>`;
    if (old) { old.style.zIndex = 2; old.classList.add(dir > 0 ? "out-next" : "out-prev"); setTimeout(() => old.remove(), 600); }
    book.appendChild(p); wireAudio(p);
    $("#dots").innerHTML = pages.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("");
    $("#prev").disabled = i === 0;
    $("#next").textContent = i === pages.length - 1 ? "Done ⭐" : "→";
  }
  const next = () => { if (i < pages.length - 1) { i++; show(1); } else finish(); };
  const prev = () => { if (i > 0) { i--; show(-1); } };
  $("#next").onclick = next; $("#prev").onclick = prev;
  let x0 = null;
  book.onpointerdown = e => x0 = e.clientX;
  book.onpointerup = e => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (dx < -40) next(); else if (dx > 40) prev(); };
  function finish() {
    if (!S.done[l.id]) { S.done[l.id] = 1; earn(3); }
    confetti();
    app.innerHTML = `<div class="result">${guide(adult() ? "Lesson complete! +3 ⭐" : "బాగుంది! Super! You earned 3 stars! ⭐⭐⭐")}
      <div class="row"><button class="btn go big" id="play">🎯 Quick game</button><button class="btn" id="back2">Back to ${esc(w.en)}</button></div></div>`;
    $("#play").onclick = () => go(`exam/${w.id}/${l.id}`);
    $("#back2").onclick = () => go("world/" + w.id);
  }
  show(0);
}

// Questions from a lesson (or the whole world for the test)
function qPool(w, onlyLesson) {
  const out = [];
  w.lessons.filter(l => !onlyLesson || l.id === onlyLesson).forEach(l => {
    if (l.type === "letters") l.items.forEach(it => out.push({ ans: it.t, show: it.w ? `<div class="pic">${it.pic}</div><div class="word te">${it.w}</div><div class="en">${esc(it.en)}</div>` : `<div class="say">Which letter says <b>"${esc(it.s)}"</b>?</div>`,
      prompt: it.w ? "Which letter does this word start with?" : "Find the letter", pool: l.items.map(x => x.t), say: it.t }));
    if (l.type === "gunintham") gunintham(l.base).slice(0, 14).forEach(r => out.push({ ans: r.t, prompt: `Which one is ${l.base} + "${r.s}"?`, show: "", pool: gunintham(l.base).map(x => x.t), say: r.t }));
    if (l.type === "words") l.items.forEach(it => out.push({ ans: it.t, prompt: "Which word is this?", show: `<div class="pic">${it.pic}</div><div class="en">${esc(it.en)}</div>`, pool: l.items.map(x => x.t), small: true, say: it.t }));
    if (l.type === "sentences" || l.type === "story") l.items.forEach(it => out.push({ ans: it.t, prompt: "Which one means:", show: `<div class="word" style="font-size:24px">"${esc(it.en)}"</div>`, pool: l.items.map(x => x.t), small: true, two: true, say: it.t }));
    if (l.type === "poem") out.push({ ans: l.lines[1], prompt: "What comes next?", show: `<div class="te" style="font-size:20px;font-weight:700">${l.lines[0]}</div>`, pool: w.lessons.filter(x => x.type === "poem").flatMap(x => x.lines.slice(1)), small: true, two: true });
    if (l.type === "trace") l.items.forEach(t => out.push({ ans: t, prompt: "Find this letter", show: `<div class="say">Tap the letter you traced!</div>${audioBtn(t)}`, pool: l.items }));
  });
  return out;
}

function exam(wid, onlyLesson) {
  const w = C.worlds.find(x => x.id === wid); if (!w || !unlocked(w)) return home();
  document.documentElement.style.setProperty("--c", w.color);
  const isTest = !onlyLesson;
  const qs = shuffle(qPool(w, onlyLesson)).slice(0, isTest ? 10 : 5);
  let k = 0, right = 0;
  function ask() {
    const q = qs[k];
    const wrongs = shuffle([...new Set(q.pool)].filter(x => x !== q.ans)).slice(0, q.two ? 1 : 2);
    const opts = shuffle([q.ans, ...wrongs]);
    app.innerHTML = `<h2>${isTest ? "📝 పరీక్ష · Test" : "🎯 Quick game"} <span class="muted" style="font-size:16px">${k + 1}/${qs.length}</span></h2>
      <div class="qbar"><i style="width:${100 * k / qs.length}%"></i></div>
      <div class="qcard"><div class="qprompt">${q.prompt}</div>${q.show}
      <div class="choices ${q.two ? "two" : ""}">${opts.map(o => `<button class="choice te ${q.small ? "small" : ""}" data-o="${esc(o)}">${o}</button>`).join("")}</div>
      <div class="cheer" id="cheer"></div></div>`;
    wireAudio(app);
    let tried = false;
    app.querySelectorAll(".choice").forEach(b => b.onclick = () => {
      if (b.dataset.o === q.ans) {
        b.classList.add("right"); if (!tried) right++;
        $("#cheer").textContent = tried ? "Got it 👍" : ["బాగుంది! ⭐", "Super! 🎉", "భలే! 🌟"][k % 3];
        if (q.say) speak(q.say);
        app.querySelectorAll(".choice").forEach(x => x.disabled = true);
        setTimeout(() => { k++; k < qs.length ? ask() : done(); }, 1000);
      } else { tried = true; b.classList.add("wrong"); $("#cheer").textContent = isTest ? "Not this one…" : "Try again 🙂"; }
    });
  }
  function done() {
    const pct = Math.round(100 * right / qs.length);
    const pass = pct >= PASS * 100;
    if (isTest && pass && (!S.exams[w.id] || S.exams[w.id] < pct)) { S.exams[w.id] = pct; earn(10); }
    else if (!isTest) earn(right);
    if (pass) confetti(40);
    app.innerHTML = `<div class="result"><div class="score">${pct}%</div>
      ${guide(isTest ? (pass ? `🏅 You passed the <b class="te">${w.te}</b> test! +10 ⭐` : "Almost! You need 80% to pass. Practice a little and try again — you can do it! 💪") : `You got ${right} of ${qs.length}! +${right} ⭐`)}
      <div class="row"><button class="btn go big" id="again">${pass ? "Play again" : "Try again"}</button><button class="btn" id="back2">Back</button></div></div>`;
    $("#again").onclick = () => exam(wid, onlyLesson);
    $("#back2").onclick = () => go("world/" + w.id);
  }
  qs.length ? ask() : home();
}

function trace(w, l) {
  let i = 0;
  function draw() {
    const t = l.items[i];
    app.innerHTML = `<h2 class="te">${l.title}</h2>${guide(adult() ? "Trace the letter with your finger." : "Draw over the letter with your finger! ✍️")}
      <div class="tracebox" id="tb"><div class="ghost te">${t}</div><canvas id="cv"></canvas></div>
      <div class="row"><button class="btn" id="clr">🧽 Clear</button>${audioBtn(t)}<button class="btn go" id="ok">${i < l.items.length - 1 ? "Next →" : "Done ⭐"}</button></div>`;
    wireAudio(app);
    const cv = $("#cv"), tb = $("#tb"); const r = tb.getBoundingClientRect(); const dpr = devicePixelRatio || 1;
    cv.width = r.width * dpr; cv.height = r.height * dpr; const g = cv.getContext("2d"); g.scale(dpr, dpr);
    g.lineCap = g.lineJoin = "round"; g.lineWidth = 16; g.strokeStyle = w.color;
    let down = false, inked = 0;
    const pos = e => { const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    cv.onpointerdown = e => { down = true; cv.setPointerCapture(e.pointerId); g.beginPath(); g.moveTo(...pos(e)); };
    cv.onpointermove = e => { if (!down) return; g.lineTo(...pos(e)); g.stroke(); inked++; };
    cv.onpointerup = () => down = false;
    $("#clr").onclick = () => { g.clearRect(0, 0, cv.width, cv.height); inked = 0; };
    $("#ok").onclick = () => {
      if (inked < 15) { $(".bubble").textContent = "Trace it first! ✍️"; return; }
      earn(1); confetti(10);
      if (i < l.items.length - 1) { i++; setTimeout(draw, 300); }
      else { if (!S.done[l.id]) { S.done[l.id] = 1; earn(3); } go("world/" + w.id); }
    };
  }
  draw();
}

function plans() {
  app.innerHTML = `${guide("Unlock all 8 worlds: consonants, guninthalu, words, speaking, reading, songs & poems — plus all tests and the certificate! 🎓")}
    <div class="plans">
      <div class="plan best"><span class="ribbon">BEST VALUE</span><div class="price">$39 <small>/ year</small></div>
        <ul><li>All 8 worlds + tests + certificate</li><li>All children in your home</li><li>Works offline</li><li>7-day full refund, no questions</li></ul></div>
      <div class="plan"><div class="price">$4.99 <small>/ month</small></div><ul><li>Everything, month to month</li><li>Cancel any time</li></ul></div>
    </div>
    <div class="row"><button class="btn go big" disabled>Payments open very soon 🙏</button></div>
    <p class="foot">First world is free forever. Compare: weekly classes often cost $300+ per year.</p>`;
}

function cert() {
  const all = C.worlds.every(w => S.exams[w.id]);
  if (!all && !PREVIEW) {
    const n = Object.keys(S.exams).length;
    app.innerHTML = `${guide(`Pass all 8 world tests to get your certificate! You have passed <b>${n}</b> of 8. 🏅`)}
      <div class="map">${C.worlds.map(w => `<div class="lesson"><span class="n">${S.exams[w.id] ? "🏅" : "·"}</span><span class="lt te">${w.te}</span></div>`).join("")}</div>`;
    return;
  }
  app.innerHTML = `${guide("Congratulations! 🎉 Type the learner's name — it stays only on this device.")}
    <input class="name" id="nm" maxlength="40" placeholder="Name" value="${esc(S.name)}">
    <canvas class="cert" id="cv" width="1400" height="1000"></canvas>
    <div class="row"><button class="btn go" id="dl">⬇️ Save / print</button></div>
    <p class="foot">This is a Mana Bhasha course certificate. It is not a school or university credit.</p>`;
  const cv = $("#cv"), g = cv.getContext("2d");
  function paint() {
    const name = $("#nm").value.trim() || "Your name";
    g.fillStyle = "#fffdf7"; g.fillRect(0, 0, 1400, 1000);
    g.strokeStyle = "#ff7a59"; g.lineWidth = 18; g.strokeRect(30, 30, 1340, 940);
    g.strokeStyle = "#f2a900"; g.lineWidth = 4; g.strokeRect(62, 62, 1276, 876);
    g.textAlign = "center"; g.fillStyle = "#2b2140";
    g.font = "700 72px 'Noto Sans Telugu'"; g.fillText("మన భాష", 700, 180);
    g.font = "700 44px 'Noto Sans Telugu'"; g.fillText("Certificate of Completion · తెలుగు", 700, 260);
    g.font = "400 34px 'Noto Sans Telugu'"; g.fillText("This certifies that", 700, 360);
    g.font = "700 80px 'Noto Sans Telugu'"; g.fillStyle = "#ff7a59"; g.fillText(name, 700, 470);
    g.fillStyle = "#2b2140"; g.font = "400 34px 'Noto Sans Telugu'";
    g.fillText("completed all 8 worlds of the Mana Bhasha Telugu course:", 700, 560);
    g.font = "400 28px 'Noto Sans Telugu'";
    const names = C.worlds.map(w => w.en);
    g.fillText(names.slice(0, 4).join(" · "), 700, 615);
    g.fillText(names.slice(4).join(" · "), 700, 660);
    g.font = "700 30px 'Noto Sans Telugu'"; g.fillText(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }), 700, 750);
    g.font = "400 24px 'Noto Sans Telugu'"; g.fillStyle = "#8a7f99"; g.fillText("బాగా నేర్చుకున్నావు! Well done!", 700, 860);
  }
  $("#nm").oninput = () => { S.name = $("#nm").value.trim(); save(); paint(); };
  $("#dl").onclick = () => { const a = document.createElement("a"); a.download = "mana-bhasha-certificate.png"; a.href = cv.toDataURL("image/png"); a.click(); };
  document.fonts.ready.then(paint); confetti(40);
}

function about() {
  app.innerHTML = `<h2>About Mana Bhasha</h2>
    <p>Mana Bhasha helps children and grown-ups living abroad learn their mother tongue at home. Telugu first — more Indian languages coming.</p>
    <div class="row"><button class="btn" data-who>🔁 Switch learner (child / grown-up)</button></div>
    <p class="foot">Privacy: no account, no tracking, no child data. Progress is saved only in this browser.</p>
    <p class="foot">Credits: Telugu voice made with Piper "padmavathi" (trained on AI4Bharat IndicVoices-R, CC BY 4.0). Font: Noto Sans Telugu (SIL Open Font License). Chitti and all artwork: Mana Bhasha.</p>`;
  $("[data-who]").onclick = () => { S.who = null; save(); go(""); };
}

paintChips();
route();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
})();
