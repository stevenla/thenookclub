import React from "react";
import { useRouteColor } from "./Nav";
import styles from "./Curve.module.css";

interface CurveProps {}

export default function Curve({}: CurveProps) {
  const color = useRouteColor();
  return (
    <div className={styles.curve}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        width="100vw"
        height="20"
        fill={color}
        preserveAspectRatio="none"
      >
        <path d="M0 0h100v10C100 0 0 0 0 10z" />
      </svg>
    </div>
  );
}
