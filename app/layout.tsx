import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayerWithLyrics.css'; // import css terpisah

const MusicPlayerWithLyrics = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const lyrics = [
    { time: 0, text: "🎵 Musik dimulai..." },
    { time: 5, text: "Ini adalah baris pertama lirik" },
    { time: 10, text: "Dan ini baris kedua yang lebih panjang" },
    { time: 15, text: "Chorus: Nyanyikan bersama!" },
    { time: 20, text: "Bridge: Perubahan emosi" },
    { time: 25, text: "Final chorus dengan energi tinggi" },
    { time: 30, text: "🎵 Musik berakhir..." }
  ];

  const musicFile = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1a7a3a7a3a.mp3?filename=happy-rock-112.mp3";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      let newIndex = 0;
      for (let i = lyrics.length - 1; i >= 0; i--) {
        if (audioRef.current.currentTime >= lyrics[i].time) {
          newIndex = i;
          break;
        }
      }
      setCurrentLyricIndex(newIndex);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="music-player-container">
      <div className="music-card">
        <div className="music-info">
          <div className="album-cover">
            <img 
              src="https://cdn.pixabay.com/photo/2016/11/29/03/53/music-1867753_1280.jpg" 
              alt="Album cover art"
              className="album-image"
            />
          </div>
          <h1 className="music-title">Lagu Demo</h1>
          <p className="music-artist">Artis Unknown</p>
        </div>

        <div className="lyrics-display">
          <p className="current-lyric">{lyrics[currentLyricIndex].text}</p>
        </div>

        <div className="progress-container">
          <div className="time-labels">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
          />
        </div>

        <div className="controls">
          <button onClick={togglePlay} className="play-pause-button" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        <audio
          ref={audioRef}
          src={musicFile}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      <div className="instructions">
        <p>Demo aplikasi pemutar musik dengan lirik. Gunakan slider untuk mencari bagian tertentu.</p>
      </div>
    </div>
  );
};

export default MusicPlayerWithLyrics;
