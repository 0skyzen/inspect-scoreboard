# INS Scoreboard

**A modern, minimalistic and ultra-optimized scoreboard system for FiveM (ESX & QBCore) — designed for serious roleplay servers that want a clean, premium and fully customizable player list.**


---

## Highlights

- **Modern Scoreboard UI** — Clean React-based interface with smooth fade and lift animations, premium dark theme.
- **Real-time Player List** — Live online / max counter that auto-syncs from `sv_maxClients`, refreshes while open.
- **ID + Name Bubbles** — Each player rendered as a polished pill with their server ID badge and display name.
- **Dynamic Pagination** — Auto-measures viewport on open and only paginates when bubbles actually overflow — no wasted space, no hardcoded page sizes.
- **Keyboard & Click Navigation** — Browse pages with `←` / `→` arrow keys or on-screen `‹ 1 / 2 ›` controls.
- **Centered Footer** — Discord URL and live player count rendered in a clean centered footer at the bottom.
- **Auto Framework Detection** — Works out of the box with ESX, QBCore, or standalone mode (auto-detected on boot).
- **Configurable Open Key** — Default `DEL` (hold to open), fully remappable in-game via FiveM Key Bindings.
- **Custom Branding** — Set your server name, Discord invite, and accent color in a single `config.lua`.
- **Fully Configurable** — Single `config.lua` covers framework, keybind, max players, branding, refresh interval, and locale strings.
- **React Source Included** — Edit `web/src/` and run `npm run build` — no lock-in, hack the UI to your taste.
- **Pre-built Bundle** — Ships with a ready-to-use bundle in `html/`, no `npm install` required for end users.
- **Server Export** — Other resources can call `exports['ins-scoreboard']:getScoreboardPayload()` to access live data.
- **Multilingual Ready** — English by default, all UI strings live in `Config.Strings` for easy translation.
- **Performance** — Event-driven NUI messaging, lightweight DOM, refreshes only while the scoreboard is open.
- **Lean & Clean** — Zero dead code, no bloat, MIT-licensed and free for the Inspect Development Discord community.

---

## Preview

> ![preview](https://i.imgur.com/0L9fs38.png)
