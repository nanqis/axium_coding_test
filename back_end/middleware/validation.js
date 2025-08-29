const validateRecipeInput = (req, res, next) => {
  const { ingredients, dietaryRestrictions, useHistory } = req.body;
  
  // Check if ingredients array exists and is not empty
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({
      error: 'Ingredients are required and must be a non-empty array'
    });
  }
  
  // Check if each ingredient is a non-empty string
  for (let i = 0; i < ingredients.length; i++) {
    if (!ingredients[i] || typeof ingredients[i] !== 'string' || ingredients[i].trim() === '') {
      return res.status(400).json({
        error: `Ingredient at index ${i} must be a non-empty string`
      });
    }
  }
  
  // Validate dietary restrictions if provided
  if (dietaryRestrictions && !Array.isArray(dietaryRestrictions)) {
    return res.status(400).json({
      error: 'Dietary restrictions must be an array'
    });
  }
  
  // Validate useHistory if provided
  if (useHistory !== undefined && typeof useHistory !== 'boolean') {
    return res.status(400).json({
      error: 'useHistory must be a boolean'
    });
  }
  
  // Clean the data - trim whitespace from ingredients
  req.body.ingredients = ingredients.map(ingredient => ingredient.trim());
  
  // Clean dietary restrictions if provided
  if (dietaryRestrictions) {
    req.body.dietaryRestrictions = dietaryRestrictions.map(restriction => restriction.trim());
  }
  
  next();
};

module.exports = { validateRecipeInput };



