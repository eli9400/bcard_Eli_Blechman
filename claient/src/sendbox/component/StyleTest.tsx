import React, { CSSProperties } from "react";
import "./styletest.css";

const StyleTest = () => {
  const purple: CSSProperties = {
    color: "red",
    background: "purple",
  };
  let bool = true;
  /*  bool = false; */
  return (
    <>
      <h1 style={{ background: "yellow" }}>title</h1>
      <h2 style={purple}>subtitle</h2>
      <hr />
      <p className="par">paragraph</p>
      <span style={{ backgroundColor: bool ? "green" : "blue" }}>SPAN</span>
    </>
  );
};

export default StyleTest;
