const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory storage for recipe history
let recipeHistory = [];

const generateRecipe = async (req, res) => {
  try {
    const { ingredients, dietaryRestrictions, useHistory } = req.body;
    
    // Construct the prompt with history if requested
    const prompt = constructPrompt(ingredients, dietaryRestrictions, useHistory ? recipeHistory : null);
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional chef and recipe creator. Always respond with valid JSON format as specified in the user prompt. Generate exactly 2-3 recipe suggestions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    
    // Parse the response
    const responseContent = completion.choices[0].message.content;
    
    try {
      // Try to parse JSON response
      const recipeData = JSON.parse(responseContent);
      
      // Store recipes in history
      if (recipeData.recipes && recipeData.recipes.length > 0) {
        recipeHistory.push({
          timestamp: new Date().toISOString(),
          ingredients: ingredients,
          recipes: recipeData.recipes
        });
        
        // Keep only last 10 recipe generations to prevent memory bloat
        if (recipeHistory.length > 10) {
          recipeHistory = recipeHistory.slice(-10);
        }
      }
      
      res.json(recipeData);
    } catch (parseError) {
      // If JSON parsing fails, return error
      console.error('OpenAI response parsing error:', parseError);
      res.status(500).json({
        error: 'Failed to parse recipe response',
        details: 'The AI response was not in valid JSON format'
      });
    }
    
  } catch (error) {
    console.error('Recipe generation error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: 'OpenAI API quota exceeded',
        details: 'Please check your OpenAI account billing'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'Invalid OpenAI API key',
        details: 'Please check your API key configuration'
      });
    }
    
    res.status(500).json({
      error: 'Failed to generate recipe',
      details: error.message
    });
  }
};

const constructPrompt = (ingredients, dietaryRestrictions, history) => {
  let prompt = `Generate 2-3 recipe suggestions using these ingredients: ${ingredients.join(', ')}.`;

  // Add dietary restrictions if provided
  if (dietaryRestrictions && dietaryRestrictions.length > 0) {
    prompt += `\n\nDietary restrictions: ${dietaryRestrictions.join(', ')}. All recipes must be suitable for these dietary needs.`;
  }

  // Add ingredient substitutions
  prompt += `\n\nFor any missing ingredients, suggest common substitutions that would work well in the recipe.`;

  // Add history context if available
  if (history && history.length > 0) {
    prompt += `\n\nPrevious recipe preferences (avoid repeating similar recipes):`;
    history.slice(-3).forEach((entry, index) => {
      prompt += `\n- ${entry.ingredients.join(', ')} → ${entry.recipes.map(r => r.name).join(', ')}`;
    });
  }

  prompt += `\n\nPlease provide the response in the following EXACT JSON format:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
      "substitutions": ["substitution1", "substitution2"],
      "instructions": ["Step 1: First instruction", "Step 2: Second instruction"],
      "cookingTime": "20 minutes",
      "difficulty": "Easy",
      "nutrition": {
        "calories": 450,
        "protein": "12g",
        "carbs": "60g"
      }
    }
  ]
}

Requirements:
- Generate exactly 2-3 recipes
- Each recipe must use at least 2 of the provided ingredients
- Include realistic cooking times (in minutes)
- Set difficulty as "Easy", "Medium", or "Hard"
- Provide realistic nutritional information (calories, protein, carbs)
- Suggest ingredient substitutions for missing items
- Make sure the response is valid JSON
- Keep instructions simple and clear`;

  return prompt;
};

// Get recipe history
const getRecipeHistory = (req, res) => {
  res.json({ history: recipeHistory });
};

module.exports = {
  generateRecipe,
  getRecipeHistory
};
