import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterChip from '../components/FilterChip'
import PackingStepCard from '../components/PackingStepCard'
import { PACKING_ITEMS, packingSteps } from '../lib/data'

export default function PackingPage() {
  const [activeItem, setActiveItem] = useState('all')

  const itemsPresent = useMemo(
    () => PACKING_ITEMS.filter((item) => packingSteps.some((step) => step.item === item)),
    [],
  )

  const filtered = useMemo(
    () =>
      packingSteps
        .filter((step) => activeItem === 'all' || step.item === activeItem)
        .slice()
        .sort((a, b) => a.phase.localeCompare(b.phase) || a.order - b.order),
    [activeItem],
  )

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Packing &amp; Teardown</h1>

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
        <EmptyState label="packing steps" />
      ) : (
        <div className="space-y-4">
          {filtered.map((step) => (
            <PackingStepCard key={step.id} step={step} />
          ))}
        </div>
      )}
    </div>
  )
}
