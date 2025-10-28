import React from "react";

export default function TemplateTimeline({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const styles = {
    wrapper: {
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
      padding: "2rem",
      maxWidth: "48rem",
      margin: "2rem auto",
      color: "#212529",
    },
    photo: {
      width: "56px",
      height: "56px",
      borderRadius: "0.5rem",
      objectFit: "cover",
      border: "1px solid #dee2e6",
    },
    timeline: {
      position: "relative",
      paddingLeft: "1rem",
      borderLeft: "2px solid #dee2e6",
    },
    timelineDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#0d6efd",
      position: "absolute",
      left: "-7px",
      top: "6px",
    },
    badge: {
      fontSize: "0.8rem",
      backgroundColor: "#f8f9fa",
      color: "#212529",
      border: "1px solid #dee2e6",
      borderRadius: "0.5rem",
      padding: "0.35em 0.6em",
    },
    sectionTitle: {
      fontSize: "1.1rem",
      fontWeight: 600,
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h4 fw-bold mb-1">{data.name || "Your Name"}</h1>
          <p className="text-muted small mb-0">
            {data.email || "Email"}{" "}
            {data.phone ? " • " : ""} {data.phone || ""}
          </p>
        </div>
        {data.photo && (
          <img
            src={
              data.photo ||
              "/placeholder.svg?height=56&width=56&query=profile%20photo"
            }
            alt="Profile"
            style={styles.photo}
          />
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <p className="small mb-4">{data.summary}</p>
      )}

      {/* Timeline Section */}
      <section className="mb-4">
        <h2 style={styles.sectionTitle}>Work Timeline</h2>
        <div style={styles.timeline}>
          {(data.experiences || []).length ? (
            data.experiences.map((x, i) => (
              <div key={i} className="position-relative mb-3">
                <div style={styles.timelineDot}></div>
                <div className="ms-3">
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
            <p className="text-muted small mb-0">
              Add your experience details.
            </p>
          )}
        </div>
      </section>

      {/* Education + Skills */}
      <div className="row g-4">
        {/* Education */}
        <section className="col-md-6">
          <h2 style={styles.sectionTitle}>Education</h2>
          <div className="row g-2">
            {(data.education || []).length ? (
              data.education.map((e, i) => (
                <div key={i} className="col-12 small">
                  <div className="fw-medium">{e.level || "Title"}</div>
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

        {/* Skills */}
        {skills.length > 0 && (
          <section className="col-md-6">
            <h2 style={styles.sectionTitle}>Skills</h2>
            <div className="d-flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} style={styles.badge}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
