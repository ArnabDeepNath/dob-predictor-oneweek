
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectorProps {
  onDateSelected: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelected }) => {
  const [date, setDate] = React.useState<Date>();
  
  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateSelected(selectedDate);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Enter your
        </h2>
        <h1 className="text-4xl font-light tracking-tight">
          Date of Birth
        </h1>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "w-[280px] justify-start text-left font-light border border-input/50 shadow-sm hover:shadow-md transition-all",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-5 w-5 opacity-70" />
            {date ? format(date, "MMMM d, yyyy") : <span>Select date...</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-sm border border-input/30 shadow-lg" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => date > new Date()}
            initialFocus
            className={cn("p-3 pointer-events-auto rounded-lg")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
