import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { subDays, addDays } from "date-fns";
import { DateFilter } from "../types";

export const dateFilterConditionFromType = (
  type: DateFilter,
  timeZone: string,
  customDateRange?: { startDate: Date; endDate: Date }
): string => {
  const now = new Date();
  const nowZoneTime = toZonedTime(now, timeZone);
  const fullYear = nowZoneTime.getFullYear();
  const month = nowZoneTime.getMonth() + 1;
  const date = nowZoneTime.getDate();
  const day = nowZoneTime.getDay();

  const utcTodayStartDate = fromZonedTime(
    `${fullYear}-${String(month).padStart(2, "0")}-${String(date).padStart(
      2,
      "0"
    )}T00:00:00`,
    timeZone
  );

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
    // start
    const { startDate, endDate } = customDateRange;
    const startFullYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDateDate = startDate.getDate();

    const utcStartDate = fromZonedTime(
      `${startFullYear}-${String(startMonth).padStart(2, "0")}-${String(
        startDateDate
      ).padStart(2, "0")}T00:00:00`,
      timeZone
    );

    // end
    const endFullYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDateDate = endDate.getDate();

    const utcEndDate = addDays(
      fromZonedTime(
        `${endFullYear}-${String(endMonth).padStart(2, "0")}-${String(
          endDateDate
        ).padStart(2, "0")}T00:00:00`,
        timeZone
      ),
      1
    );

    return `create_time >= ${utcStartDate.toISOString()} AND create_time < ${utcEndDate.toISOString()}`;
  } else {
    return "";
  }
};
