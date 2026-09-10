# CLAUDE.md — Grindhouse Martial Arts Homepage

Statische Website, verbesserter Klon von grindhousemartialarts.de (Kampfsportschule Dinslaken).
Reines HTML/CSS/JS. Kein Build, kein Framework, kein npm.

## Links
- Live: https://grindhouse-martial-arts.netlify.app/
- Repo: https://github.com/ben69mikail/Grindhouse (Branch `main`, Owner `ben69mikail`)
- Netlify-Projekt: `grindhouse-martial-arts` — Auto-Deploy bei jedem Push auf `main` (~1 min)
- Original (Referenz für Bilder/Texte): https://www.grindhousemartialarts.de/
- Lokal: `C:\Users\ben_m\Grindhouse`

## Dateien
| Datei | Zweck |
|---|---|
| `index.html` | Startseite: Nav, Hero + Kursfinder, Angebot, Reviews, Über uns, Werte (Foto-Hintergrund), Trainingsplan (Tabelle + Mobile-Accordion, Heute-Markierung), Fotogalerie 3×2, Kontakt + Formular, Footer |
| `anmeldeformular.html` | Online-Anmeldung mit DSGVO-Checkbox → Redirect `bestaetigung.html` |
| `bestaetigung.html` | Erfolgsseite |
| `impressum.html`, `datenschutz.html` | Rechtstexte, echte Firmendaten |
| `assets/style.css` | Design-System + alle Komponenten (~680 Zeilen) |
| `assets/app.js` | Nav-Scroll, Scroll-Progress-Bar, Mobile-Drawer, Kursfilter-Tabs, Reveal (IntersectionObserver), Formular-Stub, Footer-Jahr |
| `assets/consent.js` | DSGVO-Consent-Banner |
| `assets/img/` | Optimierte WebP-Fotos: `galerie-01..06` (900×900), `werte-bg-1920/1080`. Originale in `Fotos/` (gitignored, ~300 MB). Neue Fotos: PIL-Resize auf diese Maße, nie Originale committen |
| `netlify.toml` | `publish = "."`, Redirects `/impressum` etc., Security-Header |

Alle HTML-Seiten laden `assets/style.css` + `assets/app.js` (defer) + `assets/consent.js`. Kein Instagram-Feed mehr (Galerie statt Feed), keine Partner-Sektion mehr.

## Harte Regeln
- **Krav Maga NIE erwähnen** (Kurse, Partner, Texte). User-Vorgabe.
- Design-System beibehalten: Bordeaux, Oswald kursiv (Display), Open Sans (Body), Dark Theme. Keine neuen Fonts/Farben ohne Anweisung.
- Nur Homepage weiterführen. Keine Member-App, kein Next.js (alter Ansatz verworfen).
- Logo + ältere Fotos bleiben Original-URLs von grindhousemartialarts.de; neue Fotos aus `Fotos/` optimiert nach `assets/img/`.
- Deutsch, Du-Ansprache, Texte kurz.
- Jede Animation braucht `prefers-reduced-motion`-Fallback (Block am Ende von style.css).
- Vor Push lokal prüfen: `index.html` im Browser öffnen, Desktop + Mobile (390px).

## Design-Tokens (`:root` in style.css)
```
--red: #961318          Brand (Text, Akzente, Tabellenkopf)
--red-bright: #c9181f   Button-Fläche (Weiß 5,8:1, hebt sich 3,4:1 von #0a0a0a ab)
--red-bright-hover: #e11f27
--red-glow: rgba(201,24,31,.6)
--dark: #0a0a0a  --gray-900 … --gray-300  --cream: #faf6f0
--ease: cubic-bezier(.22,1,.36,1)  --ease-expo: cubic-bezier(.16,1,.3,1)
--radius: 14px  --pill: 100px  --maxw: 1200px
```
Buttons: `.btn .btn--primary` (rot, Kantenlicht, Hover-Sheen), `.btn--ghost` (Rahmen, invertiert auf Hover), `.btn--whatsapp`, `.btn--block`.
Reveal: Element bekommt Klasse `reveal`, JS setzt `in` beim Sichtbarwerden. Stagger via `nth-child`-Delays.
Motion-Bausteine: Hero-Foto liegt auf `.hero::after` (Ken-Burns `hero-zoom` 18s; im `@supports (animation-timeline)`-Block zusätzlich Scroll-Drift + `hero-out` für `.hero__grid` ab 1101px). Split-Bilder wischen per `clip-path` ein, Offer-Card-Fotos setzen sich aus scale(1.12), Value-Icons poppen nach der Karte, Drawer-Links kaskadieren, IG-Cards `rise`. Werte-Sektion: Foto auf `.values-section::before` (Scroll-Drift via `view()`-Timeline). Trainingsplan: Cream-Slot-Kacheln, `td.today`/`th.today`/`.plan-day.today` setzt app.js (Mo–Fr), Heute-Badge + Ring blenden nach dem Row-Cascade ein. Galerie: `.gallery__item` kaskadieren. Kursfinder-Tabs: inaktive Tabs tragen einen 1px-Lichtstrahl (`.filter-tab::before`, `tab-beam` 4,2s, per `nth-child` versetzt), Klick setzt `pop` (`tab-pop`, app.js entfernt bei `animationend`). Alles im Reduced-Motion-Block zurückgesetzt.

