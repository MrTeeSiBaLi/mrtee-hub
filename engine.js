/* MR TEE LEARNING HUB — Practice Paper Engine v1.3
   Usage in a Google Sites "Embed code" block:
     <script src="https://USERNAME.github.io/REPO/engine.js"><\/script>
     <script type="text/plain" class="mt-paper"> ...paper data... <\/script>
   See FORMAT.md for the data format. */
(function () {
  "use strict";

  /* ---------- styles ---------- */
  var CSS = "@import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600&display=swap');" +
  ".mt{font-family:'Libre Caslon Text',Georgia,serif;color:#1a1a1a;max-width:860px;margin:0 auto;padding:8px 14px 40px;font-size:17px;line-height:1.6;background:#fff}" +
  ".mt *{box-sizing:border-box}" +
  ".mt-kicker{font-family:Inter,Arial,sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#a3302a;margin:0 0 4px}" +
  ".mt h1{font-size:34px;line-height:1.15;margin:0 0 6px;font-weight:400}" +
  ".mt h2{font-family:Inter,Arial,sans-serif;font-size:13px;letter-spacing:.16em;text-transform:uppercase;border-top:3px solid #1a1a1a;border-bottom:1px solid #1a1a1a;padding:8px 0;margin:30px 0 14px}" +
  ".mt-task{border-top:1px solid #d8d3c8;padding:18px 0 8px;margin-top:10px}" +
  ".mt h3{font-size:23px;font-weight:400;margin:0 0 6px}" +
  ".mt-instr{font-style:italic;color:#444;margin:0 0 10px}" +
  ".mt-note{font-family:Inter,Arial,sans-serif;font-size:14px;background:#f6f3ec;border-left:3px solid #a3302a;padding:8px 12px;margin:8px 0}" +
  ".mt-audio{margin:8px 0;font-family:Inter,Arial,sans-serif;font-size:14px}" +
  ".mt-audio audio{width:100%;max-width:520px;display:block;margin-top:3px}" +
  ".mt-audio iframe{width:100%;max-width:520px;height:70px;border:0;display:block}" +
  ".mt-text{background:#fbfaf6;border:1px solid #e3ded2;padding:14px 18px;margin:10px 0;white-space:pre-wrap}" +
  ".mt-opts{font-family:Inter,Arial,sans-serif;font-size:15px;background:#fbfaf6;border:1px solid #e3ded2;padding:10px 14px;margin:10px 0}" +
  ".mt-opts div{margin:2px 0}" +
  ".mt-item{padding:10px 0;border-bottom:1px dotted #d8d3c8}" +
  ".mt-q{margin:0 0 6px}.mt-q b{font-family:Inter,Arial,sans-serif;margin-right:6px}" +
  ".mt-choice{display:block;font-family:Inter,Arial,sans-serif;font-size:15px;padding:5px 8px;margin:3px 0;border:1px solid #e3ded2;border-radius:4px;cursor:pointer}" +
  ".mt-choice:hover{background:#f6f3ec}.mt-choice input{margin-right:8px}" +
  ".mt select,.mt input[type=text]{font-family:Inter,Arial,sans-serif;font-size:15px;padding:6px 8px;border:1px solid #999;border-radius:4px;min-width:200px;max-width:100%}" +
  ".mt-btns{margin:14px 0 4px;display:flex;gap:10px;flex-wrap:wrap;align-items:center}" +
  ".mt-btn{font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:.05em;padding:9px 18px;border:2px solid #1a1a1a;background:#1a1a1a;color:#fff;cursor:pointer;border-radius:2px;text-decoration:none;display:inline-block}" +
  ".mt-btn.alt{background:#fff;color:#1a1a1a}.mt-btn:disabled{opacity:.4;cursor:default}" +
  ".mt-score{font-family:Inter,Arial,sans-serif;font-weight:600}" +
  ".mt-fb{font-family:Inter,Arial,sans-serif;font-size:14px;margin-top:6px;padding:8px 10px;border-radius:4px;display:none}" +
  ".mt-ok .mt-fb{display:block;background:#eaf4ea;border-left:4px solid #2e7d32}" +
  ".mt-no .mt-fb{display:block;background:#fbeaea;border-left:4px solid #b3261e}" +
  ".mt-fb .why{margin-top:4px;color:#333}" +
  ".mt-cards{margin:10px 0}" +
  ".mt-card{perspective:1000px;height:230px;max-width:520px;margin:10px 0;cursor:pointer}" +
  ".mt-card-in{position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}" +
  ".mt-card.flip .mt-card-in{transform:rotateY(180deg)}" +
  ".mt-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:2px solid #1a1a1a;box-shadow:5px 5px 0 #1a1a1a;background:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:18px;text-align:center}" +
  ".mt-face.back{transform:rotateY(180deg);background:#fbfaf6}" +
  ".mt-word{font-size:32px}.mt-mean{font-family:Inter,Arial,sans-serif;font-size:16px;margin-bottom:8px}.mt-ex{font-style:italic;font-size:16px}" +
  ".mt-count{font-family:Inter,Arial,sans-serif;font-size:13px;color:#666}" +
  ".mt details>summary{list-style:none;cursor:pointer;user-select:none}.mt details>summary::-webkit-details-marker{display:none}" +
  ".mt-sec{border-top:3px solid #1a1a1a;margin:0}" +
  ".mt-sec>summary{font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:14px 4px}" +
  ".mt-sec>summary:before,.mt-tk>summary:before{content:'\\25B8';display:inline-block;width:1.2em;transition:transform .2s}" +
  ".mt-sec[open]>summary:before,.mt-tk[open]>summary:before{transform:rotate(90deg)}" +
  ".mt-sec-body{padding:0 4px 18px}" +
  ".mt-tk{border-top:1px solid #d8d3c8}.mt-tk>summary{font-size:20px;padding:12px 4px}" +
  ".mt-tk>summary:hover,.mt-sec>summary:hover{background:#f6f3ec}" +
  ".mt-badge{font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:600;background:#1a1a1a;color:#fff;padding:2px 8px;border-radius:10px;margin-left:8px;vertical-align:middle}" +
  ".mt-task.in-tk{border-top:0;padding-top:4px;margin-top:0}" +
  ".mt-tools{display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 14px}" +
  ".mt-part{margin:0}" +
  ".mt-credit{font-family:Inter,Arial,sans-serif;font-size:12px;color:#777;margin-top:6px}";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // allow **bold** and _italic_ in text
  function fmt(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|\s)_(.+?)_(?=\s|[.,;:!?]|$)/g, "$1<i>$2</i>");
  }
  function norm(s) {
    return String(s).toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+/g, " ").replace(/^[\s"']+|[\s.,;:!?"']+$/g, "");
  }
  function toSec(t) {
    var p = t.trim().split(":").map(Number), s = 0;
    for (var i = 0; i < p.length; i++) s = s * 60 + p[i];
    return s;
  }

  /* ---------- parser ---------- */
  function parse(src) {
    var lines = src.replace(/\r/g, "").split("\n");
    var P = { title: "", kicker: "", sections: [], cards: [] }, sec = null, task = null, item = null, inText = null;
    function needSec() { if (!sec) { sec = { name: "", tasks: [] }; P.sections.push(sec); } }
    function needTask() { needSec(); if (!task) { task = { title: "", instr: [], notes: [], audio: [], texts: [], opts: [], items: [], links: [] }; sec.tasks.push(task); } }
    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i], L = raw.trim();
      if (inText !== null) {
        if (/^@endtext\b/i.test(L)) { task.texts.push(inText.join("\n").trim()); inText = null; }
        else inText.push(raw);
        continue;
      }
      if (!L || L.indexOf("//") === 0) continue;
      var m;
      if ((m = L.match(/^@(\w+)\s*(.*)$/))) {
        var k = m[1].toLowerCase(), v = m[2];
        if (k === "base") { P.base = v.trim().replace(/\/?$/, "/"); }
        else if (k === "paper") { var pp = v.split("|"); P.kicker = pp.length > 1 ? pp[0].trim() : ""; P.title = (pp[1] || pp[0]).trim(); }
        else if (k === "section") { sec = { name: v, tasks: [] }; P.sections.push(sec); task = null; item = null; }
        else if (k === "task") { needSec(); task = null; needTask(); task.title = v; item = null; }
        else if (k === "instructions") { if (!task) { needSec(); (sec.instr = sec.instr || []).push(v); } else task.instr.push(v); }
        else if (k === "note") { needTask(); task.notes.push(v); }
        else if (k === "audio") {
          needTask(); var a = v.split("|").map(function (x) { return x.trim(); });
          var au = { url: /^https?:/i.test(a[0]) ? a[0] : (P.base || "") + a[0], label: a[1] || "" };
          if (a[2]) { var r = a[2].split("-"); au.start = toSec(r[0]); if (r[1]) au.end = toSec(r[1]); }
          task.audio.push(au);
        }
        else if (k === "text") { needTask(); inText = []; if (v) inText.push(v); }
        else if (k === "option") { needTask(); var om = v.match(/^([A-Z])[.)]\s*(.*)$/); if (om) task.opts.push({ key: om[1], text: om[2] }); }
        else if (k === "link") { needTask(); var lk = v.split("|"); task.links.push({ url: lk[0].trim(), label: (lk[1] || "Open").trim() }); }
        else if (k === "cards") { P.cardsTitle = v; }
        else if (k === "card") { var c = v.split("|").map(function (x) { return x.trim(); }); P.cards.push({ word: c[0], mean: c[1] || "", ex: c[2] || "" }); }
        continue;
      }
      if ((m = L.match(/^ANS:\s*(.*)$/i)) && item) { item.ans = m[1].split("|").map(function (x) { return x.trim(); }).filter(Boolean); continue; }
      if ((m = L.match(/^WHY:\s*(.*)$/i)) && item) { item.why = (item.why ? item.why + " " : "") + m[1]; continue; }
      if ((m = L.match(/^([A-H])[.)]\s+(.*)$/)) && item) { item.opts.push({ key: m[1], text: m[2] }); continue; }
      if ((m = L.match(/^(\d+)[.)]\s+(.*)$/))) { needTask(); item = { n: m[1], q: m[2], opts: [], ans: [], why: "" }; task.items.push(item); continue; }
      if (item) item.q += " " + L; else { needTask(); task.instr.push(L); }
    }
    return P;
  }

  /* ---------- render ---------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  var uid = 0;

  function audioBlock(a) {
    var box = el("div", "mt-audio");
    if (a.label) box.appendChild(el("div", null, "<b>" + esc(a.label) + "</b>" + (a.start != null ? " <span style='color:#666'>(excerpt only)</span>" : "")));
    var drive = a.url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
    if (drive) {
      var f = el("iframe"); f.src = "https://drive.google.com/file/d/" + drive[1] + "/preview"; f.allow = "autoplay"; box.appendChild(f); return box;
    }
    var au = el("audio"); au.controls = true; au.preload = "none"; au.src = a.url;
    if (a.start != null) {
      var s = a.start, e = a.end;
      au.addEventListener("loadedmetadata", function () { if (au.currentTime < s) au.currentTime = s; });
      au.addEventListener("play", function () { if (au.currentTime < s - 0.5 || (e && au.currentTime >= e - 0.2)) au.currentTime = s; });
      if (e) au.addEventListener("timeupdate", function () { if (au.currentTime >= e) { au.pause(); au.currentTime = s; } });
    }
    box.appendChild(au);
    return box;
  }

  function renderTask(t, inTk) {
    var box = el("div", "mt-task" + (inTk ? " in-tk" : ""));
    if (t.title && !inTk) box.appendChild(el("h3", null, fmt(t.title)));
    t.instr.forEach(function (x) { box.appendChild(el("p", "mt-instr", fmt(x))); });
    t.notes.forEach(function (x) { box.appendChild(el("div", "mt-note", fmt(x))); });
    t.audio.forEach(function (a) { box.appendChild(audioBlock(a)); });
    t.texts.forEach(function (x) { box.appendChild(el("div", "mt-text", fmt(x))); });
    if (t.opts.length) {
      var o = el("div", "mt-opts");
      t.opts.forEach(function (op) { o.appendChild(el("div", null, "<b>" + op.key + ".</b> " + fmt(op.text))); });
      box.appendChild(o);
    }
    var gradable = [];
    t.items.forEach(function (it) {
      var d = el("div", "mt-item"); d.appendChild(el("p", "mt-q", "<b>" + esc(it.n) + ".</b>" + fmt(it.q)));
      var get;
      if (it.opts.length) {
        var name = "mtq" + (++uid);
        it.opts.forEach(function (op) {
          var lab = el("label", "mt-choice", "<input type='radio' name='" + name + "' value='" + op.key + "'><b>" + op.key + ".</b> " + fmt(op.text));
          d.appendChild(lab);
        });
        get = function () { var c = d.querySelector("input:checked"); return c ? c.value : ""; };
      } else if (t.opts.length) {
        var s = el("select"); s.appendChild(el("option", null, "— choose —")); s.options[0].value = "";
        t.opts.forEach(function (op) { var x = el("option", null, op.key); x.value = op.key; s.appendChild(x); });
        d.appendChild(s); get = function () { return s.value; };
      } else if (it.ans.length) {
        var inp = el("input"); inp.type = "text"; inp.placeholder = "Your answer"; inp.autocomplete = "off"; d.appendChild(inp);
        get = function () { return inp.value; };
      }
      var fb = el("div", "mt-fb"); d.appendChild(fb);
      box.appendChild(d);
      if (get && it.ans.length) gradable.push({ it: it, d: d, get: get, fb: fb });
    });
    t.links.forEach(function (lk) {
      var b = el("div", "mt-btns"); var a = el("a", "mt-btn", esc(lk.label)); a.href = lk.url; a.target = "_blank"; a.rel = "noopener"; b.appendChild(a); box.appendChild(b);
    });
    if (gradable.length) {
      var bar = el("div", "mt-btns"), chk = el("button", "mt-btn", "CHECK ANSWERS"), rst = el("button", "mt-btn alt", "TRY AGAIN"), sc = el("span", "mt-score");
      rst.style.display = "none"; bar.appendChild(chk); bar.appendChild(rst); bar.appendChild(sc); box.appendChild(bar);
      function lock(on) { box.querySelectorAll(".mt-item input,.mt-item select").forEach(function (x) { x.disabled = on; }); }
      chk.onclick = function () {
        var blank = gradable.filter(function (g) { return !String(g.get()).trim(); }).length;
        if (blank && !chk.dataset.warned) { chk.dataset.warned = "1"; sc.textContent = blank + " question(s) unanswered — click CHECK again to check anyway."; return; }
        delete chk.dataset.warned;
        var ok = 0;
        gradable.forEach(function (g) {
          var v = norm(g.get()), right = g.it.ans.some(function (a) { return norm(a) === v; });
          if (right) ok++;
          g.d.classList.add(right ? "mt-ok" : "mt-no");
          g.fb.innerHTML = (right ? "✓ Correct." : "✗ " + (v ? "Not quite." : "No answer.") + " Answer: <b>" + esc(g.it.ans[0]) + "</b>" +
            (g.it.ans.length > 1 ? " <span style='color:#555'>(also accepted: " + esc(g.it.ans.slice(1).join(", ")) + ")</span>" : "")) +
            (g.it.why ? "<div class='why'>" + fmt(g.it.why) + "</div>" : "");
        });
        sc.textContent = "Score: " + ok + " / " + gradable.length;
        if (box.onscore) box.onscore(ok, gradable.length);
        lock(true); chk.style.display = "none"; rst.style.display = "";
      };
      rst.onclick = function () {
        gradable.forEach(function (g) {
          g.d.classList.remove("mt-ok", "mt-no"); g.fb.innerHTML = "";
          g.d.querySelectorAll("input[type=radio]").forEach(function (x) { x.checked = false; });
          g.d.querySelectorAll("input[type=text]").forEach(function (x) { x.value = ""; });
          g.d.querySelectorAll("select").forEach(function (x) { x.value = ""; });
        });
        sc.textContent = ""; if (box.onscore) box.onscore(null); lock(false); chk.style.display = ""; rst.style.display = "none";
      };
    }
    return box;
  }

  function renderCards(cards) {
    var wrap = el("div", "mt-cards"), deck = cards.slice(), i = 0, learning = {}, only = false;
    var card = el("div", "mt-card"), inner = el("div", "mt-card-in"), front = el("div", "mt-face"), back = el("div", "mt-face back");
    inner.appendChild(front); inner.appendChild(back); card.appendChild(inner);
    var count = el("div", "mt-count"), bar = el("div", "mt-btns");
    function b(t, alt, fn) { var x = el("button", "mt-btn" + (alt ? " alt" : ""), t); x.onclick = fn; bar.appendChild(x); return x; }
    function list() { return only ? deck.filter(function (c) { return learning[c.word]; }) : deck; }
    function show() {
      var L = list(); card.classList.remove("flip");
      if (!L.length) { front.innerHTML = "<div class='mt-mean'>No cards marked “Still learning”.</div>"; back.innerHTML = ""; count.textContent = ""; return; }
      if (i >= L.length) i = 0; if (i < 0) i = L.length - 1;
      var c = L[i];
      front.innerHTML = "<div class='mt-word'>" + fmt(c.word) + "</div><div class='mt-count'>tap to flip</div>";
      back.innerHTML = "<div class='mt-mean'>" + fmt(c.mean) + "</div>" + (c.ex ? "<div class='mt-ex'>" + fmt(c.ex) + "</div>" : "");
      count.textContent = "Card " + (i + 1) + " / " + L.length + (learning[c.word] ? " · marked: still learning" : "");
    }
    card.onclick = function () { card.classList.toggle("flip"); };
    b("◀ PREV", true, function () { i--; show(); });
    b("NEXT ▶", false, function () { i++; show(); });
    b("SHUFFLE", true, function () { deck.sort(function () { return Math.random() - .5; }); i = 0; show(); });
    b("STILL LEARNING", true, function () { var L = list(); if (L[i]) { learning[L[i].word] = !learning[L[i].word]; show(); } });
    var f = b("REVIEW MARKED ONLY", true, function () { only = !only; f.textContent = only ? "SHOW ALL CARDS" : "REVIEW MARKED ONLY"; i = 0; show(); });
    wrap.appendChild(card); wrap.appendChild(count); wrap.appendChild(bar); show();
    return wrap;
  }

  function taskDetails(t) {
    var d = el("details", "mt-tk"), sm = el("summary", null, fmt(t.title || "Task")), badge = el("span", "mt-badge");
    badge.style.display = "none"; sm.appendChild(badge); d.appendChild(sm);
    var box = renderTask(t, true);
    box.onscore = function (ok, n) { if (ok == null) { badge.style.display = "none"; } else { badge.textContent = "✓ " + ok + "/" + n; badge.style.display = ""; } };
    d.appendChild(box); return d;
  }
  function render(node) {
    var P = parse(node.textContent), inBook = !!(node.closest && node.closest(".mt-book"));
    var root = el("div", inBook ? "mt-part" : "mt");
    if (!inBook) {
      if (P.kicker) root.appendChild(el("div", "mt-kicker", esc(P.kicker)));
      if (P.title) root.appendChild(el("h1", null, fmt(P.title)));
    }
    P.sections.forEach(function (s) {
      var sec = el("details", "mt-sec"), body = el("div", "mt-sec-body");
      sec.appendChild(el("summary", null, fmt(s.name || P.title || "Section")));
      (s.instr || []).forEach(function (x) { body.appendChild(el("div", "mt-note", fmt(x))); });
      s.tasks.forEach(function (t) { body.appendChild(t.title ? taskDetails(t) : renderTask(t)); });
      sec.appendChild(body); root.appendChild(sec);
    });
    if (P.cards.length) {
      var cs = el("details", "mt-sec"), cb = el("div", "mt-sec-body");
      cs.appendChild(el("summary", null, (P.cardsTitle ? fmt(P.cardsTitle) : "Flashcards") + " · " + P.cards.length + " cards"));
      cb.appendChild(renderCards(P.cards)); cs.appendChild(cb); root.appendChild(cs);
    }
    node.parentNode.insertBefore(root, node.nextSibling);
  }

  function setupBook(b) {
    b.setAttribute("data-done", "1"); b.classList.add("mt");
    var head = el("div");
    var t = (b.getAttribute("data-title") || "").split("|");
    if (t.length > 1) head.appendChild(el("div", "mt-kicker", esc(t[0].trim())));
    if (t[t.length - 1].trim()) head.appendChild(el("h1", null, fmt(t[t.length - 1].trim())));
    head.appendChild(el("p", "mt-instr", "Open any part you like. Finish a task, then click CHECK ANSWERS to see the answers and explanations."));
    var tools = el("div", "mt-tools");
    function btn(txt, open) { var x = el("button", "mt-btn alt", txt); x.onclick = function () { b.querySelectorAll("details").forEach(function (d) { d.open = open; }); }; tools.appendChild(x); }
    btn("EXPAND ALL", true); btn("COLLAPSE ALL", false);
    head.appendChild(tools); b.insertBefore(head, b.firstChild);
  }

  function boot() {
    document.querySelectorAll("div.mt-book:not([data-done])").forEach(setupBook);
    if (!document.getElementById("mt-style")) { var st = el("style"); st.id = "mt-style"; st.textContent = CSS; document.head.appendChild(st); }
    document.querySelectorAll("script.mt-paper:not([data-done])").forEach(function (n) { n.setAttribute("data-done", "1"); try { render(n); } catch (e) { n.insertAdjacentHTML("afterend", "<p style='color:red'>Paper data error: " + esc(e.message) + "</p>"); } });
    // Data kept as a file on GitHub: <div class="mt-paper" data-src="https://…/P001-listening.txt"></div>
    document.querySelectorAll("div.mt-paper[data-src]:not([data-done])").forEach(function (n) {
      n.setAttribute("data-done", "1");
      n.innerHTML = "<p style='font-family:Arial;color:#666'>Loading…</p>";
      fetch(n.getAttribute("data-src"), { cache: "no-cache" })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
        .then(function (txt) { n.innerHTML = ""; var h = document.createElement("script"); h.type = "text/plain"; h.textContent = txt; n.appendChild(h); render(h); })
        .catch(function (e) { n.innerHTML = "<p style='color:red;font-family:Arial'>Could not load paper data (" + esc(e.message) + "): " + esc(n.getAttribute("data-src")) + "</p>"; });
    });
  }
  // Run now and again later: some hosts (e.g. Google Sites embeds) write the page
  // without ever firing DOMContentLoaded. boot() is safe to call repeatedly.
  boot();
  document.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("load", boot);
  [300, 1000, 2500].forEach(function (t) { setTimeout(boot, t); });
})();
