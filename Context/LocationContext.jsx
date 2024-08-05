import React, { createContext, useState, useContext } from "react";

// Define the context with a default value
const LocationContext = createContext({
  userLocation: null,
  setUserLocationContext: () => {},
  coOrdinates: null,
  setCoOrdinatesContext: () => {},
  SavedUserLocation: null,
  setSavedUserLocation: () => {},
});

export const ContextProvider = ({ children }) => {
  const [userLocation, setUserLocationContext] = useState(null);
  const [coOrdinates, setCoOrdinatesContext] = useState(null);
  const [SavedUserLocation, setSavedUserLocation] = useState(null);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocationContext,
        coOrdinates,
        setCoOrdinatesContext,
        SavedUserLocation,
        setSavedUserLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// export { ContextProvider, LocationContext };
// Custom hook for easier context consumption
export const useLocation = () => useContext(LocationContext);
