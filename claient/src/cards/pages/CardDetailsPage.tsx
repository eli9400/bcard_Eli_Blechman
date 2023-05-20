import React, { useEffect } from "react";
import Container from "@mui/material/Container";

import { useParams } from "react-router-dom";

import Card from "../components/card/Card";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import PageHeader from "../../components/PageHeder";
import { useUser } from "../../users/providers/UserProvider";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const { card, error, isLoading, handleGetCard, handleDeleteCard } =
    useCards();

  useEffect(() => {
    if (cardId) handleGetCard(cardId);
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;

  if (!isLoading && !card) return <p>No card to display...</p>;

  if (!isLoading && card && cardId)
    return (
      <Container>
        <PageHeader
          title="Business Details"
          subtitle="Here you can see details of the business"
        />
        <div>
          Details of card: {cardId}
          <Card card={card} />
        </div>
      </Container>
    );
  return null;
};

export default CardDetailsPage;
