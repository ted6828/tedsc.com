type SongWeightEntry = { file: string; weight: number };
type SongWeightsArray = SongWeightEntry[];

export async function loadMusicFilesClient(): Promise<string[]> {
  try {
    const response = await fetch('/api/music');
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.warn('Failed to load music files:', error);
    return [];
  }
}

/**
 * Returns a random music file, using custom weights if provided.
 * 
 * Example usage:
 *   getRandomMusicFile(musicFiles, [
 *     { file: '/music/suzume.mp3', weight: 0.2 }
 *   ])
 * This makes suzume.mp3 have a 20% chance, and the rest of the files share the remaining 80%.
 */
export function getRandomMusicFile(musicFiles: string[], weightsArray: SongWeightsArray = []): string | null {
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