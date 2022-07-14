import { Cell } from '../Cell';
import { Colors } from '../Colors';

export enum FigureNames {
  /** Фигура */
  figure = 'figure',
  /** Слон */
  bishop = 'bishop',
  /** Король */
  king = 'king',
  /** Конь */
  knight = 'knight',
  /** Пешка */
  pawn = 'pawn',
  /** Ферзь */
  queen = 'queen',
  /** Ладья */
  rook = 'rook',
}

export abstract class Figure {
  color: Colors;
  logo: string | null;
  cell: Cell;
  name: FigureNames;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.figure;
  }

  canMove(targetCell: Cell) {
    if (targetCell.figure?.color === this.color || targetCell.figure?.name === FigureNames.king) return false;

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  moveFigure() {}
}
