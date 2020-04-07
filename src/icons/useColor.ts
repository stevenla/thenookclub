import { useEffect, useState } from "react";

const mql: null | MediaQueryList =
  typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

/**
 * If the passed-in color is a CSS variable, get the hex value of that and
 * listen for theme changes
 * @param color hex color "#FFFFFF" or css variable "--dark"
 */
export default function useColor(color: string): string {
  let colorToUse = color;
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    function listener() {
      setCounter((s) => s + 1);
    }
    if (mql != null) {
      mql.addListener(listener);
    }
    return () => {
      if (mql != null) {
        mql.removeListener(listener);
      }
    };
  });

  if (color.includes("--")) {
    // Use CSS variables
    const docEl = document.documentElement;
    colorToUse = getComputedStyle(docEl).getPropertyValue(color);
  }

  return colorToUse;
}
