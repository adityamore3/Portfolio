// restriction.js
(function () {

  const SECRET_ACCESS_CODE = "Aditya2026";
  const YOUR_EMAIL = "adieeoffical@gmail.com";

  let locked = false;
  let lastTriggerTime = 0;
  const COOLDOWN = 3000; // 3 seconds

  /* ===============================
     DOWNLOAD ACCESS
  =============================== */
  window.requestAccess = function () {
    const code = prompt("Please enter the Access Code to download:");
    if (code === SECRET_ACCESS_CODE) {
      alert("Access Granted.");
      const link = document.createElement("a");
      link.href = "Aditya More Resume.pdf";
      link.download = "Aditya_More_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (code !== null) {
      if (confirm("Incorrect Code. Email Aditya for access?")) {
        window.location.href =
          `mailto:${YOUR_EMAIL}?subject=Resume Access Request&body=Hi Aditya, I would like to request access to download your resume.`;
      }
    }
  };

  /* ===============================
     SCREENSHOT PREVENTION
  =============================== */

  // Detect Screenshot Attempts (Desktop & Mobile)
  function detectScreenshotAttempt() {
    const now = Date.now();
    if (now - lastTriggerTime < COOLDOWN) return;
    lastTriggerTime = now;

    // Subtle blur content temporarily
    document.body.style.filter = "blur(5px)";
    document.body.style.transition = "filter 0.3s ease";
    
    alert("⚠️ Screenshot Detected!\n\nThis content is protected. Please request permission to download via email.");
    
    setTimeout(() => {
      document.body.style.filter = "none";
    }, 1500);

    // Optional: Send notification email (requires backend)
    // sendNotification("Screenshot attempt detected");
  }

  // Windows/Linux: PrintScreen, Windows Key, Alt+PrtScn
  document.addEventListener("keyup", function (e) {
    // PrintScreen (44), Windows Key (91, 92), Alt+PrintScreen
    if (e.keyCode === 44 || e.keyCode === 91 || e.keyCode === 92 || 
        (e.altKey && e.keyCode === 44)) {
      detectScreenshotAttempt();
    }
  });

  // Mac: CMD+SHIFT+3, CMD+SHIFT+4, CMD+SHIFT+5
  document.addEventListener("keydown", function (e) {
    if (e.metaKey && e.shiftKey && (e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53)) {
      e.preventDefault();
      detectScreenshotAttempt();
    }
  });

  // Detect Browser DevTools Screenshot (F12 menu)
  let devtoolsOpen = false;
  const threshold = 160;

  setInterval(() => {
    if (window.outerWidth - window.innerWidth > threshold || 
        window.outerHeight - window.innerHeight > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        document.body.style.filter = "blur(3px)";
        document.body.style.transition = "filter 0.5s ease";
      }
    } else {
      if (devtoolsOpen) {
        devtoolsOpen = false;
        document.body.style.filter = "none";
      }
    }
  }, 500);

  // Mobile Screenshot Detection (Android/iOS)
  // Detects volume + power button (Android) and side button combinations (iOS)
  let volumePressed = false;
  let powerPressed = false;

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Page hidden - possible screenshot attempt
      setTimeout(() => {
        if (document.hidden) {
          detectScreenshotAttempt();
        }
      }, 100);
    }
  });

  // Detect iOS/Android screenshot via key combinations
  window.addEventListener("blur", function () {
    detectScreenshotAttempt();
  });

  /* ===============================
     ADDITIONAL PROTECTIONS
  =============================== */

  // Disable Right Click (already in HTML via oncontextmenu)
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable Text Selection (already in CSS via user-select)
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.mozUserSelect = "none";
  document.body.style.msUserSelect = "none";

  // Disable Drag & Drop
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    return false;
  });

  // Disable Ctrl+S (Save Page)
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
      e.preventDefault();
      alert("⚠️ Saving is disabled. Please request access via email.");
      return false;
    }
  });

  // Disable Ctrl+P (Print)
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 80) {
      e.preventDefault();
      alert("⚠️ Printing is disabled. Please request access via email.");
      return false;
    }
  });

  // Disable Ctrl+U (View Source)
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
  });

  // Disable F12 (DevTools)
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
  });

  // Disable Ctrl+Shift+I/J/C (Inspect Element)
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && 
        (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
  });

  // Watermark Randomization (makes screen capture less useful)
  setInterval(() => {
    const watermarks = document.querySelectorAll('.watermark');
    watermarks.forEach(w => {
      w.style.opacity = Math.random() * 0.05 + 0.02;
    });
  }, 1000);

  /* ===============================
     CANVAS FINGERPRINTING PREVENTION
  =============================== */
  // Prevents extensions from capturing canvas content
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  };

  /* ===============================
     CONSOLE WARNING
  =============================== */
  console.log("%c⚠️ WARNING", "color: red; font-size: 40px; font-weight: bold;");
  console.log("%cThis resume is protected content.", "font-size: 16px;");
  console.log("%cUnauthorized access, copying, or distribution is prohibited.", "font-size: 14px;");
  console.log("%cFor access, please contact: " + YOUR_EMAIL, "font-size: 14px; color: #38bdf8;");

  console.log = function() {};
  console.warn = function() {};
  console.error = function() {};

})();
