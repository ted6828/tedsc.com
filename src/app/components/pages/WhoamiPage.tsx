'use client';

//import Button from '../Button';
import TitleWinker from '../TitleWinker';

interface WhoamiPageProps {
  isVisible: (elementId: string) => boolean;
  titleVisible: boolean;
  //flickerCompleted: boolean;
}

export default function WhoamiPage({ 
  isVisible, 
  titleVisible, 
  //flickerCompleted
}: WhoamiPageProps) {
  return (
    <>
      {/* Main Title */}
      <div style={{ marginBottom: '8px', height: '50px' }}>
        {isVisible('title') && (
          <TitleWinker 
            titleVisible={titleVisible}
            //flickerCompleted={flickerCompleted}
            titleText="ted - whoami"
            shouldWink={false}
          />
        )}
      </div>

      {/* Content Block 1: Introduction */}
      <div 
        className="text-sm md:text-base"
        style={{ 
          color: 'var(--gray-6)',
          marginBottom: '12px',
          display: isVisible('subtitle') ? 'block' : 'none'
        }}
      >
        hi i&#39;m a cs student from the uk,
      </div>

      {/* Content Block 2: Interests */}
      <div 
        className="text-sm md:text-base"
        style={{ 
          color: 'var(--gray-6)',
          marginBottom: '12px',
          display: isVisible('content1') ? 'block' : 'none'
        }}
      >
        big fan of <a 
          href="https://www.spacex.com/vehicles/starship/" 
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >starship</a> and <a 
          href="https://robertsspaceindustries.com/star-citizen" 
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >star citizen</a>,
      </div>

      {/* Content Block 3: Homelab */}
      <div 
        className="text-sm md:text-base"
        style={{ 
          color: 'var(--gray-6)',
          marginBottom: '12px',
          display: isVisible('content2') ? 'block' : 'none'
        }}
      >
        homelabber for fun and run many services featured on <a
          href="https://selfh.st/apps/"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >selfh.st/apps/</a>,
        <br />
        my homelab is on a rack!
      </div>

      {/* Content Block 4: Experience Header */}
      <div 
        className="text-sm md:text-base"
        style={{ 
          color: 'var(--gray-6)',
          marginBottom: '8px',
          display: isVisible('content3') ? 'block' : 'none'
        }}
      >
        i have experience with:
      </div>

      {/* Content Block 5: Skills List */}
      <div 
        className="text-sm md:text-base"
        style={{ 
          color: 'var(--gray-6)',
          marginBottom: '12px',
          display: isVisible('content4') ? 'block' : 'none'
        }}
      >
        <ul style={{ marginLeft: '1.5em', marginTop: '0.5em', marginBottom: '0.5em', listStyleType: 'disc' }}>
          <li>
            <strong>Langs:</strong> py, js, c#
          </li>
          <li>
            <strong>Tools:</strong> linux, docker
          </li>
          <li>
            <strong>HW:</strong> 3dp, hackrf, rpi&#39;s
          </li>
          <li>
            <strong>Other:</strong> putt party
          </li>
        </ul>
      </div>

      {/* Content Block 6: Closing */}
      <div 
        className="text-sm md:text-base"
        style={{ 
          color: 'var(--gray-6)',
          marginBottom: '20px',
          display: isVisible('content5') ? 'block' : 'none'
        }}
      >
        have a good day :D
      </div>
    </>
  );
}