import React from "react";
import CardActions from "@mui/material/CardActions";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";

type Props = {
  onDelete: (id: string) => void;
  cardId: string;
};

const CardActionBar: React.FC<Props> = ({ onDelete, cardId }) => {
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
          <IconButton>
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </>
  );
};

export default CardActionBar;
