import { useEffect, useRef, useState } from 'react';

import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

export const Timer = ({ currentPlayer, restart }: { currentPlayer: Player | null; restart: () => void }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color === Colors.white ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1);
  }
  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1);
  }

  const onRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };

  return (
    <div className="timer">
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>

      <button onClick={onRestart}>Restart</button>
    </div>
  );
};
