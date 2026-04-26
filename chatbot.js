/* chatbot.js — Aditya More Portfolio Chatbot v3
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
    { company: "Quinnox",            title: "Software Engineer", start: new Date("2025-12-01"), end: null,                  color: "#6366f1", pct: 35 },
    { company: "Aviraj Innovations", title: "Software Engineer", start: new Date("2024-06-01"), end: new Date("2025-11-30"), color: "#8b5cf6", pct: 65 }
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
      '<div class="am-hero-name">' + P.name + '</div>' +
      '<div class="am-hero-sub">' + P.title + ' &middot; ' + P.location + '</div>' +
      '<div class="am-hero-tags">' +
        '<span class="am-tag hi">&#9889; ' + totalExp() + ' exp</span>' +
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

  // ─── Q&A ────────────────────────────────────────────────────
  var rules = [
    { p: ["hello","hi","hey","howdy","sup","good morning","good evening"],
      r: function () { return { t: "Hey there! \uD83D\uDC4B I'm Aditya's assistant. Ask me about his skills, projects, experience, hobbies, or how to reach him!" }; } },

    { p: ["who are you","what are you","introduce","are you a bot","are you ai","your name"],
      r: function () { return { t: "I'm a chatbot built for " + P.name + "'s portfolio! Ask me anything about his background, skills, projects, or hobbies. \uD83D\uDE0A" }; } },

    { p: ["who is aditya","about aditya","tell me about","summary","bio","profile","background"],
      r: function () { return { t: "Detail-oriented Software Engineer with " + totalExp() + " of experience in Full Stack Web Development, specialising in ASP.NET Core, React, and SQL Server.\n\nCurrently at " + roles[0].company + ", based in " + P.location + ".", w: heroCard() + timelineWidget() }; } },

    { p: ["timeline","career timeline","journey","career path"],
      r: function () { return { t: "Here\u2019s Aditya\u2019s career so far \u2014 " + totalExp() + " of building on the web! \uD83D\uDDFA\uFE0F", w: timelineWidget() }; } },

    { p: ["how many years","total experience","years of experience","how long","how much experience","experience"],
      r: function () { return { t: "Aditya has " + totalExp() + " of professional experience \u2014 starting at Aviraj Innovations in June 2024 and now at Quinnox since December 2025. \uD83D\uDCBC", w: timelineWidget() }; } },

    { p: ["current job","current role","currently working","where does he work","quinnox","present job"],
      r: function () { return { t: "\uD83D\uDE80 Software Engineer @ Quinnox (Dec 2025 \u2013 Present)\n\nBuilding enterprise full-stack apps with ASP.NET Core and React, designing scalable REST APIs, and delivering solutions for clients." }; } },

    { p: ["aviraj","previous","before quinnox","past experience","prior","work history","old job"],
      r: function () { return { t: "\uD83D\uDCBC Software Engineer @ Aviraj Innovations (Jun 2024 \u2013 Nov 2025, 1yr 6mo)\n\nFull-stack apps with ASP.NET Core & React, secure REST APIs with JWT auth, SQL Server optimisation, and responsive UIs with Tailwind CSS & jQuery." }; } },

    { p: ["work experience","career","professional experience","employment","job history","all jobs"],
      r: function () { return { t: "Aditya has " + totalExp() + " across 2 roles:\n\n\uD83D\uDE80 Software Engineer @ Quinnox (Dec 2025 \u2013 Present)\n\uD83D\uDCBC Software Engineer @ Aviraj Innovations (Jun 2024 \u2013 Nov 2025)", w: timelineWidget() }; } },

    { p: ["skill","tech stack","technologies","what can he do","languages","frameworks","what does he know"],
      r: function () { return { t: "\uD83D\uDEE0\uFE0F Tech Skills\n\n" + P.skills + "\n\nTools: " + P.tools }; } },

    { p: ["react","redux"],
      r: function () { return { t: "Aditya works with React and Redux for dynamic frontends \u2014 used in production at both Aviraj Innovations and Quinnox. \u269B\uFE0F" }; } },

    { p: ["asp.net","dotnet",".net","c#","csharp"],
      r: function () { return { t: "ASP.NET Core (MVC & Web API) with C# is Aditya\u2019s primary backend stack \u2014 used daily for secure, scalable APIs and web apps. \uD83D\uDD27" }; } },

    { p: ["sql","database","sql server","linq","entity framework"],
      r: function () { return { t: "Aditya uses SQL Server, Entity Framework Core, LINQ, and ADO.NET \u2014 comfortable with both ORM and raw SQL. \uD83D\uDDC4\uFE0F" }; } },

    { p: ["tailwind","css","styling","frontend","ui"],
      r: function () { return { t: "He builds responsive UIs with Tailwind CSS, jQuery, HTML, and CSS. \uD83C\uDFA8" }; } },

    { p: ["project","what has he built","portfolio","work sample"],
      r: function () { return { t: P.projects.map(function (p) { return "\uD83D\uDD39 " + p.title + "\nTech: " + p.tech + "\n" + p.info; }).join("\n\n") }; } },

    { p: ["erp","college erp","college administration"],
      r: function () { var p = P.projects[0]; return { t: "\uD83D\uDD39 " + p.title + "\nTech: " + p.tech + "\n\n" + p.info }; } },

    { p: ["pos","point of sale","retail","billing"],
      r: function () { var p = P.projects[1]; return { t: "\uD83D\uDD39 " + p.title + "\nTech: " + p.tech + "\n\n" + p.info }; } },

    { p: ["education","degree","university","studied","datta meghe","college"],
      r: function () { return { t: "\uD83C\uDF93 " + P.education }; } },

    { p: ["certification","certificate","courses","hackerrank","forage","jpmorgan"],
      r: function () { return { t: "Aditya holds these certifications \uD83D\uDCDC\n\n\u2022 " + P.certs.join("\n\u2022 ") }; } },

    { p: ["hobbies","hobby","interests","free time","outside work","what does he like","what does he enjoy"],
      r: function () { return { t: "Outside of work, Aditya enjoys:\n\n" + P.hobbies.map(function (h) { return "\u2022 " + h; }).join("\n") }; } },

    { p: ["gaming","games","video games","gamer"],
      r: function () { return { t: "Aditya loves gaming \uD83C\uDFAE \u2014 especially story-driven and strategy games. His favourite way to unwind!" }; } },

    { p: ["football","soccer","sport"],
      r: function () { return { t: "Big football fan \u26BD \u2014 follows the game closely and plays casually with friends." }; } },

    { p: ["music","songs","playlist"],
      r: function () { return { t: "Lo-fi and hip-hop while coding \uD83C\uDFB5 \u2014 keeps him in the zone!" }; } },

    { p: ["side project","personal project","experimenting"],
      r: function () { return { t: "Always building something on the side \uD83D\uDD27 \u2014 loves experimenting with new ideas beyond his day job." }; } },

    { p: ["email","contact","reach","get in touch","hire","connect"],
      r: function () { return { t: "Reach Aditya at \uD83D\uDCE7 " + P.email + " \u2014 open to full-time roles, freelance work, and collaborations!" }; } },

    { p: ["github","repository","repos"],
      r: function () { return { t: "Aditya\u2019s GitHub \uD83D\uDC49 " + P.github }; } },

    { p: ["resume","cv","download"],
      r: function () { return { t: "His resume is available on request \u2014 email " + P.email + " and he'll share it directly! \uD83D\uDCE7" }; } },

    { p: ["location","based","where","city","mumbai","india"],
      r: function () { return { t: "Aditya is based in " + P.location + ". \uD83D\uDCCD" }; } },

    { p: ["available","open to work","hiring","opportunity","open for"],
      r: function () { return { t: P.openTo }; } },

    { p: ["personality","working style","how is he","what is he like","traits"],
      r: function () { return { t: "From what I know about Aditya \uD83D\uDE0A\n\n\u2022 Detail-oriented and methodical\n\u2022 Always eager to learn new tech\n\u2022 Collaborative team player\n\u2022 Self-motivated, strong work ethic\n\u2022 Writes clean, maintainable code" }; } },

    { p: ["thank","thanks","thank you","thx","ty","cheers"],
      r: function () { return { t: "You\u2019re welcome! \uD83D\uDE0A Feel free to ask anything else." }; } },

    { p: ["bye","goodbye","see you","cya","later","that's all"],
      r: function () { return { t: "Goodbye! \uD83D\uDC4B Come back anytime." }; } }
  ];

  var fallbacks = [
    "Not sure about that! Try asking about Aditya\u2019s skills, projects, experience, hobbies, or how to contact him. \uD83D\uDE0A",
    "Hmm, I don\u2019t have that info. Ask about his tech stack, past work, hobbies, or certifications!",
    "Try \u201CWhat are his skills?\u201D or \u201CShow me his career timeline!\u201D \uD83D\uDE42"
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
    "@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700&family=Instrument+Sans:wght@400;500&display=swap');",
    "@keyframes am-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}",
    "@keyframes am-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}",
    "@keyframes am-pulse{0%,100%{opacity:.3;transform:scale(.75)}50%{opacity:1;transform:scale(1)}}",
    "@keyframes am-fade{from{opacity:0}to{opacity:1}}",
    "@keyframes am-spin{to{transform:rotate(360deg)}}",
    "#am-chatbot-root{font-family:'Instrument Sans',system-ui,sans-serif;position:fixed;z-index:999999;right:0;bottom:0}",

    /* toggle */
    "#am-btn{position:fixed;right:22px;bottom:22px;width:52px;height:52px;border-radius:15px;background:#111;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(0,0,0,.25);transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .18s}",
    "#am-btn:hover{transform:translateY(-3px);box-shadow:0 8px 26px rgba(0,0,0,.3)}",
    "#am-btn svg{transition:transform .28s cubic-bezier(.34,1.56,.64,1);pointer-events:none}",
    "#am-btn.open svg{transform:rotate(45deg)}",

    /* panel */
    "#am-panel{position:fixed;right:22px;bottom:86px;width:418px;max-width:calc(100vw - 28px);height:610px;max-height:calc(100svh - 104px);background:#F9F9F7;border-radius:20px;border:1px solid rgba(0,0,0,.08);box-shadow:0 20px 56px rgba(0,0,0,.14),0 4px 12px rgba(0,0,0,.06);display:flex;flex-direction:column;overflow:hidden;animation:am-up .28s cubic-bezier(.34,1.56,.64,1)}",
    "#am-panel.am-hidden{display:none}",

    /* header */
    "#am-hdr{padding:12px 14px;background:#111;display:flex;align-items:center;gap:9px;flex-shrink:0}",
    ".am-av{width:33px;height:33px;border-radius:9px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}",
    ".am-hn{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:13px;color:#F4F4F0;letter-spacing:-.01em}",
    ".am-hs{font-size:10.5px;color:rgba(255,255,255,.36);display:flex;align-items:center;gap:5px;margin-top:2px}",
    ".am-dot{width:5px;height:5px;border-radius:50%;background:#4ade80;animation:am-pulse 2.4s ease-in-out infinite}",
    ".am-xbtn{width:26px;height:26px;border-radius:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .14s}",
    ".am-xbtn:hover{background:rgba(255,255,255,.13);color:#fff}",
    ".am-exp-badge{font-size:10px;font-weight:600;color:rgba(255,255,255,.55);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:2px 8px;white-space:nowrap;flex-shrink:0}",

    /* messages */
    "#am-msgs{flex:1 1 auto;padding:13px 12px;overflow-y:auto;display:flex;flex-direction:column;gap:3px;scroll-behavior:smooth}",
    "#am-msgs::-webkit-scrollbar{width:3px}",
    "#am-msgs::-webkit-scrollbar-thumb{background:#DEDAD4;border-radius:99px}",
    ".am-row{display:flex;align-items:flex-end;gap:6px;animation:am-in .2s ease;margin-bottom:2px}",
    ".am-row.bot{justify-content:flex-start}",
    ".am-row.usr{justify-content:flex-end}",
    ".am-ico{width:23px;height:23px;border-radius:7px;background:#111;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0}",
    ".am-bub{max-width:80%;padding:9px 12px;border-radius:14px;font-size:13.5px;line-height:1.62}",
    ".am-bub.b{background:#fff;color:#1A1A18;border-bottom-left-radius:3px;border:1px solid rgba(0,0,0,.07);box-shadow:0 1px 3px rgba(0,0,0,.04);white-space:pre-wrap;cursor:pointer;transition:opacity .14s}",
    ".am-bub.b:hover{opacity:.8}",
    ".am-bub.u{background:#111;color:#F4F4F0;border-bottom-right-radius:3px;font-weight:500}",
    ".am-ts{font-size:10px;color:#BDBDB4;margin-top:2px;padding:0 3px}",

    /* typing */
    ".am-typing{display:flex;gap:4px;padding:3px 1px;align-items:center}",
    ".am-typing i{display:block;width:6px;height:6px;border-radius:50%;background:#C5C5BC;animation:am-pulse 1.1s ease-in-out infinite}",
    ".am-typing i:nth-child(2){animation-delay:.18s}",
    ".am-typing i:nth-child(3){animation-delay:.36s}",

    /* hero */
    ".am-hero{background:#111;border-radius:12px;padding:12px 14px;color:#F4F4F0;margin:3px 0 6px 29px;position:relative;overflow:hidden}",
    ".am-hero::before{content:'';position:absolute;top:-24px;right:-24px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.28) 0%,transparent 70%);pointer-events:none}",
    ".am-hero-name{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:15px;letter-spacing:-.02em;margin-bottom:2px}",
    ".am-hero-sub{font-size:11px;color:rgba(255,255,255,.42);margin-bottom:9px}",
    ".am-hero-tags{display:flex;gap:5px;flex-wrap:wrap}",
    ".am-tag{font-size:11px;padding:3px 9px;border-radius:99px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.62)}",
    ".am-tag.hi{background:rgba(99,102,241,.22);color:#a5b4fc}",

    /* timeline */
    ".am-timeline{background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:12px;padding:12px 13px;margin:3px 0 6px 29px;box-shadow:0 1px 3px rgba(0,0,0,.04)}",
    ".am-tl-head{font-family:'Bricolage Grotesque',sans-serif;font-size:10px;font-weight:600;color:#9C9C94;letter-spacing:.07em;text-transform:uppercase;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}",
    ".am-tl-badge{font-size:10.5px;font-weight:600;background:#f0fdf4;color:#16a34a;padding:2px 8px;border-radius:99px;text-transform:none;letter-spacing:0}",
    ".am-tl-row{margin-bottom:10px}",
    ".am-tl-row:last-child{margin-bottom:0}",
    ".am-tl-meta{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px}",
    ".am-tl-co{font-family:'Bricolage Grotesque',sans-serif;font-size:12.5px;font-weight:600;color:#1A1A18}",
    ".am-tl-dur{font-size:11px;color:#9C9C94}",
    ".am-tl-role{font-size:11px;color:#6C6C68;margin-bottom:5px}",
    ".am-bar-bg{height:4px;background:#EDEDEA;border-radius:99px;overflow:hidden}",
    ".am-bar-fill{height:100%;border-radius:99px;transition:width .8s cubic-bezier(.34,1.56,.64,1)}",
    ".am-tl-dates{font-size:10px;color:#B5B5AC;margin-top:3px}",

    /* chips */
    "#am-chips{padding:8px 10px 10px;display:flex;gap:5px;flex-wrap:wrap;border-top:1px solid rgba(0,0,0,.05);flex-shrink:0}",
    ".am-chip{background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:99px;padding:5px 11px;font-size:11.5px;font-weight:500;color:#4A4A44;cursor:pointer;transition:all .14s;font-family:inherit;animation:am-fade .35s ease forwards;opacity:0}",
    ".am-chip:hover{background:#111;color:#F4F4F0;border-color:#111;transform:translateY(-1px)}",

    /* input */
    "#am-bar{padding:9px 10px;display:flex;gap:7px;align-items:center;border-top:1px solid rgba(0,0,0,.06);background:#fff;flex-shrink:0}",
    "#am-inp{flex:1;padding:9px 12px;border-radius:11px;border:1px solid rgba(0,0,0,.1);font-size:13.5px;font-family:inherit;color:#1A1A18;background:#F9F9F7;outline:none;transition:border-color .14s,box-shadow .14s;caret-color:#6366f1}",
    "#am-inp::placeholder{color:#B5B5AC}",
    "#am-inp:focus{border-color:rgba(99,102,241,.4);box-shadow:0 0 0 3px rgba(99,102,241,.08);background:#fff}",
    "#am-snd{width:36px;height:36px;border-radius:10px;background:#111;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s cubic-bezier(.34,1.56,.64,1)}",
    "#am-snd:hover{transform:scale(1.08);background:#2a2a2a}",
    "#am-snd:active{transform:scale(.94)}",
    ".am-spin{animation:am-spin .7s linear infinite}",

    "@media(max-width:480px){#am-panel{right:10px;left:10px;bottom:74px;width:auto;height:560px;border-radius:18px}#am-btn{right:14px;bottom:14px}}"
  ].join("");

  // ─── SVG ICONS ──────────────────────────────────────────────
  var IC = {
    chat:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    plus:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    send:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    close: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    spin:  '<svg class="am-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2.5" stroke-linecap="round"><path d="M12 3a9 9 0 0 1 9 9"/></svg>'
  };

  // ─── BUILD DOM ──────────────────────────────────────────────
  var root = document.createElement("div");
  root.id = "am-chatbot-root";
  root.innerHTML =
    '<button id="am-btn" aria-label="Open chat">' + IC.chat + '</button>' +
    '<div id="am-panel" class="am-hidden">' +
      '<div id="am-hdr">' +
        '<div class="am-av">\uD83E\uDD16</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div class="am-hn">Aditya\u2019s Assistant</div>' +
          '<div class="am-hs"><span class="am-dot"></span>Online \u2014 ask me anything!</div>' +
        '</div>' +
        '<span class="am-exp-badge">' + totalExp() + '</span>' +
        '<button class="am-xbtn" aria-label="Close">' + IC.close + '</button>' +
      '</div>' +
      '<div id="am-msgs" role="log" aria-live="polite"></div>' +
      '<div id="am-chips"></div>' +
      '<div id="am-bar">' +
        '<input id="am-inp" type="text" placeholder="Ask about Aditya\u2026" autocomplete="off" />' +
        '<button id="am-snd" aria-label="Send">' + IC.send + '</button>' +
      '</div>' +
    '</div>';

  document.head.appendChild(styleEl);
  document.body.appendChild(root);

  // ─── REFS ───────────────────────────────────────────────────
  var panel  = document.getElementById("am-panel");
  var btn    = document.getElementById("am-btn");
  var msgs   = document.getElementById("am-msgs");
  var chips  = document.getElementById("am-chips");
  var inp    = document.getElementById("am-inp");
  var snd    = document.getElementById("am-snd");
  var xbtn   = document.querySelector(".am-xbtn");

  // ─── UTILS ──────────────────────────────────────────────────
  function ts() { return new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }); }
  function esc(s) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  // ─── MESSAGE RENDERERS ──────────────────────────────────────
  function addBot(text, widget) {
    var row = document.createElement("div");
    row.className = "am-row bot";
    row.innerHTML =
      '<div class="am-ico">\uD83E\uDD16</div>' +
      '<div>' +
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
    row.innerHTML = '<div class="am-bub u">' + esc(text) + '</div><div class="am-ts">' + ts() + '</div>';
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  var trow = null;
  function showTyping() {
    trow = document.createElement("div");
    trow.className = "am-row bot";
    trow.innerHTML = '<div class="am-ico">\uD83E\uDD16</div><div class="am-bub b"><div class="am-typing"><i></i><i></i><i></i></div></div>';
    msgs.appendChild(trow);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function hideTyping() { if (trow) { trow.remove(); trow = null; } }

  // ─── CHIPS ──────────────────────────────────────────────────
  var chipList = [
    { l: "Career timeline \uD83D\uDCCA", q: "timeline"    },
    { l: "Tech skills",                  q: "skills"      },
    { l: "Projects",                     q: "projects"    },
    { l: "Current role",                 q: "current job" },
    { l: "Hobbies",                      q: "hobbies"     },
    { l: "Contact",                      q: "contact"     }
  ];
  chipList.forEach(function (c, i) {
    var b = document.createElement("button");
    b.className = "am-chip";
    b.textContent = c.l;
    b.style.animationDelay = (i * 50) + "ms";
    b.addEventListener("click", function () { send(c.q); });
    chips.appendChild(b);
  });

  // ─── SEND ───────────────────────────────────────────────────
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
  snd.addEventListener("click",  function () { send(); });
  inp.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
  btn.addEventListener("click",   function () { panel.classList.contains("am-hidden") ? openChat() : closeChat(); });
  xbtn.addEventListener("click",  closeChat);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.classList.contains("am-hidden")) closeChat();
  });

  // ─── GREETING ───────────────────────────────────────────────
  setTimeout(function () {
    addBot(
      "Hey there! \uD83D\uDC4B I\u2019m Aditya\u2019s assistant. Ask me about his skills, career, projects, or how to reach him!"
    );
  }, 260);

  // ─── PUBLIC API ─────────────────────────────────────────────
  window.AdityaChatbot = { open: openChat, close: closeChat };

})();
