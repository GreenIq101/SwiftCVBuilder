export default function TemplatePhotoBanner({ data = {} }) {
    const skills = (data.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  
    return (
      <div className="rounded-md overflow-hidden border">
        <div className="relative">
          <div className="h-24 w-full" style={{ background: "linear-gradient(90deg,#f97316,#ec4899)" }} />
          <div className="p-5">
            <div className="flex items-center gap-4">
              {data.photo ? (
                <img
                  src={data.photo || "/placeholder.svg?height=72&width=72&query=profile%20photo"}
                  alt="Profile"
                  className="h-18 w-18 rounded-full object-cover ring-4 ring-white -mt-12"
                  style={{ height: 72, width: 72 }}
                />
              ) : null}
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
                <p className="text-xs text-zinc-600">
                  {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
                </p>
              </div>
            </div>
            {data.summary ? <p className="mt-3 text-sm">{data.summary}</p> : null}
          </div>
        </div>
  
        <div className="p-5 grid md:grid-cols-3 gap-5">
          <section className="md:col-span-2 space-y-3">
            <div>
              <h2 className="font-semibold mb-1.5">Experience</h2>
              <div className="space-y-2 text-sm">
                {(data.experiences || []).map((x, i) => (
                  <div key={i}>
                    <div className="font-medium">{x.title || "Job Title"}</div>
                    <div className="text-zinc-600">
                      {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                    </div>
                    {x.description ? <p className="mt-1">{x.description}</p> : null}
                  </div>
                ))}
              </div>
            </div>
  
            {(data.projects || []).length ? (
              <div>
                <h2 className="font-semibold mb-1.5">Projects</h2>
                <div className="space-y-2 text-sm">
                  {data.projects.map((p, i) => (
                    <div key={i}>
                      <div className="font-medium">{p.name || "Project"}</div>
                      {p.link ? (
                        <a href={p.link} className="text-primary underline text-xs" target="_blank" rel="noreferrer">
                          {p.link}
                        </a>
                      ) : null}
                      {p.description ? <p className="mt-1">{p.description}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
  
          <aside className="space-y-3">
            <div>
              <h3 className="font-semibold mb-1.5">Education</h3>
              <div className="space-y-1 text-sm">
                {(data.education || []).map((e, i) => (
                  <div key={i}>
                    <div className="font-medium">{e.level || "Title"}</div>
                    <div className="text-zinc-600">
                      {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                      {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {skills.length ? (
              <div>
                <h3 className="font-semibold mb-1.5">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="text-xs bg-zinc-100 border rounded px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    )
  }
  