/* eslint-disable no-unused-vars */
import { useState } from "react";
import VideoInput from "./VideoInput";
import QuickHelp from "./QuickHelp";
import VideoResult from "./VideoResult";

const API_URL = "http://localhost:3151";

function Home() {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  const handleVideoFetch = async (url, type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/video-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }

      const data = await response.json();
      setVideoData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home">
      <div className="content-wrapper">
        <div className="input-section">
          <VideoInput onSubmit={handleVideoFetch} />
        </div>
        <div className="result-section">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : videoData ? (
            <VideoResult data={videoData} />
          ) : (
            <QuickHelp />
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;