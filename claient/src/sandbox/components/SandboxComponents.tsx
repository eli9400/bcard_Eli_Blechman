import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Outlet } from "react-router-dom";
import NavItem from "../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
const SandboxComponents = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <NavItem label="babel" to="babel" color="black" />
          <NavItem label="styles" to={SANDBOX_ROUTES.STYLES} color="black" />
          <NavItem
            label="string interpolation"
            to={SANDBOX_ROUTES.STRING_INTERPOLATION}
            color="black"
          />
          <NavItem
            label="template"
            to={SANDBOX_ROUTES.TEMPLATE}
            color="black"
          />
          <NavItem label="logic" to={SANDBOX_ROUTES.LOGIC} color="black" />
          <NavItem label="events" to={SANDBOX_ROUTES.EVENTS} color="black" />
          <NavItem
            label="Conditional"
            to={SANDBOX_ROUTES.CONDITIONAL}
            color="black"
          />
          <NavItem label="loops" to={SANDBOX_ROUTES.LOOPS} color="black" />
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default SandboxComponents;
