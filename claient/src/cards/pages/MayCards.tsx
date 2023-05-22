import React, { useEffect } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";

import PageHeader from "../../components/PageHeder";

import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardFeedback from "../components/CardFeedback";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const MayCards = () => {
  const { user } = useUser();
  const {
    cards,
    error,
    isLoading,
    handleGetMyCards,
    handleDeleteCard,
    handleLikeCard,
  } = useCards();
  const navigate = useNavigate();
  useEffect(() => {
    handleGetMyCards();
  }, []);
  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetMyCards;
  };
  if (!user || !user.isBusiness) {
    return <Navigate replace to={ROUTES.ROOT} />;
  }
  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <PageHeader
        title="My CARDS page"
        subtitle="Here you can find Your  business  cards"
      />
      {cards && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_CARD)}
          color="primary"
          aria-label="add"
          sx={{ position: "absolute", bottom: 75, right: 16 }}
        >
          <AddIcon />
        </Fab>
      )}
      <CardFeedback
        idLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={() => handleLikeCard}
      />
    </Container>
  );
};
export default MayCards;
