import React from "react";
import Typography from "@mui/material/Typography";
import CardInterface from "../interfaces/CardInterface";

import Grid from "@mui/material/Grid";
import Card from "./card/Card";

type Props = {
  cards: CardInterface[];
  onDelete: (cardId: string) => void;
};

const Cards: React.FC<Props> = ({ cards, onDelete }) => {
  if (!cards.length)
    return (
      <Typography>
        Opss...it seems there are no business cards to display...
      </Typography>
    );
  return (
    <Grid container spacing={2} pb={2}>
      {cards.map((card: CardInterface) => (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
          <Card card={card} key={card._id} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
