/* ============================================================
   Alex .sh — Photography Portfolio
   Main interactions: nav, lightbox, scroll reveal
   ============================================================ */

(function () {
  "use strict";

  /* ---------- DOM refs ---------- */
  const header    = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu   = document.querySelector(".nav-links");
  const navLinks  = document.querySelectorAll(".nav-link");
  const sections  = document.querySelectorAll("section[id]");
  const cards     = document.querySelectorAll(".card[data-full]");
  const lightbox  = document.getElementById("lightbox");
  const lbImg     = lightbox.querySelector(".lightbox-img");
  const lbCaption = lightbox.querySelector(".lightbox-caption");
  const lbCounter = lightbox.querySelector(".lightbox-counter");
  const lbClose   = lightbox.querySelector(".lightbox-close");
  const lbPrev    = lightbox.querySelector(".lightbox-prev");
  const lbNext    = lightbox.querySelector(".lightbox-next");
  const lbBackdrop= lightbox.querySelector(".lightbox-backdrop");

  /* ============================================================
     1. MOBILE NAV TOGGLE
     ============================================================ */

  navToggle.addEventListener("click", function () {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navMenu.classList.toggle("is-open", !open);
    document.body.classList.toggle("lightbox-open", !open); // reuse scroll‑lock
  });

  // Close mobile nav when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
    });
  });

  /* ============================================================
     2. ACTIVE NAV LINK (Intersection Observer)
     ============================================================ */

  var currentActive = "home";

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          currentActive = entry.target.id;
          navLinks.forEach(function (link) {
            var target = link.getAttribute("href").replace("#", "");
            link.classList.toggle("active", target === currentActive);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ============================================================
     3. SCROLL REVEAL (Intersection Observer)
     ============================================================ */

  var revealElements = document.querySelectorAll(".reveal");

  // Skip animations if user prefers reduced motion
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    revealElements.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ============================================================
     4. LIGHTBOX
     ============================================================ */

  var galleryItems = Array.from(cards);
  var lbIndex = 0;

  function openLightbox(index) {
    lbIndex = index;
    showSlide();
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lbImg.classList.remove("is-loaded");
    // Return focus to the card that opened the lightbox
    galleryItems[lbIndex].focus();
  }

  function showSlide() {
    var card = galleryItems[lbIndex];
    var src = card.getAttribute("data-full");
    var caption = card.getAttribute("data-caption") || "";
    var alt = card.querySelector("img").getAttribute("alt") || caption;

    lbImg.classList.remove("is-loaded");
    lbCaption.textContent = caption;
    lbCounter.textContent = (lbIndex + 1) + " / " + galleryItems.length;

    lbImg.onload = function () {
      lbImg.classList.add("is-loaded");
    };
    lbImg.setAttribute("alt", alt);
    lbImg.setAttribute("src", src);

    // If image is already cached
    if (lbImg.complete && lbImg.naturalWidth > 0) {
      lbImg.classList.add("is-loaded");
    }
  }

  function nextSlide() {
    lbIndex = (lbIndex + 1) % galleryItems.length;
    showSlide();
  }

  function prevSlide() {
    lbIndex = (lbIndex - 1 + galleryItems.length) % galleryItems.length;
    showSlide();
  }

  // Click on card → open lightbox
  galleryItems.forEach(function (card, i) {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("click", function () { openLightbox(i); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lbBackdrop.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", prevSlide);
  lbNext.addEventListener("click", nextSlide);

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-active")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        prevSlide();
        break;
      case "ArrowRight":
        nextSlide();
        break;
    }
  });

  // Touch swipe support for lightbox
  var touchStartX = 0;
  var touchStartY = 0;

  lightbox.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    // Only trigger if horizontal swipe is dominant and long enough
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }, { passive: true });

  // Trap focus inside lightbox when open
  lightbox.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var focusable = lightbox.querySelectorAll("button");
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ============================================================
     5. HEADER SHRINK ON SCROLL
     ============================================================ */

  var lastScroll = 0;
  var ticking = false;

  window.addEventListener("scroll", function () {
    lastScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        header.classList.toggle("is-scrolled", lastScroll > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

})();
