import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeder";

const LoginPage = () => {
  const user = false;
  if (user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <Container>
      <PageHeader
        title="Login Page"
        subtitle="In order to log in, fill out the form and click the submit button"
      />
    </Container>
  );
};

export default LoginPage;
