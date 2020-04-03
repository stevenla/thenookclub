import React, { useState } from "react";
import styles from "./RadioGroup.module.css";

let counter = 0;

export function useRadioGroup(options: string[]): [string, JSX.Element] {
  const [id] = useState(() => counter++);
  const [value, setValue] = useState<string>(options[0]);

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
              name={id.toString()}
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
