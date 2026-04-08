import { useState } from "react";
import {
  DiceFiveIcon,
  ArrowUDownLeftIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react";
import DiceRoll from "../components/homepage/DiceRoll";
import WeeklySchedule from "../components/homepage/WeeklySchedule";
import FoodOptions from "../components/homepage/FoodOptions";

type CriticalType = "success" | "failure" | null;
type RestChoice = "short" | "long" | null;

const HomePage = () => {
  const [toggleView, setToggleView] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [rolledNumber, setRolledNumber] = useState<number>(20);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [critical, setCritical] = useState<CriticalType>(null);
  const [restChoice, setRestChoice] = useState<RestChoice>(null);

  const generateNumberAnim = () => {
    if (isRolling) {
      return;
    }

    setIsRolling(true);

    const min = 1;
    const max = 20;
    const finalNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    let ticks = 0;

    const interval = setInterval(() => {
      setRolledNumber(Math.floor(Math.random() * (max - min + 1)) + min);
      ticks++;
    }, 60);

    setTimeout(() => {
      setisLoading(true);
      clearInterval(interval);

      if (finalNumber === 20) {
        setCritical("success");
      } else if (finalNumber === 1) {
        setCritical("failure");
      } else {
        setCritical(null);
      }

      setRolledNumber(finalNumber);
      if (finalNumber) {
        setisLoading(false);
        setToggleView(true);
      }
      setIsRolling(false);
    }, 900);
  };

  const resetRoll = () => {
    setisLoading(true);

    setTimeout(() => {
      setRolledNumber(20);
      setToggleView(false);
      setRestChoice(null);
      setCritical(null);
      setisLoading(false);
    }, 1000);
  };

  return (
    <section className="relative flex flex-col gap-6">
      {/* Top Section */}
      <div className="rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center border border-green-highlight rounded-lg max-w-190 min-h-40 max-h-40">
            <div className="animate-spin">
              <SpinnerGapIcon size={30} />
            </div>
          </div>
        ) : (
          <FoodOptions
            toggleView={toggleView}
            isLoading={isLoading}
            rolledNumber={rolledNumber}
            setRestChoice={setRestChoice}
          />
        )}
      </div>

      {/* Down Section */}
      <div className="flex flex-row gap-6">
        {/* Left Side, Weekly schedule */}
        <div className="bg-cards-dark-bg p-5 rounded-lg border border-green-highlight">
          <WeeklySchedule />
        </div>

        {/* Right Side, Dice roll */}
        <div className="relative flex flex-col justify-center gap-4 bg-cards-dark-bg p-4 rounded-lg border border-green-highlight">
          <DiceRoll rolledNumber={rolledNumber} restChoice={restChoice} />

          <button
            onClick={generateNumberAnim}
            disabled={isRolling || !restChoice}
            className="flex justify-center items-center gap-2 bg-green-highlight text-white rounded-md px-4 
                py-4 text-lg font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 
                disabled:cursor-not-allowed shadow-[var(--glow-lighter-green)] hover:cursor-pointer"
          >
            ROLL THE DICE <DiceFiveIcon size={30} />
          </button>
          <button
            onClick={resetRoll}
            disabled={isLoading || !restChoice}
            className="flex justify-center items-center gap-2 bg-green-highlight text-white rounded-md px-4 
                py-4 text-lg font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 
                disabled:cursor-not-allowed shadow-[var(--glow-lighter-green)] hover:cursor-pointer"
          >
            RESET ROLL <ArrowUDownLeftIcon size={30} />
          </button>

          <div className="flex flex-row justify-center items-center mt-5 gap-2">
            <div className="h-px w-8 bg-gray-600" />
            <p className="text-xs text-darker-text opacity-60">
              MAY THE CRITICAL HITS BE PLENTY
            </p>
            <div className="h-px w-8 bg-gray-600" />
          </div>
          {critical && (
            <div
              className={`absolute bottom-5 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 mt-4 text-center text-lg font-bold tracking-wide transition-all z-40 bg-black/60 p-2 rounded-md
      ${
        critical === "success"
          ? "text-green-highlight glow-green"
          : "text-red-500 glow-red"
      }`}
            >
              {critical === "success"
                ? "CRITICAL SUCCESS!"
                : "CRITICAL FAILURE!"}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
