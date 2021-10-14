import React from "react";
// import Ingredient from "./Ingredient";

export default function RecipeIngredientEdit(props) {
  const { ingredient, handleIngredientChange, handleIngredientDelete } = props;

  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }

  return (
    <>
      <input
        value={ingredient.name}
        className="recipe-edit__input"
        type="text"
        onChange={(e) => handleChange({ name: e.target.value })}
      ></input>
      <input
        value={ingredient.amount}
        className="recipe-edit__input"
        type="text"
        onChange={(e) => handleChange({ amount: e.target.value })}
      ></input>
      <button
        onClick={() => {
          handleIngredientDelete(ingredient.id);
        }}
        className="btn btn--danger"
      >
        &times;
      </button>
    </>
  );
}
