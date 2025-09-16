export default function TemplateEuropass({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  // Europass-inspired layout (clean header bar, clear sections)
  return (
    <div className="rounded border bg-white shadow-sm mx-auto" style={{maxWidth: "48rem"}}>
      <div className="p-4 text-white" style={{backgroundColor: "#0b5ed7"}}>
        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=64&width=64&query=profile%20photo"}
              alt="Profile"
              className="rounded-circle object-cover border border-white"
              style={{width: "64px", height: "64px"}}
            />
          ) : null}
          <div className="text-center text-md-start">
            <h1 className="h4 fw-bold mb-1">{data.name || "Your Name"}</h1>
            <p className="small opacity-75 mb-0">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
        </div>
        {data.summary ? <p className="mt-3 small opacity-90">{data.summary}</p> : null}
      </div>

      <div className="p-4">
        <section className="mb-4">
          <h2 className="h5 fw-semibold mb-3">Work Experience</h2>
          <div className="row g-3">
            {(data.experiences || []).length ? (
              (data.experiences || []).map((x, i) => (
                <div key={i} className="col-12">
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

        <section className="mb-4">
          <h2 className="h5 fw-semibold mb-3">Education and Training</h2>
          <div className="row g-2">
            {(data.education || []).map((e, i) => (
              <div key={i} className="col-12">
                <div className="small">
                  <div className="fw-medium">{e.level || "Qualification"}</div>
                  <div className="text-muted">
                    {e.organization || "Institution"} {e.startDate || e.endDate ? " • " : ""}
                    {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                  </div>
                </div>
              </div>
            ))}
            {!(data.education || []).length ? (
              <div className="col-12">
                <p className="text-muted small mb-0">Add education.</p>
              </div>
            ) : null}
          </div>
        </section>

        {skills.length ? (
          <section>
            <h2 className="h5 fw-semibold mb-3">Digital Skills</h2>
            <div className="d-flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="badge bg-light text-dark small">
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
