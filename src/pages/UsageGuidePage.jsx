import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterChip from '../components/FilterChip'
import UsageGuideCard from '../components/UsageGuideCard'
import { USAGE_CONTEXTS, usageGuideEntries } from '../lib/data'

export default function UsageGuidePage() {
  const [activeContext, setActiveContext] = useState('all')

  const contextsPresent = useMemo(
    () => USAGE_CONTEXTS.filter((context) => usageGuideEntries.some((entry) => entry.context === context)),
    [],
  )

  const filtered = useMemo(
    () =>
      usageGuideEntries.filter((entry) => activeContext === 'all' || entry.context === activeContext),
    [activeContext],
  )

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Usage Guide</h1>

      {contextsPresent.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <FilterChip active={activeContext === 'all'} onClick={() => setActiveContext('all')}>
            All
          </FilterChip>
          {contextsPresent.map((context) => (
            <FilterChip
              key={context}
              active={activeContext === context}
              onClick={() => setActiveContext(context)}
            >
              {context}
            </FilterChip>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState label="usage guide entries" />
      ) : (
        <div className="space-y-4">
          {filtered.map((entry) => (
            <UsageGuideCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
