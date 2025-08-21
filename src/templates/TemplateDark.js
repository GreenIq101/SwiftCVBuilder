export default function TemplateDark({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-md p-5 md:p-8 print:bg-white print:text-black w-full max-w-3xl mx-auto">
      <header className="flex flex-col md:flex-row items-center gap-4 mb-4">
        {data.photo ? (
          <img
            src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover ring-2 ring-zinc-700"
          />
        ) : null}
        <div>
          <h1 className="text-xl font-semibold break-words">{data.name || "Your Name"}</h1>
          <p className="text-xs text-zinc-400 break-words">
            {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
          </p>
        </div>
      </header>
      {data.summary ? <p className="text-sm text-zinc-300 leading-6 mb-3 break-words">{data.summary}</p> : null}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-4">
          <section>
            <h2 className="font-semibold mb-2">Experience</h2>
            <div className="space-y-3">
              {(data.experiences || []).map((x, i) => (
                <div key={i} className="text-sm">
                  <div className="font-medium">{x.title || "Job Title"}</div>
                  <div className="text-zinc-400">
                    {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                  </div>
                  {x.description ? <p className="mt-1 leading-6 break-words">{x.description}</p> : null}
                </div>
              ))}
              {!(data.experiences || []).length ? <p className="text-sm text-zinc-400">Add experience.</p> : null}
            </div>
          </section>

          {(data.projects || []).length ? (
            <section>
              <h2 className="font-semibold mb-2">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((p, i) => (
                  <div key={i} className="text-sm">
                    <div className="font-medium">{p.name || "Project"}</div>
                    {p.link ? (
                      <a href={p.link} className="text-blue-400 underline text-xs break-all" target="_blank" rel="noreferrer">
                        {p.link}
                      </a>
                    ) : null}
                    {p.description ? <p className="mt-1 leading-6 break-words">{p.description}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-4">
          <section>
            <h2 className="font-semibold mb-2">Education</h2>
            <div className="space-y-2 text-sm">
              {(data.education || []).map((e, i) => (
                <div key={i}>
                  <div className="font-medium">{e.level || "Title"}</div>
                  <div className="text-zinc-400">
                    {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                    {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                  </div>
                </div>
              ))}
              {!(data.education || []).length ? <p className="text-zinc-400">Add education.</p> : null}
            </div>
          </section>

          {skills.length ? (
            <section>
              <h2 className="font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-zinc-800 px-2 py-1 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
