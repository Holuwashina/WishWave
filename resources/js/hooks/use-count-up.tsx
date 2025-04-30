import { useState, useEffect } from 'react';

interface CountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  formatter?: (value: number) => string;
  onComplete?: () => void;
}

export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  formatter = (value: number) => Math.round(value).toString(),
  onComplete
}: CountUpOptions) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (delay > 0) {
      timer = setTimeout(() => {
        setIsRunning(true);
      }, delay);
    } else {
      setIsRunning(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  useEffect(() => {
    if (!isRunning) return;

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Use easeOutExpo for smoother animation
      const easeOutValue = 1 - Math.pow(2, -10 * percentage);
      const currentCount = start + (end - start) * easeOutValue;
      
      setCount(currentCount);

      if (progress < duration) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsRunning(false);
        if (onComplete) onComplete();
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [start, end, duration, isRunning, onComplete]);

  return formatter(count);
} 