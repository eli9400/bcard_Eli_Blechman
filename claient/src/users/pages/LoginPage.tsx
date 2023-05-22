import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Container from "@mui/material/Container";

import Joi from "joi";
import useForm from "../../forms/hooks/useForm";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Button } from "@mui/material";
import loginSchema from "../models/joi/loginSchema";
import initialLoginForm from "../models/initialForms/initialLoginForm";
import useUsers from "../hook/useUsers";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    handleLogin,
    value: { user },
  } = useUsers();
  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );
  const { handleReset, onSubmit, validateForm, handleChange } = rest;
  const { errors, data } = value;

  if (user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Form
        title="Login"
        onSubmit={onSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        spacing={1}
        styles={{ maxWidth: "450px" }}
      >
        <Input
          label="press email"
          name="email"
          data={data}
          error={errors.email}
          onInputChange={handleChange}
        />
        <Input
          label="press password"
          name="password"
          data={data}
          error={errors.password}
          onInputChange={handleChange}
        />
        <Button
          onClick={() => {
            navigate(ROUTES.SIGNUP);
          }}
          variant="text"
        >
          register...
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
