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
