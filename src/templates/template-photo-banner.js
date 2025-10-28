import React from "react";

export default function TemplatePhotoBanner({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const styles = {
    wrapper: {
      borderRadius: "0.75rem",
      border: "1px solid #dee2e6",
      overflow: "hidden",
      backgroundColor: "#fff",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
      maxWidth: "60rem",
      margin: "0 auto",
    },
    banner: {
      height: "96px",
      background: "linear-gradient(90deg,#f97316,#ec4899)",
      width: "100%",
    },
    profileImg: {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #fff",
      position: "absolute",
      top: "-36px",
      left: "24px",
      backgroundColor: "#fff",
    },
    nameBlock: {
      marginLeft: "6rem",
    },
    sectionTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "0.75rem",
    },
    badge: {
      fontSize: "0.8rem",
      backgroundColor: "#f8f9fa",
      color: "#212529",
      border: "1px solid #dee2e6",
      borderRadius: "0.5rem",
      padding: "0.35em 0.6em",
    },
  };

  return (
    <div style={styles.wrapper} className="my-4">
      {/* Header Banner */}
      <div className="position-relative">
        <div style={styles.banner}></div>

        <div className="p-4 position-relative">
          <div className="d-flex align-items-center gap-3 position-relative">
            {data.photo && (
              <img
                src={
                  data.photo ||
                  "/placeholder.svg?height=72&width=72&query=profile%20photo"
                }
                alt="Profile"
                style={styles.profileImg}
              />
            )}

            <div style={styles.nameBlock}>
              <h1 className="h4 fw-bold mb-1">
                {data.name || "Your Name"}
              </h1>
              <p className="text-muted small mb-0">
                {data.email || "Email"}{" "}
                {data.phone ? " • " : ""} {data.phone || ""}
              </p>
            </div>
          </div>

          {data.summary && (
            <p className="mt-3 small mb-0">{data.summary}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="row g-4">
          {/* Main Section */}
          <section className="col-md-8">
            {/* Experience */}
            <div className="mb-4">
              <h2 style={styles.sectionTitle}>Experience</h2>
              <div className="row g-2">
                {(data.experiences || []).length ? (
                  data.experiences.map((x, i) => (
                    <div key={i} className="col-12">
                      <div className="small">
                        <div className="fw-medium">
                          {x.title || "Job Title"}
                        </div>
                        <div className="text-muted">
                          {x.company || "Company"}{" "}
                          {x.duration ? ` • ${x.duration}` : ""}
                        </div>
                        {x.description && (
                          <p className="mt-2 mb-0">{x.description}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="text-muted small mb-0">
                      Add your experience.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Projects */}
            {(data.projects || []).length > 0 && (
              <div>
                <h2 style={styles.sectionTitle}>Projects</h2>
                <div className="row g-2">
                  {data.projects.map((p, i) => (
                    <div key={i} className="col-12">
                      <div className="small">
                        <div className="fw-medium">
                          {p.name || "Project"}
                        </div>
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
            )}
          </section>

          {/* Sidebar */}
          <aside className="col-md-4">
            {/* Education */}
            <div className="mb-4">
              <h3 style={styles.sectionTitle}>Education</h3>
              <div className="row g-1">
                {(data.education || []).length ? (
                  data.education.map((e, i) => (
                    <div key={i} className="col-12">
                      <div className="small">
                        <div className="fw-medium">
                          {e.level || "Title"}
                        </div>
                        <div className="text-muted">
                          {e.organization || "Institution"}{" "}
                          {[e.startDate, e.endDate].filter(Boolean).length > 0 &&
                            " • "}
                          {[e.startDate, e.endDate]
                            .filter(Boolean)
                            .join(" - ")}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small mb-0">
                    Add education info.
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3 style={styles.sectionTitle}>Skills</h3>
                <div className="d-flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} style={styles.badge}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
