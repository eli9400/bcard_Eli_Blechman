export type TokenType = { _id: string; isBusiness: boolean; isAdmin: boolean };

export type LoginType = {
  email: string;
  password: string;
};
export type UserFromClient = {
  _id: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;

  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
};
export type userMapToModelType = {
  _id: string;
  isBusiness: boolean;
  isAdmin: boolean;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
};
export type NormalizedEditUser = {
  name: { first: string; middle: string; last: string };
  phone: string;
  email: string;
  password: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;

  _id?: string;
};
export type CreateUserErrors = Partial<UserFromClient>;
