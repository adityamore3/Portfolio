/* chatbot.js — Aditya More's Portfolio Chatbot (v3)
   Drop this file and include <script src="chatbot.js"></script> before </body>.
   Now powered by Claude AI for dynamic, intelligent responses.
*/
(function () {

  if (document.getElementById("aditya-chatbot-root")) return;

  // ============================================================
  // PROFILE DATA
  // ============================================================
  const PROFILE_CONTEXT = `
You are a friendly, professional chatbot assistant for Aditya More's portfolio website. You speak in first person about Aditya (e.g. "Aditya has..." or "He specializes in...") and keep answers concise, warm, and helpful. Use emojis sparingly and naturally.

Here is everything you need to know about Aditya:

NAME: Aditya More
TITLE: Software Engineer
LOCATION: Mumbai, India
EMAIL: adieeoffical@gmail.com
GITHUB: https://github.com/adityamore3

EXPERIENCE: ~2 years total (June 2024 – Present)

CURRENT ROLE:
- Company: Quinnox
- Title: Software Engineer
- Duration: December 2025 – Present
- Work: Enterprise-level full-stack web applications using ASP.NET Core and React, scalable REST APIs, high-quality software solutions for clients.

PREVIOUS ROLE:
- Company: Aviraj Innovations Pvt Ltd
- Title: Software Engineer
- Duration: June 2024 – November 2025 (1 year 6 months)
- Work: Full-stack web apps with ASP.NET Core and React, secure REST APIs with JWT authentication, SQL Server optimisation, responsive UIs with Tailwind CSS and jQuery.

SKILLS:
- Languages: C#, HTML, CSS, JavaScript
- Frameworks: ASP.NET Core, ASP.NET Core MVC, ASP.NET Core Web API, React, Redux, Entity Framework Core
- Database: SQL Server, LINQ, ADO.NET
- Styling: Tailwind CSS, jQuery
- Tools: Visual Studio, Git & GitHub, Postman, JWT

PROJECTS:
1. College Administration ERP Platform
   Tech: ASP.NET Core MVC, SQL Server, JWT, Razor Pages, LINQ
   Details: Secure college ERP system with JWT authentication, role-based access control, Razor Pages UI, LINQ and Entity Framework Core for optimised data handling.

2. Retail Point of Sale (POS) System
   Tech: ASP.NET Core, React, SQL Server, REST APIs
   Details: Full-stack POS app with real-time REST APIs, responsive React frontend, thermal printer integration, inventory/billing/reporting modules.

EDUCATION: Bachelor of Engineering in Computer Engineering — Datta Meghe College of Engineering, Navi Mumbai (2022)

CERTIFICATIONS:
- J.P. Morgan Software Engineering Virtual Experience (Forage)
- Software Engineer Certificate (HackerRank)

HOBBIES:
- Gaming (story-driven and strategy games)
- Football (fan and casual player)
- Music (lo-fi and hip-hop while coding)
- Tech exploration (blogs, new frameworks)
- Building side projects

AVAILABILITY: Open to full-time roles, freelance projects, and collaborations — especially in Full Stack Web Development with ASP.NET Core, React, or modern web technologies.

PERSONALITY TRAITS: Detail-oriented, methodical, eager learner, collaborative, self-motivated, writes clean maintainable code.

IMPORTANT RULES:
- Keep responses concise (2-4 sentences usually). Expand only when asked for details.
- Never make up information not listed above.
- If asked about resume, say it's available on request at adieeoffical@gmail.com.
- Be warm, professional, and human — not robotic.
- Don't use markdown headers (#, ##) in responses. Use plain text with line breaks.
- Use bullet points sparingly, only when listing multiple items clearly.
`;

  // ============================================================
  // CONVERSATION HISTORY
  // ============================================================
  const conversationHistory = [];

  async function getAIReply(userMessage) {
    conversationHistory.push({ role: "user", content: userMessage });

    const messages = conversationHistory.map(m => ({ role: m.role, content: m.content }));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: PROFILE_CONTEXT,
        messages
      })
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const reply = data.content.map(c => c.text || "").join("");

    conversationHistory.push({ role: "assistant", content: reply });
    return reply;
  }

  // ============================================================
  // QUICK SUGGESTION CHIPS
  // ============================================================
  const suggestions = [
    { label: "Career timeline", query: "Show me Aditya's career timeline" },
    { label: "Tech skills", query: "What are his technical skills?" },
    { label: "Projects", query: "Tell me about his projects" },
    { label: "Current role", query: "Where does he work now?" },
    { label: "Hobbies", query: "What are his hobbies?" },
    { label: "Contact", query: "How do I contact Aditya?" }
  ];

  // ============================================================
  // STYLES
  // ============================================================
  const style = document.createElement("style");
  style.id = "aditya-chatbot-styles-v3";
  style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Instrument+Sans:wght@400;500&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.85); }
    50%       { opacity: 1;   transform: scale(1); }
  }
  @keyframes chipIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  #am-chatbot-root {
    font-family: 'Instrument Sans', system-ui, sans-serif;
    position: fixed;
    z-index: 999999;
    bottom: 0; right: 0;
  }

  /* ── Toggle Button ── */
  #am-toggle {
    position: fixed;
    right: 24px; bottom: 24px;
    width: 56px; height: 56px;
    border-radius: 16px;
    background: #0A0A0A;
    border: none;
    color: white;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15);
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
  }
  #am-toggle:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  #am-toggle svg { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  #am-toggle.open svg { transform: rotate(45deg); }

  /* ── Panel ── */
  #am-panel {
    position: fixed;
    right: 24px; bottom: 92px;
    width: 420px;
    max-width: calc(100vw - 32px);
    height: 620px;
    max-height: calc(100svh - 110px);
    background: #FAFAF9;
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 24px 64px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.06);
    display: flex; flex-direction: column;
    overflow: hidden;
    animation: fadeUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  #am-panel.hidden { display: none; }

  /* ── Header ── */
  #am-header {
    padding: 14px 16px;
    background: #0A0A0A;
    display: flex; align-items: center; gap: 10px;
    flex-shrink: 0;
  }
  .am-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .am-header-info { flex: 1; min-width: 0; }
  .am-header-name {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 600; font-size: 13px; color: #F5F5F0;
    letter-spacing: -0.01em;
  }
  .am-header-sub {
    font-size: 11px; color: rgba(255,255,255,0.4);
    display: flex; align-items: center; gap: 5px;
    margin-top: 1px;
  }
  .am-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #4ade80;
    animation: pulse 2.5s ease-in-out infinite;
  }
  .am-close {
    width: 28px; height: 28px; border-radius: 8px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .am-close:hover { background: rgba(255,255,255,0.14); color: #fff; }

  /* ── Messages ── */
  #am-messages {
    flex: 1 1 auto;
    padding: 16px 14px;
    overflow-y: auto;
    background: #FAFAF9;
    display: flex; flex-direction: column; gap: 2px;
    scroll-behavior: smooth;
  }
  #am-messages::-webkit-scrollbar { width: 3px; }
  #am-messages::-webkit-scrollbar-thumb { background: #E5E5E0; border-radius: 99px; }

  .am-row {
    display: flex; align-items: flex-end; gap: 8px;
    animation: msgIn 0.25s ease forwards;
    margin-bottom: 4px;
  }
  .am-row.bot  { justify-content: flex-start; }
  .am-row.user { justify-content: flex-end; }
  .am-row.user + .am-row.user,
  .am-row.bot  + .am-row.bot  { margin-top: -2px; }

  .am-bot-ico {
    width: 26px; height: 26px; border-radius: 8px;
    background: #0A0A0A;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; flex-shrink: 0; align-self: flex-end;
  }

  .am-bubble {
    max-width: 80%; padding: 10px 13px;
    border-radius: 16px; font-size: 13.5px;
    line-height: 1.6; position: relative;
  }
  .am-bubble.bot {
    background: #fff;
    color: #1A1A18;
    border-bottom-left-radius: 4px;
    border: 1px solid rgba(0,0,0,0.07);
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    white-space: pre-wrap;
  }
  .am-bubble.user {
    background: #0A0A0A;
    color: #F5F5F0;
    border-bottom-right-radius: 4px;
    font-weight: 500;
  }
  .am-time {
    font-size: 10px; color: #B8B8B0;
    margin-top: 3px; padding: 0 4px;
    align-self: flex-end;
  }

  /* Copy on hover */
  .am-bubble.bot:hover::after {
    content: 'copy';
    position: absolute; top: 6px; right: 8px;
    font-size: 10px; color: #B8B8B0;
    cursor: pointer; text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ── Typing indicator ── */
  .am-typing {
    display: flex; gap: 4px; padding: 4px 2px;
    align-items: center;
  }
  .am-typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: #C8C8C0;
    animation: pulse 1.1s ease-in-out infinite;
  }
  .am-typing span:nth-child(2) { animation-delay: 0.18s; }
  .am-typing span:nth-child(3) { animation-delay: 0.36s; }

  /* ── Profile Hero Card ── */
  .am-hero-card {
    background: #0A0A0A;
    border-radius: 14px;
    padding: 14px 16px;
    color: #F5F5F0;
    margin: 2px 0 8px 34px;
    position: relative;
    overflow: hidden;
  }
  .am-hero-card::before {
    content: '';
    position: absolute; top: -30px; right: -30px;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%);
    pointer-events: none;
  }
  .am-hero-name {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700; font-size: 16px;
    letter-spacing: -0.02em; margin-bottom: 2px;
  }
  .am-hero-title {
    font-size: 12px; color: rgba(255,255,255,0.5);
    margin-bottom: 10px;
  }
  .am-hero-row {
    display: flex; gap: 6px; flex-wrap: wrap;
  }
  .am-tag {
    font-size: 11px; padding: 4px 9px;
    border-radius: 99px;
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
    display: flex; align-items: center; gap: 4px;
  }
  .am-tag.accent {
    background: rgba(99,102,241,0.25);
    color: #a5b4fc;
  }

  /* ── Timeline Widget ── */
  .am-timeline {
    margin: 2px 0 8px 34px;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 14px;
    padding: 14px 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .am-tl-header {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 11px; font-weight: 600;
    color: #8C8C88; letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 12px; display: flex; justify-content: space-between;
    align-items: center;
  }
  .am-tl-badge {
    font-size: 11px; font-weight: 600;
    background: #f0fdf4; color: #16a34a;
    padding: 2px 8px; border-radius: 99px;
    text-transform: none; letter-spacing: 0;
  }
  .am-tl-item { margin-bottom: 12px; }
  .am-tl-item:last-child { margin-bottom: 0; }
  .am-tl-top {
    display: flex; justify-content: space-between;
    align-items: baseline; margin-bottom: 5px;
  }
  .am-tl-co {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 13px; font-weight: 600; color: #1A1A18;
  }
  .am-tl-dur {
    font-size: 11px; color: #8C8C88;
  }
  .am-tl-role {
    font-size: 11.5px; color: #6C6C68; margin-bottom: 5px;
  }
  .am-tl-bar-bg {
    height: 4px; background: #F0F0EB; border-radius: 99px; overflow: hidden;
  }
  .am-tl-bar-fill {
    height: 100%; border-radius: 99px;
    transition: width 0.9s cubic-bezier(0.34,1.56,0.64,1);
  }
  .am-tl-dates {
    font-size: 10.5px; color: #B8B8B0; margin-top: 3px;
  }

  /* ── Suggestions ── */
  #am-chips {
    padding: 10px 12px 12px;
    display: flex; gap: 6px; flex-wrap: wrap;
    background: #FAFAF9;
    border-top: 1px solid rgba(0,0,0,0.05);
    flex-shrink: 0;
  }
  .am-chip {
    background: #fff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 99px;
    padding: 5px 12px;
    font-size: 12px; font-weight: 500;
    color: #4A4A46;
    cursor: pointer;
    transition: all 0.15s ease;
    animation: chipIn 0.3s ease forwards;
    opacity: 0;
  }
  .am-chip:hover {
    background: #0A0A0A; color: #F5F5F0;
    border-color: #0A0A0A;
    transform: translateY(-1px);
  }

  /* ── Input bar ── */
  #am-inputbar {
    padding: 10px 12px;
    display: flex; gap: 8px; align-items: center;
    border-top: 1px solid rgba(0,0,0,0.06);
    background: #fff;
    flex-shrink: 0;
  }
  #am-input {
    flex: 1; padding: 9px 13px;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.1);
    font-size: 13.5px; font-family: 'Instrument Sans', sans-serif;
    color: #1A1A18; background: #FAFAF9;
    transition: border-color 0.15s, box-shadow 0.15s;
    caret-color: #6366f1;
    outline: none;
  }
  #am-input::placeholder { color: #B8B8B0; }
  #am-input:focus {
    border-color: rgba(99,102,241,0.4);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
    background: #fff;
  }
  #am-send {
    width: 38px; height: 38px; border-radius: 11px;
    background: #0A0A0A; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.15s;
  }
  #am-send:hover { transform: scale(1.08); background: #222; }
  #am-send:active { transform: scale(0.95); }
  #am-send svg { color: white; }

  #am-send.loading {
    background: #E5E5E0;
    pointer-events: none;
  }

  /* ── Error ── */
  .am-error {
    font-size: 12px; color: #ef4444; padding: 4px 8px;
    background: #fef2f2; border-radius: 8px;
    border: 1px solid #fecaca;
    margin: 2px 0 6px 34px;
  }

  @media (max-width: 480px) {
    #am-panel {
      right: 10px; left: 10px; bottom: 78px;
      width: auto; height: 580px; border-radius: 18px;
    }
    #am-toggle { right: 16px; bottom: 16px; }
  }
  `;

  // ============================================================
  // HELPERS
  // ============================================================
  function now() {
    return new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
  }

  function monthsBetween(start, end) {
    const e = end || new Date();
    return (e.getFullYear() - start.getFullYear()) * 12 + (e.getMonth() - start.getMonth());
  }

  function formatDuration(months) {
    const y = Math.floor(months / 12), m = months % 12;
    if (y === 0) return `${m}mo`;
    if (m === 0) return `${y}yr`;
    return `${y}yr ${m}mo`;
  }

  function fmtDate(d) {
    if (!d) return "Present";
    return d.toLocaleString("default", { month: "short", year: "numeric" });
  }

  function totalExp() {
    const tot = monthsBetween(new Date("2024-06-01"), new Date());
    const y = Math.floor(tot / 12), m = tot % 12;
    if (y === 0) return `${m} months`;
    if (m === 0) return `${y} years`;
    return `${y} yr ${m} mo`;
  }

  const roles = [
    {
      company: "Quinnox", title: "Software Engineer",
      start: new Date("2025-12-01"), end: null,
      color: "#6366f1", weight: 35
    },
    {
      company: "Aviraj Innovations", title: "Software Engineer",
      start: new Date("2024-06-01"), end: new Date("2025-11-30"),
      color: "#8b5cf6", weight: 65
    }
  ];

  // ============================================================
  // WIDGET BUILDERS
  // ============================================================
  function heroCard() {
    return `
    <div class="am-hero-card">
      <div class="am-hero-name">Aditya More</div>
      <div class="am-hero-title">Software Engineer · Mumbai, India</div>
      <div class="am-hero-row">
        <span class="am-tag accent">⚡ ${totalExp()} exp</span>
        <span class="am-tag">ASP.NET Core</span>
        <span class="am-tag">React</span>
        <span class="am-tag">SQL Server</span>
      </div>
    </div>`;
  }

  function timelineWidget() {
    const rows = roles.map(r => {
      const dur = monthsBetween(r.start, r.end);
      return `
      <div class="am-tl-item">
        <div class="am-tl-top">
          <span class="am-tl-co">${r.company}</span>
          <span class="am-tl-dur">${formatDuration(dur)}</span>
        </div>
        <div class="am-tl-role">${r.title}</div>
        <div class="am-tl-bar-bg">
          <div class="am-tl-bar-fill" style="width:${r.weight}%;background:${r.color};"></div>
        </div>
        <div class="am-tl-dates">${fmtDate(r.start)} – ${fmtDate(r.end)}</div>
      </div>`;
    }).join("");

    return `
    <div class="am-timeline">
      <div class="am-tl-header">
        Career timeline
        <span class="am-tl-badge">${totalExp()} total</span>
      </div>
      ${rows}
    </div>`;
  }

  // ============================================================
  // DOM BUILDER
  // ============================================================
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html")  node.innerHTML  = v;
      else if (k === "text")  node.textContent = v;
      else node.setAttribute(k, v);
    });
    if (children) [].concat(children).forEach(c => {
      if (!c) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  const toggleIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  const sendIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
  const closeIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  const root = el("div", { id: "am-chatbot-root" });
  root.innerHTML = `
  <button id="am-toggle" aria-label="Chat with Aditya's bot">${toggleIcon}</button>
  <div id="am-panel" class="hidden">
    <div id="am-header">
      <div class="am-avatar">🤖</div>
      <div class="am-header-info">
        <div class="am-header-name">Aditya's Assistant</div>
        <div class="am-header-sub"><span class="am-dot"></span> Powered by Claude AI</div>
      </div>
      <button class="am-close" aria-label="Close">${closeIcon}</button>
    </div>
    <div id="am-messages" role="log" aria-live="polite"></div>
    <div id="am-chips"></div>
    <div id="am-inputbar">
      <input id="am-input" type="text" placeholder="Ask me anything about Aditya…" autocomplete="off" aria-label="Your question" />
      <button id="am-send" aria-label="Send">${sendIcon}</button>
    </div>
  </div>`;

  document.head.appendChild(style);
  document.body.appendChild(root);

  // ============================================================
  // REFS
  // ============================================================
  const panel    = document.getElementById("am-panel");
  const toggle   = document.getElementById("am-toggle");
  const msgs     = document.getElementById("am-messages");
  const chips    = document.getElementById("am-chips");
  const input    = document.getElementById("am-input");
  const sendBtn  = document.getElementById("am-send");
  const closeBtn = document.querySelector(".am-close");

  // ============================================================
  // MESSAGE RENDERING
  // ============================================================
  function appendBotMessage(text, extraHTML) {
    const row = el("div", { class: "am-row bot" });
    row.innerHTML = `
      <div class="am-bot-ico">🤖</div>
      <div>
        <div class="am-bubble bot">${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        ${extraHTML || ""}
        <div class="am-time">${now()}</div>
      </div>`;

    // Copy on click
    row.querySelector(".am-bubble.bot").addEventListener("click", function() {
      navigator.clipboard.writeText(text).catch(() => {});
      const orig = this.style.opacity;
      this.style.opacity = "0.6";
      setTimeout(() => { this.style.opacity = orig; }, 150);
    });

    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function appendUserMessage(text) {
    const row = el("div", { class: "am-row user" });
    row.innerHTML = `
      <div class="am-bubble user">${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      <div class="am-time" style="text-align:right;">${now()}</div>`;
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  let typingEl = null;
  function showTyping() {
    typingEl = el("div", { class: "am-row bot", id: "am-typing-row" });
    typingEl.innerHTML = `<div class="am-bot-ico">🤖</div><div class="am-bubble bot"><div class="am-typing"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(typingEl);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function hideTyping() {
    if (typingEl) { typingEl.remove(); typingEl = null; }
  }

  // ============================================================
  // CHIP SETUP
  // ============================================================
  suggestions.forEach((s, i) => {
    const btn = el("button", { class: "am-chip", type: "button", text: s.label });
    btn.style.animationDelay = `${i * 60}ms`;
    btn.addEventListener("click", () => handleSend(s.query));
    chips.appendChild(btn);
  });

  // ============================================================
  // SEND HANDLER
  // ============================================================
  let isLoading = false;

  async function handleSend(text) {
    const q = (text || input.value).trim();
    if (!q || isLoading) return;

    input.value = "";
    isLoading = true;
    sendBtn.classList.add("loading");
    sendBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="rgba(0,0,0,0.15)" stroke-width="2.5"/><path d="M12 3a9 9 0 0 1 9 9" stroke="#888" stroke-width="2.5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></path></svg>`;

    appendUserMessage(q);
    showTyping();

    // Detect if it's a timeline/career query for widget
    const isTimelineQ = /timeline|career|journey|experience|how long|years|worked|job|company|quinnox|aviraj/i.test(q);

    try {
      const reply = await getAIReply(q);
      hideTyping();
      appendBotMessage(reply, isTimelineQ ? timelineWidget() : null);
    } catch (err) {
      hideTyping();
      const errEl = el("div", { class: "am-error", text: "Couldn't connect right now. Try again in a moment." });
      msgs.appendChild(errEl);
      msgs.scrollTop = msgs.scrollHeight;
      conversationHistory.pop(); // remove failed user msg
    } finally {
      isLoading = false;
      sendBtn.classList.remove("loading");
      sendBtn.innerHTML = sendIcon;
      input.focus();
    }
  }

  // ============================================================
  // EVENTS
  // ============================================================
  sendBtn.addEventListener("click", () => handleSend());
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } });

  function openPanel() {
    panel.classList.remove("hidden");
    toggle.classList.add("open");
    input.focus();
  }
  function closePanel() {
    panel.classList.add("hidden");
    toggle.classList.remove("open");
  }

  toggle.addEventListener("click", () => {
    panel.classList.contains("hidden") ? openPanel() : closePanel();
  });
  closeBtn.addEventListener("click", closePanel);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !panel.classList.contains("hidden")) closePanel();
  });

  // ============================================================
  // GREETING
  // ============================================================
  setTimeout(() => {
    appendBotMessage(
      `Hey there! 👋 I'm Aditya's AI assistant — powered by Claude. Ask me anything about his experience, skills, projects, or how to reach him!`,
      heroCard() + timelineWidget()
    );
  }, 300);

  // ============================================================
  // PUBLIC API
  // ============================================================
  window.AdityaChatbot = { open: openPanel, close: closePanel };

})();
