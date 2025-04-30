import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { addDays, format, startOfDay, startOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

const presets = [
    {
        label: 'Today',
        getValue: () => ({
            from: startOfDay(new Date()),
            to: startOfDay(new Date())
        })
    },
    {
        label: 'Last 7 days',
        getValue: () => ({
            from: addDays(new Date(), -6),
            to: new Date()
        })
    },
    {
        label: 'Last 30 days',
        getValue: () => ({
            from: addDays(new Date(), -29),
            to: new Date()
        })
    },
    {
        label: 'This week',
        getValue: () => ({
            from: startOfWeek(new Date()),
            to: endOfWeek(new Date())
        })
    },
    {
        label: 'This month',
        getValue: () => ({
            from: startOfMonth(new Date()),
            to: new Date()
        })
    }
];

export function DateRangePicker() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    });

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="grid gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 size-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "MMM d, yyyy")} -{" "}
                                    {format(date.to, "MMM d, yyyy")}
                                </>
                            ) : (
                                format(date.from, "MMM d, yyyy")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="border-b p-3">
                        <div className="space-y-2">
                            {presets.map((preset) => (
                                <Button
                                    key={preset.label}
                                    variant="ghost"
                                    className="w-full justify-start font-normal"
                                    onClick={() => {
                                        setDate(preset.getValue());
                                        setIsOpen(false);
                                    }}
                                >
                                    {preset.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(newDate) => {
                            setDate(newDate);
                            if (newDate?.from && newDate?.to) {
                                setIsOpen(false);
                            }
                        }}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
} 