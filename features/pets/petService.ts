import {
  createPetRepository,
  findPetByIdRepository,
  findPetsByUserIdRepository,
} from "./petRepository";

import type {
  CreatePetRepositoryInput,
} from "./petTypes";

export async function createPetService(
  data: CreatePetRepositoryInput
) {
  // Business logic can live here

  return createPetRepository(data);
}

export async function getMyPetsService(userId: string) {
  return findPetsByUserIdRepository(userId);
}

export async function getPetService(
  petId: string,
  userId: string
) {
  const pet = await findPetByIdRepository(petId);

  if (!pet) {
    throw new Error("Pet not found");
  }

  // Authorization/business rule
  if (pet.user_id !== userId) {
    throw new Error("Forbidden");
  }

  return pet;
}