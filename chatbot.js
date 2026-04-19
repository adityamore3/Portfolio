/* chatbot.js — AI-Powered Version (Claude backend)
   Drop this file and include <script src="chatbot.js"></script> before </body>.
   Requires: the /v1/messages proxy to be available (handled by claude.ai environment,
   or replace the fetch URL with your own backend that forwards to Anthropic).
*/
(function () {

  // ============================================================
  // YOUR PROFILE — Edit everything here
  // ============================================================
  const profile = {
    name: "ADITYA MORE",
    title: "Software Engineer",
    location: "Mumbai, India",
    email: "adieeoffical@gmail.com",
    github: "https://github.com/adityamore3",
    resume: "#",   // Replace with your actual resume URL

    // ---------- Experience ----------
    // Used to auto-compute how long you've been a professional engineer
    careerStartDate: "2024-06-10",  // Adjust to when you first started working/freelancing

    currentRole: {
      company: "Quinnox Consultancy Services Limited",
      title: "Consultant",
      startDate: "December 2025",
      responsibilities: [
        "Building and maintaining full-stack web applications using ASP.NET Core and React",
        "Designing and securing RESTful APIs with JWT authentication",
        "Optimizing SQL Server databases using LINQ and EF Core",
        "Developing responsive UIs with Tailwind CSS and jQuery",
        "Collaborating with cross-functional teams on enterprise solutions"
      ]
    },

    previousExperience: [
      {
        company: "Aviraj Innovations Pvt Ltd",
        title: "Software Engineer",
        duration: "June 2024 – November 2025 (~1.5 years)",
        details: "Worked on freelance web projects involving ASP.NET Core, JavaScript, and SQL Server. Built custom web apps for small businesses and honed skills in API design, database modeling, and frontend development."
      }
      // Add more previous roles here if any, e.g.:
      // {
      //   company: "Some Company",
      //   title: "Intern",
      //   duration: "...",
      //   details: "..."
      // }
    ],

    // ---------- Skills ----------
    skills: [
      "C#", "HTML", "CSS", "JavaScript", "ASP.NET Core", "ASP.NET Core MVC",
      "ASP.NET Core Web API","Azure", "React", "Redux", "Entity Framework Core",
      "SQL Server", "LINQ", "Tailwind CSS", "jQuery"
    ],
    tools: ["Visual Studio", "Git / GitHub", "Postman", "JWT", "ADO.NET"],

    // ---------- Projects ----------
    projects: [
      {
        title: "College Administration ERP Platform",
        tech: "ASP.NET Core MVC, SQL Server, JWT, Razor Pages, LINQ",
        details: "Built a secure ERP system for college administration featuring JWT authentication, role-based access control, Razor Pages UI, and optimized data handling using LINQ and Entity Framework Core.",
        url: "#"
      },
      {
        title: "Retail Point of Sale (POS) System",
        tech: "ASP.NET Core, React, SQL Server, REST APIs",
        details: "Developed a full-stack POS application with real-time REST APIs, a responsive React frontend, and integrated thermal printer support. Handled inventory, billing, and reporting modules.",
        url: "#"
      }
    ],

    // ---------- Education ----------
    education: {
      degree: "Bachelor of Engineering in Computer Engineering",
      college: "Datta Meghe College of Engineering, Navi Mumbai",
      year: "2022"
    },

    certifications: [
      "J.P. Morgan Software Engineering Virtual Experience (Forage)",
      "Software Engineer Certificate (HackerRank)"
    ],

    // ---------- Hobbies & Interests (EDIT THIS!) ----------
    hobbies: [
      "Gaming — loves playing story-driven and strategy games in free time",
      "Football — passionate fan and casual player",
      "Music — enjoys listening to music while coding, especially lo-fi and hip-hop",
      "Tech exploration — regularly reads tech blogs, follows new frameworks and tools",
      "Building side projects — always experimenting with new ideas outside of work"
    ],

    // ---------- Personal traits ----------
    personality: [
      "Detail-oriented and methodical in problem-solving",
      "Always eager to learn new technologies",
      "Collaborative team player who communicates clearly",
      "Self-motivated with a strong work ethic",
      "Prefers clean, maintainable code over quick hacks"
    ],

    // ---------- Open to ----------
    openTo: "Aditya is open to full-time opportunities, freelance projects, and collaborations in Full Stack Web Development, especially roles involving ASP.NET Core, React, or modern web technologies."
  };

  // ============================================================
  // Auto-compute total experience duration
  // ============================================================
  function computeExperience() {
    const start = new Date(profile.careerStartDate);
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const rem = months % 12;
    if (years === 0) return `${rem} months`;
    if (rem === 0) return `${years} year${years > 1 ? "s" : ""}`;
    return `${years} year${years > 1 ? "s" : ""} and ${rem} month${rem > 1 ? "s" : ""}`;
  }

  // ============================================================
  // Build system prompt from profile
  // ============================================================
  function buildSystemPrompt() {
    const totalExp = computeExperience();
    return `You are a friendly and knowledgeable AI assistant for ${profile.name}, a ${profile.title} based in ${profile.location}. 
Your job is to answer questions from visitors to Aditya's portfolio website. 
Be warm, conversational, concise, and helpful. Use natural language. You can use light emoji where appropriate.
Never make up information — only use what's provided below.
If asked something you don't know, say so honestly and suggest they contact Aditya directly.

=== PROFILE ===

NAME: ${profile.name}
TITLE: ${profile.title}
LOCATION: ${profile.location}
EMAIL: ${profile.email}
GITHUB: ${profile.github}
RESUME: ${profile.resume !== "#" ? profile.resume : "Not yet published publicly"}
TOTAL PROFESSIONAL EXPERIENCE: ${totalExp} (since ${profile.careerStartDate})
OPEN TO: ${profile.openTo}

=== CURRENT ROLE ===
Company: ${profile.currentRole.company}
Title: ${profile.currentRole.title}
Start: ${profile.currentRole.startDate}
Responsibilities:
${profile.currentRole.responsibilities.map(r => "- " + r).join("\n")}

=== PREVIOUS EXPERIENCE ===
${profile.previousExperience.map(p =>
  `Company: ${p.company}\nTitle: ${p.title}\nDuration: ${p.duration}\nDetails: ${p.details}`
).join("\n\n")}

=== SKILLS ===
Technical: ${profile.skills.join(", ")}
Tools: ${profile.tools.join(", ")}

=== PROJECTS ===
${profile.projects.map(p =>
  `• ${p.title}\n  Tech: ${p.tech}\n  Details: ${p.details}`
).join("\n\n")}

=== EDUCATION ===
${profile.education.degree} — ${profile.education.college} (${profile.education.year})

=== CERTIFICATIONS ===
${profile.certifications.join("\n")}

=== HOBBIES & INTERESTS ===
${profile.hobbies.join("\n")}

=== PERSONALITY ===
${profile.personality.join("\n")}

Keep answers short (2–5 sentences) unless a detailed answer is clearly needed. 
Do not add unnecessary disclaimers or filler phrases. Be direct and helpful.`;
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
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  #aditya-chatbot-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    z-index: 999999;
  }

  #aditya-chatbot-toggle {
    position: fixed; right: 24px; bottom: 24px;
    width: 64px; height: 64px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
    color: white; font-size: 28px;
    box-shadow: 0 8px 32px rgba(6, 182, 212, 0.4);
    cursor: pointer; border: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  #aditya-chatbot-toggle:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 12px 40px rgba(6, 182, 212, 0.5); }
  #aditya-chatbot-toggle.open { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }

  #aditya-chatbot-panel {
    position: fixed; right: 24px; bottom: 100px;
    width: 480px; max-width: calc(100% - 48px);
    max-height: calc(100vh - 120px); height: 780px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 24px 64px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05);
    display: flex; flex-direction: column;
    overflow: hidden;
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  #aditya-chatbot-header {
    padding: 20px 20px 16px 20px;
    background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%);
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
    color: white; display: flex; align-items: center; gap: 12px;
    box-shadow: 0 4px 16px rgba(6, 182, 212, 0.2);
  }

  .aditya-avatar {
    width: 48px; height: 48px; border-radius: 50%;
    background: rgba(255,255,255,0.25); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; border: 2px solid rgba(255,255,255,0.4);
  }

  .aditya-header-text { flex: 1; }
  .aditya-header-title { font-weight: 700; font-size: 16px; margin: 0; }
  .aditya-header-status { font-size: 11px; opacity: 0.9; margin: 3px 0 0 0; display: flex; align-items: center; gap: 6px; }
  .aditya-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: pulse 2s ease-in-out infinite; }
  .aditya-ai-badge {
    background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.35);
    border-radius: 12px; font-size: 11px; padding: 3px 9px; font-weight: 600;
    letter-spacing: 0.02em;
  }
  .aditya-minimize-btn {
    background: rgba(255,255,255,0.2); border: none;
    width: 32px; height: 32px; border-radius: 8px; color: white;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; font-size: 18px; margin-left: 4px;
  }
  .aditya-minimize-btn:hover { background: rgba(255,255,255,0.3); }

  #aditya-chatbot-messages {
    flex: 1 1 auto; padding: 24px; overflow-y: auto;
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    scroll-behavior: smooth;
  }
  #aditya-chatbot-messages::-webkit-scrollbar { width: 5px; }
  #aditya-chatbot-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

  .aditya-msg { margin: 0 0 16px 0; display: flex; align-items: flex-end; gap: 8px; }
  .aditya-msg.bot { justify-content: flex-start; animation: slideIn 0.35s ease; }
  .aditya-msg.user { justify-content: flex-end; animation: slideInRight 0.35s ease; }

  .aditya-msg-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, #06b6d4, #7c3aed);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(6,182,212,0.3);
  }

  .aditya-bubble {
    max-width: 80%; padding: 13px 17px; border-radius: 16px;
    line-height: 1.65; font-size: 14.5px; position: relative;
  }
  .aditya-bubble.bot {
    background: #f1f5f9; color: #0f172a; border-bottom-left-radius: 4px;
    box-shadow: 0 2px 8px rgba(15,23,42,0.06);
  }
  .aditya-bubble.user {
    background: linear-gradient(135deg, #06b6d4, #7c3aed); color: white;
    border-bottom-right-radius: 4px; box-shadow: 0 2px 12px rgba(6,182,212,0.3);
  }
  .aditya-bubble a { color: inherit; text-decoration: underline; opacity: 0.85; }

  .aditya-typing { display: flex; gap: 4px; padding: 10px 14px; }
  .aditya-typing-dot { width: 8px; height: 8px; border-radius: 50%; background: #94a3b8; animation: pulse 1.4s ease-in-out infinite; }
  .aditya-typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .aditya-typing-dot:nth-child(3) { animation-delay: 0.4s; }

  #aditya-chatbot-suggestions {
    padding: 10px 18px 12px; display: flex; gap: 7px; flex-wrap: wrap;
    background: white; border-top: 1px solid #f1f5f9;
  }
  .aditya-suggestion {
    background: rgba(6,182,212,0.07); border: 1px solid rgba(6,182,212,0.2);
    border-radius: 20px; padding: 7px 13px; font-size: 12.5px; cursor: pointer;
    transition: all 0.2s; color: #0f172a; font-weight: 500;
  }
  .aditya-suggestion:hover {
    background: rgba(6,182,212,0.14); border-color: rgba(6,182,212,0.4);
    transform: translateY(-2px); box-shadow: 0 4px 12px rgba(6,182,212,0.12);
  }

  #aditya-chatbot-inputbar { padding: 14px 18px; display: flex; gap: 10px; border-top: 1px solid #f1f5f9; background: white; }
  #aditya-chatbot-input {
    flex: 1; padding: 13px 16px; border-radius: 12px; border: 2px solid #e2e8f0;
    font-size: 14.5px; transition: all 0.2s; font-family: inherit; color: #0f172a; background: white;
  }
  #aditya-chatbot-input:focus { outline: none; border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.1); }
  #aditya-chatbot-input:disabled { opacity: 0.6; }

  #aditya-chatbot-send {
    padding: 13px 22px; border-radius: 12px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #06b6d4, #7c3aed); color: white;
    font-weight: 600; font-size: 14px; transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(6,182,212,0.3); white-space: nowrap;
  }
  #aditya-chatbot-send:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(6,182,212,0.4); }
  #aditya-chatbot-send:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .aditya-error-bubble {
    background: #fef2f2; border: 1px solid #fecaca; color: #991b1b;
    border-radius: 12px; padding: 10px 14px; font-size: 13px; margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    #aditya-chatbot-panel { right: 12px; left: 12px; bottom: 86px; width: auto; height: 640px; border-radius: 16px; }
    #aditya-chatbot-toggle { right: 16px; bottom: 16px; width: 56px; height: 56px; font-size: 22px; }
    .aditya-bubble { max-width: 86%; font-size: 14px; }
  }
  `;

  // ============================================================
  // DOM structure
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
            "Powered by Claude AI"
          ])
        ]),
        el("span", { class: "aditya-ai-badge" }, ["AI"]),
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
  // State
  // ============================================================
  let conversationHistory = [];  // Full message history for context
  let isBusy = false;

  const toggle    = document.getElementById("aditya-chatbot-toggle");
  const panel     = document.getElementById("aditya-chatbot-panel");
  const messagesEl= document.getElementById("aditya-chatbot-messages");
  const sendBtn   = document.getElementById("aditya-chatbot-send");
  const inputEl   = document.getElementById("aditya-chatbot-input");
  const suggestEl = document.getElementById("aditya-chatbot-suggestions");
  const minimizeBtn = document.querySelector(".aditya-minimize-btn");

  // ============================================================
  // UI helpers
  // ============================================================
  function appendMessage(text, who) {
    const wrapper = el("div", { class: `aditya-msg ${who}` });

    if (who === "bot") {
      const avatar = el("div", { class: "aditya-msg-avatar" }, ["🤖"]);
      const bubble = el("div", { class: "aditya-bubble bot" });
      // Render newlines
      text.split("\n").forEach((line, i, arr) => {
        bubble.appendChild(document.createTextNode(line));
        if (i < arr.length - 1) bubble.appendChild(el("br"));
      });
      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
    } else {
      const bubble = el("div", { class: "aditya-bubble user", text: text });
      wrapper.appendChild(bubble);
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

  function setLoading(val) {
    isBusy = val;
    sendBtn.disabled = val;
    inputEl.disabled = val;
    sendBtn.textContent = val ? "..." : "Send ➤";
  }

  // ============================================================
  // Claude API call
  // ============================================================
  async function askClaude(userText) {
    conversationHistory.push({ role: "user", content: userText });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: buildSystemPrompt(),
        messages: conversationHistory
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    const reply = data.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n")
      .trim();

    conversationHistory.push({ role: "assistant", content: reply });
    return reply;
  }

  // ============================================================
  // Handle user input
  // ============================================================
  async function handleUserText(raw) {
    const text = (raw || "").trim();
    if (!text || isBusy) return;

    appendMessage(text, "user");
    setLoading(true);
    showTyping();

    try {
      const reply = await askClaude(text);
      hideTyping();
      appendMessage(reply, "bot");
    } catch (err) {
      hideTyping();
      // Graceful fallback
      const fallback = el("div", { class: "aditya-error-bubble" });
      fallback.textContent = `Hmm, I couldn't connect right now. Please try again or email Aditya at ${profile.email}. (${err.message})`;
      messagesEl.appendChild(fallback);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      // Roll back failed user message from history
      conversationHistory.pop();
    } finally {
      setLoading(false);
      inputEl.focus();
    }
  }

  // ============================================================
  // Events
  // ============================================================
  sendBtn.addEventListener("click", () => {
    const t = inputEl.value;
    inputEl.value = "";
    handleUserText(t);
  });

  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const t = inputEl.value;
      inputEl.value = "";
      handleUserText(t);
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

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && panel.style.display !== "none") {
      panel.style.display = "none";
      toggle.textContent = "💬";
      toggle.classList.remove("open");
    }
  });

  // ============================================================
  // Suggestion chips
  // ============================================================
  const suggested = [
    "Tell me about Aditya",
    "What are his hobbies?",
    "Show me his projects",
    "Previous experience?",
    "How to contact him?"
  ];

  suggested.forEach(s => {
    const btn = el("button", { class: "aditya-suggestion", type: "button", text: s });
    btn.addEventListener("click", () => {
      if (isBusy) return;
      handleUserText(s);
    });
    suggestEl.appendChild(btn);
  });

  // ============================================================
  // Initial greeting
  // ============================================================
  setTimeout(() => {
    const exp = computeExperience();
    appendMessage(
      `Hey there! 👋 I'm Aditya's AI assistant — I can tell you about his ${exp} of experience, skills, projects, hobbies, and how to reach him. What would you like to know?`,
      "bot"
    );
  }, 300);

  // ============================================================
  // Public API
  // ============================================================
  window.AdityaChatbot = {
    open()  { panel.style.display = "flex"; toggle.classList.add("open"); toggle.textContent = "✕"; inputEl.focus(); },
    close() { panel.style.display = "none"; toggle.classList.remove("open"); toggle.textContent = "💬"; },
    clearHistory() { conversationHistory = []; messagesEl.innerHTML = ""; },
    updateProfile(updates) { Object.assign(profile, updates || {}); }
  };

})();
