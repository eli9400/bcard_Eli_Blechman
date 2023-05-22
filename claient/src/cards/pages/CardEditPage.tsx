import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import Container from "@mui/material/Container";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import useForm from "../../forms/hooks/useForm";
import initialCreateCardObject from "../helpers/initialForms/initialCreateCardObject";
import cardEditSchema from "../models/joi/cardEditSchema";
import ROUTES from "../../routes/routesModel";
import mapCardToModel from "../helpers/normalizations/mapCardToModel";
import CardForm from "../components/CardForm";

const CardEditPage = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const { user } = useUser();
  const { handelUpdateCard, handleGetCard } = useCards();
  const { value, ...rest } = useForm(
    initialCreateCardObject,
    cardEditSchema,
    handelUpdateCard
  );
  const { data, errors } = value;
  const { handleChange, handleReset, onSubmit, setData, validateForm } = rest;

  useEffect(() => {
    if (cardId)
      handleGetCard(cardId).then((cardFromServer) => {
        if (user?._id !== cardFromServer!.user_id) return navigate(ROUTES.ROOT);
        const modeledCard = mapCardToModel(cardFromServer!);
        setData(modeledCard);
      });
  }, []);
  /* if (!user) return <Navigate replace to={ROUTES.ROOT} />; */

  return (
    <>
      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardForm
          title="edit card"
          onSubmit={onSubmit}
          onReset={handleReset}
          errors={errors}
          onFormChange={validateForm}
          onInputChange={handleChange}
          data={data}
        />
      </Container>
    </>
  );
};

export default CardEditPage;
