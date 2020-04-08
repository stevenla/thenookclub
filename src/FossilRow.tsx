import React from "react";
import { Fossil } from "./types";
import Calendar from "./Calendar";
import styles from "./FossilRow.module.css";
import BellsIcon from "./icons/BellsIcon";
import Checkbox from "./Checkbox";
import useStoredState from "./useStoredState";

function getImageUrl(name: string): string {
  const formattedName = name.toLowerCase().replace(/[^a-z]+/g, "-");
  return `/images/fossils/${formattedName}.png`;
}

interface FossilRowProps {
  fossil: Fossil;
}

export function getStoreName(fossilName: string): string {
  const storeName = "has-fossil--" + fossilName;
  return storeName;
}

export default function FossilRow({ fossil }: FossilRowProps) {
  const storeName = getStoreName(fossil.name);
  const [checked, setChecked] = useStoredState<boolean>(storeName, false);
  return (
    // Add the onTouchStart so the active css class would work
    <label className={styles.root} onTouchStart={() => {}}>
      <div className={styles.checkbox}>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
      </div>
      <div className={styles.image}>
        <img src={getImageUrl(fossil.name)} alt={fossil.name} />
      </div>
      <div className={styles.name}>{fossil.name}</div>
      <div className={styles.price}>
        <span className={styles.priceNumber}>
          {fossil.price.toLocaleString()}
        </span>
        <BellsIcon color="--money" size={16} />
      </div>
    </label>
  );
}
