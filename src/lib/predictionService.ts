
import { format } from "date-fns";

interface PredictionResponse {
  success: boolean;
  predictions: string[];
  error?: string;
}

export const fetchPredictions = async (birthDate: Date): Promise<PredictionResponse> => {
  try {
    // Format the date as expected by your API (ISO format or custom)
    const formattedDate = format(birthDate, "yyyy-MM-dd");
    
    // For now, simulate API call with mock data
    // Replace this with actual API call when you have the endpoint
    // Example: const response = await fetch(`https://your-api.com/predictions?dob=${formattedDate}`);
    
    // Simulating API response timing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response - replace with actual API call
    const mockPredictions = [
      "A moment of clarity will guide an important decision.",
      "An unexpected opportunity may present itself.",
      "Take time to reflect on recent accomplishments.",
      "A conversation with a close friend will provide insight.",
      "Your creative energy will be at its peak.",
      "Focus on balance between work and personal life.",
      "A small act of kindness will have meaningful impact.",
    ];
    
    // Use birthDate to create deterministic predictions
    // This ensures same person gets same predictions
    const day = birthDate.getDate();
    const month = birthDate.getMonth();
    
    const predictions = Array(7)
      .fill(0)
      .map((_, i) => {
        const index = (day + month + i) % mockPredictions.length;
        return mockPredictions[index];
      });
    
    return {
      success: true,
      predictions
    };
    
    /* 
    When you have the actual API, use this instead:
    
    const response = await fetch(`https://your-api.com/predictions?dob=${formattedDate}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error("Failed to fetch predictions:", error);
    return {
      success: false,
      predictions: [],
      error: error instanceof Error ? error.message : "Failed to fetch predictions"
    };
  }
};
