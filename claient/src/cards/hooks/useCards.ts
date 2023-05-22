import { useCallback, useState } from "react";
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

import {
  CardFromClientType,
  CardMapToModelType,
} from "../models/types/cardTypes";
import normalizeCard from "../helpers/normalizations/normalizeCard";
import normalizeEditCard from "../helpers/normalizations/normalizeEditCard";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

import { useUser } from "../../users/providers/UserProvider";

type ErrorType = null | string;
type CardsTypes = CardInterface[] | null;
type CardsType = CardInterface | null;

const useCards = () => {
  const [isLoading, setLoading] = useState(false);
  const { user } = useUser();

  const [error, setError] = useState<ErrorType>(null);
  const [cards, setCards] = useState<CardsTypes>(null);
  const [card, setCard] = useState<CardsType>(null);
  const [like, setLike] = useState(false);

  useAxiosInterceptors();
  const snack = useSnack();
  const navigate = useNavigate();
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
      if (cards) {
        requestStatus(false, null, cards, null);
        return cards;
      }
      return [];
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
  const handelCreateCard = async (cardFromClient: CardFromClientType) => {
    try {
      setLoading(false);
      const normalizedCard = normalizeCard(cardFromClient);
      const card = await createCard(normalizedCard);
      requestStatus(false, null, cards, card);
      snack("success", "The business card has been successfully Created");
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handelUpdateCard = async (cardFromClient: CardMapToModelType) => {
    try {
      setLoading(false);
      const normlizeEditCard = normalizeEditCard(cardFromClient);
      const card = await editCard(normlizeEditCard);
      requestStatus(false, null, cards, card);
      snack("success", "The business card has been successfully updated");
      navigate(ROUTES.MY_CARDS);
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
  const handleLikeCard = async (
    cardId: string,
    cardLik: CardInterface | null | undefined
  ) => {
    try {
      setLoading(false);
      const card = await changeLikeStatus(cardId, cardLik);
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handleGetFavCards = useCallback(async () => {
    try {
      const Cards = await handleGetCards();
      setLoading(false);
      const favCards = Cards?.filter(
        (card) => !!card.likes.find((id) => id === user?._id)
      );
      if (favCards) requestStatus(false, null, favCards, null);
    } catch (error) {}
  }, [user]);
  return {
    isLoading,
    error,
    cards,
    card,
    like,
    setLike,
    handleGetCards,
    handleGetMyCards,
    handleGetCard,
    handelCreateCard,
    handelUpdateCard,
    handleDeleteCard,
    handleLikeCard,
    handleGetFavCards,
  };
};

export default useCards;
