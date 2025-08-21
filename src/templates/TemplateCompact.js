export default function TemplateCompact({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="text-sm leading-6 text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900 rounded-md p-5 md:p-8 shadow-sm w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xl font-semibold break-words">{data.name || "Your Name"}</div>
          <div className="text-zinc-600 dark:text-zinc-400 break-words">
            {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
          </div>
        </div>
        {data.photo ? (
          <img
            src={data.photo || "/placeholder.svg?height=56&width=56&query=profile%20photo"}
            alt="Profile"
            className="h-14 w-14 rounded-md object-cover border"
          />
        ) : null}
      </div>

      {data.summary ? <p className="mt-2 break-words">{data.summary}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        <section className="md:col-span-2">
          <h2 className="font-semibold">Experience</h2>
          <div className="space-y-2">
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
        <aside className="space-y-3">
          <section>
            <h3 className="font-semibold">Education</h3>
            <div className="space-y-1">
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
              <h3 className="font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="bg-zinc-100 dark:bg-zinc-800 rounded px-2 py-0.5 border">
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
