import React from "react";

export default function TemplateSplit({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const styles = {
    wrapper: {
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      padding: "2rem",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
      maxWidth: "48rem",
      margin: "2rem auto",
    },
    sidebar: {
      backgroundColor: "#f8f9fa",
      borderRadius: "0.5rem",
      border: "1px solid #dee2e6",
      padding: "1.5rem",
    },
    sectionBox: {
      backgroundColor: "#fff",
      borderRadius: "0.5rem",
      border: "1px solid #dee2e6",
      padding: "1.5rem",
    },
    profileImg: {
      width: "64px",
      height: "64px",
      borderRadius: "0.5rem",
      objectFit: "cover",
      border: "1px solid #dee2e6",
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
    <div className="row g-4 mx-auto" style={styles.wrapper}>
      {/* Sidebar */}
      <aside className="col-md-4" style={styles.sidebar}>
        <div className="d-flex align-items-center gap-3 mb-3">
          {data.photo && (
            <img
              src={
                data.photo ||
                "/placeholder.svg?height=64&width=64&query=profile%20photo"
              }
              alt="Profile"
              style={styles.profileImg}
            />
          )}
          <div>
            <h1 className="h5 fw-semibold mb-1">
              {data.name || "Your Name"}
            </h1>
            <p className="text-muted small mb-0">
              {data.email || "Email"}{" "}
              {data.phone ? " • " : ""} {data.phone || ""}
            </p>
          </div>
        </div>

        {data.summary && (
          <p className="small mb-0">{data.summary}</p>
        )}

        {skills.length > 0 && (
          <div className="mt-4">
            <h2 style={styles.sectionTitle}>Skills</h2>
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

      {/* Main Content */}
      <main className="col-md-8">
        {/* Experience */}
        <section className="mb-4" style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          <div className="row g-2">
            {(data.experiences || []).length ? (
              data.experiences.map((x, i) => (
                <div key={i} className="col-12 small">
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
              ))
            ) : (
              <p className="text-muted small mb-0">
                Add your experience details.
              </p>
            )}
          </div>
        </section>

        {/* Education */}
        <section className="mb-4" style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Education</h2>
          <div className="row g-2">
            {(data.education || []).length ? (
              data.education.map((e, i) => (
                <div key={i} className="col-12 small">
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
              ))
            ) : (
              <p className="text-muted small mb-0">
                Add your education details.
              </p>
            )}
          </div>
        </section>

        {/* Projects */}
        {(data.projects || []).length > 0 && (
          <section style={styles.sectionBox}>
            <h2 style={styles.sectionTitle}>Projects</h2>
            <div className="row g-2">
              {data.projects.map((p, i) => (
                <div key={i} className="col-12 small">
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
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
