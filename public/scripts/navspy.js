// Highlights the nav icon matching whichever section is currently in view.
const links = document.querySelectorAll('.nav-icon-btn[href^="#"]');
const sections = [...links]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActive(id) {
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
  );

  sections.forEach((section) => io.observe(section));
}
