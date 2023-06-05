import { useCallback, useState, useEffect, useMemo } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

import { useUser } from "../../users/providers/UserProvider";

type ErrorType = null | string;
type CardsTypes = CardInterface[] | null;
type CardsType = CardInterface | null;

const useCards = () => {
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState<ErrorType>(null);
  const [cards, setCards] = useState<CardsTypes>(null);
  const [card, setCard] = useState<CardsType>(null);
  const [query, setQuery] = useState<CardsType | any>("");
  const [filteredCard, setFilter] = useState<CardsType | any>("");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setQuery(searchParams.get("Q") ?? "");
  }, [searchParams]);
  useEffect(() => {
    if (cards) {
      setFilter(
        cards.filter(
          (card) =>
            card.title.includes(query) ||
            String(card.bizNumber).includes(query) ||
            card.subtitle.includes(query) ||
            card.description.includes(query)
        )
      );
    }
  }, [cards, query]);

  useAxiosInterceptors();
  const { user } = useUser();
  const snack = useSnack();
  const navigate = useNavigate();
  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    cards: CardsTypes,
    card: CardsType = null
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
      setLoading(true);
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
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handelCreateCard = async (cardFromClient: CardFromClientType) => {
    try {
      setLoading(true);
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
      setLoading(true);
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
      setLoading(true);
      await deleteCard(cardId);
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handleLikeCard = async (cardId: string) => {
    try {
      setLoading(true);
      const card = await changeLikeStatus(cardId);
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  };
  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      const Cards = await getCards();

      const favCards = Cards?.filter(
        (card) => !!card.likes.find((id) => id === user?._id)
      );
      requestStatus(false, null, favCards);
    } catch (error) {}
  }, []);
  const value = useMemo(() => {
    return { isLoading, cards, card, error, filteredCard };
  }, [isLoading, cards, card, error, filteredCard]);
  return {
    value,
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
