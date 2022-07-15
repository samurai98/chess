import { useEffect, useRef, useState } from 'react';

import { Player } from '../../models/Player';
import { Colors } from '../../models/Colors';
import styles from './styles.module.css';

const GAME_TIME = 300;

export const Timer = ({ currentPlayer, restart }: { currentPlayer: Player | null; restart: () => void }) => {
  const [blackTime, setBlackTime] = useState(GAME_TIME);
  const [whiteTime, setWhiteTime] = useState(GAME_TIME);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => startTimer(), [currentPlayer]);

  function startTimer() {
    if (timer.current) clearInterval(timer.current);

    timer.current = setInterval(decrementTimer, 1000);
  }

  function decrementTimer() {
    const setTimer = currentPlayer?.color === Colors.white ? setWhiteTime : setBlackTime;

    setTimer(prev => {
      if (prev === 0) {
        timer.current && clearInterval(timer.current);
        return prev;
      }

      return prev - 1;
    });
  }

  const onRestart = () => {
    setWhiteTime(GAME_TIME);
    setBlackTime(GAME_TIME);
    restart();
  };

  return (
    <div className={styles.timer}>
      <h2>Black: {blackTime}</h2>
      <h2>White: {whiteTime}</h2>

      <button onClick={onRestart}>Restart</button>
    </div>
  );
};
