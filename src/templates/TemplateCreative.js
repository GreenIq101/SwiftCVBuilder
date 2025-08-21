export default function TemplateCreative({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="border rounded-md overflow-hidden bg-white dark:bg-zinc-900 shadow-sm w-full max-w-3xl mx-auto">
      <div className="p-5 bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight break-words">{data.name || "Your Name"}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
              alt="Profile"
              className="h-16 w-16 rounded-full border-4 border-white dark:border-zinc-800 shadow object-cover"
            />
          ) : null}
        </div>
        {data.summary ? <p className="mt-3 text-sm break-words">{data.summary}</p> : null}
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <section className="md:col-span-2 space-y-4">
            <div>
              <h2 className="font-semibold uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400">Work</h2>
              <div className="mt-2 space-y-3">
                {(data.experiences || []).map((x, i) => (
                  <div key={i} className="rounded-md border p-3">
                    <div className="font-semibold">{x.title || "Job Title"}</div>
                    <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                      {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                    </div>
                    {x.description ? <p className="mt-1 text-sm break-words">{x.description}</p> : null}
                  </div>
                ))}
                {!(data.experiences || []).length ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Add your experience.</p>
                ) : null}
              </div>
            </div>

            {(data.projects || []).length ? (
              <div>
                <h2 className="font-semibold uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400">
                  Projects
                </h2>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.projects.map((p, i) => (
                    <div key={i} className="rounded-md border p-3">
                      <div className="font-semibold">{p.name || "Project"}</div>
                      {p.link ? (
                        <a href={p.link} className="text-primary underline text-xs break-all" target="_blank" rel="noreferrer">
                          {p.link}
                        </a>
                      ) : null}
                      {p.description ? <p className="mt-1 text-sm break-words">{p.description}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <aside className="space-y-4">
            <div>
              <h2 className="font-semibold uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400">
                Education
              </h2>
              <div className="mt-2 space-y-2">
                {(data.education || []).map((e, i) => (
                  <div key={i} className="rounded-md border p-3">
                    <div className="font-semibold">{e.level || "Title"}</div>
                    <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                      {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                      {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {skills.length ? (
              <div>
                <h2 className="font-semibold uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400">
                  Skills
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 border rounded px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  )
}
