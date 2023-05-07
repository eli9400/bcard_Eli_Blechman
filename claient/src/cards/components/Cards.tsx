import React from "react";
import Typography from "@mui/material/Typography";
import CardInterface from "../interfaces/CardInterface";

import Grid from "@mui/material/Grid";
import Card from "./card/Card";

type Props = {
  cards: CardInterface[];
};

const Cards: React.FC<Props> = ({ cards }) => {
  const handleCardDelete = (id: string) =>
    console.log(`you delete card no: ${id} `);
  const handleCardLike = (id: string) =>
    console.log(`you like card no: ${id} `);

  if (!cards.length)
    return (
      <Typography>
        Opss...it seems there are no business cards to display...
      </Typography>
    );
  return (
    <Grid container spacing={2} pb={2}>
      {cards.map((card) => (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
          <Card
            onDelete={handleCardDelete}
            card={card}
            key={card._id}
            onLike={handleCardLike}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
