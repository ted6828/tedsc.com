'use client';

import { useEffect, useState } from 'react';

interface AsciiAnimationProps {
  color?: string;
  frames?: string[];
}

export default function AsciiAnimation({ color = 'var(--gray-4)', frames }: AsciiAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const framesToUse = frames || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % framesToUse.length);
    }, 75);

    return () => clearInterval(interval);
  }, [framesToUse.length]);

  return (
    <div 
      style={{
        fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '8px',
        lineHeight: '1',
        color: color,
        whiteSpace: 'pre',
        userSelect: 'text',
        transform: 'scale(2)',
        transformOrigin: 'bottom right',
        position: 'absolute',
        right: '-30px',
        bottom: '-10px',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      {framesToUse[currentFrame]}
    </div>
  );
}