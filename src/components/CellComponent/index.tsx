import { useMemo } from 'react';

import { Cell } from '../../models/Cell';
import styles from './styles.module.css';

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
    const classNames = [styles.cell, styles[`${cell.color}-cell`]];

    isSelect && classNames.push(styles['selected-cell']);
    cell.available && cell.figure && classNames.push(styles['available-attack-cell']);

    return classNames.join(' ');
  }, [cell.available, cell.color, cell.figure, isSelect]);

  return (
    <div className={className} onClick={() => onCellClick(cell)}>
      {cell.available && !cell.figure && <div className={styles.available} />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name} />}
    </div>
  );
};
