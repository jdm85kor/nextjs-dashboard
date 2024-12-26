"use client";

import Header from "./header/Header";
import Contents from "./contents/Contents";
import styles from "./Board.module.css";
import { useState } from "react";
import { DateFilter } from "../../types";
import type { Project } from "../../../types/project";
import type { Event } from "../../../types/event";

interface Props {
  projects: Project[];
  event: {
    events: Event[];
    nextPageToken: string;
    totalSize: number;
  };
}

export default function Board(props: Props) {
  const { projects, event } = props;
  const [dateFilter, setFilter] = useState<DateFilter>("LAST_30_DAYS");
  const [currProjectId, setCurrProjectId] = useState(projects[0].id);

  const handleChangeProject = (projectId: string) => {
    setCurrProjectId(projectId);
  };

  const handleClickDateFilter = (filter: DateFilter) => {
    setFilter(filter);
  };

  return (
    <section className={styles.board}>
      <Header
        currProjectId={currProjectId}
        dateFilter={dateFilter}
        projects={projects}
        onChangeProject={handleChangeProject}
        onClickDateFilter={handleClickDateFilter}
      />
      <Contents event={event} />
    </section>
  );
}
