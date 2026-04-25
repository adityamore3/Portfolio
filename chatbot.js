(function () {

  // =========================
  // EXPERIENCE CALCULATION
  // =========================
  const careerStartDate = new Date("2024-06-01");

  function getExperience() {
    const now = new Date();
    let months =
      (now.getFullYear() - careerStartDate.getFullYear()) * 12 +
      (now.getMonth() - careerStartDate.getMonth());

    const years = Math.floor(months / 12);
    const rem = months % 12;

    if (years === 0) return `${rem} month${rem !== 1 ? "s" : ""}`;
    if (rem === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years} year${years !== 1 ? "s" : ""} and ${rem} month${rem !== 1 ? "s" : ""}`;
  }

  // =========================
  // PROFILE (UPDATED REAL DATA)
  // =========================
  const profile = {
    name: "Aditya More",
    role: "Software Engineer",
    location: "Mumbai, India",
    email: "adieeoffical@gmail.com",
    github: "https://github.com/adityamore3",

    get experience() {
      return getExperience();
    },

    summary:
      "Software Engineer experienced in Full Stack Development using ASP.NET Core, React, and SQL Server. " +
      "Currently working in Application Maintenance & Support (L2/L3) along with development.",

    current: {
      company: "Quinnox",
      duration: "Dec 2025 – Present",
      desc:
        "Working on L2/L3 support, debugging production issues, optimizing SQL queries, and enhancing applications using ASP.NET Core and React."
    },

    previous: {
      company: "Aviraj Innovations Pvt Ltd",
      duration: "June 2024 – Nov 2025",
      desc:
        "Started career as Software Engineer. Worked on full-stack apps, REST APIs, authentication, and database optimization."
    },

    skills:
      "C#, ASP.NET Core, Web API, React, SQL Server, Entity Framework, LINQ, JavaScript, Tailwind CSS",

    projects: [
      "College ERP System",
      "Retail POS System"
    ]
  };

  // =========================
  // CHAT RULE ENGINE (OPTIMIZED)
  // =========================
  const rules = [
    {
      keys: ["hi", "hello", "hey"],
      reply: () =>
        `Hey 👋 I'm Aditya's assistant.\n\n` +
        `🧑‍💻 Experience: ${profile.experience}\n` +
        `🏢 Current: ${profile.current.company}\n\nAsk me anything!`
    },
    {
      keys: ["experience", "years"],
      reply: () =>
        `Aditya started in June 2024 at Aviraj and is now at Quinnox.\n\nTotal experience: ${profile.experience} 💼`
    },
    {
      keys: ["current", "quinnox"],
      reply: () =>
        `Currently working at ${profile.current.company} (${profile.current.duration}).\n\n${profile.current.desc}`
    },
    {
      keys: ["previous", "aviraj"],
      reply: () =>
        `Previously worked at ${profile.previous.company} (${profile.previous.duration}).\n\n${profile.previous.desc}`
    },
    {
      keys: ["skills", "tech"],
      reply: () => `Tech Stack:\n${profile.skills}`
    },
    {
      keys: ["projects"],
      reply: () =>
        profile.projects.map(p => `• ${p}`).join("\n")
    },
    {
      keys: ["contact", "email"],
      reply: () =>
        `📧 ${profile.email}`
    }
  ];

  function getReply(msg) {
    msg = msg.toLowerCase();
    for (let r of rules) {
      if (r.keys.some(k => msg.includes(k))) {
        return r.reply();
      }
    }
    return "Ask me about experience, skills, or projects 🙂";
  }

  // =========================
  // UI (CLEAN VERSION)
  // =========================
  if (document.getElementById("chatbot-root")) return;

  const root = document.createElement("div");
  root.id = "chatbot-root";

  root.innerHTML = `
  <style>
    #chat-btn {
      position: fixed;
      right: 20px;
      bottom: 20px;
      background: #6366f1;
      color: white;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      border: none;
      font-size: 22px;
      cursor: pointer;
    }

    #chat-box {
      position: fixed;
      right: 20px;
      bottom: 90px;
      width: 320px;
      height: 420px;
      background: white;
      border-radius: 12px;
      display: none;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      overflow: hidden;
      font-family: sans-serif;
    }

    #messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
    }

    .msg {
      margin: 6px 0;
      padding: 8px 10px;
      border-radius: 10px;
      max-width: 80%;
    }

    .bot { background: #f1f5f9; }
    .user { background: #6366f1; color: white; margin-left:auto; }

    #inputBox {
      display: flex;
      border-top: 1px solid #eee;
    }

    #inputBox input {
      flex: 1;
      padding: 10px;
      border: none;
      outline: none;
    }

    #inputBox button {
      padding: 10px;
      background: #6366f1;
      color: white;
      border: none;
      cursor: pointer;
    }
  </style>

  <button id="chat-btn">💬</button>

  <div id="chat-box">
    <div id="messages"></div>
    <div id="inputBox">
      <input id="input" placeholder="Ask something..." />
      <button id="send">Send</button>
    </div>
  </div>
  `;

  document.body.appendChild(root);

  const btn = document.getElementById("chat-btn");
  const box = document.getElementById("chat-box");
  const messages = document.getElementById("messages");
  const input = document.getElementById("input");
  const send = document.getElementById("send");

  btn.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    box.style.flexDirection = "column";
  };

  function addMsg(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function handle() {
    const text = input.value.trim();
    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    setTimeout(() => {
      addMsg(getReply(text), "bot");
    }, 300);
  }

  send.onclick = handle;
  input.onkeydown = (e) => e.key === "Enter" && handle();

  // =========================
  // INITIAL MESSAGE
  // =========================
  setTimeout(() => {
    addMsg(
      `Hey 👋 I'm Aditya's assistant.\n\n` +
      `Experience: ${profile.experience}\n` +
      `Current: Quinnox\n\nAsk me anything!`,
      "bot"
    );
  }, 500);

})();
