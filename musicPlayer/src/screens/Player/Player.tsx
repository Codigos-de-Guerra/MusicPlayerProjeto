import './Player.css'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import SongCard, {SongCardProps} from '../../components/SongCard/SongCard';
import Queue from '../../components/Queue/Queue';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

import apiClient from '../../spotify';

interface PlayerProps {}

export default function Player({}: PlayerProps) {
  const [tracks, setTracks] = useState<any[]>([])
  const [currentTrack, setCurrentTrack] = useState<SongCardProps>();
  const [currentIndex, setCurrentIndex] = useState(0); //necessary to work with controls workflow

  const location = useLocation();

  useEffect(() => {
    if(location.state) {
      apiClient.get('playlists/' + location.state.id + '/tracks')
      .then( function (res) {
        console.log(res.data)
        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0].track);
      })
    }
  }, [location.state]);

  const componentSongCard = currentTrack ?
    <SongCard album={currentTrack.album}/>
    : <SongCard album={undefined}/>

  const updateTrackIndex = (track:any, index:number) => {
    setCurrentTrack(track);
    setCurrentIndex(index);
  }

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track)
  }, [currentIndex]);

  return (
    <div className='screen-container flex'>
      <div className='player-screen-left'>
        <AudioPlayer
          allTracks={tracks}
          currentTrack={currentTrack}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}/>
      </div>
      <div className='player-screen-right'>
        {componentSongCard}
        <Queue tracksList={tracks} onHandle={updateTrackIndex}/>
      </div>
    </div>
  )
}