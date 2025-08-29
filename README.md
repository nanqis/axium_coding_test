# Smart Recipe Analyzer

A web application that suggests recipes based on available ingredients, complete with nutritional analysis and dietary customization.

## Overview

The Smart Recipe Analyzer allows users to input ingredients they have on hand and receive AI-generated recipe suggestions with detailed nutritional information. The application features dietary restriction filtering, ingredient substitution suggestions, and recipe history tracking.

## Features

### Core Functionality
- **Ingredient Input**: Text area for entering available ingredients (comma-separated)
- **AI-Powered Recipe Generation**: Generates 2-3 recipe suggestions using LLM integration
- **Nutritional Analysis**: Provides calorie count, protein, and carb information for each recipe
- **Recipe Details**: Includes ingredients, step-by-step instructions, cooking time, and difficulty level

### Enhanced Features
- **Dietary Restrictions**: Filter recipes by specific dietary needs (e.g., vegan, gluten-free, keto)
- **Ingredient Substitutions**: Suggests alternatives for missing ingredients
- **Recipe History**: Stores previously generated recipes for quick reference
- **Responsive Design**: Optimized for both desktop and mobile devices

### User Experience
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Intuitive Interface**: Clean, modern design for easy navigation

## Technical Implementation

### Frontend
- Built with React for a dynamic user interface
- Responsive design using CSS Grid/Flexbox
- State management for user inputs and recipe data

### Backend
- Node.js server with Express.js framework
- Request validation to ensure ingredients list is not empty
- API integration with OpenAI/Anthropic LLM services

### LLM Integration
- Structured prompt engineering to ensure consistent JSON responses
- Prompt includes requests for:
  - 2-3 recipe suggestions using provided ingredients
  - Estimated cooking time and difficulty level
  - Basic nutritional information (calories, protein, carbs)
  - JSON formatting for easy parsing

Example response structure:
```json
{
  "recipes": [
    {
      "name": "Garlic Butter Pasta",
      "ingredients": ["pasta", "garlic", "butter", "parmesan"],
      "instructions": ["Boil pasta...", "Sauté garlic..."],
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
