/* ======================================
   ALMA — Elegant JS Animations
   For all pages (Home, About, Products, Contact, Login)
====================================== */

// === Fade-in on page load ===
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transition = "opacity 0.6s ease";
});

// === Smooth fade-out when navigating to other pages ===
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[href]");
  const body = document.body;

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    link.addEventListener("click", (e) => {
      if (link.target === "_blank" || href.startsWith("http")) return;
      e.preventDefault();
      body.style.opacity = "0";
      setTimeout(() => window.location.href = href, 400);
    });
  });
});

// === Scroll animation using Intersection Observer ===
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-anim]");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(el => observer.observe(el));
});

// === Optional: highlight nav links while scrolling ===
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");

  let currentSection = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) currentSection = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
});

// === Gentle hover animation for buttons ===
const buttons = document.querySelectorAll(".btn, .btn-outline, .nav-cta");
buttons.forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.removeProperty("--x");
    btn.style.removeProperty("--y");
  });
});
