"use client"

import {
  Baby,
  BookOpen,
  Check,
  Mail,
  Palette,
  Plus,
  Printer,
  Sparkles,
  Users,
} from "lucide-react"

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
    <form action={handleSubmit} className="space-y-8">
      <section className="rounded-[2.25rem] border border-[#d8c4a8]/45 bg-[#fffaf0] p-7 shadow-sm sm:p-9">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8A765E]">
              Livres familiaux
            </p>
            <h2 className="mt-3 font-heading text-4xl">Mes livres</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Créez un livre pour chaque enfant, petit-enfant ou personne dont
              vous souhaitez conserver l&apos;histoire.
            </p>
          </div>

          <Button type="button" variant="outline" className="shrink-0">
            <Plus className="mr-2 size-4" />
            Nouveau livre
          </Button>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-[#d8c4a8]/45 bg-white/60 p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#EEF5EE]">
                  <BookOpen className="size-5 text-[#7D947E]" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">Le Livre de Sandro</p>
                    <span className="rounded-full bg-[#EEF5EE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6F866F]">
                      Actif
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Livre de l&apos;enfance · souvenirs, courriers et pages en
                    préparation.
                  </p>
                </div>
              </div>

              <Button type="button" variant="ghost">
                Modifier
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-dashed border-[#d8c4a8]/60 bg-white/35 p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-background">
                  <Baby className="size-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="font-medium">Le Livre de Louise</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Exemple de second livre pour un autre enfant.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-[#d8c4a8]/60 bg-white/35 p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-background">
                  <Users className="size-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="font-medium">Le Livre de Jules</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Exemple de livre pour un petit-enfant ou un proche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.25rem] border bg-card p-7 shadow-sm sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <Check className="size-5 text-[#7D947E]" />
          <h2 className="font-heading text-3xl">Livre actif</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bookTitle">Titre du livre</Label>
            <Input
              id="bookTitle"
              name="bookTitle"
              defaultValue="Le Livre de Sandro"
              placeholder="Ex. Le Livre de Sandro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Prénom du parent / expéditeur</Label>
            <Input
              id="fullName"
              name="fullName"
              defaultValue={profile.fullName}
              placeholder="Ex. Arnaud"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="childName">Prénom de l’enfant</Label>
            <Input
              id="childName"
              name="childName"
              defaultValue="Sandro"
              placeholder="Ex. Sandro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthdate">Date de naissance de l’enfant</Label>
            <Input
              id="birthdate"
              name="birthdate"
              type="date"
              defaultValue={profile.birthdate}
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Label htmlFor="intention">Dédicace du livre</Label>
          <Textarea
            id="intention"
            name="intention"
            defaultValue={profile.intention}
            placeholder="Pour toi, pour plus tard..."
          />
        </div>
      </section>

      <section className="rounded-[2.25rem] border bg-card p-7 shadow-sm sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <Palette className="size-5 text-[#9A7A59]" />
          <h2 className="font-heading text-3xl">Personnalisation du livre</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {["Classique", "Doux", "Illustré"].map((style) => (
            <label
              key={style}
              className="cursor-pointer rounded-3xl border bg-background/70 p-5 transition hover:bg-muted/40"
            >
              <input
                type="radio"
                name="bookStyle"
                value={style}
                defaultChecked={style === "Doux"}
                className="sr-only"
              />
              <p className="font-medium">{style}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Une ambiance éditoriale adaptée au livre de l’enfance.
              </p>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-[2.25rem] border bg-card p-7 shadow-sm sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <Sparkles className="size-5 text-[#7D947E]" />
          <h2 className="font-heading text-3xl">Préférences IA</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Discrète", "L’IA corrige légèrement sans transformer."],
            ["Équilibrée", "L’IA structure et améliore en douceur."],
            ["Créative", "L’IA propose des formulations plus narratives."],
          ].map(([title, text]) => (
            <label
              key={title}
              className="cursor-pointer rounded-3xl border bg-background/70 p-5 transition hover:bg-muted/40"
            >
              <input
                type="radio"
                name="aiStyle"
                value={title}
                defaultChecked={title === "Discrète"}
                className="sr-only"
              />
              <p className="font-medium">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {text}
              </p>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-[2.25rem] border bg-card p-7 shadow-sm sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <Mail className="size-5 text-[#9A7A59]" />
          <h2 className="font-heading text-3xl">Courriers du Temps</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="senderName">Nom utilisé comme expéditeur</Label>
            <Input
              id="senderName"
              name="senderName"
              defaultValue={profile.fullName}
              placeholder="Ex. Papa, Maman, Arnaud..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signature">Signature automatique</Label>
            <Input
              id="signature"
              name="signature"
              defaultValue="Avec tout mon amour"
              placeholder="Ex. Avec tout mon amour"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-[2.25rem] border bg-card p-7 shadow-sm">
          <Users className="size-5 text-[#7D947E]" />
          <h2 className="mt-4 font-heading text-3xl">Co-parent</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Préparez l’invitation d’un second parent ou d’un proche autorisé à
            contribuer au livre.
          </p>
          <Button type="button" variant="outline" className="mt-5">
            Inviter plus tard
          </Button>
        </div>

        <div className="rounded-[2.25rem] border bg-card p-7 shadow-sm">
          <Printer className="size-5 text-[#9A7A59]" />
          <h2 className="mt-4 font-heading text-3xl">Export & impression</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Préférences prévues pour le futur livre imprimé : format, style,
            couverture et version numérique.
          </p>
          <Button type="button" variant="outline" className="mt-5">
            Préparer plus tard
          </Button>
        </div>
      </section>

      <Button size="lg">Enregistrer mon espace</Button>
    </form>
  )
}