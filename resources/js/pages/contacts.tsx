import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Filter, Plus, Search, Upload, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AddGroupDialog } from '@/components/contacts/add-group-dialog';
import { ImportContactsDialog } from '@/components/contacts/import-contacts-dialog';
import { AddContactDialog } from '@/components/contacts/add-contact-dialog';

const breadcrumbs = [
    {
        title: 'Contacts',
        href: '/contacts',
    },
];

// Sample data - replace with real data from backend
const groups = [
    { id: '1', name: 'Church Members', count: 150 },
    { id: '2', name: 'Youth Group', count: 45 },
    { id: '3', name: 'Choir', count: 25 },
];

const contacts = [
    { id: '1', name: 'John Doe', phone: '+1234567890', group: 'Church Members', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', phone: '+1234567891', group: 'Youth Group', email: 'jane@example.com' },
    // Add more contacts
];

// Helper function to get group badge color
const getGroupBadgeColor = (groupName: string) => {
    // Map group names to specific colors, with a default fallback
    const colorMap: Record<string, string> = {
        'Church Members': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'Youth Group': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'Choir': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
        'Prayer Team': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };

    return colorMap[groupName] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
};

export default function Contacts() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<string>('all');
    const [addGroupOpen, setAddGroupOpen] = useState(false);
    const [addContactOpen, setAddContactOpen] = useState(false);
    const [importContactsOpen, setImportContactsOpen] = useState(false);

    const handleAddGroup = (name: string) => {
        // TODO: Implement group creation
        console.log('Creating group:', name);
    };

    const handleAddContact = (contact: { name: string; phone: string; email: string; groupId: string }) => {
        // TODO: Implement contact creation
        console.log('Creating contact:', contact);
    };

    const handleImportContacts = (file: File, groupId: string) => {
        // TODO: Implement contact import
        console.log('Importing contacts:', { file, groupId });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="container mx-auto space-y-4 p-2 sm:space-y-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Contacts</h2>
                        <p className="text-sm text-muted-foreground sm:text-base">Manage your contacts and groups</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Button size="sm" className="flex-1 sm:flex-none" onClick={() => setAddGroupOpen(true)}>
                            <Plus className="mr-2 size-4" />
                            New Group
                        </Button>
                        <Button size="sm" className="flex-1 sm:flex-none" onClick={() => setAddContactOpen(true)}>
                            <UserPlus className="mr-2 size-4" />
                            Add Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none" onClick={() => setImportContactsOpen(true)}>
                            <Upload className="mr-2 size-4" />
                            Import
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="contacts" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="contacts">Contacts</TabsTrigger>
                        <TabsTrigger value="groups">Groups</TabsTrigger>
                    </TabsList>

                    <TabsContent value="contacts" className="space-y-4">
                        <div className="rounded-lg border bg-card">
                            {/* Search and Filters */}
                            <div className="border-b p-3 sm:p-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-500 sm:left-3" />
                                        <Input
                                            type="search"
                                            placeholder="Search contacts..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-8 text-sm sm:pl-10 sm:text-base"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Button variant="outline" size="icon" className="size-8 sm:size-9">
                                            <Filter className="size-4" />
                                        </Button>
                                        <Select value="name" onValueChange={() => {}}>
                                            <SelectTrigger className="w-[140px] sm:w-[180px]">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name">Sort by Name</SelectItem>
                                                <SelectItem value="group">Sort by Group</SelectItem>
                                                <SelectItem value="recent">Recently Added</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Contacts Table with horizontal scroll on mobile */}
                            <div className="overflow-x-auto p-3 sm:p-4">
                                <div className="min-w-[640px] rounded-lg border">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b bg-muted/50">
                                                <th className="p-3 text-left text-sm font-medium sm:p-4">Name</th>
                                                <th className="p-3 text-left text-sm font-medium sm:p-4">Phone</th>
                                                <th className="p-3 text-left text-sm font-medium sm:p-4">Email</th>
                                                <th className="p-3 text-left text-sm font-medium sm:p-4">Group</th>
                                                <th className="p-3 text-left text-sm font-medium sm:p-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {contacts.map((contact) => (
                                                <tr key={contact.id} className="hover:bg-muted/50">
                                                    <td className="p-3 text-sm sm:p-4">{contact.name}</td>
                                                    <td className="p-3 text-sm sm:p-4">{contact.phone}</td>
                                                    <td className="p-3 text-sm sm:p-4">{contact.email}</td>
                                                    <td className="p-3 text-sm sm:p-4">
                                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getGroupBadgeColor(contact.group)}`}>
                                                            {contact.group}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-sm sm:p-4">
                                                        <Button variant="ghost" size="sm">Edit</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="groups" className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {groups.map((group) => (
                                <div
                                    key={group.id}
                                    className="flex items-center justify-between rounded-lg border bg-card p-4"
                                >
                                    <div className="space-y-1">
                                        <h3 className="font-medium">{group.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {group.count} {group.count === 1 ? 'contact' : 'contacts'}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        Manage
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <AddGroupDialog
                open={addGroupOpen}
                onOpenChange={setAddGroupOpen}
                onSubmit={handleAddGroup}
            />

            <AddContactDialog
                open={addContactOpen}
                onOpenChange={setAddContactOpen}
                onSubmit={handleAddContact}
                groups={groups}
            />

            <ImportContactsDialog
                open={importContactsOpen}
                onOpenChange={setImportContactsOpen}
                onImport={handleImportContacts}
                groups={groups}
            />
        </AppLayout>
    );
} 