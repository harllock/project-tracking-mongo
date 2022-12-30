import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { root } from "../root"

/** enable utc plugin */
dayjs.extend(utc)

/** set passed date to utc +2 time */
export default (rawDate: Date) => {
  try {
    const date = dayjs.utc(rawDate).utcOffset(2).format()
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
