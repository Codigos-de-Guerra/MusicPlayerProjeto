
import { IoPause, IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import "./Controls.css";
import { IconContext } from "react-icons";

type ControlsProps = {
  isPlaying: boolean,
  setIsPlaying: (x:boolean) => void,
  handlePrev: () => void,
  handleNext: () => void
}

export default function Controls({isPlaying, setIsPlaying, handlePrev, handleNext}: ControlsProps) {

  return (
    <IconContext.Provider value={{size: "35px", color: "C4D0E3"}}>
      <div>Controls</div>
      <div className="controls-container flex">
        <div className="action-btn flex" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div className="action-btn flex" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <IoPause/> : <IoPlay/>}
        </div>
        <div className="action-btn flex" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
      </div>
    </IconContext.Provider>
  )
}