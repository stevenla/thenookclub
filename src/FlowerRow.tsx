import React from "react";
import { Flower } from "./types";
import styles from "./FlowerRow.module.css";
import Checkbox from "./Checkbox";
import useStoredState from "./useStoredState";

function getImageUrl(flower: Flower): string {
  return `/images/flowers/NH-${flower.color}_${flower.type}_icon.png`;
}

interface FlowerRowProps {
  flower: Flower;
}

export function getStoreName(flower: Flower): string {
  const storeName = "has-flower--" + flower.color + "_" + flower.type;
  return storeName;
}

export default function FlowerRow({ flower }: FlowerRowProps) {
  const storeName = getStoreName(flower);
  const [checked, setChecked] = useStoredState<boolean>(storeName, false);
  return (
    // Add the onTouchStart so the active css class would work
    <label className={styles.root} onTouchStart={() => {}}>
      <div className={styles.checkbox}>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
      </div>
      <div className={styles.image}>
        <img src={getImageUrl(flower)} alt={`${flower.color} ${flower.type}`} />
      </div>
      <div className={styles.name}>{`${flower.color} ${flower.type}`}</div>
    </label>
  );
}
