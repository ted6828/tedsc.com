import fs from 'fs';
import path from 'path';

export function loadMusicFiles(): string[] {
  const musicDir = path.join(process.cwd(), 'public', 'music');
  
  try {
    const files = fs.readdirSync(musicDir);
    const musicFiles = files.filter(file => 
      file.endsWith('.mp3') || 
      file.endsWith('.wav') || 
      file.endsWith('.ogg') || 
      file.endsWith('.m4a')
    );
    
    return musicFiles.map(file => `/music/${file}`);
  } catch (error) {
    console.warn('Music directory not found or empty:', error);
    return [];
  }
}

type SongWeightEntry = { file: string; weight: number };
type SongWeightsArray = SongWeightEntry[];

/**
 * Returns a random music file, using custom weights if provided.
 * 
 * Example usage:
 *   getRandomMusicFile([
 *     { file: '/music/suzume.mp3', weight: 0.2 }
 *   ])
 * This makes suzume.mp3 have a 20% chance, and the rest of the files share the remaining 80%. ( copilot carried this function )
 */
export function getRandomMusicFile(weightsArray: SongWeightsArray = []): string | null {
  const musicFiles = loadMusicFiles();
  if (musicFiles.length === 0) return null;

  // Build a map for quick lookup
  const weightsMap: { [file: string]: number } = {};
  let totalCustomWeight = 0;
  for (const entry of weightsArray) {
    weightsMap[entry.file] = entry.weight;
    totalCustomWeight += entry.weight;
  }

  // Files with custom weights
  const customWeightedFiles = musicFiles.filter(file => weightsMap[file]);
  // Files without custom weights
  const unweightedFiles = musicFiles.filter(file => !weightsMap[file]);

  // If total custom weight < 1, the rest is for random pick among unweighted files
  const restWeight = Math.max(0, 1 - totalCustomWeight);

  // Build the weighted pool
  const pool: { file: string; weight: number }[] = [
    ...customWeightedFiles.map(file => ({ file, weight: weightsMap[file] })),
    ...unweightedFiles.map(file => ({ file, weight: restWeight / (unweightedFiles.length || 1) }))
  ];

  // Normalize weights (in case total > 1)
  const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight === 0) return null;

  let rand = Math.random() * totalWeight;
  for (const item of pool) {
    if (rand < item.weight) {
      return item.file;
    }
    rand -= item.weight;
  }
  return pool[0]?.file ?? null;
}
