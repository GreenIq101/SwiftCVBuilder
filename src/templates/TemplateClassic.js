import React from "react";

export default function TemplateClassic({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const hobbies = (data.hobbies || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div
      className="bg-white text-dark rounded-lg shadow-lg overflow-hidden mx-auto"
      style={{
        maxWidth: "64rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        className="px-4 px-md-5 py-5 border-bottom border-4 border-primary"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
          {data.photo && (
            <img
              src={data.photo}
              alt="Profile"
              className="rounded border-4 border-white shadow-lg"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
          )}
          <div className="flex-grow-1">
            <h1 className="h2 fw-bold text-white mb-2">
              {data.name || "Your Name"}
            </h1>
            <div className="d-flex flex-wrap gap-3 text-light small">
              {data.email && (
                <span className="d-flex align-items-center gap-2">
                  <i className="bi bi-envelope text-info"></i>
                  {data.email}
                </span>
              )}
              {data.phone && (
                <span className="d-flex align-items-center gap-2">
                  <i className="bi bi-telephone text-info"></i>
                  {data.phone}
                </span>
              )}
            </div>
          </div>
        </div>
        {data.summary && (
          <p className="text-light mt-4 mb-0">{data.summary}</p>
        )}
      </header>

      {/* ================= BODY ================= */}
      <main className="px-4 px-md-5 py-5">
        <div className="row g-5">
          {/* ===== Left Column ===== */}
          <div className="col-lg-8">
            {/* EXPERIENCE */}
            {Array.isArray(data.experiences) && data.experiences.length > 0 && (
              <section className="mb-5">
                <h2 className="h4 fw-bold text-dark border-bottom border-3 border-primary pb-3 mb-4">
                  Professional Experience
                </h2>

                {data.experiences.map((x, i) => (
                  <div
                    key={i}
                    className="rounded p-4 mb-3 border-start border-4 border-primary"
                    style={{ background: "#f8f9fa" }}
                  >
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-2">
                      <div>
                        <h3 className="h5 fw-bold text-dark mb-1">
                          {x.title || "Job Title"}
                        </h3>
                        <p className="text-primary fw-semibold mb-0">
                          {x.company || "Company"}
                        </p>
                      </div>
                      <span className="badge bg-primary text-white small">
                        {x.duration || "Duration"}
                      </span>
                    </div>
                    {x.description && (
                      <p className="text-secondary mb-0 mt-2 small">
                        {x.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* PROJECTS */}
            {Array.isArray(data.projects) && data.projects.length > 0 && (
              <section className="mb-5">
                <h2 className="h4 fw-bold text-dark border-bottom border-3 border-success pb-3 mb-4">
                  Featured Projects
                </h2>

                <div className="row g-3">
                  {data.projects.map((p, i) => (
                    <div key={i} className="col-md-6">
                      <div
                        className="rounded p-4 border h-100"
                        style={{ background: "#f8f9fa" }}
                      >
                        <h3 className="h6 fw-bold text-dark mb-2">
                          {p.name || "Project"}
                        </h3>
                        {p.link && (
                          <a
                            href={p.link}
                            className="text-success small fw-semibold text-decoration-none d-inline-block mb-2"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Project →
                          </a>
                        )}
                        {p.description && (
                          <p className="text-secondary small mb-0">
                            {p.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ===== Right Column ===== */}
          <div className="col-lg-4">
            {/* EDUCATION */}
            {Array.isArray(data.education) && data.education.length > 0 && (
              <section className="mb-5">
                <h2 className="h5 fw-bold text-dark border-bottom border-3 border-info pb-3 mb-4">
                  Education
                </h2>

                {data.education.map((e, i) => (
                  <div
                    key={i}
                    className="rounded p-3 border-start border-4 border-info mb-2"
                    style={{ background: "#e7f3ff" }}
                  >
                    <h3 className="fw-semibold text-dark small mb-1">
                      {e.level || "Degree"}
                    </h3>
                    <p className="text-info fw-medium small mb-1">
                      {e.organization || "Institution"}
                    </p>
                    <p className="text-secondary small mb-0">
                      {[e.startDate, e.endDate].filter(Boolean).join(" - ") ||
                        "Duration"}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="mb-5">
                <h2 className="h5 fw-bold text-dark border-bottom border-3 border-warning pb-3 mb-4">
                  Skills
                </h2>

                <div className="d-flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="badge bg-warning text-dark small">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* HOBBIES */}
            {hobbies.length > 0 && (
              <section>
                <h2 className="h5 fw-bold text-dark border-bottom border-3 border-danger pb-3 mb-4">
                  Interests
                </h2>

                <div className="d-flex flex-wrap gap-2">
                  {hobbies.map((h, i) => (
                    <span key={i} className="badge bg-danger text-white small">
                      {h}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
