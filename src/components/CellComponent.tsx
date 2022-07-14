import { useMemo } from 'react';

import { Cell } from '../models/Cell';

export const CellComponent = ({
  cell,
  isSelect,
  onCellClick,
}: {
  cell: Cell;
  isSelect: boolean;
  onCellClick: (cell: Cell) => void;
}) => {
  const className = useMemo(() => {
    const classNames = ['cell', `${cell.color}-cell`];

    isSelect && classNames.push('selected-cell');
    cell.available && cell.figure && classNames.push('available-attack-cell');

    return classNames.join(' ');
  }, [cell.available, cell.color, cell.figure, isSelect]);

  return (
    <div className={className} onClick={() => onCellClick(cell)}>
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name} />}
    </div>
  );
};
