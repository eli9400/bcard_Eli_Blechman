// rafce
import React from "react";
import Babel from "../introduction/Babel";
import { Outlet } from "react-router-dom";

const Template = () => {
  return (
    <>
      <h1>Template</h1>
      <p>piii ani lo maain!!!</p>
      <Babel />
      <Outlet />
    </>
  );
};

export default Template;
