import React from "react";

function Template2({ data }) {
  return (
    <div className="bg-light p-4" style={{fontFamily: "Arial"}}>
      <h1 className="text-primary h3 mb-2">{data.name || "Your Name"}</h1>
      <p className="text-muted mb-3">{data.email || "Email"} | {data.phone || "Phone"}</p>
      <hr className="mb-3" />
      <h3 className="h5 mb-2">Education</h3>
      <p className="mb-3">{data.education || "Add your education"}</p>
      <h3 className="h5 mb-2">Experience</h3>
      <p className="mb-3">{data.experience || "Add your experience"}</p>
      <h3 className="h5 mb-2">Skills</h3>
      <p className="mb-0">{data.skills || "Add your skills"}</p>
    </div>
  );
}

export default Template2;
