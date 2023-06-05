import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import NavItem from "../../../components/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {
  const { user } = useUser();
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem label="About" to={ROUTES.ABOUT} />
        {user && user.isBusiness && (
          <NavItem label="MY CARDS" to={ROUTES.MY_CARDS} />
        )}
        {user && <NavItem label="FAV CARDS" to={ROUTES.FAV_CARDS} />}
        {user && user.isAdmin && (
          <NavItem label="SANDBOX" to={ROUTES.SANDBOX} />
        )}
        {user?.isAdmin && <NavItem label="CRM" to={ROUTES.CRM} />}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
