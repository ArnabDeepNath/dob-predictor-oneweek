
import React from "react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PredictionDisplayProps {
  birthDate: Date;
  onBack: () => void;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({
  birthDate,
  onBack,
}) => {
  // Generate a one-week prediction based on birth date
  const generatePrediction = (date: Date): string[] => {
    const predictions = [
      "A moment of clarity will guide an important decision.",
      "An unexpected opportunity may present itself.",
      "Take time to reflect on recent accomplishments.",
      "A conversation with a close friend will provide insight.",
      "Your creative energy will be at its peak.",
      "Focus on balance between work and personal life.",
      "A small act of kindness will have meaningful impact.",
    ];
    
    // Use birthdate to create deterministic but seemingly random predictions
    // This ensures the same person always gets the same predictions
    const day = date.getDate();
    const month = date.getMonth();
    
    return Array(7)
      .fill(0)
      .map((_, i) => {
        const index = (day + month + i) % predictions.length;
        return predictions[index];
      });
  };

  const weekPredictions = generatePrediction(birthDate);
  const today = new Date();

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8 text-muted-foreground hover:text-foreground transition-colors"
        onClick={onBack}
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Your Personal
        </h2>
        <h1 className="text-4xl font-light tracking-tight">
          One Week Prediction
        </h1>
      </div>
      
      <div className="space-y-4">
        {weekPredictions.map((prediction, index) => {
          const day = addDays(today, index);
          return (
            <div
              key={index}
              className={cn(
                "p-5 rounded-lg border border-input/30 bg-white/70 backdrop-blur-sm transition-all",
                "hover:shadow-md hover:border-input/50 animate-slide-in",
                "opacity-0"
              )}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between">
                <div className="text-sm font-medium text-muted-foreground">
                  {format(day, "EEEE, MMMM d")}
                </div>
              </div>
              <p className="mt-2 text-foreground">{prediction}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PredictionDisplay;
