import { UserFromClient } from "./../../models/types/userTypes";

import UserInterface from "../../interfaces/userInterface";

const mapUserToModel = (user: UserInterface): UserFromClient => {
  return {
    first: user.name.first,
    middle: user.name.middle!,
    last: user.name.last,
    phone: user.phone,
    email: user.email,
    country: user.address.country,
    city: user.address.country,
    state: user.address.state!,
    street: user.address.state!,
    houseNumber: String(user.address.houseNumber),
    zip: String(user.address.zip),
    password: user.password,
    url: user.image.url,
    alt: user.image.alt,
    isBusiness: user.isBusiness,
  };
};

export default mapUserToModel;
