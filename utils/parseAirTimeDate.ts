import { parse } from "date-fns";

export default function parseAirTimeDate(date: string) {
  const dateWithoutMs = date.replace(/\.\d+$/, "");
  return parse(dateWithoutMs, "yyyy-MM-dd HH:mm:ss", new Date());
}
