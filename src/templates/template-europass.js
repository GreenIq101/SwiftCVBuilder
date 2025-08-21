export default function TemplateEuropass({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  // Europass-inspired layout (clean header bar, clear sections)
  return (
    <div className="rounded-md overflow-hidden border bg-white dark:bg-zinc-900 shadow-sm w-full max-w-3xl mx-auto">
      <div className="p-5 text-white" style={{ background: "#0b5ed7" }}>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-white/60"
            />
          ) : null}
          <div>
            <h1 className="text-2xl font-bold tracking-tight break-words">{data.name || "Your Name"}</h1>
            <p className="text-xs opacity-90 break-words">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
        </div>
        {data.summary ? <p className="mt-3 text-sm opacity-95 break-words">{data.summary}</p> : null}
      </div>

      <div className="p-5">
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Work Experience</h2>
          <div className="space-y-3">
            {(data.experiences || []).length ? (
              (data.experiences || []).map((x, i) => (
                <div key={i}>
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

        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Education and Training</h2>
          <div className="space-y-2 text-sm">
            {(data.education || []).map((e, i) => (
              <div key={i}>
                <div className="font-medium">{e.level || "Qualification"}</div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                  {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                </div>
              </div>
            ))}
            {!(data.education || []).length ? <p className="text-sm text-zinc-600 dark:text-zinc-400">Add education.</p> : null}
          </div>
        </section>

        {skills.length ? (
          <section>
            <h2 className="font-semibold text-lg mb-2">Digital Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded border">
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
