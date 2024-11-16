const { getSubtitles } = require('youtube-captions-scraper');

// Function to fetch subtitles
async function fetchSubtitles(videoID) {
  try {
    const captions = await getSubtitles({
      videoID: videoID, // Replace with the YouTube video ID
      lang: 'en'       // Specify the language you want (e.g., 'en', 'es')
    });
    console.log(captions);
  } catch (error) {
    console.error('Error fetching subtitles:', error);
  }
}

// Example usage with a YouTube video ID
const videoID = 'jEHmBlFZTOM'; // Replace with the actual video ID
fetchSubtitles(videoID);
