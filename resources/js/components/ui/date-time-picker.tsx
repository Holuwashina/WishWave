import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface DateTimePickerProps {
    date: Date;
    setDate: (date: Date) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
    const time = format(date, 'HH:mm');

    const handleTimeChange = (timeString: string) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setDate(newDate);
    };

    return (
        <div className="flex gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 size-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-[120px]"
            />
        </div>
    );
} 