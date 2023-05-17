import { useState } from "react";
import CardInterface from "../interfaces/CardInterface";
import {
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
} from "../services/cardApi";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";

type ErrorType = null | string;
type CardsTypes = CardInterface[] | null;
type CardsType = CardInterface | null;

const useCards = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [cards, setCards] = useState<CardsTypes>(null);
  const [card, setCard] = useState<CardsType>(null);
  /* useAxiosInterceptors(); */

  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    cards: CardsTypes,
    card: CardsType
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handleGetCard = async (cardId: string) => {
    try {
      setLoading(false);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);

      setCard(card);
      return card;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handleGetMyCards = async () => {
    try {
      setLoading(false);
      const cards = await getMyCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handelCreateCard = async (cardFromClient: CardInterface) => {
    try {
      setLoading(false);
      const card = await createCard(cardFromClient);
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handelUpdateCard = async (
    cardFromClient: CardInterface,
    cardId: string
  ) => {
    try {
      setLoading(false);
      const card = await editCard(cardFromClient, cardId);
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handleDeleteCard = async (cardId: string) => {
    try {
      setLoading(false);
      await deleteCard(cardId);
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handleLikeCard = async (cardId: string) => {
    try {
      setLoading(false);
      const card = await changeLikeStatus(cardId);
      const cards = await getCards();
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };

  return {
    isLoading,
    error,
    cards,
    card,
    handleGetCards,
    handleGetMyCards,
    handleGetCard,
    handelCreateCard,
    handelUpdateCard,
    handleDeleteCard,
    handleLikeCard,
  };
};

export default useCards;
