
import { GoogleGenAI, Type } from "@google/genai";
import { Song } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCommuteMusic = async (theme: string): Promise<Song[]> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Recommend 7 songs for a daily commute on a bus or subway based on the following theme or genre: "${theme}". 
    The list must strictly consist of exactly 5 Korean songs and 2 International songs (7:3 ratio).
    For each song, provide the title, artist, category (Korean or International), and a brief one-sentence reason in Korean why it's great for a commute.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                artist: { type: Type.STRING },
                category: { type: Type.STRING, enum: ['Korean', 'International'] },
                reason: { type: Type.STRING }
              },
              required: ['title', 'artist', 'category', 'reason']
            }
          }
        },
        required: ['recommendations']
      }
    }
  });

  const rawJson = JSON.parse(response.text || '{"recommendations": []}');
  const songs: Song[] = rawJson.recommendations.map((song: any) => ({
    ...song,
    youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title}`)}`
  }));

  return songs;
};
