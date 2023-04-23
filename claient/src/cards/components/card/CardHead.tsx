import React from "react";
import ImageInterface from "../../interfaces/ImageInterface";
import { CardMedia } from "@mui/material";

type Props = { image: ImageInterface };

const CardHead: React.FC<Props> = ({ image }) => {
  const { url, alt } = image;
  return (
    <>
      <CardMedia component="img" height="194" image={url} alt={alt} />
    </>
  );
};

export default CardHead;
