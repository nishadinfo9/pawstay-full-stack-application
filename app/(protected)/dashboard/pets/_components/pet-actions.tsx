"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Pet } from "@/features/pets/petTypes";
import PetDetailsDialog from "./pet-details-dialog";

interface PetActionsProps {
  pet: Pet;
}

const PetActions = ({ pet }: PetActionsProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
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
            onClick={() => setDetailsOpen(true)}
          >
            <Eye className="h-4 w-4" />
            View details
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Pencil className="h-4 w-4" />
            Update Pet
          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete Pet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PetDetailsDialog
        pet={pet}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};

export default PetActions;