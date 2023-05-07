import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React from "react";
import NavItem from "../../layout/components/NavItem";
import { Outlet } from "react-router-dom";
import { SANDBOX_ROUTES } from "../../routes/routesModel";

const EventsMenu = () => {
  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <NavItem label="onclick" to={SANDBOX_ROUTES.ONCLICK} color="black" />
          <NavItem
            label="raising-events"
            to={SANDBOX_ROUTES.RAISING_EVENTS}
            color="black"
          />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default EventsMenu;
