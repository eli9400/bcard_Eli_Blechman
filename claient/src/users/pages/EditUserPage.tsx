import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hook/useUsers";
import initialRegisterForm from "../helpers/initialForms/initialSignUpForm";

import useForm from "../../forms/hooks/useForm";
import UserForm from "../component/UserForm";
import ROUTES from "../../routes/routesModel";
import mapUserToModel from "../helpers/normalizations/mapUserToModel";
import { UserFromClient } from "../models/types/userTypes";
import EditUserSchema from "../models/joi/userEditSchema";

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { handelEditUser, handelGetUser, userData } = useUsers();
  const { value, ...rest } = useForm(
    initialRegisterForm,
    EditUserSchema,
    handelEditUser
  );
  const { data, errors } = value;
  const { handleChange, handleReset, onSubmit, validateForm, setData } = rest;
  /*   useEffect(() => {
    console.log(user?._id);
    console.log(userId);

    if (user?._id !== userId) return navigate(ROUTES.ROOT);
    handelGetUser(user);
    if (userData) setData(userData);
    console.log(data);
  }, []); */

  useEffect(() => {
    if (userId)
      handelGetUser(userId).then((userFromClient) => {
        console.log(userId);
        console.log(userFromClient?._id);

        if (userId !== userFromClient!._id) return navigate(ROUTES.ROOT);
        const modeledUser = mapUserToModel(userFromClient!);
        setData(modeledUser);
      });
  }, []);

  /* if (!user) return <Navigate replace to={ROUTES.ROOT} />; */
  return (
    <UserForm
      data={data}
      errors={errors}
      onFormChange={validateForm}
      onInputChange={handleChange}
      onReset={handleReset}
      onSubmit={onSubmit}
      title="Edit account"
    ></UserForm>
  );
};

export default EditUserPage;
