import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hook/useUsers";
import initialRegisterForm from "../helpers/initialForms/initialSignUpForm";

import useForm from "../../forms/hooks/useForm";
import UserForm from "../component/UserForm";
import ROUTES from "../../routes/routesModel";
import mapUserToModel from "../helpers/normalizations/mapUserToModel";

import EditUserSchema from "../models/joi/userEditSchema";
import { Container } from "@mui/material";

const EditUserPage = () => {
  const { userId } = useParams();
  const { user } = useUser();

  const navigate = useNavigate();

  const { handelEditUser, handelGetUser } = useUsers();
  const { value, ...rest } = useForm(
    initialRegisterForm,
    EditUserSchema,
    handelEditUser
  );
  const { data, errors } = value;
  const { handleChange, handleReset, onSubmit, validateForm, setData } = rest;

  useEffect(() => {
    if (userId)
      handelGetUser(userId).then((userFromClient) => {
        if (userId !== userFromClient!._id) return navigate(ROUTES.ROOT);
        const modeledUser = mapUserToModel(userFromClient!);
        setData(modeledUser);
      });
  }, []);

  if (user?._id !== userId) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <UserForm
        data={data}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleChange}
        onReset={handleReset}
        onSubmit={onSubmit}
        title="Edit account"
      ></UserForm>
    </Container>
  );
};

export default EditUserPage;
