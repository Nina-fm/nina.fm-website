/** Maximum number of reconnection attempts before giving up */
export const MAX_RECONNECT_ATTEMPTS = 10

/** Progressive reconnection delays in ms (faster initial retry) */
export const RECONNECT_DELAYS = [2000, 5000, 10000, 15000, 20000]

/** Heartbeat interval: check every 5s if stream is alive */
export const HEARTBEAT_INTERVAL = 5000

/** Delay between stop and start during a reconnect cycle */
export const RECONNECT_STOP_START_DELAY = 1000

/** Delay before checking if reconnect succeeded */
export const RECONNECT_SUCCESS_CHECK_DELAY = 2000

/** Additional delay for double-checking reconnect success */
export const RECONNECT_DOUBLE_CHECK_DELAY = 2000

/** Delay after page becomes visible again before attempting reconnect */
export const VISIBILITY_RESTORE_DELAY = 1000

/** Grace period before activating network issue detection (lets audio load normally first) */
export const NETWORK_CHECK_GRACE_DELAY = 2000
