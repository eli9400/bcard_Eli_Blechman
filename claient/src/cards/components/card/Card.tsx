import React from "react";
import MUICard from "@mui/material/Card";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import CardInterface from "../../interfaces/CardInterface";

type Props = {
  card: CardInterface;
  onDelete: (id: string) => void;
};

const Card: React.FC<Props> = ({ card, onDelete }) => {
  return (
    <MUICard sx={{ minWidth: 280 }}>
      <CardHead image={card.image} />
      <CardBody Cardbudy={card} />
      <CardActionBar cardId={card._id} onDelete={onDelete} />
    </MUICard>
  );
};

export default Card;
