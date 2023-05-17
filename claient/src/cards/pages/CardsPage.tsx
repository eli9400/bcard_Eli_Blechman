import React, { useEffect } from "react";

import PageHeader from "../../components/PageHeder";
import Container from "@mui/material/Container";

import CardFeedback from "../components/CardFeedback";
import useCards from "../hooks/useCards";

const CardsPage = () => {
  const { cards, isLoading, error, handleGetCards } = useCards();
  useEffect(() => {
    handleGetCards();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="Here you can find all types of business cards"
      />

      <CardFeedback idLoading={isLoading} error={error} cards={cards} />
    </Container>
  );
};

export default CardsPage;
