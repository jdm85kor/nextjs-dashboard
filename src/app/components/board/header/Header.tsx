"use client";

import Dropdown from "../../dropdown/Dropdown";
import Button from "../../button/Button";
import styles from "./Header.module.css";

interface Props {}

export default function Header(props: Props) {
  return (
    <header className={styles.header}>
      <Dropdown
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
        ]}
        onChange={(value) => console.log(value)}
      />
      <ol className={styles.buttonGroup}>
        <li key={1}>
          <Button />
        </li>
        <li key={2}>
          <Button />
        </li>
        <li key={3}>
          <Button />
        </li>
        <li key={4}>
          <Button />
        </li>
        <li key={5}>
          <Button />
        </li>
      </ol>
    </header>
  );
}
