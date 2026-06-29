local isOpen = false
local lastPayload = nil

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

    -- Render the last known list right away so the board isn't empty for a
    -- frame while we wait for the server. The fresh data follows from subscribe.
    if lastPayload then
        SendNUIMessage({ action = 'updatePlayers', data = lastPayload })
    end

    TriggerServerEvent('ins-scoreboard:subscribe')
end

local function closeScoreboard()
    if not isOpen then return end
    isOpen = false
    sendVisible(false)
    TriggerServerEvent('ins-scoreboard:unsubscribe')
end

RegisterCommand('+ins_scoreboard', openScoreboard, false)
RegisterCommand('-ins_scoreboard', closeScoreboard, false)
RegisterKeyMapping('+ins_scoreboard', 'Open scoreboard', 'keyboard', Config.OpenKey)

RegisterCommand('scoreboard', function()
    if isOpen then closeScoreboard() else openScoreboard() end
end, false)

RegisterNetEvent('ins-scoreboard:updateData', function(data)
    lastPayload = data
    if isOpen then
        SendNUIMessage({ action = 'updatePlayers', data = data })
    end
end)

-- Safety poll while open. The server pushes on join/leave, but this catches
-- anything a push might miss (name changes, missed events).
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

-- Prime the cache once on join so the very first open already has the list.
CreateThread(function()
    Wait(1000)
    TriggerServerEvent('ins-scoreboard:requestData')
end)

RegisterNUICallback('close', function(_, cb)
    closeScoreboard()
    cb({ ok = true })
end)
