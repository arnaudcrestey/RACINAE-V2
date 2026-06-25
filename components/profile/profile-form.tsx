"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { defaultProfile, type DemoProfile } from "@/lib/demo-data"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

export function ProfileForm() {
  const [profile, setProfile] = useLocalStorageState<DemoProfile>(
    "racinae-profile",
    defaultProfile
  )

  function handleSubmit(formData: FormData) {
    setProfile({
      fullName: String(formData.get("fullName") ?? ""),
      birthdate: String(formData.get("birthdate") ?? ""),
      intention: String(formData.get("intention") ?? ""),
    })
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nom</Label>
        <Input id="fullName" name="fullName" defaultValue={profile.fullName} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar</Label>
        <Input id="avatar" name="avatar" type="file" accept="image/*" disabled />
        <p className="text-sm text-muted-foreground">
          L&apos;upload avatar est prepare pour Supabase Storage.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthdate">Date de naissance</Label>
        <Input id="birthdate" name="birthdate" type="date" defaultValue={profile.birthdate} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="intention">Courte biographie</Label>
        <Textarea id="intention" name="intention" defaultValue={profile.intention} />
      </div>
      <Button size="lg">Enregistrer le profil</Button>
    </form>
  )
}
