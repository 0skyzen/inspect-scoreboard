Config = {}

-- Framework: 'auto' | 'esx' | 'qbcore' | 'standalone'
Config.Framework = 'auto'

-- Toggle key (FiveM key reference: https://docs.fivem.net/docs/game-references/controls/)
Config.OpenKey = 'DELETE'

-- Slot count shown in the UI (also used as max_players fallback)
Config.MaxPlayers = 64

-- Branding
Config.ServerName  = 'INSPECT DEVELOPMENT'
Config.AccentColor = '#e5e7eb' -- neutral light gray (monochrome)
Config.Discord     = 'discord.gg/inspectdev'

-- How often the player list refreshes while the scoreboard is open (ms)
Config.UpdateInterval = 2500

-- UI texts
Config.Strings = {
    no_players = 'No players online',
}
