import { NextResponse } from 'next/server';

const AUDIO_SERIES_URL = "https://focuscast.netlify.app/data/series.json";
const EPISODES_URL = "https://focuscast.netlify.app/data/episodes.json";

export async function GET() {
  try {
    const [seriesResponse, episodesResponse] = await Promise.all([
      fetch(AUDIO_SERIES_URL, { next: { revalidate: 3600 } }), // Revalidate every hour
      fetch(EPISODES_URL, { next: { revalidate: 3600 } })
    ]);

    if (!seriesResponse.ok || !episodesResponse.ok) {
      throw new Error(`Failed to fetch audio data`);
    }

    const seriesData = await seriesResponse.json();
    const allEpisodes = await episodesResponse.json();

    // Create a map of seriesId to its episodes
    const episodesBySeries: { [key: string]: any[] } = {};
    for (const episode of allEpisodes) {
      if (!episodesBySeries[episode.seriesId]) {
        episodesBySeries[episode.seriesId] = [];
      }
      episodesBySeries[episode.seriesId].push(episode);
    }
    
    // Combine the data
    const combinedData = seriesData.map((series: any) => ({
      ...series,
      episodes: episodesBySeries[series.id] || series.episodes || [],
    }));

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error fetching audio series:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
