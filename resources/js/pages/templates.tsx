import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { FileEdit, Plus, Save } from 'lucide-react';
import { useState } from 'react';
import { TemplateEditor } from '@/components/editor/template-editor';

const breadcrumbs = [
    {
        title: 'Templates',
        href: '/templates',
    },
];

// Sample default templates
const defaultTemplates = [
    {
        id: '1',
        name: 'Birthday Wishes',
        content: '<h1>Happy Birthday! 🎉</h1><p>Dear [Name],</p><p>Wishing you a wonderful birthday filled with joy and blessings. May this special day bring you happiness and success in all your endeavors.</p><p>Best wishes,<br>[Your Name]</p>',
    },
    {
        id: '2',
        name: 'New Month Message',
        content: '<h1>Welcome to a New Month! 🌟</h1><p>Dear [Name],</p><p>As we begin this new month, I pray that it brings you renewed strength, fresh opportunities, and abundant blessings. May you experience God\'s grace in everything you do.</p><p>Blessings,<br>[Your Name]</p>',
    },
    {
        id: '3',
        name: 'Prayer Meeting Reminder',
        content: '<h1>Prayer Meeting Reminder 🙏</h1><p>Dear [Name],</p><p>This is a friendly reminder about our prayer meeting scheduled for [Date] at [Time]. Your presence and participation are valuable to our community.</p><p>In Christ,<br>[Your Name]</p>',
    },
];

interface Template {
    id: string;
    name: string;
    content: string;
}

export default function Templates() {
    const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [isNewTemplate, setIsNewTemplate] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [templateContent, setTemplateContent] = useState('');

    const handleSaveTemplate = () => {
        if (editingTemplate) {
            if (isNewTemplate) {
                setTemplates([...templates, editingTemplate]);
            } else {
                setTemplates(templates.map(t => 
                    t.id === editingTemplate.id ? editingTemplate : t
                ));
            }
            setEditingTemplate(null);
            setIsNewTemplate(false);
            setNewTemplateName('');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Message Templates" />
            <div className="container mx-auto space-y-4 p-2 sm:space-y-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Message Templates</h2>
                        <p className="text-sm text-muted-foreground sm:text-base">Create and manage your message templates</p>
                    </div>
                    <Button size="sm" onClick={() => setEditingTemplate({ id: '', name: '', content: '' })}>
                        <Plus className="mr-2 size-4" />
                        New Template
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="flex flex-col rounded-lg border bg-card p-4"
                        >
                            <div className="mb-4 space-y-2">
                                <h3 className="font-medium">{template.name}</h3>
                                <div
                                    className="prose prose-sm line-clamp-3 text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: template.content }}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingTemplate(template)}
                                className="w-fit"
                            >
                                <FileEdit className="mr-2 size-4" />
                                Edit Template
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            {isNewTemplate ? 'Create New Template' : 'Edit Template'}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            {isNewTemplate
                                ? 'Create a new message template.'
                                : 'Make changes to your template.'}
                        </DialogDescription>
                    </DialogHeader>

                    {editingTemplate && (
                        <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Template Name"
                                    value={isNewTemplate ? newTemplateName : editingTemplate.name}
                                    onChange={(e) => {
                                        if (isNewTemplate) {
                                            setNewTemplateName(e.target.value);
                                        } else {
                                            setEditingTemplate({
                                                ...editingTemplate,
                                                name: e.target.value,
                                            });
                                        }
                                    }}
                                    className="text-lg font-medium"
                                />
                            </div>

                            <TemplateEditor
                                value={templateContent}
                                onChange={setTemplateContent}
                            />
                        </div>
                    )}

                    <DialogFooter className="mt-6 flex-col gap-2 sm:flex-row sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setEditingTemplate(null);
                                setIsNewTemplate(false);
                                setNewTemplateName('');
                            }}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            onClick={handleSaveTemplate}
                            disabled={isNewTemplate && !newTemplateName.trim()}
                            className="w-full sm:w-auto"
                        >
                            <Save className="mr-2 size-4" />
                            Save Template
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
} 