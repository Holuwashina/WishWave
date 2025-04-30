import { useEffect, RefObject } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.add('opacity-100');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    const elements = document.querySelectorAll('.js-show-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
} 