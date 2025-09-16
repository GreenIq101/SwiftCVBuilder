export default function TemplateTimeline({ data = {} }) {
    const skills = (data.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    return (
      <div className="text-dark">
        <header className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h4 fw-bold mb-1">{data.name || "Your Name"}</h1>
            <p className="text-muted small mb-0">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
          {data.photo ? (
            <img
              src={data.photo || "/placeholder.svg?height=56&width=56&query=profile%20photo"}
              alt="Profile"
              className="rounded object-cover border"
              style={{width: "56px", height: "56px"}}
            />
          ) : null}
        </header>

        {data.summary ? <p className="small mb-4">{data.summary}</p> : null}

        <section className="mb-4">
          <h2 className="h5 fw-semibold mb-3">Work Timeline</h2>
          <div className="timeline">
            {(data.experiences || []).length ? (
              data.experiences.map((x, i) => (
                <div key={i} className="timeline-item position-relative mb-3">
                  <div className="timeline-dot position-absolute bg-primary rounded-circle" style={{width: "12px", height: "12px", left: "-6px", top: "6px"}}></div>
                  <div className="ms-4">
                    <div className="fw-medium">{x.title || "Job Title"}</div>
                    <div className="text-muted small">
                      {x.company || "Company"} {x.duration ? " • " : ""} {x.duration}
                    </div>
                    {x.description ? <p className="mt-2 small mb-0">{x.description}</p> : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted small mb-0">Add your experience.</p>
            )}
          </div>
        </section>

        <div className="row g-4">
          <section className="col-md-6">
            <h2 className="h5 fw-semibold mb-3">Education</h2>
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
            <section className="col-md-6">
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
        </div>
      </div>
    )
  }
  