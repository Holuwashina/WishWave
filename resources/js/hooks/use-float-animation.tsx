import { useEffect } from 'react';

export function useFloatAnimation() {
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes floating {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return {
    getFloatingStyle: (duration = 3, delay = 0) => ({
      animation: `floating ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }),
  };
} 