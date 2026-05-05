local isOpen = false

local function sendVisible(visible)
    SendNUIMessage({
        action = 'setVisible',
        visible = visible,
        config = {
            serverName  = Config.ServerName,
            accentColor = Config.AccentColor,
            discord     = Config.Discord,
            maxPlayers  = Config.MaxPlayers,
            openKey     = Config.OpenKey,
            strings     = Config.Strings,
        }
    })
end

local function openScoreboard()
    if isOpen then return end
    isOpen = true
    sendVisible(true)
    TriggerServerEvent('ins-scoreboard:requestData')
end

local function closeScoreboard()
    if not isOpen then return end
    isOpen = false
    sendVisible(false)
end

RegisterCommand('+ins_scoreboard', openScoreboard, false)
RegisterCommand('-ins_scoreboard', closeScoreboard, false)
RegisterKeyMapping('+ins_scoreboard', 'Open scoreboard', 'keyboard', Config.OpenKey)

RegisterCommand('scoreboard', function()
    if isOpen then closeScoreboard() else openScoreboard() end
end, false)

RegisterNetEvent('ins-scoreboard:updateData', function(data)
    SendNUIMessage({ action = 'updatePlayers', data = data })
end)

CreateThread(function()
    while true do
        if isOpen then
            TriggerServerEvent('ins-scoreboard:requestData')
            Wait(Config.UpdateInterval or 2500)
        else
            Wait(500)
        end
    end
end)

RegisterNUICallback('close', function(_, cb)
    closeScoreboard()
    cb({ ok = true })
end)
