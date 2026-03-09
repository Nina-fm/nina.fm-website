/** Hour (inclusive) after which it is considered daytime */
export const DAY_START_HOUR = 7

/** Hour (exclusive) after which it is considered nighttime */
export const DAY_END_HOUR = 20

/** Daylight polling interval in ms */
export const DAYLIGHT_POLL_INTERVAL = 10000

/**
 * Returns true if the given hour is within daytime range.
 * Extracted here for use in lib/daylight (future PR).
 */
export const isDayTime = (hour: number): boolean => hour > DAY_START_HOUR && hour < DAY_END_HOUR
