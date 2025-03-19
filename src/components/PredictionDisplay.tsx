
import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPredictions } from "@/lib/predictionService";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface PredictionDisplayProps {
  birthDate: Date;
  onBack: () => void;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({
  birthDate,
  onBack,
}) => {
  const [predictions, setPredictions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const today = new Date();

  const loadPredictions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchPredictions(birthDate);
      
      if (response.success) {
        setPredictions(response.predictions);
      } else {
        setError(response.error || "Failed to fetch predictions");
        toast({
          title: "Error",
          description: response.error || "Failed to fetch predictions",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadPredictions();
  }, [birthDate]);

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
      
      {error && (
        <div className="p-4 mb-6 text-center">
          <p className="text-destructive mb-3">{error}</p>
          <Button onClick={loadPredictions} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      )}
      
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array(7).fill(0).map((_, index) => (
            <div 
              key={`skeleton-${index}`}
              className="p-5 rounded-lg border border-input/30 bg-white/70 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-full mt-3" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          ))
        ) : (
          predictions.map((prediction, index) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default PredictionDisplay;
