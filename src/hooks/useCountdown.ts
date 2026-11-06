import { useState, useEffect, useMemo } from 'react';

export interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
  totalSecondsRemaining: number;
}

export function useCountdown(targetIsoDate: string): CountdownState {
  const targetTime = useMemo(() => new Date(targetIsoDate).getTime(), [targetIsoDate]);

  const calculateTimeLeft = (): CountdownState => {
    const now = Date.now();
    const difference = targetTime - now;

    if (isNaN(difference) || difference <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        isExpired: true,
        totalSecondsRemaining: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    return {
      days: String(d).padStart(2, '0'),
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
      isExpired: false,
      totalSecondsRemaining: totalSeconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownState>(calculateTimeLeft);

  useEffect(() => {
    // Initial evaluation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return timeLeft;
}
