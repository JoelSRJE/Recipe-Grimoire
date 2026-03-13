import {
  EyeClosedIcon,
  MoonIcon,
  ForkKnifeIcon,
  CheckSquareOffsetIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import { createFoodRequest } from "../../api/createFood";

type RestChoice = "short" | "long";

const CreateFoodForm = () => {
  const [foodName, setFoodName] = useState<string>("");
  const [RestChoice, setRestChoice] = useState<RestChoice>("short");
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const insertNewIngredient = (e: any) => {
    e.preventDefault();

    if (!ingredient.trim()) {
      return;
    }

    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    setIngredient("");
  };

  const deleteIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, idx) => idx !== index),
    );
  };

  const createFood = async (e: FormEvent) => {
    e.preventDefault();

    const foodData = {
      foodName: foodName,
      foodType: RestChoice.toUpperCase() as "SHORT" | "LONG",
      ingredients: ingredients,
    };

    try {
      const response = await createFoodRequest(foodData);

      if (response.ok) {
        setFoodName("");
        setRestChoice("short");
        setIngredients([]);
      }
    } catch (error) {
      console.error("Error creating food:", error);
    }
  };

  return (
    <form className="flex flex-col gap-4 p-8" onSubmit={createFood}>
      {/* Food Name */}
      <div className="flex flex-col w-60">
        <label>FOOD NAME</label>
        <div>
          <ForkKnifeIcon
            size={20}
            className="absolute ml-2 mt-3 text-green-highlight"
          />
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Lasagne"
            className="p-2 pl-10 rounded-md bg-[#131313] w-80 border border-bg-green focus:outline-none"
          />
        </div>
      </div>
      {/* Meal Type / Rest Option */}
      <div className="flex flex-col w-80">
        <label className="flex gap-2">
          REST OPTION{" "}
          {RestChoice === "short" ? (
            <span>
              <EyeClosedIcon size={20} className="text-green-highlight" />
            </span>
          ) : (
            <span>
              <MoonIcon size={20} className="text-green-highlight" />
            </span>
          )}
        </label>
        <select
          className="p-2 rounded-md bg-[#131313] border border-bg-green focus:outline-none"
          value={RestChoice}
          onChange={(e) => setRestChoice(e.target.value as RestChoice)}
        >
          <option value="short">SHORT</option>
          <option value="long">LONG</option>
        </select>
      </div>
      {/* Ingredient List */}
      <div>
        <label>INGREDIENT LIST</label>
        <div className="flex flex-row gap-2 bg-black/30 w-80">
          {ingredients.length > 0 ? (
            <ul className="flex flex-row items-center ml-1 flex-wrap gap-2 mt-2 mb-2 min-h-10 h-auto">
              {ingredients.map((item, idx) => (
                <li
                  key={idx}
                  className="relative p-2 rounded-md bg-[#1a1a1a] border border-bg-green text-sm"
                >
                  {item}
                  <button
                    onClick={() => deleteIngredient(idx)}
                    className="absolute -top-1.5 -right-1.5 px-0.5 py-px rounded-md text-xs font-bold transition-all duration-300 hover:cursor-pointer hover:text-red-600"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-10 w-full text-center">
              No ingredients added yet.
            </div>
          )}
        </div>
      </div>
      {/* Add Ingredient */}
      <div className="flex flex-col w-80">
        <div className="flex justify-between items-center gap-2 p-2 rounded-md bg-[#131313] border border-bg-green focus:outline-none">
          <CheckSquareOffsetIcon size={20} className="text-green-highlight" />
          <input
            type="text"
            placeholder="Tomato Sauce"
            className="pl-1 w-55"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button
            type="button"
            onClick={insertNewIngredient}
            className="text-white border p-0.5 rounded-sm transition-all duration-300 hover:cursor-pointer hover:text-darker-text"
          >
            <PencilSimpleIcon size={20} />
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-highlight rounded-lg px-4 py-2 text-lg font-bold transition-all duration-300 hover:scale-105 hover:cursor-pointer"
      >
        SUBMIT
      </button>
    </form>
  );
};

export default CreateFoodForm;
