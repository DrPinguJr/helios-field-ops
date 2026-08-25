import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterChip from '../components/FilterChip'
import ProductCard from '../components/ProductCard'
import { PRODUCT_SOURCES, products } from '../lib/data'

export default function ProductsPage() {
  const [activeSource, setActiveSource] = useState('all')

  const sourcesPresent = useMemo(
    () => PRODUCT_SOURCES.filter((source) => products.some((product) => product.source === source)),
    [],
  )

  const filtered = useMemo(
    () => products.filter((product) => activeSource === 'all' || product.source === activeSource),
    [activeSource],
  )

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Products</h1>

      {sourcesPresent.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <FilterChip active={activeSource === 'all'} onClick={() => setActiveSource('all')}>
            All
          </FilterChip>
          {sourcesPresent.map((source) => (
            <FilterChip
              key={source}
              active={activeSource === source}
              onClick={() => setActiveSource(source)}
            >
              {source}
            </FilterChip>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState label="products" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
