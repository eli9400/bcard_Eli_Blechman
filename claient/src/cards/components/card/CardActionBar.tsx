import React, { useState } from "react";
import CardActions from "@mui/material/CardActions";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
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

const CardActionBar = ({
  cardId,
  cardUserId,
  cardLikes,
  onDelete,
  onLike,
}: CardActionBarProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isDialogOpen, setDialog] = useState(false);
  const { handleLikeCard, handleGetCard } = useCards();
  const [numOfLikes, setNum] = useState(cardLikes.length);

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
    setLike((perv) => !perv);

    await handleLikeCard(cardId);
    const card = await handleGetCard(cardId);
    setNum(card!.likes.length);
    console.log();

    onLike();
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
          {user && (user?.isAdmin || user?._id === cardUserId) && (
            <IconButton
              aria-label="delete card"
              onClick={() => {
                handelDialog("open");
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {user?.isBusiness && user._id === cardUserId && (
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
            alignItems="center"
          >
            <CardDeleteDialog
              isDialogOpen={isDialogOpen}
              onChangeDialog={handelDialog}
              onDelete={handleDeleteCard}
            />
            <IconButton style={{ marginRight: `5px` }}>
              <PhoneIcon />
            </IconButton>
            <IconButton onClick={onLikCard}>
              <FavoriteIcon color={Like ? "warning" : "inherit"} />
              <p style={{ display: `inline` }}>{numOfLikes}</p>
            </IconButton>
          </Grid>
        )}
      </CardActions>
    </>
  );
};

export default CardActionBar;
