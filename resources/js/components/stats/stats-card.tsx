import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    description: string;
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
    return (
        <Card className="p-6">
            <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-fuchsia-600/10">
                    <Icon className="size-6 text-indigo-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
                    <h4 className="text-2xl font-semibold">{value}</h4>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>
        </Card>
    );
} 