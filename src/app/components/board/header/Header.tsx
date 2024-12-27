"use client";

import { DateRange, RangeKeyDict } from "react-date-range";
import Dropdown from "../../atomic/dropdown/Dropdown";
import Button from "../../atomic/button/Button";
import type { DateFilter } from "../types";
import type { Project } from "../../../../types/project";

import styles from "./Header.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Props {
  currProjectId: string;
  dateFilter: DateFilter;
  projects: Project[];
  dateRange: { startDate: Date; endDate: Date; key: string };
  onChangeProject: (project: Project) => void;
  onClickDateFilter: (filter: DateFilter) => void;
  onChangeDateRange: (start: Date, end: Date) => void;
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
  dateRange,
  onChangeProject,
  onClickDateFilter,
  onChangeDateRange,
}: Props) {
  const handleChangeDateRange = ({
    selection: { startDate, endDate },
  }: RangeKeyDict) => {
    onChangeDateRange(startDate ?? new Date(), endDate ?? new Date());
  };

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
        {dateFilter === "CUSTOM" && (
          <li key="date-picker">
            <DateRange
              editableDateInputs
              onChange={handleChangeDateRange}
              moveRangeOnFirstSelection={false}
              ranges={[dateRange]}
            />
          </li>
        )}
      </ol>
    </header>
  );
}
