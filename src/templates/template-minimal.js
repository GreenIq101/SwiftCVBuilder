export default function TemplateMinimal({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const hobbies = (data.hobbies || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="minimal text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900 rounded-md p-5 md:p-8 shadow-sm w-full max-w-3xl mx-auto">
      <header className="mb-3">
        <h1 className="text-2xl tracking-tight break-words">{data.name || "Your Name"}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
          {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
        </p>
      </header>

      {data.summary ? <p className="text-sm leading-6 mb-3 break-words">{data.summary}</p> : null}

      <section className="mb-3">
        <h2 className="text-lg font-semibold mb-2">Experience</h2>
        <div className="space-y-2">
          {(data.experiences || []).length ? (
            data.experiences.map((x, i) => (
              <div key={i} className="pl-4 border-l-4 border-primary">
                <div className="font-medium">{x.title || "Job Title"}</div>
                <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                </div>
                {x.description ? <p className="mt-1 text-sm break-words">{x.description}</p> : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Add your experience.</p>
          )}
        </div>
      </section>

      <section className="mb-3">
        <h2 className="text-lg font-semibold mb-2">Education</h2>
        <div className="space-y-1">
          {(data.education || []).map((e, i) => (
            <div key={i} className="text-sm">
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
        <section className="mb-3">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded border bg-zinc-100 dark:bg-zinc-800">
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {hobbies.length ? (
        <section>
          <h2 className="text-lg font-semibold mb-2">Hobbies</h2>
          <p className="text-sm break-words">{hobbies.join(", ")}</p>
        </section>
      ) : null}
    </div>
  )
}
