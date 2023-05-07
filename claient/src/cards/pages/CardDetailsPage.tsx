import React from "react";
import { useParams } from "react-router-dom";
import CardInterface from "../interfaces/CardInterface";
import Card from "../components/card/Card";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeder";

const CardDetailsPage = () => {
  const params = useParams();
  const handleCardDelete = (id: string) =>
    console.log(`you delete card no: ${id} `);
  const handleCardLike = (id: string) =>
    console.log(`you like card no: ${id} `);
  const cards: CardInterface[] = [
    {
      _id: "abcd1",
      title: "One",
      subtitle: "Card Subtitle",
      description: "the card description",
      phone: "050-000000",
      image: {
        url: "https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_1280.png",
        alt: "test",
      },
      web: "",
      address: {
        state: "",
        country: "israel",
        city: "tel-aviv",
        street: "nahson",
        houseNumber: 5,
        zip: 1234,
      },
      bizNumber: 1000000,
      email: "test@gmail.com",
      likes: [],
      user_id: "123456789",
      createdAt: new Date(),
    },
    {
      _id: "abcd2",
      title: "Two",
      subtitle: "Card Subtitle",
      description: "the card description",
      phone: "050-000000",
      image: {
        url: "https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_1280.png",
        alt: "test",
      },
      web: "",
      address: {
        state: "",
        country: "israel",
        city: "tel-aviv",
        street: "nahson",
        houseNumber: 5,
        zip: 1234,
      },
      bizNumber: 1000000,
      email: "test@gmail.com",
      likes: [],
      user_id: "123456789",
      createdAt: new Date(),
    },
    {
      _id: "abcd3",
      title: "Three",
      subtitle: "Card Subtitle",
      description: "the card description",
      phone: "050-000000",
      image: {
        url: "https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_1280.png",
        alt: "test",
      },
      web: "",
      address: {
        state: "",
        country: "israel",
        city: "tel-aviv",
        street: "nahson",
        houseNumber: 5,
        zip: 1234,
      },
      bizNumber: 1000000,
      email: "test@gmail.com",
      likes: [],
      user_id: "123456789",
      createdAt: new Date(),
    },
  ];
  const card = cards.filter(
    (card: CardInterface) => card._id === params.cardId
  );
  if (!card.length) return <p>no card to display</p>;
  return (
    <Container>
      <PageHeader
        title="Business Details"
        subtitle="here you can see details of the business"
      />
      <div>Details of card:{params.cardId}</div>
      <Card
        card={card[0]}
        onDelete={handleCardDelete}
        onLike={handleCardLike}
      />
    </Container>
  );
};

export default CardDetailsPage;
