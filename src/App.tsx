import { useCallback, useEffect, useState } from 'react';

import { BoardComponent } from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { LostFigures } from './components/LostFigures';
import { Timer } from './components/Timer';
import './App.css';

export const App = () => {
  const [board, setBoard] = useState(new Board());
  const [blackPlayer] = useState(new Player(Colors.black));
  const [whitePlayer] = useState(new Player(Colors.white));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const restart = useCallback(() => {
    const newBoard = new Board();

    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }, [whitePlayer]);

  useEffect(() => restart(), [restart]);

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.white ? blackPlayer : whitePlayer);
  };

  return (
    <div className="app">
      <Timer restart={restart} currentPlayer={currentPlayer} />

      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} />

      <LostFigures title="Black figures" figures={board.lostBlackFigures} />

      <LostFigures title="White figures" figures={board.lostWhiteFigures} />
    </div>
  );
};
