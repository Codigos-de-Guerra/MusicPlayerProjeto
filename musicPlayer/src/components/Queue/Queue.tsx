import './Queue.css'

export type QueueProps = {
  tracksList: any,
  onHandle: (track: any, index:number) => void
};

export default function Queue({tracksList, onHandle} : QueueProps) {
  console.log("Tracks=>", tracksList);

  const tracksListsComponent = tracksList?.map((trackElem : any, index: number) => {
    return (
      <div className='queue-item flex' key={index + "key"}>
        <p className='track-name' onClick={() => onHandle(trackElem.track, index)}>{trackElem.track.name}</p>
        <p>0:30</p>
      </div>
    )
  });

  return (
    <div className='queue-container flex'>
      <div className='queue flex'>
        <p className='next'>Próximas Músicas</p>
        <div className='queue-list'>
          {tracksListsComponent}
        </div>
      </div>
    </div>
  )
}