import { createPortal } from "react-dom";

interface FoodToolTipProps {
  ingredients: string[];
  rect: DOMRect | null;
}

const FoodToolTip = ({ ingredients, rect }: FoodToolTipProps) => {
  if (!rect) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.bottom + 95,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
      }}
      className="z-50 w-48 rounded-md bg-black/90 text-white text-xs p-2 shadow-lg"
    >
      <p className="font-bold mb-1">Ingredients</p>
      <ul>
        {ingredients.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>,
    document.body,
  );
};

export default FoodToolTip;
