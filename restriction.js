(function () {

  const HASHED_CODE = "b94fcdc77bf85aef57e32a3b7b3c85cf40f78a7d374ee38af4e4f2d7b6f6e79d";
  const YOUR_EMAIL = "adieeoffical@gmail.com";

  let lastTriggerTime = 0;
  const COOLDOWN = 2000;

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  window.requestAccess = async function () {
    const code = prompt("Please enter the Access Code to download:");
    if (code === null) return;

    const hashed = await sha256(code);

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
          `mailto:${YOUR_EMAIL}?subject=Resume Access Request&body=Hi Aditya, I would like to request access to download your resume.`;
      }
    }
  };

  function detectScreenshotAttempt() {
    const now = Date.now();
    if (now - lastTriggerTime < COOLDOWN) return;
    lastTriggerTime = now;

    document.body.style.filter = "blur(5px)";
    document.body.style.transition = "filter 0.1s ease";

    setTimeout(() => {
      alert("Screenshot detected. Content is protected.");
    }, 0);

    setTimeout(() => {
      document.body.style.filter = "none";
    }, 1200);
  }

  document.addEventListener("keyup", e => {
    if (e.keyCode === 44 || e.keyCode === 91 || e.keyCode === 92 || (e.altKey && e.keyCode === 44)) {
      detectScreenshotAttempt();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.keyCode === 44) detectScreenshotAttempt();
  });

  document.addEventListener("keydown", e => {
    if (e.metaKey && e.shiftKey && (e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53)) {
      e.preventDefault();
      detectScreenshotAttempt();
    }
  });

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
      }
    } else {
      devtoolsOpen = false;
      document.body.style.filter = "none";
    }
  }, 200);

  let touchStartTime = 0;
  let touchStartY = 0;
  let activeTouches = 0;
  let threeFingerDetected = false;

  document.addEventListener("touchstart", e => {
    activeTouches = e.touches.length;
    if (activeTouches === 3) {
      threeFingerDetected = true;
      touchStartTime = Date.now();
      touchStartY = e.touches[0].clientY;
      setTimeout(() => {
        if (threeFingerDetected) detectScreenshotAttempt();
      }, 50);
    }
  }, { passive: true });

  document.addEventListener("touchmove", e => {
    if (activeTouches === 3 && e.touches.length === 3) {
      const swipeDistance = e.touches[0].clientY - touchStartY;
      const swipeTime = Date.now() - touchStartTime;
      if (swipeDistance > 50 && swipeTime < 300) {
        detectScreenshotAttempt();
        threeFingerDetected = false;
      }
    }
  }, { passive: true });

  document.addEventListener("touchend", e => {
    activeTouches = e.touches.length;
    if (activeTouches < 3) threeFingerDetected = false;
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) detectScreenshotAttempt();
  });

  window.addEventListener("blur", detectScreenshotAttempt);

  let palmSwipeStartX = 0;
  let palmSwipeDetected = false;

  document.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      palmSwipeStartX = e.touches[0].clientX;
      palmSwipeDetected = false;
    }
  }, { passive: true });

  document.addEventListener("touchmove", e => {
    if (e.touches.length === 1 && !palmSwipeDetected) {
      const swipeDistance = Math.abs(e.touches[0].clientX - palmSwipeStartX);
      if (
        (palmSwipeStartX < 50 && e.touches[0].clientX > window.innerWidth - 50) ||
        (palmSwipeStartX > window.innerWidth - 50 && e.touches[0].clientX < 50)
      ) {
        if (swipeDistance > window.innerWidth * 0.6) {
          palmSwipeDetected = true;
          detectScreenshotAttempt();
        }
      }
    }
  }, { passive: true });

  document.addEventListener("contextmenu", e => e.preventDefault());

  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.mozUserSelect = "none";
  document.body.style.msUserSelect = "none";

  document.addEventListener("dragstart", e => e.preventDefault());

  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && [83, 80, 85].includes(e.keyCode)) {
      e.preventDefault();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.keyCode === 123) e.preventDefault();
  });

  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && [73, 74, 67].includes(e.keyCode)) {
      e.preventDefault();
    }
  });

  setInterval(() => {
    document.querySelectorAll(".watermark").forEach(w => {
      w.style.opacity = Math.random() * 0.05 + 0.02;
    });
  }, 1000);

  HTMLCanvasElement.prototype.toDataURL = function () {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  };

  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};

})();
