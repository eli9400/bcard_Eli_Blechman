import AddressInterface from "../../cards/interfaces/AddressInterface";
import ImageInterface from "../../cards/interfaces/ImageInterface";

interface UserInterface {
  name: { first: string; middle?: string | undefined; last: string };
  phone: string;
  email: string;
  password: string;
  image: ImageInterface;
  address: AddressInterface;
  isBusiness: boolean;
  _id: string;
}
export default UserInterface;
