"use client";

import Header from "./header/Header";
import Contents from "./contents/Contents";
import styles from "./Board.module.css";
import { useState } from "react";

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
        projects={projects}
        onChangeProject={handleChangeProject}
        onClickDateFilter={handleClickDateFilter}
      />
      <Contents event={event} />
    </section>
  );
}
