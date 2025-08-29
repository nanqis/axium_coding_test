import React, { useState } from 'react';
import './App.css';

interface Recipe {
  name: string;
  ingredients: string[];
  substitutions?: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
  };
}

interface ApiResponse {
  recipes: Recipe[];
}

function App() {
  const [ingredients, setIngredients] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [useHistory, setUseHistory] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecipes = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients');
      return;
    }

    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const ingredientsList = ingredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const dietaryList = dietaryRestrictions
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const response = await fetch('http://localhost:5000/api/recipes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ingredients: ingredientsList,
          dietaryRestrictions: dietaryList.length > 0 ? dietaryList : undefined,
          useHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate recipes');
      }

      const data: ApiResponse = await response.json();
      setRecipes(data.recipes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateRecipes();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍳 Recipe Generator</h1>
        <p>Enter your available ingredients and get recipe suggestions!</p>
      </header>

      <main className="App-main">
        <form onSubmit={handleSubmit} className="ingredients-form">
          <div className="form-group">
            <label htmlFor="ingredients">Available Ingredients:</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients separated by commas (e.g., chicken, rice, garlic, onion)"
              rows={3}
              disabled={loading}
            />
            <small>Separate ingredients with commas</small>
          </div>

          <div className="form-group">
            <label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional):</label>
            <textarea
              id="dietaryRestrictions"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              placeholder="e.g., vegetarian, gluten-free, dairy-free"
              rows={2}
              disabled={loading}
            />
            <small>Separate restrictions with commas</small>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={useHistory}
                onChange={(e) => setUseHistory(e.target.checked)}
                disabled={loading}
              />
              Use recipe history to avoid repeating similar recipes
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !ingredients.trim()}
            className="generate-btn"
          >
            {loading ? 'Generating Recipes...' : 'Generate Recipes'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>AI is cooking up some delicious recipes for you...</p>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="recipes-container">
            <h2>🍽️ Recipe Suggestions</h2>
            <div className="recipes-grid">
              {recipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <h3>{recipe.name}</h3>
                  
                  <div className="recipe-meta">
                    <span className="meta-item">
                      ⏱️ {recipe.cookingTime}
                    </span>
                    <span className="meta-item">
                      📊 {recipe.difficulty}
                    </span>
                  </div>

                  {recipe.substitutions && recipe.substitutions.length > 0 && (
                    <div className="substitutions-section">
                      <h4>💡 Ingredient Substitutions:</h4>
                      <ul>
                        {recipe.substitutions.map((sub, idx) => (
                          <li key={idx}>{sub}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="nutrition-info">
                    <h4>Nutrition (per serving):</h4>
                    <div className="nutrition-grid">
                      <span>🔥 {recipe.nutrition.calories} cal</span>
                      <span>🥩 {recipe.nutrition.protein}</span>
                      <span>🍞 {recipe.nutrition.carbs}</span>
                    </div>
                  </div>

                  <div className="ingredients-section">
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="instructions-section">
                    <h4>Instructions:</h4>
                    <ol>
                      {recipe.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
