/* ============================================================
   Grindhouse Martial Arts — DSGVO Consent Manager
   Loaded by: index.html + alle Unterseiten (<script src="assets/consent.js" defer>)

   Zweck: Externe Dienste (Google Fonts, Google Maps) werden AUSSCHLIESSLICH
   nach ausdrücklicher Einwilligung geladen. Standard = nur notwendige Funktionen.

   Speicher: localStorage-Key "gh-consent-v1"
     { necessary:true, fonts:<bool>, maps:<bool>, ts:<epoch-ms> }
     Enthält keine personenbezogenen Daten — nur die Auswahl der Person.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "gh-consent-v1";
  var FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Oswald:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Open+Sans:wght@400;500;600;700&display=swap";

  /* ---------- Storage ---------- */
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function save(state) {
    state.necessary = true;
    state.ts = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    return state;
  }

  /* ---------- Loader: Google Fonts ---------- */
  function loadFonts() {
    if (document.getElementById("gh-fonts")) return;
    var p1 = document.createElement("link"); p1.rel = "preconnect"; p1.href = "https://fonts.googleapis.com";
    var p2 = document.createElement("link"); p2.rel = "preconnect"; p2.href = "https://fonts.gstatic.com"; p2.crossOrigin = "anonymous";
    var l = document.createElement("link"); l.id = "gh-fonts"; l.rel = "stylesheet"; l.href = FONT_HREF;
    document.head.appendChild(p1); document.head.appendChild(p2); document.head.appendChild(l);
  }

  /* ---------- Loader: Google Maps (Zwei-Klick / Consent) ---------- */
  function loadMaps(scope) {
    var boxes = (scope || document).querySelectorAll(".map-embed[data-map]");
    boxes.forEach(function (box) {
      if (box.querySelector("iframe")) return;
      var src = box.getAttribute("data-src");
      if (!src) return;
      var f = document.createElement("iframe");
      f.title = box.getAttribute("data-title") || "Karte";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      f.src = src;
      box.innerHTML = "";
      box.appendChild(f);
    });
  }

  /* ---------- Apply a saved/selected state ---------- */
  function apply(state) {
    if (!state) return;
    if (state.fonts) loadFonts();
    if (state.maps) loadMaps();
  }

  /* ---------- Banner UI ---------- */
  function buildBanner() {
    var el = document.createElement("div");
    el.className = "consent";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Datenschutz-Einstellungen");
    el.innerHTML =
      '<div class="consent__inner">' +
        '<div class="consent__body">' +
          '<h3>Datenschutz &amp; externe Dienste</h3>' +
          '<p>Wir laden externe Inhalte (Google&nbsp;Fonts, Google&nbsp;Maps) erst mit deiner Einwilligung – dabei wird deine IP-Adresse an Google übertragen. Notwendige Funktionen sind immer aktiv. Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern.</p>' +
          '<div class="consent__opts">' +
            '<label class="consent__opt consent__opt--fixed"><input type="checkbox" checked disabled><span><strong>Notwendig</strong><small>Technisch erforderlich – immer aktiv</small></span></label>' +
            '<label class="consent__opt"><input type="checkbox" data-cat="fonts"><span><strong>Web-Schriften</strong><small>Google Fonts – IP-Übertragung an Google</small></span></label>' +
            '<label class="consent__opt"><input type="checkbox" data-cat="maps"><span><strong>Karten</strong><small>Google Maps – IP-Übertragung an Google</small></span></label>' +
          '</div>' +
        '</div>' +
        '<div class="consent__actions">' +
          '<button class="btn btn--ghost consent__deny" type="button">Nur notwendige</button>' +
          '<button class="btn btn--ghost consent__save" type="button">Auswahl speichern</button>' +
          '<button class="btn btn--primary consent__accept" type="button">Alle akzeptieren</button>' +
          '<a class="consent__link" href="datenschutz.html">Datenschutzerklärung</a>' +
        '</div>' +
      '</div>';
    return el;
  }

  var bannerEl = null;

  function showBanner(prefill) {
    if (!bannerEl) {
      bannerEl = buildBanner();
      document.body.appendChild(bannerEl);

      bannerEl.querySelector(".consent__accept").addEventListener("click", function () {
        var s = save({ fonts: true, maps: true }); apply(s); hideBanner();
      });
      bannerEl.querySelector(".consent__deny").addEventListener("click", function () {
        save({ fonts: false, maps: false }); hideBanner();
      });
      bannerEl.querySelector(".consent__save").addEventListener("click", function () {
        var fonts = bannerEl.querySelector('input[data-cat="fonts"]').checked;
        var maps = bannerEl.querySelector('input[data-cat="maps"]').checked;
        var s = save({ fonts: fonts, maps: maps }); apply(s); hideBanner();
      });
    }
    var st = prefill || {};
    bannerEl.querySelector('input[data-cat="fonts"]').checked = !!st.fonts;
    bannerEl.querySelector('input[data-cat="maps"]').checked = !!st.maps;
    requestAnimationFrame(function () { bannerEl.classList.add("open"); });
  }

  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove("open");
  }

  /* ---------- Map "Karte laden" button (delegated) ---------- */
  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest && ev.target.closest(".map-consent__btn");
    if (!btn) return;
    var box = btn.closest(".map-embed");
    var remember = box && box.querySelector(".map-remember");
    if (remember && remember.checked) {
      var s = read() || {}; s.maps = true; save(s);
    }
    if (box) loadMaps(box.parentNode || document);
  });

  /* ---------- Footer trigger to reopen settings ---------- */
  document.addEventListener("click", function (ev) {
    var trg = ev.target.closest && ev.target.closest("[data-consent-open]");
    if (!trg) return;
    ev.preventDefault();
    showBanner(read() || {});
  });

  /* ---------- Init ---------- */
  function init() {
    var state = read();
    if (state) { apply(state); }
    else { showBanner({}); }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
