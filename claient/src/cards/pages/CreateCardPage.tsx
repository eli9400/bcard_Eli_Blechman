import React from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialCreateCardObject from "../../users/models/initialForms/initialCreateCardObject";
import cardSchema from "../../users/models/joi/cardSchema";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Container from "@mui/material/Container";
import CardForm from "../components/CardForm";

const CreateCardPage = () => {
  const { handelCreateCard } = useCards();
  const { user } = useUser();
  const { value, ...rest } = useForm(
    initialCreateCardObject,
    cardSchema,
    handelCreateCard
  );
  const { data, errors } = value;
  const { handleChange, handleReset, onSubmit, validateForm } = rest;
  if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <Container>
      <CardForm
        title="create business card"
        data={data}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleChange}
        onReset={handleReset}
        onSubmit={onSubmit}
      ></CardForm>
    </Container>
  );
};

export default CreateCardPage;
