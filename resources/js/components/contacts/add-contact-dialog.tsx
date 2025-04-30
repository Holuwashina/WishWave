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
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface AddContactDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (contact: { name: string; phone: string; email: string; groupId: string }) => void;
    groups: Array<{ id: string; name: string }>;
}

export function AddContactDialog({ open, onOpenChange, onSubmit, groups }: AddContactDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        groupId: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', phone: '', email: '', groupId: '' });
        onOpenChange(false);
    };

    const isValid = formData.name.trim() && formData.phone.trim() && formData.groupId;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Add New Contact</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Add a new contact to your address book.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter full name"
                                className="text-sm"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone" className="text-sm font-medium">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Enter phone number"
                                className="text-sm"
                                type="tel"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address (Optional)
                            </Label>
                            <Input
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter email address"
                                className="text-sm"
                                type="email"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Select Group</Label>
                            <Select value={formData.groupId} onValueChange={(value) => setFormData({ ...formData, groupId: value })}>
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
                            disabled={!isValid}
                            className="w-full sm:w-auto"
                        >
                            Add Contact
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 