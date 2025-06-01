'use client';

//import Button from '../Button';
import TitleWinker from '../TitleWinker';

interface WhoamiPageProps {
  isVisible: (elementId: string) => boolean;
  titleVisible: boolean;
  flickerCompleted: boolean;
}

export default function WhoamiPage({ 
  isVisible, 
  titleVisible, 
  flickerCompleted
}: WhoamiPageProps) {
  return (
    <>
      {/* Main Title */}
      <div style={{ marginBottom: '8px', height: '50px' }}>
        {isVisible('title') && (
          <TitleWinker 
            titleVisible={titleVisible}
            flickerCompleted={flickerCompleted}
            titleText="ted - whoami"
            shouldWink={false}
          />
        )}
      </div>

      {/* Subtitle and Email */}
      <div 
        className="text-sm md:text-base"
        style={{ 
          color: 'var(--gray-6)',
          marginBottom: '20px',
          display: isVisible('subtitle') ? 'block' : 'none'
        }}
      >
        hi i&#39;m a cs student from the uk,
        <br />
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
        <br /><br />
        homelabber for fun and run many services featured on <a
          href="https://selfh.st/apps/"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >selfh.st/apps/</a>,
        <br />
        my homelab is on a rack!
        <br /><br />
        i have experience with:
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
        <strong>Other:</strong> wii bowling
          </li>
        </ul>
        <br />
        i am also an anime fan
      </div>
    </>
  );
}