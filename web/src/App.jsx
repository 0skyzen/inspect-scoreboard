import { useEffect, useState } from 'react'
import Scoreboard from './components/Scoreboard.jsx'
import useNuiEvent from './hooks/useNuiEvent.js'
import { devMockBootstrap } from './utils/devMock.js'

const DEFAULT_CONFIG = {
  serverName: 'INSPECT DEVELOPMENT',
  accentColor: '#2563A8',
  discord: 'discord.gg/inspectdev',
  maxPlayers: 128,
  openKey: 'DELETE',
  strings: {
    no_players: 'No players online',
  },
}

export default function App() {
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [payload, setPayload] = useState({ players: [], total: 0, max: 128 })

  useNuiEvent('setVisible', (msg) => {
    setVisible(!!msg.visible)
    if (msg.config) setConfig((c) => ({ ...c, ...msg.config }))
  })

  useNuiEvent('updatePlayers', (msg) => {
    if (msg.data) setPayload(msg.data)
  })

  useEffect(() => {
    devMockBootstrap(setVisible, setPayload)
  }, [])

  return (
    <div
      className={`app-root ${visible ? 'is-visible' : ''}`}
      style={{ '--accent': config.accentColor || '#e5e7eb' }}
    >
      <Scoreboard config={config} payload={payload} visible={visible} />
    </div>
  )
}
