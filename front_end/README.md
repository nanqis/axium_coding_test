# Recipe Generator Frontend

A simple, responsive React frontend for the Recipe Generator API.

## Features

✅ **Input Form**: Text area for entering ingredients (comma-separated)  
✅ **Results Display**: Shows generated recipes with ingredients, instructions, and nutritional info  
✅ **Loading States**: Visual feedback during API calls with spinner animation  
✅ **Responsive Design**: Works perfectly on desktop and mobile devices  
✅ **Error Handling**: User-friendly error messages for various scenarios  

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## How to Use

1. **Enter Ingredients**: Type your available ingredients separated by commas
   - Example: `chicken, rice, garlic, onion, tomatoes`

2. **Generate Recipes**: Click the "Generate Recipes" button

3. **View Results**: Get 2-3 AI-generated recipe suggestions with:
   - Recipe name and cooking time
   - Difficulty level
   - Nutritional information (calories, protein, carbs)
   - Complete ingredients list
   - Step-by-step instructions

## Technical Details

- **Framework**: React 19 with TypeScript
- **Styling**: Modern CSS with responsive design
- **API Integration**: Connects to backend at `http://localhost:5000`
- **State Management**: React hooks (useState) for simple state
- **Error Handling**: Comprehensive error handling for API failures
- **Loading States**: Animated spinner and user feedback

## Responsive Breakpoints

- **Desktop**: Full grid layout with multiple recipe cards
- **Tablet (≤768px)**: Single column layout, adjusted spacing
- **Mobile (≤480px)**: Optimized for small screens, stacked elements

## API Endpoint

- **POST** `/api/recipes/generate`
- **Backend URL**: `http://localhost:5000`
- **Request Body**: `{ "ingredients": ["ingredient1", "ingredient2"] }`

## Development

- **Hot Reload**: Changes reflect immediately in development
- **TypeScript**: Full type safety for better development experience
- **Modern CSS**: Uses CSS Grid, Flexbox, and modern features
