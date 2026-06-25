"use server"

import { redirect } from "next/navigation"

import { createSupabaseServerClient } from "@/lib/supabase/server"

type AuthState = {
  message: string
}

const authErrorMessage =
  "Supabase n'est pas encore configure. Renseignez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY."

export async function signInAction(
  _previousState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  try {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { message: error.message }
    }
  } catch {
    return { message: authErrorMessage }
  }

  redirect("/app")
}

export async function signUpAction(
  _previousState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const fullName = String(formData.get("fullName") ?? "")

  try {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      return { message: error.message }
    }
  } catch {
    return { message: authErrorMessage }
  }

  redirect("/app")
}

export async function signOutAction() {
  try {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
  } catch {
    // The local skeleton can still navigate without Supabase env vars.
  }

  redirect("/")
}
