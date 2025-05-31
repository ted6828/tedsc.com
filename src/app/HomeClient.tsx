'use client';

import Button from './components/Button';
import AsciiAnimation from './components/AsciiAnimation';
import MusicPlayer from './components/MusicPlayer';
import TitleWinker from './components/TitleWinker';
import MouseGlowEffect from './components/MouseGlowEffect';
import { useDynamicFlickerAnimation } from './components/RandomFlickerController';
import { useEffect, useState } from 'react';
import { getRandomMusicFile, loadMusicFilesClient } from '../lib/loadMusicFilesClient';

interface HomeClientProps {
  animationFrames: string[];
//  musicFile: string | null;
}

const elements = [
  { id: 'terminal', type: 'normal' as const },
  { id: 'title', type: 'title' as const },
  { id: 'subtitle', type: 'normal' as const },
  { id: 'email', type: 'normal' as const },
  { id: 'discord', type: 'normal' as const },
  { id: 'github', type: 'normal' as const },
  { id: 'sc', type: 'normal' as const },
  { id: 'music', type: 'normal' as const },
  { id: 'ascii', type: 'normal' as const },
];

export default function HomeClient({ animationFrames }: HomeClientProps) {
  const { isVisible, titleVisible, flickerCompleted } = useDynamicFlickerAnimation(elements);
    const [musicFile, setMusicFile] = useState<string | null>(null);

  useEffect(() => {
    // random music file on page load
    const loadMusic = async () => {
      const musicFiles = await loadMusicFilesClient();
      const file = getRandomMusicFile(musicFiles, [
        { file: '/music/suzume.mp3', weight: 0.3 },
        { file: '/music/amomentapart.mp3', weight: 0.4 }
      ]);
      setMusicFile(file);
    };
    
    loadMusic();

    // page title to hostname
    if (typeof window !== 'undefined') {
      document.title = window.location.hostname;
    }
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
          display: isVisible('terminal') ? 'flex' : 'none'
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
        <div 
          className="absolute top-6 left-6 font-mono"
          style={{ 
            fontFamily: 'var(--font-geist-mono), monospace'
          }}
        >
          {/* Main Title */}
          <div style={{ marginBottom: '8px', height: '50px' }}>
            {isVisible('title') && (
              <TitleWinker 
                titleVisible={titleVisible}
                flickerCompleted={flickerCompleted}
              />
            )}
          </div>

          {/* Subtitle and Email */}
          <div 
            className="text-sm md:text-base"
            style={{ 
              color: 'var(--gray-5)',
              marginBottom: '20px',
              display: isVisible('subtitle') ? 'block' : 'none'
            }}
          >
            i like computers and rockets<br />
            <span
              style={{
                display: isVisible('email') ? 'inline-block' : 'none'
              }}
            >
              reach me at <a href="mailto:me@tedsc.com" className="text-blue-500 hover:underline">me@tedsc.com</a>, or more socials below:
            </span>
          </div>
          
          {/* Buttons Container */}
          <div 
            className="flex flex-wrap gap-3 md:gap-5"
            style={{
              zIndex: 10
            }}
          >
            {/* Discord Button */}
            <div
              style={{
                display: isVisible('discord') ? 'block' : 'none'
              }}
            >
              <Button href="https://visualizer.eggsy.xyz/383660259992010753" variant="secondary">
                discord
              </Button>
            </div>

            {/* GitHub Button */}
            <div
              style={{
                display: isVisible('github') ? 'block' : 'none'
              }}
            >
              <Button href="https://github.com/Ted6828" variant="secondary">
                github
              </Button>
            </div>
            
            {/* SC Button */}
            <div
              style={{
                display: isVisible('sc') ? 'block' : 'none'
              }}
            >
              <Button href="https://robertsspaceindustries.com/en/citizens/Tedulous" variant="secondary">
                sc
              </Button>
            </div>
          </div>
        </div>
        
        {/* Music Player */}
        <div 
          className="absolute"
          style={{
            bottom: '20px',
            left: '20px',
            display: isVisible('music') ? 'block' : 'none'
          }}
        >
          <MusicPlayer musicFile={musicFile} />
        </div>
        
        {/* ASCII Animation */}
        {isVisible('ascii') && (
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