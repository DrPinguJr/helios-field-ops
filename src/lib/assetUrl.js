// Resolves an `image` field value (a path relative to /public, e.g.
// "images/01_cold_plunge_products/helios_marketing_7.webp") against the
// app's base URL. Needed because GitHub Pages serves this app from
// /helios-field-ops/, not /, so a bare leading-slash path would 404 there
// while working fine in local dev. Absolute URLs (http/https) pass through
// unchanged.
export function assetUrl(path) {
  if (!path) return null
  if (/^https?:\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
