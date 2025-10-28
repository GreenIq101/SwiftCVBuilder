import React from "react";

export default function TemplateEuropass({ data = {} }) {
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Inline styles for clean, Europass-inspired layout
  const styles = {
    wrapper: {
      maxWidth: "48rem",
      borderRadius: "0.75rem",
      border: "1px solid #dee2e6",
      backgroundColor: "#fff",
      boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
      margin: "0 auto",
    },
    header: {
      backgroundColor: "#0b5ed7",
      color: "#fff",
      padding: "1.5rem",
      borderTopLeftRadius: "0.75rem",
      borderTopRightRadius: "0.75rem",
    },
    photo: {
      width: "64px",
      height: "64px",
      objectFit: "cover",
    },
    badge: {
      fontSize: "0.8rem",
      padding: "0.4em 0.6em",
      backgroundColor: "#f8f9fa",
      color: "#212529",
      border: "1px solid #dee2e6",
      borderRadius: "0.5rem",
    },
    section: {
      marginBottom: "1.5rem",
    },
  };

  return (
    <div className="template-europass my-4" style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
          {data.photo && (
            <img
              src={
                data.photo ||
                "/placeholder.svg?height=64&width=64&query=profile%20photo"
              }
              alt="Profile"
              className="rounded-circle border border-light mb-3 mb-md-0 me-md-3"
              style={styles.photo}
            />
          )}
          <div>
            <h1 className="h4 fw-bold mb-1">{data.name || "Your Name"}</h1>
            <p className="small opacity-75 mb-0">
              {data.email || "Email"} {data.phone ? " • " : ""}{" "}
              {data.phone || ""}
            </p>
          </div>
        </div>
        {data.summary && (
          <p className="mt-3 small opacity-90">{data.summary}</p>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Work Experience */}
        <section style={styles.section}>
          <h2 className="h5 fw-semibold mb-3">Work Experience</h2>
          <div className="row g-3">
            {(data.experiences || []).length ? (
              (data.experiences || []).map((x, i) => (
                <div key={i} className="col-12">
                  <div className="fw-medium">{x.title || "Job Title"}</div>
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

        {/* Education Section */}
        <section style={styles.section}>
          <h2 className="h5 fw-semibold mb-3">Education and Training</h2>
          <div className="row g-2">
            {(data.education || []).length ? (
              (data.education || []).map((e, i) => (
                <div key={i} className="col-12">
                  <div className="small">
                    <div className="fw-medium">
                      {e.level || "Qualification"}
                    </div>
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

        {/* Digital Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="h5 fw-semibold mb-3">Digital Skills</h2>
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
