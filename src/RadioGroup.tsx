import React, { useState } from "react";
import styles from "./RadioGroup.module.css";

export function useRadioGroup(
  name: string,
  defaultValue: string,
  options: string[]
) {
  // TODO: power this with URL
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = e.target.value;
    setValue(value);
  };

  const element = (
    <div className={styles.radioGroup}>
      {options.map(option => {
        const active = value === option;
        return (
          <label key={option} className={active && styles.active}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={active}
              onChange={handleChange}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );

  return [value, element];
}
