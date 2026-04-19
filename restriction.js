(function () {

  // SHA-256 hash of access code
  const HASHED_CODE = "307a3531aa442d381156453bcc0dd747331c1fbaa90cd01ccc94a0c1a7ff7d2f";
  const YOUR_EMAIL = "adieeoffical@gmail.com";

  let lastTriggerTime = 0;
  const COOLDOWN = 2000;

  // Generate SHA-256 hash
  function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    return crypto.subtle.digest("SHA-256", msgBuffer).then(function (hashBuffer) {
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    });
  }

  // Access control
  window.requestAccess = function () {
    const code = prompt("Please enter the Access Code:");
    if (code === null) return;

    sha256(code.trim()).then(function (hashed) {
      if (hashed === HASHED_CODE) {
        alert("Access Granted.");
        const link = document.createElement("a");
        link.href = "Aditya More Resume.pdf";
        link.download = "Aditya_More_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        if (confirm("Incorrect Code. Email Aditya for access?")) {
          window.location.href =
            "mailto:" + YOUR_EMAIL + "?subject=Resume Access Request&body=Hi Aditya, I would like to request access.";
        }
      }
    });
  };

  function detectScreenshotAttempt() {
    const now = Date.now();
    if (now - lastTriggerTime < COOLDOWN) return;
    lastTriggerTime = now;

    document.body.style.filter = "blur(5px)";
    setTimeout(() => alert("Screenshot detected. Content is protected."), 0);
    setTimeout(() => document.body.style.filter = "none", 1200);
  }

  // Screenshot keys
  document.addEventListener("keyup", e => {
    if (e.keyCode === 44 || (e.altKey && e.keyCode === 44)) detectScreenshotAttempt();
  });

  document.addEventListener("keydown", e => {
    if (e.keyCode === 44) detectScreenshotAttempt();
  });

  // DevTools detection
  let devtoolsOpen = false;
  setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > 160 ||
      window.outerHeight - window.innerHeight > 160
    ) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        document.body.style.filter = "blur(3px)";
      }
    } else {
      devtoolsOpen = false;
      document.body.style.filter = "none";
    }
  }, 200);

  // Basic restrictions
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.body.style.userSelect = "none";

  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && [83, 80, 85].includes(e.keyCode)) e.preventDefault();
    if (e.keyCode === 123) e.preventDefault();
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && [73, 74, 67].includes(e.keyCode)) e.preventDefault();
  });

  // Watermark animation
  setInterval(() => {
    document.querySelectorAll(".watermark").forEach(w => {
      w.style.opacity = Math.random() * 0.05 + 0.02;
    });
  }, 1000);

  // Block canvas export
  HTMLCanvasElement.prototype.toDataURL = function () {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  };

  // Disable console logs
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};

})();
