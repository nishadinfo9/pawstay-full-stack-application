"use client";

import { createPetAction } from "../actions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PetForm() {
    return (
        <form action={createPetAction} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="petName">Pet Name</Label>

                <Input
                    id="petName"
                    name="petName"
                    placeholder="Buddy"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>

                <Input
                    id="type"
                    name="type"
                    placeholder="Dog / Cat"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>

                <Input
                    id="breed"
                    name="breed"
                    placeholder="Golden Retriever"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="age">Age</Label>

                <Input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    placeholder="3"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>

                <Select name="gender" required>
                    <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            {/* Image */}
            <div className="space-y-2">
                <Label htmlFor="image">Pet Image</Label>
                <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/pet.jpg"
                />
                <p className="text-xs text-muted-foreground">
                    Add an image URL for your pet.
                </p>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Tell us anything important about your pet..."

                />
            </div>

            <Button type="submit" className="w-full">
                Add Pet
            </Button>
        </form>
    );
}

