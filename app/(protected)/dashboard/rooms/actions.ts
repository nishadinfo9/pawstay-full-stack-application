"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { createRoomService } from "@/features/rooms/roomService";
import { createRoomSchema } from "@/features/rooms/roomValidation";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(
  formData: FormData
) {
  const session = await getServerSession(authOptions)
  if (!session?.user.id) throw new Error("Unauthorized");


  const rawData = {
    roomName: formData.get("roomName"),
    type: formData.get("type"),
    price: formData.get("price"),
    isAvailable: formData.get("isAvailable"),
  };

  const result = createRoomSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await createRoomService(result.data);

}