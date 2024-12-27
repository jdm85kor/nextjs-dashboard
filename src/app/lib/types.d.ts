import type { Event } from "../types/event";
import type { Project } from "../types/project";

export type GetListEventsRequest = {
  projectId: string;
  /**
   * (Optional) The maximum number of events to return. The service may return fewer than this value.
   * If unspecified, at most 15 events will be returned.
   * The maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number;
  /**
   * (Optional) A page token, received from a previous `ListEvents` call.
   * While paginating with token, client must provide the same `filter` as in the previous request.
   */
  pageToken?: string;
  /**
   * (Optional) A string representation of filter expression.
   * Allowed syntax:
   * create_time >= "2019-01-01T00:00:00Z"
   * create_time < "2019-01-01T00:00:00Z"
   * {condition} AND {condition}
   */
  filter?: string;
};

export type GetListEventsResponse = {
  events: Event[];
  nextPageToken: string;
  totalSize: number;
};

// export type GetListProjectsRequest = {};
export type GetListProjectsResponse = {
  project: Project[];
};
