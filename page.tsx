"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Player = "X" | "O" | null

export default function TatetiGame() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player | "Empate" | null>(null)
  const [winningLine, setWinningLine] = useState<number[]>([])

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

  const checkWinner = (newBoard: Player[]) => {
    // Verificar si hay un ganador
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a])
        setWinningLine(combination)
        return true
      }
    }

    // Verificar empate
    if (newBoard.every((cell) => cell !== null)) {
      setWinner("Empate")
      return true
    }

    return false
  }

  const handleCellClick = (index: number) => {
    // No permitir clicks si ya hay un ganador o la celda está ocupada
    if (winner || board[index]) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    // Verificar si hay ganador
    const gameEnded = checkWinner(newBoard)

    // Cambiar de jugador si el juego no terminó
    if (!gameEnded) {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setWinningLine([])
  }

  const getCellClassName = (index: number) => {
    const baseClasses =
      "aspect-square flex items-center justify-center text-5xl font-bold cursor-pointer transition-all hover:bg-accent/50 rounded-lg"

    if (winningLine.includes(index)) {
      return `${baseClasses} bg-primary/20 text-primary`
    }

    if (board[index] === "X") {
      return `${baseClasses} text-blue-600 dark:text-blue-400`
    }

    if (board[index] === "O") {
      return `${baseClasses} text-red-600 dark:text-red-400`
    }

    return `${baseClasses} ${winner ? "cursor-not-allowed" : ""}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Tateti</CardTitle>
          <CardDescription>
            {winner
              ? winner === "Empate"
                ? "¡Es un empate!"
                : `¡Jugador ${winner} gana!`
              : `Turno del jugador: ${currentPlayer}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tablero de juego */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-muted/30 rounded-lg">
            {board.map((cell, index) => (
              <div key={index} onClick={() => handleCellClick(index)} className={getCellClassName(index)}>
                {cell}
              </div>
            ))}
          </div>

          {/* Botón de reinicio */}
          <Button onClick={resetGame} className="w-full" size="lg">
            Nuevo Juego
          </Button>

          {/* Estadísticas del juego */}
          <div className="flex justify-around text-center pt-4 border-t">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">X</div>
              <div className="text-sm text-muted-foreground">Jugador 1</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-muted-foreground">VS</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">O</div>
              <div className="text-sm text-muted-foreground">Jugador 2</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
