import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import NavItem from "../../layout/components/NavItem";
import { SANDBOX_ROUTES } from "../../routes/routesModel";
import { Outlet } from "react-router-dom";

const CustomHooksMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <NavItem
            label="custom name"
            to={SANDBOX_ROUTES.CUSTOM_NAME}
            color="black"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default CustomHooksMenu;
