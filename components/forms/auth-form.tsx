"use client"

import { useActionState } from "react"
import Link from "next/link"

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
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          minLength={6}
          required
        />
      </div>
      {state.message ? (
        <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
          {state.message}
        </p>
      ) : null}
      <Button className="w-full" size="lg" disabled={isPending}>
        {isPending ? "Un instant..." : isRegister ? "Creer mon compte" : "Me connecter"}
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
