import { Button } from '@/components/ui/button';
import { Calendar, Plus, Search, MessageSquare, Mail, Phone } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UpcomingEvents, type UpcomingEvent } from '@/components/messages/upcoming-events';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs = [
    {
        title: 'Schedule',
        href: '/schedule',
    },
];

// Sample data - replace with real data fetching
const upcomingEvents: UpcomingEvent[] = [
    {
        id: '1',
        type: 'birthday',
        title: '5 Birthdays Tomorrow',
        description: 'Messages scheduled'
    },
    {
        id: '2',
        type: 'new_month',
        title: 'New Month Messages',
        description: 'Starts in 3 days'
    }
];

// Sample data for dropdowns
const groups = [
    { id: 1, name: 'Marketing Team', count: 12 },
    { id: 2, name: 'Sales Team', count: 8 },
    { id: 3, name: 'Support Team', count: 15 },
];

const templates = [
    { id: 1, name: 'Welcome Message', content: 'Welcome to our team!' },
    { id: 2, name: 'Meeting Reminder', content: 'Don\'t forget about our meeting.' },
    { id: 3, name: 'Follow-up', content: 'Thank you for your time.' },
];

const scheduledMessages = [
    {
        id: 1,
        title: 'Weekly Update',
        group: 'Marketing Team',
        template: 'Meeting Reminder',
        scheduledFor: new Date('2024-03-20T10:00:00'),
        status: 'sent',
        type: 'regular',
        sentAt: new Date('2024-03-20T10:00:00')
    },
    {
        id: 2,
        title: 'Sales Report',
        group: 'Sales Team',
        template: 'Follow-up',
        scheduledFor: new Date('2024-03-21T15:30:00'),
        status: 'incoming',
        type: 'regular'
    },
    {
        id: 3,
        title: 'Birthday Wishes',
        group: 'All Staff',
        template: 'Birthday Template',
        scheduledFor: new Date('2024-03-22T09:00:00'),
        status: 'incoming',
        type: 'birthday'
    },
    {
        id: 4,
        title: 'New Month Message',
        group: 'All Groups',
        template: 'Monthly Template',
        scheduledFor: new Date('2024-04-01T00:00:00'),
        status: 'incoming',
        type: 'new_month'
    }
];

// Custom badge variants for different message types
const getTypeBadgeVariant = (type: string) => {
    switch (type) {
        case 'birthday':
            return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
        case 'new_month':
            return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        default:
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
};

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case 'sent':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'incoming':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
};

// Platform options with their icons and colors
const platforms = [
    { 
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: MessageSquare,
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        description: 'Send via WhatsApp'
    },
    { 
        id: 'sms',
        name: 'SMS',
        icon: Phone,
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        description: 'Send via SMS'
    },
    { 
        id: 'email',
        name: 'Email',
        icon: Mail,
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        description: 'Send via Email'
    }
];

export default function Schedule() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterGroup, setFilterGroup] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredMessages = scheduledMessages.filter(message => {
        const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            message.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            message.template.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || message.type === filterType;
        const matchesGroup = filterGroup === 'all' || message.group === filterGroup;
        const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
        return matchesSearch && matchesType && matchesGroup && matchesStatus;
    });

    const handleSchedule = () => {
        // Handle schedule creation
        console.log({
            title,
            group: selectedGroup,
            template: selectedTemplate,
            scheduledFor: selectedDate,
            platforms: selectedPlatforms
        });
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setSelectedGroup('');
        setSelectedTemplate('');
        setSelectedDate(new Date());
        setSelectedPlatforms([]);
    };

    const togglePlatform = (platformId: string) => {
        setSelectedPlatforms(prev => 
            prev.includes(platformId)
                ? prev.filter(p => p !== platformId)
                : [...prev, platformId]
        );
    };

    const handleSelectAllPlatforms = (checked: boolean) => {
        setSelectedPlatforms(checked ? platforms.map(p => p.id) : []);
    };

    const areAllPlatformsSelected = selectedPlatforms.length === platforms.length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule" />
            <div className="container mx-auto space-y-4 p-2 sm:space-y-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Schedule</h2>
                        <p className="text-sm text-muted-foreground sm:text-base">Manage scheduled messages and events</p>
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">
                                <Plus className="mr-2 size-4" />
                                Schedule Message
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Schedule New Message</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                    Create a new scheduled message for your contacts.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Message Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter message title"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Select Platforms</Label>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="select-all"
                                                checked={areAllPlatformsSelected}
                                                onCheckedChange={handleSelectAllPlatforms}
                                            />
                                            <label
                                                htmlFor="select-all"
                                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Select All
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {platforms.map((platform) => {
                                            const isSelected = selectedPlatforms.includes(platform.id);
                                            const Icon = platform.icon;
                                            return (
                                                <Button
                                                    key={platform.id}
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "flex h-auto flex-col items-center justify-center gap-2 p-3",
                                                        isSelected && platform.color,
                                                        isSelected && "border-2"
                                                    )}
                                                    onClick={() => togglePlatform(platform.id)}
                                                >
                                                    <Icon className="size-5" />
                                                    <span className="text-xs">{platform.name}</span>
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="group">Select Group</Label>
                                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                                        <SelectTrigger id="group">
                                            <SelectValue placeholder="Select a group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {groups.map((group) => (
                                                <SelectItem key={group.id} value={group.id.toString()}>
                                                    {group.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="template">Select Template</Label>
                                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                        <SelectTrigger id="template">
                                            <SelectValue placeholder="Select a template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {templates.map((template) => (
                                                <SelectItem key={template.id} value={template.id.toString()}>
                                                    {template.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Schedule Date & Time</Label>
                                    <DateTimePicker date={selectedDate} setDate={setSelectedDate} />
                                </div>
                            </div>

                            <DialogFooter className="mt-6 flex-col gap-2 sm:flex-row sm:gap-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    onClick={handleSchedule}
                                    disabled={!title || !selectedGroup || !selectedTemplate || selectedPlatforms.length === 0}
                                    className="w-full sm:w-auto"
                                >
                                    Schedule Message
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <div className="grid gap-4 md:grid-cols-5">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search schedules..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Messages</SelectItem>
                            <SelectItem value="incoming">Incoming</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="regular">Regular Messages</SelectItem>
                            <SelectItem value="birthday">Birthday Messages</SelectItem>
                            <SelectItem value="new_month">New Month Messages</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterGroup} onValueChange={setFilterGroup}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by group" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Groups</SelectItem>
                            {groups.map(group => (
                                <SelectItem key={group.id} value={group.name}>
                                    {group.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Scheduled Messages */}
                <div className="grid gap-4">
                    {filteredMessages.map((message) => (
                        <Card key={message.id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">{message.title}</h3>
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getTypeBadgeVariant(message.type)}`}>
                                            {message.type}
                                        </span>
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadgeVariant(message.status)}`}>
                                            {message.status}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-sm text-muted-foreground">
                                        <p>{message.group} - {message.template}</p>
                                        <p>
                                            {message.status === 'sent' 
                                                ? `Sent at ${message.sentAt?.toLocaleString()}` 
                                                : `Scheduled for ${message.scheduledFor.toLocaleString()}`
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {message.status === 'incoming' && (
                                        <Button variant="outline" size="sm">
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
} 