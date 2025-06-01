'use client';

import { useState, useEffect } from 'react';

interface TitleWinkerProps {
  titleVisible: boolean;
  //flickerCompleted: boolean;
  titleText: string;
  shouldWink?: boolean;
  winkDelay?: number;
  winkDuration?: number;
}

export default function TitleWinker({ 
  titleVisible, 
  //flickerCompleted, 
  titleText,
  shouldWink = false,
  winkDelay = 1000,
  winkDuration = 250 
}: TitleWinkerProps) {
  const [displayText, setDisplayText] = useState(titleText);
  const [canWink, setCanWink] = useState(false);

  useEffect(() => {
    setDisplayText(titleText);
    setCanWink(shouldWink && titleText === 'hi im ted :)');
  }, [titleText, shouldWink]);

  useEffect(() => {
    if (!canWink) return;

    const winkTimer = setTimeout(() => {
      setDisplayText('hi im ted ;D');
      const backTimer = setTimeout(() => {
        setDisplayText('hi im ted :)');
      }, winkDuration);
      
      return () => clearTimeout(backTimer);
    }, winkDelay);

    return () => clearTimeout(winkTimer);
  }, [canWink, winkDelay, winkDuration]);

  return (
    <div
      className="text-4xl sm:text-5xl lg:text-5xl"
      style={{
        color: 'var(--gray-9)',
        visibility: titleVisible ? 'visible' : 'hidden'
      }}
    >
      {displayText}
    </div>
  );
}