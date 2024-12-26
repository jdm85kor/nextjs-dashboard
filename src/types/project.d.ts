type TimeZone = {
  id: string;
  version?: string;
};

type Project = {
  id: string;
  displayName: string;
  timeZone: TimeZone;
};
