import db from "@/lib/db";
import { rooms } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { CreateRoomInput } from "./roomValidation";

export async function createRoomRepository(
  data: CreateRoomInput
) {
  const [room] = await db
    .insert(rooms)
    .values({
      roomName: data.roomName,
      type: data.type,
      price: data.price,
      is_available: data.isAvailable,
    })
    .returning();

  return room;
}

export async function getRoomsRepository() {
  return db
    .select()
    .from(rooms)
    .limit(10)
    .orderBy(desc(rooms.createdAt));
}