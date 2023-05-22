import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import initialRegisterForm from "../helpers/initialForms/initialSignUpForm";
import registerSchemaForm from "../models/joi/signUpSchema";
import useUsers from "../hook/useUsers";
import UserForm from "../component/UserForm";

const SignUpPage = () => {
  const {
    value: { user },
    handelSignUp,
  } = useUsers();

  const { value, ...rest } = useForm(
    initialRegisterForm,
    registerSchemaForm,
    handelSignUp
  );
  const { data, errors } = value;
  const { handleChange, onSubmit, handleReset, validateForm } = rest;

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
      <UserForm
        data={data}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleChange}
        onReset={handleReset}
        onSubmit={onSubmit}
      />
    </Container>
  );
};

export default SignUpPage;
