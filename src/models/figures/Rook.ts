import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackRook from '../../assets/black-rook.svg';
import whiteRook from '../../assets/white-rook.svg';

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.white ? whiteRook : blackRook;
    this.name = FigureNames.rook;
  }

  canMove(targetCell: Cell) {
    if (!super.canMove(targetCell)) return false;

    return this.cell.isEmptyVertical(targetCell) || this.cell.isEmptyHorizontal(targetCell);
  }
}
