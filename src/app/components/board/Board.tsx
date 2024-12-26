"use client";

import Header from "./header/Header";
import Contents from "./contents/Contents";
import styles from "./Board.module.css";
import { useState } from "react";

type DateFilter =
  | "TODAY"
  | "YESTERDAY"
  | "LAST_7_DAYS"
  | "LAST_30_DAYS"
  | "LAST_3_MONTH"
  | "LAST_6_MONTH"
  | "LAST_12_MONTH"
  | "CUSTOM";

interface Props {
  projects: {
    id: string;
    displayName: string;
    timeZone: any;
  }[];
  event: {
    events: { id: string; type: string; createTime: any }[];
    nextPageToken: string;
    totalSize: number;
  };
}

export default function Board(props: Props) {
  const { projects, event } = props;
  const [dateFilter, setFilter] = useState<DateFilter>("LAST_30_DAYS");
  const [currProjectId, setCurrProjectId] = useState(projects[0].id);

  return (
    <section className={styles.board}>
      <Header projects={projects} />
      <Contents event={event} />
    </section>
  );
}
