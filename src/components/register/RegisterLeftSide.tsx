import Hexagon from "../landing/Hexagon";

const RegisterLeftSide = () => {
  return (
    <div className="relative w-110 h-160 flex flex-col items-center justify-center">
      <div className="flex relative -top-5 w-110 h-110">
        <Hexagon size={500} />
        <p
          className="absolute top-1/2 left-46 -translate-x-1/2 -translate-y-1/2 font-bold text-9xl text-green-highlight "
          style={{ textShadow: "0 0 20px var(--color-green-highlight)" }}
        >
          1
        </p>
        <p
          className="absolute top-1/2 right-28 -translate-x-1/2 -translate-y-1/2 font-bold text-9xl text-green-highlight"
          style={{ textShadow: "0 0 20px var(--color-green-highlight)" }}
        >
          5
        </p>
      </div>

      <div className="relative -top-10 text-center text-darker-text">
        <h1 className="font-thin text-2xl mb-2">FATE FAVORS THE BOLD</h1>
        <p>
          Prepare your party for a culinary conquest. The next <br />
          legendary meal is just a roll away
        </p>
      </div>
    </div>
  );
};

export default RegisterLeftSide;
