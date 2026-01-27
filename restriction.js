// restriction.js
(function () {

  const SECRET_ACCESS_CODE = "Aditya2026";
  const YOUR_EMAIL = "adieeoffical@gmail.com";

  let locked = false;
  let lastTriggerTime = 0;
  const COOLDOWN = 3000;

  /* Download access logic */
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

  /* Screenshot handling */
  function detectScreenshotAttempt() {
    const now = Date.now();
    if (now - lastTriggerTime < COOLDOWN) return;
    lastTriggerTime = now;

    document.body.style.filter = "blur(5px)";
    document.body.style.transition = "filter 0.3s ease";

    alert(
      "Screenshot detected.\n\n" +
      "This content is protected. Please request permission to download."
    );

    setTimeout(() => {
      document.body.style.filter = "none";
    }, 1500);
  }

  /* Desktop screenshot keys */
  document.addEventListener("keyup", function (e) {
    if (
      e.keyCode === 44 ||
      e.keyCode === 91 ||
      e.keyCode === 92 ||
      (e.altKey && e.keyCode === 44)
    ) {
      detectScreenshotAttempt();
    }
  });

  /* macOS screenshot shortcuts */
  document.addEventListener("keydown", function (e) {
    if (
      e.metaKey &&
      e.shiftKey &&
      (e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53)
    ) {
      e.preventDefault();
      detectScreenshotAttempt();
    }
  });

  /* DevTools size detection */
  let devtoolsOpen = false;
  const threshold = 160;

  setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
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

  /* Mobile gesture detection */
  let touchStartTime = 0;
  let touchStartY = 0;
  let activeTouches = 0;

  document.addEventListener(
    "touchstart",
    function (e) {
      activeTouches = e.touches.length;
      if (activeTouches === 3) {
        touchStartTime = Date.now();
        touchStartY = e.touches[0].clientY;
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    function (e) {
      if (activeTouches === 3 && e.touches.length === 3) {
        const touchMoveY = e.touches[0].clientY;
        const swipeDistance = touchMoveY - touchStartY;
        const swipeTime = Date.now() - touchStartTime;

        if (swipeDistance > 100 && swipeTime < 500) {
          detectScreenshotAttempt();
        }
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    function (e) {
      activeTouches = e.touches.length;
    },
    { passive: true }
  );

  /* Visibility and focus changes */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      setTimeout(() => {
        if (document.hidden) {
          detectScreenshotAttempt();
        }
      }, 100);
    }
  });

  window.addEventListener("blur", function () {
    detectScreenshotAttempt();
  });

  /* Swipe-based detection */
  let palmSwipeStartX = 0;
  let palmSwipeDetected = false;

  document.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length === 1) {
        palmSwipeStartX = e.touches[0].clientX;
        palmSwipeDetected = false;
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches.length === 1 && !palmSwipeDetected) {
        const touchMoveX = e.touches[0].clientX;
        const swipeDistance = Math.abs(touchMoveX - palmSwipeStartX);

        if (
          (palmSwipeStartX < 50 && touchMoveX > window.innerWidth - 50) ||
          (palmSwipeStartX > window.innerWidth - 50 && touchMoveX < 50)
        ) {
          if (swipeDistance > window.innerWidth * 0.7) {
            palmSwipeDetected = true;
            detectScreenshotAttempt();
          }
        }
      }
    },
    { passive: true }
  );

  /* General interaction restrictions */
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    return false;
  });

  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.mozUserSelect = "none";
  document.body.style.msUserSelect = "none";

  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    return false;
  });

  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
      e.preventDefault();
      alert("Saving is disabled. Please request access.");
      return false;
    }
  });

  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 80) {
      e.preventDefault();
      alert("Printing is disabled. Please request access.");
      return false;
    }
  });

  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)
    ) {
      e.preventDefault();
      return false;
    }
  });

  /* Watermark variation */
  setInterval(() => {
    const watermarks = document.querySelectorAll(".watermark");
    watermarks.forEach((w) => {
      w.style.opacity = Math.random() * 0.05 + 0.02;
    });
  }, 1000);

  /* Canvas export protection */
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function () {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  };

  /* Console notice */
  console.log("%cProtected Content", "font-size: 20px; font-weight: bold;");
  console.log("Unauthorized copying or distribution is discouraged.");
  console.log("For access, contact:", YOUR_EMAIL);

  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};

})();
