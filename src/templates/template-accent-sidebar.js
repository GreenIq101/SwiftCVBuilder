export default function TemplateAccentSidebar({ data = {} }) {
    const skills = (data.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  
    return (
      <div className="grid md:grid-cols-3 gap-4">
        <aside className="rounded-md border overflow-hidden md:col-span-1">
          <div className="p-5 text-white bg-gradient-to-r from-fuchsia-600 via-pink-600 to-orange-500">
            <div className="flex items-center gap-3">
              {data.photo ? (
                <img
                  src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-zinc-700"
                />
              ) : null}
              <div>
                <h1 className="text-xl font-bold">{data.name || "Your Name"}</h1>
                <p className="text-xs opacity-90">
                  {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
                </p>
              </div>
            </div>
            {data.summary ? <p className="mt-3 text-sm opacity-95">{data.summary}</p> : null}
          </div>
  
          {skills.length ? (
            <div className="p-5">
              <h2 className="font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-secondary px-2 py-1 rounded border">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
  
        <main className="md:col-span-2 space-y-4">
          <section className="rounded-md border p-4">
            <h2 className="font-semibold mb-2">Experience</h2>
            <div className="space-y-3">
              {(data.experiences || []).map((x, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{x.title || "Job Title"}</div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                  </div>
                  {x.description ? <p className="mt-1 leading-6">{x.description}</p> : null}
                </div>
              ))}
              {!(data.experiences || []).length ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Add your experience.</p>
              ) : null}
            </div>
          </section>
  
          <section className="rounded-md border p-4">
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
            <section className="rounded-md border p-4">
              <h2 className="font-semibold mb-2">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((p, i) => (
                  <div key={i} className="text-sm">
                    <div className="font-medium">{p.name || "Project"}</div>
                    {p.link ? (
                      <a href={p.link} className="text-primary underline text-xs" target="_blank" rel="noreferrer">
                        {p.link}
                      </a>
                    ) : null}
                    {p.description ? <p className="mt-1 leading-6">{p.description}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    )
  }
  