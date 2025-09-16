import React from "react";

function Template1({ data }) {
  return (
    <div className="border p-3">
      <h1 className="h3 mb-2">{data.name || "Your Name"}</h1>
      <p className="text-muted mb-3">{data.email || "Email"} | {data.phone || "Phone"}</p>
      <h3 className="h5 mb-2">Education</h3>
      <p className="mb-3">{data.education || "Add your education"}</p>
      <h3 className="h5 mb-2">Experience</h3>
      <p className="mb-3">{data.experience || "Add your experience"}</p>
      <h3 className="h5 mb-2">Skills</h3>
      <p className="mb-0">{data.skills || "Add your skills"}</p>
    </div>
  );
}

export default Template1;
