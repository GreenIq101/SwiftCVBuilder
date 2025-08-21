export default function TemplateGradient({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="rounded-md overflow-hidden border bg-white dark:bg-zinc-900 shadow-sm w-full max-w-3xl mx-auto">
      <div className="p-5 text-white bg-gradient-to-r from-fuchsia-600 via-pink-600 to-orange-500">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-white/50"
            />
          ) : null}
          <div>
            <h1 className="text-2xl font-bold break-words">{data.name || "Your Name"}</h1>
            <p className="text-xs opacity-90 break-words">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
        </div>
        {data.summary ? <p className="mt-3 text-sm opacity-95 break-words">{data.summary}</p> : null}
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <section>
            <h2 className="font-semibold mb-2">Experience</h2>
            <div className="space-y-3">
              {(data.experiences || []).map((x, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{x.title || "Job Title"}</div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                  </div>
                  {x.description ? <p className="mt-1 leading-6 break-words">{x.description}</p> : null}
                </div>
              ))}
              {!(data.experiences || []).length ? <p className="text-sm text-zinc-500 dark:text-zinc-400">Add experience.</p> : null}
            </div>
          </section>

          <section>
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
              {!(data.education || []).length ? <p className="text-sm text-zinc-500 dark:text-zinc-400">Add education.</p> : null}
            </div>
          </section>
        </div>

        {(data.projects || []).length ? (
          <section className="mt-4">
            <h2 className="font-semibold mb-2">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((p, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{p.name || "Project"}</div>
                  {p.link ? (
                    <a href={p.link} className="text-pink-600 underline text-xs break-all" target="_blank" rel="noreferrer">
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
          <section className="mt-4">
            <h2 className="font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-gradient-to-r from-fuchsia-100 to-orange-100 text-fuchsia-900 dark:text-orange-900 px-2 py-1 rounded border"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
