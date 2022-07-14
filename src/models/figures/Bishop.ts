import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackBishop from '../../assets/black-bishop.svg';
import whiteBishop from '../../assets/white-bishop.svg';

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.white ? whiteBishop : blackBishop;
    this.name = FigureNames.bishop;
  }

  canMove(targetCell: Cell) {
    if (!super.canMove(targetCell)) return false;

    return this.cell.isEmptyDiagonal(targetCell);
  }
}
