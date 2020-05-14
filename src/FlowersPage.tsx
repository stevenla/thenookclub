import React from "react";
import styles from "./FlowersPage.module.css";
import NullState from "./NullState";
import FlowerIcon from "./icons/FlowerIcon";

export default function FlowersPage() {
  return (
    <div className={styles.root}>
      <NullState icon={<FlowerIcon size={64} />} text="Coming soon!" />
    </div>
  );
}
