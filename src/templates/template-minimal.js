import React from "react";

export default function TemplateMinimal({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const hobbies = (data.hobbies || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const styles = {
    wrapper: {
      backgroundColor: "#fff",
      color: "#212529",
      borderRadius: "0.75rem",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
      padding: "2rem",
      maxWidth: "48rem",
      margin: "0 auto",
    },
    section: {
      marginBottom: "1.5rem",
    },
    badge: {
      fontSize: "0.8rem",
      backgroundColor: "#f8f9fa",
      color: "#212529",
      border: "1px solid #dee2e6",
      borderRadius: "0.5rem",
      padding: "0.4em 0.6em",
    },
    borderStart: {
      borderLeft: "4px solid #0d6efd",
      paddingLeft: "1rem",
    },
  };

  return (
    <div className="template-minimal my-4" style={styles.wrapper}>
      {/* Header */}
      <header style={styles.section}>
        <h1 className="h4 mb-2">{data.name || "Your Name"}</h1>
        <p className="text-muted small mb-0">
          {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || ""}
        </p>
      </header>

      {/* Summary */}
      {data.summary && (
        <p className="small mb-4" style={{ lineHeight: "1.6" }}>
          {data.summary}
        </p>
      )}

      {/* Experience */}
      <section style={styles.section}>
        <h2 className="h5 fw-semibold mb-3">Experience</h2>
        <div className="row g-2">
          {(data.experiences || []).length ? (
            data.experiences.map((x, i) => (
              <div key={i} className="col-12">
                <div style={styles.borderStart}>
                  <div className="fw-medium">{x.title || "Job Title"}</div>
                  <div className="text-muted small">
                    {x.company || "Company"}{" "}
                    {x.duration ? ` • ${x.duration}` : ""}
                  </div>
                  {x.description && (
                    <p className="mt-2 small mb-0">{x.description}</p>
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
      </section>

      {/* Education */}
      <section style={styles.section}>
        <h2 className="h5 fw-semibold mb-3">Education</h2>
        <div className="row g-1">
          {(data.education || []).length ? (
            data.education.map((e, i) => (
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
            ))
          ) : (
            <div className="col-12">
              <p className="text-muted small mb-0">Add education.</p>
            </div>
          )}
        </div>
      </section>

      {/* Skills */}
      {skills.length > 0 && (
        <section style={styles.section}>
          <h2 className="h5 fw-semibold mb-3">Skills</h2>
          <div className="d-flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} style={styles.badge}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section>
          <h2 className="h5 fw-semibold mb-2">Hobbies</h2>
          <p className="small mb-0">{hobbies.join(", ")}</p>
        </section>
      )}
    </div>
  );
}
