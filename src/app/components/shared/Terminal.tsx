'use client';

import { ReactNode, useState, useEffect } from 'react';
import MouseGlowEffect from '../MouseGlowEffect';
import MusicPlayer from '../MusicPlayer';
import AsciiAnimation from '../AsciiAnimation';
import Button from '../Button';

interface TerminalProps {
  children: ReactNode;
  musicFile: string | null;
  animationFrames: string[];
  //showMusic: boolean;
  //showAscii: boolean;
  showHomeButton?: boolean;
  onNavigateHome?: () => void;
  isVisible: boolean;
}

export default function Terminal({ 
  children, 
  musicFile, 
  animationFrames, 
  //showMusic, 
  //showAscii,
  showHomeButton = false,
  onNavigateHome,
  //isVisible
}: TerminalProps) {
  const [layoutStable, setLayoutStable] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLayoutStable(true);
    }, 50); // Wait 50ms for MouseGlowEffect to settle
    
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ background: 'var(--background)', overflow: 'hidden' }}>
      <MouseGlowEffect 
        glowColor="234, 234, 235" // --blue-9 rgb value
        borderGlowSize={2}
        className="relative flex flex-col w-full max-w-4xl terminal-container"
        style={{
          minWidth: '320px',
          width: 'min(90vw, 600px)',
          height: 'min(80vh, calc((30 * 16px) + (2 * 7px) + 36px + 12px))',
          background: 'var(--gray-0)',
          border: '1px solid var(--gray-3)',
          borderRadius: '10px',
          padding: '7px',
          display: true ? 'flex' : 'none' // botched fix as i decided i dont want the terminal to flicker in
        }}
      >
        <style>{`
          @media (min-width: 799px) {
            .terminal-container {
              width: min(90vw, calc((100 * 8px) + (2 * 7px) + 2px)) !important;
            }
          }
          @media (min-width: 800px) {
            .ascii-animation {
              display: block !important;
            }
          }
          @media (max-width: 799px) {
            .ascii-animation {
              display: none !important;
            }
          }
        `}</style>
        
        {/* Page Content */}
        <div 
          className="absolute top-6 left-6 font-mono"
          style={{ 
            fontFamily: 'var(--font-geist-mono), monospace'
          }}
        >
          {children}
        </div>
        
        {/* Music Player */}
        {layoutStable && (
          <div 
            className="absolute"
            style={{
              bottom: '20px',
              left: '20px'
            }}
          >
            <MusicPlayer musicFile={musicFile} />
          </div>
        )}
        
        {/* Home Button */}
        {showHomeButton && (
          <div
            className="absolute top-6 right-6 home-btn-pos"
            style={{
              zIndex: 20
            }}
          >
            <style>{`
              @media (max-width: 500px) {
                .terminal-container .home-btn-pos {
                  top: auto !important;
                  right: 16px !important;
                  bottom: 16px !important;
                }
              }
            `}</style>
            <Button
              onClick={onNavigateHome}
              variant="secondary"
              style={{
                padding: '8px 12px',
                minWidth: 'auto',
                marginBottom: '4px'
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </Button>
          </div>
        )}

        {/* ASCII Animation */}
        {layoutStable && (
          <div 
            className="absolute bottom-4 right-4 ascii-animation"
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <AsciiAnimation frames={animationFrames} />
          </div>
        )}
      </MouseGlowEffect>
    </div>
  );
}