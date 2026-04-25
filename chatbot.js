/* chatbot.js — Aditya More's Portfolio Chatbot (v2)
   Drop this file and include <script src="chatbot.js"></script> before </body>.
*/
(function () {

  // ============================================================
  // CAREER TIMELINE
  // ============================================================
  const timeline = [
    {
      company:   "Quinnox",
      title:     "Software Engineer",
      startDate: new Date("2025-12-01"),
      endDate:   null, // Present
      color:     "#06b6d4",
      icon:      "🚀",
      tech:      "ASP.NET Core, React, SQL Server",
      description:
        "Currently working at Quinnox as a Software Engineer (December 2025 – Present). " +
        "Contributing to enterprise-level full-stack web applications using ASP.NET Core and React, " +
        "designing scalable REST APIs, and delivering high-quality software solutions for clients."
    },
    {
      company:   "Aviraj Innovations Pvt Ltd",
      title:     "Software Engineer",
      startDate: new Date("2024-06-01"),
      endDate:   new Date("2025-11-30"),
      color:     "#7c3aed",
      icon:      "💼",
      tech:      "ASP.NET Core, React, SQL Server, JWT, Tailwind CSS",
      description:
        "Worked at Aviraj Innovations as a Software Engineer from June 2024 to November 2025 (1 year 6 months). " +
        "Built full-stack web applications with ASP.NET Core and React, designed secure REST APIs with JWT authentication, " +
        "optimised SQL Server databases, and developed responsive UIs using Tailwind CSS and jQuery."
    }
  ];

  // ============================================================
  // EXPERIENCE CALCULATOR
  // ============================================================
  function monthsBetween(start, end) {
    const e = end || new Date();
    return (e.getFullYear() - start.getFullYear()) * 12 + (e.getMonth() - start.getMonth());
  }

  function formatDuration(months) {
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (y === 0) return `${m} mo`;
    if (m === 0) return `${y} yr${y !== 1 ? "s" : ""}`;
    return `${y} yr${y !== 1 ? "s" : ""} ${m} mo`;
  }

  function formatDateLabel(date) {
    if (!date) return "Present";
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  }

  function totalExperience() {
    const totalMonths = monthsBetween(new Date("2024-06-01"), new Date());
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    if (y === 0) return `${m} month${m !== 1 ? "s" : ""}`;
    if (m === 0) return `${y} year${y !== 1 ? "s" : ""}`;
    return `${y} year${y !== 1 ? "s" : ""} and ${m} month${m !== 1 ? "s" : ""}`;
  }

  // ============================================================
  // PROFILE
  // ============================================================
  const profile = {
    name:     "Aditya More",
    title:    "Software Engineer",
    location: "Mumbai, India",
    email:    "adieeoffical@gmail.com",
    github:   "https://github.com/adityamore3",
    resume:   "#",

    get experience() { return totalExperience(); },

    summary:
      "Detail-oriented Software Engineer with " + totalExperience() + " of experience in Full Stack Web Development, " +
      "specialising in ASP.NET Core, React, and SQL Server. Adept at designing secure APIs, developing " +
      "responsive UIs, and optimising databases for performance.",

    currentRole: timeline[0],
    previousRoles: timeline.slice(1),

    skills: "C#, HTML, CSS, JavaScript, ASP.NET Core, ASP.NET Core MVC, ASP.NET Core Web API, React, Redux, Entity Framework Core, SQL Server, LINQ, Tailwind CSS, jQuery.",
    tools:  "Visual Studio, Git & GitHub, Postman, JWT, ADO.NET.",

    projects: [
      {
        title:   "College Administration ERP Platform",
        tech:    "ASP.NET Core MVC, SQL Server, JWT, Razor Pages, LINQ",
        details:
          "Built a secure college ERP system featuring JWT authentication, role-based access control, " +
          "Razor Pages UI, and optimised data handling with LINQ and Entity Framework Core."
      },
      {
        title:   "Retail Point of Sale (POS) System",
        tech:    "ASP.NET Core, React, SQL Server, REST APIs",
        details:
          "Developed a full-stack POS application with real-time REST APIs, a responsive React frontend, " +
          "integrated thermal printer support, and modules for inventory, billing, and reporting."
      }
    ],

    education: "Bachelor of Engineering in Computer Engineering — Datta Meghe College of Engineering, Navi Mumbai (2022).",
    certifications: [
      "J.P. Morgan Software Engineering Virtual Experience (Forage)",
      "Software Engineer Certificate (HackerRank)"
    ],

    hobbies: [
      "Gaming — loves playing story-driven and strategy games in his free time 🎮",
      "Football — passionate fan and enjoys playing casually with friends ⚽",
      "Music — listens to lo-fi and hip-hop while coding 🎵",
      "Tech exploration — regularly reads tech blogs and follows new frameworks & tools 💻",
      "Building side projects — always experimenting with new ideas outside of work 🔧"
    ],

    openTo:
      "Aditya is open to full-time roles, freelance projects, and collaborations — " +
      "especially in Full Stack Web Development with ASP.NET Core, React, or modern web technologies."
  };

  // ============================================================
  // TIMELINE WIDGET HTML
  // ============================================================
  function buildTimelineHTML() {
    const totalMonths = monthsBetween(new Date("2024-06-01"), new Date());
    const barItems = timeline.map(role => {
      const dur = monthsBetween(role.startDate, role.endDate);
      const pct = ((dur / totalMonths) * 100).toFixed(1);
      return { ...role, dur, pct };
    });

    const rows = barItems.map(r => `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <div style="width:28px;height:28px;border-radius:8px;background:${r.color}22;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">${r.icon}</div>
        <div style="flex:1;min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:12px;font-weight:700;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.company}</span>
            <span style="font-size:11px;color:#64748b;flex-shrink:0;margin-left:6px;">${formatDuration(r.dur)}</span>
          </div>
          <div style="height:7px;background:#f1f5f9;border-radius:99px;overflow:hidden;">
            <div style="height:100%;width:${r.pct}%;background:${r.color};border-radius:99px;transition:width 0.8s ease;"></div>
          </div>
          <div style="font-size:10.5px;color:#94a3b8;margin-top:3px;">${formatDateLabel(r.startDate)} – ${formatDateLabel(r.endDate)}</div>
        </div>
      </div>
    `).join("");

    return `
      <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);border-radius:14px;padding:16px;margin:6px 0;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <span style="font-size:16px;">⏱️</span>
          <span style="font-size:13px;font-weight:800;color:#e2e8f0;letter-spacing:0.03em;">EXPERIENCE TIMELINE</span>
          <span style="margin-left:auto;font-size:11px;font-weight:700;color:#06b6d4;background:rgba(6,182,212,0.12);padding:3px 9px;border-radius:99px;">${totalExperience()} total</span>
        </div>
        <div style="color:#e2e8f0;">${rows}</div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#64748b;text-align:center;">
          Started Jun 2024 · Currently at Quinnox
        </div>
      </div>
    `;
  }

  // ============================================================
  // Q&A RULES
  // ============================================================
  const rules = [
    {
      patterns: ["hello", "hi", "hey", "good morning", "good evening", "howdy", "sup"],
      reply: () => `Hey there! 👋 I'm Aditya's assistant bot. Ask me anything — his skills, projects, hobbies, experience, or how to reach him!`
    },
    {
      patterns: ["who are you", "what are you", "introduce yourself", "your name", "are you a bot", "are you ai"],
      reply: () => `I'm a chatbot assistant for ${profile.name}! I can answer questions about his background, skills, projects, hobbies, and more. What would you like to know? 😊`
    },
    {
      patterns: ["who is aditya", "about aditya", "tell me about", "summary", "bio", "profile", "background"],
      reply: () =>
        `${profile.summary}\n\nHe's currently at ${profile.currentRole.company} and is based in ${profile.location}.`,
      widget: buildTimelineHTML
    },
    {
      patterns: ["timeline", "career timeline", "journey", "career journey"],
      reply: () => `Here's Aditya's career journey so far — ${profile.experience} of building things on the web! 🗺️`,
      widget: buildTimelineHTML
    },
    {
      patterns: ["how many years", "total experience", "years of experience", "how long", "how much experience", "experience"],
      reply: () => `Aditya has ${profile.experience} of professional experience — starting at Aviraj Innovations in June 2024, and now at Quinnox since December 2025. 💼`,
      widget: buildTimelineHTML
    },
    {
      patterns: ["current job", "current role", "current company", "currently working", "where does he work", "quinnox", "present job"],
      reply: () => profile.currentRole.description
    },
    {
      patterns: ["aviraj", "previous", "before quinnox", "past experience", "earlier", "prior", "work history", "old job"],
      reply: () => {
        const r = timeline[1];
        return `${r.icon} ${r.title} @ ${r.company}\n${formatDateLabel(r.startDate)} – ${formatDateLabel(r.endDate)} (${formatDuration(monthsBetween(r.startDate, r.endDate))})\n\n${r.description}`;
      }
    },

    {
      patterns: ["work experience", "career", "professional experience", "employment", "job history", "all jobs"],
      reply: () =>
        `Aditya has ${profile.experience} of experience across 2 roles:\n\n` +
        timeline.map(r =>
          `${r.icon} ${r.title} @ ${r.company}\n   ${formatDateLabel(r.startDate)} – ${formatDateLabel(r.endDate)} · ${formatDuration(monthsBetween(r.startDate, r.endDate))}`
        ).join("\n\n"),
      widget: buildTimelineHTML
    },
    {
      patterns: ["skills", "technologies", "tech stack", "what can he do", "what does he know", "languages", "frameworks"],
      reply: () => `Here are Aditya's key skills 🛠️\n\nTech: ${profile.skills}\n\nTools: ${profile.tools}`
    },
    {
      patterns: ["react", "redux"],
      reply: () => `Yes! Aditya works with React and Redux for building responsive, dynamic frontends — used in production at both Aviraj Innovations and Quinnox. ⚛️`
    },
    {
      patterns: ["asp.net", "dotnet", ".net", "c#", "csharp"],
      reply: () => `ASP.NET Core (MVC & Web API) and C# are Aditya's primary backend technologies. He uses them daily to build secure, scalable APIs and web apps. 🔧`
    },
    {
      patterns: ["sql", "database", "sql server", "linq", "entity framework"],
      reply: () => `Aditya works with SQL Server, Entity Framework Core, LINQ, and ADO.NET. He's comfortable with both ORM-based and raw SQL approaches. 🗄️`
    },
    {
      patterns: ["tailwind", "css", "styling", "ui", "frontend"],
      reply: () => `Aditya builds responsive UIs using Tailwind CSS, jQuery, HTML, and CSS. 🎨`
    },
    {
      patterns: ["project", "projects", "what has he built", "portfolio", "work samples"],
      reply: () => profile.projects.map(p => `🔹 ${p.title}\nTech: ${p.tech}\n${p.details}`).join("\n\n")
    },
    {
      patterns: ["erp", "college erp", "college administration"],
      reply: () => { const p = profile.projects[0]; return `${p.title}\n\nTech: ${p.tech}\n\n${p.details}`; }
    },
    {
      patterns: ["pos", "point of sale", "retail", "billing"],
      reply: () => { const p = profile.projects[1]; return `${p.title}\n\nTech: ${p.tech}\n\n${p.details}`; }
    },
    {
      patterns: ["education", "degree", "university", "studied", "study", "datta meghe", "college"],
      reply: () => `🎓 ${profile.education}`
    },
    {
      patterns: ["certification", "certifications", "certificate", "courses", "hackerrank", "forage", "jpmorgan"],
      reply: () => `Aditya holds these certifications 📜\n\n• ${profile.certifications.join("\n• ")}`
    },
    {
      patterns: ["hobbies", "hobby", "interests", "free time", "outside work", "personal interests", "what does he like", "what does he enjoy"],
      reply: () => `Outside of work, Aditya enjoys:\n\n${profile.hobbies.map(h => `• ${h}`).join("\n")}`
    },
    {
      patterns: ["gaming", "games", "video games", "gamer"],
      reply: () => `Aditya loves gaming 🎮 — especially story-driven and strategy games. It's his favourite way to unwind after a long coding session!`
    },
    {
      patterns: ["football", "soccer", "sport", "sports"],
      reply: () => `Aditya is a big football fan ⚽ — he follows the game closely and enjoys playing casually with friends too.`
    },
    {
      patterns: ["music", "songs", "playlist", "listening"],
      reply: () => `Aditya loves listening to music while coding 🎵 — mostly lo-fi and hip-hop to keep in the zone.`
    },
    {
      patterns: ["side project", "personal project", "experimenting"],
      reply: () => `Aditya is always building something on the side 🔧 — he loves experimenting with new ideas and technologies beyond his day job.`
    },
    {
      patterns: ["email", "contact", "reach", "get in touch", "message him", "hire", "connect"],
      reply: () => `You can reach Aditya at 📧 ${profile.email} — he's open to full-time roles, freelance work, and collaborations!`
    },
    {
      patterns: ["github", "git", "repository", "repos"],
      reply: () => `Check out Aditya's GitHub here 👉 ${profile.github}`
    },
    {
      patterns: ["resume", "cv", "download", "curriculum vitae"],
      reply: () => profile.resume !== "#"
        ? `You can view/download Aditya's resume here 📄 ${profile.resume}`
        : `Aditya's resume link isn't published yet — reach him at ${profile.email} and he'll share it directly! 📧`
    },
    {
      patterns: ["location", "based", "where", "city", "mumbai", "india"],
      reply: () => `Aditya is based in ${profile.location}. 📍`
    },
    {
      patterns: ["available", "open to work", "hiring", "looking for", "opportunity", "opportunities", "open for"],
      reply: () => profile.openTo
    },
    {
      patterns: ["personality", "working style", "how is he", "what is he like", "traits"],
      reply: () =>
        `From what I know about Aditya 😊\n\n` +
        `• Detail-oriented and methodical in problem-solving\n` +
        `• Always eager to learn new technologies\n` +
        `• Collaborative team player who communicates clearly\n` +
        `• Self-motivated with a strong work ethic\n` +
        `• Prefers clean, maintainable code over quick hacks`
    },
    {
      patterns: ["thank", "thanks", "thank you", "thx", "ty", "cheers"],
      reply: () => `You're welcome! 😊 Feel free to ask anything else about Aditya.`
    },
    {
      patterns: ["bye", "goodbye", "see you", "cya", "later", "that's all", "thats all"],
      reply: () => `Goodbye! 👋 Feel free to come back anytime if you have more questions about Aditya.`
    }
  ];

  const fallbacks = [
    `I'm not sure about that one! Try asking about Aditya's skills, projects, experience, hobbies, or how to contact him. 😊`,
    `Hmm, I don't have that info. You could ask me about his tech stack, past work, hobbies, certifications, or education!`,
    `I didn't quite get that — try asking something like "What are his skills?" or "Show me his timeline!" 🙂`
  ];

  function getReplyData(text) {
    const q = text.toLowerCase().trim();
    for (const rule of rules) {
      for (const pat of rule.patterns) {
        if (q.includes(pat)) {
          try {
            return {
              text: rule.reply(),
              widget: rule.widget ? rule.widget() : null
            };
          } catch (e) {
            return { text: fallbacks[0], widget: null };
          }
        }
      }
    }
    return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], widget: null };
  }

  // ============================================================
  // PREVENT DOUBLE INJECTION
  // ============================================================
  if (document.getElementById("aditya-chatbot-root")) return;

  // ============================================================
  // STYLES
  // ============================================================
  const style = document.createElement("style");
  style.id = "aditya-chatbot-styles";
  style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes fadeInUp { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-12px);}to{opacity:1;transform:translateX(0);} }
  @keyframes slideInRight { from{opacity:0;transform:translateX(12px);}to{opacity:1;transform:translateX(0);} }
  @keyframes blink { 0%,100%{opacity:1;}50%{opacity:0;} }
  @keyframes rotate { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
  @keyframes shimmer {
    0%{background-position:-200% center;}
    100%{background-position:200% center;}
  }

  #aditya-chatbot-root {
    font-family:'DM Sans',system-ui,sans-serif;
    z-index:999999;
  }

  /* Toggle button */
  #aditya-chatbot-toggle {
    position:fixed;right:28px;bottom:28px;
    width:60px;height:60px;border-radius:18px;
    display:flex;align-items:center;justify-content:center;
    background:#0f172a;
    border:1px solid rgba(255,255,255,0.1);
    color:white;font-size:24px;
    box-shadow:0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.2);
    cursor:pointer;
    transition:all 0.25s cubic-bezier(0.4,0,0.2,1);
  }
  #aditya-chatbot-toggle:hover {
    transform:translateY(-3px);
    box-shadow:0 14px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,182,212,0.4);
  }
  #aditya-chatbot-toggle.open {
    background:#1e293b;
    border-color:rgba(239,68,68,0.3);
  }

  /* Panel */
  #aditya-chatbot-panel {
    position:fixed;right:28px;bottom:104px;
    width:440px;max-width:calc(100vw - 40px);
    height:680px;max-height:calc(100vh - 120px);
    background:#0f172a;
    border-radius:20px;
    border:1px solid rgba(255,255,255,0.07);
    box-shadow:0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,182,212,0.1);
    display:flex;flex-direction:column;overflow:hidden;
    animation:fadeInUp 0.35s cubic-bezier(0.4,0,0.2,1);
  }

  /* Header */
  #aditya-chatbot-header {
    padding:16px 18px;
    background:#0f172a;
    border-bottom:1px solid rgba(255,255,255,0.06);
    display:flex;align-items:center;gap:12px;
    flex-shrink:0;
  }
  .aditya-avatar {
    width:42px;height:42px;border-radius:12px;
    background:linear-gradient(135deg,#06b6d4,#7c3aed);
    display:flex;align-items:center;justify-content:center;
    font-size:20px;flex-shrink:0;
    box-shadow:0 4px 12px rgba(6,182,212,0.3);
  }
  .aditya-header-text { flex:1; }
  .aditya-header-title {
    font-family:'Syne',sans-serif;
    font-weight:800;font-size:14px;color:#f1f5f9;
    letter-spacing:0.02em;
  }
  .aditya-header-status {
    font-size:11px;color:#64748b;
    display:flex;align-items:center;gap:5px;margin-top:2px;
  }
  .aditya-status-dot {
    width:6px;height:6px;border-radius:50%;
    background:#22c55e;
    animation:blink 2s ease-in-out infinite;
  }
  .aditya-close-btn {
    background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);
    width:30px;height:30px;border-radius:8px;color:#64748b;
    cursor:pointer;display:flex;align-items:center;justify-content:center;
    font-size:16px;transition:all 0.2s;
  }
  .aditya-close-btn:hover { color:#f1f5f9;background:rgba(255,255,255,0.1); }

  /* Messages area */
  #aditya-chatbot-messages {
    flex:1 1 auto;padding:16px;
    overflow-y:auto;
    background:#0f172a;
    scroll-behavior:smooth;
  }
  #aditya-chatbot-messages::-webkit-scrollbar { width:4px; }
  #aditya-chatbot-messages::-webkit-scrollbar-thumb { background:#1e293b;border-radius:2px; }

  .aditya-msg { margin:0 0 12px 0;display:flex;align-items:flex-end;gap:8px; }
  .aditya-msg.bot { justify-content:flex-start;animation:slideIn 0.3s ease; }
  .aditya-msg.user { justify-content:flex-end;animation:slideInRight 0.3s ease; }

  .aditya-msg-avatar {
    width:28px;height:28px;border-radius:9px;
    background:linear-gradient(135deg,#06b6d4,#7c3aed);
    display:flex;align-items:center;justify-content:center;
    font-size:13px;flex-shrink:0;
  }

  .aditya-bubble {
    max-width:82%;padding:11px 14px;
    border-radius:14px;line-height:1.65;font-size:13.5px;
  }
  .aditya-bubble.bot {
    background:#1e293b;color:#cbd5e1;
    border-bottom-left-radius:4px;
    border:1px solid rgba(255,255,255,0.05);
  }
  .aditya-bubble.user {
    background:linear-gradient(135deg,#06b6d4 0%,#7c3aed 100%);
    color:white;border-bottom-right-radius:4px;
    font-weight:500;
  }

  /* Typing indicator */
  .aditya-typing { display:flex;gap:5px;padding:8px 4px; }
  .aditya-typing-dot {
    width:7px;height:7px;border-radius:50%;background:#475569;
    animation:blink 1.2s ease-in-out infinite;
  }
  .aditya-typing-dot:nth-child(2) { animation-delay:0.2s; }
  .aditya-typing-dot:nth-child(3) { animation-delay:0.4s; }

  /* Widget container */
  .aditya-widget-wrap { margin:4px 0 12px 36px; }

  /* Suggestions */
  #aditya-chatbot-suggestions {
    padding:10px 14px 12px;
    display:flex;gap:7px;flex-wrap:wrap;
    background:#0f172a;
    border-top:1px solid rgba(255,255,255,0.05);
    flex-shrink:0;
  }
  .aditya-suggestion {
    background:rgba(6,182,212,0.07);
    border:1px solid rgba(6,182,212,0.15);
    border-radius:99px;padding:6px 12px;
    font-size:12px;cursor:pointer;
    transition:all 0.2s;color:#94a3b8;
    font-family:'DM Sans',sans-serif;
    font-weight:500;
  }
  .aditya-suggestion:hover {
    background:rgba(6,182,212,0.15);
    border-color:rgba(6,182,212,0.35);
    color:#e2e8f0;
    transform:translateY(-2px);
  }

  /* Input bar */
  #aditya-chatbot-inputbar {
    padding:12px 14px;
    display:flex;gap:8px;
    border-top:1px solid rgba(255,255,255,0.05);
    background:#0f172a;
    flex-shrink:0;
  }
  #aditya-chatbot-input {
    flex:1;padding:11px 14px;
    border-radius:12px;
    border:1px solid rgba(255,255,255,0.08);
    font-size:13.5px;
    transition:all 0.2s;
    font-family:'DM Sans',sans-serif;
    color:#e2e8f0;
    background:#1e293b;
    caret-color:#06b6d4;
  }
  #aditya-chatbot-input::placeholder { color:#475569; }
  #aditya-chatbot-input:focus {
    outline:none;
    border-color:rgba(6,182,212,0.4);
    box-shadow:0 0 0 3px rgba(6,182,212,0.08);
  }
  #aditya-chatbot-send {
    padding:11px 18px;border-radius:12px;border:none;
    cursor:pointer;
    background:linear-gradient(135deg,#06b6d4,#7c3aed);
    color:white;font-weight:600;font-size:13px;
    font-family:'DM Sans',sans-serif;
    transition:all 0.2s;
    box-shadow:0 2px 8px rgba(6,182,212,0.25);
  }
  #aditya-chatbot-send:hover {
    transform:translateY(-2px);
    box-shadow:0 4px 16px rgba(6,182,212,0.4);
  }

  @media(max-width:480px) {
    #aditya-chatbot-panel { right:12px;left:12px;bottom:82px;width:auto;height:600px;border-radius:16px; }
    #aditya-chatbot-toggle { right:16px;bottom:16px;width:52px;height:52px;font-size:20px;border-radius:14px; }
    .aditya-bubble { max-width:88%;font-size:13px; }
  }
  `;

  // ============================================================
  // DOM HELPERS
  // ============================================================
  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    if (children) [].concat(children).forEach(c => {
      if (!c) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  const root = el("div", { id: "aditya-chatbot-root" }, [
    el("button", { id: "aditya-chatbot-toggle", "aria-label": "Open chat" }, ["💬"]),
    el("div", { id: "aditya-chatbot-panel", style: "display:none;" }, [
      el("div", { id: "aditya-chatbot-header" }, [
        el("div", { class: "aditya-avatar" }, ["🤖"]),
        el("div", { class: "aditya-header-text" }, [
          el("div", { class: "aditya-header-title" }, ["Aditya's Assistant"]),
          el("div", { class: "aditya-header-status" }, [
            el("span", { class: "aditya-status-dot" }),
            "Online — ask me anything!"
          ])
        ]),
        el("button", { class: "aditya-close-btn", title: "Close" }, ["✕"])
      ]),
      el("div", { id: "aditya-chatbot-messages", role: "log", "aria-live": "polite" }),
      el("div", { id: "aditya-chatbot-suggestions" }),
      el("div", { id: "aditya-chatbot-inputbar" }, [
        el("input", {
          id: "aditya-chatbot-input", type: "text",
          placeholder: "Ask about Aditya...",
          "aria-label": "Type your question", autocomplete: "off"
        }),
        el("button", { id: "aditya-chatbot-send" }, ["Send ➤"])
      ])
    ])
  ]);

  document.head.appendChild(style);
  document.body.appendChild(root);

  // ============================================================
  // UI HELPERS
  // ============================================================
  const panel      = document.getElementById("aditya-chatbot-panel");
  const toggle     = document.getElementById("aditya-chatbot-toggle");
  const messagesEl = document.getElementById("aditya-chatbot-messages");
  const sendBtn    = document.getElementById("aditya-chatbot-send");
  const inputEl    = document.getElementById("aditya-chatbot-input");
  const suggestEl  = document.getElementById("aditya-chatbot-suggestions");
  const closeBtn   = document.querySelector(".aditya-close-btn");

  function appendMessage(text, who, widgetHTML) {
    const wrapper = el("div", { class: `aditya-msg ${who}` });
    if (who === "bot") {
      const avatar = el("div", { class: "aditya-msg-avatar" }, ["🤖"]);
      const bubble = el("div", { class: "aditya-bubble bot" });
      text.split("\n").forEach((line, i, arr) => {
        bubble.appendChild(document.createTextNode(line));
        if (i < arr.length - 1) bubble.appendChild(el("br"));
      });
      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
      messagesEl.appendChild(wrapper);

      // Append widget as a separate row if present
      if (widgetHTML) {
        const widgetWrap = el("div", { class: "aditya-widget-wrap", html: widgetHTML });
        messagesEl.appendChild(widgetWrap);
      }
    } else {
      wrapper.appendChild(el("div", { class: "aditya-bubble user", text: text }));
      messagesEl.appendChild(wrapper);
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const wrapper = el("div", { class: "aditya-msg bot", id: "aditya-typing" });
    const avatar  = el("div", { class: "aditya-msg-avatar" }, ["🤖"]);
    const bubble  = el("div", { class: "aditya-bubble bot" });
    bubble.appendChild(el("div", { class: "aditya-typing" }, [
      el("div", { class: "aditya-typing-dot" }),
      el("div", { class: "aditya-typing-dot" }),
      el("div", { class: "aditya-typing-dot" })
    ]));
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById("aditya-typing");
    if (t) t.remove();
  }

  function handleUserText(raw) {
    const text = (raw || "").trim();
    if (!text) return;
    appendMessage(text, "user", null);
    showTyping();
    const { text: reply, widget } = getReplyData(text);
    setTimeout(() => {
      hideTyping();
      appendMessage(reply, "bot", widget);
    }, 500 + Math.random() * 250);
  }

  // ============================================================
  // EVENTS
  // ============================================================
  sendBtn.addEventListener("click", () => {
    const t = inputEl.value; inputEl.value = ""; handleUserText(t); inputEl.focus();
  });
  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter") { const t = inputEl.value; inputEl.value = ""; handleUserText(t); }
  });
  toggle.addEventListener("click", () => {
    const open = panel.style.display !== "none";
    panel.style.display = open ? "none" : "flex";
    toggle.textContent  = open ? "💬" : "✕";
    toggle.classList.toggle("open", !open);
    if (!open) inputEl.focus();
  });
  closeBtn.addEventListener("click", () => {
    panel.style.display = "none"; toggle.textContent = "💬"; toggle.classList.remove("open");
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && panel.style.display !== "none") {
      panel.style.display = "none"; toggle.textContent = "💬"; toggle.classList.remove("open");
    }
  });

  // ============================================================
  // SUGGESTION CHIPS
  // ============================================================
  ["Show timeline 📊", "Skills?", "Hobbies?", "Current role?", "Projects?", "Contact?"].forEach(s => {
    const btn = el("button", { class: "aditya-suggestion", type: "button", text: s });
    btn.addEventListener("click", () => handleUserText(s));
    suggestEl.appendChild(btn);
  });

  // ============================================================
  // INITIAL GREETING
  // ============================================================
  setTimeout(() => {
    appendMessage(
      `Hey there! 👋 I'm Aditya's assistant bot. He has ${profile.experience} of experience in Full Stack Web Development.\n\nAsk me about his skills, career timeline, projects, or how to reach him!`,
      "bot",
      buildTimelineHTML()
    );
  }, 300);

  // ============================================================
  // PUBLIC API
  // ============================================================
  window.AdityaChatbot = {
    open()  { panel.style.display = "flex"; toggle.classList.add("open"); toggle.textContent = "✕"; inputEl.focus(); },
    close() { panel.style.display = "none"; toggle.classList.remove("open"); toggle.textContent = "💬"; }
  };

})();
