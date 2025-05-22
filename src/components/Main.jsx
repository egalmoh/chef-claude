import { useState, useRef, useEffect } from 'react'
import ClaudeRecipe from './ClaudeRecipe.jsx'
import IngredientsList from './IngredientsList.jsx'
import { getRecipeFromDeepseek } from '../ai.js'

export default function Main() {

  const [ingredients, setIngredients] = useState([])

  const [recipe, setRecipe] = useState('')
  const recipeSection = useRef(null)

  const [isLoading, setIsLoading] = useState(false);

  async function handleGetRecipe() {
    setIsLoading(true);
    try {
      await getRecipe();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (recipeSection.current) {
      recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe])

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIng => [...prevIng, newIngredient])
  }

  function deleteIngredient(ingredientToDelete) {
    setIngredients((prevIng) =>
      prevIng.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  }
  
  async function getRecipe() {
    const response = await getRecipeFromDeepseek(ingredients);
    setRecipe(response);
  }
  
  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input 
          required
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {
        ingredients.length > 0 
        ? <IngredientsList 
          ref={recipeSection}
          deleteIngredient={deleteIngredient}
          ingredients={ingredients} 
          getRecipe={getRecipe} 
        /> 
        : null}
      { 
        recipe 
        ? <ClaudeRecipe recipe={recipe}  /> 
        : null
      }
    </main>
  )
}