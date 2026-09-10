/* ============================================================
   Grindhouse Martial Arts — v2 · UI behaviour
   Called by: index.html, anmeldeformular.html, bestaetigung.html,
   impressum.html, datenschutz.html  (<script src="assets/app.js" defer>)
   No data file I/O. Pure DOM behaviour.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Navbar scroll state ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Scroll progress bar (index only: needs a long page) ---- */
  if (document.querySelector(".hero")) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var ticking = false;
    var updateBar = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateBar); }
    }, { passive: true });
    window.addEventListener("resize", updateBar);
    updateBar();
  }

  /* ---- Mobile drawer ---- */
  var burger = document.querySelector(".nav__burger");
  var drawer = document.querySelector(".drawer");
  if (burger && drawer) {
    var toggle = function () {
      var open = drawer.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", toggle);
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Filter tabs: each .filter-tabs group only switches its own panels (data-target = panel id) ---- */
  document.querySelectorAll(".filter-tabs").forEach(function (list) {
    var tabs = list.querySelectorAll(":scope > .filter-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("active"); t.setAttribute("aria-selected", "false");
          var p = document.getElementById(t.getAttribute("data-target"));
          if (p) p.classList.remove("active");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        var panel = document.getElementById(tab.getAttribute("data-target"));
        if (panel) panel.classList.add("active");
        tab.classList.remove("pop");
        void tab.offsetWidth; // restart the animation on rapid re-clicks
        tab.classList.add("pop");
      });
      tab.addEventListener("animationend", function (ev) {
        if (ev.animationName === "tab-pop") tab.classList.remove("pop");
      });
    });
  });

  /* ---- Training plan: mark today's column / open today's accordion (Mon-Fri only) ---- */
  var today = (new Date().getDay() + 6) % 7; // Mon = 0 … Sun = 6
  if (today < 5) {
    document.querySelectorAll("table.plan tr").forEach(function (tr) {
      var cell = tr.children[today];
      if (cell) cell.classList.add("today");
    });
    var days = document.querySelectorAll(".plan-day");
    if (days[today]) {
      days.forEach(function (d) { d.removeAttribute("open"); });
      days[today].setAttribute("open", "");
      days[today].classList.add("today");
    }
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Contact / signup form (no backend yet -> friendly stub) ---- */
  document.querySelectorAll("form[data-stub]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var hp = form.querySelector(".hp input");
      if (hp && hp.value) return; // honeypot
      var msg = form.querySelector(".form-msg");
      var btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Wird gesendet…"; }
      setTimeout(function () {
        if (msg) { msg.className = "form-msg ok"; msg.textContent = form.getAttribute("data-success") || "Vielen Dank! Wir melden uns in Kürze bei dir."; }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
        if (form.hasAttribute("data-redirect")) {
          setTimeout(function () { window.location.href = form.getAttribute("data-redirect"); }, 900);
        }
      }, 700);
    });
  });

  /* ---- Year in footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
