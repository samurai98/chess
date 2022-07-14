import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackQueen from '../../assets/black-queen.svg';
import whiteQueen from '../../assets/white-queen.svg';

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.white ? whiteQueen : blackQueen;
    this.name = FigureNames.queen;
  }

  canMove(targetCell: Cell) {
    if (!super.canMove(targetCell)) return false;

    return (
      this.cell.isEmptyVertical(targetCell) ||
      this.cell.isEmptyHorizontal(targetCell) ||
      this.cell.isEmptyDiagonal(targetCell)
    );
  }
}
