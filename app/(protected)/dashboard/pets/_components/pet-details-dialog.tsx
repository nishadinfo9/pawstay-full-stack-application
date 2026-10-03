"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Pet } from "@/features/pets/petTypes";

interface PetDetailsDialogProps {
    pet: Pet | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PetDetailsDialog({
    pet,
    open,
    onOpenChange,
}: PetDetailsDialogProps) {
    if (!pet) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Pet Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Pet Header */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-xl font-semibold">
                            <img src={pet.image || ''} alt={pet.petName} className="h-16 w-16 rounded-full"/>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                {pet.petName}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {pet.type} · {pet.breed}
                            </p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem
                            label="Pet Name"
                            value={pet.petName}
                        />

                        <DetailItem
                            label="Type"
                            value={pet.type}
                        />

                        <DetailItem
                            label="Breed"
                            value={pet.breed}
                        />

                        <DetailItem
                            label="Age"
                            value={`${pet.age} years`}
                        />

                        <DetailItem
                            label="Gender"
                            value={pet.gender}
                        />
                    </div>

                    {/* Notes */}
                    {pet.notes && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                Notes
                            </p>

                            <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                                {pet.notes}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
                {label}
            </p>

            <p className="text-sm font-medium">
                {value}
            </p>
        </div>
    );
}