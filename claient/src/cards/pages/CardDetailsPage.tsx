import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import LocationMap from "../components/card/LocationMap";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const { value, handleGetCard } = useCards();
  const { isLoading, error, card } = value;

  useEffect(() => {
    if (cardId) {
      handleGetCard(cardId);
    }
  }, [cardId]);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!isLoading && !card) return <p>No card to display...</p>;
  if (isLoading) return <Spinner />;

  if (!isLoading && card && cardId)
    return (
      <Container>
        <ImageContainer>
          <Image src={card.image.url} alt={card.image.alt} />
        </ImageContainer>
        <ContentContainer>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Title>{card.title}</Title>
              {card.web && (
                <Subtitle>
                  <Link
                    href={card.web}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.web}
                  </Link>
                </Subtitle>
              )}
              <Info>
                <InfoIcon className="fas fa-phone" />
                {card.phone}
              </Info>
            </Grid>
            <Grid item xs={12} md={6}>
              <Description>{card.description}</Description>
            </Grid>
          </Grid>
        </ContentContainer>
        <LocationMap address={card.address} />
      </Container>
    );

  return null;
};

const Container = styled("div")({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "40px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
});

const ImageContainer = styled("div")({
  marginBottom: "20px",
  border: "1px solid #dddddd",
  borderRadius: "8px",
  padding: "8px",
});

const Image = styled("img")({
  width: "100%",
  height: "auto",
});

const ContentContainer = styled("div")({
  background: "#ffffff",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const InfoIcon = styled("i")({
  marginRight: "8px",
});

const Title = styled(Typography)({
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "12px",
  color: "#333333",
  textAlign: "center",
  lineHeight: "1.2",
});

const Subtitle = styled(Typography)({
  fontSize: "18px",
  color: "#666666",
  marginBottom: "12px",
  textAlign: "center",
  lineHeight: "1.4",
});

const Info = styled("div")({
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  color: "#666666",
  marginBottom: "8px",
  "& i": {
    marginRight: "8px",
    color: "#999999",
  },
});

const Description = styled(Typography)({
  fontSize: "18px",
  color: "#333333",
  lineHeight: "1.6",
  marginTop: "16px",
  textAlign: "center",
});

export default CardDetailsPage;
