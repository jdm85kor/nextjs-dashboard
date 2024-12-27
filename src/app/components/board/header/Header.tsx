"use client";

import Dropdown from "../../atomic/dropdown/Dropdown";
import Button from "../../atomic/button/Button";
import { DateFilter } from "../types";
import styles from "./Header.module.css";
import type { Project } from "../../../../types/project";

interface Props {
  currProjectId: string;
  dateFilter: DateFilter;
  projects: Project[];
  onChangeProject: (project: Project) => void;
  onClickDateFilter: (filter: DateFilter) => void;
}

const ButtonsGroup = [
  {
    label: "Today",
    value: "TODAY",
  },
  {
    label: "Yesterday",
    value: "YESTERDAY",
  },
  {
    label: "This Week",
    value: "THIS_WEEK",
  },
  {
    label: "30D",
    value: "LAST_30_DAYS",
  },
  {
    label: "CUSTOM",
    value: "CUSTOM",
  },
] as const;

export default function Header({
  currProjectId,
  projects,
  dateFilter,
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
        onChange={(value) =>
          onChangeProject(projects.find((p) => p.id === value)!)
        }
      />
      <ol className={styles.buttonGroup}>
        {ButtonsGroup.map(({ label, value }) => (
          <li key={value}>
            <Button
              label={label}
              value={value}
              active={dateFilter === value}
              onClick={onClickDateFilter}
            />
          </li>
        ))}
      </ol>
    </header>
  );
}
