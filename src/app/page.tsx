import { cache, Suspense } from "react";
import styles from "./page.module.css";
import { eventClient } from "./lib/connectRpc-node";
import Board from "./components/board/Board";

export const dynamic = "force-dynamic";

const getProjects = cache(async () => {
  const res = await eventClient.listProjects({});
  return res.projects;
});

const getEvents = cache(async (projectId: string) => {
  const res = await eventClient.listEvents({ projectId });
  return res;
});

export default async function Home() {
  const projects = await getProjects();
  const initEvent = await getEvents(projects[0].id);

  return (
    <Suspense
      fallback={
        <div className={styles.fallback}>
          <p>Loading...</p>
        </div>
      }
    >
      <div className={styles.page}>
        <Board projects={projects} event={initEvent} />
      </div>
    </Suspense>
  );
}
