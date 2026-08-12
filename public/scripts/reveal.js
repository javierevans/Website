// Fades/slides [data-reveal] elements into place as they enter the viewport.
const els = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && els.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  els.forEach((el) => io.observe(el));
} else {
  els.forEach((el) => el.classList.add("is-visible"));
}
