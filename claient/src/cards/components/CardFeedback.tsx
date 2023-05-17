import React from "react";
import CardInterface from "../interfaces/CardInterface";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Cards from "./Cards";
import { Typography } from "@mui/material";

type Props = {
  idLoading: boolean;
  error: string | null;
  cards: CardInterface[] | null | undefined;
};

const CardFeedback: React.FC<Props> = ({ idLoading, error, cards }) => {
  if (idLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cards && cards.length) return <Cards cards={cards} />;
  if (cards && !cards.length)
    return (
      <Typography>
        Opss...it seems there are no business cards to display...
      </Typography>
    );
  return null;
};

export default CardFeedback;
