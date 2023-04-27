import React from "react";
import Typography from "@mui/material/Typography";
import CardInterface from "../interfaces/CardInterface";
import Card from "./card/Card";
import Grid from "@mui/material/Grid";

/* type Props = { handleCardDelete: (id: string) => void }; */

type Props = {};

const Cards: React.FC<Props> = () => {
  const handleCardDelete = (id: string) =>
    console.log(`you delete crd no: ${id} `);
  let cards: CardInterface[] = [
    {
      _id: "abcd1",
      title: "Card own",
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
    },
    {
      _id: "abcd2",
      title: "Card Tow",
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
    },
    {
      _id: "abcd3",
      title: "Card Three",
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
    },
  ];
  if (!cards.length)
    return (
      <Typography>
        Opss...it seems there are no business cards to display...
      </Typography>
    );
  return (
    <Grid container spacing={2} pb={2}>
      {cards.map((card) => (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
          <Card onDelete={handleCardDelete} card={card} key={card._id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
