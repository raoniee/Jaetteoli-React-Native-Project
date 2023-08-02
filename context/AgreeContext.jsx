import { createContext, useState } from "react";

export const AgreeContext = createContext();

export function AgreeProvider({ cheildren }) {
  const [allagree, setAllagree] = useState(false);
  const handleAllagree = () => {
    setAllagree((prev) => !prev);
  };

  <AgreeContext.Provider value={{ allagree, handleAllagree }}>
    {cheildren}
  </AgreeContext.Provider>;
}
