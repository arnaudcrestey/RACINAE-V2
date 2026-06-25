# RACINAE V2 - Architecture Technique

## Statut

Phase actuelle : Phase 1 - Fondations techniques.

Ce document est la reference technique vivante de RACINAE V2. Il doit etre mis
a jour a chaque phase structurante du projet.

Derniere mise a jour : ossature produit complete.

## Principes Directeurs

RACINAE V2 est une application mobile-first de memoire personnelle intelligente.
Toute decision technique doit servir une experience calme, fluide, elegante,
intime, premium, humaine et minimaliste.

Le projet ne doit jamais glisser vers :

- un reseau social ;
- un album photo ;
- un cloud de stockage ;
- un chatbot ;
- un outil de productivite ;
- une application de developpement personnel.

La promesse produit reste :

> Votre histoire, un jour a la fois.

## Regles De Phase

Le developpement se fait exclusivement par phases.

- Phase 1 : architecture, design system, navigation, configuration, theme,
  responsive, PWA, animations globales, configuration Supabase sans logique
  metier.
- Phase 2 : authentification.
- Phase 3 : dashboard.
- Phase 4 : journal.
- Phase 5 : Arbre de Vie.
- Phase 6 : Capsules du Temps.
- Phase 7 : Mon Histoire.
- Phase 8 : IA.
- Phase 9 : optimisations.

La Phase 1 ne contient aucune fonctionnalite metier. Les routes peuvent exister
comme structure, mais ne doivent pas implementer le Journal, les Capsules du
Temps, Mon Histoire ou l'IA.

## Stack

- Framework : Next.js 16 avec App Router.
- Langage : TypeScript strict.
- UI : React 19, Server Components par defaut.
- Styles : Tailwind CSS 4, tokens CSS, variables semantiques.
- Composants : Radix UI et shadcn comme primitives accessibles.
- Animations : Framer Motion, usage sobre et compatible `prefers-reduced-motion`.
- Backend cible : Supabase, configuration preparee sans logique metier.
- PWA : manifest applicatif, icones et couleurs preparees.

## Architecture Des Dossiers

```txt
app/
  (public)/
  (app)/
  manifest.ts
  globals.css
  layout.tsx
  error.tsx
  not-found.tsx

components/
  brand/
  feedback/
  layout/
  motion/
  navigation/
  primitives/
  ui/

config/
  app.ts
  navigation.ts
  routes.ts
  theme.ts

hooks/

lib/
  supabase/
  utils.ts

providers/

services/
  supabase/

styles/
  motion.css
  themes.css
  tokens.css
  typography.css

types/

utils/

public/
  icons/
  pwa/
```

## Responsabilites

- `app/` : routes, layouts, metadata, manifest et limites de rendu Next.js.
- `components/ui/` : primitives generiques et reutilisables.
- `components/layout/` : shells et structures d'ecran.
- `components/navigation/` : navigation publique et applicative.
- `components/brand/` : elements identitaires RACINAE.
- `components/motion/` : wrappers d'animation sobres.
- `components/feedback/` : etats d'erreur, vide ou chargement.
- `config/` : configuration statique de l'application.
- `styles/` : tokens, themes, typographies et animations globales.
- `providers/` : providers React globaux.
- `lib/` : utilitaires techniques partages.
- `services/` : points d'integration externes, sans logique UI.
- `types/` : types partages.
- `hooks/` : hooks reutilisables, uniquement si necessaires.
- `utils/` : fonctions pures sans dependance framework.

## Design System

Les composants ne doivent jamais utiliser de couleurs hexadecimales directement.
Ils consomment exclusivement des variables CSS semantiques exposees via
Tailwind.

Palette RACINAE :

- fond principal : `#FAF8F4`
- surface : `#FFFFFF`
- texte principal : `#222222`
- texte secondaire : `#6B6B6B`
- brun signature : `#8C6E54`
- accent doux : `#D8C1A8`
- vert vie : `#8BA888`

Typographies :

- titres : Cormorant Garamond ;
- textes et interface : Inter.

## Responsive

La conception commence par le smartphone.

Tailles prioritaires :

- 320 px
- 375 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1440 px

Aucun composant ne doit provoquer de scroll horizontal, debordement ou rupture
visuelle.

## Accessibilite

Le projet vise WCAG 2.2 :

