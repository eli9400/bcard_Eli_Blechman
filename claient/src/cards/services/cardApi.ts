import axios from "axios";
import CardInterface from "../interfaces/CardInterface";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getCards = async () => {
  try {
    const { data } = await axios.get<CardInterface[]>(`${apiUrl}/cards`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const getCard = async (cardId: string) => {
  try {
    const { data } = await axios.get<CardInterface>(
      `${apiUrl}/cards/${cardId}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getMyCards = async () => {
  try {
    const { data } = await axios.get<CardInterface[]>(
      `${apiUrl}/cards/my-cards`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const createCard = async (card: CardInterface) => {
  try {
    const { data } = await axios.post<CardInterface>(`${apiUrl}/cards`, card);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const editCard = async (card: CardInterface | null, cardId: string) => {
  try {
    const { data } = await axios.post<CardInterface>(
      `${apiUrl}/cards/${cardId}`,
      card
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const changeLikeStatus = async (cardId: string) => {
  try {
    const { data } = await axios.patch<CardInterface>(
      `${apiUrl}/cards/${cardId}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const deleteCard = async (cardId: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/cards/${cardId}`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
