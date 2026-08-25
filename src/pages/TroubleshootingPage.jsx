import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterChip from '../components/FilterChip'
import TroubleshootingCard from '../components/TroubleshootingCard'
import { PACKING_ITEMS, troubleshootingEntries } from '../lib/data'

export default function TroubleshootingPage() {
  const [activeItem, setActiveItem] = useState('all')

  const itemsPresent = useMemo(
    () => PACKING_ITEMS.filter((item) => troubleshootingEntries.some((entry) => entry.item === item)),
    [],
  )

  const filtered = useMemo(
    () => troubleshootingEntries.filter((entry) => activeItem === 'all' || entry.item === activeItem),
    [activeItem],
  )

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Troubleshooting</h1>

      {itemsPresent.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <FilterChip active={activeItem === 'all'} onClick={() => setActiveItem('all')}>
            All
          </FilterChip>
          {itemsPresent.map((item) => (
            <FilterChip key={item} active={activeItem === item} onClick={() => setActiveItem(item)}>
              {item}
            </FilterChip>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState label="troubleshooting entries" />
      ) : (
        <div className="space-y-4">
          {filtered.map((entry) => (
            <TroubleshootingCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
