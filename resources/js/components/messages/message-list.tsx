import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarPlus } from 'lucide-react';
import { type Message, MessageItem } from './message-item';
import { Link } from '@inertiajs/react';

interface MessageListProps {
    messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
    return (
        <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Recent Messages</h3>
                    <p className="text-sm text-gray-500">Manage and track your sent messages</p>
                </div>
                <Button asChild>
                    <Link href="/schedule" className="flex items-center gap-2">
                        <CalendarPlus className="size-4" />
                        New Schedule
                    </Link>
                </Button>
            </div>
            <div className="space-y-4">
                {messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
            </div>
        </Card>
    );
} 