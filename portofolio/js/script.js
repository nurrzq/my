const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target);
    let current = 0;
    const duration = 900;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      counter.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    observer.unobserve(counter);
  });
}, { threshold: 0.8 });

counters.forEach(counter => counterObserver.observe(counter));

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (scrollY >= top) current = section.id;
  });

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});
