'use client';

import { useState, useEffect } from 'react';

interface FlickerElement {
  id: string;
  type: 'normal' | 'title';
}

export function useDynamicFlickerAnimation(elements: FlickerElement[]) {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // flicker on load effect
    const baseDelay = 100;
    const getRandomJitter = () => Math.random() * 100 + 50; // 50-150ms jitter
    
    // Create timers for each element
    elements.forEach((element, index) => {
      let delay = baseDelay * (index + 1) + getRandomJitter() + 400; // when deployed its too quick!
      // if delay index is 8 ( ascii animation ), add an extra 50ms to the delay
      if (index === 8) {
        delay += 50;
      }
      
      const timer = setTimeout(() => {
        setVisibleElements(prev => new Set([...prev, element.id]));
        
        // title secondary flicker
        if (element.type === 'title') {
          setTitleVisible(true);
        }
      }, delay);
      
      timers.push(timer);
    });

    // Find the title element to handle flickering
    const titleElement = elements.find(el => el.type === 'title');
    if (titleElement) {
      //const titleIndex = elements.indexOf(titleElement);
      const lastElementDelay = baseDelay * elements.length + getRandomJitter();
      
      // Simple one-time flicker after everything has loaded
      const flickerTimer = setTimeout(() => {
        setTitleVisible(false);
        const flickerBackTimer = setTimeout(() => {
          setTitleVisible(true);
        }, 125);
        timers.push(flickerBackTimer);
      }, lastElementDelay + 1000); // flicker 1 second after last
      timers.push(flickerTimer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [elements]);

  return { 
    isVisible: (elementId: string) => visibleElements.has(elementId),
    titleVisible 
  };
}