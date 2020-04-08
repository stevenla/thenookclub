import React from "react";

import CheckIcon from "./icons/CheckIcon";
import styles from "./Checkbox.module.css";

export default function Checkbox({ checked, onChange }) {
  return (
    <div className={styles.name}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
      />
      <div className={styles.checkboxStyle}>
        {checked && (
          <div className={styles.checkboxIcon}>
            <CheckIcon color="--background" size={12} />
          </div>
        )}
      </div>
    </div>
  );
}
