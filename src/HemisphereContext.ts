import { useContext, createContext } from "react";

const HemisphereContext = createContext<string>("North");

export const HemisphereContextProvider = HemisphereContext.Provider;
export function useHemisphere(): string {
  return useContext(HemisphereContext);
}
