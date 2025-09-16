export default function TemplatePhotoBanner({ data = {} }) {
    const skills = (data.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    return (
      <div className="rounded border overflow-hidden">
        <div className="position-relative">
          <div className="w-100" style={{height: "96px", background: "linear-gradient(90deg,#f97316,#ec4899)"}}></div>
          <div className="p-4">
            <div className="d-flex align-items-center gap-3">
              {data.photo ? (
                <img
                  src={data.photo || "/placeholder.svg?height=72&width=72&query=profile%20photo"}
                  alt="Profile"
                  className="rounded-circle object-cover border border-white position-absolute"
                  style={{width: "72px", height: "72px", top: "-36px", left: "24px"}}
                />
              ) : null}
              <div className="ms-5 ms-md-0">
                <h1 className="h4 fw-bold mb-1">{data.name || "Your Name"}</h1>
                <p className="text-muted small mb-0">
                  {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
                </p>
              </div>
            </div>
            {data.summary ? <p className="mt-3 small">{data.summary}</p> : null}
          </div>
        </div>

        <div className="p-4">
          <div className="row g-4">
            <section className="col-md-8">
              <div className="mb-4">
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
              </div>

              {(data.projects || []).length ? (
                <div>
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
                </div>
              ) : null}
            </section>

            <aside className="col-md-4">
              <div className="mb-4">
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
              </div>

              {skills.length ? (
                <div>
                  <h3 className="h6 fw-semibold mb-3">Skills</h3>
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
          </div>
        </div>
      </div>
    )
  }
  