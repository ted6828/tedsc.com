import HomeClient from './HomeClient';
import { loadAllAnimationFrames } from '../lib/loadAnimationFrames';
import { getRandomMusicFile } from '../lib/loadMusicFiles';

export default function Home() {
  const animationFrames = loadAllAnimationFrames();
  const randomMusicFile = getRandomMusicFile([
      { file: '/music/suzume.mp3', weight: 0.3 },
      { file: '/music/wheresyourheadat.mp3', weight: 0.4 }
  ]);

  return <HomeClient animationFrames={animationFrames} musicFile={randomMusicFile} />;
}