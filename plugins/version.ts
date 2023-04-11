import { compareVersions, satisfies } from "compare-versions"
import versionNotices, { Notice } from "~/version-notices"

import pkg from "~~/package.json"

export default defineNuxtPlugin(() => {
  const current = pkg.version
  const stored = useCookie("ninafm-app-version")
  const previous = `${stored.value ?? ""}`
  const isNew = current !== previous
  const messages = ref<Notice[]>(
    Object.keys(versionNotices)
      .sort(compareVersions)
      .reduce((res, v) => {
        const msg = versionNotices[v]
        if (!!previous && isNew && satisfies(current, `>=${v}`) && satisfies(previous, msg.satisfies)) {
          res.push(msg)
        }
        return res
      }, [] as Notice[])
  )

  onNuxtReady(() => {
    if (isNew) {
      stored.value = current
    }
  })

  const version = {
    current,
    previous,
    isNew,
    messages,
  }

  return {
    provide: {
      version,
    },
  }
})
