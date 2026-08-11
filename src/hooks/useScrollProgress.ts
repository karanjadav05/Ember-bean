import { useState, useEffect, RefObject } from 'react';

export interface ScrollProgressState {
  scrollY: number;
  progress: number; // 0 to 1 for entire page
  journeyProgress: number; // 0 to 1 inside journey container
  activeScene: number; // 1 to 8
}

export function useScrollProgress(containerRef: RefObject<HTMLElement | null>): ScrollProgressState {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    scrollY: 0,
    progress: 0,
    journeyProgress: 0,
    activeScene: 1,
  });

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pageProgress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;

        let journeyProgress = 0;
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const containerHeight = rect.height - window.innerHeight;
          if (containerHeight > 0) {
            const containerTop = -rect.top;
            journeyProgress = Math.min(Math.max(containerTop / containerHeight, 0), 1);
          }
        }

        // Determine active scene (1 to 8) based on journeyProgress
        let scene = 1;
        if (journeyProgress < 0.10) scene = 1;      // Arrival
        else if (journeyProgress < 0.25) scene = 2; // Beans
        else if (journeyProgress < 0.40) scene = 3; // Grind
        else if (journeyProgress < 0.55) scene = 4; // Bloom
        else if (journeyProgress < 0.70) scene = 5; // Pour
        else if (journeyProgress < 0.82) scene = 6; // Wait
        else if (journeyProgress < 0.94) scene = 7; // Ready Cup
        else scene = 8;                             // Sweet Message

        setScrollState({
          scrollY: currentScroll,
          progress: pageProgress,
          journeyProgress,
          activeScene: scene,
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return scrollState;
}
