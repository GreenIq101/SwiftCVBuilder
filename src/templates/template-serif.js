export default function TemplateSerif({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="font-serif bg-white dark:bg-zinc-900 rounded-md p-5 md:p-8 shadow-sm w-full max-w-3xl mx-auto">
      <header className="flex flex-col md:flex-row items-center gap-4 mb-4">
        {data.photo ? (
          <img
            src={data.photo || "/placeholder.svg?height=80&width=80&query=profile%20photo"}
            alt="Profile"
            className="h-20 w-20 rounded-lg object-cover border"
          />
        ) : null}
        <div>
          <h1 className="text-2xl font-bold break-words">{data.name || "Your Name"}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
            {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
          </p>
        </div>
      </header>

      {data.summary ? <p className="text-sm leading-6 mb-3 break-words">{data.summary}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          <div className="space-y-3">
            {(data.experiences || []).map((x, i) => (
              <div key={i}>
                <div className="text-lg">{x.title || "Job Title"}</div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                </div>
                {x.description ? <p className="mt-1 break-words">{x.description}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
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

          {skills.length ? (
            <section>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 border rounded px-2 py-1">
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
