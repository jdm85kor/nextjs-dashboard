import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { subDays } from "date-fns";
import { DateFilter } from "../types";

export const dateFilterConditionFromType = (
  type: DateFilter,
  timeZone: string,
  customDateRange?: { start: Date; end: Date }
): string => {
  const now = new Date();
  const nowZoneTime = toZonedTime(now, timeZone);
  const fullYear = nowZoneTime.getFullYear();
  const month = nowZoneTime.getMonth() + 1;
  const date = nowZoneTime.getDate();
  const day = nowZoneTime.getDay();

  const todayStartDate = `${fullYear}-${month}-${date}T00:00:00`;
  const utcTodayStartDate = fromZonedTime(todayStartDate, timeZone);

  if (type === "TODAY") {
    return `create_time >= ${utcTodayStartDate.toISOString()} AND create_time < ${now.toISOString()}`;
  } else if (type === "YESTERDAY") {
    const utcYesterdayStartDate = subDays(utcTodayStartDate, 1);
    return `create_time >= ${utcYesterdayStartDate.toISOString()} AND create_time < ${utcTodayStartDate.toISOString()}`;
  } else if (type === "THIS_WEEK") {
    const monday = 1;
    const utcMondayDate = subDays(utcTodayStartDate, day - monday);

    return `create_time >= ${utcMondayDate.toISOString()} AND create_time < ${now.toISOString()}`;
  } else if (type === "LAST_30_DAYS") {
    const utcBefore30DaysStartDate = subDays(utcTodayStartDate, 29);

    return `create_time >= ${utcBefore30DaysStartDate.toISOString()} AND create_time < ${now.toISOString()}`;
  } else if (type === "CUSTOM" && customDateRange) {
    // TBD

    return `create_time >= ${customDateRange?.start.toISOString()} AND create_time <= ${customDateRange?.end.toISOString()}`;
  } else {
    return "";
  }
};
