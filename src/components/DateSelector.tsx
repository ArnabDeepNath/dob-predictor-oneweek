
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateSelectorProps {
  onDateSelected: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelected }) => {
  const [date, setDate] = React.useState<Date>();
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  
  // Generate years for the selector (current year down to 100 years ago)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  
  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateSelected(selectedDate);
      setCalendarOpen(false);
    }
  };

  // Handler for year selection
  const handleYearSelect = (year: string) => {
    const newDate = date ? new Date(date) : new Date();
    newDate.setFullYear(parseInt(year));
    
    // If the date becomes invalid (e.g., Feb 29 in non-leap year)
    // adjust to the last day of the month
    if (newDate.getFullYear() !== parseInt(year)) {
      newDate.setDate(0); // Last day of previous month
      newDate.setMonth(newDate.getMonth() + 1); // Move to correct month
    }
    
    // Update the calendar view month
    const newMonth = new Date(newDate);
    setCurrentMonth(newMonth);
    
    setDate(newDate);
  };

  // Handler for month selection
  const handleMonthSelect = (month: string) => {
    const newDate = date ? new Date(date) : new Date();
    const monthNum = parseInt(month);
    newDate.setMonth(monthNum);
    
    // If the date becomes invalid (e.g., Feb 29 in non-leap year)
    // adjust to the last day of the month
    if (newDate.getMonth() !== monthNum) {
      newDate.setDate(0); // Last day of previous month
    }
    
    // Update the calendar view month
    const newMonth = new Date(newDate);
    setCurrentMonth(newMonth);
    
    setDate(newDate);
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
      
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
          <div className="p-2 flex gap-2 border-b">
            <Select 
              onValueChange={handleMonthSelect} 
              value={date ? date.getMonth().toString() : new Date().getMonth().toString()}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {format(new Date(2000, i, 1), "MMMM")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              onValueChange={handleYearSelect} 
              value={date ? date.getFullYear().toString() : new Date().getFullYear().toString()}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
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
