const directions = [
  "⬅",
  "➡",
  "⬆",
  "⬇"
]

let currentDirection = ""

let score = 0

let lives = 3

let timeLeft = 3

let maxTime = 3

let timer:
  number

export function startGame() {

  score = 0

  lives = 3

  nextRound()
  
  document.addEventListener(
    "keydown",
    handleKeyPress
  )
}

function updateDifficulty() {

  if (
    score >= 50
  ) {

    maxTime = 1

  } else if (
    score >= 25
  ) {

    maxTime = 2

  } else {

    maxTime = 3
  }
}

function nextRound() {

  clearInterval(timer)

  updateDifficulty()

    timeLeft = maxTime

  currentDirection =
    directions[
      Math.floor(
        Math.random() *
        directions.length
      )
    ]

  renderGame()

  timer =
    setInterval(() => {

      timeLeft--

      renderGame()

      if (
        timeLeft <= 0
      ) {

        loseLife()
      }

    }, 1000)
}

function renderGame() {

  const app =
    document.querySelector<HTMLDivElement>(
      "#app"
    )!

  app.innerHTML = `
    <div class="game-screen">

      <div class="top-bar">

        <div class="score">
          SCORE:
          ${score}
        </div>

        <div class="lives">
          ${"❤️".repeat(lives)}
        </div>

        <div class="timer">
          ${timeLeft}
        </div>

      </div>

      <h1 class="direction">
        ${currentDirection}
      </h1>
      

      <p class="instruction">
        <div class="controls">
        </div>
        Press the opposite direction
      </p>

    </div>
  `
}

function handleKeyPress(
  event: KeyboardEvent
) {

  let correctKey = ""

  if (
    currentDirection === "⬅"
  ) {
    correctKey = "ArrowRight"
  }

  if (
    currentDirection === "➡"
  ) {
    correctKey = "ArrowLeft"
  }

  if (
    currentDirection === "⬆"
  ) {
    correctKey = "ArrowDown"
  }

  if (
    currentDirection === "⬇"
  ) {
    correctKey = "ArrowUp"
  }

  if (
    event.code === correctKey
  ) {

    score++

    nextRound()

  } else {

    loseLife()
  }
}

function loseLife() {

  lives--

  if (
    lives <= 0
  ) {

    showGameOver()

  } else {

    nextRound()
  }
}

function showGameOver() {

  clearInterval(timer)

  const app =
    document.querySelector<HTMLDivElement>(
      "#app"
    )!

    app.innerHTML = `
    <div class="menu-screen">

        <h1 class="title">
        GAME OVER
        </h1>

        <p class="subtitle">
        Final Score:
        ${score}
        </p>

        <button id="restart-btn">
        PLAY AGAIN
        </button>

        <button id="menu-btn">
        ⟵ 
        </button>

    </div>
    `

    const restartButton =
    document.querySelector(
        "#restart-btn"
    ) as HTMLButtonElement

    restartButton.addEventListener(
    "click",
    () => {

        startGame()
    }
    )

    const menuButton =
    document.querySelector(
        "#menu-btn"
    ) as HTMLButtonElement

    menuButton.addEventListener(
    "click",
    () => {

        location.reload()
    }
    )
}