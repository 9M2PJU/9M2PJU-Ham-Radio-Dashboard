# 📻 9M2PJU Ham Radio Dashboard

🔥 **Live now at:**  
🌐✨ https://dashboard.hamradio.my ✨🌐

This is a **personalized fork** of an open-source ham radio dashboard,  
tailored by **9M2PJU** for **Malaysian amateur radio operators**. 🇲🇾📡

All credit to the original developer — this is just a local flavor remix. 🎛️

Simple. Fast. Made with 💙 for MY hams. 🚀

## Features
- Responsive grid that collapses 4 cols → 2 (tablet) → 1 (phone)
- Mobile-friendly: hamburger menu toggles, long-press to rotate tiles, pinch-to-zoom fullscreen images
- PWA installable (manifest + service worker for offline shell)
- Toast notifications instead of blocking `alert()` dialogs
- Per-tile loading spinners and embedding-error placeholders
- Resilient RSS ticker with multiple CORS-proxy fallbacks
- Safe JSON config import/export (no `eval`)
- Pauses background work when the tab is hidden
- **Solar conditions widget** — live SFI, Kp, solar wind speed, and X-ray flare class from NOAA SWPC, with a one-line band verdict (OPEN / FAIR / POOR)
- **Single-click fullscreen** on any tile (plus the original double-click), with a visible close button and Esc key support
- **Tile status badges** — amber (loading), green (loaded), red (error) dot on each tile
- **Image preloading** — next image in each tile's rotation is preloaded so switches are instant
- **Iframe sandboxing** — third-party tiles run with restricted privileges
- **Split codebase** — CSS in `styles.css`, JS in `dashboard.js`, markup in `index.html`

