/* ============================================================
   Grindhouse Martial Arts — Instagram Feed module
   Called by: index.html  (<script src="assets/instagram-feed.js" defer>)
   Renders into: <div id="ig-grid">

   Shows the 3 latest POSTS of @grindhouse_martial_arts.

   ── HOW TO GO LIVE ────────────────────────────────────────
   The official Instagram API does NOT expose Stories to third
   parties, so this module shows POSTS only.

   To wire up REAL posts:
   1. Create a Meta App + connect the Instagram Business/Creator
      account (linked to the FB page grindhousemartialarts).
   2. Generate a long-lived access token (Instagram Graph API).
   3. Put it in window.IG_CONFIG (or inject server-side).
   4. In production, proxy the token through a serverless function
      so it never ships in the browser.

   Until a token is present, a branded MOCK feed renders so the
   section never looks broken.
   ============================================================ */
(function () {
  "use strict";

  var IG_CONFIG = window.IG_CONFIG || {
    token: "",                       // paste long-lived token here to enable live mode
    userId: "",                      // IG Business user id (optional; "me" works with token)
    limit: 3,
    profile: "https://www.instagram.com/grindhouse_martial_arts/"
  };

  var GRAPH_FIELDS =
    "id,caption,media_url,thumbnail_url,permalink,media_type,timestamp,like_count,comments_count";

  // Branded mock fallback — 3 latest posts (replace with real screenshots anytime)
  var MOCK_POSTS = [
    {
      permalink: IG_CONFIG.profile,
      media_url: "https://www.grindhousemartialarts.de/wp-content/uploads/2024/10/Grindhouse-26-scaled.jpg",
      caption: "Kickboxen für die Kleinen ab 5 Jahren – Disziplin, Fokus und jede Menge Energie auf der Matte! 🥊 #grindhouse #kickboxen #dinslaken",
      media_type: "IMAGE", like_count: 142, comments_count: 9
    },
    {
      permalink: IG_CONFIG.profile,
      media_url: "https://www.grindhousemartialarts.de/wp-content/uploads/2024/11/PHOTO-2024-11-13-10-51-04.jpg",
      caption: "Yoga bringt Ruhe und Gelassenheit – die perfekte Ergänzung zu unserem dynamischen Kampfsport. 🧘 #yoga #balance #grindhouse",
      media_type: "IMAGE", like_count: 98, comments_count: 4
    },
    {
      permalink: IG_CONFIG.profile,
      media_url: "https://www.grindhousemartialarts.de/wp-content/uploads/2024/10/Grindhouse-40-scaled.jpg",
      caption: "Trainiere mit uns – komm vorbei zur kostenlosen Probeeinheit in Dinslaken! 💪 #probetraining #martialarts",
      media_type: "IMAGE", like_count: 176, comments_count: 12
    }
  ];

  var grid = document.getElementById("ig-grid");
  if (!grid) return;

  var IG_BADGE =
    '<svg class="ig-card__badge" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(posts) {
    grid.innerHTML = "";
    posts.slice(0, IG_CONFIG.limit).forEach(function (p) {
      var img = p.media_type === "VIDEO" ? (p.thumbnail_url || p.media_url) : p.media_url;
      var a = document.createElement("a");
      a.className = "ig-card";
      a.href = p.permalink || IG_CONFIG.profile;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", "Instagram-Beitrag von Grindhouse Martial Arts");
      a.innerHTML =
        IG_BADGE +
        '<img loading="lazy" src="' + esc(img) + '" alt="Instagram-Beitrag von Grindhouse Martial Arts">' +
        '<div class="ig-card__overlay">' +
          '<p>' + esc(p.caption) + '</p>' +
          '<div class="meta">' +
            '<span>&hearts; ' + (p.like_count != null ? p.like_count : "") + '</span>' +
            '<span>&#128172; ' + (p.comments_count != null ? p.comments_count : "") + '</span>' +
          '</div>' +
        '</div>';
      grid.appendChild(a);
    });
  }

  function renderSkeleton() {
    grid.innerHTML = "";
    for (var i = 0; i < IG_CONFIG.limit; i++) {
      var d = document.createElement("div");
      d.className = "ig-card ig-skeleton";
      grid.appendChild(d);
    }
  }

  function fetchLive() {
    var uid = IG_CONFIG.userId || "me";
    var url =
      "https://graph.instagram.com/" + uid + "/media?fields=" +
      encodeURIComponent(GRAPH_FIELDS) +
      "&limit=" + IG_CONFIG.limit +
      "&access_token=" + encodeURIComponent(IG_CONFIG.token);

    renderSkeleton();
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error("IG " + r.status); return r.json(); })
      .then(function (data) {
        if (data && data.data && data.data.length) render(data.data);
        else render(MOCK_POSTS);
      })
      .catch(function (err) {
        if (window.console) console.warn("[IG feed] live fetch failed, using mock:", err.message);
        render(MOCK_POSTS);
      });
  }

  if (IG_CONFIG.token) fetchLive();
  else render(MOCK_POSTS);
})();
