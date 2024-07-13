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

  //console.log("Singers =>", singers);

  let subComponentAlbumInfo = <p>{`${album_type} feito por ${singers?.join(", ")}
  com ${total_tracks} faixas`}</p>;

  if (album_type == "single") {
    subComponentAlbumInfo = <p>{`${album_type} feito por ${singers?.join(", ")}`}</p>
  }
  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="auxiliar">
          <p>{name + " - " + singers?.join(", ")}</p>
        </div>
      </div>
      <div className="album-info">
        {subComponentAlbumInfo}
      </div>
      <div className="album-release">
        <p>Lançamento: {release_date}</p>
      </div>
    </div>
  )
}