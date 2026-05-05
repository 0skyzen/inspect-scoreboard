fx_version 'cerulean'
game 'gta5'

author 'Inspect Development'
description 'Modern React Scoreboard for ESX & QBCore'
version '1.0.0'
repository 'https://github.com/inspect-development/ins-scoreboard'

lua54 'yes'

shared_script 'config.lua'

client_script 'client/main.lua'
server_script 'server/main.lua'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/assets/*.js',
    'html/assets/*.css'
}
