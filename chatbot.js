/* chatbot.js — Aditya More Portfolio Chatbot v4 — Indigo/Purple Theme
   Usage: <script src="chatbot.js"></script> before </body>
   Self-contained. No external dependencies. No API calls.
*/
(function () {
  "use strict";

  if (document.getElementById("am-chatbot-root")) return;

  // ─── DATE HELPERS ───────────────────────────────────────────
  function monthsBetween(start, end) {
    var e = end || new Date();
    return (e.getFullYear() - start.getFullYear()) * 12 + (e.getMonth() - start.getMonth());
  }
  function fmtDur(months) {
    var y = Math.floor(months / 12), m = months % 12;
    if (y === 0) return m + "mo";
    if (m === 0) return y + "yr";
    return y + "yr " + m + "mo";
  }
  function fmtDate(d) {
    if (!d) return "Present";
    return d.toLocaleString("default", { month: "short", year: "numeric" });
  }
  function totalExp() {
    var tot = monthsBetween(new Date("2024-06-01"), new Date());
    var y = Math.floor(tot / 12), m = tot % 12;
    if (y === 0) return m + " months";
    if (m === 0) return y + " year" + (y !== 1 ? "s" : "");
    return y + " yr " + m + " mo";
  }

  // ─── DATA ───────────────────────────────────────────────────
  var roles = [
    { company: "Quinnox",            title: "Software Engineer", start: new Date("2025-12-01"), end: null,                  color: "#a78bfa", pct: 35 },
    { company: "Aviraj Innovations", title: "Software Engineer", start: new Date("2024-06-01"), end: new Date("2025-11-30"), color: "#7c3aed", pct: 65 }
  ];

  var P = {
    name:      "Aditya More",
    title:     "Software Engineer",
    location:  "Mumbai, India",
    email:     "adieeoffical@gmail.com",
    github:    "https://github.com/adityamore3",
    skills:    "C#, HTML, CSS, JavaScript, ASP.NET Core (MVC & Web API), React, Redux, Entity Framework Core, SQL Server, LINQ, Tailwind CSS, jQuery.",
    tools:     "Visual Studio, Git & GitHub, Postman, JWT, ADO.NET.",
    education: "B.E. in Computer Engineering — Datta Meghe College of Engineering, Navi Mumbai (2022).",
    certs:     ["J.P. Morgan Software Engineering Virtual Experience (Forage)", "Software Engineer Certificate (HackerRank)"],
    hobbies:   ["Gaming — story-driven & strategy games 🎮", "Football — fan and casual player ⚽", "Music — lo-fi & hip-hop while coding 🎵", "Tech blogs & new frameworks 💻", "Building side projects 🔧"],
    openTo:    "Aditya is open to full-time roles, freelance projects, and collaborations — especially in Full Stack Web Development with ASP.NET Core, React, or modern web tech.",
    projects:  [
      { title: "College Administration ERP Platform", tech: "ASP.NET Core MVC, SQL Server, JWT, Razor Pages, LINQ",  info: "Secure college ERP with JWT auth, role-based access control, Razor Pages UI, and optimised data handling via LINQ & Entity Framework Core." },
      { title: "Retail Point of Sale (POS) System",   tech: "ASP.NET Core, React, SQL Server, REST APIs",            info: "Full-stack POS app with real-time REST APIs, responsive React frontend, thermal printer support, and inventory/billing/reporting modules." }
    ]
  };

  // ─── WIDGETS ────────────────────────────────────────────────
  function heroCard() {
    return '<div class="am-hero">' +
      '<div class="am-hero-glow"></div>' +
      '<div class="am-hero-inner">' +
        '<div class="am-hero-avatar">AM</div>' +
        '<div>' +
          '<div class="am-hero-name">' + P.name + '</div>' +
          '<div class="am-hero-sub">' + P.title + ' &middot; ' + P.location + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="am-hero-tags">' +
        '<span class="am-tag hi">⚡ ' + totalExp() + ' exp</span>' +
        '<span class="am-tag">ASP.NET Core</span>' +
        '<span class="am-tag">React</span>' +
        '<span class="am-tag">SQL Server</span>' +
      '</div>' +
    '</div>';
  }

  function timelineWidget() {
    var rows = roles.map(function (r) {
      var dur = monthsBetween(r.start, r.end);
      return '<div class="am-tl-row">' +
        '<div class="am-tl-meta">' +
          '<span class="am-tl-co">' + r.company + '</span>' +
          '<span class="am-tl-dur">' + fmtDur(dur) + '</span>' +
        '</div>' +
        '<div class="am-tl-role">' + r.title + '</div>' +
        '<div class="am-bar-bg"><div class="am-bar-fill" style="width:' + r.pct + '%;background:' + r.color + '"></div></div>' +
        '<div class="am-tl-dates">' + fmtDate(r.start) + ' – ' + fmtDate(r.end) + '</div>' +
      '</div>';
    }).join("");
    return '<div class="am-timeline">' +
      '<div class="am-tl-head">Career timeline <span class="am-tl-badge">' + totalExp() + '</span></div>' +
      rows +
    '</div>';
  }

  // ─── Q&A RULES ──────────────────────────────────────────────
  var rules = [
    { p: ["hello","hi","hey","howdy","sup","good morning","good evening"],
      r: function () { return { t: "Hey there! 👋 I'm Aditya's assistant. Ask me about his skills, projects, experience, hobbies, or how to reach him!" }; } },

    { p: ["who are you","what are you","introduce","are you a bot","are you ai","your name"],
      r: function () { return { t: "I'm a chatbot built for " + P.name + "'s portfolio! Ask me anything about his background, skills, projects, or hobbies. 😊" }; } },

    { p: ["who is aditya","about aditya","tell me about","summary","bio","profile","background"],
      r: function () { return { t: "Detail-oriented Software Engineer with " + totalExp() + " of experience in Full Stack Web Development, specialising in ASP.NET Core, React, and SQL Server.\n\nCurrently at " + roles[0].company + ", based in " + P.location + ".", w: heroCard() + timelineWidget() }; } },

    { p: ["timeline","career timeline","journey","career path"],
      r: function () { return { t: "Here's Aditya's career so far — " + totalExp() + " of building on the web! 🗺️", w: timelineWidget() }; } },

    { p: ["how many years","total experience","years of experience","how long","how much experience","experience"],
      r: function () { return { t: "Aditya has " + totalExp() + " of professional experience — starting at Aviraj Innovations in June 2024 and now at Quinnox since December 2025. 💼", w: timelineWidget() }; } },

    { p: ["current job","current role","currently working","where does he work","quinnox","present job"],
      r: function () { return { t: "🚀 Software Engineer @ Quinnox (Dec 2025 – Present)\n\nBuilding enterprise full-stack apps with ASP.NET Core and React, designing scalable REST APIs, and delivering solutions for clients." }; } },

    { p: ["aviraj","previous","before quinnox","past experience","prior","work history","old job"],
      r: function () { return { t: "💼 Software Engineer @ Aviraj Innovations (Jun 2024 – Nov 2025, 1yr 6mo)\n\nFull-stack apps with ASP.NET Core & React, secure REST APIs with JWT auth, SQL Server optimisation, and responsive UIs with Tailwind CSS & jQuery." }; } },

    { p: ["work experience","career","professional experience","employment","job history","all jobs"],
      r: function () { return { t: "Aditya has " + totalExp() + " across 2 roles:\n\n🚀 Software Engineer @ Quinnox (Dec 2025 – Present)\n💼 Software Engineer @ Aviraj Innovations (Jun 2024 – Nov 2025)", w: timelineWidget() }; } },

    { p: ["skill","tech stack","technologies","what can he do","languages","frameworks","what does he know"],
      r: function () { return { t: "🛠️ Tech Skills\n\n" + P.skills + "\n\nTools: " + P.tools }; } },

    { p: ["react","redux"],
      r: function () { return { t: "Aditya works with React and Redux for dynamic frontends — used in production at both Aviraj Innovations and Quinnox. ⚛️" }; } },

    { p: ["asp.net","dotnet",".net","c#","csharp"],
      r: function () { return { t: "ASP.NET Core (MVC & Web API) with C# is Aditya's primary backend stack — used daily for secure, scalable APIs and web apps. 🔧" }; } },

    { p: ["sql","database","sql server","linq","entity framework"],
      r: function () { return { t: "Aditya uses SQL Server, Entity Framework Core, LINQ, and ADO.NET — comfortable with both ORM and raw SQL. 🗄️" }; } },

    { p: ["tailwind","css","styling","frontend","ui"],
      r: function () { return { t: "He builds responsive UIs with Tailwind CSS, jQuery, HTML, and CSS. 🎨" }; } },

    { p: ["project","what has he built","portfolio","work sample"],
      r: function () { return { t: P.projects.map(function (p) { return "🔹 " + p.title + "\nTech: " + p.tech + "\n" + p.info; }).join("\n\n") }; } },

    { p: ["erp","college erp","college administration"],
      r: function () { var p = P.projects[0]; return { t: "🔹 " + p.title + "\nTech: " + p.tech + "\n\n" + p.info }; } },

    { p: ["pos","point of sale","retail","billing"],
      r: function () { var p = P.projects[1]; return { t: "🔹 " + p.title + "\nTech: " + p.tech + "\n\n" + p.info }; } },

    { p: ["education","degree","university","studied","datta meghe","college"],
      r: function () { return { t: "🎓 " + P.education }; } },

    { p: ["certification","certificate","courses","hackerrank","forage","jpmorgan"],
      r: function () { return { t: "Aditya holds these certifications 📜\n\n• " + P.certs.join("\n• ") }; } },

    { p: ["hobbies","hobby","interests","free time","outside work","what does he like","what does he enjoy"],
      r: function () { return { t: "Outside of work, Aditya enjoys:\n\n" + P.hobbies.map(function (h) { return "• " + h; }).join("\n") }; } },

    { p: ["gaming","games","video games","gamer"],
      r: function () { return { t: "Aditya loves gaming 🎮 — especially story-driven and strategy games. His favourite way to unwind!" }; } },

    { p: ["football","soccer","sport"],
      r: function () { return { t: "Big football fan ⚽ — follows the game closely and plays casually with friends." }; } },

    { p: ["music","songs","playlist"],
      r: function () { return { t: "Lo-fi and hip-hop while coding 🎵 — keeps him in the zone!" }; } },

    { p: ["side project","personal project","experimenting"],
      r: function () { return { t: "Always building something on the side 🔧 — loves experimenting with new ideas beyond his day job." }; } },

    { p: ["email","contact","reach","get in touch","hire","connect"],
      r: function () { return { t: "Reach Aditya at 📧 " + P.email + " — open to full-time roles, freelance work, and collaborations!" }; } },

    { p: ["github","repository","repos"],
      r: function () { return { t: "Aditya's GitHub 👉 " + P.github }; } },

    { p: ["resume","cv","download"],
      r: function () { return { t: "His resume is available on request — email " + P.email + " and he'll share it directly! 📧" }; } },

    { p: ["location","based","where","city","mumbai","india"],
      r: function () { return { t: "Aditya is based in " + P.location + ". 📍" }; } },

    { p: ["available","open to work","hiring","opportunity","open for"],
      r: function () { return { t: P.openTo }; } },

    { p: ["personality","working style","how is he","what is he like","traits"],
      r: function () { return { t: "From what I know about Aditya 😊\n\n• Detail-oriented and methodical\n• Always eager to learn new tech\n• Collaborative team player\n• Self-motivated, strong work ethic\n• Writes clean, maintainable code" }; } },

    { p: ["thank","thanks","thank you","thx","ty","cheers"],
      r: function () { return { t: "You're welcome! 😊 Feel free to ask anything else." }; } },

    { p: ["bye","goodbye","see you","cya","later","that's all"],
      r: function () { return { t: "Goodbye! 👋 Come back anytime." }; } }
  ];

  var fallbacks = [
    "Not sure about that! Try asking about Aditya's skills, projects, experience, hobbies, or how to contact him. 😊",
    "Hmm, I don't have that info. Ask about his tech stack, past work, hobbies, or certifications!",
    "Try \"What are his skills?\" or \"Show me his career timeline!\" 🙂"
  ];

  function getReply(text) {
    var q = text.toLowerCase();
    for (var i = 0; i < rules.length; i++) {
      for (var j = 0; j < rules[i].p.length; j++) {
        if (q.indexOf(rules[i].p[j]) !== -1) {
          try { return rules[i].r(); } catch (e) { return { t: fallbacks[0] }; }
        }
      }
    }
    return { t: fallbacks[Math.floor(Math.random() * fallbacks.length)] };
  }

  // ─── STYLES ─────────────────────────────────────────────────
  var styleEl = document.createElement("style");
  styleEl.textContent = [
    "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');",

    /* keyframes */
    "@keyframes am-up{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}",
    "@keyframes am-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
    "@keyframes am-pulse{0%,100%{opacity:.35;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}",
    "@keyframes am-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}",
    "@keyframes am-spin{to{transform:rotate(360deg)}}",
    "@keyframes am-shimmer{0%{background-position:200% center}100%{background-position:-200% center}}",
    "@keyframes am-glow{0%,100%{opacity:.4}50%{opacity:.8}}",

    /* root */
    "#am-chatbot-root{font-family:'DM Sans',system-ui,sans-serif;position:fixed;z-index:999999;right:0;bottom:0}",

    /* toggle button */
    "#am-btn{position:fixed;right:22px;bottom:22px;width:54px;height:54px;border-radius:16px;background:linear-gradient(135deg,#6d28d9,#7c3aed,#4f46e5);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(109,40,217,.45),0 0 0 0 rgba(124,58,237,.3);transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .2s}",
    "#am-btn:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 8px 28px rgba(109,40,217,.55),0 0 0 6px rgba(124,58,237,.12)}",
    "#am-btn svg{transition:transform .3s cubic-bezier(.34,1.56,.64,1);pointer-events:none;filter:drop-shadow(0 1px 2px rgba(0,0,0,.2))}",
    "#am-btn.open svg{transform:rotate(45deg)}",

    /* panel */
    "#am-panel{position:fixed;right:22px;bottom:88px;width:420px;max-width:calc(100vw - 28px);height:620px;max-height:calc(100svh - 108px);background:#faf8ff;border-radius:22px;border:1px solid rgba(109,40,217,.15);box-shadow:0 24px 64px rgba(76,29,149,.18),0 4px 16px rgba(76,29,149,.1),inset 0 0 0 1px rgba(255,255,255,.7);display:flex;flex-direction:column;overflow:hidden;animation:am-up .3s cubic-bezier(.34,1.56,.64,1)}",
    "#am-panel.am-hidden{display:none}",

    /* header */
    "#am-hdr{padding:13px 15px;background:linear-gradient(135deg,#4c1d95 0%,#6d28d9 50%,#7c3aed 100%);display:flex;align-items:center;gap:10px;flex-shrink:0;position:relative;overflow:hidden}",
    "#am-hdr::before{content:'';position:absolute;top:-40px;right:-30px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.25) 0%,transparent 70%);pointer-events:none;animation:am-glow 3s ease-in-out infinite}",
    "#am-hdr::after{content:'';position:absolute;bottom:-20px;left:60px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 70%);pointer-events:none}",
    ".am-av{width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,rgba(255,255,255,.25),rgba(255,255,255,.1));border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;backdrop-filter:blur(4px)}",
    ".am-hn{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:13.5px;color:#fff;letter-spacing:-.02em}",
    ".am-hs{font-size:10.5px;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:5px;margin-top:2px}",
    ".am-dot{width:5px;height:5px;border-radius:50%;background:#86efac;box-shadow:0 0 6px rgba(134,239,172,.7);animation:am-pulse 2.4s ease-in-out infinite}",
    ".am-xbtn{width:27px;height:27px;border-radius:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.55);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s;position:relative;z-index:1}",
    ".am-xbtn:hover{background:rgba(255,255,255,.2);color:#fff;border-color:rgba(255,255,255,.3)}",
    ".am-exp-badge{font-size:10px;font-weight:600;color:rgba(255,255,255,.8);background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:99px;padding:3px 9px;white-space:nowrap;flex-shrink:0;position:relative;z-index:1;letter-spacing:.01em}",

    /* messages */
    "#am-msgs{flex:1 1 auto;padding:14px 13px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;scroll-behavior:smooth;background:linear-gradient(180deg,#f5f3ff 0%,#faf8ff 100%)}",
    "#am-msgs::-webkit-scrollbar{width:3px}",
    "#am-msgs::-webkit-scrollbar-thumb{background:rgba(109,40,217,.2);border-radius:99px}",
    ".am-row{display:flex;align-items:flex-end;gap:7px;animation:am-in .22s ease;margin-bottom:3px}",
    ".am-row.bot{justify-content:flex-start}",
    ".am-row.usr{justify-content:flex-end}",
    ".am-ico{width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,#6d28d9,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;box-shadow:0 2px 8px rgba(109,40,217,.3)}",
    ".am-bub{max-width:82%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.65}",
    ".am-bub.b{background:#fff;color:#2d1f52;border-bottom-left-radius:4px;border:1px solid rgba(109,40,217,.1);box-shadow:0 2px 10px rgba(109,40,217,.07);white-space:pre-wrap;cursor:pointer;transition:all .15s}",
    ".am-bub.b:hover{border-color:rgba(109,40,217,.25);box-shadow:0 3px 14px rgba(109,40,217,.12)}",
    ".am-bub.u{background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;border-bottom-right-radius:4px;font-weight:500;box-shadow:0 3px 12px rgba(109,40,217,.35)}",
    ".am-ts{font-size:10px;color:#c4b5fd;margin-top:3px;padding:0 3px}",
    ".am-row.usr .am-ts{text-align:right}",

    /* typing */
    ".am-typing{display:flex;gap:4px;padding:3px 2px;align-items:center}",
    ".am-typing i{display:block;width:6px;height:6px;border-radius:50%;background:#c4b5fd;animation:am-pulse 1.1s ease-in-out infinite}",
    ".am-typing i:nth-child(2){animation-delay:.18s}",
    ".am-typing i:nth-child(3){animation-delay:.36s}",

    /* hero widget */
    ".am-hero{background:linear-gradient(135deg,#3b0764 0%,#4c1d95 40%,#6d28d9 100%);border-radius:14px;padding:14px 16px;color:#fff;margin:4px 0 7px 31px;position:relative;overflow:hidden;box-shadow:0 4px 20px rgba(76,29,149,.3)}",
    ".am-hero-glow{position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.3) 0%,transparent 70%);pointer-events:none}",
    ".am-hero-inner{display:flex;align-items:center;gap:11px;margin-bottom:12px;position:relative;z-index:1}",
    ".am-hero-avatar{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,rgba(255,255,255,.25),rgba(255,255,255,.08));border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:12px;color:#e9d5ff;flex-shrink:0}",
    ".am-hero-name{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:15.5px;letter-spacing:-.025em;color:#fff;margin-bottom:2px}",
    ".am-hero-sub{font-size:11px;color:rgba(233,213,255,.55)}",
    ".am-hero-tags{display:flex;gap:5px;flex-wrap:wrap;position:relative;z-index:1}",
    ".am-tag{font-size:11px;padding:3px 10px;border-radius:99px;background:rgba(255,255,255,.1);color:rgba(233,213,255,.75);border:1px solid rgba(255,255,255,.1)}",
    ".am-tag.hi{background:rgba(167,139,250,.25);color:#c4b5fd;border-color:rgba(167,139,250,.3)}",

    /* timeline widget */
    ".am-timeline{background:#fff;border:1px solid rgba(109,40,217,.12);border-radius:14px;padding:13px 14px;margin:4px 0 7px 31px;box-shadow:0 2px 12px rgba(109,40,217,.06)}",
    ".am-tl-head{font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;font-weight:700;color:#9f7aea;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center}",
    ".am-tl-badge{font-size:10.5px;font-weight:600;background:#f3e8ff;color:#7c3aed;padding:3px 9px;border-radius:99px;text-transform:none;letter-spacing:0;border:1px solid rgba(124,58,237,.15)}",
    ".am-tl-row{margin-bottom:11px}",
    ".am-tl-row:last-child{margin-bottom:0}",
    ".am-tl-meta{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px}",
    ".am-tl-co{font-family:'Plus Jakarta Sans',sans-serif;font-size:12.5px;font-weight:700;color:#2d1f52}",
    ".am-tl-dur{font-size:11px;color:#a78bfa;font-weight:500}",
    ".am-tl-role{font-size:11.5px;color:#7c6fa0;margin-bottom:6px}",
    ".am-bar-bg{height:5px;background:#ede9fe;border-radius:99px;overflow:hidden}",
    ".am-bar-fill{height:100%;border-radius:99px;transition:width .9s cubic-bezier(.34,1.56,.64,1)}",
    ".am-tl-dates{font-size:10px;color:#c4b5fd;margin-top:4px}",

    /* chips */
    "#am-chips{padding:8px 10px 11px;display:flex;gap:5px;flex-wrap:wrap;border-top:1px solid rgba(109,40,217,.08);flex-shrink:0;background:#faf8ff}",
    ".am-chip{background:#fff;border:1px solid rgba(109,40,217,.18);border-radius:99px;padding:5px 12px;font-size:11.5px;font-weight:500;color:#6d28d9;cursor:pointer;transition:all .16s;font-family:inherit;animation:am-fade .35s ease forwards;opacity:0}",
    ".am-chip:hover{background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#fff;border-color:transparent;transform:translateY(-1px);box-shadow:0 4px 12px rgba(109,40,217,.3)}",

    /* input bar */
    "#am-bar{padding:10px 11px;display:flex;gap:8px;align-items:center;border-top:1px solid rgba(109,40,217,.08);background:#fff;flex-shrink:0}",
    "#am-inp{flex:1;padding:9px 13px;border-radius:12px;border:1.5px solid rgba(109,40,217,.15);font-size:13.5px;font-family:inherit;color:#2d1f52;background:#faf8ff;outline:none;transition:border-color .15s,box-shadow .15s;caret-color:#7c3aed}",
    "#am-inp::placeholder{color:#c4b5fd}",
    "#am-inp:focus{border-color:rgba(124,58,237,.45);box-shadow:0 0 0 3px rgba(124,58,237,.1);background:#fff}",
    "#am-snd{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#6d28d9,#7c3aed);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .18s;box-shadow:0 3px 10px rgba(109,40,217,.35)}",
    "#am-snd:hover{transform:scale(1.08) translateY(-1px);box-shadow:0 5px 16px rgba(109,40,217,.45)}",
    "#am-snd:active{transform:scale(.94)}",
    ".am-spin{animation:am-spin .7s linear infinite}",

    /* scrollbar for webkit */
    "#am-msgs{scrollbar-width:thin;scrollbar-color:rgba(109,40,217,.2) transparent}",

    /* mobile */
    "@media(max-width:480px){#am-panel{right:10px;left:10px;bottom:76px;width:auto;height:570px;border-radius:20px}#am-btn{right:14px;bottom:14px}}"
  ].join("");

  // ─── SVG ICONS ──────────────────────────────────────────────
  var IC = {
    chat:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    plus:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    send:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    close: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    spin:  '<svg class="am-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2.5" stroke-linecap="round"><path d="M12 3a9 9 0 0 1 9 9"/></svg>'
  };

  // ─── BUILD DOM ──────────────────────────────────────────────
  var root = document.createElement("div");
  root.id = "am-chatbot-root";
  root.innerHTML =
    '<button id="am-btn" aria-label="Open chat">' + IC.chat + '</button>' +
    '<div id="am-panel" class="am-hidden">' +
      '<div id="am-hdr">' +
        '<div class="am-av">🤖</div>' +
        '<div style="flex:1;min-width:0;position:relative;z-index:1">' +
          '<div class="am-hn">Aditya\'s Assistant</div>' +
          '<div class="am-hs"><span class="am-dot"></span>Online — ask me anything!</div>' +
        '</div>' +
        '<span class="am-exp-badge">' + totalExp() + '</span>' +
        '<button class="am-xbtn" aria-label="Close">' + IC.close + '</button>' +
      '</div>' +
      '<div id="am-msgs" role="log" aria-live="polite"></div>' +
      '<div id="am-chips"></div>' +
      '<div id="am-bar">' +
        '<input id="am-inp" type="text" placeholder="Ask about Aditya…" autocomplete="off" />' +
        '<button id="am-snd" aria-label="Send">' + IC.send + '</button>' +
      '</div>' +
    '</div>';

  document.head.appendChild(styleEl);
  document.body.appendChild(root);

  // ─── REFS ───────────────────────────────────────────────────
  var panel = document.getElementById("am-panel");
  var btn   = document.getElementById("am-btn");
  var msgs  = document.getElementById("am-msgs");
  var chips = document.getElementById("am-chips");
  var inp   = document.getElementById("am-inp");
  var snd   = document.getElementById("am-snd");
  var xbtn  = document.querySelector(".am-xbtn");

  // ─── UTILS ──────────────────────────────────────────────────
  function ts() {
    return new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
  }
  function esc(s) {
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  // ─── MESSAGE RENDERERS ──────────────────────────────────────
  function addBot(text, widget) {
    var row = document.createElement("div");
    row.className = "am-row bot";
    row.innerHTML =
      '<div class="am-ico">🤖</div>' +
      '<div style="min-width:0">' +
        '<div class="am-bub b">' + esc(text) + '</div>' +
        (widget || "") +
        '<div class="am-ts">' + ts() + '</div>' +
      '</div>';
    var bub = row.querySelector(".am-bub.b");
    bub.addEventListener("click", function () {
      navigator.clipboard.writeText(text).catch(function () {});
      bub.style.opacity = ".5";
      setTimeout(function () { bub.style.opacity = ""; }, 160);
    });
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addUser(text) {
    var row = document.createElement("div");
    row.className = "am-row usr";
    row.innerHTML =
      '<div>' +
        '<div class="am-bub u">' + esc(text) + '</div>' +
        '<div class="am-ts">' + ts() + '</div>' +
      '</div>';
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  var trow = null;
  function showTyping() {
    trow = document.createElement("div");
    trow.className = "am-row bot";
    trow.innerHTML =
      '<div class="am-ico">🤖</div>' +
      '<div class="am-bub b"><div class="am-typing"><i></i><i></i><i></i></div></div>';
    msgs.appendChild(trow);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function hideTyping() { if (trow) { trow.remove(); trow = null; } }

  // ─── SUGGESTION CHIPS ───────────────────────────────────────
  var chipList = [
    { l: "Career timeline 📊", q: "timeline"    },
    { l: "Tech skills",        q: "skills"      },
    { l: "Projects",           q: "projects"    },
    { l: "Current role",       q: "current job" },
    { l: "Hobbies",            q: "hobbies"     },
    { l: "Contact",            q: "contact"     }
  ];

  chipList.forEach(function (c, i) {
    var b = document.createElement("button");
    b.className = "am-chip";
    b.textContent = c.l;
    b.style.animationDelay = (i * 55) + "ms";
    b.addEventListener("click", function () { send(c.q); });
    chips.appendChild(b);
  });

  // ─── SEND LOGIC ─────────────────────────────────────────────
  var busy = false;

  function send(override) {
    var q = (typeof override === "string" ? override : inp.value).trim();
    if (!q || busy) return;
    inp.value = "";
    busy = true;
    snd.innerHTML = IC.spin;
    snd.style.pointerEvents = "none";
    addUser(q);
    showTyping();
    var res = getReply(q);
    setTimeout(function () {
      hideTyping();
      addBot(res.t, res.w || null);
      busy = false;
      snd.innerHTML = IC.send;
      snd.style.pointerEvents = "";
      inp.focus();
    }, 380 + Math.floor(Math.random() * 200));
  }

  // ─── OPEN / CLOSE ───────────────────────────────────────────
  function openChat() {
    panel.classList.remove("am-hidden");
    btn.classList.add("open");
    btn.innerHTML = IC.plus;
    inp.focus();
  }
  function closeChat() {
    panel.classList.add("am-hidden");
    btn.classList.remove("open");
    btn.innerHTML = IC.chat;
  }

  // ─── EVENTS ─────────────────────────────────────────────────
  snd.addEventListener("click",   function () { send(); });
  inp.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
  btn.addEventListener("click",   function () { panel.classList.contains("am-hidden") ? openChat() : closeChat(); });
  xbtn.addEventListener("click",  closeChat);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.classList.contains("am-hidden")) closeChat();
  });

  // ─── GREETING ───────────────────────────────────────────────
  setTimeout(function () {
    addBot("Hey there! 👋 I'm Aditya's assistant. Ask me about his skills, career, projects, or how to reach him!");
  }, 260);

  // ─── PUBLIC API ─────────────────────────────────────────────
  window.AdityaChatbot = { open: openChat, close: closeChat };

})();
