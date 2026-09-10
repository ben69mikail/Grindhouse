# Grindhouse Martial Arts — v2 (verbesserter Klon)

Statische, moderne Neufassung von grindhousemartialarts.de.
Reines HTML/CSS/JS, kein Build nötig. Lokal öffnen: `index.html` im Browser.

## Dateien
- `index.html` — Startseite (Hero, Angebot, Warum, Werte, Kursfilter, Trainingsplan, Fotogalerie, Kontakt, Footer)
- `anmeldeformular.html` — Online-Anmeldung mit DSGVO-Checkbox → leitet zu `bestaetigung.html`
- `bestaetigung.html` — Erfolgsseite
- `impressum.html` / `datenschutz.html` — Rechtstexte (echte Firmendaten)
- `assets/style.css` — Design-System (Bordeaux #961318, Oswald-Italic, Open Sans, Dark Theme)
- `assets/app.js` — Navigation, Mobile-Drawer, Kursfilter, Reveal-Animationen, Formular-Stub
- `assets/img/` — optimierte WebP-Fotos (Galerie 900×900, Werte-Hintergrund 1920/1080); Originale liegen unter `Fotos/` (nicht im Repo)

## Was geändert wurde ggü. Original
- **Krav Maga komplett entfernt** (Kurs-Karte + Partner-Logo)
- Modernes Dark-Theme statt WordPress-Optik
- **Fotogalerie** (6 Trainingsfotos) statt Instagram-Feed, Instagram-Button bleibt
- **Facebook + Instagram Buttons im Footer**
- Kein Member-Bereich (auf Wunsch vorerst weggelassen)

## Formulare
Kontakt- und Anmeldeformular laufen aktuell als Frontend-Stub (kein Backend).
Für Live-Betrieb einen E-Mail-/DB-Endpunkt anbinden.

## Deploy
Verbunden mit Netlify-Projekt grindhouse-martial-arts — Auto-Deploy bei jedem Push auf main.
`netlify.toml` setzt publish-dir, Redirects (saubere URLs) und Security-Header.
