"use client";

import styles from "./Button.module.css";

interface Props {}

export default function Button(props: Props) {
  return <button className={styles.button}>Button</button>;
}
