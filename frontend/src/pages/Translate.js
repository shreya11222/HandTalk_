import "./Translate.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Translate() {
  const [currentWord, setCurrentWord] = useState("");
  const [speechText, setSpeechText] = useState("");
  const [glossText, setGlossText] = useState("");
  const [normalText, setNormalText] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const API_BASE = "http://127.0.0.1:8000/api";

  // FETCH USERNAME
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  // FETCH HISTORY
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setHistory([]);
      return;
    }

    axios
      .get(`${API_BASE}/history/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHistory(res.data))
      .catch(() => {});
  }, []);

  // AUTO SCROLL HISTORY
  useEffect(() => {
    const el = document.querySelector(".history-list");
    if (el) el.scrollTop = 0;
  }, [history]);

  const getVideoPath = (word) => `/signVideos/${word.toUpperCase()}.mp4`;

  // BUILD PLAYLIST
  const buildPlaylist = (gloss) => {
    const words = gloss.trim().toUpperCase().split(/\s+/).filter(Boolean);

    const sequence = words.map((word) => ({
      type: "word",
      value: word,
    }));

    setCurrentWord(words[0] || "");
    setPlaylist(sequence);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  // NEXT
  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentWord(playlist[nextIndex]?.value || "");
    } else {
      setIsPlaying(false);
    }
  };

  // AUTO PLAY
  useEffect(() => {
    if (videoRef.current && isPlaying && playlist.length > 0) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex, isPlaying, playlist]);

  // REPLAY
  const handleReplay = () => {
    if (playlist.length === 0) return;
    setCurrentIndex(0);
    setIsPlaying(true);
    setCurrentWord(playlist[0]?.value || "");
  };

  // LETTER FALLBACK LOGIC
  const handleVideoError = () => {
    const currentItem = playlist[currentIndex];
    if (!currentItem) return;

    // If missing whole word video, split into letters
    if (currentItem.type === "word") {
      const letters = currentItem.value.split("").map((letter) => ({
        type: "letter",
        value: letter,
      }));

      const newPlaylist = [
        ...playlist.slice(0, currentIndex),
        ...letters,
        ...playlist.slice(currentIndex + 1),
      ];

      setPlaylist(newPlaylist);
      setCurrentWord(letters[0]?.value || "");
      return;
    }

    // If even a letter video is missing, skip to next item
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentWord(playlist[nextIndex]?.value || "");
    } else {
      setIsPlaying(false);
    }
  };

  // TRANSLATE
  const translateText = async (text) => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/text-to-gloss/`, { text });
      const gloss = res.data.gloss || "";

      setGlossText(gloss.toUpperCase());
      buildPlaylist(gloss);

      const token = localStorage.getItem("access");
      if (token) {
        axios
          .get(`${API_BASE}/history/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setHistory(res.data));
      }
    } catch {
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  // SPEECH
  const handleSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Chrome browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    try {
      recognition.start();
      setListening(true);
    } catch {
      alert("Mic already active");
      return;
    }

    setTimeout(() => recognition.stop(), 5000);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSpeechText(text);
      translateText(text);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        alert("Speak louder or closer to mic");
      }
      setListening(false);
    };

    recognition.onend = () => setListening(false);
  };

  // CLEAR
  const clearAll = () => {
    setSpeechText("");
    setGlossText("");
    setNormalText("");
    setPlaylist([]);
    setCurrentIndex(0);
    setCurrentWord("");
    setIsPlaying(false);
  };

  return (
    <div className="translate-container">
      <div className="content-wrapper">
        <h1 className="translate-title">HandTalk AI Translator</h1>

        <div className="card-grid">
          <div className="glass-card">
            <h2>🎤 Speech → Gloss</h2>

            <button onClick={handleSpeechToText}>
              {listening ? "Listening..." : "Start Speaking"}
            </button>

            <button onClick={() => translateText(speechText)}>
              Translate
            </button>

            {loading && <p>Processing...</p>}

            <textarea
              value={speechText}
              onChange={(e) => setSpeechText(e.target.value)}
            />

            <textarea value={glossText} readOnly />
          </div>

          <div className="glass-card">
            <h2>✋ Gloss → Text</h2>

            <textarea value={glossText} readOnly />

            <button onClick={() => setNormalText(glossText.toLowerCase())}>
              Convert
            </button>

            <textarea value={normalText} readOnly />

            <button onClick={clearAll}>Clear</button>
          </div>
        </div>

        {/* MEDIA */}
        <div className="media-section">
          <div className="video-box">
            <h3>Sign Animation</h3>

            {playlist.length > 0 ? (
              <>
                <p>🔹 Current: {playlist[currentIndex]?.value}</p>

                <video
                  key={`${playlist[currentIndex]?.type}-${playlist[currentIndex]?.value}-${currentIndex}`}
                  ref={videoRef}
                  muted
                  autoPlay
                  onEnded={handleNext}
                  onError={handleVideoError}
                  style={{ width: "100%", maxHeight: "320px" }}
                >
                  <source src={getVideoPath(playlist[currentIndex]?.value)} />
                </video>

                <button onClick={handleReplay}>🔁 Replay</button>
              </>
            ) : (
              <p>No animation</p>
            )}
          </div>
        </div>

        {/* HISTORY */}
        <div className="history-section">
          <h2>🕘 History</h2>

          {history.length > 0 ? (
            <div className="history-list">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="history-card"
                  onClick={() => {
                    setSpeechText(item.input_text);
                    setGlossText(item.output_text.toUpperCase());
                    buildPlaylist(item.output_text);
                  }}
                >
                  <div>
                    <small>Input</small>
                    <p>{item.input_text}</p>
                  </div>

                  <div>
                    <small>Gloss</small>
                    <p>{item.output_text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No history yet</p>
          )}
        </div>
      </div>
    </div>
  );
}