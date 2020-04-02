import React from "react";
import { Critter } from "./types";
import Calendar from "./Calendar";
import styles from "./CritterRow.module.css";

function getImageUrl(name: string): string {
  const formattedName = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  return `/images/${formattedName}.png`;
}

interface CritterRowProps {
  critter: Critter;
}

export default function CritterRow({ critter }: CritterRowProps) {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <img src={getImageUrl(critter.name)} />
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.name}>{critter.name}</div>
          <div className={styles.price}>{critter.price.toLocaleString()} ★</div>
        </div>
        <div className={styles.row}>
          <div className={styles.location}>
            {critter.location}
            {critter.shadowSize && <> • {critter.shadowSize}</>}
          </div>
          <div className={styles.time}>{critter.time}</div>
        </div>
        <div className={styles.row}>
          <Calendar critter={critter} />
        </div>
      </div>
    </div>
  );
}
