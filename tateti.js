// Estado del juego
let board = Array(9).fill(null)
let currentPlayer = "X"
let winner = null
let winningLine = []

// Combinaciones ganadoras
const winningCombinations = [
  [0, 1, 2], // Fila superior
  [3, 4, 5], // Fila media
  [6, 7, 8], // Fila inferior
  [0, 3, 6], // Columna izquierda
  [1, 4, 7], // Columna media
  [2, 5, 8], // Columna derecha
  [0, 4, 8], // Diagonal principal
  [2, 4, 6], // Diagonal secundaria
]

// Elementos del DOM
const cells = document.querySelectorAll(".cell")
const statusElement = document.getElementById("status")
const resetButton = document.getElementById("resetButton")

// Verificar si hay un ganador
function checkWinner() {
  // Verificar combinaciones ganadoras
  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a]
      winningLine = combination
      return true
    }
  }

  // Verificar empate
  if (board.every((cell) => cell !== null)) {
    winner = "Empate"
    return true
  }

  return false
}

// Actualizar la interfaz
function updateUI() {
  // Actualizar celdas
  cells.forEach((cell, index) => {
    cell.textContent = board[index] || ""
    cell.className = "cell"

    if (board[index] === "X") {
      cell.classList.add("x")
    } else if (board[index] === "O") {
      cell.classList.add("o")
    }

    if (winningLine.includes(index)) {
      cell.classList.add("winning")
    }

    if (winner) {
      cell.classList.add("disabled")
    }
  })

  // Actualizar estado
  if (winner) {
    if (winner === "Empate") {
      statusElement.textContent = "¡Es un empate!"
    } else {
      statusElement.textContent = `¡Jugador ${winner} gana!`
    }
  } else {
    statusElement.textContent = `Turno del jugador: ${currentPlayer}`
  }
}

// Manejar click en celda
function handleCellClick(event) {
  const index = Number.parseInt(event.target.dataset.index)

  // No permitir clicks si ya hay un ganador o la celda está ocupada
  if (winner || board[index]) return

  // Colocar la marca del jugador actual
  board[index] = currentPlayer

  // Verificar si hay ganador
  const gameEnded = checkWinner()

  // Cambiar de jugador si el juego no terminó
  if (!gameEnded) {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
  }

  // Actualizar la interfaz
  updateUI()
}

// Reiniciar el juego
function resetGame() {
  board = Array(9).fill(null)
  currentPlayer = "X"
  winner = null
  winningLine = []
  updateUI()
}

// Event listeners
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick)
})

resetButton.addEventListener("click", resetGame)

// Inicializar la interfaz
updateUI()
