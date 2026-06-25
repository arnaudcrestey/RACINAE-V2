import { signOutAction } from "@/app/(public)/auth-actions"
import { Button } from "@/components/ui/button"
import { Surface } from "@/components/ui/surface"

export function SettingsPanel() {
  return (
    <div className="grid gap-4">
      <Surface>
        <h2 className="font-heading text-2xl font-semibold">Confidentialite</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Les politiques RLS Supabase sont preparees pour isoler les donnees de
          chaque utilisateur.
        </p>
      </Surface>
      <Surface>
        <h2 className="font-heading text-2xl font-semibold">Session</h2>
        <form action={signOutAction} className="mt-4">
          <Button variant="outline">Se deconnecter</Button>
        </form>
      </Surface>
      <Surface>
        <h2 className="font-heading text-2xl font-semibold">Export des donnees</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Placeholder pour exporter vos souvenirs et capsules.
        </p>
      </Surface>
      <Surface>
        <h2 className="font-heading text-2xl font-semibold">Suppression du compte</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Placeholder pour une suppression securisee et confirmee.
        </p>
      </Surface>
    </div>
  )
}
