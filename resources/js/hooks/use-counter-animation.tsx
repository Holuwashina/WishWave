import { useState, useEffect, useRef } from 'react';

interface CounterAnimationOptions {
  targetValue: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  easing?: (t: number) => number;
  prefix?: string;
  suffix?: string;
  onComplete?: () => void;
}

// Easing functions
const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
};

export function useCounterAnimation({
  targetValue,
  duration = 2000,
  delay = 0,
  decimals = 0,
  easing = easings.easeOutQuad,
  prefix = '',
  suffix = '',
  onComplete,
}: CounterAnimationOptions) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Reset animation state when target value changes
    setDisplayValue(0);
    isAnimating.current = false;
    startTimeRef.current = null;
    
    // Clear any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Delay the animation start if needed
    const timeoutId = setTimeout(() => {
      isAnimating.current = true;
      
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        
        if (elapsed < duration) {
          // Calculate progress based on easing function
          const progress = easing(Math.min(elapsed / duration, 1));
          const currentValue = progress * targetValue;
          
          setDisplayValue(currentValue);
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete
          setDisplayValue(targetValue);
          isAnimating.current = false;
          if (onComplete) onComplete();
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration, delay, easing, onComplete]);

  // Format the display value with the specified number of decimals and add prefix/suffix
  const formattedValue = `${prefix}${displayValue.toFixed(decimals)}${suffix}`;

  return { 
    value: displayValue,
    formattedValue,
    isAnimating: isAnimating.current
  };
} 