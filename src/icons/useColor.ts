// import u

import { useEffect, useState } from "react";

const mql = window.matchMedia("(prefers-color-scheme: dark)");

export default function useColor(color: string): string {
  let colorToUse = color;
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    function listener() {
      setCounter((s) => s + 1);
    }
    mql.addListener(listener);
    return () => {
      mql.removeListener(listener);
    };
  });

  if (color.includes("--")) {
    // Use CSS variables
    const docEl = document.documentElement;
    colorToUse = getComputedStyle(docEl).getPropertyValue(color);
  }

  return colorToUse;
}
