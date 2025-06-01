'use client';

import Button from '../Button';
import TitleWinker from '../TitleWinker';
import DiscordStatus from '../DiscordStatus';

interface SocialsPageProps {
  isVisible: (elementId: string) => boolean;
  titleVisible: boolean;
  flickerCompleted: boolean;
}

export default function SocialsPage({ 
  isVisible, 
  titleVisible, 
  flickerCompleted
}: SocialsPageProps) {
  return (
    <>
      {/* Main Title */}
      <div style={{ marginBottom: '8px', height: '50px' }}>
        {isVisible('title') && (
          <TitleWinker 
            titleVisible={titleVisible}
            flickerCompleted={flickerCompleted}
            titleText="ted - socials"
            shouldWink={false}
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
        i dont have many public socials...<br />
        <span
          style={{
            display: isVisible('email') ? 'inline-block' : 'none'
          }}
        >
          reach me at <a href="mailto:me@tedsc.com" className="text-blue-500 hover:underline">me@tedsc.com</a> or:
        </span>
      </div>

      {/* First Row - Discord */}
      <div 
        className="flex flex-wrap gap-3 md:gap-5"
        style={{
          zIndex: 10,
          marginBottom: '12px'
        }}
      >
        <div
          style={{
            display: isVisible('button1') ? 'block' : 'none'
          }}
        >
          <DiscordStatus 
            userId="383660259992010753"
            onClick={() => window.open('https://discord.com/users/383660259992010753', '_blank', 'noopener,noreferrer')}
          />
        </div>
      </div>
      
      {/* Second Row of Buttons */}
      <div 
        className="flex flex-wrap gap-3 md:gap-5"
        style={{
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: isVisible('button2') ? 'block' : 'none'
          }}
        >
          <Button href="https://robertsspaceindustries.com/en/citizens/Tedulous" variant="secondary">
            star citizen
          </Button>
        </div>

      </div>
      {/* Third Row of Buttons */}
      <div 
        className="flex flex-wrap gap-3 md:gap-5"
        style={{
          zIndex: 10,
          marginTop: '12px'
        }}
      >
        <div
          style={{
            display: isVisible('button3') ? 'block' : 'none'
          }}
        >
          <Button href="https://github.com/ted6828" variant="secondary">
            github
          </Button>
        </div>
      </div>
    </>
  );
}