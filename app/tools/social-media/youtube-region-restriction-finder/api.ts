// Create a new file api.ts to handle API calls
import { countries } from './countries';

// Interface for the YouTube API response
interface YouTubeResponse {
  items: {
    id: string;
    contentDetails: {
      regionRestriction?: {
        allowed?: string[];
        blocked?: string[];
      };
    };
  }[];
}

interface AvailabilityData {
  [key: string]: {
    available: boolean;
    lastChecked: string;
  };
}

// Function to fetch YouTube video availability
export async function fetchYouTubeAvailability(videoId: string) {
  // Get API key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_DATA_KEY;
  
  if (!apiKey) {
    console.error('YouTube API key not found. Please add it to your .env.local file');
    return {};
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }
    
    const data: YouTubeResponse = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }
    
    const regionRestriction = data.items[0].contentDetails.regionRestriction;
    const timestamp = new Date().toISOString();
    
    // Create availability object for all countries
    const availability: AvailabilityData = {};
    
    countries.forEach(country => {
      // If there are allowed regions, check if country is in allowed list
      if (regionRestriction?.allowed) {
        availability[country.code] = {
          available: regionRestriction.allowed.includes(country.code),
          lastChecked: timestamp
        };
      } 
      // If there are blocked regions, check if country is NOT in blocked list
      else if (regionRestriction?.blocked) {
        availability[country.code] = {
          available: !regionRestriction.blocked.includes(country.code),
          lastChecked: timestamp
        };
      } 
      // If no restrictions, video is available everywhere
      else {
        availability[country.code] = {
          available: true,
          lastChecked: timestamp
        };
      }
    });
    
    return availability;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return {};
  }
}