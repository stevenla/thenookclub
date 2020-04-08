import React from "react";
import { Critter } from "./types";
import Calendar from "./Calendar";
import styles from "./CritterRow.module.css";
import BellsIcon from "./icons/BellsIcon";
import Checkbox from "./Checkbox";
import useStoredState from "./useStoredState";

function getImageUrl(name: string): string {
  const formattedName = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  return `/images/critters/${formattedName}.png`;
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
    // Add the onTouchStart so the active css class would work
    <label className={styles.root} onTouchStart={() => {}}>
      <div className={styles.left}>
        <img src={getImageUrl(critter.name)} alt={critter.name} />
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.name}>
            {critter.name}
            <div className={styles.checkbox}>
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
          </div>
          <div className={styles.price}>
            <span className={styles.priceNumber}>
              {critter.price.toLocaleString()}
            </span>
            <BellsIcon color="--money" size={16} />
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
