import { SignupValidationSchema } from "@/app/(auth)/signup/_components/signupValidation";
import { api } from "./client";

export const registerUser = async (data: SignupValidationSchema) => {
  const response = await api.post('/signup', data);
  return response.data;
};