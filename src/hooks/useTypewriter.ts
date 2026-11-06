import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  active?: boolean;
}

export function useTypewriter({ text, speed = 35, active = true }: UseTypewriterOptions): string {
  const isReduced = useReducedMotion();
  const [displayedText, setDisplayedText] = useState(isReduced ? text : '');

  useEffect(() => {
    if (isReduced) {
      setDisplayedText(text);
      return;
    }

    if (!active) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');

    const intervalId = setInterval(() => {
      currentIndex += 1;
      setDisplayedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, active, isReduced]);

  return displayedText;
}
