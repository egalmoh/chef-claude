import { useState } from "react";

export default function IngredientsList(props) {

  const [isLoading, setIsLoading] = useState(false);

  async function handleGetRecipe() {
    setIsLoading(true);
    try {
      await props.getRecipe();
    } finally {
      setIsLoading(false);
    }
  }

  let ingElements = props.ingredients.map((ing) => {
    return (
      <li key={ing}>{ing}<button onClick={() => props.deleteIngredient(ing)}>Delete</button></li>
      
    )
  })

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingElements}
      </ul>
      {
        props.ingredients.length > 3 && <div className="get-recipe-container">
        <div ref={props.ref}>
        {
          isLoading ?
          <div>
          <h3>Your recipe is loading please wait.</h3>
          </div>
          : <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
        } 
        </div>
          {isLoading ? <span className="loader"></span> : <button onClick={handleGetRecipe} disabled={isLoading}>
            Get Recipe
          </button>}
        </div>
      }
    </section>
  )
}