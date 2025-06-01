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
      { id: 'title', type: 'title' }
    ];

    if (currentPage === 'home') {
      baseElements.push(
        { id: 'subtitle', type: 'normal' },
        { id: 'email', type: 'normal' },
        { id: 'button1', type: 'normal' },
        { id: 'button2', type: 'normal' },
        { id: 'button3', type: 'normal' },
        { id: 'music', type: 'normal' },
        { id: 'ascii', type: 'normal' }
      );
    } else if (currentPage === 'socials') {
      baseElements.push(
        { id: 'subtitle', type: 'normal' },
        { id: 'email', type: 'normal' },
        { id: 'button1', type: 'normal' },
        { id: 'button2', type: 'normal' },
        { id: 'button3', type: 'normal' },
        { id: 'music', type: 'normal' },
        { id: 'ascii', type: 'normal' }
      );
    } else if (currentPage === 'whoami') {
      baseElements.push(
        { id: 'subtitle', type: 'normal' },
        { id: 'content1', type: 'normal' },
        { id: 'content2', type: 'normal' },
        { id: 'content3', type: 'normal' },
        { id: 'content4', type: 'normal' },
        { id: 'content5', type: 'normal' },
        { id: 'music', type: 'normal' },
        { id: 'ascii', type: 'normal' }
      );
    }
    
    if (hasHomeButton) {
      baseElements.push({ id: 'homeButton', type: 'normal' });
    }
    
    return baseElements;
  }, [hasHomeButton, currentPage]);

  // Initial page load animation - only run on true initial load
  useEffect(() => {
    if (!isInitialLoad || isTransitioning) return;
    
    const timers: NodeJS.Timeout[] = [];
    const baseDelay = 75;
    const getRandomJitter = () => Math.random() * 100 + 50;
    
    // Use original simple approach - animate all elements by their array index
    elements.forEach((element, index) => {
      const delay = baseDelay * (index + 1) + getRandomJitter() + 400;

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
    if (titleElement) {
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
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [elements, isInitialLoad, isTransitioning]);

  const triggerFlickerOut = (callback: () => void) => {
    setIsTransitioning(true);
    
    // Only flicker out content elements that actually exist (reverse order)
    const allFlickerOrder = ['button3', 'button2', 'button1', 'content5', 'content4', 'content3', 'content2', 'content1', 'email', 'subtitle', 'title'];
    const actualFlickerOrder = allFlickerOrder.filter(elementId => visibleElements.has(elementId));
    const timers: NodeJS.Timeout[] = [];
    
    actualFlickerOrder.forEach((elementId, index) => {
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
    });
    
    const callbackTimer = setTimeout(() => {
      callback();
    }, actualFlickerOrder.length * 100 + 50);
    timers.push(callbackTimer);
  };
  
  const triggerFlickerIn = (targetPage?: string) => {
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
    
    // Get elements for the target page
    const getElementsForPage = (page: string) => {
      const baseElements: FlickerElement[] = [
        { id: 'terminal', type: 'normal' },
        { id: 'title', type: 'title' },
        { id: 'music', type: 'normal' },
        { id: 'ascii', type: 'normal' }
      ];

      if (page === 'home') {
        baseElements.push(
          { id: 'subtitle', type: 'normal' },
          { id: 'email', type: 'normal' },
          { id: 'button1', type: 'normal' },
          { id: 'button2', type: 'normal' },
          { id: 'button3', type: 'normal' }
        );
      } else if (page === 'socials') {
        baseElements.push(
          { id: 'subtitle', type: 'normal' },
          { id: 'email', type: 'normal' },
          { id: 'button1', type: 'normal' },
          { id: 'button2', type: 'normal' },
          { id: 'button3', type: 'normal' }
        );
      } else if (page === 'whoami') {
        baseElements.push(
          { id: 'subtitle', type: 'normal' },
          { id: 'content1', type: 'normal' },
          { id: 'content2', type: 'normal' },
          { id: 'content3', type: 'normal' },
          { id: 'content4', type: 'normal' },
          { id: 'content5', type: 'normal' }
        );
      }
      
      if (hasHomeButton) {
        baseElements.push({ id: 'homeButton', type: 'normal' });
      }
      
      return baseElements;
    };

    const targetElements = getElementsForPage(targetPage || currentPage);
    
    // Only flicker in content elements  
    const contentElements = targetElements.filter(el => 
      !['terminal', 'music', 'ascii'].includes(el.id)
    );
    
    const timers: NodeJS.Timeout[] = [];
    const baseDelay = 50;
    
    contentElements.forEach((element, index) => {
      const delay = baseDelay * (index + 1);
      
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
      const lastElementDelay = baseDelay * contentElements.length;
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