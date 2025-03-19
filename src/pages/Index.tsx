
import React, { useState } from "react";
import DateSelector from "@/components/DateSelector";
import PredictionDisplay from "@/components/PredictionDisplay";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const handleDateSelected = (date: Date) => {
    // Smooth transition to prediction
    setTimeout(() => {
      setSelectedDate(date);
    }, 400);
  };
  
  const handleBack = () => {
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 py-10">
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative w-full overflow-hidden px-4">
          {!selectedDate ? (
            <DateSelector onDateSelected={handleDateSelected} />
          ) : (
            <PredictionDisplay birthDate={selectedDate} onBack={handleBack} />
          )}
        </div>
        
        <footer className="mt-auto pt-20 text-center text-xs text-muted-foreground">
          <p>Your personal prediction based on date of birth.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
