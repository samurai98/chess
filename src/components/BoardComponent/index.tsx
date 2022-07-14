import React, { useEffect, useState } from 'react';

import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import { CellComponent } from '../CellComponent';
import styles from './styles.module.css';

export const BoardComponent = ({
  board,
  currentPlayer,
  setBoard,
  swapPlayer,
}: {
  board: Board;
  currentPlayer: Player | null;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => highlightCells(), [selectedCell]);

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function onCellClick(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayer();
    } else {
      if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
    }
  }

  return (
    <div>
      <h3>Move {currentPlayer?.color}</h3>
      <div className={styles.board}>
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map(cell => (
              <CellComponent
                key={cell.id}
                cell={cell}
                isSelect={cell.x === selectedCell?.x && cell.y === selectedCell.y}
                onCellClick={onCellClick}
              />
            ))}
          </React.Fragment>
        ))}

        <div className={styles.col}>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(col => (
            <span key={col}>{col}</span>
          ))}
        </div>

        <div className={styles.row}>
          {['1', '2', '3', '4', '5', '6', '7', '8'].map(row => (
            <span key={row}>{row}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
