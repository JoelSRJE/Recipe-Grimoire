import { MagicWandIcon } from "@phosphor-icons/react/dist/ssr";
import { useNavigate } from "react-router-dom";

const LeftSide = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-110">
      <p className="flex  items-center gap-3 w-70 font-bold text-sm  text-center bg-green-text-bg tracking-wide border py-1 px-2 rounded-2xl border-green-highlight text-green-highlight">
        <MagicWandIcon size={20} />A MYTHIC DINING ADVENTURE
      </p>

      <h1 className="text-8xl font-bold text-shadow-bg-green">
        CONQUER <br />
        YOUR <br />
        <span className="text-bg-green">HUNGER</span>
      </h1>

      <p className="text-darker-text font-medium text-md">
        Fate favors the bold. Roll for your next meal, assemble your
        <br /> party, and track your culinary conquests across the digital
        realm.
      </p>

      <div>
        <button
          className="bg-green-highlight
                rounded-xl px-6 py-4 text-lg font-bold
                transition-all duration-300
                hover:scale-105 hover:cursor-pointer
                shadow-[var(--glow-green)]"
          onClick={() => navigate("/register")}
        >
          JOIN THE GRIMOIRE
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
