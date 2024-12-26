import {
  Project as bufProject,
  Event as bufEvent,
} from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";
import type { Timestamp as bufTimestamp } from "@bufbuild/protobuf/wkt";
import { Project } from "../../types/project";
import { Event } from "../../types/event";

function toDate(timestamp: bufTimestamp): Date {
  const millis = Number(timestamp.seconds) * 1000 + timestamp.nanos / 1e6;
  return new Date(millis);
}

export const convertProject = (bufProject: bufProject): Project => {
  return {
    id: bufProject.id,
    displayName: bufProject.displayName,
    timeZone: {
      id: bufProject.timeZone?.id ?? "",
      version: bufProject.timeZone?.version ?? "",
    },
  };
};

export const convertEvent = (bufEvent: bufEvent): Event => {
  return {
    id: bufEvent.id,
    type: bufEvent.type,
    createTime: bufEvent.createTime ? toDate(bufEvent.createTime) : new Date(),
  };
};
