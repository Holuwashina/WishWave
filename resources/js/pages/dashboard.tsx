import { type Message } from '@/components/messages/message-item';
import { MessageList } from '@/components/messages/message-list';
import { UpcomingEvents, type UpcomingEvent } from '@/components/messages/upcoming-events';
import { StatsCard } from '@/components/stats/stats-card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CalendarDays, FileText, Import, MessageSquare, Phone, Settings, Users } from 'lucide-react';
import { RecentGroups } from '@/components/contacts/recent-groups';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Sample data
const recentMessages: Message[] = [
    {
        id: '1',
        type: 'birthday',
        title: 'Birthday Wishes',
        recipients: 24,
        status: 'sent',
        timestamp: '2 hours ago',
    },
    {
        id: '2',
        type: 'new_month',
        title: 'March Blessings',
        recipients: 156,
        status: 'scheduled',
        timestamp: 'Scheduled for Mar 1',
    },
    {
        id: '3',
        type: 'custom',
        title: 'Prayer Meeting Reminder',
        recipients: 85,
        status: 'sent',
        timestamp: 'Yesterday',
    },
];

const upcomingEvents: UpcomingEvent[] = [
    {
        id: '1',
        type: 'birthday' as const,
        title: '5 Birthdays Tomorrow',
        description: 'Messages scheduled',
    },
    {
        id: '2',
        type: 'new_month' as const,
        title: 'New Month Messages',
        description: 'Starts in 3 days',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="container mx-auto space-y-4 p-4 sm:space-y-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h2>
                        <p className="text-muted-foreground">Manage your messages and contacts</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Import className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Import Contacts</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <FileText className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Create Template</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Phone className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Change Sender Number</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Settings className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <StatsCard title="Total Contacts" value="2,543" icon={Users} description="Across all groups" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <StatsCard title="Messages Sent" value="12,875" icon={MessageSquare} description="Last 30 days" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <StatsCard title="Upcoming Birthdays" value="8" icon={CalendarDays} description="Next 7 days" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <StatsCard title="Active Templates" value="15" icon={MessageSquare} description="Ready to use" />
                    </motion.div>
                </div>

                {/* Recent Activity */}
                <div>
                    <MessageList messages={recentMessages} />
                </div>

                {/* Groups and Events */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <RecentGroups />
                    </div>
                    <div className="md:col-span-1">
                        <UpcomingEvents events={upcomingEvents} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
