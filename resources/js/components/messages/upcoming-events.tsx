import { Calendar, Gift, Star, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export interface UpcomingEvent {
    id: string;
    type: 'birthday' | 'new_month' | 'custom';
    title: string;
    description: string;
}

interface UpcomingEventsProps {
    events: UpcomingEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
    const getIcon = (type: UpcomingEvent['type']) => {
        switch (type) {
            case 'birthday':
                return <Gift className="size-4" />;
            case 'new_month':
                return <Calendar className="size-4" />;
            default:
                return <Star className="size-4" />;
        }
    };

    return (
        <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/schedule" className="flex items-center gap-1">
                        View All
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>
            <div className="space-y-4">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/schedule/${event.id}`}
                        className="group block"
                    >
                        <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted">
                            <div className="flex items-center gap-4">
                                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    {getIcon(event.type)}
                                </div>
                                <div>
                                    <p className="font-medium">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">{event.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
} 