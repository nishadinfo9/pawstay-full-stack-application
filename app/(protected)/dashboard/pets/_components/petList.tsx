'use client'

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pet } from "@/features/pets/petTypes";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import PetDetailsDialog from "./pet-details-dialog";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PetListProps {
  pets: Pet[];
}

const PetList = ({ pets }: PetListProps) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="w-[60px]" >Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <TableRow key={pet.id}>

                <TableCell className="font-medium">
                  <img
                    src={pet.image || ''}
                    alt={pet.petName}
                    className="w-8 h-8 rounded-md"
                  />
                </TableCell>

                <TableCell className="font-medium">
                  {pet.petName}
                </TableCell>

                <TableCell>{pet.type}</TableCell>

                <TableCell>{pet.breed}</TableCell>

                <TableCell>
                  {pet.age}{" "}
                  {pet.age === 1 ? "year" : "years"}
                </TableCell>

                <TableCell>{pet.gender}</TableCell>

                <TableCell>{pet.owner}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                   <DropdownMenuContent align="end">
  <DropdownMenuItem
    onClick={() => {
      setSelectedPet(pet);
    }}
  >
    <Eye className="h-4 w-4" />
    View details
  </DropdownMenuItem>

  <DropdownMenuItem>
    <Pencil className="h-4 w-4" />
    Update Pet
  </DropdownMenuItem>

  <DropdownMenuItem className="text-destructive focus:text-destructive">
    <Trash2 className="h-4 w-4" />
    Delete Pet
  </DropdownMenuItem>
</DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>


              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                No pets found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PetDetailsDialog
        pet={selectedPet}
        open={!!selectedPet}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPet(null);
          }
        }}
      />
    </div>
  )
}

export default PetList