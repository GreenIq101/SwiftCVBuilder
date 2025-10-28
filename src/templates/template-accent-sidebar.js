import React from "react";

export default function TemplateAccentSidebar({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const styles = {
    container: {
      padding: "1.5rem 0",
    },
    sidebarHeader: {
      background: "linear-gradient(90deg, #c026d3, #ec4899, #ea580c)",
      color: "#fff",
      padding: "1.5rem",
      borderTopLeftRadius: "0.75rem",
      borderTopRightRadius: "0.75rem",
    },
    card: {
      borderRadius: "0.75rem",
      overflow: "hidden",
    },
    badge: {
      fontSize: "0.8rem",
      padding: "0.4em 0.6em",
    },
    responsiveImg: {
      width: "64px",
      height: "64px",
      objectFit: "cover",
    },
    section: {
      borderRadius: "0.75rem",
      border: "none",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
      marginBottom: "1.5rem",
    },
    cardBody: {
      padding: "1.5rem",
    },
  };

  return (
    <div className="container-fluid" style={styles.container}>
      <div className="row g-4">
        {/* Sidebar */}
        <aside className="col-md-4">
          <div className="card shadow-sm" style={styles.card}>
            <div style={styles.sidebarHeader}>
              <div className="d-flex align-items-center mb-3 flex-wrap text-center text-md-start">
                {data.photo && (
                  <img
                    src={
                      data.photo ||
                      "/placeholder.svg?height=64&width=64&query=profile%20photo"
                    }
                    alt="Profile"
                    className="rounded-circle border border-light me-md-3 mb-2 mb-md-0"
                    style={styles.responsiveImg}
                  />
                )}
                <div className="ms-md-0 ms-auto me-auto">
                  <h1 className="h5 fw-bold mb-1">
                    {data.name || "Your Name"}
                  </h1>
                  <p className="small opacity-75 mb-0">
                    {data.email || "Email"}
                    {data.phone ? " • " : ""} {data.phone || ""}
                  </p>
                </div>
              </div>
              {data.summary && (
                <p className="small opacity-90 mb-0 mt-2">{data.summary}</p>
              )}
            </div>

            {skills.length > 0 && (
              <div className="p-4">
                <h2 className="h6 fw-semibold mb-3">Skills</h2>
                <div className="d-flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="badge bg-secondary"
                      style={styles.badge}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-md-8">
          {/* Experience Section */}
          <section className="card" style={styles.section}>
            <div className="card-body" style={styles.cardBody}>
              <h2 className="h6 fw-semibold mb-3">Experience</h2>
              <div className="row g-3">
                {(data.experiences || []).map((x, i) => (
                  <div key={i} className="col-12">
                    <div className="small">
                      <div className="fw-medium">{x.title || "Job Title"}</div>
                      <div className="text-muted">
                        {x.company || "Company"}{" "}
                        {x.duration ? ` • ${x.duration}` : ""}
                      </div>
                      {x.description && (
                        <p className="mt-2 mb-0">{x.description}</p>
                      )}
                    </div>
                  </div>
                ))}
                {!(data.experiences || []).length && (
                  <div className="col-12">
                    <p className="text-muted small mb-0">
                      Add your experience.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="card" style={styles.section}>
            <div className="card-body" style={styles.cardBody}>
              <h2 className="h6 fw-semibold mb-3">Education</h2>
              <div className="row g-2">
                {(data.education || []).map((e, i) => (
                  <div key={i} className="col-12">
                    <div className="small">
                      <div className="fw-medium">{e.level || "Title"}</div>
                      <div className="text-muted">
                        {e.organization || "Institution"}{" "}
                        {[e.startDate, e.endDate].filter(Boolean).length > 0 &&
                          " • "}
                        {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                      </div>
                    </div>
                  </div>
                ))}
                {!(data.education || []).length && (
                  <div className="col-12">
                    <p className="text-muted small mb-0">Add education info.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          {(data.projects || []).length > 0 && (
            <section className="card" style={styles.section}>
              <div className="card-body" style={styles.cardBody}>
                <h2 className="h6 fw-semibold mb-3">Projects</h2>
                <div className="row g-3">
                  {data.projects.map((p, i) => (
                    <div key={i} className="col-12">
                      <div className="small">
                        <div className="fw-medium">{p.name || "Project"}</div>
                        {p.link && (
                          <a
                            href={p.link}
                            className="text-primary small text-decoration-underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {p.link}
                          </a>
                        )}
                        {p.description && (
                          <p className="mt-2 mb-0">{p.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
