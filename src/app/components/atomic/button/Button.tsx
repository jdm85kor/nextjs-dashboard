"use client";

import styles from "./Button.module.css";

interface Props<T> {
  label?: string;
  value: T;
  onClick: (val: T) => void;
}

export default function Button<T>({ label = "", value, onClick }: Props<T>) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}
