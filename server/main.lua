local Framework = nil

CreateThread(function()
    Wait(500)

    if Config.Framework == 'esx' or Config.Framework == 'auto' then
        if GetResourceState('es_extended') == 'started' then
            Framework = 'esx'
        end
    end

    if not Framework and (Config.Framework == 'qbcore' or Config.Framework == 'auto') then
        if GetResourceState('qb-core') == 'started' then
            Framework = 'qbcore'
        end
    end

    if not Framework then
        Framework = 'standalone'
    end

    print(('[ins-scoreboard] Framework detected: %s'):format(Framework))
end)

local function buildPayload()
    local players = GetPlayers()
    local list = {}

    for _, src in ipairs(players) do
        local id = tonumber(src)
        if id then
            list[#list + 1] = {
                id = id,
                name = GetPlayerName(id) or ('Player %d'):format(id),
            }
        end
    end

    table.sort(list, function(a, b) return a.id < b.id end)

    local hostMax = GetConvarInt('sv_maxClients', Config.MaxPlayers)

    return {
        players = list,
        total = #list,
        max = hostMax > 0 and hostMax or Config.MaxPlayers,
    }
end

-- Players who currently have the scoreboard open. We push updates to them
-- instead of waiting for them to poll, so joins/leaves show up instantly.
local viewers = {}
local lastRequest = {}

local function pushToViewers()
    if not next(viewers) then return end
    local payload = buildPayload()
    for src in pairs(viewers) do
        TriggerClientEvent('ins-scoreboard:updateData', src, payload)
    end
end

RegisterNetEvent('ins-scoreboard:subscribe', function()
    local src = source
    viewers[src] = true
    TriggerClientEvent('ins-scoreboard:updateData', src, buildPayload())
end)

RegisterNetEvent('ins-scoreboard:unsubscribe', function()
    viewers[source] = nil
end)

-- Manual refresh used by the client's safety poll. Throttled so a client
-- can't spam a rebuild + sort on the server.
RegisterNetEvent('ins-scoreboard:requestData', function()
    local src = source
    local now = GetGameTimer()
    if lastRequest[src] and (now - lastRequest[src]) < 1000 then return end
    lastRequest[src] = now
    TriggerClientEvent('ins-scoreboard:updateData', src, buildPayload())
end)

-- Refresh everyone viewing when the player list actually changes. A short
-- delay lets GetPlayers/GetPlayerName settle before we rebuild.
AddEventHandler('playerJoining', function()
    SetTimeout(250, pushToViewers)
end)

AddEventHandler('playerDropped', function()
    viewers[source] = nil
    lastRequest[source] = nil
    SetTimeout(100, pushToViewers)
end)

exports('getScoreboardPayload', buildPayload)
