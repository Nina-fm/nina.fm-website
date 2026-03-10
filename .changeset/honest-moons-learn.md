---
"nina.fm-website": patch
---

fix: proxy les covers via Nuxt server pour le MediaSession voiture

Les head units (CarPlay, Android Auto…) fetchent les artworks MediaSession depuis leur propre OS et ne peuvent pas atteindre le domaine API directement. Les covers sont maintenant proxifiées via `/api/cover/[...path]` pour être toujours accessibles depuis le domaine public du site.
