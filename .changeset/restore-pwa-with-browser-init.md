---
'nina.fm-website': patch
---

Restore PWA with generateSW strategy and client-only browser initializer. Fixes Service Worker 503 errors and useScreenOrientation SSR crash by using a proper Vue component lifecycle instead of plugins.
