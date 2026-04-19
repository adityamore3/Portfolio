/* chatbot.js — Smart Rule-Based Version (no API required)
   Drop this file and include <script src="chatbot.js"></script> before </body>.
*/
(function () {

  // ============================================================
  // YOUR PROFILE — Edit everything here
  // ============================================================
  const careerStartDate = new Date("2023-01-01"); // Adjust to when you started

  function computeExperience() {
    const now = new Date();
    const months =
      (now.getFullYear() - careerStartDate.getFullYear()) * 12 +
      (now.getMonth() - careerStartDate.getMonth());
    const years = Math.floor(months / 12);
    const rem   = months % 12;
    if (years === 0) return `${rem} month${rem !== 1 ? "s" : ""}`;
    if (rem   === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years} year${years !== 1 ? "s" : ""} and ${rem} month${rem !== 1 ? "s" : ""}`;
  }

  const profile = {
    name:     "Aditya More",
    title:    "Software Engineer",
    location: "Mumbai, India",
    email:    "adieeoffical@gmail.com",
    github:   "https://github.com/adityamore3",
    resume:   "#",   // Replace with actual URL

    get experience() { return computeExperience(); },

    summary:
      "Detail-oriented Software Engineer with over a year of experience in Full Stack Web Development, " +
      "specialising in ASP.NET Core, React, and SQL Server. Adept at designing secure APIs, developing " +
      "responsive UIs, and optimising databases for performance.",

    currentRole: {
      company:   "Aviraj Innovations Pvt Ltd",
      title:     "Software Engineer",
      startDate: "June 2024",
      description:
        "Working as a Software Engineer at Aviraj Innovations since June 2024. " +
        "Responsibilities include building full-stack web applications with ASP.NET Core and React, " +
        "designing secure REST APIs with JWT authentication, optimising SQL Server databases, " +
        "and developing responsive UIs using Tailwind CSS and jQuery."
    },

    previousExperience: [
      {
        company:  "Freelance / Self-employed",
        title:    "Full Stack Developer",
        duration: "January 2023 – May 2024",
        details:
          "Worked as a freelance Full Stack Developer for about 1.5 years before joining Aviraj Innovations. " +
          "Built custom web applications for clients using ASP.NET Core, JavaScript, and SQL Server. " +
          "Gained hands-on experience in API design, database modelling, and frontend development."
      }
    ],

    skills:
      "C#, HTML, CSS, JavaScript, ASP.NET Core, ASP.NET Core MVC, ASP.NET Core Web API, " +
      "React, Redux, Entity Framework Core, SQL Server, LINQ, Tailwind CSS, jQuery.",

    tools: "Visual Studio, Git & GitHub, Postman, JWT, ADO.NET.",

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

    education:
      "Bachelor of Engineering in Computer Engineering — " +
      "Datta Meghe College of Engineering, Navi Mumbai (2022).",

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
  // Q&A Rules
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
        `${profile.summary}\n\nHe's currently working at ${profile.currentRole.company} as a ${profile.currentRole.title} and is based in ${profile.location}.`
    },
    {
      patterns: ["how many years", "total experience", "years of experience", "how long", "how much experience"],
      reply: () =>
        `Aditya has ${profile.experience} of professional experience in Full Stack Web Development — starting as a freelancer in early 2023 before joining Aviraj Innovations in June 2024. 💼`
    },
    {
      patterns: ["current job", "current role", "current company", "currently working", "where does he work", "aviraj", "present job"],
      reply: () => profile.currentRole.description
    },
    {
      patterns: ["previous", "before aviraj", "past experience", "earlier", "prior", "freelance", "work history", "old job"],
      reply: () => {
        const prev = profile.previousExperience[0];
        return `Before joining Aviraj Innovations, Aditya worked as a ${prev.title} (${prev.duration}).\n\n${prev.details}`;
      }
    },
    {
      patterns: ["work experience", "career", "professional experience", "employment", "job history", "experience"],
      reply: () => {
        const prev = profile.previousExperience[0];
        return (
          `Aditya has ${profile.experience} of experience overall:\n\n` +
          `📌 Current: ${profile.currentRole.title} @ ${profile.currentRole.company} (${profile.currentRole.startDate} – Present)\n\n` +
          `📌 Previous: ${prev.title} – ${prev.company} (${prev.duration})\n${prev.details}`
        );
      }
    },
    {
      patterns: ["skills", "technologies", "tech stack", "what can he do", "what does he know", "languages", "frameworks"],
      reply: () => `Here are Aditya's key skills 🛠️\n\nTech: ${profile.skills}\n\nTools: ${profile.tools}`
    },
    {
      patterns: ["react", "redux"],
      reply: () => `Yes! Aditya works with React and Redux for building responsive, dynamic frontends — used in production at Aviraj Innovations and in his POS project. ⚛️`
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
      reply: () =>
        profile.projects.map(p => `🔹 ${p.title}\nTech: ${p.tech}\n${p.details}`).join("\n\n")
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
      patterns: ["education", "degree", "university", "studied", "study", "datta meghe"],
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
    `I didn't quite get that — try asking something like "What are his skills?" or "Tell me about his projects!" 🙂`
  ];

  function getReply(text) {
    const q = text.toLowerCase().trim();
    for (const rule of rules) {
      for (const pat of rule.patterns) {
        if (q.includes(pat)) {
          try { return rule.reply(); } catch (e) { return fallbacks[0]; }
        }
      }
    }
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // ============================================================
  // Prevent double injection
  // ============================================================
  if (document.getElementById("aditya-chatbot-root")) return;

  // ============================================================
  // Styles
  // ============================================================
  const style = document.createElement("style");
  style.id = "aditya-chatbot-styles";
  style.textContent = `
  @keyframes fadeInUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-10px);}to{opacity:1;transform:translateX(0);} }
  @keyframes slideInRight { from{opacity:0;transform:translateX(10px);}to{opacity:1;transform:translateX(0);} }
  @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.4;} }
  @keyframes gradShift { 0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;} }

  #aditya-chatbot-root{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;z-index:999999;}

  #aditya-chatbot-toggle{
    position:fixed;right:24px;bottom:24px;width:64px;height:64px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    background:linear-gradient(135deg,#06b6d4 0%,#7c3aed 100%);
    background-size:200% 200%;animation:gradShift 3s ease infinite;
    color:white;font-size:28px;box-shadow:0 8px 32px rgba(6,182,212,0.4);
    cursor:pointer;border:none;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  #aditya-chatbot-toggle:hover{transform:translateY(-4px) scale(1.05);box-shadow:0 12px 40px rgba(6,182,212,0.5);}
  #aditya-chatbot-toggle.open{background:linear-gradient(135deg,#ef4444,#dc2626);animation:none;}

  #aditya-chatbot-panel{
    position:fixed;right:24px;bottom:100px;
    width:480px;max-width:calc(100% - 48px);height:780px;max-height:calc(100vh - 120px);
    background:#fff;border-radius:20px;
    box-shadow:0 24px 64px rgba(15,23,42,0.15),0 0 0 1px rgba(15,23,42,0.05);
    display:flex;flex-direction:column;overflow:hidden;
    animation:fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1);
  }

  #aditya-chatbot-header{
    padding:20px;background:linear-gradient(135deg,#06b6d4 0%,#7c3aed 100%);
    background-size:200% 200%;animation:gradShift 3s ease infinite;
    color:white;display:flex;align-items:center;gap:12px;
    box-shadow:0 4px 16px rgba(6,182,212,0.2);
  }
  .aditya-avatar{width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:22px;border:2px solid rgba(255,255,255,0.4);flex-shrink:0;}
  .aditya-header-text{flex:1;}
  .aditya-header-title{font-weight:700;font-size:16px;}
  .aditya-header-status{font-size:11px;opacity:0.9;display:flex;align-items:center;gap:6px;margin-top:3px;}
  .aditya-status-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:pulse 2s ease-in-out infinite;}
  .aditya-minimize-btn{background:rgba(255,255,255,0.2);border:none;width:32px;height:32px;border-radius:8px;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:all 0.2s;}
  .aditya-minimize-btn:hover{background:rgba(255,255,255,0.3);}

  #aditya-chatbot-messages{flex:1 1 auto;padding:20px;overflow-y:auto;background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);scroll-behavior:smooth;}
  #aditya-chatbot-messages::-webkit-scrollbar{width:5px;}
  #aditya-chatbot-messages::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px;}

  .aditya-msg{margin:0 0 14px 0;display:flex;align-items:flex-end;gap:8px;}
  .aditya-msg.bot{justify-content:flex-start;animation:slideIn 0.35s ease;}
  .aditya-msg.user{justify-content:flex-end;animation:slideInRight 0.35s ease;}
  .aditya-msg-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#06b6d4,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;box-shadow:0 2px 8px rgba(6,182,212,0.3);}
  .aditya-bubble{max-width:80%;padding:12px 16px;border-radius:16px;line-height:1.65;font-size:14.5px;}
  .aditya-bubble.bot{background:#f1f5f9;color:#0f172a;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(15,23,42,0.06);}
  .aditya-bubble.user{background:linear-gradient(135deg,#06b6d4,#7c3aed);color:white;border-bottom-right-radius:4px;box-shadow:0 2px 12px rgba(6,182,212,0.3);}

  .aditya-typing{display:flex;gap:5px;padding:10px 14px;}
  .aditya-typing-dot{width:8px;height:8px;border-radius:50%;background:#94a3b8;animation:pulse 1.4s ease-in-out infinite;}
  .aditya-typing-dot:nth-child(2){animation-delay:0.2s;}
  .aditya-typing-dot:nth-child(3){animation-delay:0.4s;}

  #aditya-chatbot-suggestions{padding:10px 16px 12px;display:flex;gap:7px;flex-wrap:wrap;background:white;border-top:1px solid #f1f5f9;}
  .aditya-suggestion{background:rgba(6,182,212,0.07);border:1px solid rgba(6,182,212,0.2);border-radius:20px;padding:7px 13px;font-size:12.5px;cursor:pointer;transition:all 0.2s;color:#0f172a;font-weight:500;}
  .aditya-suggestion:hover{background:rgba(6,182,212,0.14);border-color:rgba(6,182,212,0.4);transform:translateY(-2px);box-shadow:0 4px 12px rgba(6,182,212,0.12);}

  #aditya-chatbot-inputbar{padding:14px 18px;display:flex;gap:10px;border-top:1px solid #f1f5f9;background:white;}
  #aditya-chatbot-input{flex:1;padding:13px 16px;border-radius:12px;border:2px solid #e2e8f0;font-size:14.5px;transition:all 0.2s;font-family:inherit;color:#0f172a;background:white;}
  #aditya-chatbot-input:focus{outline:none;border-color:#06b6d4;box-shadow:0 0 0 3px rgba(6,182,212,0.1);}
  #aditya-chatbot-send{padding:13px 22px;border-radius:12px;border:none;cursor:pointer;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:white;font-weight:600;font-size:14px;transition:all 0.2s;white-space:nowrap;box-shadow:0 2px 8px rgba(6,182,212,0.3);}
  #aditya-chatbot-send:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(6,182,212,0.4);}

  @media(max-width:480px){
    #aditya-chatbot-panel{right:12px;left:12px;bottom:86px;width:auto;height:640px;border-radius:16px;}
    #aditya-chatbot-toggle{right:16px;bottom:16px;width:56px;height:56px;font-size:22px;}
    .aditya-bubble{max-width:86%;font-size:14px;}
  }
  `;

  // ============================================================
  // DOM helpers
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
        el("button", { class: "aditya-minimize-btn", title: "Minimize" }, ["−"])
      ]),
      el("div", { id: "aditya-chatbot-messages", role: "log", "aria-live": "polite" }),
      el("div", { id: "aditya-chatbot-suggestions" }),
      el("div", { id: "aditya-chatbot-inputbar" }, [
        el("input", {
          id: "aditya-chatbot-input", type: "text",
          placeholder: "Ask me anything about Aditya...",
          "aria-label": "Type your question", autocomplete: "off"
        }),
        el("button", { id: "aditya-chatbot-send" }, ["Send ➤"])
      ])
    ])
  ]);

  document.head.appendChild(style);
  document.body.appendChild(root);

  // ============================================================
  // UI helpers
  // ============================================================
  const panel       = document.getElementById("aditya-chatbot-panel");
  const toggle      = document.getElementById("aditya-chatbot-toggle");
  const messagesEl  = document.getElementById("aditya-chatbot-messages");
  const sendBtn     = document.getElementById("aditya-chatbot-send");
  const inputEl     = document.getElementById("aditya-chatbot-input");
  const suggestEl   = document.getElementById("aditya-chatbot-suggestions");
  const minimizeBtn = document.querySelector(".aditya-minimize-btn");

  function appendMessage(text, who) {
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
    } else {
      wrapper.appendChild(el("div", { class: "aditya-bubble user", text: text }));
    }
    messagesEl.appendChild(wrapper);
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
    appendMessage(text, "user");
    showTyping();
    const reply = getReply(text);
    setTimeout(() => { hideTyping(); appendMessage(reply, "bot"); }, 500 + Math.random() * 300);
  }

  // ============================================================
  // Events
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
  minimizeBtn.addEventListener("click", () => {
    panel.style.display = "none"; toggle.textContent = "💬"; toggle.classList.remove("open");
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && panel.style.display !== "none") {
      panel.style.display = "none"; toggle.textContent = "💬"; toggle.classList.remove("open");
    }
  });

  // ============================================================
  // Suggestion chips
  // ============================================================
  ["Tell me about Aditya", "What are his skills?", "His hobbies?", "Previous experience?", "Show me his projects", "How to contact him?"]
    .forEach(s => {
      const btn = el("button", { class: "aditya-suggestion", type: "button", text: s });
      btn.addEventListener("click", () => handleUserText(s));
      suggestEl.appendChild(btn);
    });

  // ============================================================
  // Initial greeting (auto, after 300ms)
  // ============================================================
  setTimeout(() => {
    appendMessage(
      `Hey there! 👋 I'm Aditya's assistant bot. He has ${profile.experience} of experience in Full Stack Web Development.\n\nAsk me about his skills, projects, hobbies, experience, or how to reach him!`,
      "bot"
    );
  }, 300);

  // ============================================================
  // Public API
  // ============================================================
  window.AdityaChatbot = {
    open()  { panel.style.display = "flex"; toggle.classList.add("open"); toggle.textContent = "✕"; inputEl.focus(); },
    close() { panel.style.display = "none"; toggle.classList.remove("open"); toggle.textContent = "💬"; }
  };

})();
