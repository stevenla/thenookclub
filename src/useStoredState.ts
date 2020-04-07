import { useState, useEffect } from "react";

export function useRawStoredState(
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

type Primitive = boolean | number | string;
type SerializableValue = Primitive | Primitive[] | { [key: string]: Primitive };

export default function useStoredState<T extends SerializableValue>(
  name: string,
  initialState: T
): [T, (value: T) => void] {
  const [state, setState] = useRawStoredState(
    name,
    JSON.stringify(initialState)
  );
  function setter(newValue: T) {
    setState(JSON.stringify(newValue));
  }
  let value: T;
  try {
    value = JSON.parse(state);
  } catch (_) {
    value = initialState;
  }
  return [value, setter];
}
