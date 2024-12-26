"use client";

import Dropdown from "../../dropdown/Dropdown";
import Button from "../../button/Button";
import { DateFilter } from "../../../types";
import styles from "./Header.module.css";
import type { Project } from "../../../../types/project";

interface Props {
  currProjectId: string;
  dateFilter: DateFilter;
  projects: Project[];
  onChangeProject: (projectId: string) => void;
  onClickDateFilter: (filter: DateFilter) => void;
}

export default function Header({
  currProjectId,
  projects,
  onChangeProject,
  onClickDateFilter,
}: Props) {
  return (
    <header className={styles.header}>
      <Dropdown
        curValue={currProjectId}
        options={projects.map(({ displayName, id }) => ({
          label: displayName,
          value: id,
        }))}
        onChange={(value) => onChangeProject(value)}
      />
      <ol className={styles.buttonGroup}>
        <li key={1}>
          <Button label="Today" value="TODAY" onClick={onClickDateFilter} />
        </li>
        <li key={2}>
          <Button
            label="Yesterday"
            value="YESTERDAY"
            onClick={onClickDateFilter}
          />
        </li>
        <li key={3}>
          <Button label="7D" value="LAST_7_DAYS" onClick={onClickDateFilter} />
        </li>
        <li key={4}>
          <Button
            label="30D"
            value="LAST_30_DAYS"
            onClick={onClickDateFilter}
          />
        </li>
        <li key={5}>
          <Button label="3M" value="LAST_3_MONTH" onClick={onClickDateFilter} />
        </li>
        <li key={6}>
          <Button label="6M" value="LAST_6_MONTH" onClick={onClickDateFilter} />
        </li>
        <li key={7}>
          <Button
            label="12M"
            value="LAST_12_MONTH"
            onClick={onClickDateFilter}
          />
        </li>
        <li key={8}>
          <Button label="CUSTOM" value="CUSTOM" onClick={onClickDateFilter} />
        </li>
      </ol>
    </header>
  );
}
