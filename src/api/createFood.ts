interface foodData {
  foodName: string;
  ingredients: string[];
  foodType: "SHORT" | "LONG";
}

interface Ingredient {
  ingredientName: string;
  ingredientId: string;
}

/**
 *  Creates new food item in the database with the provided food data, including name, ingredients, and type (short or long).
 *
 * @param foodData - The data of the food to be created, including name, ingredients, and rest option.
 * @returns A promise that resolves to the response of the create food request.
 */

export const createFoodRequest = async (foodData: foodData) => {
  const token = localStorage.getItem("authToken") || "";
  const response = await fetch("http://localhost:8080/food/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(foodData),
  });

  return response;
};

/**
 * Retrieves every food item from the database, including their details such as name, ingredients, and type (short or long).
 *
 * @param foodId - The ID of the food item to retrieve details for.
 * @returns A promise that resolves to the response of the get food request, which includes the details of the specified food item.
 */

export const getAllFoodsRequest = async () => {
  const token = localStorage.getItem("authToken") || "";
  const response = await fetch("http://localhost:8080/food/all-foods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

/**
 * Deletes a specific food item from the database based on the provided food ID.
 *
 * @param foodId - The ID of the food item to be deleted.
 * @returns - A promise that resolves to the response of the delete food request, indicating whether the deletion was successful or not.
 */
export const deleteFoodRequest = async (foodId: string) => {
  const response = await fetch(`http://localhost:8080/food/delete/${foodId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

interface DeleteFoodRequest {
  foodId: string;
}

export const deleteFoodsRequest = async (foods: DeleteFoodRequest[]) => {
  const token = localStorage.getItem("authToken") || "";

  try {
    const response = await fetch("http://localhost:8080/food/delete-several", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(foods),
    });

    if (!response.ok) {
      throw new Error("Failed to delete foods");
    }

    console.log("Response: " + response.status);

    return response;
  } catch (error) {
    console.error("Error deleting foods:", error);
    throw error;
  }
};

interface UpdateFoodRequest {
  foodId: string;
  foodName: string;
  ingredients: Ingredient[];
  foodType: "SHORT" | "LONG";
}

/**
 * Updates multiple food items in the database.
 *
 * @param foods - An array of food objects containing updated details.
 * @returns A promise that resolves to the response of the update foods request.
 */
export const updateFoodsRequest = async (foods: UpdateFoodRequest[]) => {
  const token = localStorage.getItem("authToken") || "";

  try {
    const response = await fetch("http://localhost:8080/food/update-several", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(foods),
    });

    if (!response.ok) {
      throw new Error("Failed to update foods");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
};
