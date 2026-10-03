import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pet } from "@/features/pets/petTypes";
import PetActions from "./pet-actions";

interface PetListProps {
  pets: Pet[];
}

const PetList = ({ pets }: PetListProps) => {
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
            <TableHead className="w-[60px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>
                  <img
                    src={pet.image || ""}
                    alt={pet.petName}
                    className="h-8 w-8 rounded-md"
                  />
                </TableCell>

                <TableCell className="font-medium">
                  {pet.petName}
                </TableCell>

                <TableCell>{pet.type}</TableCell>

                <TableCell>{pet.breed}</TableCell>

                <TableCell>
                  {pet.age} {pet.age === 1 ? "year" : "years"}
                </TableCell>

                <TableCell>{pet.gender}</TableCell>

                <TableCell>{pet.owner}</TableCell>

                <TableCell>
                  <PetActions pet={pet} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-32 text-center text-muted-foreground"
              >
                No pets found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PetList;