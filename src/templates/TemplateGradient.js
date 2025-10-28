export default function TemplateGradient({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const hobbies = (data.hobbies || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="bg-white rounded overflow-hidden shadow-lg mx-auto position-relative" style={{ maxWidth: "96rem" }}>
      {/* Animated Background */}
      <div
        className="position-absolute inset-0"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)",
        }}
      ></div>
      <div
        className="position-absolute inset-0"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.2))",
        }}
      ></div>

      {/* Floating Shapes */}
      <div
        className="position-absolute"
        style={{
          top: "40px",
          right: "40px",
          width: "80px",
          height: "80px",
          background: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "pulse 2s infinite",
        }}
      ></div>
      <div
        className="position-absolute"
        style={{
          bottom: "80px",
          left: "40px",
          width: "64px",
          height: "64px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "50%",
          filter: "blur(32px)",
          animation: "pulse 2s infinite 1s",
        }}
      ></div>
      <div
        className="position-absolute"
        style={{
          top: "50%",
          right: "80px",
          width: "48px",
          height: "48px",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "50%",
          filter: "blur(24px)",
          animation: "pulse 2s infinite 2s",
        }}
      ></div>

      {/* Header Section */}
      <div className="position-relative p-5 text-white">
        <div className="d-flex flex-column flex-lg-row align-items-center gap-5">
          {data.photo ? (
            <div className="position-relative">
              <div
                className="position-absolute inset-0 rounded-circle p-2"
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, #fcd34d, #f97316)",
                  animation: "spin 8s linear infinite",
                }}
              >
                <div className="bg-white rounded-circle" style={{ width: "128px", height: "128px" }}></div>
              </div>
              <img
                src={data.photo || "/placeholder.svg?height=120&width=120&query=profile%20photo"}
                alt="Profile"
                className="position-relative rounded-circle object-cover border border-white shadow-lg"
                style={{ width: "128px", height: "128px" }}
              />
              <div
                className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px", bottom: "-8px", right: "-8px" }}
              >
                <svg
                  className="text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ) : null}

          <div className="text-center text-lg-start">
            <h1 className="display-4 fw-black mb-4 text-white" style={{ letterSpacing: "-0.02em" }}>
              {data.name || "Your Name"}
            </h1>
            <div className="d-flex flex-column flex-sm-row align-items-center gap-4 text-white">
              <span
                className="d-flex align-items-center gap-3 px-4 py-2 rounded-pill"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <svg
                  className="text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {data.email || "Email"}
              </span>
              {data.phone && (
                <span
                  className="d-flex align-items-center gap-3 px-4 py-2 rounded-pill"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <svg
                    className="text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {data.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {data.summary ? (
          <div
            className="mt-5 p-4 rounded-3 border"
            style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)" }}
          >
            <p className="text-white text-center text-lg-start mb-0">{data.summary}</p>
          </div>
        ) : null}
      </div>

      {/* Main Content */}
      <div className="position-relative bg-white p-5">
        <div className="row g-5">
          {/* Left Column - Experience */}
          <div className="col-lg-6">
            <section className="row g-4">
              <div className="col-12">
                <div className="d-flex align-items-center gap-4 mb-5">
                  <div
                    className="rounded d-flex align-items-center justify-content-center flex-shrink-0 shadow"
                    style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #10b981, #14b8a6)" }}
                  >
                    <svg
                      className="text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="h3 fw-bold text-dark mb-1">Professional Experience</h2>
                    <p className="text-muted mb-0">Career journey and accomplishments</p>
                  </div>
                </div>
              </div>

              {(data.experiences || []).length ? (
                data.experiences.map((x, i) => (
                  <div key={i} className="col-12">
                    <div
                      className="rounded-3 p-4 border shadow-sm"
                      style={{
                        background: "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(20,184,166,0.05))",
                        borderColor: "#d1fae5",
                      }}
                    >
                      <div className="d-flex align-items-start gap-4">
                        <div
                          className="rounded d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                          style={{
                            width: "48px",
                            height: "48px",
                            background: "linear-gradient(135deg, #10b981, #14b8a6)",
                          }}
                        >
                          <svg
                            className="text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between mb-2">
                            <h3 className="h5 fw-bold text-dark mb-2 mb-lg-0">{x.title || "Job Title"}</h3>
                            <span className="badge text-dark px-3 py-2" style={{ background: "rgba(16,185,129,0.1)" }}>
                              {x.duration || "Duration"}
                            </span>
                          </div>
                          <p className="text-success fw-semibold mb-3">{x.company || "Company"}</p>
                          {x.description ? <p className="text-dark mb-0">{x.description}</p> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div
                    className="rounded-3 p-5 text-center border"
                    style={{ background: "rgba(16,185,129,0.05)", borderColor: "#d1fae5" }}
                  >
                    <svg
                      className="text-success mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ width: "64px", height: "64px", margin: "0 auto" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4"
                      />
                    </svg>
                    <p className="text-muted mb-0">
                      Share your professional experiences to highlight your career path.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Education & Skills */}
          <div className="col-lg-6">
            <div className="row g-4">
              {/* Education Section */}
              <div className="col-12">
                <div className="d-flex align-items-center gap-4 mb-5">
                  <div
                    className="rounded d-flex align-items-center justify-content-center flex-shrink-0 shadow"
                    style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
                  >
                    <svg
                      className="text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="h3 fw-bold text-dark mb-1">Education</h2>
                    <p className="text-muted mb-0">Academic qualifications</p>
                  </div>
                </div>

                <div className="row g-3">
                  {(data.education || []).length ? (
                    data.education.map((e, i) => (
                      <div key={i} className="col-12">
                        <div
                          className="rounded-3 p-4 border"
                          style={{
                            background: "linear-gradient(135deg, rgba(6,182,212,0.05), rgba(59,130,246,0.05))",
                            borderColor: "#cffafe",
                          }}
                        >
                          <div className="d-flex align-items-start gap-4">
                            <div
                              className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{
                                width: "48px",
                                height: "48px",
                                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                              }}
                            >
                              <svg
                                className="text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                style={{ width: "24px", height: "24px" }}
                              >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-grow-1">
                              <h3 className="fw-bold text-dark mb-1">{e.level || "Degree"}</h3>
                              <p className="text-info fw-semibold mb-1">{e.organization || "Institution"}</p>
                              <p className="text-muted small mb-0">
                                {[e.startDate, e.endDate].filter(Boolean).join(" - ") || "Duration"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div
                        className="rounded-3 p-5 text-center border"
                        style={{ background: "rgba(6,182,212,0.05)", borderColor: "#cffafe" }}
                      >
                        <svg
                          className="text-info mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ width: "64px", height: "64px", margin: "0 auto" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <p className="text-muted mb-0">
                          Add your educational background to showcase your qualifications.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              {skills.length ? (
                <div className="col-12">
                  <div className="d-flex align-items-center gap-4 mb-5">
                    <div
                      className="rounded d-flex align-items-center justify-content-center flex-shrink-0 shadow"
                      style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #f97316, #dc2626)" }}
                    >
                      <svg
                        className="text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ width: "28px", height: "28px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="h3 fw-bold text-dark mb-1">Skills & Expertise</h2>
                      <p className="text-muted mb-0">Technical and professional skills</p>
                    </div>
                  </div>

                  <div className="row g-3">
                    {skills.map((s, i) => (
                      <div key={i} className="col-6">
                        <div
                          className="rounded-3 p-4 text-center border"
                          style={{
                            background: "linear-gradient(135deg, rgba(249,115,22,0.05), rgba(220,38,38,0.05))",
                            borderColor: "#fed7aa",
                          }}
                        >
                          <span className="text-danger fw-bold">{s}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Projects Section */}
              {(data.projects || []).length ? (
                <div className="col-12">
                  <div className="d-flex align-items-center gap-4 mb-5">
                    <div
                      className="rounded d-flex align-items-center justify-content-center flex-shrink-0 shadow"
                      style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
                    >
                      <svg
                        className="text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ width: "28px", height: "28px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="h3 fw-bold text-dark mb-1">Featured Projects</h2>
                      <p className="text-muted mb-0">Notable work and achievements</p>
                    </div>
                  </div>

                  <div className="row g-3">
                    {data.projects.map((p, i) => (
                      <div key={i} className="col-12">
                        <div
                          className="rounded-3 p-4 border shadow-sm"
                          style={{
                            background: "linear-gradient(135deg, rgba(168,85,247,0.05), rgba(236,72,153,0.05))",
                            borderColor: "#e9d5ff",
                          }}
                        >
                          <h3 className="h5 fw-bold text-dark mb-2">{p.name || "Project"}</h3>
                          {p.link ? (
                            <a
                              href={p.link}
                              className="d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold mb-3"
                              style={{ color: "#a855f7" }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span>View Project</span>
                              <svg
                                className="text-decoration-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ width: "20px", height: "20px", color: "#a855f7" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          ) : null}
                          {p.description ? <p className="text-dark mb-0">{p.description}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
