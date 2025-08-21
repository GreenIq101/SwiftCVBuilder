export default function TemplateSplit({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-md p-5 md:p-8 shadow-sm">
      <aside className="md:col-span-1 rounded-md border p-4 bg-muted dark:bg-zinc-800">
        <div className="flex items-center gap-3 mb-3">
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
              alt="Profile"
              className="h-16 w-16 rounded-md object-cover border"
            />
          ) : null}
          <div>
            <h1 className="text-xl font-semibold break-words">{data.name || "Your Name"}</h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 break-words">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
        </div>
        {data.summary ? <p className="text-sm break-words">{data.summary}</p> : null}

        {skills.length ? (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 border rounded px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </aside>

      <main className="md:col-span-2 space-y-4">
        <section className="rounded-md border p-4 bg-white dark:bg-zinc-900">
          <h2 className="font-semibold mb-2">Experience</h2>
          <div className="space-y-2 text-sm">
            {(data.experiences || []).map((x, i) => (
              <div key={i}>
                <div className="font-medium">{x.title || "Job Title"}</div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                </div>
                {x.description ? <p className="mt-1 break-words">{x.description}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border p-4 bg-white dark:bg-zinc-900">
          <h2 className="font-semibold mb-2">Education</h2>
          <div className="space-y-2 text-sm">
            {(data.education || []).map((e, i) => (
              <div key={i}>
                <div className="font-medium">{e.level || "Title"}</div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                  {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {(data.projects || []).length ? (
          <section className="rounded-md border p-4 bg-white dark:bg-zinc-900">
            <h2 className="font-semibold mb-2">Projects</h2>
            <div className="space-y-2 text-sm">
              {data.projects.map((p, i) => (
                <div key={i}>
                  <div className="font-medium">{p.name || "Project"}</div>
                  {p.link ? (
                    <a href={p.link} className="text-primary underline text-xs break-all" target="_blank" rel="noreferrer">
                      {p.link}
                    </a>
                  ) : null}
                  {p.description ? <p className="mt-1 break-words">{p.description}</p> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
