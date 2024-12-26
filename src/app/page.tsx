import { cache, Suspense } from "react";
import { eventClient } from "./lib/connectRpc-node";
import { convertProject, convertEvent } from "./lib/convert";
import Board from "./components/board/Board";

import styles from "./page.module.css";

const getProjects = cache(async () => {
  const res = await eventClient.listProjects({});
  return res.projects;
});

const getEvents = cache(async (projectId: string) => {
  const res = await eventClient.listEvents({ projectId });
  return res;
});

export default async function Home() {
  const convertedProjects = (await getProjects()).map((project) =>
    convertProject(project)
  );
  const originEventInfo = await getEvents(convertedProjects[0].id);
  const convertedEvents = {
    ...originEventInfo,
    events: originEventInfo.events.map((event) => convertEvent(event)),
  };

  return (
    <Suspense
      fallback={
        <div className={styles.fallback}>
          <p>Loading...</p>
        </div>
      }
    >
      <div className={styles.page}>
        <Board projects={convertedProjects} defaultEvent={convertedEvents} />
      </div>
    </Suspense>
  );
}
