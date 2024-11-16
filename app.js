const express = require("express");
const { getSubtitles } = require("youtube-captions-scraper");
const ytdl = require("ytdl-core");

const app = express();
const port = 3000;

// Hàm để lấy video ID từ URL
function getYouTubeVideoID(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }
    return null; // URL không hợp lệ
  } catch (error) {
    return null;
  }
}

function mergeCaptionsToText(captions) {
  return captions.map((caption) => caption.text).join(" ");
}

// Route để lấy tiêu đề và phụ đề
app.get("/get-video-details", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  // Lấy video ID từ URL
  const videoID = getYouTubeVideoID(url);
  if (!videoID) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    // Lấy thông tin video (tiêu đề, mô tả, thẻ tag)
    // const videoInfo = await ytdl.getInfo(videoID);
    // const title = videoInfo.videoDetails.title;
    // const tags = videoInfo.videoDetails.keywords || [];

    // Lấy phụ đề (nếu có)
    const captions = await getSubtitles({
      videoID: videoID,
      lang: "en", // Chọn ngôn ngữ phụ đề, ví dụ: 'en' cho tiếng Anh
    });

    const subtitles = mergeCaptionsToText(captions);

    res.json({ subtitles });
  } catch (error) {
    console.error("Error fetching video details:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch video details or subtitles" });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
