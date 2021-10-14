import React from "react";
import Recipe from "./Recipe";
import { useContext } from "react";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  return (
    <div>
      <div className="recipe-list">
        {recipes.map((recipe) => {
          return (
            <Recipe
              ///doing this is better that adding each element of the arrays as props
              {...recipe}
              key={recipe.id}
              //   id={recipes.id}
              //   name={recipes.name}
              //   servings={recipes.servings}
              //   cookTime={recipes.cookTime}
              //   instructions={recipes.instructions}
            ></Recipe>
          );
        })}
        <div className="recipe-list__add-recipe-btn-container">
          <button className="btn btn--primary" onClick={handleRecipeAdd}>
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
