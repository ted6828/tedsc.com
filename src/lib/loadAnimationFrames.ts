import fs from 'fs';
import path from 'path';

export function loadAllAnimationFrames(): string[] {
  const framesDir = path.join(process.cwd(), 'src/data/animation_frames');
  const frames: string[] = [];
  
  try {
    // Read all .txt files from the animation_frames directory
    const files = fs.readdirSync(framesDir)
      .filter(file => file.endsWith('.txt'))
      .sort((a, b) => {
        // Sort by frame number (frame_0.txt, frame_1.txt, etc.)
        const numA = parseInt(a.match(/frame_(\d+)\.txt$/)?.[1] || '0');
        const numB = parseInt(b.match(/frame_(\d+)\.txt$/)?.[1] || '0');
        return numA - numB;
      });
    
    // Read each frame file
    for (const file of files) {
      const filePath = path.join(framesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      frames.push(content);
    }
    
    return frames;
  } catch (error) {
    console.error('Failed to load animation frames:', error);
    return [];
  }
}