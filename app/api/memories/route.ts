import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const { data: memory, error } = await supabase
      .from("memories")
      .select(
        "id,title,content,emotion,memory_date,ai_title,ai_subtitle,ai_text,layout,media_url,media_type,photo_required,decoration,chapter,importance,created_at"
      )
      .eq("id", id)
      .single()

    if (error) {
      console.error("ERREUR SUPABASE GET MEMORY :", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ memory })
  }

  const { data: memories, error } = await supabase
    .from("memories")
    .select(
      "id,title,content,emotion,memory_date,ai_title,ai_subtitle,ai_text,layout,media_url,media_type,photo_required,decoration,chapter,importance,created_at"
    )
    .order("memory_date", { ascending: true })
    .order("created_at", { ascending: true })

  if (error) {
    console.error("ERREUR SUPABASE GET MEMORIES :", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ memories })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const id = String(body.id ?? "").trim()
    const title = String(body.title ?? "").trim()
    const content = String(body.content ?? "").trim()
    const emotion = String(body.emotion ?? "normal")
    const memoryDate = String(body.memory_date ?? "")
    const mediaUrlFromBody = String(body.media_url ?? "").trim()
    const mediaTypeFromBody = String(body.media_type ?? "").trim()

    if (!title || !content) {
      return NextResponse.json(
        { error: "Le titre et le récit sont obligatoires." },
        { status: 400 }
      )
    }

    let existingMediaUrl: string | null = null
    let existingMediaType: string | null = null

    if (id) {
      const { data: existingMemory, error: existingError } = await supabase
        .from("memories")
        .select("media_url,media_type")
        .eq("id", id)
        .single()

      if (existingError) {
        console.error("ERREUR SUPABASE EXISTING MEMORY :", existingError)
        return NextResponse.json(
          { error: existingError.message },
          { status: 500 }
        )
      }

      existingMediaUrl = existingMemory?.media_url ?? null
      existingMediaType = existingMemory?.media_type ?? null
    }

    const mediaUrl = mediaUrlFromBody || existingMediaUrl
    const mediaType = mediaTypeFromBody || existingMediaType
    const hasPhoto = mediaType === "photo" && Boolean(mediaUrl)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Tu es l'éditrice du Livre de l'enfance. Tu transformes des souvenirs de parent en pages de livre sobres, naturelles et fidèles. Le livre est destiné à l'enfant devenu plus grand : le parent s'adresse donc directement à lui, principalement avec le pronom 'tu'. Ton style est simple, humain, concret et précis. Tu écris comme un parent qui raconte un souvenir à son enfant avec justesse, pas comme un texte émotionnel généré. Tu n'inventes jamais de fait, de prénom, de lieu, d'action ou d'émotion absents du texte.",
        },
        {
          role: "user",
          content: `
Souvenir fourni par le parent :

Titre initial : ${title}
Date du souvenir : ${memoryDate || "non précisée"}
Émotion associée : ${emotion}
Média associé : ${hasPhoto ? "photo" : "aucun média photo"}

Texte original :
${content}

Retourne uniquement un JSON valide avec exactement ces clés :

{
  "ai_title": "titre éditorial court, naturel et fidèle au souvenir",
  "ai_subtitle": "sous-titre très court, concret, sans lyrisme",
  "ai_text": "texte éditorial en français, adressé directement à l'enfant avec 'tu', fidèle au souvenir, naturel, simple, 4 à 7 phrases maximum",
  "chapter": "Naissance | Premières fois | Quotidien | Famille | Vacances | Anniversaires | École | Santé | Autre",
  "importance": "normal | important | exceptional"
}

Objectif :
Transformer le souvenir en une page du Livre de l'enfance.

Le livre est destiné à être lu par l'enfant plusieurs années plus tard.
Le narrateur est le parent qui s'adresse directement à son enfant.
Le texte doit donc utiliser naturellement la deuxième personne du singulier : "tu".
Le lecteur doit avoir l'impression que son parent lui raconte un souvenir de son enfance.

Exemple d'intention :
Au lieu d'écrire :
"Nous étions en balade et mon petit loup était impressionné par l'arbre."

Préférer :
"Ce jour-là, nous étions en balade en campagne. Tu t'es retrouvé face à un arbre immense, et tu semblais tout petit à côté de lui."

Règles de fond :
- Ne jamais inventer un fait absent du texte original.
- Ne jamais ajouter de scène non décrite.
- Ne jamais ajouter de personne non mentionnée.
- Ne jamais attribuer une émotion qui n'est pas exprimée ou clairement suggérée.
- Conserver les détails concrets du parent.
- Garder les mots ou images importants quand ils sont simples et vrais.
- Si le souvenir est court, produire un texte court.
- Si le souvenir est factuel, rester factuel.
- Si le souvenir est tendre, garder la tendresse sans l'amplifier.
- Le parent raconte le souvenir avec ses propres mots, comme s'il écrivait une page destinée à son enfant devenu grand.

Règles de narration :
- S'adresser principalement à l'enfant avec "tu".
- Utiliser "nous" lorsque le souvenir concerne le parent et l'enfant ensemble.
- Utiliser "je" uniquement quand le parent exprime un souvenir personnel ou un regard.
- Ne pas écrire comme un narrateur extérieur.
- Ne pas raconter l'enfant à la troisième personne sauf si c'est vraiment nécessaire à la fluidité.
- Ne pas forcer le "tu" si une phrase devient artificielle, mais garder cette adresse comme règle dominante.

Règles de style :
- Écrire simplement.
- Préférer des phrases courtes ou moyennes.
- Éviter le lyrisme.
- Éviter les phrases trop parfaites.
- Éviter les grandes conclusions émotionnelles.
- Varier les débuts et les fins.
- Ne pas finir systématiquement par une phrase de type morale, souvenir précieux ou trace éternelle.
- Accepter une fin simple, ouverte, visuelle ou factuelle.
- Ne pas utiliser de formules toutes faites.

Débuts possibles :
- "Ce jour-là..."
- "Je me souviens..."
- "Tu avais..."
- "Nous étions..."
- "C'était..."
- ou toute autre formulation naturelle adaptée au souvenir.

Fins possibles :
- une observation simple ;
- un détail concret ;
- une image sobre ;
- une phrase ouverte ;
- une fin factuelle.

Formules interdites :
- "instant suspendu"
- "rayon de soleil"
- "trésor"
- "gravé à jamais"
- "gravé dans nos cœurs"
- "reste gravé"
- "moment magique"
- "précieux souvenir"
- "pour toujours"
- "dans nos cœurs"
- "la beauté du monde"
- "petite star"
- "illuminait la pièce"
- "ce moment unique"
- "ce souvenir simple et précieux"

Contraintes :
- Ne pas parler de RACINAE.
- Ne pas parler d'IA.
- Ne pas expliquer le souvenir.
- Ne pas moraliser.
- Ne pas surinterpréter.
- Ne pas conclure artificiellement.
- Le texte doit tenir sur une page de livre.
`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? "{}"
    const ai = JSON.parse(raw) as {
      ai_title?: string
      ai_subtitle?: string
      ai_text?: string
      chapter?: string
      importance?: string
    }

    const allowedImportance = ["normal", "important", "exceptional"]

    const payload = {
      title,
      content,
      emotion,
      memory_date: memoryDate || null,
      ai_title: ai.ai_title || title,
      ai_subtitle: ai.ai_subtitle || null,
      ai_text: ai.ai_text || content,
      layout: hasPhoto ? "photo_right" : "text_only",
      media_url: mediaUrl || null,
      media_type: mediaType || null,
      photo_required: hasPhoto,
      decoration: "none",
      chapter: ai.chapter || "Autre",
      importance: allowedImportance.includes(ai.importance ?? "")
        ? ai.importance
        : "normal",
    }

    const query = id
      ? supabase.from("memories").update(payload).eq("id", id)
      : supabase.from("memories").insert(payload)

    const { data: memory, error } = await query.select("*").single()

    if (error) {
      console.error("ERREUR SUPABASE MEMORIES :", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ memory })
  } catch (error) {
    console.error("ERREUR API MEMORIES :", error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 500 }
    )
  }
}