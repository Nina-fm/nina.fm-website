---
"nina.fm-website": patch
---

fix(audio): ne plus afficher les toasts de connexion tant que l'audio n'est pas débloqué

Les toasts "Reconnexion en cours...", "Connexion perdue..." et "Réseau rétabli..." n'apparaissent plus au chargement de la page quand le navigateur bloque l'autoplay (avant que l'utilisateur clique pour lancer la radio).
