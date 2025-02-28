import './Footer.scss'
import { useRef, useState, useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Slider from '@mui/material/Slider';

const playlist = [
  { title: "In Dreamland", src: require("../assets/in-dreamland.mp3") },
  { title: "2:00 AM", src: require("../assets/200-am.mp3") },
  { title: "Taiyaki", src: require("../assets/taiyaki.mp3") }
]

function Footer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const audioRef = useRef(new Audio(playlist[currentSongIndex].src));

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  // Update song when index changes
  useEffect(() => {
    audioRef.current.src = playlist[currentSongIndex].src;
    audioRef.current.load();
    setPosition(0);
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  // Set duration dynamically when metadata loads
  useEffect(() => {
    const audio = audioRef.current;
    const updateMetadata = () => setDuration(audio.duration);
    const updateTime = () => setPosition(audio.currentTime);

    audio.addEventListener("loadedmetadata", updateMetadata);
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("loadedmetadata", updateMetadata);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [currentSongIndex]);

  // Play/Pause function
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle slider movement
  const handleSliderChange = (_: Event, value: number | number[]) => {
    const newPosition = value as number;
    setPosition(newPosition);
    audioRef.current.currentTime = newPosition;
  };

  // Format time
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  // Next song
  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setIsPlaying(true);
  };

  // Previous song
  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };  

  return (
    <section className="footer">
      <div className="music-player">
        <div className="player-buttons">
          <SkipPreviousIcon className="prev-button" onClick={prevSong} />
          {isPlaying ? (
            <PauseCircleIcon className="pause-button" onClick={togglePlayPause} />
          ) : (
            <PlayCircleIcon className="play-button" onClick={togglePlayPause} />
          )}
          <SkipNextIcon className="next-button" onClick={nextSong} />
        </div>
        <Slider
          className="slider"
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration || 1}
          onChange={handleSliderChange}
        />
        <span className="duration">{formatTime(position)} - {playlist[currentSongIndex].title} - {formatTime(duration)}</span>
      </div>
    </section>
  )
};

export default Footer;