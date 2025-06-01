'use client';

import { useEffect, useState } from 'react';
import { getRandomMusicFile, loadMusicFilesClient } from '../lib/loadMusicFilesClient';
import Terminal from './components/shared/Terminal';
import { usePageTransition } from './components/shared/PageTransition';
import HomePage from './components/pages/HomePage';
import SocialsPage from './components/pages/SocialsPage';
import WhoamiPage from './components/pages/WhoamiPage';

type PageType = 'home' | 'socials' | 'whoami';

interface HomeClientProps {
  animationFrames: string[];
}

export default function HomeClient({ animationFrames }: HomeClientProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [musicFile, setMusicFile] = useState<string | null>(null);
  
  const { 
    isVisible, 
    titleVisible, 
    flickerCompleted, 
    triggerFlickerOut, 
    triggerFlickerIn, 
    isTransitioning 
  } = usePageTransition(currentPage, currentPage !== 'home');
  
  const navigateToPage = (page: PageType) => {
    if (page === currentPage || isTransitioning) return;
    
    triggerFlickerOut(() => {
      setCurrentPage(page);
      setTimeout(() => {
        triggerFlickerIn();
      }, 100);
    });
  };

  useEffect(() => {
    // Random music file on page load
    const loadMusic = async () => {
      const musicFiles = await loadMusicFilesClient();
      const file = getRandomMusicFile(musicFiles, [
        { file: '/music/suzume.mp3', weight: 0.3 },
        { file: '/music/amomentapart.mp3', weight: 0.4 }
      ]);
      setMusicFile(file);
    };
    
    loadMusic();

    // Page title to hostname
    if (typeof window !== 'undefined') {
      document.title = window.location.hostname;
    }
  }, []);

  const renderCurrentPage = () => {
    const commonProps = {
      isVisible,
      titleVisible,
      flickerCompleted
    };

    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            {...commonProps}
            onNavigate={navigateToPage}
          />
        );
      case 'socials':
        return (
          <SocialsPage 
            {...commonProps}
          />
        );
      case 'whoami':
        return (
          <WhoamiPage 
            {...commonProps}
          />
        );
    }
  };

  return (
    <Terminal
      musicFile={musicFile}
      animationFrames={animationFrames}
      showMusic={isVisible('music')}
      showAscii={isVisible('ascii')}
      showHomeButton={currentPage !== 'home' && !isTransitioning}
      onNavigateHome={() => navigateToPage('home')}
      isVisible={isVisible('terminal')}
    >
      {renderCurrentPage()}
    </Terminal>
  );
}