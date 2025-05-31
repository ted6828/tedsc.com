'use client';

import { useState, useEffect } from 'react';

interface TitleWinkerProps {
  titleVisible: boolean;
  flickerCompleted: boolean;
  winkDelay?: number;
  winkDuration?: number;
}

export default function TitleWinker({ 
  titleVisible, 
  flickerCompleted, 
  winkDelay = 1000,
  winkDuration = 250 
}: TitleWinkerProps) {
  const [titleText, setTitleText] = useState('hi im ted :)');

  useEffect(() => {
    if (!flickerCompleted) return;

    const winkTimer = setTimeout(() => {
      setTitleText('hi im ted ;D');
      const backTimer = setTimeout(() => {
        setTitleText('hi im ted :)');
      }, winkDuration);
      
      return () => clearTimeout(backTimer);
    }, winkDelay);

    return () => clearTimeout(winkTimer);
  }, [flickerCompleted, winkDelay, winkDuration]);

  return (
    <div
      className="text-4xl sm:text-5xl lg:text-5xl"
      style={{
        color: 'var(--gray-9)',
        visibility: titleVisible ? 'visible' : 'hidden'
      }}
    >
      {titleText}
    </div>
  );
}