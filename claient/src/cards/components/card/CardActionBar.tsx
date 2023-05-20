import React, { useEffect, useState, useCallback } from "react";
import CardActions from "@mui/material/CardActions";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

import useCards from "../../hooks/useCards";

import { useUser } from "../../../users/providers/UserProvider";

type CardActionBarProps = {
  cardId: string;
  cardUserId: string;

  cardLikes: string[];
};

const CardActionBar: React.FC<CardActionBarProps> = ({
  cardId,
  cardUserId,
  cardLikes,
}) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { handleGetCard, card, handleDeleteCard, handleLikeCard } = useCards();
  const [Like, setLike] = useState(() => {
    if (!user) return false;
    return !!cardLikes.find((id: string) => id === user._id);
  });
  const onLikCard = async () => {
    const cardLike = handleGetCard(cardId);

    setLike((perv) => !perv);
    if (cardLike) {
      await handleLikeCard(cardId, await cardLike);
    }
    return;
  };

  console.log(`test2:${user?._id}`);

  return (
    <>
      <CardActions disableSpacing>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          {user?._id === card?.user_id && user?.isBusiness && user?.isAdmin && (
            <IconButton>
              <DeleteIcon />
            </IconButton>
          )}
          {user?.isBusiness && (
            <IconButton
              onClick={() => navigate(`${ROUTES.CARD_EDIT}/${cardId}`)}
            >
              <EditIcon />
            </IconButton>
          )}
        </Grid>
        {user && (
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <IconButton>
              <PhoneIcon />
            </IconButton>
            <IconButton onClick={onLikCard}>
              <FavoriteIcon color={Like ? "warning" : "inherit"} />
            </IconButton>
          </Grid>
        )}
      </CardActions>
    </>
  );
};

export default CardActionBar;
