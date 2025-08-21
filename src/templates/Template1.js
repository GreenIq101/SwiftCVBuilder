import React from "react";

function Template1({ data }) {
  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>{data.name}</h1>
      <p>{data.email} | {data.phone}</p>
      <h3>Education</h3>
      <p>{data.education}</p>
      <h3>Experience</h3>
      <p>{data.experience}</p>
      <h3>Skills</h3>
      <p>{data.skills}</p>
    </div>
  );
}

export default Template1;
