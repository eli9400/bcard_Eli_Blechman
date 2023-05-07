import React from "react";
import MUICard from "@mui/material/Card";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import CardInterface from "../../interfaces/CardInterface";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
type Props = {
  card: CardInterface;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
};

const Card: React.FC<Props> = ({ card, onDelete, onLike }) => {
  const navigate = useNavigate();
  return (
    <MUICard sx={{ minWidth: 280 }}>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.CARD_DETAILS}/${card._id}`)}
      >
        <CardHead image={card.image} />
        <CardBody CardBody={card} />
      </CardActionArea>
      <CardActionBar cardId={card._id} onDelete={onDelete} onLike={onLike} />
    </MUICard>
  );
};

export default Card;
