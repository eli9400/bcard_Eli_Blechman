/* import React, { useCallback, useEffect, useState } from "react";
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
import { useSnack } from "../../providers/SnackbarProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const snack = useSnack();
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
  const [loginAttempts, setLoginAttempts] = useState<number>(
    parseInt(localStorage.getItem("loginAttempts") || "0")
  );
  const [lastFailedLoginTime, setLastFailedLoginTime] = useState<number>(
    parseInt(localStorage.getItem("lastFailedLoginTime") || "0")
  );

  useEffect(() => {
    if (loginAttempts >= 3) {
      const lockDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const currentTime = Date.now();

      if (currentTime - lastFailedLoginTime <= lockDuration) {
        snack(
          "error",
          "Your account is locked. Please try again after 24 hours."
        );
        return;
      }

      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("lastFailedLoginTime");
    }
  }, [loginAttempts, lastFailedLoginTime, snack]);

  const handleLoginFormSubmit = useCallback(async () => {
    await onSubmit();

    if (Object.keys(errors).length === 0) {
      try {
        await handleLogin(data);
      } catch (error) {
        setLoginAttempts((prevAttempts) => prevAttempts + 1);
        setLastFailedLoginTime(Date.now());

        if (loginAttempts === 2) {
          snack(
            "error",
            "You have one last attempt left before your account is blocked for 24 hours!!!"
          );
        }

        if (loginAttempts >= 3) {
          localStorage.setItem("loginAttempts", "3");
          localStorage.setItem("lastFailedLoginTime", Date.now().toString());
        }
      }
    }
  }, [onSubmit, handleLogin, data, errors, loginAttempts, snack]);

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
        onSubmit={handleLoginFormSubmit}
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

 */

import React, { useCallback, useEffect, useState } from "react";
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
import { useSnack } from "../../providers/SnackbarProvider";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const snack = useSnack();
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
  const [userLoginAttempts, setUserLoginAttempts] = useState<
    Record<string, number>
  >(JSON.parse(localStorage.getItem("loginAttempts") || "{}"));
  const [userLastFailedLoginTimes, setUserLastFailedLoginTimes] = useState<
    Record<string, number>
  >(JSON.parse(localStorage.getItem("lastFailedLoginTimes") || "{}"));

  useEffect(() => {
    localStorage.setItem("loginAttempts", JSON.stringify(userLoginAttempts));
    localStorage.setItem(
      "lastFailedLoginTimes",
      JSON.stringify(userLastFailedLoginTimes)
    );
  }, [userLoginAttempts, userLastFailedLoginTimes]);

  const handleLoginFormSubmit = useCallback(async () => {
    const loginAttempts = userLoginAttempts[data.email] || 0;
    const lastFailedLoginTime = userLastFailedLoginTimes[data.email] || 0;

    if (loginAttempts >= 5) {
      const lockDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const currentTime = Date.now();

      if (currentTime - lastFailedLoginTime <= lockDuration) {
        snack(
          "error",
          "Your account is locked. Please try again after 24 hours."
        );
        return;
      } else {
        // If lock duration has passed, reset login attempts and last failed login time for the user
        setUserLoginAttempts((prevAttempts) => {
          const updatedAttempts = { ...prevAttempts };
          delete updatedAttempts[data.email];
          return updatedAttempts;
        });
        setUserLastFailedLoginTimes((prevTimes) => {
          const updatedTimes = { ...prevTimes };
          delete updatedTimes[data.email];
          return updatedTimes;
        });
      }
    }

    await onSubmit();

    if (Object.keys(errors).length === 0) {
      try {
        await handleLogin(data);
      } catch (error) {
        setUserLoginAttempts((prevAttempts) => ({
          ...prevAttempts,
          [data.email]: (prevAttempts[data.email] || 0) + 1,
        }));
        setUserLastFailedLoginTimes((prevTimes) => ({
          ...prevTimes,
          [data.email]: Date.now(),
        }));

        const currentLoginAttempts = userLoginAttempts[data.email] || 0;

        if (currentLoginAttempts === 4) {
          snack(
            "error",
            "You have one last attempt left before your account is locked for 24 hours!!!"
          );
        }

        if (currentLoginAttempts >= 5) {
          setUserLoginAttempts((prevAttempts) => ({
            ...prevAttempts,
            [data.email]: 5,
          }));
          setUserLastFailedLoginTimes((prevTimes) => ({
            ...prevTimes,
            [data.email]: Date.now(),
          }));
        }
      }
    }
  }, [
    onSubmit,
    handleLogin,
    data,
    errors,
    snack,
    userLoginAttempts,
    userLastFailedLoginTimes,
  ]);

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
        onSubmit={handleLoginFormSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        spacing={1}
        styles={{ maxWidth: "450px" }}
      >
        <Input
          label="Press email"
          name="email"
          data={data}
          error={errors.email}
          onInputChange={handleChange}
        />
        <Input
          label="Press password"
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
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
