import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar } from "@mui/material";
import NavItem from "../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
import { Outlet } from "react-router-dom";

const ComponentMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <NavItem
            label="SandboxComponents"
            to={SANDBOX_ROUTES.SANDBOX_COMPONENT}
            color="black"
          />
          <NavItem
            label="mui SandboxComponents"
            to={SANDBOX_ROUTES.MUI_COMPONENT}
            color="black"
          />
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default ComponentMenu;
