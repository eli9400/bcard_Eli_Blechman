import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import NavItem from "../../layout/components/NavItem";
import { Outlet } from "react-router-dom";
import { SANDBOX_ROUTES } from "../../routes/routesModel";

const LayotMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <NavItem label="mui box" to={SANDBOX_ROUTES.MUI_BOX} color="black" />
          <NavItem
            label="mui container"
            to={SANDBOX_ROUTES.MUI_CONTAINER}
            color="black"
          />
          <NavItem
            label="mui grid"
            to={SANDBOX_ROUTES.MUI_GRID}
            color="black"
          />
          <NavItem
            label="mui stack"
            to={SANDBOX_ROUTES.MUI_STACK}
            color="black"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default LayotMenu;
