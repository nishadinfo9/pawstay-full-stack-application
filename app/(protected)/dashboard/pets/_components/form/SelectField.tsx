"use client";

import {
  Controller,
  type Control,
  type FieldPathByValue,
} from "react-hook-form";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { PetFormValues } from "@/features/pets/petValidation";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  control: Control<PetFormValues>;
  label: string;
  name: FieldPathByValue<PetFormValues, string | undefined>;
  placeholder?: string;
  options: SelectOption[];
};

const SelectField = ({
  control,
  label,
  name,
  placeholder,
  options,
}: SelectFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={name}>
            {label}
          </FieldLabel>

          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id={name}
              aria-invalid={!!fieldState.error}
              aria-describedby={
                fieldState.error
                  ? `${name}-error`
                  : undefined
              }
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && (
            <FieldError id={`${name}-error`}>
              {fieldState.error.message}
            </FieldError>
          )}
        </Field>
      )}
    />
  );
};

export default SelectField;