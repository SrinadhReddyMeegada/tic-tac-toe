import { useState } from "react";

const IntialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(IntialBoard);
  const clickHandler = (rowIndex, columnIndex) => {
    setGameBoard((prevGameBoard) => {
      const updatedArray = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedArray[rowIndex][columnIndex] = activePlayerSymbol;
      return updatedArray;
    });
    onSelectSquare();
  };
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button onClick={() => clickHandler(rowIndex, columnIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
