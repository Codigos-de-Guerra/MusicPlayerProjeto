import './AlbumInfo.css'

type AlbumInfoProps = {
  album_type : string,
  artists: [{name : string}],
  name: string,
  release_date : string,
  total_tracks: number,
}

export default function AlbumInfo({album_type, artists, name, release_date, total_tracks}: AlbumInfoProps) {
  const singers: string[] = [];
  artists?.forEach((element) => {
    singers.push(element.name);
  });

  const AlbumInfoMessageSingle : string = `${album_type} feito por ${singers?.join(", ")}`;

  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="loop-effect">
          <p>{name + " - " + singers?.join(", ")}</p>
        </div>
      </div>
      <div className="album-info">
        <p> { (album_type === "single") ? AlbumInfoMessageSingle : AlbumInfoMessageSingle + ` com ${total_tracks} faixas`} </p>
      </div>
      <div className="album-release">
        <p>Lançamento: {release_date}</p>
      </div>
    </div>
  )
}