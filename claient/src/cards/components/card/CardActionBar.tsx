import React from "react";
import CardActions from "@mui/material/CardActions";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

type Props = {
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
  cardId: string;
};

const CardActionBar: React.FC<Props> = ({ onDelete, cardId, onLike }) => {
  const navigate = useNavigate();
  return (
    <>
      <CardActions disableSpacing>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <IconButton onClick={() => onDelete(cardId)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => navigate(`${ROUTES.CARD_EDIT}/${cardId}`)}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <IconButton>
            <PhoneIcon />
          </IconButton>
          <IconButton onClick={() => onLike(cardId)}>
            <FavoriteIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </>
  );
};

export default CardActionBar;
