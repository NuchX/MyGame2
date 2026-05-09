import "./style.css"

import { startGame } from "./game"

const app =
  document.querySelector<HTMLDivElement>(
    "#app"
  )!

app.innerHTML = `
  <div class="menu-screen">

    <h1 class="title">
      ReverseMind
    </h1>

    <p class="subtitle">
      Press the opposite direction
    </p>

    <button id="start-btn">
      START GAME
    </button>

  </div>
`

const startButton =
  document.querySelector(
    "#start-btn"
  ) as HTMLButtonElement

startButton.addEventListener(
  "click",
  () => {
    startGame()
  }
)