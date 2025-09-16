export default function TemplateSerif({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="font-serif bg-white rounded p-4 p-md-5 shadow-sm mx-auto" style={{maxWidth: "48rem"}}>
      <header className="d-flex flex-column flex-md-row align-items-center gap-3 mb-4">
        {data.photo ? (
          <img
            src={data.photo || "/placeholder.svg?height=80&width=80&query=profile%20photo"}
            alt="Profile"
            className="rounded object-cover border"
            style={{width: "80px", height: "80px"}}
          />
        ) : null}
        <div className="text-center text-md-start">
          <h1 className="h4 fw-bold mb-1">{data.name || "Your Name"}</h1>
          <p className="text-muted small mb-0">
            {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
          </p>
        </div>
      </header>

      {data.summary ? <p className="small mb-3">{data.summary}</p> : null}

      <div className="row g-4">
        <section className="col-md-8">
          <h2 className="h5 fw-semibold mb-3">Experience</h2>
          <div className="row g-3">
            {(data.experiences || []).map((x, i) => (
              <div key={i} className="col-12">
                <div className="h6 mb-1">{x.title || "Job Title"}</div>
                <div className="text-muted small">
                  {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                </div>
                {x.description ? <p className="mt-2 small mb-0">{x.description}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <aside className="col-md-4">
          <section className="mb-4">
            <h3 className="h5 fw-semibold mb-3">Education</h3>
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

          {skills.length ? (
            <section>
              <h3 className="h5 fw-semibold mb-3">Skills</h3>
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
