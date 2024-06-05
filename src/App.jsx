import Player from './components/Player';
import React from 'react';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import Log from './components/log';
import { WINNING_COMBINATIONS } from './WinningCombinations';
import GameOver from './components/GameOver';
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSqsym = gameBoard[combination[0].row][combination[0].column];
    const secondSqsym = gameBoard[combination[1].row][combination[1].column];
    const thirdSqsym = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSqsym &&
      firstSqsym === secondSqsym &&
      firstSqsym === thirdSqsym
    ) { winner = players[firstSqsym]; 

    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS );
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;
  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handleNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handleNameChange}
          />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} restart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectedSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>

  );
}

export default App
