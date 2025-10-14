// Estado del juego
let board = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let gameActive = true
const scores = {
  X: 0,
  O: 0,
  draw: 0,
}

// Combinaciones ganadoras
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

// Elementos del DOM
const cells = document.querySelectorAll(".cell")
const currentPlayerDisplay = document.getElementById("current-player")
const messageDisplay = document.getElementById("message")
const restartBtn = document.getElementById("restart-btn")
const scoreX = document.getElementById("score-x")
const scoreO = document.getElementById("score-o")
const scoreDraw = document.getElementById("score-draw")

// Inicializar el juego
function initGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick)
  })
  restartBtn.addEventListener("click", restartGame)
  updateScoreDisplay()
}

// Manejar clic en celda
function handleCellClick(event) {
  const clickedCell = event.target
  const clickedCellIndex = Number.parseInt(clickedCell.getAttribute("data-index"))

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return
  }

  updateCell(clickedCell, clickedCellIndex)
  checkResult()
}

// Actualizar celda
function updateCell(cell, index) {
  board[index] = currentPlayer
  cell.textContent = currentPlayer
  cell.classList.add(currentPlayer.toLowerCase())
  cell.disabled = true
}

// Verificar resultado
function checkResult() {
  let roundWon = false
  let winningCombination = []

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i]
    if (board[a] === "" || board[b] === "" || board[c] === "") {
      continue
    }
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true
      winningCombination = [a, b, c]
      break
    }
  }

  if (roundWon) {
    announceWinner(currentPlayer, winningCombination)
    scores[currentPlayer]++
    updateScoreDisplay()
    gameActive = false
    return
  }

  // Verificar empate
  if (!board.includes("")) {
    announceDraw()
    scores.draw++
    updateScoreDisplay()
    gameActive = false
    return
  }

  // Cambiar turno
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  currentPlayerDisplay.textContent = currentPlayer
  currentPlayerDisplay.className = currentPlayer === "X" ? "text-blue-600" : "text-purple-600"
}

// Anunciar ganador
function announceWinner(player, combination) {
  messageDisplay.querySelector("p").textContent = `¡Jugador ${player} gana!`
  messageDisplay.querySelector("p").className =
    player === "X" ? "text-lg font-bold text-blue-600" : "text-lg font-bold text-purple-600"

  // Resaltar celdas ganadoras
  combination.forEach((index) => {
    cells[index].classList.add("winner-cell")
  })

  // Deshabilitar todas las celdas
  cells.forEach((cell) => (cell.disabled = true))
}

// Anunciar empate
function announceDraw() {
  messageDisplay.querySelector("p").textContent = "¡Empate!"
  messageDisplay.querySelector("p").className = "text-lg font-bold text-gray-600"
}

// Reiniciar juego
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""]
  gameActive = true
  currentPlayer = "X"
  currentPlayerDisplay.textContent = "X"
  currentPlayerDisplay.className = "text-blue-600"
  messageDisplay.querySelector("p").textContent = ""

  cells.forEach((cell) => {
    cell.textContent = ""
    cell.disabled = false
    cell.className = "cell"
  })
}

// Actualizar marcador
function updateScoreDisplay() {
  scoreX.textContent = scores.X
  scoreO.textContent = scores.O
  scoreDraw.textContent = scores.draw
}

// Iniciar el juego cuando cargue la página
initGame()