## DSGVO / Consent
- localStorage-Key `gh-consent-v1` = `{ necessary:true, fonts:bool, maps:bool, ts }`
- Google Fonts + Google Maps nur nach Opt-in. Banner öffnen: Element mit `data-consent-open`.
- Formulare: Pflicht-Checkbox Datenschutz.
- Beim Testen mit Playwright: Key vorher setzen, sonst verdeckt Banner die Seite.

## Trainingsplan (Source of Truth = index.html)
Personal/Zirkel: Mo–Fr 09:00–10:00 Personal Training · Mo/Mi/Fr 10:00–11:00 Personal Training · Di/Do 10:00–11:00 Zirkel Training.
Kickboxen: Mo & Mi 16:00–16:45 (ab 5) · 17:00–18:00 (ab 8) · 18:00–19:00 Teens · 19:00–20:30 (ab 16).
Weitere: Fr 15:45–16:45 Mini Turnen (ab 1,5) · Di & Do 16:15–17:15 FitKids · Fr 17:00–18:00 Kids & Teens Pro Class · Di 18:00–19:00 Frauen Kickboxen · Fr 18:15–19:15 Kickboxen Sparring.
Kursfinder-Gruppen: Kinder ab 5 / ab 8 / ab 12 / Erwachsene. Änderungen an BEIDEN Stellen (Tabelle + `.plan-accordion`) pflegen.

## Status (2026-09-09)
Erledigt: Klon, GitHub+Netlify, Zirkel Training, Kursfinder im Hero, Google-Reviews (nur >4 Sterne), WhatsApp-FAB nur mobil, FB+IG Buttons, DSGVO-Pass, Design-Pass Button-Kontrast + Motion (Commit `b83d817`), zweiter Design-Pass 2026-09-09: hellere Button-Fläche, Ghost-Rahmen, Hero-Ken-Burns + Scroll-Drift, Clip-Path-Wipes, Icon-/Drawer-/IG-Stagger.

## Offen / Ideen
1. **Formulare haben kein Backend** — `data-stub` in `index.html` + `anmeldeformular.html`. Option: Netlify Forms (`data-netlify="true"`, `name`-Attribut, Honeypot vorhanden `.hp`) → E-Mail-Benachrichtigung im Netlify-Dashboard. Stub-Handler in `app.js` dann entfernen.
3. Echte Google-Reviews-Anbindung (aktuell statisch, 3 Zitate).
4. SEO: `sitemap.xml`, `robots.txt`, Open-Graph-Bilder, JSON-LD `SportsActivityLocation` prüfen.
5. Bilder lokal hosten + WebP (aktuell Hotlinks auf WordPress-Uploads des Originals).
6. Lighthouse-Check Mobile (Hero-Bild `background-attachment: fixed` ist auf Mobile bereits deaktiviert).

## Workflow
```powershell
cd C:\Users\ben_m\Grindhouse
git pull
# …ändern, index.html im Browser prüfen…
git add -A
git commit -m "kurze Beschreibung"
git push origin main
```
Falls `index.lock`-Fehler: `Remove-Item .git\index.lock`, dann erneut.
Optional lokal servern: `python -m http.server 8765` → http://localhost:8765
