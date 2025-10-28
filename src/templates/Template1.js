import React from "react";

export default function TemplateClassic({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const styles = {
    wrapper: {
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      border: "1px solid #dee2e6",
      padding: "2rem",
      maxWidth: "48rem",
      margin: "2rem auto",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
    },
    title: {
      fontSize: "1.75rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#6c757d",
      fontSize: "0.9rem",
      marginBottom: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1.1rem",
      fontWeight: 600,
      marginBottom: "0.75rem",
      borderBottom: "2px solid #dee2e6",
      paddingBottom: "0.25rem",
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
      <header>
        <h1 style={styles.title}>{data.name || "Your Name"}</h1>
        <p style={styles.subtitle}>
          {data.email || "Email"} {data.phone ? " • " : ""} {data.phone || "Phone"}
        </p>
      </header>

      {/* Education */}
      <section className="mb-4">
        <h2 style={styles.sectionTitle}>Education</h2>
        {Array.isArray(data.education) ? (
          data.education.length ? (
            data.education.map((e, i) => (
              <div key={i} className="mb-2 small">
                <div className="fw-medium">{e.level || "Degree / Title"}</div>
                <div className="text-muted">
                  {e.organization || "Institution"}{" "}
                  {[e.startDate, e.endDate].filter(Boolean).length > 0 && " • "}
                  {[e.startDate, e.endDate].filter(Boolean).join(" - ")}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted small mb-0">Add your education.</p>
          )
        ) : (
          <p className="small mb-0">{data.education || "Add your education"}</p>
        )}
      </section>

      {/* Experience */}
      <section className="mb-4">
        <h2 style={styles.sectionTitle}>Experience</h2>
        {Array.isArray(data.experiences) ? (
          data.experiences.length ? (
            data.experiences.map((x, i) => (
              <div key={i} className="mb-2 small">
                <div className="fw-medium">{x.title || "Job Title"}</div>
                <div className="text-muted">
                  {x.company || "Company"}{" "}
                  {x.duration ? `• ${x.duration}` : ""}
                </div>
                {x.description && (
                  <p className="mt-2 mb-0 small">{x.description}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted small mb-0">Add your experience.</p>
          )
        ) : (
          <p className="small mb-0">{data.experience || "Add your experience"}</p>
        )}
      </section>

      {/* Skills */}
      <section>
        <h2 style={styles.sectionTitle}>Skills</h2>
        {skills.length ? (
          <div className="d-flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} style={styles.badge}>
                {s}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted small mb-0">Add your skills.</p>
        )}
      </section>
    </div>
  );
}
