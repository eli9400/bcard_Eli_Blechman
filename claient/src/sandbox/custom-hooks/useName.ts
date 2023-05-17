import { useState } from "react";

const useName = (initialName: string) => {
  const [name, setName] = useState(initialName);

  return { name, setName };
};
export default useName;
