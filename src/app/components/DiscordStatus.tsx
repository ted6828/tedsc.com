'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LanyardData {
  data: {
    discord_user: {
      id: string;
      username: string;
      display_name: string;
      avatar: string;
    };
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Array<{
      name: string;
      type: number;
      state?: string;
      details?: string;
      emoji?: {
        name: string;
        id?: string;
        animated?: boolean;
      };
    }>;
    listening_to_spotify?: {
      song: string;
      artist: string;
      album: string;
    };
  };
}

interface DiscordStatusProps {
  userId: string;
  onClick?: () => void;
}

export default function DiscordStatus({ userId, onClick }: DiscordStatusProps) {
  const [discordData, setDiscordData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setDiscordData(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchDiscordData, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#23a55a';
      case 'idle': return '#f0b232';
      case 'dnd': return '#f23f43';
      case 'offline': return '#80848e';
      default: return '#80848e';
    }
  };

  const getAvatarUrl = (userId: string, avatar: string) => {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=64`;
  };

  const getCurrentActivity = () => {
    if (!discordData?.data.activities) return null;
    
    // Check for Spotify first
    if (discordData.data.listening_to_spotify) {
      const spotify = discordData.data.listening_to_spotify;
      return {
        type: 'spotify',
        text: `Listening to ${spotify.song}`,
        details: `by ${spotify.artist}`
      };
    }

    // Check for playing activities (games, etc.)
    const playingActivity = discordData.data.activities.find(a => a.type === 0);
    if (playingActivity) {
      return {
        type: 'game',
        text: `Playing ${playingActivity.name}`,
        details: playingActivity.details || playingActivity.state
      };
    }

    // Check for custom status (type 4)
    const customStatus = discordData.data.activities.find(a => a.type === 4);
    if (customStatus && customStatus.state) {
      const emoji = customStatus.emoji?.name || '';
      return {
        type: 'status',
        text: `${emoji} ${customStatus.state}`.trim(),
        details: null
      };
    }

    return null;
  };

  if (loading || error || !discordData) {
    return (
      <button
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--gray-3)',
          borderRadius: '6px',
          transition: 'background-color 0.15s',
          fontSize: '16px',
          padding: '10px 20px',
          textDecoration: 'none',
          color: 'var(--gray-9)',
          fontFamily: 'var(--font-geist-mono), monospace',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          minHeight: '44px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-3)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        discord
      </button>
    );
  }

  const activity = getCurrentActivity();
  const user = discordData.data.discord_user;

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid var(--gray-3)',
        borderRadius: '6px',
        transition: 'background-color 0.15s',
        fontSize: '14px',
        padding: '10px 16px',
        textDecoration: 'none',
        color: 'var(--gray-9)',
        fontFamily: 'var(--font-geist-mono), monospace',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        gap: '8px',
        minWidth: '200px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--gray-3)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {/* Discord header at top */}
      <div style={{ fontWeight: '600', fontSize: '16px' }}>
        discord
      </div>

      {/* Avatar and user info row */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '12px',
        width: '100%'
      }}>
        {/* Avatar with status indicator */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {/* Replace <img> with Next.js <Image /> for optimization */}
          <Image
            src={getAvatarUrl(user.id, user.avatar)}
            alt={`${user.display_name}'s avatar`}
            width={32}
            height={32}
            style={{
              borderRadius: '50%'
            }}
            unoptimized
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: getStatusColor(discordData.data.discord_status),
              border: '2px solid var(--gray-0)'
            }}
          />
        </div>

        {/* User info */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2px',
          minWidth: 0,
          flex: 1
        }}>
          <div style={{ fontSize: '13px', color: 'var(--gray-7)' }}>
            {user.display_name || user.username} | @{user.username}
          </div>
          {activity && (
            <div style={{ 
              fontSize: '12px', 
              color: 'var(--gray-6)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '140px'
            }}>
              {activity.text}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}