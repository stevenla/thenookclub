import React from "react";
import { Critter } from "./types";
import Calendar from "./Calendar";
import styles from "./CritterRow.module.css";
import BellsIcon from "./icons/BellsIcon";
import CheckIcon from "./icons/CheckIcon";
import useStoredState from "./useStoredState";

function getImageUrl(name: string): string {
  const formattedName = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  return `/images/${formattedName}.png`;
}

interface CritterRowProps {
  critter: Critter;
}

export function getStoreName(critterName: string): string {
  const storeName = "checked--" + critterName;
  return storeName;
}

export default function CritterRow({ critter }: CritterRowProps) {
  const storeName = getStoreName(critter.name);
  const [checked, setChecked] = useStoredState<boolean>(storeName, false);
  return (
    <label className={styles.root}>
      <div className={styles.left}>
        <img src={getImageUrl(critter.name)} alt={critter.name} />
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.name}>
            {critter.name}
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <div className={styles.checkboxStyle}>
              {checked && (
                <div className={styles.checkboxIcon}>
                  <CheckIcon color="--light" size={12} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.price}>
            <span className={styles.priceNumber}>
              {critter.price.toLocaleString()}
            </span>
            <BellsIcon color="--green" size={16} />
          </div>
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
    </label>
  );
}
