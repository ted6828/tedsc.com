import HomeClient from './HomeClient';
import { loadAllAnimationFrames } from '../lib/loadAnimationFrames';

export default function Home() {
  const animationFrames = loadAllAnimationFrames();

  return <HomeClient animationFrames={animationFrames} />;
}