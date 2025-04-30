import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  animateClass?: string;
  onReveal?: (element: HTMLElement) => void;
}

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px',
  animateClass = 'animate',
  onReveal,
}: ScrollRevealOptions = {}) {
  const elementsRef = useRef<HTMLElement[]>([]);

  const registerElement = (element: HTMLElement | null) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add(animateClass);
            
            if (onReveal) {
              onReveal(element);
            }
            
            // Stop observing after animation is triggered
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elementsRef.current.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elementsRef.current.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [threshold, rootMargin, animateClass, onReveal]);

  return { registerElement };
} 