import { useState, useEffect } from "react";

export default function useStoredState(
  key: string,
  initialState: string
): [string, (value: string) => void] {
  const [state, setState] = useState<string>(() => {
    if (window.localStorage && window.localStorage.getItem(key)) {
      return window.localStorage.getItem(key);
    }
    return initialState;
  });

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, state);
    }
  }, [key, state]);
  return [state, setState];
}
