import {
  createRoomRepository,
  getRoomsRepository,
} from "@/features/rooms/roomRepository";

import {
  createRoomSchema,
  type CreateRoomInput,
} from "@/features/rooms/roomValidation";

export async function createRoomService(
  input: CreateRoomInput
) {
  const validatedData = createRoomSchema.parse(input);

  const room = await createRoomRepository(
    validatedData
  );

  return room;
}

export async function getRoomsService() {
  return getRoomsRepository();
}