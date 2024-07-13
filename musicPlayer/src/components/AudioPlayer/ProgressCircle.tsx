import "./ProgressCircle.css"

type CircleProps = {
  color: string,
  percentage: number,
  size: number,
  strokeWidth: string
}

function Circle({ color, percentage, size, strokeWidth } : CircleProps) {
  const radius = size / 2 - 10;
  const circunference = 2 * Math.PI * radius - 20;
  const strokePct = ((100 - Math.round(percentage)) * circunference) / 100;

  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circunference ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circunference}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    />
  );
};

type ProgressCircleProps = {
  percentage: number,
  isPlaying: boolean,
  imageUrl: string,
}

export default function ProgressCircle({percentage, isPlaying, imageUrl} : ProgressCircleProps) {
  const color = "#C96850";
  const size = 300;
  return (
    <div className="progress-circle flex">
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth="0.4rem" color="#3B4F73" size={size} percentage={100} />
          <Circle
            strokeWidth="0.6rem"
            color={color}
            percentage={percentage}
            size={size}
          />
        </g>
        <defs>
          <clipPath id="myCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#FFFFFF" />
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#FFFFFF" />
          </clipPath>
        </defs>
        <image
          className={isPlaying ? "active" : ""}
          x={30}
          y={30}
          width={2 * (size / 2 - 30)}
          height={2 * (size / 2 - 30)}
          href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
          clipPath="url(#myCircle)"
        />
        <image
          className={isPlaying ? "active" : ""}
          x={100}
          y={100}
          width={2 * (size / 2 - 100)}
          height={2 * (size / 2 - 100)}
          href={imageUrl}
          clipPath="url(#myInnerCircle)"
        />
      </svg>
    </div>
  );
}
