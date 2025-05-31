'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';

interface MouseGlowEffectProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
  //glowSize?: number;
  borderGlowSize?: number;
}

export default function MouseGlowEffect({ 
  children, 
  className = '',
  style = {},
  glowColor = '255, 255, 255',
  borderGlowSize = 1
}: MouseGlowEffectProps) {
  const borderGlowColor = '195, 195, 196'; // --gray-6 rgb value
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showBorderGlow, setShowBorderGlow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const glowDistance = 100; // Distance from terminal edges to show glow

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is within glow distance of the terminal
      const isNearTerminal = 
        e.clientX >= rect.left - glowDistance &&
        e.clientX <= rect.right + glowDistance &&
        e.clientY >= rect.top - glowDistance &&
        e.clientY <= rect.bottom + glowDistance;

      setShowBorderGlow(isNearTerminal);
      
      if (isNearTerminal) {
        setMousePos({ x, y });
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mouse-glow-card ${className}`}
      style={{
        position: 'relative',
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
        ...style
      } as React.CSSProperties}
    >
      <style jsx>{`
        .mouse-glow-card::before,
        .mouse-glow-card::after {
          border-radius: inherit;
          content: "";
          height: 100%;
          left: 0px;
          opacity: 0;
          position: absolute;
          top: 0px;
          width: 100%;
          pointer-events: none;
        }
        
        .mouse-glow-card::before {
          transition: opacity ${isHovered ? '250ms' : '500ms'} ease;
        }
        
        .mouse-glow-card::after {
          transition: opacity 500ms;
        }

        .mouse-glow-card::before {
          background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y), 
            rgba(${glowColor}, 0.02),
            transparent 99%
          );
          z-index: 3;
          opacity: ${isHovered ? 1 : 0};
        }

        .mouse-glow-card::after {  
          background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y), 
            rgba(${borderGlowColor}, 0.6),
            rgba(${borderGlowColor}, 0.3) 40%,
            rgba(${borderGlowColor}, 0.1) 60%,
            transparent 90%
          );
          z-index: 1;
          opacity: ${showBorderGlow ? 1 : 0};
        }

        .mouse-glow-card > .card-content {
          background-color: var(--gray-0);
          border-radius: inherit;
          inset: ${borderGlowSize}px;
          position: absolute;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}