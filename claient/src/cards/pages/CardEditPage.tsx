import React from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeder";
import Container from "@mui/material/Container";

const CardEditPage = () => {
  const { cardId } = useParams();
  return (
    <>
      <Container>
        <PageHeader
          title="Business Card Edit"
          subtitle={`here you can edit of the business card:${cardId} `}
        />
      </Container>
    </>
  );
};

export default CardEditPage;
