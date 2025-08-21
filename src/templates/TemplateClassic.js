import { Separator } from "../components/ui/separator"

export default function TemplateClassic({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const hobbies = (data.hobbies || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900 rounded-md p-5 md:p-8 shadow-sm w-full max-w-3xl mx-auto">
      <header className="flex flex-col md:flex-row items-center gap-4 mb-4">
        {data.photo ? (
          <img
            src={data.photo || "/placeholder.svg?height=80&width=80&query=profile%20photo"}
            alt="Profile"
            className="h-20 w-20 rounded-lg object-cover border"
          />
        ) : null}
        <div className="flex-1">
          <h1 className="text-2xl font-bold break-words">{data.name || "Your Name"}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
            {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
          </p>
        </div>
      </header>

      {data.summary ? (
        <>
          <p className="text-sm leading-6 mb-2 break-words">{data.summary}</p>
          <Separator className="my-4" />
        </>
      ) : null}

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Education</h2>
        <div className="space-y-2">
          {(data.education || []).length
            ? data.education.map((e, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{e.level || "Title"}</div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                    {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                  </div>
                </div>
              ))
            : <p className="text-sm text-zinc-500 dark:text-zinc-400">Add your education.</p>}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Work Experience</h2>
        <div className="space-y-3">
          {(data.experiences || []).length
            ? data.experiences.map((x, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{x.title || "Job Title"}</div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                  </div>
                  {x.description ? <p className="mt-1 leading-6 break-words">{x.description}</p> : null}
                </div>
              ))
            : <p className="text-sm text-zinc-500 dark:text-zinc-400">Add your experience.</p>}
        </div>
      </section>

      {(data.projects || []).length ? (
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((p, i) => (
              <div key={i} className="text-sm">
                <div className="font-medium">{p.name || "Project"}</div>
                {p.link ? (
                  <a href={p.link} className="text-primary underline text-xs break-all" target="_blank" rel="noreferrer">
                    {p.link}
                  </a>
                ) : null}
                {p.description ? <p className="mt-1 leading-6 break-words">{p.description}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {skills.length ? (
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded border">
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {hobbies.length ? (
        <section>
          <h2 className="font-semibold text-lg mb-2">Hobbies</h2>
          <p className="text-sm break-words">{hobbies.join(", ")}</p>
        </section>
      ) : null}
    </div>
  )
}
