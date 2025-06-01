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

  return (
    <div 
      className="flex items-center gap-5"
      style={{
        fontFamily: 'var(--font-geist-mono), monospace',
        zIndex: 10
      }}
    >
      {musicFile && (
        <audio 
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          preload="none"
          onLoadedMetadata={() => {
            if (audioRef.current) {
              audioRef.current.volume = volume;
            }
          }}
        />
      )}
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        disabled={!musicFile}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: `1px solid ${musicFile ? 'var(--accent-blue)' : 'var(--gray-4)'}`,
          borderRadius: '6px',
          transition: 'background-color 0.15s',
          fontSize: '16px',
          padding: '11px 18px',
          background: 'transparent',
          color: musicFile ? 'var(--gray-9)' : 'var(--gray-5)',
          fontFamily: 'var(--font-geist-mono), monospace',
          cursor: musicFile ? 'pointer' : 'not-allowed',
          height: '44px',
          boxSizing: 'border-box',
          width: '50px',
          opacity: musicFile ? 1 : 0.6
        }}
        onMouseEnter={(e) => {
          if (musicFile) {
            e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {!musicFile ? '⊘' : (isPlaying ? '⏸' : '▶')}
      </button>

      {/* Volume Slider */}
      <div 
        className="flex items-center gap-2"
        style={{
          border: `1px solid ${musicFile ? 'var(--accent-blue)' : 'var(--gray-4)'}`,
          borderRadius: '6px',
          padding: '11px 18px',
          background: 'transparent',
          height: '44px',
          boxSizing: 'border-box',
          opacity: musicFile ? 1 : 0.6
        }}
      >
        <span 
          style={{ 
            color: musicFile ? 'var(--gray-5)' : 'var(--gray-4)', 
            fontSize: '14px',
            minWidth: '20px',
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
          disabled={!musicFile}
          style={{
            width: '80px',
            height: '4px',
            background: musicFile ? 'var(--gray-3)' : 'var(--gray-2)',
            borderRadius: '2px',
            outline: 'none',
            cursor: musicFile ? 'pointer' : 'not-allowed'
          }}
          className="volume-slider"
        />
      </div>
    </div>
  );
}