import React from "react";
import MUICard from "@mui/material/Card";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import CardInterface from "../../interfaces/CardInterface";

function Card() {
  const card: CardInterface = {
    _id: "abcd1",
    title: "Card Title",
    subtitle: "Card Subtitle",
    description: "the card description",
    phone: "0584797758",
    image: {
      url: "https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_1280.png",
      alt: "test",
    },
    address: {
      country: "israel",
      city: "tel-aviv",
      street: "shinkin",
      houseNumber: 3,
      zip: 123,
    },
    bizNumber: 1,
    email: "eli92402@gmail.com",
    likes: [],
    createdAt: new Date(),
    user_id: "12345",
  };

  return (
    <MUICard sx={{ maxWidth: 345 }}>
      <CardHead image={card.image} />
      <CardBody Cardbudy={card} />
      <CardActionBar />
    </MUICard>
  );
}

export default Card;
