import React, { useCallback, useEffect, useRef } from "react";
import useCards from "../hooks/useCards";
import PageHeader from "../../components/PageHeder";
import Container from "@mui/material/Container";
import CardFeedback from "../components/CardFeedback";
import { Await, Route, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
const FavCardsPage = () => {
  const { ...rest } = useCards();
  const {
    isLoading,
    error,
    cards,
    card,
    handleGetFavCards,
    handleDeleteCard,
    handleLikeCard,
  } = rest;
  const ref = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    handleGetFavCards();
  }, []);
  useEffect(() => {
    handleGetFavCards();
  }, [card?.likes]);

  const onDeleteCard = useCallback(async (cardId: string) => {
    console.log(cardId);

    await handleDeleteCard(cardId);
    await handleGetFavCards();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Favorite cards Page"
        subtitle="Here you can find all your favorite business cards"
      />

      <CardFeedback
        idLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={() => handleLikeCard(card!._id, card)}
      />
    </Container>
  );
};

export default FavCardsPage;
