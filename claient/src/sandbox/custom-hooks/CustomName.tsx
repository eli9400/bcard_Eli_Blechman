import React from "react";
import useName from "./useName";

const CustomName = () => {
  const { name, setName } = useName("");
  return (
    <>
      <p>{name}</p>
      <input type="text" onChange={(e) => setName(e.target.value)} />
    </>
  );
};

export default CustomName;
