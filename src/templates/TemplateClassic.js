export default function TemplateClassic({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const hobbies = (data.hobbies || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="bg-white text-dark rounded shadow-lg overflow-hidden mx-auto position-relative" style={{maxWidth: "64rem"}}>
      {/* Decorative Header Shape */}
      <div className="position-absolute top-0 start-0 w-100" style={{height: "128px", background: "linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)"}}></div>
      <div className="position-absolute top-0 start-0 w-100 opacity-10" style={{height: "128px"}}>
        <svg viewBox="0 0 400 100" className="w-100 h-100">
          <path d="M0,0 L400,0 L400,60 Q300,100 200,60 Q100,100 0,60 Z" fill="white"/>
        </svg>
      </div>

      {/* Header Section */}
      <div className="position-relative pt-5 pb-4 px-4 px-md-5">
        <div className="d-flex flex-column flex-md-row align-items-center gap-4">
          {data.photo ? (
            <div className="position-relative">
              <img
                src={data.photo || "/placeholder.svg?height=100&width=100&query=profile%20photo"}
                alt="Profile"
                className="rounded-circle object-cover border border-white shadow"
                style={{width: "96px", height: "96px"}}
              />
              <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white" style={{width: "32px", height: "32px"}}></div>
            </div>
          ) : null}
          <div className="text-center text-md-start">
            <h1 className="h2 h1-md fw-bold text-white mb-2">
              {data.name || "Your Name"}
            </h1>
            <p className="text-info">
              {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
        </div>
        {data.summary ? (
          <div className="mt-4 bg-white bg-opacity-10 rounded p-3">
            <p className="text-white text-center text-md-start">
              {data.summary}
            </p>
          </div>
        ) : null}
      </div>

      {/* Main Content */}
      <div className="px-4 px-md-5 pb-4">
        <div className="row g-4">

          {/* Left Column - Experience & Projects */}
          <div className="col-lg-8">

            {/* Experience Section */}
            <section className="position-relative mb-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary rounded d-flex align-items-center justify-content-center" style={{width: "32px", height: "32px"}}>
                  <svg className="text-white" fill="currentColor" viewBox="0 0 20 20" style={{width: "16px", height: "16px"}}>
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h2 className="h4 fw-bold text-dark mb-0">Professional Experience</h2>
              </div>

              <div className="row g-3">
                {(data.experiences || []).length ? (
                  data.experiences.map((x, i) => (
                    <div key={i} className="col-12 bg-light rounded p-4 border-start border-primary border-4 position-relative">
                      <div className="position-absolute top-50 start-0 translate-middle bg-primary rounded-circle border border-white" style={{width: "24px", height: "24px"}}></div>
                      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between mb-2 ms-4">
                        <h3 className="h5 fw-semibold text-dark mb-0">{x.title || "Job Title"}</h3>
                        <span className="badge bg-primary small mt-2 mt-md-0">
                          {x.duration || "Duration"}
                        </span>
                      </div>
                      <p className="text-muted mb-3 fw-medium ms-4">{x.company || "Company"}</p>
                      {x.description ? (
                        <p className="text-secondary ms-4">{x.description}</p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="col-12 bg-light rounded p-4 text-center">
                    <p className="text-muted mb-0">Add your professional experience to showcase your career journey.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Projects Section */}
            {(data.projects || []).length ? (
              <section>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-info rounded d-flex align-items-center justify-content-center" style={{width: "32px", height: "32px"}}>
                    <svg className="text-white" fill="currentColor" viewBox="0 0 20 20" style={{width: "16px", height: "16px"}}>
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h2 className="h4 fw-bold text-dark mb-0">Key Projects</h2>
                </div>

                <div className="row g-3">
                  {data.projects.map((p, i) => (
                    <div key={i} className="col-md-6">
                      <div className="bg-light rounded p-4 border">
                        <h3 className="h6 fw-semibold text-dark mb-2">{p.name || "Project"}</h3>
                        {p.link ? (
                          <a href={p.link} className="text-primary small text-decoration-underline mb-2 d-inline-block" target="_blank" rel="noreferrer">
                            View Project →
                          </a>
                        ) : null}
                        {p.description ? (
                          <p className="text-muted small mb-0">{p.description}</p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* Right Column - Education & Skills */}
          <div className="col-lg-4">

            {/* Education Section */}
            <section className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-success rounded d-flex align-items-center justify-content-center" style={{width: "32px", height: "32px"}}>
                  <svg className="text-white" fill="currentColor" viewBox="0 0 20 20" style={{width: "16px", height: "16px"}}>
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h2 className="h4 fw-bold text-dark mb-0">Education</h2>
              </div>

              <div className="row g-3">
                {(data.education || []).length ? (
                  data.education.map((e, i) => (
                    <div key={i} className="col-12 bg-success bg-opacity-10 rounded p-3 border border-success">
                      <h3 className="fw-semibold text-dark mb-1 small">{e.level || "Degree"}</h3>
                      <p className="text-success fw-medium small mb-1">{e.organization || "Institution"}</p>
                      <p className="text-muted small mb-0">
                        {[e.startDate, e.endDate].filter(Boolean).join(" - ") || "Duration"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-12 bg-success bg-opacity-10 rounded p-3 border border-success text-center">
                    <p className="text-muted small mb-0">Add your educational background.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Skills Section */}
            {skills.length ? (
              <section className="mb-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-warning rounded d-flex align-items-center justify-content-center" style={{width: "32px", height: "32px"}}>
                    <svg className="text-white" fill="currentColor" viewBox="0 0 20 20" style={{width: "16px", height: "16px"}}>
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h2 className="h4 fw-bold text-dark mb-0">Skills & Expertise</h2>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="badge bg-warning text-dark">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Hobbies Section */}
            {hobbies.length ? (
              <section>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-danger rounded d-flex align-items-center justify-content-center" style={{width: "32px", height: "32px"}}>
                    <svg className="text-white" fill="currentColor" viewBox="0 0 20 20" style={{width: "16px", height: "16px"}}>
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h2 className="h4 fw-bold text-dark mb-0">Interests</h2>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {hobbies.map((h, i) => (
                    <span key={i} className="badge bg-danger">
                      {h}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
