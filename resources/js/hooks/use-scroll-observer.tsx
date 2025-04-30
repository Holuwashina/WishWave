import { useEffect, useRef, useState } from 'react';

interface ScrollObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollObserver<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = false
}: ScrollObserverOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T | null>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);
  
  return { ref, isInView };
} 