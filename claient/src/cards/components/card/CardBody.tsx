import React from "react";

import { Box, CardContent, CardHeader, Divider } from "@mui/material";

import CardInterface from "../../interfaces/CardInterface";
import CardBodyRow from "./CardBodyRow";

type Props = { Cardbudy: CardInterface };

const CardBody: React.FC<Props> = ({ Cardbudy }) => {
  const { address, bizNumber, phone, title, subtitle } = Cardbudy;
  const { city, street, houseNumber, country } = address;

  return (
    <>
      <CardContent sx={{ pd: 1 }}>
        <CardHeader
          title={title}
          subheader={subtitle}
          sx={{ p: 0, mb: 1 }}
        ></CardHeader>
        <Divider />
        <Box mt={1}>
          <CardBodyRow title="Phone" content={phone}></CardBodyRow>
          <CardBodyRow
            title="Address"
            content={`${street} ${houseNumber} ${city} ${country}`}
          ></CardBodyRow>
          <CardBodyRow
            title="Card Number"
            content={String(bizNumber)}
          ></CardBodyRow>
        </Box>
      </CardContent>
    </>
  );
};

export default CardBody;
