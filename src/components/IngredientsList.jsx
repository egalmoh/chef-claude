export default function IngredientsList(props) {

  let ingElements = props.ingredients.map((ing) => {
    return (
      <li key={ing}>{ing}<button onClick={() => props.deleteIngredient(ing)}>delete</button></li>
      
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
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
          <button onClick={props.getRecipe}>Get a recipe</button>
        </div>
      }
    </section>
  )
}