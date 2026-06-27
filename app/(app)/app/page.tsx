import Link from "next/link";

const documentedDays = [1, 2, 5, 8, 11, 17, 21, 24];

const stats = [
  {
    label: "Pages en cours",
    value: "12",
    text: "Des souvenirs déjà prêts à rejoindre le livre."
  },
  {
    label: "Courriers du temps",
    value: "1",
    text: "Une lettre écrite pour être découverte plus tard."
  },
  {
    label: "Souvenir du jour",
    value: "1",
    text: "Un instant simple peut devenir une page précieuse."
  }
];

const actions = [
  {
    title: "Écrire une page",
    text: "Ajouter un souvenir, une phrase, une étape ou une émotion.",
    href: "/app/journal",
    cta: "Écrire aujourd’hui",
    primary: true
  },
  {
    title: "Courrier du temps",
    text: "Préparer une lettre à ouvrir dans plusieurs années.",
    href: "/app/capsules",
    cta: "Écrire un courrier"
  },
  {
    title: "Le livre",
    text: "Voir les chapitres qui prennent forme au fil du temps.",
    href: "/app/histoire",
    cta: "Ouvrir"
  }
];

function getCurrentMonthCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const monthName = today.toLocaleDateString("fr-FR", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  return {
    monthName,
    todayDate: today.getDate(),
    days: [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
    ]
  };
}

export default function DashboardPage() {
  const calendar = getCurrentMonthCalendar();

  return (
    <main className="min-h-dvh bg-[#F7F3EC] px-4 py-5 text-[#2E2923] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col py-2 sm:py-6 lg:min-h-[calc(100dvh-2.5rem)] lg:justify-center">
        <div className="mb-6 sm:mb-8">
          <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#9B7658]">
            Le livre de l’enfance
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-[2.35rem] leading-[0.95] tracking-[-0.04em] text-[#2A241F] sm:text-5xl lg:text-6xl">
                Chaque souvenir compte
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6E6860] sm:text-base sm:leading-7">
                Écrivez quelques lignes, gardez les petits instants et préparez
                peu à peu un livre unique à transmettre.
              </p>
            </div>

            <Link
              href="/app/journal"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#8B684C] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(82,58,40,0.18)] transition hover:bg-[#76583F]"
            >
              Écrire une page
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_70px_rgba(69,53,36,0.1)] backdrop-blur sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(143,165,143,0.18),transparent_14rem)]" />

            <div className="relative z-10">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-[#9B7658]">
                Livre en création
              </p>

              <div className="mt-3 flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-serif text-3xl tracking-[-0.03em]">
                    Premiers chapitres
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#706A62]">
                    Chaque souvenir ajouté devient une matière précieuse pour
                    composer, un jour, le livre de son enfance.
                  </p>
                </div>

                <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#F2E9DD] sm:flex">
                  <div className="relative h-16 w-16">
                    <div className="absolute left-1/2 top-7 h-9 w-1 -translate-x-1/2 rounded-full bg-[#8B684C]" />
                    <div className="absolute left-1/2 top-7 h-7 w-1 origin-top -rotate-45 rounded-full bg-[#8B684C]" />
                    <div className="absolute left-1/2 top-7 h-7 w-1 origin-top rotate-45 rounded-full bg-[#8B684C]" />
                    <div className="absolute left-2 top-2 h-5 w-8 rotate-[24deg] rounded-full rounded-br-none bg-[#8FA58F]" />
                    <div className="absolute right-2 top-1 h-5 w-8 -rotate-[24deg] rounded-full rounded-bl-none bg-[#8FA58F]" />
                    <div className="absolute bottom-1 left-1/2 h-3 w-10 -translate-x-1/2 rounded-[50%] border-t border-[#BFA88F]" />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-xs text-[#706A62]">
                  <span>Avancement du livre</span>
                  <span>12 pages</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#EFE6DA]">
                  <div className="h-full w-[38%] rounded-full bg-[#8FA58F]" />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E9DED0] bg-[#FBF8F3]/80 p-4">
                  <p className="text-xs text-[#8B684C]">Dernière page</p>
                  <p className="mt-2 font-serif text-xl">
                    Une pensée ajoutée aujourd’hui.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E9DED0] bg-[#FBF8F3]/80 p-4">
                  <p className="text-xs text-[#8B684C]">Période racontée</p>
                  <p className="mt-2 font-serif text-xl">2 mois d’enfance</p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_24px_70px_rgba(69,53,36,0.09)] backdrop-blur sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl tracking-[-0.03em]">
                Souvenirs du mois
              </h2>

              <span className="text-xs capitalize text-[#867D73]">
                {calendar.monthName}
              </span>
            </div>

            <div className="grid max-w-[22rem] grid-cols-7 gap-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#9B9288] sm:gap-3">
              {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                <span key={index}>{day}</span>
              ))}
            </div>

            <div className="mt-3 grid max-w-[22rem] grid-cols-7 gap-2 sm:gap-3">
              {calendar.days.map((day, index) =>
                day === null ? (
                  <span key={index} />
                ) : (
                  <span
                    key={index}
                    className={[
                      "flex aspect-square items-center justify-center rounded-full border text-xs transition",
                      documentedDays.includes(day)
                        ? "border-[#A7B9A4] bg-[#A7B9A4] text-white"
                        : "border-[#E7DED2] bg-[#F7F2EC] text-[#8A8178]",
                      day === calendar.todayDate
                        ? "ring-2 ring-[#8B684C]/35 ring-offset-2 ring-offset-white"
                        : ""
                    ].join(" ")}
                  >
                    {day}
                  </span>
                )
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-[#706A62] sm:text-sm">
              Chaque journée documentée pourra devenir une page du livre.
            </p>
          </article>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[1.5rem] border border-white/80 bg-white/75 p-5 shadow-[0_18px_50px_rgba(69,53,36,0.07)]"
            >
              <p className="text-xs text-[#7B746C]">{stat.label}</p>
              <p className="mt-4 font-serif text-2xl">{stat.value}</p>
              <p className="mt-3 text-xs leading-5 text-[#706A62]">
                {stat.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <article
              key={action.title}
              className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-[0_18px_50px_rgba(69,53,36,0.07)]"
            >
              <h3 className="font-serif text-2xl tracking-[-0.03em]">
                {action.title}
              </h3>

              <p className="mt-2 min-h-10 text-xs leading-5 text-[#706A62]">
                {action.text}
              </p>

              <Link
                href={action.href}
                className={[
                  "mt-4 inline-flex rounded-full px-4 py-2 text-xs font-semibold transition",
                  action.primary
                    ? "bg-[#8B684C] text-white hover:bg-[#76583F]"
                    : "border border-[#E5DCD0] bg-white text-[#2E2923] hover:bg-[#F7F2EC]"
                ].join(" ")}
              >
                {action.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}