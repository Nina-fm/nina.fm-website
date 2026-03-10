---
"nina.fm-website": patch
---

fix: résoudre les URLs relatives en absolues dans getArtwork pour CarPlay

Les head units CarPlay reçoivent l'URL du artwork telle quelle sans connaître l'origine de la page. Une URL relative `/api/cover/...` était donc non-résolvable par le système CarPlay. `getArtwork` préfixe maintenant l'origin sur toute URL commençant par `/`.
