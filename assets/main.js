/* ============================================================
   WIDE Space Working Group — site interactions
   Mobile menu · scroll-spy · fade-in · back-to-top
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close after picking a destination
    navMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll-spy (active nav highlight) ---------- */
  var navLinks = navMenu ? navMenu.querySelectorAll("a[href^='#']") : [];
  var linkById = {};
  Array.prototype.forEach.call(navLinks, function (link) {
    var id = link.getAttribute("href").slice(1);
    if (id) linkById[id] = link;
  });

  if (window.IntersectionObserver && Object.keys(linkById).length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            Array.prototype.forEach.call(navLinks, function (l) {
              l.classList.remove("active");
            });
            var active = linkById[entry.target.id];
            if (active) active.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    Object.keys(linkById).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* ---------- Fade-in on scroll ---------- */
  var faders = document.querySelectorAll(".fade-in");
  if (window.IntersectionObserver && faders.length) {
    var fadeObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    Array.prototype.forEach.call(faders, function (el) {
      fadeObserver.observe(el);
    });
  } else {
    Array.prototype.forEach.call(faders, function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Back-to-top visibility ---------- */
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    if (backToTop) backToTop.classList.toggle("visible", scrollTop > 400);
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
