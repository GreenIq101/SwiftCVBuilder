import React from "react";

function Template2({ data }) {
  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#f5f5f5", padding: "20px" }}>
      <h1 style={{ color: "darkblue" }}>{data.name}</h1>
      <p>{data.email} | {data.phone}</p>
      <hr />
      <h3>Education</h3>
      <p>{data.education}</p>
      <h3>Experience</h3>
      <p>{data.experience}</p>
      <h3>Skills</h3>
      <p>{data.skills}</p>
    </div>
  );
}

export default Template2;
