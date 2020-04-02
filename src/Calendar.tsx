import React from "react";
import { Critter } from "./types";
import styles from "./Calendar.module.css";

interface CalendarProps {
  critter: Critter;
}

export default function Calendar({ critter }: CalendarProps) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={critter.jan && styles.active}>Jan</div>
        <div className={critter.feb && styles.active}>Feb</div>
        <div className={critter.mar && styles.active}>Mar</div>
        <div className={critter.apr && styles.active}>Apr</div>
        <div className={critter.may && styles.active}>May</div>
        <div className={critter.jun && styles.active}>Jun</div>
        <div className={critter.jul && styles.active}>Jul</div>
        <div className={critter.aug && styles.active}>Aug</div>
        <div className={critter.sep && styles.active}>Sep</div>
        <div className={critter.oct && styles.active}>Oct</div>
        <div className={critter.nov && styles.active}>Nov</div>
        <div className={critter.dec && styles.active}>Dec</div>
      </div>
    </div>
  );
}
