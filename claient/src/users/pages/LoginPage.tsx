import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Container from "@mui/material/Container";

import Joi from "joi";
import useForm from "../../forms/hooks/useForm";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Button } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const user = false;
  const initialLoginForm = {
    email: "",
    password: "",
  };
  const loginSchema = {
    email: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  };
  const handleLogin = (data: string) => {
    console.log(data);
    handleReset();
  };
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
        mt: 8,
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
