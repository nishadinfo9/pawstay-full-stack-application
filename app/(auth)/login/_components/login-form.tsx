'use client'

import { cn } from "cn"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/toast"

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
import { loginValidationSchema } from "./login-validation"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn, errors, fetchStatus } = useSignIn()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const onSubmit = async (data: z.infer<typeof loginValidationSchema>) => {
    const { error } = await signIn.password({
      emailAddress: data.email,
      password: data.password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl('/');
          if (url.startsWith('http')) {
            // Only use window.location on web platform
            if (typeof window !== 'undefined' && window.location) {
              window.location.href = url;
            } else {
              // On native, just use router navigation
              router.replace('/')
            }
          } else {
            router.replace(url);
          }
        },
      });
    } else if (signIn.status === 'needs_second_factor') {
      // Handle MFA if needed (not implemented in this basic flow)
      console.log('MFA required');
    } else if (signIn.status === 'needs_client_trust') {
      // Send email code for client trust verification
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === 'email_code'
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error('Sign-in attempt not complete:', signIn);
    }
  };

  const handleVerify = async (code: string) => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl('/');
          if (url.startsWith('http')) {
            // Only use window.location on web platform
            if (typeof window !== 'undefined' && window.location) {
              window.location.href = url;
            } else {
              // On native, just use router navigation
              router.replace('/');
            }
          } else {
            router.replace(url);
          }
        },
      });
    } else {
      console.error('Sign-in attempt not complete:', signIn);
    }
  };

  // Show verification screen if client trust is needed

  if (signIn.status === 'needs_client_trust') {
    return (
      <>
        <h1>Verify your account</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const code = formData.get('code') as string;
          handleVerify(code);
        }}>
          <div>
            <label htmlFor="code">Code</label>
            <input id="code" name="code" type="text" />
            {errors.fields.code && <p>{errors.fields.code.message}</p>}
          </div>
          <button type="submit" disabled={fetchStatus === 'fetching'}>
            Verify
          </button>
        </form>
        <button onClick={() => signIn.mfa.sendEmailCode()}>I need a new code</button>
        <button onClick={() => signIn.reset()}>Start over</button>
      </>)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="password" type="password" required />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" form="login-form" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
