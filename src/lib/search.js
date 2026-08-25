import Fuse from 'fuse.js'
import { packingSteps, products, troubleshootingEntries, usageGuideEntries } from './data'

function buildIndex() {
  const index = []

  for (const step of packingSteps) {
    index.push({
      id: step.id,
      category: 'packing',
      title: step.title,
      subtitle: `${step.item} · ${step.phase}`,
      text: [step.title, step.detail, step.warning].filter(Boolean).join(' '),
      href: `/packing#${step.id}`,
    })
  }

  for (const entry of troubleshootingEntries) {
    index.push({
      id: entry.id,
      category: 'troubleshooting',
      title: entry.symptom,
      subtitle: entry.item,
      text: [entry.symptom, ...(entry.causes ?? []).map((c) => `${c.cause} ${c.fix}`)]
        .filter(Boolean)
        .join(' '),
      href: `/troubleshooting#${entry.id}`,
    })
  }

  for (const product of products) {
    index.push({
      id: product.id,
      category: 'product',
      title: product.name ?? product.id,
      subtitle: `${product.type} · ${product.source}`,
      text: [product.name, product.material, product.notes].filter(Boolean).join(' '),
      href: `/products#${product.id}`,
    })
  }

  for (const entry of usageGuideEntries) {
    index.push({
      id: entry.id,
      category: 'usage-guide',
      title: entry.context,
      subtitle: entry.item,
      text: [entry.context, entry.guidance, entry.cautions].filter(Boolean).join(' '),
      href: `/usage-guide#${entry.id}`,
    })
  }

  return index
}

const searchIndex = buildIndex()

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'subtitle', weight: 0.2 },
    { name: 'text', weight: 0.4 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
})

export function search(query) {
  if (!query || !query.trim()) return []
  return fuse.search(query.trim()).map((result) => result.item)
}
