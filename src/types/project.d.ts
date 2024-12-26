type TimeZone = {
  id: string;
  version?: string;
};

export type Project = {
  id: string;
  displayName: string;
  timeZone: TimeZone;
};
