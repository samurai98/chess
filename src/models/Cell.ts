import { Board } from './Board';
import { Colors } from './Colors';
import { Figure } from './figures/Figure';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;

  id: string;
  figure: Figure | null;
  board: Board;
  available: boolean;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.id = String(x) + String(y);
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(cell: Cell) {
    if (this.figure?.canMove(cell)) {
      this.figure.moveFigure();

      if (cell.figure) this.board.addLostFigure(cell.figure);

      cell.setFigure(this.figure);
      this.figure = null;
    }
  }

  isEmptyCell() {
    return this.figure === null;
  }

  isEmptyVertical(targetCell: Cell) {
    if (this.x !== targetCell.x) return false;

    const min = Math.min(this.y, targetCell.y);
    const max = Math.max(this.y, targetCell.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmptyCell()) return false;
    }

    return true;
  }

  isEmptyHorizontal(targetCell: Cell) {
    if (this.y !== targetCell.y) return false;

    const min = Math.min(this.x, targetCell.x);
    const max = Math.max(this.x, targetCell.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmptyCell()) return false;
    }

    return true;
  }

  isEmptyDiagonal(targetCell: Cell) {
    const absX = Math.abs(targetCell.x - this.x);
    const absY = Math.abs(targetCell.y - this.y);

    if (absX !== absY) return false;

    const dx = this.x < targetCell.x ? 1 : -1;
    const dy = this.y < targetCell.y ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmptyCell()) return false;
    }

    return true;
  }
}
