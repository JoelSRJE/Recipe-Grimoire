interface DiceProps {
  diceSize?: number;
  value?: 1 | 2 | 3 | 4 | 5 | 6;
  diceColor?: string;
}

const Dice = ({
  diceSize = 60,
  value = 5,
  diceColor = "#175C43",
}: DiceProps) => {
  const r = diceSize * 0.11;
  const positions = [
    [0.2, 0.2], // top-left
    [0.5, 0.15], // top-center
    [0.8, 0.2], // top-right
    [0.2, 0.5], // center-left
    [0.5, 0.5], // center
    [0.8, 0.5], // center-right
    [0.2, 0.8], // bottom-left
    [0.5, 0.85], // bottom-center
    [0.8, 0.8], // bottom-right
  ];

  const diceMap: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };

  return (
    <svg
      width={diceSize}
      height={diceSize}
      viewBox={`0 0 ${diceSize} ${diceSize}`}
    >
      <defs>
        <mask id="diceMask" maskUnits="userSpaceOnUse">
          <rect width={diceSize} height={diceSize} fill="white" />
          {diceMap[value].map((idx) => {
            const [px, py] = positions[idx];
            return (
              <circle
                key={idx}
                cx={px * diceSize}
                cy={py * diceSize}
                r={r}
                fill="black"
              />
            );
          })}
        </mask>
      </defs>

      {/* Bara denna rektangel behövs */}
      <rect
        x={0}
        y={0}
        width={diceSize}
        height={diceSize}
        rx={diceSize * 0.15}
        fill={diceColor}
        mask="url(#diceMask)"
      />
    </svg>
  );
};

export default Dice;
