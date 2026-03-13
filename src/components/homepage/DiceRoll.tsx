import { SparkleIcon, AsteriskIcon } from "@phosphor-icons/react";
import HexagonWithoutStar from "../shapes/HexagonWithoutStar";

type RestChoice = "short" | "long" | null;

interface DiceRollProps {
  rolledNumber?: number;
  restChoice: RestChoice;
}

const DiceRoll = ({ rolledNumber, restChoice }: DiceRollProps) => {
  return (
    <div className="relative flex flex-col justify-center items-center w-80 h-80">
      <p className="absolute -top-5 text-darker-text font-bold">
        {restChoice?.toLocaleUpperCase()} REST
      </p>
      <p className="font-bold text-2xl tracking-wide">ROLL FOR INITIATIVE</p>
      <p className="text-sm text-darker-text opacity-70">
        LET THE FATES DECIDE YOUR MEAL
      </p>
      <div className="relative w-60 h-60">
        <AsteriskIcon
          size={20}
          className="absolute left-12 top-7 text-bg-green opacity-60"
        />
        <HexagonWithoutStar size={300} />
        <SparkleIcon className="absolute right-10 bottom-7 text-bg-green opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-6xl">
          <span>{rolledNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default DiceRoll;
