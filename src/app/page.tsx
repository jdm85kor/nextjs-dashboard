import { cache, Suspense } from "react";
import styles from "./page.module.css";
import { eventClient } from "./lib/connectRpc-node";
import Board from "./components/board/Board";

import { convertProject, convertEvent } from "./lib/convert";

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
  const initEvent = await getEvents(convertedProjects[0].id);
  const convertedEvents = {
    ...initEvent,
    events: initEvent.events.map((event) => convertEvent(event)),
  };
  console.log(convertedEvents);

  return (
    <Suspense
      fallback={
        <div className={styles.fallback}>
          <p>Loading...</p>
        </div>
      }
    >
      <div className={styles.page}>
        <Board projects={convertedProjects} event={convertedEvents} />
      </div>
    </Suspense>
  );
}
