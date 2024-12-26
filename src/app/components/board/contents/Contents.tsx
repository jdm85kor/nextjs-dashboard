"use strict";


import { formatInTimeZone } from "date-fns-tz";
import { useState } from "react";
import Pagination from "../../atomic/pagination/Pagination";
import type { Event } from "../../../../types/event";

import styles from "./Contents.module.css";

interface Props {
  event: {
    events: Event[];
    nextPageToken: string;
    totalSize: number;
  };
  timeZone: string;
}

export default function Contents(props: Props) {
  const { event, timeZone } = props;

  const [curPage, setCurPage] = useState(1);

  const handleClickPrev = () => {
    setCurPage((prev) => prev - 1);
  };
  const handleClickNext = () => {
    setCurPage((prev) => prev + 1);
  };

  return (
    <main>
      <div>{event.totalSize}&nbsp;events</div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>TYPE</th>
            <th>CREATE TIME</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {event.events.map(({ id, createTime, type }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{type ?? "-"}</td>
              <td>
                {formatInTimeZone(
                  createTime,
                  timeZone,
                  "MMM, dd, yyyy, HH:mm a"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        curPage={curPage}
        totalSize={event.totalSize}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
    </main>
  );
}
