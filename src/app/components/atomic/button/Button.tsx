"use client";

import cn from "classnames";

import styles from "./Button.module.css";

interface Props<T> {
  label?: string;
  value: T;
  active?: boolean;
  onClick: (val: T) => void;
}

export default function Button<T>({
  label = "",
  value,
  active = false,
  onClick,
}: Props<T>) {
  return (
    <button
      className={cn(styles.button, active && styles["--active"])}
      type="button"
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}
