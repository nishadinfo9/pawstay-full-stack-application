import {
  Controller,
  type Control,
  type FieldPath,
} from "react-hook-form";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import type { PetFormValues } from "@/features/pets/petValidation";

type InputFieldProps = {
  control: Control<PetFormValues>;
  label: string;
  name: FieldPath<PetFormValues>;
  placeholder?: string;
  type?: string;
};

function InputField({
  control,
  label,
  name,
  placeholder,
  type = "text",
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>
            {label}
          </FieldLabel>

          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            onChange={(event) => {
              const value = event.target.value;

              field.onChange(
                type === "number"
                  ? value === ""
                    ? undefined
                    : Number(value)
                  : value
              );
            }}
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}

export default InputField;