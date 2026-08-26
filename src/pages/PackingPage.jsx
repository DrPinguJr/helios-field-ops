import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterChip from '../components/FilterChip'
import PackingSequence from '../components/PackingSequence'
import { PACKING_ITEMS, packingSteps } from '../lib/data'

const ITEM_LABELS = {
  'ice-bath': 'Ice Bath',
  'compression-boots': 'Compression Boots',
  chair: 'Chair',
  misc: 'Miscellaneous Kit',
}

const SEQUENCE_META = {
  'daily-close': {
    label: 'Daily maintenance close',
    hint: 'A standalone routine, separate from the full pack-down.',
    rank: 1,
  },
  'full-teardown': {
    label: 'Full teardown',
    hint: 'Follow every connected step in order.',
    rank: 2,
  },
  collection: {
    label: 'Collection task',
    hint: 'A standalone task for this item.',
    rank: 3,
  },
  inventory: {
    label: 'Inventory check',
    hint: 'A standalone check for this kit.',
    rank: 4,
  },
}

function sequenceMeta(sequence) {
  return (
    SEQUENCE_META[sequence] ?? {
      label: sequence.replaceAll('-', ' '),
      hint: 'Follow the steps shown for this workflow.',
      rank: 99,
    }
  )
}

export default function PackingPage() {
  const [activeItem, setActiveItem] = useState('all')

  const itemsPresent = useMemo(
    () => PACKING_ITEMS.filter((item) => packingSteps.some((step) => step.item === item)),
    [],
  )

  const itemSections = useMemo(() => {
    const visibleItems = itemsPresent.filter((item) => activeItem === 'all' || item === activeItem)

    return visibleItems.map((item) => {
      const itemSteps = packingSteps.filter((step) => step.item === item)
      const sequenceIds = [...new Set(itemSteps.map((step) => step.sequence))].sort(
        (a, b) => sequenceMeta(a).rank - sequenceMeta(b).rank,
      )

      return {
        item,
        steps: itemSteps,
        sequences: sequenceIds.map((sequence) => ({
          id: sequence,
          ...sequenceMeta(sequence),
          steps: itemSteps
            .filter((step) => step.sequence === sequence)
            .slice()
            .sort((a, b) => a.order - b.order),
        })),
      }
    })
  }, [activeItem, itemsPresent])

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">Packing &amp; Teardown</h1>
        <p className="text-sm text-white/60">
          Choose the equipment, then follow only the workflow that matches the job.
        </p>
      </header>

      {itemsPresent.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <FilterChip active={activeItem === 'all'} onClick={() => setActiveItem('all')}>
            All
          </FilterChip>
          {itemsPresent.map((item) => (
            <FilterChip key={item} active={activeItem === item} onClick={() => setActiveItem(item)}>
              {ITEM_LABELS[item] ?? item}
            </FilterChip>
          ))}
        </div>
      )}

      <div className="flex gap-3 rounded-xl border border-helios-accent/25 bg-helios-accent/5 p-3 text-xs text-white/60 sm:text-sm">
        <span className="mt-0.5 flex shrink-0 items-center gap-1" aria-hidden="true">
          <span className="size-3 rounded-full border-2 border-helios-accent" />
          <span className="h-px w-5 bg-helios-accent/60" />
          <span className="size-3 rounded-full border-2 border-helios-accent" />
        </span>
        <p>
          An orange line joins steps from one continuous sequence. Separate bordered groups are
          separate routines.
        </p>
      </div>

      {itemSections.length === 0 ? (
        <EmptyState label="packing workflows" />
      ) : (
        <div className="space-y-10">
          {itemSections.map((section) => (
            <section key={section.item} className="space-y-4">
              <header className="flex items-end justify-between gap-3 border-b border-helios-border pb-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-helios-accent-soft">Equipment</p>
                  <h2 className="text-xl font-semibold text-white">
                    {ITEM_LABELS[section.item] ?? section.item}
                  </h2>
                </div>
                <p className="text-right text-xs text-white/40">
                  {section.sequences.length}{' '}
                  {section.sequences.length === 1 ? 'workflow' : 'separate workflows'} ·{' '}
                  {section.steps.length} {section.steps.length === 1 ? 'step' : 'steps'}
                </p>
              </header>

              {section.sequences.length > 1 && (
                <p className="rounded-lg border border-helios-warn/25 bg-helios-warn/5 px-3 py-2 text-xs text-helios-warn">
                  These workflows are alternatives. Choose the one that matches the current job.
                </p>
              )}

              <div className="space-y-5">
                {section.sequences.map((sequence) => (
                  <PackingSequence
                    key={`${section.item}-${sequence.id}`}
                    title={sequence.label}
                    hint={sequence.hint}
                    phase={sequence.steps[0]?.phase}
                    steps={sequence.steps}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
