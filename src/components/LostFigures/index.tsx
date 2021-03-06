import { Figure } from '../../models/figures/Figure';
import styles from './styles.module.css';

export const LostFigures = ({ title, figures }: { title: string; figures: Figure[] }) => {
  return (
    <div className={styles.lost}>
      <h3>{title}</h3>

      {figures.map((figure, index) => (
        <div key={index}>
          {figure.logo && <img width={20} height={20} src={figure.logo} />} {figure.name}
        </div>
      ))}
    </div>
  );
};
