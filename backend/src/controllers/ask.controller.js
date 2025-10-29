import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRecipe = async (req, res, next) => {
  try {
    const { query, disease, symptoms = "", ingredients = "" } = req.body || {};

    // Check if Gemini API key is available
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key not configured. Please set GEMINI_API_KEY in environment variables.",
      });
    }

    // Normalize inputs
    const parsedIngredients = (ingredients || "")
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const parsedSymptoms = (symptoms || "")
      .split(/[,\.\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    // Create a comprehensive prompt for Gemini
    const prompt = `Create a healthy recipe for someone with ${disease || query}. 

${parsedSymptoms.length ? `Consider these symptoms/concerns: ${parsedSymptoms.join(", ")}.` : ""}

${parsedIngredients.length ? `Use these available ingredients: ${parsedIngredients.join(", ")}.` : "Suggest appropriate healthy ingredients."}

Please provide a detailed recipe with:
1. A descriptive title
2. A list of ingredients with quantities
3. Step-by-step cooking instructions
4. Any health benefits or considerations for this specific condition

Format your response as a JSON object with this exact structure:
{
  "title": "Recipe Title",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "steps": ["step 1", "step 2", ...],
  "healthNotes": "Brief health considerations for this condition"
}

Make sure the recipe is appropriate for managing ${disease || query} and focuses on nutritious, healing ingredients.`;

    // Get the Gemini model (try different models if one fails)
    let model;
    let result;
    let response;
    let text;

    try {
      // Try gemini-1.5-flash first (faster and cheaper)
      model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      result = await model.generateContent(prompt);
      response = await result.response;
      text = response.text();
    } catch (modelError) {
      console.log("Trying fallback model...");
      try {
        // Fallback to gemini-1.5-pro if flash fails
        model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        result = await model.generateContent(prompt);
        response = await result.response;
        text = response.text();
      } catch (fallbackError) {
        throw new Error(`Both Gemini models failed: ${modelError.message}, ${fallbackError.message}`);
      }
    }

    // Try to parse the JSON response
    let recipeData;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipeData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      // Fallback: create a structured response from the text
      const lines = text.split('\n').filter(line => line.trim());
      recipeData = {
        title: lines[0] || `Healthy ${disease || query} Recipe`,
        ingredients: lines.filter(line => 
          line.includes('ingredient') || 
          line.includes('cup') || 
          line.includes('tbsp') || 
          line.includes('tsp') ||
          line.includes('gram') ||
          line.includes('kg')
        ).slice(0, 8),
        steps: lines.filter(line => 
          line.includes('Step') || 
          line.includes('step') ||
          line.includes('1.') ||
          line.includes('2.') ||
          line.includes('3.')
        ).slice(0, 6),
        healthNotes: `This recipe is designed to support ${disease || query} management.`
      };
    }

    // Ensure we have the required fields
    if (!recipeData.ingredients || !Array.isArray(recipeData.ingredients)) {
      recipeData.ingredients = ["Please check the full response for ingredients"];
    }
    if (!recipeData.steps || !Array.isArray(recipeData.steps)) {
      recipeData.steps = ["Please check the full response for cooking steps"];
    }

    return res.json({
      success: true,
      ...recipeData,
      source: "Gemini AI"
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Fallback to local generation if Gemini fails
    const { query, disease, symptoms = "", ingredients = "" } = req.body || {};
    
    const parsedIngredients = (ingredients || "")
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const title = parsedIngredients.length
      ? `Quick ${disease || query} recipe with ${parsedIngredients.slice(0, 3).join(", ")}`
      : `Quick ${disease || query} recipe`;

    const ingredientsList = parsedIngredients.length
      ? parsedIngredients
      : ["1 cup cooked grain (rice/quinoa)", "1 cup vegetables", "Salt & pepper to taste"];

    const steps = [
      `Prep: Wash and chop the following ingredients: ${ingredientsList.join(", ")}.`,
      "Step 1: Heat a pan with a light drizzle of oil and sauté aromatics (garlic/ginger/onion) until fragrant.",
      `Step 2: Add vegetables and cook for 4-6 minutes until tender. Add cooked grains and toss together.`,
      "Step 3: Season to taste with salt, pepper, and a squeeze of lemon or light soy sauce.",
      "Step 4: Serve warm. Garnish with fresh herbs if available."
    ];

    return res.json({
      success: true,
      title,
      ingredients: ingredientsList,
      steps,
      healthNotes: `This is a fallback recipe for ${disease || query}. Gemini API is currently unavailable.`,
      source: "Fallback Generator"
    });
  }
};
