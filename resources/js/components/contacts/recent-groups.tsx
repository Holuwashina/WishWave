import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ContactGroup {
    id: string;
    name: string;
    memberCount: number;
    lastActivity: string;
}

interface RecentGroupsProps {
    groups?: ContactGroup[];
}

// Sample data - replace with real data fetching
const defaultGroups: ContactGroup[] = [
    {
        id: '1',
        name: 'Church Members',
        memberCount: 156,
        lastActivity: '2 hours ago'
    },
    {
        id: '2',
        name: 'Youth Group',
        memberCount: 45,
        lastActivity: 'Yesterday'
    },
    {
        id: '3',
        name: 'Choir',
        memberCount: 28,
        lastActivity: '3 days ago'
    },
    {
        id: '4',
        name: 'Prayer Team',
        memberCount: 32,
        lastActivity: '1 week ago'
    }
];

export function RecentGroups({ groups = defaultGroups }: RecentGroupsProps) {
    return (
        <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Groups</h3>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/contacts" className="flex items-center gap-1">
                        View All
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {groups.map((group, index) => (
                    <Link
                        key={group.id}
                        href={`/contacts?group=${group.id}`}
                        className="group"
                    >
                        <div className="flex flex-col rounded-lg border p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
                            <div className="flex items-center gap-3">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                                    <Users className="size-4 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate font-medium">{group.name}</p>
                                        <ChevronRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm text-gray-500">
                                            {group.memberCount} members
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {group.lastActivity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
} 