import Hexagon from "./Hexagon";
import ThreeImages from "./ThreeImages";
import Triangle from "./Triangle";

const RightSide = () => {
  return (
    <div className="relative w-110 h-110 flex items-center justify-center">
      <div className="z-20">
        <Hexagon size={500} />
      </div>

      <div className="absolute top-50 left-67.5 -translate-x-1/2 -translate-y-1/2 z-10">
        <Triangle />
      </div>

      <div className="absolute flex gap-0.5 top-41.25 left-37 z-30">
        <p
          className="font-bold text-9xl text-green-highlight "
          style={{ textShadow: "0 0 20px var(--color-green-highlight)" }}
        >
          2
        </p>
        <p
          className="font-bold text-9xl text-green-highlight"
          style={{ textShadow: "0 0 20px var(--color-green-highlight)" }}
        >
          0
        </p>

        <div className="z-40">
          <ThreeImages />
        </div>
      </div>
    </div>
  );
};

export default RightSide;
