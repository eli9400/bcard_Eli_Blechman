import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import NavItem from "../../layout/components/NavItem";
import { Outlet } from "react-router-dom";
import { SANDBOX_ROUTES } from "../../routes/routesModel";

const DatatDisplayMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <NavItem
            label="mui button"
            to={SANDBOX_ROUTES.MUI_BUTTON}
            color="black"
          />
          <NavItem
            label="mui divider"
            to={SANDBOX_ROUTES.MUI_DIVIDER}
            color="black"
          />
          <NavItem
            label="mui typography"
            to={SANDBOX_ROUTES.MUI_TYPOGRAPHY}
            color="black"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default DatatDisplayMenu;
