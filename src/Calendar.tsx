import React from "react";
import { Critter } from "./types";
import { useHemisphere } from "./HemisphereContext";
import styles from "./Calendar.module.css";

export const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

function capitalize(month: string): string {
  return month[0].toUpperCase() + month.slice(1);
}

interface CalendarProps {
  critter: Critter;
}

export default function Calendar({ critter }: CalendarProps) {
  const hemisphere = useHemisphere();
  const months =
    hemisphere === "North"
      ? MONTHS
      : [...MONTHS.slice(6, 12), ...MONTHS.slice(0, 6)];
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        {months.map((month, i) => {
          return (
            <div key={month} className={critter[month] ? styles.active : ""}>
              {capitalize(MONTHS[i])}
            </div>
          );
        })}
      </div>
    </div>
  );
}
