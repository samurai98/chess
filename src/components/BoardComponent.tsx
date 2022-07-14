import React, { useEffect, useState } from 'react';

import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import { CellComponent } from './CellComponent';

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
      <div className="board">
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

        <div className="col">
          <span>a</span>
          <span>b</span>
          <span>c</span>
          <span>d</span>
          <span>e</span>
          <span>f</span>
          <span>g</span>
          <span>h</span>
        </div>

        <div className="row">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
        </div>
      </div>
    </div>
  );
};
