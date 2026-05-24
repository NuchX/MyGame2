let reactionTimes: number[] = []

let gameStartTime = 0

let totalAnswers = 0

let correctAnswers = 0

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

let timer: number


export function showCountdown() {

  const app =
    document.querySelector<HTMLDivElement>(
      "#app"
    )!

  let count = 3

  app.innerHTML = `
    <div class="countdown-screen">

      <h1 id="count-text">
        ARE YOU READY?
      </h1>

    </div>
  `

  const countText =
    document.querySelector(
      "#count-text"
    ) as HTMLHeadingElement

  function updateText(
    text: string
  ) {

    countText.style.opacity = "0"

    countText.style.transform =
      "scale(0.7)"

    setTimeout(() => {

      countText.textContent = text

      countText.style.opacity = "1"

      countText.style.transform =
        "scale(1)"

    }, 250)
  }

  setTimeout(() => {

    updateText("3")

  }, 2500)

  setTimeout(() => {

    updateText("2")

  }, 3500)

  setTimeout(() => {

    updateText("1")

  }, 4500)

  setTimeout(() => {

    updateText("LET'S GO!")

  }, 5500)

  setTimeout(() => {

    startGame()

  }, 6800)
}


export function startGame() {

  reactionTimes = []

  gameStartTime = Date.now()

  score = 0

  lives = 3

  totalAnswers = 0

  correctAnswers = 0

  nextRound()

  document.addEventListener(
    "keydown",
    handleKeyPress
  )
}

function updateDifficulty() {

  if(score >= 60){

    maxTime = 1.5

  } else if(score >= 50){

    maxTime = 1.5

  } else if(score >= 40){

    maxTime = 2

  } else if(score >= 30){

    maxTime = 2.5

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

      timeLeft -= 0.1

      const timerElement =
        document.querySelector(
          "#timer"
        ) as HTMLDivElement

      timerElement.textContent =
        timeLeft.toFixed(1)

      if(timeLeft <= 0){

        timeLeft = 0

        loseLife()
      }

    }, 100)
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

        <div
          class="timer"
          id="timer"
        >
          ${timeLeft.toFixed(1)}
        </div>

        <div class="lives">
          ${"❤️".repeat(lives)}
        </div>

      </div>

      <h1 class="direction">
        ${currentDirection}
      </h1>

      <p class="instruction">
        Press the opposite direction
      </p>

      <div class="controls">
      </div>

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

  totalAnswers++

  if (
    event.code === correctKey
  ) {

    score++

    correctAnswers++

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

  const accuracy =
    totalAnswers > 0
      ? Math.round(
          (
            correctAnswers /
            totalAnswers
          ) * 100
        )
      : 0

  const survivalTime =
    (
      (Date.now() -
        gameStartTime) /
      1000
    ).toFixed(1)

  const bestScore =
    Math.max(
      score,
      Number(
        localStorage.getItem(
          "bestScore"
        ) || 0
      )
    )

  localStorage.setItem(
    "bestScore",
    bestScore.toString()
  )

  const app =
    document.querySelector<HTMLDivElement>(
      "#app"
    )!

  app.innerHTML = `
    <div class="menu-screen">

      <button id="menu-btn">
        ⟵
      </button>

      <h1 class="title">
        GAME OVER
      </h1>

      <div class="stats-grid">

        <div class="stat-card">

          <span>
            SCORE
          </span>

          <h2>
            ${score}
          </h2>

        </div>

        <div class="stat-card">

          <span>
            BEST
          </span>

          <h2>
            ${bestScore}
          </h2>

        </div>

        <div class="stat-card">

          <span>
            ACCURACY
          </span>

          <h2>
            ${accuracy}%
          </h2>

        </div>


        <div class="stat-card">

          <span>
            SURVIVAL
          </span>

          <h2>
            ${survivalTime}s
          </h2>

        </div>

      </div>

      <button id="restart-btn">
        PLAY AGAIN
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

      showCountdown()
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