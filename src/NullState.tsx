import React, { ReactNode } from "react";

import styles from "./NullState.module.css";

interface NullStateProps {
  icon: ReactNode;
  text: string;
}

export default function NullState({ icon, text }: NullStateProps) {
  return (
    <div className={styles.nullState}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
