# Grindhouse Martial Arts — v2 (verbesserter Klon)

Statische, moderne Neufassung von grindhousemartialarts.de.
Reines HTML/CSS/JS, kein Build nötig. Lokal öffnen: `index.html` im Browser.

## Dateien
- `index.html` — Startseite (Hero, Angebot, Warum, Werte, Kursfilter, Trainingsplan, Instagram-Feed, Kontakt, Partner, Footer)
- `anmeldeformular.html` — Online-Anmeldung mit DSGVO-Checkbox → leitet zu `bestaetigung.html`
- `bestaetigung.html` — Erfolgsseite
- `impressum.html` / `datenschutz.html` — Rechtstexte (echte Firmendaten)
- `assets/style.css` — Design-System (Bordeaux #961318, Oswald-Italic, Open Sans, Dark Theme)
- `assets/app.js` — Navigation, Mobile-Drawer, Kursfilter, Reveal-Animationen, Formular-Stub
- `assets/instagram-feed.js` — IG-Feed (3 neueste Posts)

## Was geändert wurde ggü. Original
- **Krav Maga komplett entfernt** (Kurs-Karte + Partner-Logo)
- Modernes Dark-Theme statt WordPress-Optik
- Echter **Instagram-Feed-Bereich** (3 neueste Posts) — Schnittstelle vorbereitet
- **Facebook + Instagram Buttons im Footer**
- Kein Member-Bereich (auf Wunsch vorerst weggelassen)

## Instagram-Feed live schalten
Stories sind über die offizielle API NICHT abrufbar → nur Posts.
1. Meta-App anlegen + Instagram-Business-Account (verknüpft mit der FB-Seite) verbinden
2. Long-Lived Access Token (Instagram Graph API) erzeugen
3. In `assets/instagram-feed.js` unter `IG_CONFIG.token` eintragen
   (für Produktion Token serverseitig per kleiner Funktion proxen)
Ohne Token rendert ein gebrandeter Mock-Feed mit 3 Beiträgen.

## Formulare
Kontakt- und Anmeldeformular laufen aktuell als Frontend-Stub (kein Backend).
Für Live-Betrieb einen E-Mail-/DB-Endpunkt anbinden.

## Deploy
Verbunden mit Netlify-Projekt grindhouse-martial-arts — Auto-Deploy bei jedem Push auf main.
`netlify.toml` setzt publish-dir, Redirects (saubere URLs) und Security-Header.
