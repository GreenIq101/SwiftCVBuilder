export default function TemplateCompact({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="small text-dark bg-white rounded p-4 p-md-5 shadow-sm mx-auto" style={{maxWidth: "48rem", lineHeight: "1.5"}}>
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div>
          <div className="h5 fw-semibold mb-1">{data.name || "Your Name"}</div>
          <div className="text-muted small">
            {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
          </div>
        </div>
        {data.photo ? (
          <img
            src={data.photo || "/placeholder.svg?height=56&width=56&query=profile%20photo"}
            alt="Profile"
            className="rounded object-cover border"
            style={{width: "56px", height: "56px"}}
          />
        ) : null}
      </div>

      {data.summary ? <p className="mt-2 mb-0">{data.summary}</p> : null}

      <div className="row g-4 mt-3">
        <section className="col-md-8">
          <h2 className="h6 fw-semibold mb-3">Experience</h2>
          <div className="row g-2">
            {(data.experiences || []).map((x, i) => (
              <div key={i} className="col-12">
                <div className="fw-medium">{x.title || "Job Title"}</div>
                <div className="text-muted small">
                  {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                </div>
                {x.description ? <p className="mt-1 mb-0">{x.description}</p> : null}
              </div>
            ))}
          </div>
        </section>
        <aside className="col-md-4">
          <section className="mb-3">
            <h3 className="h6 fw-semibold mb-3">Education</h3>
            <div className="row g-1">
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
          {skills.length ? (
            <section>
              <h3 className="h6 fw-semibold mb-3">Skills</h3>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="badge bg-light text-dark small">
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
