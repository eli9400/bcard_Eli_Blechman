import React from "react";

import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import MUICard from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import { Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

function Card() {
  const textColor = grey[500];
  return (
    <MUICard sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image="https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_1280.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h4">forth</Typography>
        <Typography mb={1} variant="subtitle1" color="text.secondary">
          subtitle
        </Typography>

        <Divider />
        <Typography
          mt={1}
          variant="subtitle1"
          fontWeight={"bold"}
          color={"GrayText"}
        >
          Phone:
          <Typography
            ml={1}
            fontWeight={400}
            display={"inline"}
            color={textColor}
          >
            050-0000000
          </Typography>
        </Typography>
        <Typography variant="subtitle1" fontWeight={"bold"} color={"GrayText"}>
          Address:
          <Typography
            ml={1}
            fontWeight={400}
            display={"inline"}
            color={textColor}
          >
            shinkin 3 tel-aviv
          </Typography>
        </Typography>
        <Typography variant="subtitle1" fontWeight={"bold"} color={"GrayText"}>
          Card Number:
          <Typography
            ml={1}
            fontWeight={400}
            display={"inline"}
            color={textColor}
          >
            4000000
          </Typography>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <IconButton>
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
    </MUICard>
  );
}

export default Card;
