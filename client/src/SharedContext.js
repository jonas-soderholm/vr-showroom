import React, { createContext, useContext, useState } from "react";

const MarkerStateContext = createContext();

export const useSharedState = () => {
  return useContext(MarkerStateContext);
};

export const SharedStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [uploadFinished, setUploadFinished] = useState(false); // Default to false

  return (
    <MarkerStateContext.Provider
      value={{
        uploadFinished,
        setUploadFinished,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </MarkerStateContext.Provider>
  );
};
