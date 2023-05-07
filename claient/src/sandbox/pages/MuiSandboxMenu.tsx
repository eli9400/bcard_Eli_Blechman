import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import NavItem from "../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
import { Outlet } from "react-router-dom";

const MuiSandboxMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <NavItem
            label="data-display"
            to={SANDBOX_ROUTES.DATA_DISPLAY}
            color="black"
          />
          <NavItem label="layout" to={SANDBOX_ROUTES.LAYOUT} color="black" />
          <NavItem
            label="navigation's"
            to={SANDBOX_ROUTES.NAVIGATION}
            color="black"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default MuiSandboxMenu;
