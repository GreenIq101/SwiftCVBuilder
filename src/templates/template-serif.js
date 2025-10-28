import React from "react";

export default function TemplateSerif({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const styles = {
    wrapper: {
      fontFamily: `'Georgia', 'Times New Roman', serif`,
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      padding: "2rem",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
      maxWidth: "48rem",
      margin: "2rem auto",
      color: "#212529",
    },
    profileImg: {
      width: "80px",
      height: "80px",
      borderRadius: "0.5rem",
      objectFit: "cover",
      border: "1px solid #dee2e6",
    },
    sectionTitle: {
      fontSize: "1.125rem",
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
    <div style={styles.wrapper}>
      {/* Header */}
      <header className="d-flex flex-column flex-md-row align-items-center gap-3 mb-4">
        {data.photo && (
          <img
            src={
              data.photo ||
              "/placeholder.svg?height=80&width=80&query=profile%20photo"
            }
            alt="Profile"
            style={styles.profileImg}
          />
        )}

        <div className="text-center text-md-start">
          <h1 className="h4 fw-bold mb-1">
            {data.name || "Your Name"}
          </h1>
          <p className="text-muted small mb-0">
            {data.email || "Email"}{" "}
            {data.phone ? " • " : ""} {data.phone || ""}
          </p>
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <p className="small mb-4">{data.summary}</p>
      )}

      {/* Main Grid */}
      <div className="row g-4">
        {/* Experience Section */}
        <section className="col-md-8">
          <h2 style={styles.sectionTitle}>Experience</h2>
          <div className="row g-3">
            {(data.experiences || []).length ? (
              data.experiences.map((x, i) => (
                <div key={i} className="col-12">
                  <div className="h6 mb-1">
                    {x.title || "Job Title"}
                  </div>
                  <div className="text-muted small">
                    {x.company || "Company"}{" "}
                    {x.duration ? ` • ${x.duration}` : ""}
                  </div>
                  {x.description && (
                    <p className="mt-2 small mb-0">{x.description}</p>
                  )}
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
        </section>

        {/* Sidebar */}
        <aside className="col-md-4">
          {/* Education */}
          <section className="mb-4">
            <h3 style={styles.sectionTitle}>Education</h3>
            <div className="row g-2">
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
                <p className="text-muted small mb-0">Add education info.</p>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 style={styles.sectionTitle}>Skills</h3>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} style={styles.badge}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
