import Typography from "@mui/material/Typography";
import React from "react";

type Props = { title: string; content: string };

const CardBodyRow: React.FC<Props> = ({ title, content }) => {
  return (
    <Typography variant="body2" color="text.secondary">
      <Typography fontWeight={700} component="span">
        {title}:{" "}
      </Typography>
      {content}
    </Typography>
  );
};

export default CardBodyRow;
