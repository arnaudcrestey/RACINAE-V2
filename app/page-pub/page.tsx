import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

const previewImages = [
  {
    src: "/racinae-preview/souvenir.png",
    title: "Un souvenir conservé",
    text: "Chaque instant peut devenir une matière précieuse pour le livre.",
  },
  {
    src: "/racinae-preview/ajout-souvenir.png",
    title: "Ajouter un souvenir",
    text: "Quelques lignes suffisent pour commencer une nouvelle page.",
  },
  {
    src: "/racinae-preview/livre.png",
    title: "Le livre prend forme",
    text: "Les souvenirs s’organisent progressivement en pages de livre.",
  },
  {
    src: "/racinae-preview/nouveau-courrier-du-temps.png",
    title: "Écrire au futur",
    text: "Un courrier peut être rédigé aujourd’hui et ouvert plus tard.",
  },
  {
    src: "/racinae-preview/courrier-du-temps.png",
    title: "Les Courriers du Temps",
    text: "Certains mots restent scellés jusqu’au moment choisi.",
  },
]

const futures = [
  "Un livre unique pour chaque enfant",
  "Des souvenirs enrichis par les photos",
  "Des Courriers du Temps conservés jusqu’au jour choisi",
  "Une mise en page personnalisée par l’IA",
  "Une future impression du livre",
  "Une bibliothèque familiale qui grandit avec le temps",
]

export default function RacinaePublicPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#F7F3EC] text-[#2E2923]">
      <section className="relative mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#A8B8A3]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-8 h-72 w-72 rounded-full bg-[#D8B889]/25 blur-3xl" />

        <header className="relative z-10 flex items-center justify-between gap-4 border-b border-[#d8c4a8]/40 pb-5">
          <div>
            <p className="font-serif text-xl tracking-[0.18em] sm:text-2xl">
              RACINAE
            </p>
            <p className="mt-1 text-[0.72rem] text-[#7B746C]">
              Le livre de mon enfance
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[#d8c4a8]/60 bg-white/60 px-4 py-2 text-xs font-semibold text-[#2E2923] transition hover:bg-white"
          >
            Retour
          </Link>
        </header>

        <div className="relative z-10 grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#9B7658] sm:text-xs sm:tracking-[0.42em]">
              Application de transmission familiale
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-[2.65rem] leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Le livre qui s’écrit pendant que votre enfant grandit.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#6E6860] sm:text-base sm:leading-8">
              RACINAE permet à tous ceux qui accompagnent un enfant de conserver
              les souvenirs importants qui composeront, un jour, le livre de son
              enfance.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#captures"
                className="rounded-full bg-[#8B684C] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(82,58,40,0.18)] transition hover:bg-[#76583F]"
              >
                Découvrir l’expérience
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 rounded-full bg-[#A8B8A3]/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/75 p-2.5 shadow-[0_24px_70px_rgba(69,53,36,0.13)] backdrop-blur sm:rounded-[2.5rem] sm:p-4">
              <Image
                src="/racinae-preview/dashboard.png"
                alt="Aperçu de l'application RACINAE"
                width={900}
                height={620}
                className="h-auto w-full rounded-[1.35rem] object-cover sm:rounded-[2rem]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="captures"
        className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#9B7658] sm:text-xs sm:tracking-[0.42em]">
            Expérience
          </p>

          <h2 className="mt-4 font-serif text-[2.15rem] leading-[1.02] tracking-[-0.045em] sm:text-5xl">
            Une application pensée comme un objet de mémoire.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#6E6860]">
            Chaque souvenir ajouté vient naturellement enrichir un livre qui se
            construit au fil du temps.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6">
          {previewImages.map((item, index) => (
            <Fragment key={item.src}>
              {index === 3 ? (
                <section className="relative overflow-hidden rounded-[2rem] border border-[#d8c4a8]/45 bg-[#fffaf0] p-6 text-center shadow-[0_22px_60px_rgba(69,53,36,0.08)] sm:rounded-[2.75rem] sm:p-10">
                  <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-[#A8B8A3]/25 blur-3xl" />
                  <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#D8B889]/25 blur-3xl" />

                  <div className="relative mx-auto max-w-2xl">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#9B7658] sm:text-xs sm:tracking-[0.42em]">
                      Les courriers du Temps
                    </p>

                    <h2 className="mt-4 font-serif text-[2.1rem] leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                      Certains mots méritent d’attendre.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-[#6E6860]">
                      Au-delà du livre, RACINAE permet aussi de préparer des
                      messages à ouvrir dans quelques mois, quelques années ou
                      lors d’un moment choisi.
                    </p>
                  </div>
                </section>
              ) : null}

              <article className="grid items-center gap-5 rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-[0_22px_60px_rgba(69,53,36,0.08)] backdrop-blur sm:rounded-[2.5rem] sm:p-6 lg:grid-cols-2 lg:gap-6 lg:p-7">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-[1.6rem] border border-[#d8c4a8]/45 bg-[#fffaf0] p-2.5 sm:rounded-[2rem] sm:p-3">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={900}
                      height={620}
                      className="h-auto w-full rounded-[1.2rem] object-cover sm:rounded-[1.5rem]"
                    />
                  </div>
                </div>

                <div className="px-1 py-2 sm:p-4 lg:p-8">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#9B7658]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-3 font-serif text-[2rem] leading-[1.05] tracking-[-0.04em] sm:mt-4 sm:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-[#6E6860] sm:mt-4">
                    {item.text}
                  </p>
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-4 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d8c4a8]/45 bg-[#fffaf0] p-6 shadow-[0_26px_80px_rgba(69,53,36,0.11)] sm:rounded-[2.75rem] sm:p-10">
          <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-[#A8B8A3]/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#D8B889]/25 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#9B7658] sm:text-xs sm:tracking-[0.42em]">
                Vision
              </p>

              <h2 className="mt-4 font-serif text-[2.15rem] leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                Une bibliothèque familiale en devenir.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#6E6860]">
                RACINAE n’est pas un simple album photo. C’est un espace où les
                souvenirs deviennent progressivement des livres, des Courriers du
                Temps et des traces à transmettre.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {futures.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#d8c4a8]/45 bg-white/55 p-4 text-sm leading-6 text-[#2E2923] sm:rounded-3xl sm:p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}