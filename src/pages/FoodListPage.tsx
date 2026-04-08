import { useEffect, useState } from "react";
import {
  deleteFoodsRequest,
  getAllFoodsRequest,
  updateFoodsRequest,
} from "../api/createFood";
import ShortList from "../components/FoodList/ShortList";
import LongList from "../components/FoodList/LongList";
import FoodControls from "../components/FoodList/FoodControls";

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

interface UpdateFoodRequest {
  foodId: string;
  foodName: string;
  ingredients: Ingredient[];
  foodType: "SHORT" | "LONG";
}

interface DeleteFoodRequest {
  foodId: string;
}

type FoodMode = "NONE" | "DELETE" | "EDIT" | "SAVE" | "UPDATE";

const FoodListPage = () => {
  const [shortFoods, setShortFoods] = useState<Food[]>([]);
  const [longFoods, setLongFoods] = useState<Food[]>([]);
  const [mode, setMode] = useState<FoodMode>("NONE");
  const [isEditingShort, setIsEditingShort] = useState<boolean>(false);
  const [isEditingLong, setIsEditingLong] = useState<boolean>(false);
  const [foodsToDelete, setFoodsToDelete] = useState<DeleteFoodRequest[]>([]);

  const isEditing = isEditingShort || isEditingLong;

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

  const handleFoodUpdate = (updatedFood: Food) => {
    if (updatedFood.foodType === "SHORT") {
      setShortFoods((prev) =>
        prev.map((food) =>
          food.foodId === updatedFood.foodId ? updatedFood : food,
        ),
      );
    }

    if (updatedFood.foodType === "LONG") {
      setLongFoods((prev) =>
        prev.map((food) =>
          food.foodId === updatedFood.foodId ? updatedFood : food,
        ),
      );
    }
  };

  const handleDeleteFood = (foodId: string, foodType: "SHORT" | "LONG") => {
    setFoodsToDelete((prev) =>
      prev.some((f) => f.foodId === foodId) ? prev : [...prev, { foodId }],
    );

    if (foodType === "SHORT") {
      setShortFoods((prev) => prev.filter((food) => food.foodId !== foodId));
    }

    if (foodType === "LONG") {
      setLongFoods((prev) => prev.filter((food) => food.foodId !== foodId));
    }
  };

  const updateFoods = async () => {
    try {
      const foodsToUpdate: UpdateFoodRequest[] = [
        ...shortFoods,
        ...longFoods,
      ].map((food) => ({
        foodId: food.foodId,
        foodName: food.foodName,
        foodType: food.foodType,
        ingredients: food.ingredients,
      }));

      await updateFoodsRequest(foodsToUpdate);
      setMode("NONE");
      setIsEditingLong(false);
      setIsEditingShort(false);

      fetchAllFoods();
    } catch (error: any) {
      console.error("Error updating foods:", error);
    }
  };

  const deleteFoods = async () => {
    try {
      await deleteFoodsRequest(foodsToDelete);

      setFoodsToDelete([]);
      setMode("NONE");

      fetchAllFoods();
    } catch (error: any) {
      console.error("Error deleting foods:", error);
    }
  };

  return (
    <section className="flex flex-col min-h-120 gap-4 bg-cards-dark-bg p-4 rounded-lg border border-green-highlight">
      <div className="max-h-120 min-h-100 p-2 overflow-x-hidden overflow-y-auto">
        {/* Left Side */}
        <div className="flex flex-col md:flex-row justify-center gap-4 h-100">
          <div className="flex justify-center w-full">
            <ShortList
              shortFoods={shortFoods}
              mode={mode}
              onDelete={handleDeleteFood}
              onUpdate={handleFoodUpdate}
              setIsEditing={setIsEditingShort}
            />
          </div>

          <div className="w-0.5 h-auto bg-green-highlight" />

          {/* Right Side */}
          <div className="flex justify-center w-full">
            <LongList
              longFoods={longFoods}
              mode={mode}
              onDelete={handleDeleteFood}
              onUpdate={handleFoodUpdate}
              setIsEditing={setIsEditingLong}
            />
          </div>
        </div>
      </div>

      <div>
        <FoodControls
          mode={mode}
          setMode={setMode}
          isEditing={isEditing}
          onUpdate={updateFoods}
          onDelete={deleteFoods}
        />
      </div>
    </section>
  );
};

export default FoodListPage;
