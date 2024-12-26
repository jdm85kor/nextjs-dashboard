"use strict";

import Pagination from "../../pagination/Pagination";

interface Props {
  event: {
    events: { id: string; type: string; createTime: any }[];
    nextPageToken: string;
    totalSize: number;
  };
}

export default function Contents(props: Props) {
  const { event } = props;

  return (
    <main>
      <div>{event.totalSize}&nbsp;events</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TYPE</th>
            <th>CREATE TIME</th>
          </tr>
        </thead>
        <tbody>
          {event.events.map(({ id, createTime, type }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{BigInt(createTime?.seconds ?? 0)}</td>
              <td>{type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </main>
  );
}
