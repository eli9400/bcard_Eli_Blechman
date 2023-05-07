import React from "react";

import { CardMedia } from "@mui/material";
import ImageInterface from "../../interfaces/ImageInterface";

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
