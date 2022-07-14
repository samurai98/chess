import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackKnight from '../../assets/black-knight.svg';
import whiteKnight from '../../assets/white-knight.svg';

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.white ? whiteKnight : blackKnight;
    this.name = FigureNames.knight;
  }

  canMove(targetCell: Cell) {
    if (!super.canMove(targetCell)) return false;

    const dx = Math.abs(this.cell.x - targetCell.x);
    const dy = Math.abs(this.cell.y - targetCell.y);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}
