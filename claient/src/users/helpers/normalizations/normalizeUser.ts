import { UserFromClient } from "../../models/types/userTypes";

const normalizeUser = (user: UserFromClient) => {
  return {
    name: { first: user.first, middle: user.middle!, last: user.last },
    phone: user.phone,
    email: user.email,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state!,
      country: user.country,
      city: user.city,
      street: user.street,
      houseNumber: +user.houseNumber,
      zip: +user.zip,
    },
    password: user.password,
    isBusiness: user.isBusiness,
  };
};

export default normalizeUser;
