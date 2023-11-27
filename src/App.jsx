import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
const players = {
  X: "player 1",
  O: "player 2",
};
const IntialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "player 1",
    O: "player 2",
  });
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = [...IntialBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareBox =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareBox =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareBox =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareBox &&
      firstSquareBox === secondSquareBox &&
      firstSquareBox === thirdSquareBox
    ) {
      winner = players[firstSquareBox];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  const handleSquareClick = (rowIndex, columnIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  const handleRestart = () => {
    setGameTurns([]);
  };
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSquareClick} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
