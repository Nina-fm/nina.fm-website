/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// Cleanup des anciens caches
cleanupOutdatedCaches()

// Prend contrôle immédiatement
self.skipWaiting()
clientsClaim()

// Précache les assets générés par Vite
precacheAndRoute(self.__WB_MANIFEST)

// Gestion du cycle de vie
self.addEventListener('install', (event) => {
  console.log('[SW] Install - Version:', new Date().toISOString())
  // skipWaiting() déjà appelé ci-dessus
})

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate - Nettoyage des anciennes versions')
  event.waitUntil(
    (async () => {
      // Supprime tous les anciens caches
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith('workbox-') || name.startsWith('nina-'))
          .map((name) => {
            console.log('[SW] Suppression cache:', name)
            return caches.delete(name)
          }),
      )

      // Prend contrôle de tous les clients immédiatement
      return self.clients.claim()
    })(),
  )
})

// Stratégie réseau pour l'API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // API Nina.fm: NetworkFirst avec cache court
  if (url.origin === 'https://api.nina.fm') {
    event.respondWith(
      (async () => {
        try {
          // Essayer le réseau d'abord
          const response = await fetch(event.request)
          // Mettre en cache si succès
          const cache = await caches.open('nina-api-cache')
          cache.put(event.request, response.clone())
          return response
        } catch {
          // Fallback sur le cache en cas d'erreur réseau
          const cached = await caches.match(event.request)
          if (cached) return cached
          throw new Error('Pas de connexion et pas de cache')
        }
      })(),
    )
    return
  }

  // Autres requêtes: laisser passer normalement
})

// Message pour forcer le reload
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
