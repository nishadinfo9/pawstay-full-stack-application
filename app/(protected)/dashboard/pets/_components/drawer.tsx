'use client'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import PetForm from "./pet-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PetDrawer = () => {

    const [open, setOpen] = useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
            <DrawerTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Pet
                </Button>
            </DrawerTrigger>

            <DrawerContent className="h-screen w-[400px] sm:max-w-[400px]">

                <DrawerHeader className="shrink-0 border-b">
                    <DrawerTitle className='py-2'>Add New Pet</DrawerTitle>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                    <PetForm />
                </div>

            </DrawerContent>
        </Drawer>
    )
}

export default PetDrawer