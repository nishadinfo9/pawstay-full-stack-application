export interface CreatePetInput {
  petName: string;
  type: string;
  breed: string;
  age: number;
  gender: string;
  image?: string;
  notes?: string;
}

export interface CreatePetRepositoryInput {
  userId: string;
  petName: string;
  type: string;
  breed: string;
  age: number;
  gender: string;
  image?: string;
  notes?: string;
}

export interface Pet {
  id: string;
  petName: string;
  type: string;
  breed: string;
  age: number;
  gender: string;
  image?: string | null;
  notes?: string | null;
};