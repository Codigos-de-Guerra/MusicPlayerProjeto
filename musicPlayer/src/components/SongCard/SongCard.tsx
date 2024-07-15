import './SongCard.css'

import AlbumImage from './AlbumImage'
import AlbumInfo from './AlbumInfo'

export type SongCardProps = {
  album : {
    images: [{url : string}],
    artists : [{name:string}],
    album_type : string,
    name : string,
    release_date : string,
    total_tracks : number
  }
}

export default function SongCard({album}: Partial<SongCardProps>) {
  if (!album) return (<div className='songCard-body flex'/>)
  //console.log("Album =>", album);
  return (
    <div className='songCard-body flex'>
      <AlbumImage imageUrl={album.images[0].url} />
      <AlbumInfo artists={album.artists} album_type={album.album_type} name={album.name} release_date={album.release_date} total_tracks={album.total_tracks}/>
    </div>
  )
} 
