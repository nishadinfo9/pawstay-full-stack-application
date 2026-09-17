'use client'

import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { signupValidationSchema } from "./signupValidation"
import { useAuth, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { signUp, errors, fetchStatus } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signupValidationSchema>) {
    const { error } = await signUp.password({
      emailAddress: data.email,
      password: data.password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    // Send verification email
    if (!error) {
      await signUp.verifications.sendEmailCode();
    }
  };

  const handleVerify = async (formData: FormData) => {
    const code = formData.get('code') as string

    await signUp.verifications.verifyEmailCode({
      code,
    })

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl('/');
          if (url.startsWith('http')) {
            // Only use window.location on web platform
            if (url.startsWith('http')) {
              window.location.href = url
            } else {
              router.push(url)
            }
          } else {
            console.error('Sign-up attempt not complete:', signUp)
            router.replace(url);
          }
        },
      });
    } else {
      console.error('Sign-up attempt not complete:', signUp);
    }
  };

  // Don't show anything if already signed in or sign-up is complete
  if (signUp.status === 'complete' || isSignedIn) return null;



  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
      <>
        <h1>Verify your account</h1>
        <form action={handleVerify}>
          <div>
            <label htmlFor="code">Code</label>
            <input id="code" name="code" type="text" />
          </div>
          {errors.fields.code && <p>{errors.fields.code.message}</p>}
          <button type="submit" disabled={fetchStatus === 'fetching'}>
            Verify
          </button>
        </form>
        <button onClick={() => signUp.verifications.sendEmailCode()}>I need a new code</button>
      </>
    )
  }

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input {...field} id="name" type="text" placeholder="John Doe" required />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input {...field} id="email" type="email" placeholder="m@example.com" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input {...field} id="password" type="password" placeholder="••••••••" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button variant="outline" type="button" form="signup-form">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
