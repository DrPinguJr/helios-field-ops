// Thin read layer over /data. This is the only place /src should import
// /data JSON files from — components consume these exports, never the raw
// files directly. See /docs/content-schema.md for the field contract.

import packingRaw from '../../data/packing.json'
import productsRaw from '../../data/products.json'
import troubleshootingRaw from '../../data/troubleshooting.json'
import usageGuideRaw from '../../data/usage-guide.json'

export const packingSteps = packingRaw
export const troubleshootingEntries = troubleshootingRaw
export const products = productsRaw
export const usageGuideEntries = usageGuideRaw

// Enumerated values from the schema contract, used to drive filter UI even
// while /data is still empty.
export const PACKING_ITEMS = ['ice-bath', 'compression-boots', 'chair', 'misc']

export const USAGE_CONTEXTS = [
  'before-sport',
  'during-sport',
  'after-sport',
  'injury-recovery',
  'cramps-muscle-ache',
]

export const PRODUCT_SOURCES = ['helios', 'competitor']
