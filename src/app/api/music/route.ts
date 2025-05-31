import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music');
    const files = fs.readdirSync(musicDir);
    const musicFiles = files.filter(file => 
      file.endsWith('.mp3') || 
      file.endsWith('.wav') || 
      file.endsWith('.ogg') || 
      file.endsWith('.m4a')
    );
    
    return NextResponse.json({
      files: musicFiles.map(file => `/music/${file}`)
    });
  } catch (error) {
    console.warn('Music directory not found or empty:', error);
    return NextResponse.json({ files: [] });
  }
}