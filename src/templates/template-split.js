export default function TemplateSplit({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="row g-4 mx-auto bg-white rounded p-4 p-md-5 shadow-sm" style={{maxWidth: "48rem"}}>
      <aside className="col-md-4 border rounded p-4 bg-light">
        <div className="d-flex align-items-center gap-3 mb-3">
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
              alt="Profile"
              className="rounded object-cover border"
              style={{width: "64px", height: "64px"}}
            />
          ) : null}
          <div>
            <h1 className="h5 fw-semibold mb-1">{data.name || "Your Name"}</h1>
            <p className="text-muted small mb-0">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
        </div>
        {data.summary ? <p className="small mb-0">{data.summary}</p> : null}

        {skills.length ? (
          <div className="mt-4">
            <h2 className="h6 fw-semibold mb-3">Skills</h2>
            <div className="d-flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="badge bg-light text-dark small">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </aside>

      <main className="col-md-8">
        <div className="mb-4">
          <section className="border rounded p-4 bg-white">
            <h2 className="h6 fw-semibold mb-3">Experience</h2>
            <div className="row g-2">
              {(data.experiences || []).map((x, i) => (
                <div key={i} className="col-12">
                  <div className="small">
                    <div className="fw-medium">{x.title || "Job Title"}</div>
                    <div className="text-muted">
                      {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                    </div>
                    {x.description ? <p className="mt-2 mb-0">{x.description}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mb-4">
          <section className="border rounded p-4 bg-white">
            <h2 className="h6 fw-semibold mb-3">Education</h2>
            <div className="row g-2">
              {(data.education || []).map((e, i) => (
                <div key={i} className="col-12">
                  <div className="small">
                    <div className="fw-medium">{e.level || "Title"}</div>
                    <div className="text-muted">
                      {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                      {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {(data.projects || []).length ? (
          <section className="border rounded p-4 bg-white">
            <h2 className="h6 fw-semibold mb-3">Projects</h2>
            <div className="row g-2">
              {data.projects.map((p, i) => (
                <div key={i} className="col-12">
                  <div className="small">
                    <div className="fw-medium">{p.name || "Project"}</div>
                    {p.link ? (
                      <a href={p.link} className="text-primary small text-decoration-underline" target="_blank" rel="noreferrer">
                        {p.link}
                      </a>
                    ) : null}
                    {p.description ? <p className="mt-2 mb-0">{p.description}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
