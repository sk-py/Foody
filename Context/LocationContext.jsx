import React, { createContext, useState, useContext } from "react";

// Define the context with a default value
const LocationContext = createContext({
  userLocation: null,
  setUserLocationContext: () => {},
});

export const ContextProvider = ({ children }) => {
  const [userLocation, setUserLocationContext] = useState(null);

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocationContext }}>
      {children}
    </LocationContext.Provider>
  );
};

// export { ContextProvider, LocationContext };
// Custom hook for easier context consumption
export const useLocation = () => useContext(LocationContext);
