import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Calendar, ChevronDown, Filter, MoreVertical, Search, Trash2, RefreshCw } from 'lucide-react';
import { type Message } from '@/components/messages/message-item';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const breadcrumbs = [
    {
        title: 'Messages',
        href: '/messages',
    },
];

interface Props {
    messages: Message[];
}

export default function Messages({ messages }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedGroup, setSelectedGroup] = useState<string>('all');
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="container mx-auto space-y-4 p-4 sm:space-y-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Messages</h2>
                        <p className="text-muted-foreground">View and manage all your messages</p>
                    </div>
                </div>

                <Card className="p-6">
                    {/* Advanced Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Search messages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon">
                                    <Filter className="size-4" />
                                </Button>
                                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Time Range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Time</SelectItem>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="yesterday">Yesterday</SelectItem>
                                        <SelectItem value="last7">Last 7 Days</SelectItem>
                                        <SelectItem value="last30">Last 30 Days</SelectItem>
                                        <SelectItem value="thisMonth">This Month</SelectItem>
                                        <SelectItem value="lastMonth">Last Month</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Message Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="birthday">Birthday</SelectItem>
                                    <SelectItem value="new_month">New Month</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="sent">Sent</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Groups</SelectItem>
                                    <SelectItem value="church">Church Members</SelectItem>
                                    <SelectItem value="youth">Youth Group</SelectItem>
                                    <SelectItem value="choir">Choir</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "flex size-10 items-center justify-center rounded-full",
                                        message.type === 'birthday' && "bg-green-500/10",
                                        message.type === 'new_month' && "bg-blue-500/10",
                                        message.type === 'custom' && "bg-purple-500/10"
                                    )}>
                                        <Calendar className={cn(
                                            "size-5",
                                            message.type === 'birthday' && "text-green-600",
                                            message.type === 'new_month' && "text-blue-600",
                                            message.type === 'custom' && "text-purple-600"
                                        )} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{message.title}</p>
                                        <p className="text-sm text-gray-500">Sent to {message.recipients} contacts</p>
                                    </div>
                                </div>
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <MoreVertical className="size-4" />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[160px]">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/messages/${message.id}`} className="flex items-center">
                                                    <Calendar className="mr-2 size-4" />
                                                    View Details
                                                </Link>
                                            </DropdownMenuItem>
                                            {message.status === 'failed' && (
                                                <DropdownMenuItem>
                                                    <RefreshCw className="mr-2 size-4" />
                                                    Resend Message
                                                </DropdownMenuItem>
                                            )}
                                            {(message.status === 'failed' || message.status === 'scheduled') && (
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 size-4" />
                                                    Delete Message
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
} 