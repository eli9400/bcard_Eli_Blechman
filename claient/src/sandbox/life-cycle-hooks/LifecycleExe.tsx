import React, { useEffect, useState } from "react";
import { colorLog } from "../utils";

const LifecycleExe = () => {
  const [count, setCount] = useState(() => {
    colorLog("1");
    setTimeout(() => colorLog("5"), 1000);
    return 0;
  });
  useEffect(() => {
    colorLog("3");
    return () => {
      colorLog("6");
    };
  }, []);
  useEffect(() => {
    colorLog("4");

    return () => {};
  }, [count]);
  return (
    <>
      {colorLog("2")}
      <button onClick={() => setCount((prev) => prev + 1)}>click</button>
    </>
  );
};

export default LifecycleExe;
