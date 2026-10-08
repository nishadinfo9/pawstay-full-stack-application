"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createPetAction } from "../../actions";
import { PetFormValues, petSchema } from "@/features/pets/petValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function PetForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors } } = useForm<PetFormValues>({
      resolver: zodResolver(petSchema),

      defaultValues: {
        petName: "",
        type: "",
        breed: "",
        age: undefined,
        gender: undefined,
        image: "",
        notes: "",
      },
    });

  const { mutate, isPending } = useMutation({
    mutationFn: createPetAction,

    onSuccess: (data) => {
      if (data.success) {
        reset();
      }
    },
  });

  const onSubmit = (data: PetFormValues) => {
    console.log("SUBMIT:", data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        formData.append(key, String(value));
      }
    });

    mutate(formData);
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS:", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-5"
    >
      <FieldSet>
        <FieldGroup>

          {/* Pet Name */}
          <InputField
            control={control}
            label="Pet Name"
            name="petName"
            placeholder="Buddy"
          />

          <InputField
            control={control}
            label="Type"
            name="type"
            placeholder="Dog / Cat"
          />

          <InputField
            control={control}
            label="Breed"
            name="breed"
            placeholder="Golden Retriever"
          />

          <InputField
            control={control}
            label="Age"
            name="age"
            type="number"
            placeholder="3"
          />

          {/* Gender */}
          <SelectField
            control={control}
            label="Gender"
            name="gender"
            placeholder="Select gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" }
            ]}
          />

          {/* Image */}
          <Field>
            <FieldLabel htmlFor="image">
              Pet Image
            </FieldLabel>

            <Input
              id="image"
              type="url"
              placeholder="https://example.com/pet.jpg"
              {...register("image")}
              aria-invalid={
                !!errors.image
              }
            />

            {errors.image && (
              <FieldError>
                {errors.image.message}
              </FieldError>
            )}
          </Field>

          {/* Notes */}
          <Field>
            <FieldLabel htmlFor="notes">
              Notes
            </FieldLabel>

            <Textarea
              id="notes"
              placeholder="Tell us anything important..."
              {...register("notes")}
              aria-invalid={
                !!errors.notes
              }
            />

            {errors.notes && (
              <FieldError>
                {errors.notes.message}
              </FieldError>
            )}
          </Field>

        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Adding Pet..." : "Add Pet"}
      </Button>
    </form>
  );
}