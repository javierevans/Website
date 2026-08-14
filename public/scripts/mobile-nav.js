// Drives the hamburger button below the 768px breakpoint: opens/closes the
// stacked mobile menu, closes it again once a link is tapped or Escape is
// pressed, and locks background scroll while it's open.
const toggle = document.getElementById("nav-hamburger");
const menu = document.getElementById("mobile-menu");

if (toggle && menu) {
  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mobile-menu-open");
  }

  function openMenu() {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("mobile-menu-open");
  }

  toggle.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Crossing back over the breakpoint (e.g. rotating a tablet) shouldn't
  // leave the mobile menu stuck open behind the now-visible desktop nav.
  const desktopMql = window.matchMedia("(min-width: 769px)");
  desktopMql.addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });
}
