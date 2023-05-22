import React, { useState } from "react";
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
import CardDeleteDialog from "../CardDeleteDialog";

type CardActionBarProps = {
  cardId: string;
  cardUserId: string;
  onDelete: (id: string) => void;
  cardLikes: string[];
  onLike: () => void;
};

const CardActionBar: React.FC<CardActionBarProps> = ({
  cardId,
  cardUserId,
  cardLikes,
  onDelete,
  onLike,
}) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isDialogOpen, setDialog] = useState(false);
  const { handleGetCard, card, handleLikeCard } = useCards();
  const [Like, setLike] = useState(() => {
    if (!user) return false;
    return !!cardLikes.find((id: string) => id === user._id);
  });
  const handelDialog = (term?: string | null) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };
  const handleDeleteCard = () => {
    handelDialog();
    onDelete(cardId);
  };
  const onLikCard = async () => {
    const cardLike = handleGetCard(cardId);
    onLike()

    setLike((perv) => !perv);
    if (cardLike) {
      await handleLikeCard(cardId, await cardLike);
    }
    return;
  };

  return (
    <>
      <CardActions disableSpacing>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          {user && (user?.isAdmin || user?._id === card?.user_id) && (
            <IconButton
              aria-label="delete card"
              onClick={() => {
                handelDialog("open");
              }}
            >
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
            <CardDeleteDialog
              isDialogOpen={isDialogOpen}
              onChangeDialog={handelDialog}
              onDelete={handleDeleteCard}
            />
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
