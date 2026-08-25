import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { packingSteps, products, troubleshootingEntries, usageGuideEntries } from '../lib/data'

const sections = [
  {
    to: '/packing',
    label: 'Packing & Teardown',
    hint: 'Setup and breakdown steps per item',
    count: packingSteps.length,
  },
  {
    to: '/troubleshooting',
    label: 'Troubleshooting',
    hint: 'Symptom → cause → fix',
    count: troubleshootingEntries.length,
  },
  {
    to: '/products',
    label: 'Products',
    hint: 'Helios specs + competitor research',
    count: products.length,
  },
  {
    to: '/usage-guide',
    label: 'Usage Guide',
    hint: 'When and how to use each item',
    count: usageGuideEntries.length,
  },
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3 text-center">
        <h1 className="text-2xl font-bold text-white">Field reference for Helios gear</h1>
        <p className="text-white/60">
          Packing, troubleshooting, usage guidance, and product specs — all in one place.
        </p>
        <div className="mx-auto max-w-lg">
          <SearchBar autoFocus />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="rounded-xl border border-helios-border bg-helios-surface p-4 transition-colors hover:border-helios-accent/50"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-white">{section.label}</h2>
              <span className="text-xs text-white/40">{section.count} entries</span>
            </div>
            <p className="mt-1 text-sm text-white/60">{section.hint}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
