"use client";

import styles from "./Dropdown.module.css";

interface Props {
  curValue?: string;
  options?: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export default function Dropdown({ curValue, options = [], onChange }: Props) {
  return (
    <div className={styles.dropdown}>
      <select
        name="dropdown"
        id="dropdown"
        defaultValue={curValue}
        onChange={(evt) => onChange(evt.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
