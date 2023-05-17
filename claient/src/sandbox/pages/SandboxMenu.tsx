import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React from "react";
import NavItem from "../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
import { Outlet } from "react-router-dom";

const SandboxMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <NavItem
            label="components"
            to={SANDBOX_ROUTES.COMPONENT}
            color="black"
          />
          <NavItem
            label="custom hooks"
            to={SANDBOX_ROUTES.CUSTOM}
            color="black"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default SandboxMenu;
