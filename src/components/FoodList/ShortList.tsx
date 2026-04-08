import { useState } from "react";
import {
  CaretCircleDownIcon,
  CaretCircleUpIcon,
  EyeClosedIcon,
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

type FoodMode = "NONE" | "DELETE" | "EDIT" | "SAVE" | "UPDATE";

interface Ingredient {
  ingredientName: string;
  ingredientId: string;
}

interface ShortFood {
  foodName: string;
  foodType: "SHORT" | "LONG";
  ingredients: Ingredient[];
  foodId: string;
}

interface ShortListProps {
  shortFoods: ShortFood[];
  mode: FoodMode;
  onDelete: (foodId: string, foodType: "SHORT" | "LONG") => void;
  onUpdate: (food: ShortFood) => void;
  setIsEditing: (value: boolean) => void;
}

const ShortList = ({
  shortFoods,
  mode,
  onDelete,
  onUpdate,
  setIsEditing,
}: ShortListProps) => {
  const [openFoodId, setOpenFoodId] = useState<string | null>(null);
  const [editingFoodId, setEditingFoodId] = useState<string | null>(null);
  const [editFoodName, setEditFoodName] = useState<string>("");
  const [editIngredients, setEditIngredients] = useState<Ingredient[]>([]);

  const toggleFoodOpen = (foodId: string) => {
    setOpenFoodId((prev) => (prev === foodId ? null : foodId));
  };

  const activeEditMode = (food: ShortFood) => {
    setEditingFoodId(food.foodId);
    setEditFoodName(food.foodName);
    setEditIngredients(food.ingredients);
    setIsEditing(true);
  };

  const saveEdits = (food: ShortFood) => {
    const updatedFood = {
      ...food,
      foodName: editFoodName,
      ingredients: editIngredients,
    };

    onUpdate(updatedFood);
    setEditingFoodId(null);
    setEditFoodName("");
    setEditIngredients([]);
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setEditingFoodId(null);
    setEditFoodName("");
    setEditIngredients([]);
    setIsEditing(false);
  };

  const updateIngredient = (ingredientId: string, value: string) => {
    setEditIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.ingredientId === ingredientId
          ? { ...ingredient, ingredientName: value }
          : ingredient,
      ),
    );
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      ingredientId: crypto.randomUUID(),
      ingredientName: "",
    };
    setEditIngredients((prev) => [...prev, newIngredient]);
  };

  const removeIngredient = (ingredientId: string) => {
    setEditIngredients((prev) =>
      prev.filter((ingredient) => ingredient.ingredientId !== ingredientId),
    );
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center mt-45 md:mt-0">
        <h1 className="flex items-center gap-2 font-bold text-2xl">
          Short Foods{" "}
          <EyeClosedIcon size={24} className="text-green-highlight" />
        </h1>
        <span className="text-sm text-darker-text">({shortFoods.length}x)</span>
      </div>

      {/* The Short List */}
      {shortFoods.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {shortFoods.map((food, idx) => {
            const isOpen = openFoodId === food.foodId;
            const isEditing = editingFoodId === food.foodId;

            return (
              <li
                key={food.foodId}
                className={`flex flex-col w-80 ${
                  idx % 2 === 0 ? "bg-black/40" : "bg-black/10"
                } px-2 py-2 rounded-md border border-green-highlight transition-all duration-300`}
              >
                {/* Food Name & Controls */}
                <div className="flex items-center justify-between">
                  {isEditing ? (
                    <input
                      value={editFoodName}
                      onChange={(e) => setEditFoodName(e.target.value)}
                      className="bg-black/40 border border-green-highlight rounded px-2 py-1 text-sm w-full mr-2 focus:outline-none"
                    />
                  ) : (
                    <p
                      className={`font-semibold text-lg tracking-wider text-darker-text ${
                        isOpen ? "border-b-2 border-green-highlight" : ""
                      }`}
                    >
                      {food.foodName}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFoodOpen(food.foodId)}
                      className="transition-all duration-300 hover:cursor-pointer hover:scale-105"
                    >
                      {isOpen ? (
                        <CaretCircleUpIcon className="w-6 h-6" />
                      ) : (
                        <CaretCircleDownIcon className="w-6 h-6" />
                      )}
                    </button>

                    {mode === "DELETE" && (
                      <button
                        onClick={() => onDelete(food.foodId, food.foodType)}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    )}

                    {mode === "EDIT" && !isEditing && (
                      <button
                        onClick={() => activeEditMode(food)}
                        className="text-blue-500 hover:scale-110 transition"
                      >
                        <PencilIcon className="w-6 h-6" />
                      </button>
                    )}

                    {isEditing && (
                      <>
                        <button
                          onClick={() => saveEdits(food)}
                          className="text-green-highlight text-sm hover:cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdits}
                          className="text-darker-text text-sm hover:cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-row flex-wrap gap-2">
                    {(isEditing ? editIngredients : food.ingredients).map(
                      (ingredient) =>
                        isEditing ? (
                          <div
                            key={ingredient.ingredientId}
                            className="flex items-center gap-1"
                          >
                            <input
                              value={ingredient.ingredientName}
                              onChange={(e) =>
                                updateIngredient(
                                  ingredient.ingredientId,
                                  e.target.value,
                                )
                              }
                              className="text-sm bg-green-highlight/20 px-2 py-1 rounded-md border border-green-highlight focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                removeIngredient(ingredient.ingredientId)
                              }
                              className="text-red-500 hover:cursor-pointer hover:scale-110 transition"
                            >
                              <XCircleIcon className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <span
                            key={ingredient.ingredientId}
                            className="text-sm bg-green-highlight/20 px-2 py-1 rounded-md"
                          >
                            {ingredient.ingredientName}
                          </span>
                        ),
                    )}

                    {/* Lägg till ny ingredient */}
                    {isEditing && (
                      <button
                        onClick={addIngredient}
                        className="ml-2 flex items-center gap-1 text-green-highlight hover:cursor-pointer hover:scale-105 transition"
                      >
                        <PlusCircleIcon className="w-5 h-5" /> Add Ingredient
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No short foods available</p>
      )}
    </div>
  );
};

export default ShortList;
