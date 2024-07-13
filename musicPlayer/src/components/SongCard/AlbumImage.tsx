import './AlbumImage.css'

type AlbumImageProps = {
  imageUrl : string
}

export default function AlbumImage({imageUrl}: AlbumImageProps) {
  return (
    <div className='albumImage flex'>
      <img className='cover' alt='Album Cover' src={imageUrl}/>
      <div className='albumImage-shadow'>
        <img className='albumImage-shadow' alt='Shadow Cover' src={imageUrl}/>
      </div>
    </div>
  )
}