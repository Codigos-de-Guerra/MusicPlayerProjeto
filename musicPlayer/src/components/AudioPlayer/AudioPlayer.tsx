import "./AudioPlayer.css"

import ProgressCircle from "./ProgressCircle"
import WaveAnimation from "./WaveAnimation";
import Controls from "./Controls";

import { useState, useRef, useEffect} from "react";

type AudioPlayerProps = any

export default function AudioPlayer({allTracks, currentTrack, currentIndex, setCurrentIndex}: AudioPlayerProps) {

  // currentTrack = allTracks[currentIndex].track
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  
  var audioSrc = allTracks[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio(allTracks[0]?.preview_url));

  const intervalRef = useRef<number>();

  const isReadyRef = useRef(false);
  const auxReadyRef = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (audioRef.current.src) {
      console.log("///",audioRef.current.src)
      if (isPlaying) {
        //audioRef.current.load();
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.load();
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReadyRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      if(auxReadyRef.current) isReadyRef.current = true;
      else auxReadyRef.current = true;
    }

    console.log("Track Obj:", currentTrack);
    console.log("Source Url:", audioSrc);
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handlePrev = () => {
    if(allTracks.length == 0) setIsPlaying(false);
    else if (currentIndex - 1 < 0) setCurrentIndex(allTracks.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  
  const handleNext = () => {
    if(allTracks.length == 0) setIsPlaying(false);
    else if (currentIndex < allTracks.length - 1) setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const formatTime = (n:number) => {
    return n > 9 ? "" + n : "0" + n;
  };
  
  const artists : string[] = [];
  currentTrack?.album?.artists.forEach((artist: {name: string}) => {
    artists.push(artist.name);
  });

  const updatePlayState = (isPlaying: boolean) => {
    if(allTracks.length == 0) setIsPlaying(false);
     else setIsPlaying(!isPlaying);
  }

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          imageUrl={currentTrack?.album?.images[0]?.url}
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{formatTime(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            handlePlay={updatePlayState}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}