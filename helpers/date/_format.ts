import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { root } from "../root"

/** enable utc plugin */
dayjs.extend(utc)

/**
 * client side Mantine DatePicker component get data as a string with
 * local time zone of GMT=0100;
 * while sending this string data to api server side node change the
 * time zone to UTC (000Z);
 *
 * because by default the date picked by Mantine has its time value set to
 * midnight (00:00:00) when time zone change to UTC the time switch 1
 * hour back changing the data to 23:00:00 of the previous day
 *
 * ex. date client side: Thu Jan 05 2023 00:00:00 GMT+0100
 * ex. date server side: Wed Jan 04 2023 23:00:00 GMT+0100
 *
 * to prevent this behaviour without messing up with locale and time zones
 * we simply change the date picked from Mantine forward 12 hours
 * now the time of the date is in the middle of the day and when server
 * side go back to UTC the date won't change
 *
 * we don't care here about the right time, only the date
 */
export default (rawDate: Date) => {
  try {
    const date = (rawDate = new Date(rawDate))
    date.setHours(date.getHours() + 12)
    return date
  } catch (error) {
    root.logError({
      section: "root/date",
      summary: "could format date",
      where: "helpers/date/_formatOne.ts",
      stack: error,
    })
  }
}
