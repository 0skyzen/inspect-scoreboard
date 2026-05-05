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

RegisterNetEvent('ins-scoreboard:requestData', function()
    local src = source
    TriggerClientEvent('ins-scoreboard:updateData', src, buildPayload())
end)

exports('getScoreboardPayload', buildPayload)
