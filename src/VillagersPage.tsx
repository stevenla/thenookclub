import React from "react";
import styles from "./VillagersPage.module.css";
import NullState from "./NullState";
import VillagersIcon from "./icons/VillagersIcon";

export default function VillagersPage() {
  return (
    <div className={styles.root}>
      <NullState icon={<VillagersIcon size={64} />} text="Coming soon!" />
    </div>
  );
}
