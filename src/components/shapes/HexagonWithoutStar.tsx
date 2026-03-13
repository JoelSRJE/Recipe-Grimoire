interface Point {
  x: number;
  y: number;
}

interface HexagonProps {
  size?: number;
}

const HexagonWithoutStar = ({ size }: HexagonProps) => {
  const hexRadius = 150;
  const centerX = 200;
  const centerY = 200;

  const yScale = 0.9;
  const hexagonPoints: Point[] = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return {
      x: centerX + hexRadius * Math.cos(angle),
      y: centerY + hexRadius * Math.sin(angle) * yScale,
    };
  });

  const pointsString = hexagonPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 pointer-events-none">
      <svg width={size} height={size} viewBox="0 0 400 400">
        {hexagonPoints.map((point, i) => {
          const nextPoint = hexagonPoints[(i + 1) % 6];
          return (
            <line
              key={`hex-${i}`}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              stroke="#22C35D"
              strokeWidth="1.5"
            />
          );
        })}

        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="30" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <polygon
          points={pointsString}
          fill="#169C64"
          stroke="#22C35D"
          strokeWidth="5"
          filter="url(#glow)"
        />

        {/* Horizontal lines */}
        <line
          x1={hexagonPoints[5].x}
          y1={hexagonPoints[5].y}
          x2={hexagonPoints[1].x}
          y2={hexagonPoints[1].y}
          stroke="#22C35D"
          strokeWidth="1.5"
        />

        <line
          x1={hexagonPoints[2].x}
          y1={hexagonPoints[2].y}
          x2={hexagonPoints[4].x}
          y2={hexagonPoints[4].y}
          stroke="#22C35D"
          strokeWidth="1.5"
        />

        {/* Center vertical line */}
        <line
          x1={hexagonPoints[0].x}
          y1={hexagonPoints[0].y}
          x2={hexagonPoints[3].x}
          y2={hexagonPoints[3].y}
          stroke="#22C35D"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default HexagonWithoutStar;
