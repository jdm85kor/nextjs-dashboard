"use client";

import Header from "./header/Header";
import Contents from "./contents/Contents";
import { eventClient } from "../../lib/connectRpc-web";
import { convertEvent } from "../../lib/convert";
import { useState } from "react";
import { DateFilter } from "../../types";
import type { Project } from "../../../types/project";
import type { Event } from "../../../types/event";

import styles from "./Board.module.css";

interface Props {
  projects: Project[];
  defaultEvent: {
    events: Event[];
    nextPageToken: string;
    totalSize: number;
  };
}

export default function Board(props: Props) {
  const { projects, defaultEvent } = props;
  const [event, setEvent] = useState(defaultEvent);
  const [dateFilter, setFilter] = useState<DateFilter>("LAST_30_DAYS");
  const [currProjectId, setCurrProjectId] = useState(projects[0].id);

  const updateEvent = async (projectId: string) => {
    const updatedEvent = await eventClient.listEvents({ projectId });
    const convertedEvents = {
      ...updatedEvent,
      events: updatedEvent.events.map((event) => {
        return convertEvent(event);
      }),
    };

    setEvent(convertedEvents);
  };

  const handleChangeProject = (projectId: string) => {
    setCurrProjectId(projectId);
    updateEvent(projectId);
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
      <Contents
        event={event}
        timeZone={
          projects.find(({ id }) => id === currProjectId)?.timeZone.id || "UTC"
        }
      />
    </section>
  );
}
