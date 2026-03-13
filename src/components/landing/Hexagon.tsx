interface Point {
  x: number;
  y: number;
}

interface HexagonProps {
  size?: number;
}

const Hexagon = ({ size }: HexagonProps) => {
  const hexRadius = 150;
  const centerX = 200;
  const centerY = 200;

  const hexagonPoints: Point[] = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return {
      x: centerX + hexRadius * Math.cos(angle),
      y: centerY + hexRadius * Math.sin(angle),
    };
  });

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
              stroke="#169c64"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Triangles (Star of David) */}
        {[
          [0, 2, 4],
          [1, 3, 5],
        ].map((triangle, t) =>
          triangle.map((pointIndex, i) => {
            const nextIndex = triangle[(i + 1) % 3];
            return (
              <line
                key={`triangle-${t}-${i}`}
                x1={hexagonPoints[pointIndex].x}
                y1={hexagonPoints[pointIndex].y}
                x2={hexagonPoints[nextIndex].x}
                y2={hexagonPoints[nextIndex].y}
                stroke="#169c64"
                strokeWidth="1.5"
              />
            );
          }),
        )}

        {/* Center vertical line */}
        <line
          x1={hexagonPoints[0].x}
          y1={hexagonPoints[0].y}
          x2={hexagonPoints[3].x}
          y2={hexagonPoints[3].y}
          stroke="#169c64"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default Hexagon;
