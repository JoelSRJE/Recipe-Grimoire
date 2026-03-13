import { useEffect, useRef, useState } from "react";
import FoodToolTip from "./FoodToolTip";

interface FoodCarouselProps {
  rolledNumber?: number;
  shortFoods: Food[];
  longFoods: Food[];
  restChoice: "short" | "long" | null;
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

const FoodCarousel = ({
  rolledNumber,
  shortFoods,
  longFoods,
  restChoice,
}: FoodCarouselProps & { shortFoods: Food[]; longFoods: Food[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [hoveredIngredients, setHoveredIngredients] = useState<string[]>([]);

  const foods =
    restChoice === "short"
      ? shortFoods
      : restChoice === "long"
        ? longFoods
        : [];

  useEffect(() => {
    if (!rolledNumber || !carouselRef.current) return;

    const container = carouselRef.current;
    const selectedFood = container.querySelector<HTMLDivElement>(
      `#food-${rolledNumber}`,
    );

    if (!selectedFood) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = selectedFood.getBoundingClientRect();

    const offset =
      itemRect.left -
      containerRect.left -
      container.clientWidth / 2 +
      itemRect.width / 2;

    container.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  }, [rolledNumber]);

  return (
    <>
      <div
        ref={carouselRef}
        className="flex gap-2 p-4 min-h-40 max-h-40 overflow-x-scroll overflow-y-hidden scrollbar "
        style={{ scrollSnapType: "x mandatory" }}
      >
        {foods.map((food, idx) => (
          <div
            id={`food-${idx}`}
            key={idx}
            onMouseEnter={(e) => {
              setHoveredRect(e.currentTarget.getBoundingClientRect());
              setHoveredIngredients(
                food.ingredients.map((ingredient) => ingredient.ingredientName),
              );
            }}
            onMouseLeave={() => setHoveredRect(null)}
            className={`relative shrink-0 w-45 h-30 rounded-lg border border-green-highlight 
              flex flex-col justify-center items-center text-center p-2 scroll-snap-center
              transition-all duration-300
              ${
                rolledNumber === idx
                  ? "bg-green-highlight text-white scale-105"
                  : "bg-cards-dark-bg text-white"
              }`}
          >
            <p className="absolute left-3 top-1 text-darker-text">#{idx}</p>
            <p className="font-semibold">{food.foodName}</p>
          </div>
        ))}
      </div>

      <FoodToolTip ingredients={hoveredIngredients} rect={hoveredRect} />
    </>
  );
};

export default FoodCarousel;
