import { useEffect, useState } from "react";
import "../../App.css";
import FoodCarousel from "./FoodCarousel";
import { EyeClosedIcon, MoonIcon, SpinnerGapIcon } from "@phosphor-icons/react";
import { getAllFoodsRequest } from "../../api/createFood";

type RestChoice = "short" | "long" | null;

interface FoodOptionsProps {
  toggleView: boolean;
  isLoading: boolean;
  rolledNumber?: number;
  setRestChoice: (value: RestChoice) => void;
}

interface Ingredient {
  ingredientName: string;
  ingredientId: string;
}

interface Food {
  foodName: string;
  foodType: "SHORT" | "LONG";
  ingredients: Ingredient[];
  foodId: string;
}

const FoodOptions = ({
  toggleView,
  isLoading,
  rolledNumber,
  setRestChoice,
}: FoodOptionsProps) => {
  const [choice, setChoice] = useState<RestChoice>(null);
  const [shortFoods, setShortFoods] = useState<Food[]>([]);
  const [longFoods, setLongFoods] = useState<Food[]>([]);

  const handleChoice = (value: RestChoice) => {
    setChoice(value);
    setRestChoice(value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center border border-green-highlight rounded-lg max-w-190 min-h-40 max-h-40">
        <div className="animate-spin">
          <SpinnerGapIcon size={30} />
        </div>
      </div>
    );
  }

  const fetchAllFoods = async () => {
    try {
      const response = await getAllFoodsRequest();

      if (response.ok) {
        const data: Food[] = await response.json();
        setShortFoods(data.filter((food) => food.foodType === "SHORT"));
        setLongFoods(data.filter((food) => food.foodType === "LONG"));
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchAllFoods();
  }, []);

  return (
    <div>
      {toggleView ? (
        <div className="flex justify-center border border-green-highlight rounded-lg max-w-190 min-h-40 max-h-40">
          <FoodCarousel
            rolledNumber={rolledNumber}
            shortFoods={shortFoods}
            longFoods={longFoods}
            restChoice={choice}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => handleChoice("short")}
            className={`flex justify-center items-center gap-2 min-h-40 max-h-40 ${choice === "short" ? "bg-green-highlight" : "bg-cards-dark-bg"} w-1/2 h-30 border border-green-highlight 
            hover:cursor-pointer shortBtn`}
          >
            <EyeClosedIcon size={30} className="text-green-highlight" />
            Short Rest
          </button>
          <button
            onClick={() => handleChoice("long")}
            className={`flex justify-center items-center gap-2 min-h-40 max-h-40 ${choice === "long" ? "bg-green-highlight" : "bg-cards-dark-bg"} w-1/2 h-30 border border-green-highlight
            hover:cursor-pointer longBtn`}
          >
            <MoonIcon size={30} className="text-green-highlight" />
            Long Rest
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodOptions;
