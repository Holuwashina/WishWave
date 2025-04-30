import { useEffect } from 'react';

interface FloatingAnimationOptions {
  animationName?: string;
  keyframes?: string;
  duration?: number;
  delay?: number;
  timingFunction?: string;
  iterationCount?: string | number;
  direction?: string;
}

export function useFloatingAnimation({
  animationName = 'floating',
  keyframes = `
    @keyframes floating {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
  `,
  duration = 3000,
  delay = 0,
  timingFunction = 'ease-in-out',
  iterationCount = 'infinite',
  direction = 'normal'
}: FloatingAnimationOptions = {}) {
  
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Set the keyframes
    styleElement.textContent = keyframes;
    
    // Append to the document head
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [keyframes]);
  
  // Return the animation style object
  const getAnimationStyle = (overrides: Partial<FloatingAnimationOptions> = {}) => {
    return {
      animation: `${overrides.animationName || animationName} ${overrides.duration || duration}ms ${overrides.timingFunction || timingFunction} ${overrides.delay || delay}ms ${overrides.iterationCount || iterationCount} ${overrides.direction || direction}`
    };
  };
  
  return {
    getAnimationStyle
  };
} 