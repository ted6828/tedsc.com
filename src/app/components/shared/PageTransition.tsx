'use client';

import { useState, useEffect, useMemo } from 'react';

interface FlickerElement {
  id: string;
  type: 'normal' | 'title';
}

export function usePageTransition(currentPage: string, hasHomeButton = false) {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const [flickerCompleted, setFlickerCompleted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Define elements based on current page
  const elements = useMemo(() => {
    const baseElements: FlickerElement[] = [
      { id: 'terminal', type: 'normal' },
      { id: 'title', type: 'title' },
      { id: 'subtitle', type: 'normal' },
      { id: 'email', type: 'normal' },
      { id: 'button1', type: 'normal' },
      { id: 'button2', type: 'normal' },
      { id: 'button3', type: 'normal' },
      { id: 'music', type: 'normal' },
      { id: 'ascii', type: 'normal' },
    ];
    
    if (hasHomeButton) {
      baseElements.push({ id: 'homeButton', type: 'normal' });
    }
    
    return baseElements;
  }, [hasHomeButton]);

  // Initial page load animation
  useEffect(() => {
    if (isTransitioning) return;
    
    const timers: NodeJS.Timeout[] = [];
    const baseDelay = 100;
    const getRandomJitter = () => Math.random() * 100 + 50;
    
    elements.forEach((element, index) => {
      let delay = baseDelay * (index + 1) + getRandomJitter() + 400;
      if (element.id === 'ascii') {
        delay += 50;
      }
      
      const timer = setTimeout(() => {
        setVisibleElements(prev => new Set([...prev, element.id]));
        
        if (element.type === 'title') {
          setTitleVisible(true);
        }
      }, delay);
      
      timers.push(timer);
    });

    // Title double flicker - only on initial load
    const titleElement = elements.find(el => el.type === 'title');
    if (titleElement && isInitialLoad) {
      const lastElementDelay = baseDelay * elements.length + getRandomJitter();
      
      const flickerTimer = setTimeout(() => {
        setTitleVisible(false);
        const flickerBackTimer = setTimeout(() => {
          setTitleVisible(true);
          setFlickerCompleted(true);
          setIsInitialLoad(false);
        }, 133);
        timers.push(flickerBackTimer);
      }, lastElementDelay + 650);
      timers.push(flickerTimer);
    } else if (titleElement && !isInitialLoad) {
      const lastElementDelay = baseDelay * elements.length + getRandomJitter();
      const completedTimer = setTimeout(() => {
        setFlickerCompleted(true);
      }, lastElementDelay + 200);
      timers.push(completedTimer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [elements, isInitialLoad, isTransitioning]);

  const triggerFlickerOut = (callback: () => void) => {
    setIsTransitioning(true);
    
    // Only flicker out content elements
    const flickerOrder = ['button3', 'button2', 'button1', 'email', 'subtitle', 'title'];
    const timers: NodeJS.Timeout[] = [];
    
    flickerOrder.forEach((elementId, index) => {
      if (visibleElements.has(elementId)) {
        const timer = setTimeout(() => {
          setVisibleElements(prev => {
            const newSet = new Set(prev);
            newSet.delete(elementId);
            return newSet;
          });
          
          if (elementId === 'title') {
            setTitleVisible(false);
            setFlickerCompleted(false);
          }
        }, index * 100);
        timers.push(timer);
      }
    });
    
    const callbackTimer = setTimeout(() => {
      callback();
    }, flickerOrder.length * 100 + 100);
    timers.push(callbackTimer);
  };
  
  const triggerFlickerIn = () => {
    // Keep persistent elements visible
    setVisibleElements(prev => {
      const persistentElements = new Set<string>();
      prev.forEach(elementId => {
        if (['terminal', 'music', 'ascii'].includes(elementId)) {
          persistentElements.add(elementId);
        }
      });
      return persistentElements;
    });
    setTitleVisible(false);
    setFlickerCompleted(false);
    
    // Only flicker in content elements
    const contentElements = elements.filter(el => 
      !['terminal', 'music', 'ascii'].includes(el.id)
    );
    
    const timers: NodeJS.Timeout[] = [];
    const baseDelay = 100;
    const getRandomJitter = () => Math.random() * 100 + 50;
    
    contentElements.forEach((element, index) => {
      const delay = baseDelay * (index + 1) + getRandomJitter();
      
      const timer = setTimeout(() => {
        setVisibleElements(prev => new Set([...prev, element.id]));
        
        if (element.type === 'title') {
          setTitleVisible(true);
        }
      }, delay);
      
      timers.push(timer);
    });

    // No double flicker on transitions
    const titleElement = contentElements.find(el => el.type === 'title');
    if (titleElement) {
      const lastElementDelay = baseDelay * contentElements.length + getRandomJitter();
      const completedTimer = setTimeout(() => {
        setFlickerCompleted(true);
        setIsTransitioning(false);
      }, lastElementDelay + 200);
      timers.push(completedTimer);
    }
  };

  return {
    isVisible: (elementId: string) => visibleElements.has(elementId),
    titleVisible,
    flickerCompleted,
    triggerFlickerOut,
    triggerFlickerIn,
    isTransitioning
  };
}