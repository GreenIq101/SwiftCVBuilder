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
    <div className="text-dark bg-white rounded p-4 p-md-5 shadow-sm mx-auto" style={{maxWidth: "48rem"}}>
      <header className="mb-3">
        <h1 className="h4 mb-2">{data.name || "Your Name"}</h1>
        <p className="text-muted small">
          {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
        </p>
      </header>

      {data.summary ? <p className="small mb-3">{data.summary}</p> : null}

      <section className="mb-3">
        <h2 className="h5 fw-semibold mb-3">Experience</h2>
        <div className="row g-2">
          {(data.experiences || []).length ? (
            data.experiences.map((x, i) => (
              <div key={i} className="col-12 ps-4 border-start border-primary border-4">
                <div className="fw-medium">{x.title || "Job Title"}</div>
                <div className="text-muted small">
                  {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                </div>
                {x.description ? <p className="mt-2 small mb-0">{x.description}</p> : null}
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-muted small mb-0">Add your experience.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mb-3">
        <h2 className="h5 fw-semibold mb-3">Education</h2>
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
        <section className="mb-3">
          <h2 className="h5 fw-semibold mb-3">Skills</h2>
          <div className="d-flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="badge bg-light text-dark small">
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {hobbies.length ? (
        <section>
          <h2 className="h5 fw-semibold mb-2">Hobbies</h2>
          <p className="small mb-0">{hobbies.join(", ")}</p>
        </section>
      ) : null}
    </div>
  )
}
