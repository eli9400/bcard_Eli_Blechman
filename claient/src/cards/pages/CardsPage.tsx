import React, { useEffect } from "react";

import PageHeader from "../../components/PageHeder";
import Container from "@mui/material/Container";

import CardFeedback from "../components/CardFeedback";
import useCards from "../hooks/useCards";

const CardsPage = () => {
  const { cards, isLoading, error, handleGetCards, handleDeleteCard } =
    useCards();

  useEffect(() => {
    handleGetCards();
  }, []);
  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };
  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="Here you can find all types of business cards"
      />

      <CardFeedback
        idLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={() => {}}
      />
    </Container>
  );
};

export default CardsPage;
