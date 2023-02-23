import { DateTime } from "luxon"

export const parseAirTimeDate = (date: string) => DateTime.fromFormat(date.replace(/\.\d+$/, ""), "yyyy-MM-dd HH:mm:ss")
