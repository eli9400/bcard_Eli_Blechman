import React, { useCallback, useEffect } from "react";
import useCards from "../hooks/useCards";
import PageHeader from "../../components/PageHeder";
import Container from "@mui/material/Container";
import CardFeedback from "../components/CardFeedback";

const FavCardsPage = () => {
  const { value, ...rest } = useCards();
  const { isLoading, error, filteredCard } = value;
  const { handleGetFavCards, handleDeleteCard } = rest;
  useEffect(() => {
    handleGetFavCards();
  }, []);

  const onDeleteCard = useCallback(
    async (cardId: string) => {
      await handleDeleteCard(cardId);
      await handleGetFavCards();
    },
    [handleDeleteCard]
  );
  const changeLikeStatus = useCallback(async () => {
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
        cards={filteredCard}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
      />
    </Container>
  );
};

export default FavCardsPage;
