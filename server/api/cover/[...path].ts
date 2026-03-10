/**
 * Proxy d'images cover pour le MediaSession.
 *
 * Les head units voiture (CarPlay, Android Auto…) récupèrent les artworks
 * en faisant leur propre requête HTTP depuis leur OS — ils ne peuvent pas
 * forcément atteindre le domaine API. En proxyfiant via le domaine public
 * du site, on garantit que l'image est toujours accessible.
 *
 * URL : /api/cover/[...path]  →  fetch ${apiUrl}/[...path]
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string | undefined
  if (!apiUrl) {
    throw createError({ statusCode: 500, statusMessage: 'API URL not configured' })
  }

  const path = getRouterParam(event, 'path')
  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Missing path' })
  }

  const targetUrl = `${apiUrl.replace(/\/$/, '')}/${path}`

  let response: Response
  try {
    response = await fetch(targetUrl, { signal: AbortSignal.timeout(5000) })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Failed to reach cover origin' })
  }

  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: 'Cover not found' })
  }

  const contentType = response.headers.get('content-type') ?? 'image/jpeg'
  if (!contentType.startsWith('image/')) {
    throw createError({ statusCode: 400, statusMessage: 'Not an image' })
  }

  if (!response.body) {
    throw createError({ statusCode: 502, statusMessage: 'Empty response from cover origin' })
  }

  setResponseHeaders(event, {
    'content-type': contentType,
    'cache-control': 'public, max-age=3600',
  })

  return sendStream(event, response.body)
})
