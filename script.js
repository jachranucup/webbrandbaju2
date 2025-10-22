/* ==========================================
   ALMA — Fashion Brand Interactive Script
   Smooth animations + Lookbook Lightbox
========================================== */

/* ========== SCROLL FADE-UP ANIMATION ========== */
document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll("[data-anim]");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedItems.forEach((item) => fadeObserver.observe(item));
});

/* ========== LOOKBOOK FADE-IN (on scroll) ========== */
document.addEventListener("DOMContentLoaded", () => {
  const lookbookItems = document.querySelectorAll(".grid-lookbook figure");

  const lookbookObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lookbookObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  lookbookItems.forEach((item) => lookbookObserver.observe(item));
});

/* ========== LOOKBOOK FULLSCREEN POPUP (Lightbox) ========== */
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".grid-lookbook img");

  // Buat elemen lightbox
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  const content = document.createElement("div");
  content.classList.add("lightbox-content");

  const img = document.createElement("img");
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("lightbox-close");
  closeBtn.innerHTML = "&times;";

  // Tombol navigasi
  const prevBtn = document.createElement("span");
  prevBtn.classList.add("lightbox-prev");
  prevBtn.innerHTML = "&#10094;";

  const nextBtn = document.createElement("span");
  nextBtn.classList.add("lightbox-next");
  nextBtn.innerHTML = "&#10095;";

  // Gabungkan elemen
  content.appendChild(img);
  content.appendChild(closeBtn);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(content);
  lightbox.appendChild(nextBtn);
  document.body.appendChild(lightbox);

  let currentIndex = 0;

  function openLightbox(index) {
    img.src = images[index].src;
    currentIndex = index;
    lightbox.classList.add("show");
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex].src;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    img.src = images[currentIndex].src;
  }

  // Event listeners
  images.forEach((image, index) => {
    image.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Tutup saat klik area luar
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Tutup dengan tombol ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
});
