"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AuthFormProps = {
  mode: "login" | "register"
  action: (
    state: { message: string },
    formData: FormData
  ) => Promise<{ message: string }>
}

export function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, { message: "" })
  const [showPassword, setShowPassword] = useState(false)
  const isRegister = mode === "register"

  return (
    <form action={formAction} className="space-y-5">
      {isRegister ? (
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom</Label>
          <Input id="fullName" name="fullName" autoComplete="name" required />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>

        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={6}
            required
            className="pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full p-1 text-muted-foreground transition hover:text-foreground"
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {state.message ? (
        <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
          {state.message}
        </p>
      ) : null}

      <Button className="w-full" size="lg" disabled={isPending}>
        {isPending
          ? "Un instant..."
          : isRegister
            ? "Creer mon compte"
            : "Me connecter"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isRegister ? "Deja un compte ?" : "Pas encore de compte ?"}{" "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-medium text-primary"
        >
          {isRegister ? "Se connecter" : "Creer un compte"}
        </Link>
      </p>
    </form>
  )
}