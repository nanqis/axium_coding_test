# Recipe Generator API

A simple Node.js backend that generates recipe suggestions using OpenAI's GPT model.

## Features

- ✅ Request validation: Ensures ingredients list is not empty
- ✅ LLM Integration: Connected to OpenAI API
- ✅ Response formatting: Structured JSON response with 2-3 recipe suggestions
- ✅ Ingredient Substitutions: Suggests alternatives for missing ingredients
- ✅ Dietary Restrictions: Filter recipes by dietary needs
- ✅ Recipe History: Stores previously generated recipes in memory
- ✅ Simple prototype design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### POST /api/recipes/generate

Generate recipe suggestions based on provided ingredients.

**Request Body:**
```json
{
  "ingredients": ["chicken", "rice", "garlic", "onion"],
  "dietaryRestrictions": ["vegetarian", "gluten-free"],
  "useHistory": true
}
```

**Response:**
```json
{
  "recipes": [
    {
      "name": "Garlic Butter Pasta",
      "ingredients": ["pasta", "garlic", "butter", "parmesan"],
      "substitutions": ["olive oil for butter", "nutritional yeast for parmesan"],
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
```

### GET /api/recipes/history

Get previously generated recipes (stored in memory).

**Response:**
```json
{
  "history": [
    {
      "timestamp": "2024-01-01T12:00:00.000Z",
      "ingredients": ["chicken", "rice"],
      "recipes": [...]
    }
  ]
}
```

## New Features

### Ingredient Substitutions
- AI suggests common alternatives for missing ingredients
- Helps users adapt recipes to what they have available

### Dietary Restrictions
- Filter recipes by dietary needs (vegetarian, gluten-free, etc.)
- All generated recipes respect specified restrictions

### Recipe History
- Stores last 10 recipe generations in memory
- Includes history context in prompts to avoid repetition
- Can be toggled on/off via `useHistory` parameter

## Testing

Run the test script to verify the API:
```bash
node test-api.js
```

## Health Check

- `GET /health` - Server health status
- `GET /test` - Test endpoint with environment info
- `GET /` - API information and available endpoints

## Error Handling

The API includes comprehensive error handling for:
- Invalid ingredients input
- Invalid dietary restrictions format
- OpenAI API errors
- JSON parsing errors
- Server errors
