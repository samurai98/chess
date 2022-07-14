import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';
import blackPawn from '../../assets/black-pawn.svg';
import whitePawn from '../../assets/white-pawn.svg';

export class Pawn extends Figure {
  isFirstStep = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.white ? whitePawn : blackPawn;
    this.name = FigureNames.pawn;
  }

  private isEnemy(targetCell: Cell) {
    return targetCell.figure ? this.cell.figure?.color !== targetCell.figure?.color : false;
  }

  canMove(targetCell: Cell) {
    if (!super.canMove(targetCell)) return false;

    const direction = this.cell.figure?.color === Colors.black ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.black ? 2 : -2;

    // move forward
    if (
      (targetCell.y === this.cell.y + direction ||
        (this.isFirstStep && targetCell.y === this.cell.y + firstStepDirection)) &&
      targetCell.x === this.cell.x &&
      this.cell.board.getCell(targetCell.x, targetCell.y).isEmptyCell()
    )
      return true;

    // diagonal attack
    if (
      targetCell.y === this.cell.y + direction &&
      (targetCell.x === this.cell.x + 1 || targetCell.x === this.cell.x - 1) &&
      this.isEnemy(targetCell)
    )
      return true;

    return false;
  }

  moveFigure() {
    this.isFirstStep = false;
  }
}
