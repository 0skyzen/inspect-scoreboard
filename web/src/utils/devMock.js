// Inject mock data when running with `npm run dev` so the UI is testable in a browser.
// In production (NUI), `window.invokeNative` is defined by CEF.
export function devMockBootstrap(setVisible, setPayload) {
  const isInGame = typeof window !== 'undefined' && typeof window.invokeNative !== 'undefined'
  if (isInGame) return

  // Mark the body so dev-only CSS (e.g. backdrop blur) can opt in.
  document.body.classList.add('dev-mode')

  // Load a FiveM screenshot as the page background so the dev preview
  // matches what the scoreboard looks like in-game.
  // Override with a local file by dropping it at web/public/dev-bg.jpg
  // and changing the URL below to './dev-bg.jpg'.
  const DEV_BG_URL = 'https://cdn.discordapp.com/attachments/1384617951763628122/1501337405133951116/image.png?ex=69fbb4ea&is=69fa636a&hm=2f5b6a820993c74ff3918cf3af05dacb683f66876b86823ebba0760088585646&'
  document.body.style.backgroundImage = `url('${DEV_BG_URL}')`
  document.body.style.backgroundSize = 'cover'
  document.body.style.backgroundPosition = 'center'
  document.body.style.backgroundRepeat = 'no-repeat'

  const baseNames = [
    'Skyzen','James','Michael','Robert','David','William','Richard','Joseph',
    'Thomas','Charles','Christopher','Daniel','Matthew','Anthony','Mark','Donald',
    'Steven','Paul','Andrew','Joshua','Kenneth','Kevin','Brian','George',
    'Edward','Ronald','Timothy','Jason','Jeffrey','Ryan','Jacob','Gary',
    'Nicholas','Eric','Jonathan','Stephen','Larry','Justin','Scott','Brandon',
    'Benjamin','Samuel','Gregory','Frank','Alexander','Raymond','Patrick','Jack',
    'Dennis','Jerry','Tyler','Aaron','Henry','Jose','Douglas','Peter',
    'Adam','Nathan','Zachary','Walter','Kyle','Harold','Carl','Jeremy',
    'Keith','Roger','Gerald','Ethan','Arthur','Terry','Christian','Sean',
    'Lawrence','Austin','Joe','Noah','Jesse','Albert','Bryan','Billy',
    'Bruce','Willie','Jordan','Dylan','Alan','Ralph','Gabriel','Roy',
    'Juan','Wayne','Eugene','Logan','Randy','Louis','Russell','Vincent',
    'Bobby','Caleb','Philip','Johnny',
  ]
  const players = baseNames.slice(0, 100).map((n, i) => ({
    id: i + 1,
    name: n,
  }))

  setPayload({
    players,
    total: players.length,
    max: 128,
  })
  setVisible(true)
}
