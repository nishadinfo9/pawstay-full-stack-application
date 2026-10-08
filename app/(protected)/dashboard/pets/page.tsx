import PetList from "./_components/petList";
import PetDrawer from "./_components/drawer";
import { getMyPetAction } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Pets = async () => {
    const session = await getServerSession(authOptions)
    if (session?.user.role !== 'admin') {
        redirect('/unauthorized')
    }

    const pets = await getMyPetAction();

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Pets
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage all registered pets.
                    </p>
                </div>

                <PetDrawer />
            </div>

            {/* Pets Table */}
            <PetList pets={pets} />
        </div>
    );
};

export default Pets;