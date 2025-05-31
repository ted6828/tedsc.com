'use client';

import { useRef, useState, useEffect } from 'react';

interface MusicPlayerProps {
  musicFile: string | null;
}

export default function MusicPlayer({ musicFile }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const loadAudio = () => {
    if (!audioLoaded && audioRef.current && musicFile) {
      audioRef.current.src = musicFile;
      audioRef.current.load();
      setAudioLoaded(true);
    }
  };

  const togglePlayPause = () => {
    if (!musicFile) return;
    
    if (!audioLoaded) {
      loadAudio();
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  if (!musicFile) {
    return null; // Hide player if no music file
  }

  return (
    <div 
      className="flex items-center gap-5"
      style={{
        fontFamily: 'var(--font-geist-mono), monospace',
        zIndex: 10
      }}
    >
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid var(--accent-blue)',
          borderRadius: '6px',
          transition: 'background-color 0.15s',
          fontSize: '16px',
          padding: '11px 18px',
          background: 'transparent',
          color: 'var(--gray-9)',
          fontFamily: 'var(--font-geist-mono), monospace',
          cursor: 'pointer',
          height: '44px',
          boxSizing: 'border-box',
          width: '50px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* Volume Slider */}
      <div 
        className="flex items-center gap-2"
        style={{
          border: '1px solid var(--accent-blue)',
          borderRadius: '6px',
          padding: '11px 18px',
          background: 'transparent',
          height: '44px',
          boxSizing: 'border-box'
        }}
      >
        <span 
          style={{ 
            color: 'var(--gray-5)', 
            fontSize: '14px',
            minWidth: '20px',
            //marginLeft: '-8px',
          }}
        >
          🔊
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{
            width: '80px',
            height: '4px',
            background: 'var(--gray-3)',
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer'
          }}
          className="volume-slider"
        />
      </div>
    </div>
  );
}