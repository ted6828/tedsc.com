'use client';

import Button from '../Button';
import TitleWinker from '../TitleWinker';

interface HomePageProps {
  isVisible: (elementId: string) => boolean;
  titleVisible: boolean;
  //flickerCompleted: boolean;
  onNavigate: (page: 'socials' | 'whoami') => void;
}

export default function HomePage({ 
  isVisible, 
  titleVisible, 
  //flickerCompleted, 
  onNavigate 
}: HomePageProps) {
  return (
    <>
      {/* Main Title */}
      <div style={{ marginBottom: '8px', height: '50px' }}>
        {isVisible('title') && (
          <TitleWinker 
            titleVisible={titleVisible}
            //flickerCompleted={flickerCompleted}
            titleText="hi im ted :)"
            shouldWink={true}
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
          reach me at <a href="mailto:me@tedsc.com" className="text-blue-500 hover:underline">me@tedsc.com</a>, or click socials below!
        </span>
      </div>
      
      {/* Buttons Container */}
      <div 
        className="flex flex-wrap gap-3 md:gap-5"
        style={{
          zIndex: 10
        }}
      >
        <div
          style={{
            display: isVisible('button1') ? 'block' : 'none'
          }}
        >
          <Button onClick={() => onNavigate('socials')} variant="secondary">
            socials
          </Button>
        </div>

        <div
          style={{
            display: isVisible('button2') ? 'block' : 'none'
          }}
        >
          <Button onClick={() => onNavigate('whoami')} variant="secondary">
            whoami
          </Button>
        </div>
        
        <div
          style={{
            display: isVisible('button3') ? 'block' : 'none'
          }}
        >
          <Button
            variant="secondary"
            onClick={() => window.open('https://github.com/ted6828/tedsc.com', '_blank', 'noopener,noreferrer')}
          >
            src
          </Button>
        </div>
      </div>
    </>
  );
}