import { MessageSquare, Send, Trash2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export interface Message {
    id: string;
    type: 'birthday' | 'new_month' | 'custom';
    title: string;
    recipients: number;
    status: 'sent' | 'scheduled' | 'failed';
    timestamp: string;
}

export function MessageItem({ message }: { message: Message }) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
            <Link href={`/messages/${message.id}`} className="flex items-center gap-4 flex-grow">
                <div className={cn(
                    "flex size-10 items-center justify-center rounded-full",
                    message.type === 'birthday' && "bg-green-500/10",
                    message.type === 'new_month' && "bg-blue-500/10",
                    message.type === 'custom' && "bg-purple-500/10"
                )}>
                    <MessageSquare className={cn(
                        "size-5",
                        message.type === 'birthday' && "text-green-600",
                        message.type === 'new_month' && "text-blue-600",
                        message.type === 'custom' && "text-purple-600"
                    )} />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium">{message.title}</p>
                        <ExternalLink className="size-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">Sent to {message.recipients} contacts</p>
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <span className={cn(
                    "rounded-full px-2 py-1 text-xs",
                    message.status === 'sent' && "bg-green-500/10 text-green-600",
                    message.status === 'scheduled' && "bg-blue-500/10 text-blue-600",
                    message.status === 'failed' && "bg-red-500/10 text-red-600"
                )}>
                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{message.timestamp}</span>
                <div className="flex items-center gap-2">
                    <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Send className="size-4 text-gray-500" />
                    </button>
                    <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Trash2 className="size-4 text-gray-500" />
                    </button>
                </div>
            </div>
        </div>
    );
} 