import React, { useEffect } from "react";

import PageHeader from "../../components/PageHeder";
import Container from "@mui/material/Container";

import CardFeedback from "../components/CardFeedback";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";

const CardsPage = () => {
  const { value, handleGetCards, handleDeleteCard } = useCards();
  const { isLoading, error, filteredCard } = value;
  const { user } = useUser();
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
        cards={filteredCard}
        onDelete={onDeleteCard}
        onLike={() => {}}
      />
    </Container>
  );
};

export default CardsPage;
