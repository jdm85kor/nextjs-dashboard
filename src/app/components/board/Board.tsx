"use client";

import Header from "./header/Header";
import Contents from "./contents/Contents";
import { eventClient } from "../../lib/connectRpc-web";
import { convertEvent } from "../../lib/convert";
import type { GetListEventsResponse } from "../../lib/types";
import { useState } from "react";
import { DateFilter } from "./types";
import { dateFilterConditionFromType } from "./lib/utils";
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
  const [curProject, setCurProject] = useState(projects[0]);
  const [eventInfo, setEventInfo] = useState(defaultEvent);
  const [curPageNumber, setCurPageNumber] = useState(1);
  const [pageTokens, setPageTokens] = useState<string[]>([
    defaultEvent.nextPageToken,
  ]);
  const [dateFilter, setFilter] = useState<DateFilter>("LAST_30_DAYS");

  const getUpdatedEvent = async (
    projectId: string,
    pageToken?: string,
    filter?: string
  ) => {
    try {
      const updatedEvent: GetListEventsResponse = await eventClient.listEvents({
        projectId,
        pageToken,
        filter,
      });

      return {
        ...updatedEvent,
        events: updatedEvent.events.map((event) => convertEvent(event)),
      };
    } catch (e) {
      console.error(e);
    }
  };

  const resetBoardInfo = () => {
    setFilter("LAST_30_DAYS");
    setCurPageNumber(1);
    setPageTokens([]);
  };

  const handleChangeProject = async (project: Project) => {
    resetBoardInfo();
    const updatedEvent = await getUpdatedEvent(
      project.id,
      "",
      dateFilterConditionFromType("LAST_30_DAYS", project.timeZone.id)
    );

    if (!updatedEvent) return;

    setCurProject(project);
    setEventInfo(updatedEvent);
    setPageTokens([updatedEvent.nextPageToken]);
  };

  const handleClickDateFilter = async (filter: DateFilter) => {
    const updatedEvent = await getUpdatedEvent(
      curProject.id,
      "",
      dateFilterConditionFromType(filter, curProject.timeZone.id)
    );

    if (!updatedEvent) return;

    setEventInfo(updatedEvent);
    setFilter(filter);
    setCurPageNumber(1);

    setPageTokens(
      updatedEvent.nextPageToken ? [updatedEvent.nextPageToken] : []
    );
  };

  const movePrevPage = async () => {
    if (curPageNumber < 2) return;

    const updatedEvent = await getUpdatedEvent(
      curProject.id,
      curPageNumber > 2 ? pageTokens[curPageNumber - 3] : "",
      dateFilterConditionFromType(dateFilter, curProject.timeZone.id)
    );

    if (updatedEvent) {
      setEventInfo(updatedEvent);
      setCurPageNumber((prev) => prev - 1);
    }
  };

  const moveNextPage = async () => {
    const updatedEvent = await getUpdatedEvent(
      curProject.id,
      pageTokens[curPageNumber - 1],
      dateFilterConditionFromType(dateFilter, curProject.timeZone.id)
    );

    if (!updatedEvent) return;

    setCurPageNumber((prev) => prev + 1);
    setEventInfo(updatedEvent);

    if (
      updatedEvent.nextPageToken &&
      !pageTokens.includes(updatedEvent.nextPageToken)
    ) {
      setPageTokens((prev) => [...prev, updatedEvent.nextPageToken]);
    }
  };

  return (
    <section className={styles.board}>
      <Header
        currProjectId={curProject.id}
        dateFilter={dateFilter}
        projects={projects}
        onChangeProject={handleChangeProject}
        onClickDateFilter={handleClickDateFilter}
      />
      <Contents
        event={eventInfo}
        timeZone={curProject.timeZone.id}
        curPage={curPageNumber}
        movePrevPage={movePrevPage}
        moveNextPage={moveNextPage}
      />
    </section>
  );
}
