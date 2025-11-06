/* chatbot.js - Enhanced Version (quick actions removed, taller chat window)
   Drop this file in your project and include <script src="chatbot.js"></script> before </body>.
*/
(function () {
  // ======= Your profile =======
  const profile = {
    name: "ADITYA MORE",
    title: "Software Engineer",
    experience: "1.4 years of experience in Full Stack Web Development",
    currentRole: "Software Engineer at Aviraj Innovations Pvt Ltd (since 06/2024)",
    email: "adieeoffical@gmail.com",
    location: "Mumbai, India",
    summary:
      "Detail-oriented Software Engineer with over 1.4 year of experience in Full Stack Web Development, specializing in ASP.NET Core, React, and SQL Server. Adept at designing secure APIs, developing responsive UIs, and optimizing databases for performance.",
    projects: [
      {
        title: "College Administration ERP Platform",
        details:
            "Built a secure ERP system with ASP.NET Core MVC and SQL Server, featuring JWT authentication, Razor Pages, and optimized data handling using LINQ.",        url: "#"
      },
      {
        title: "Retail Point of Sale (POS) System",
        details:
            "Developed a full-stack POS app using ASP.NET Core, React, and SQL Server with real-time APIs, responsive UI, and integrated thermal printing.",        url: "#"
      }
    ],
    skills: [
      "C#", "HTML", "CSS", "JavaScript", "ASP.NET Core", "ASP.NET Core MVC",
      "ASP.NET Core Web API", "React", "Redux", "Entity Framework Core",
      "SQL Server", "LINQ", "Tailwind CSS", "jQuery"
    ],
    tools: ["Visual Studio", "Git / GitHub", "Postman", "JWT", "ADO.NET"],
    education: "Bachelors in Computer Engineering — Datta Meghe College of Engineering, Navi Mumbai",
    certifications: [
      "J.P. Morgan Software Engineering Virtual Experience (Forage)",
      "Software Engineer Certificate (HackerRank)"
    ],
    github: "https://github.com/adityamore3",
    resume: "#"
  };

  // ======= Utility functions =======
  function q(tag, props = {}, children = []) {
    const el = document.createElement(tag);
    Object.keys(props).forEach((k) => {
      if (k === "class") el.className = props[k];
      else if (k === "html") el.innerHTML = props[k];
      else if (k === "text") el.textContent = props[k];
      else el.setAttribute(k, props[k]);
    });
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (!c) return;
      if (typeof c === "string") el.appendChild(document.createTextNode(c));
      else el.appendChild(c);
    });
    return el;
  }

  // Prevent double injection
  if (document.getElementById("aditya-chatbot-root")) return;

  // ======= Enhanced Styles (quick actions removed) =======
  const style = document.createElement("style");
  style.id = "aditya-chatbot-styles";
  style.textContent = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

  #aditya-chatbot-root { 
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    z-index: 999999;
  }

  #aditya-chatbot-toggle {
    position: fixed; right: 24px; bottom: 24px;
    width: 64px; height: 64px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
    color: white; font-size: 28px;
    box-shadow: 0 8px 32px rgba(6, 182, 212, 0.4), 0 0 0 0 rgba(6, 182, 212, 0.4);
    cursor: pointer; border: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  #aditya-chatbot-toggle:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 40px rgba(6, 182, 212, 0.5), 0 0 0 8px rgba(6, 182, 212, 0.1);
  }

  #aditya-chatbot-toggle.open {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }

  /* increased height so you can see more messages */
  #aditya-chatbot-panel {
    position: fixed; right: 24px; bottom: 100px;
    width: 480px; max-width: calc(100% - 48px); 
    max-height: calc(100vh - 120px);
    height: 780px; /* increased from 700 to 780 */
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 24px 64px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05);
    display: flex; flex-direction: column;
    overflow: hidden;
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
  }

  #aditya-chatbot-header {
    padding: 20px 20px 16px 20px;
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 16px rgba(6, 182, 212, 0.2);
  }

  .aditya-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .aditya-avatar svg {
    width: 28px;
    height: 28px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .aditya-header-text {
    flex: 1;
  }

  .aditya-header-title {
    font-weight: 700;
    font-size: 16px;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .aditya-header-status {
    font-size: 12px;
    opacity: 0.9;
    margin: 2px 0 0 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .aditya-status-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse 2s ease-in-out infinite;
  }

  .aditya-minimize-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    width: 32px; height: 32px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: 18px;
  }

  .aditya-minimize-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  #aditya-chatbot-messages {
    flex: 1 1 auto;
    padding: 24px;
    overflow-y: auto;
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    scroll-behavior: smooth;
  }

  #aditya-chatbot-messages::-webkit-scrollbar {
    width: 6px;
  }

  #aditya-chatbot-messages::-webkit-scrollbar-track {
    background: transparent;
  }

  #aditya-chatbot-messages::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  #aditya-chatbot-messages::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  .aditya-msg {
    margin: 0 0 16px 0;
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .aditya-msg.bot {
    justify-content: flex-start;
    animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .aditya-msg.user {
    justify-content: flex-end;
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .aditya-msg-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3);
  }

  .aditya-bubble {
    max-width: 80%;
    padding: 14px 18px;
    border-radius: 16px;
    line-height: 1.6;
    font-size: 15px;
    position: relative;
  }

  .aditya-bubble.bot {
    background: #f1f5f9;
    color: #0f172a;
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  }

  .aditya-bubble.user {
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    color: white;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 12px rgba(6, 182, 212, 0.3);
  }

  .aditya-bubble a {
    color: inherit;
    text-decoration: underline;
    opacity: 0.9;
  }

  .aditya-bubble a:hover {
    opacity: 1;
  }

  .aditya-typing {
    display: flex;
    gap: 4px;
    padding: 12px 16px;
  }

  .aditya-typing-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #94a3b8;
    animation: pulse 1.4s ease-in-out infinite;
  }

  .aditya-typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .aditya-typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  #aditya-chatbot-suggestions {
    padding: 0 20px 12px 20px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    background: white;
    border-top: 1px solid #f1f5f9;
  }

  .aditya-suggestion {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%);
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 20px;
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: #0f172a;
    font-weight: 500;
  }

  .aditya-suggestion:hover {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
    border-color: rgba(6, 182, 212, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.15);
  }

  #aditya-chatbot-inputbar {
    padding: 16px 20px;
    display: flex;
    gap: 10px;
    border-top: 1px solid #f1f5f9;
    background: white;
  }

  #aditya-chatbot-input {
    flex: 1;
    padding: 14px 18px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    font-size: 15px;
    transition: all 0.2s;
    font-family: inherit;
    color: #0f172a;
    background: white;
  }

  #aditya-chatbot-input:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  #aditya-chatbot-send {
    padding: 14px 24px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    color: white;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3);
  }

  #aditya-chatbot-send:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(6, 182, 212, 0.4);
  }

  @media (max-width: 480px) {
    #aditya-chatbot-panel {
      right: 16px; left: 16px; bottom: 90px;
      width: auto;
      height: 640px;
      max-height: calc(100vh - 120px);
      border-radius: 16px;
    }
    #aditya-chatbot-toggle {
      right: 16px; bottom: 16px;
      width: 56px; height: 56px;
      font-size: 24px;
    }
    .aditya-bubble {
      max-width: 85%;
      font-size: 14px;
    }
  }
  `;

  // ======= Root markup (quick actions removed) =======
  const root = q("div", { id: "aditya-chatbot-root", "aria-hidden": "false" }, [
    q("button", { id: "aditya-chatbot-toggle", "aria-label": "Open chat", title: "Chat with Aditya" }, ["💬"]),
    q("div", { id: "aditya-chatbot-panel", style: "display:none;" }, [
      q("div", { id: "aditya-chatbot-header", role: "banner" }, [
        q("div", { class: "aditya-avatar" }, [
          q("div", { html: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>` })
        ]),
        q("div", { class: "aditya-header-text" }, [
          q("div", { class: "aditya-header-title" }, ["Aditya's Assistant"]),
          q("div", { class: "aditya-header-status" }, [
            q("span", { class: "aditya-status-dot" }),
            "Online"
          ])
        ]),
        q("button", { class: "aditya-minimize-btn", title: "Minimize" }, ["−"])
      ]),
      q("div", { id: "aditya-chatbot-messages", role: "log", "aria-live": "polite" }, []),
      q("div", { id: "aditya-chatbot-suggestions" }, []),
      q("div", { id: "aditya-chatbot-inputbar" }, [
        q("input", { id: "aditya-chatbot-input", type: "text", placeholder: "Ask me anything about Aditya...", "aria-label": "Type your question" }),
        q("button", { id: "aditya-chatbot-send", title: "Send" }, ["Send ➤"])
      ])
    ])
  ]);

  document.head.appendChild(style);
  document.body.appendChild(root);

  // ======= Q/A rules =======
  const rules = [
    { patterns: ["who are you", "introduce yourself", "your name"], reply: () => `I'm a chatbot assistant for ${profile.name}. I can answer questions about his skills, experience, projects, and more!` },
    { patterns: ["aditya", "name of the owner", "owner"], reply: () => `${profile.name} — ${profile.title} based in ${profile.location}.` },
    { patterns: ["summary", "about", "about aditya", "profile", "bio"], reply: () => profile.summary },
    { patterns: ["experience", "worked", "work", "professional experience", "role"], reply: () => `${profile.currentRole}. ${profile.experience}.` },
    { patterns: ["current role", "job", "company", "avraj", "aviraj"], reply: () => profile.currentRole },
    { patterns: ["project", "projects", "erp", "pos", "college", "pos system"], reply: () => `${profile.projects.map(p => `${p.title}: ${p.details}`).join("\n\n")}` },
    { patterns: ["skills", "tech", "technologies", "stack", "languages"], reply: () => `Key skills: ${profile.skills.join(", ")}.` },
    { patterns: ["tools", "tool", "technologies used", "tools & technologies"], reply: () => `Tools & tech: ${profile.tools.join(", ")}.` },
    { patterns: ["education", "degree", "college", "school"], reply: () => profile.education },
    { patterns: ["certification", "certifications", "courses"], reply: () => `Certifications: ${profile.certifications.join(" • ")}` },
    { patterns: ["email", "contact", "reach", "hire", "get in touch"], reply: () => `You can reach Aditya at ${profile.email}.` },
    { patterns: ["github", "git"], reply: () => `GitHub: ${profile.github}` },
    { patterns: ["resume", "cv"], reply: () => profile.resume !== "#" ? `Resume: ${profile.resume}` : "Resume link not provided yet." },
    { patterns: ["location", "based", "where", "city", "mumbai"], reply: () => `${profile.name} is based in ${profile.location}.` }
  ];

  const fallbackReplies = [
    "I'm not sure about that. Try asking about skills, experience, projects, or contact info!",
    "Hmm, I don't have that info yet. Ask me about Aditya's professional background, skills, or projects."
  ];

  const suggested = [
    "Tell me about Aditya",
    "What are his skills?",
    "Show me his projects",
    "How to contact him?"
  ];

  // ======= DOM refs =======
  const toggle = document.getElementById("aditya-chatbot-toggle");
  const panel = document.getElementById("aditya-chatbot-panel");
  const messagesEl = document.getElementById("aditya-chatbot-messages");
  const sendBtn = document.getElementById("aditya-chatbot-send");
  const inputEl = document.getElementById("aditya-chatbot-input");
  const suggestionsEl = document.getElementById("aditya-chatbot-suggestions");
  const minimizeBtn = document.querySelector(".aditya-minimize-btn");

  // ======= UI helpers =======
  function appendMessage(text, who = "bot") {
    const wrapper = q("div", { class: `aditya-msg ${who}` });

    if (who === "bot") {
      const avatar = q("div", { class: "aditya-msg-avatar" }, ["🤖"]);
      const bubble = q("div", { class: "aditya-bubble bot" });

      if (typeof text === "string" && text.includes("\n")) {
        text.split("\n").forEach((line, idx) => {
          bubble.appendChild(document.createTextNode(line));
          if (idx < text.split("\n").length - 1) bubble.appendChild(q("br"));
        });
      } else {
        bubble.textContent = text;
      }

      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
    } else {
      const bubble = q("div", { class: "aditya-bubble user" });
      bubble.textContent = text;
      wrapper.appendChild(bubble);
    }

    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const wrapper = q("div", { class: "aditya-msg bot", id: "typing-indicator" });
    const avatar = q("div", { class: "aditya-msg-avatar" }, ["🤖"]);
    const bubble = q("div", { class: "aditya-bubble bot" });
    const typing = q("div", { class: "aditya-typing" }, [
      q("div", { class: "aditya-typing-dot" }),
      q("div", { class: "aditya-typing-dot" }),
      q("div", { class: "aditya-typing-dot" })
    ]);
    bubble.appendChild(typing);
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
  }

  function answerQuestion(text) {
    const qtext = (text || "").toLowerCase();
    for (const rule of rules) {
      for (const p of rule.patterns) {
        if (qtext.includes(p)) {
          try {
            return rule.reply();
          } catch (e) {
            return fallbackReplies[0];
          }
        }
      }
    }
    if (qtext.match(/who|what|name/)) return `This chatbot represents ${profile.name}, a talented Software Engineer from Mumbai!`;
    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  }

  function handleUserText(raw) {
    const text = (raw || "").trim();
    if (!text) return;
    appendMessage(text, "user");
    showTyping();
    const reply = answerQuestion(text);
    setTimeout(() => {
      hideTyping();
      appendMessage(reply, "bot");
    }, 600 + Math.random() * 400);
  }

  // ======= Event listeners =======
  sendBtn.addEventListener("click", () => {
    handleUserText(inputEl.value);
    inputEl.value = "";
    inputEl.focus();
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleUserText(inputEl.value);
      inputEl.value = "";
    }
  });

  toggle.addEventListener("click", () => {
    const isOpen = panel.style.display !== "none";
    if (isOpen) {
      panel.style.display = "none";
      toggle.textContent = "💬";
      toggle.classList.remove("open");
    } else {
      panel.style.display = "flex";
      toggle.textContent = "✕";
      toggle.classList.add("open");
      inputEl.focus();
    }
  });

  minimizeBtn.addEventListener("click", () => {
    panel.style.display = "none";
    toggle.textContent = "💬";
    toggle.classList.remove("open");
  });

  // Suggestions
  function makeSuggestionBtn(text) {
    const btn = q("button", { class: "aditya-suggestion", type: "button" }, [text]);
    btn.addEventListener("click", () => {
      inputEl.value = text;
      handleUserText(text);
    });
    return btn;
  }
  suggested.forEach((s) => suggestionsEl.appendChild(makeSuggestionBtn(s)));

  // Initial greeting
  setTimeout(() => {
    appendMessage(`Hey there! 👋 I'm Aditya's assistant bot. I can tell you about his skills, projects, experience, and how to reach him. What would you like to know?`, "bot");
  }, 300);

  // Close with Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.style.display !== "none") {
      panel.style.display = "none";
      toggle.textContent = "💬";
      toggle.classList.remove("open");
    }
  });

  // Public API
  window.AdityaChatbot = {
    updateProfile(newProfile) {
      Object.assign(profile, newProfile || {});
    },
    open() {
      panel.style.display = "flex";
      toggle.textContent = "✕";
      toggle.classList.add("open");
      inputEl.focus();
    },
    close() {
      panel.style.display = "none";
      toggle.textContent = "💬";
      toggle.classList.remove("open");
    }
  };
})();
