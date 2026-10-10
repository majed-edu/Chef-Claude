import React from "react";
import IngredientsList from "../components/IngredientsList";
import ClaudeRecipe from "../components/ClaudeRecipe";
import { getRecipeFromGroq } from "../ai";

export default function Main() {
  // تخزين المكونات
  const [ingredients, setIngredients] = React.useState([]);

  // تخزين الوصفة التي يرجعها الذكاء الاصطناعي
  const [recipe, setRecipe] = React.useState("");

  // تحديد حالة تحميل الوصفة
  const [isLoading, setIsLoading] = React.useState(false);

  // تخزين رسالة الخطأ إن حدثت مشكلة
  const [error, setError] = React.useState("");

  // طلب وصفة من Groq
  async function getRecipe() {
    setIsLoading(true);
    setError("");
    setRecipe("");

    try {
      const recipeMarkdown = await getRecipeFromGroq(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // إضافة مكوّن جديد
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")?.trim();

    if (!newIngredient) return;

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />

        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          isLoading={isLoading}
        />
      )}

      {isLoading && <p>Generating your recipe...</p>}

      {error && <p role="alert">{error}</p>}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
