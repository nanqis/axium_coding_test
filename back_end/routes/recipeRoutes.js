const express = require('express');
const router = express.Router();
const { generateRecipe, getRecipeHistory } = require('../controllers/recipeController');
const { validateRecipeInput } = require('../middleware/validation');

// POST /api/recipes/generate
router.post('/generate', validateRecipeInput, generateRecipe);

// GET /api/recipes/history
router.get('/history', getRecipeHistory);

// GET /api/recipes/health
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Recipe API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
