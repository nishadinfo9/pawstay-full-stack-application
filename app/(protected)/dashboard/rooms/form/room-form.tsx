"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { submitForm } from "./demoAction";

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
import { formSchema, FormSchema } from "./validation";

export default function RoomForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitForm,

    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = (data: FormSchema) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("message", data.message);

    mutate(formData);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-96 space-y-4 rounded-lg border p-6 shadow-md"
    >
      <FieldSet>
        <FieldGroup>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
              aria-invalid={!!form.formState.errors.email}
            />

            {form.formState.errors.email && (
              <FieldError>
                {form.formState.errors.email.message}
              </FieldError>
            )}
          </Field>

          {/* Message */}
          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>

            <Textarea
              id="message"
              placeholder="Write your message..."
              {...form.register("message")}
              aria-invalid={!!form.formState.errors.message}
            />

            {form.formState.errors.message && (
              <FieldError>
                {form.formState.errors.message.message}
              </FieldError>
            )}
          </Field>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}