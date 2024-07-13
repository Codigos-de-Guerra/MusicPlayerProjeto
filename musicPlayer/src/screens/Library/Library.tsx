import './Library.css'

import { useEffect, useState } from 'react'
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import apiClient from '../../spotify';

interface LibraryProps {}

export default function Library({}: LibraryProps) {

  // Example de 30 e 31
  /*
  let playlists = [
    {
      id: 3123123123,
      name: "Pagodeira",
      images: [
        {
          height: 500,
          url: "https://i.scdn.co/image/ab67706f000000020abcd312cdba882527688af5"
        }
      ]
    },
    {
      id: 12831273819293817283,
      name: "Smile",
      images: [
        {
          height: 640,
          url: "https://mosaic.scdn.co/640/ab67616d00001e021eb5e996639036a49b09f1e5ab67616d00001e022b4da5abb231f0dfc297ff09ab67616d00001e0263661d633e4d9a627d929b53ab67616d00001e02a99e0ceaad23e296e12e853c",
          width: 640
        }
      ]
    }
  ];
*/
  const [playlists, setPlaylists] = useState<any[]>([])

  useEffect( () => {
    apiClient.get("me/playlists").then( (response : any) => {
      const playlists = response.data.items
      setPlaylists(playlists);
    })
  }, [])


  const navigate = useNavigate();
  function playPlaylist(id : number) {
    navigate("/player", {state: {id: id} });
  }
  
  const componentPlaylistsDisplay = playlists?.map( (playlist : any) => {
      const name = playlist.name;
      const num = playlist.tracks.total;
      const id = playlist.id;
      const url = playlist.images[0].url;
      
      return (
          <div
            className='playlist-card'
            key={id}
            onClick={() => playPlaylist(id)}>
            <img
              className='playlist-image'
              alt='Playlist Art Cover'
              src={url}
            />
            <p className='playlist-title'> {name} </p>
            <p className='playlist-subtitle'> {num} {num > 1 ? "Músicas" : "Música"}</p>
            <div className='playlist-fade'>
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
      )
    }
  );

  return (
    <div className='screen-container'>
      <div className='library-body flex'>
          {componentPlaylistsDisplay}
      </div>
    </div>
  )
}