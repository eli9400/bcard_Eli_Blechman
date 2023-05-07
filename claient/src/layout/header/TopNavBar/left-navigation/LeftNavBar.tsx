import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavItem from "../../../components/NavItem";
import ROUTES from "../../../../routes/routesModel";

const LeftNavBar = () => {
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem label="About" to={ROUTES.ABOUT} />
        <NavItem label="MY CARDS" to={ROUTES.MY_CARDS} />
        <NavItem label="FAV CARDS" to={ROUTES.FAV_CARDS} />
        <NavItem label="SANDBOX" to={ROUTES.SANDBOX} />
      </Box>
    </Box>
  );
};

export default LeftNavBar;
