export default function TemplateTimeline({ data = {} }) {
    const skills = (data.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  
    return (
      <div className="text-zinc-800 dark:text-zinc-100">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=56&width=56&query=profile%20photo"}
              alt="Profile"
              className="h-14 w-14 rounded-md object-cover border"
            />
          ) : null}
        </header>
  
        {data.summary ? <p className="text-sm leading-6 mb-4">{data.summary}</p> : null}
  
        <section className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Work Timeline</h2>
          <div className="timeline">
            {(data.experiences || []).length ? (
              data.experiences.map((x, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="font-medium">{x.title || "Job Title"}</div>
                  <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                  </div>
                  {x.description ? <p className="mt-1 text-sm">{x.description}</p> : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Add your experience.</p>
            )}
          </div>
        </section>
  
        <div className="grid md:grid-cols-2 gap-4">
          <section>
            <h2 className="font-semibold text-lg mb-2">Education</h2>
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
              <h2 className="font-semibold text-lg mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-800 border rounded px-2 py-1">
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
  