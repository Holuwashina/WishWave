import { useEffect } from 'react';

interface SmoothScrollOptions {
    offset?: number;
    behavior?: ScrollBehavior;
    preventDefault?: boolean;
}

export function useSmoothScroll({
    offset = 0,
    behavior = 'smooth',
    preventDefault = true
}: SmoothScrollOptions = {}) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');

            if (!anchor) return;

            const id = anchor.getAttribute('href');
            if (!id) return;

            const element = document.querySelector(id);
            if (!element) return;

            if (preventDefault) {
                e.preventDefault();
            }

            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: behavior
            });
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [offset, behavior, preventDefault]);

    const scrollToElement = (elementId: string) => {
        const element = document.querySelector(elementId);
        if (!element) return;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: behavior
        });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: behavior
        });
    };

    return {
        scrollToElement,
        scrollToTop
    };
} 