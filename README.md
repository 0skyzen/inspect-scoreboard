# inspect-scoreboard

A modern, lightweight player scoreboard for FiveM — built with React and styled in
the clean **Inspect** dark UI. Hold a key to see who's online, with live updates and
a branded header.

Works on **ESX**, **QBCore** or fully **standalone** (framework is auto-detected).

## Features

- Clean dark UI — rounded card player bubbles, accent-blue ID chips, Rubik font.
- Branded header with logo and server name.
- **Live updates** — the server pushes the list to everyone viewing the moment a
  player joins or leaves, instead of waiting on a poll.
- **Instant open** — the last list is cached client-side and shown immediately, so
  the board never flashes empty while it fetches.
- Automatic layout — fits as many players as the screen allows, with page dots when
  the list is longer.
- Online / max counter pulled from `sv_maxClients`.
- No external dependencies. Standalone-friendly.

## Installation

1. Download and drop `inspect-scoreboard` into your `resources` folder.
2. Add it to your `server.cfg`:

```cfg
ensure inspect-scoreboard
```

3. Restart your server (or `start inspect-scoreboard`).

That's it — no database, no dependencies.

## Usage

| Action | Default |
| --- | --- |
| Hold to view the scoreboard | `DELETE` |
| Toggle command | `/scoreboard` |

The open key is rebindable by each player in **Settings → Key Bindings → FiveM**, or
change the default in `config.lua`.

## Configuration

Everything lives in `config.lua`.

| Option | Description |
| --- | --- |
| `Config.Framework` | `'auto'` \| `'esx'` \| `'qbcore'` \| `'standalone'` |
| `Config.OpenKey` | Default key to hold the scoreboard ([key reference](https://docs.fivem.net/docs/game-references/controls/)) |
| `Config.MaxPlayers` | Slot count fallback if `sv_maxClients` is unavailable |
| `Config.ServerName` | Name shown in the header |
| `Config.AccentColor` | Accent colour (hex), e.g. `#2563A8` |
| `Config.Discord` | Text shown in the footer |
| `Config.UpdateInterval` | Safety poll interval while open, in ms |
| `Config.Strings` | UI texts (e.g. `no_players`) |

## Exports

**Server**

Get the current player payload from another resource:

```lua
local data = exports['inspect-scoreboard']:getScoreboardPayload()
-- data = { players = { { id = 1, name = 'Skyzen' }, ... }, total = 12, max = 64 }
```

## Building the UI

The interface is a React + Vite app under `web/`. The repo already ships a production
build in `html/`, so you only need this if you want to change the UI.

```bash
cd web
npm install
npm run build   # outputs to ../html
```

For live development with hot reload:

```bash
npm run dev
```

## Credits

Made by **Inspect Development**.

## License

Released under the [MIT License](LICENSE) — free to use and modify. A credit back is
appreciated.
