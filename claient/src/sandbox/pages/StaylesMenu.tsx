import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React from "react";
import NavItem from "../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
import { Outlet } from "react-router-dom";

const StaylesMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <NavItem
            label="Styles module"
            to={SANDBOX_ROUTES.STYLE_MODULE}
            color="black"
          />
          <NavItem
            label="Styles 2"
            to={SANDBOX_ROUTES.STYLES_2}
            color="black"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default StaylesMenu;
