import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MessageSquare, Send, Users, PencilIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbs = [
    {
        title: 'Messages',
        href: '/messages',
    },
    {
        title: 'Message Details',
        href: '#',
    },
];

// Sample data - replace with real data
const message = {
    id: '1',
    type: 'birthday',
    title: 'Birthday Wishes',
    content: 'Happy birthday! May God bless you with joy, peace, and prosperity on your special day. 🎉🙏',
    recipients: 24,
    status: 'sent',
    timestamp: '2 hours ago',
    group: 'Church Members',
};

const contacts = [
    { id: '1', name: 'John Doe', phone: '+1234567890', status: 'delivered' },
    { id: '2', name: 'Jane Smith', phone: '+1234567891', status: 'failed' },
    // Add more contacts
];

export default function MessageDetails() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Message Details" />
            <div className="container mx-auto space-y-6 p-4 sm:p-8">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{message.title}</h2>
                        <p className="text-muted-foreground">Sent {message.timestamp} to {message.group}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select defaultValue="same">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="same">[{message.group}]</SelectItem>
                                <SelectItem value="all">All Contacts</SelectItem>
                                <SelectItem value="church">Church Members</SelectItem>
                                <SelectItem value="youth">Youth Group</SelectItem>
                                <SelectItem value="choir">Choir</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Send className="mr-2 size-4" />
                            Resend Message
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-12">
                    {/* Message Content */}
                    <div className="rounded-lg border bg-card p-6 md:col-span-7">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Message Content</h3>
                            <div className={cn(
                                "rounded-full px-2 py-1 text-xs",
                                message.status === 'sent' && "bg-green-500/10 text-green-600",
                                message.status === 'scheduled' && "bg-blue-500/10 text-blue-600",
                                message.status === 'failed' && "bg-red-500/10 text-red-600"
                            )}>
                                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                            </div>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                <span>{message.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="size-4" />
                                <span>{message.recipients} recipients</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageSquare className="size-4" />
                                <span>{message.type}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recipients Stats */}
                    <div className="rounded-lg border bg-card p-6 md:col-span-5">
                        <h3 className="mb-6 text-lg font-semibold">Delivery Status</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10">
                                    <span className="text-2xl font-semibold text-green-600">
                                        {contacts.filter(c => c.status === 'delivered').length}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground">Delivered</span>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
                                    <span className="text-2xl font-semibold text-red-600">
                                        {contacts.filter(c => c.status === 'failed').length}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground">Failed</span>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-500/10">
                                    <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                                        {contacts.length}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground">Total</span>
                            </div>
                        </div>
                    </div>

                    {/* Recipients List */}
                    <div className="rounded-lg border bg-card p-6 md:col-span-12">
                        <h3 className="mb-4 text-lg font-semibold">Recipients</h3>
                        <div className="divide-y">
                            {contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex items-center justify-between py-3"
                                >
                                    <div>
                                        <p className="font-medium">{contact.name}</p>
                                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "rounded-full px-2 py-1 text-xs",
                                            contact.status === 'delivered' && "bg-green-500/10 text-green-600",
                                            contact.status === 'failed' && "bg-red-500/10 text-red-600"
                                        )}>
                                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                        </span>
                                        {contact.status === 'failed' && (
                                            <>
                                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                                    <Send className="mr-1 size-3" />
                                                    Resend
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                                                    <Link href={`/contacts/${contact.id}/edit`}>
                                                        <PencilIcon className="mr-1 size-3" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 