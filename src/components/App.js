import "../CSS/App.css";
import RecipeList from "./RecipeList";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );
  // console.log(selectedRecipe);
  ///loading effect
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  }, []);
  ///use effect
  useEffect(() => {
    console.log("rendered");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  /// adding context
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  //// adding recipes
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  //// deleting recipes
  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe ? (
        <RecipeEdit recipe={selectedRecipe}></RecipeEdit>
      ) : null}
    </RecipeContext.Provider>
  );
}

///sample recipes data
const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken 🍗",
    servings: 3,
    cookTime: "1:45",
    instructions: "1. Put Salt\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 lb",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 tb",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork 🐖",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "2 lb",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 tb",
      },
    ],
  },
];

export default App;
