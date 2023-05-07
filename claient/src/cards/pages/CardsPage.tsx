import React from "react";

import Cards from "../components/Cards";
import CardInterface from "../interfaces/CardInterface";
import PageHeader from "../../components/PageHeder";
import Container from "@mui/material/Container";

const CardsPage = () => {
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

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="Here you can find all types of business cards"
      />

      <Cards cards={cards} />
    </Container>
  );
};

export default CardsPage;