- langue HTML en francais ;
- landmarks explicites ;
- navigation clavier complete ;
- focus visible ;
- zones tactiles confortables ;
- labels accessibles ;
- contraste suffisant ;
- respect de `prefers-reduced-motion`.

## Supabase

La Phase 1 prepare seulement la configuration Supabase :

- lecture des variables d'environnement ;
- client navigateur ;
- client serveur ;
- aucun schema metier ;
- aucune requete metier ;
- aucune logique d'authentification active avant la Phase 2.

## PWA

La Phase 1 prepare :

- manifest Next.js ;
- nom et description RACINAE ;
- theme color ;
- background color ;
- icones applicatives ;
- safe areas mobiles.

Le service worker et la strategie offline fine seront traites lorsque les flux
metier et media seront stabilises.

## Fondations Livrees En Phase 1

La Phase 1 met en place :

- layouts racine, public et applicatif ;
- navigation publique ;
- barre superieure applicative ;
- navigation inferieure mobile-first pour l'espace applicatif ;
- routes structurelles publiques et applicatives ;
- tokens CSS RACINAE ;
- themes clair et sombre ;
- typographies Inter et Cormorant Garamond via `next/font` ;
- composants fondamentaux de Design System ;
- pages globales `not-found` et `error` ;
- manifest PWA ;
- icones PWA ;
- clients Supabase navigateur et serveur, sans logique metier ;
- fichier `.env.example`.

Les pages Journal, Capsules du Temps, Mon Histoire et IA restent des reperes de
structure. Elles ne contiennent aucune fonctionnalite metier.

## Ajustements Visuels Livres En Phase 1.5

La Phase 1.5 ne modifie pas l'architecture, les routes ou les fonctionnalites.
Elle affine uniquement l'experience visuelle :

- proportions generales plus compactes ;
- header public flottant et plus premium ;
- boutons plus confortables et plus expressifs ;
- rythme typographique renforce ;
- landing page recompositionnee autour d'un bloc editorial et d'un visuel calme ;
- transitions CSS et Framer Motion plus douces ;
- navigation mobile applicative plus soignee ;
- responsive mobile verifie sans debordement horizontal.

## Ajustements Visuels Livres En Phase 1.7

La Phase 1.7 ne modifie pas l'architecture, les routes ou les fonctionnalites.
Elle transforme la landing en une experience emotionnelle centree sur le symbole
de l'Arbre de Vie :

- hero plus explicite et plus inspirant ;
- header public simplifie ;
- liens secondaires deplaces dans le footer ;
- illustration premium de l'Arbre de Vie ;
- boutons plus genereux et transitions plus raffinees ;
- micro-animation de flottement tres legere sur l'arbre ;
- verification desktop et mobile sans debordement horizontal.

## Reprise Complete De La Page D'Accueil

La reprise de l'accueil ne modifie pas l'architecture, les routes ou les
fonctionnalites. Elle remplace la logique de landing demonstrative par un moment
editorial et emotionnel :

- hero centre sur le desir de conserver ce que la vie efface ;
- CTA principal oriente vers le premier souvenir ;
- suppression des statistiques fictives et des apercus de produit ;
- visuel symbolique d'une premiere page de vie ;
- navigation publique reduite a l'essentiel ;
- micro-animation calme du support visuel ;
- verification desktop et mobile sans debordement horizontal reel.

## Ossature Produit

Cette etape transforme les fondations en application navigable :

- authentification Supabase preparee via server actions ;
- routes publiques login/register raccordees ;
- dashboard applicatif navigable ;
- Journal : liste, creation, consultation, modification, suppression locale ;
- Capsules : liste, creation, consultation, modification, suppression locale ;
- Mon Histoire : structure de chronologie et zone IA reservee ;
- Profil : formulaire local ;
- Parametres : session et confidentialite ;
- API IA placeholders : `/api/ai/summaries` et `/api/ai/history` ;
- migration Supabase initiale avec tables, relations, RLS et buckets Storage.
- protection `/app/*` via `proxy.ts` lorsque Supabase est configure ;
- mode demo local lorsque les variables Supabase ne sont pas encore renseignees.

Les donnees Journal/Capsules/Profil utilisent temporairement `localStorage` pour
permettre de tester l'ossature sans backend configure. Le schema Supabase est la
cible de persistance pour les prochaines iterations.

## Controle Qualite

Avant livraison de chaque phase :

- `npm run lint`
- `npm run build`
- verification responsive ;
- verification accessibilite ;
- relecture des composants ;
- absence de logique hors phase.
