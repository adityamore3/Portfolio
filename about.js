// Function to initialize mobile menu after navbar loads
function initMobileMenu() {
  const burger   = document.getElementById('burger');
  const backdrop = document.getElementById('mobile-backdrop');
  const menu     = document.getElementById('mobile-menu');
  if (!burger || !backdrop || !menu) return; // Safety check
  const icon     = burger.querySelector('i');

  function openMenu() {
    backdrop.classList.add('active');
    menu.classList.add('open');
    document.body.classList.add('overflow-hidden');
    icon.classList.replace('ri-menu-line', 'ri-close-line');
  }
  function closeMenu() {
    backdrop.classList.remove('active');
    menu.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
    icon.classList.replace('ri-close-line', 'ri-menu-line');
  }

  burger.addEventListener('click', () =>
    menu.classList.contains('open') ? closeMenu() : openMenu()
  );
  backdrop.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

// HTML loader for navbar and footer
function loadHTML(id, file, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // Run callback after load
    })
    .catch(err => console.error("Error loading file:", file, err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("navbar", "navbar.html", initMobileMenu); // Navbar then burger menu
  loadHTML("footer", "footer.html");
});
