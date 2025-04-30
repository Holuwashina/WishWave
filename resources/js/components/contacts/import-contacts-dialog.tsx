import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImportContactsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImport: (file: File, groupId: string) => void;
    groups: Array<{ id: string; name: string }>;
}

export function ImportContactsDialog({ open, onOpenChange, onImport, groups }: ImportContactsDialogProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile && selectedGroup) {
            onImport(selectedFile, selectedGroup);
            setSelectedFile(null);
            setSelectedGroup('');
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Import Contacts</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Import contacts from a CSV or Excel file. Make sure your file has the following columns: Name, Phone Number, Email (optional).
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Select Group</Label>
                            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                                <SelectTrigger className="text-sm">
                                    <SelectValue placeholder="Choose a group" />
                                </SelectTrigger>
                                <SelectContent>
                                    {groups.map((group) => (
                                        <SelectItem key={group.id} value={group.id} className="text-sm">
                                            {group.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Upload File</Label>
                            <div className="relative flex flex-col items-center gap-3 rounded-lg border border-dashed p-4 sm:gap-4 sm:p-6">
                                <Upload className="size-6 text-muted-foreground sm:size-8" />
                                <div className="text-center">
                                    <p className="text-sm font-medium">
                                        {selectedFile ? selectedFile.name : 'Drop your file here or click to browse'}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Supports CSV and Excel files
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-6 flex-col gap-2 sm:flex-row sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={!selectedFile || !selectedGroup}
                            className="w-full sm:w-auto"
                        >
                            Import Contacts
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 