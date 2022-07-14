import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackKing from '../../assets/black-king.svg';
import whiteKing from '../../assets/white-king.svg';

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.white ? whiteKing : blackKing;
    this.name = FigureNames.king;
  }

  canMove(targetCell: Cell) {
    if (!super.canMove(targetCell)) return false;

    const isHorizontalMove =
      (targetCell.x === this.cell.x + 1 || targetCell.x === this.cell.x - 1) && targetCell.y === this.cell.y;
    const isVerticalMove =
      (targetCell.y === this.cell.y + 1 || targetCell.y === this.cell.y - 1) && targetCell.x === this.cell.x;
    const isRightDiagonal =
      (targetCell.x === this.cell.x + 1 && targetCell.y === this.cell.y - 1) ||
      (targetCell.x === this.cell.x - 1 && targetCell.y === this.cell.y + 1);
    const isLeftDiagonal =
      (targetCell.x === this.cell.x + 1 && targetCell.y === this.cell.y + 1) ||
      (targetCell.x === this.cell.x - 1 && targetCell.y === this.cell.y - 1);

    return isVerticalMove || isHorizontalMove || isLeftDiagonal || isRightDiagonal;
  }
}
