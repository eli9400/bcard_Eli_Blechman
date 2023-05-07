import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../components/NavItem";
import ROUTES from "../../../../routes/routesModel";

const NotLogged = () => {
  return (
    <Box>
      <NavItem label="SIGNUP" to={ROUTES.SIGNUP}></NavItem>
      <NavItem label="LOGIN" to={ROUTES.LOGIN}></NavItem>
    </Box>
  );
};

export default NotLogged;
