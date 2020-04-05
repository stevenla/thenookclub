import { useState, useEffect } from "react";
import queryString from "query-string";

export default function useHashState(
  key: string,
  initialState: string
): [string, (value: string) => void] {
  const [state, setState] = useState<string>(() => {
    const parsed = queryString.parse(window.location.hash);
    const value = parsed[key];
    if (typeof value === "string") {
      return value;
    }
    return initialState;
  });
  useEffect(() => {
    function listener() {
      const parsed = queryString.parse(window.location.hash);
      const newState = parsed[key];
      if (typeof newState === "string") {
        setState(newState);
      }
    }
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, [key]);

  useEffect(() => {
    const parsed = queryString.parse(window.location.hash);
    parsed[key] = state;
    window.location.hash = queryString.stringify(parsed);
  }, [key, state]);
  return [state, setState];
}
