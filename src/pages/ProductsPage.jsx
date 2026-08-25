import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import ProductCard from '../components/ProductCard'
import { products } from '../lib/data'

const PRODUCT_TYPES = [
  {
    value: 'ice-bath',
    label: 'Cold Plunges',
    hint: 'Tubs, chillers, and complete cold-plunge systems',
  },
  {
    value: 'compression-boots',
    label: 'Compression Boots',
    hint: 'Pneumatic recovery boots and control systems',
  },
]

function ProductGroup({ title, description, products: groupedProducts, accent = false }) {
  return (
    <section
      className={`space-y-4 rounded-2xl border p-4 ${
        accent
          ? 'border-helios-accent/40 bg-helios-accent/5'
          : 'border-helios-border bg-white/[0.02]'
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${accent ? 'text-helios-accent-soft' : 'text-white'}`}>
            {title}
          </h2>
          <p className="text-sm text-white/50">{description}</p>
        </div>
        <span className="shrink-0 rounded-full border border-helios-border px-2.5 py-1 text-xs text-white/50">
          {groupedProducts.length}
        </span>
      </header>

      {groupedProducts.length === 0 ? (
        <EmptyState label={`${title.toLowerCase()} products`} />
      ) : (
        <div className="space-y-4">
          {groupedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default function ProductsPage() {
  const [activeType, setActiveType] = useState('ice-bath')

  const selectedProducts = useMemo(
    () => products.filter((product) => product.type === activeType),
    [activeType],
  )

  const heliosProducts = selectedProducts.filter((product) => product.source === 'helios')
  const competitorProducts = selectedProducts.filter((product) => product.source === 'competitor')

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">Product Comparison</h1>
        <p className="text-sm text-white/60">
          Choose one equipment category, then compare Helios Fitness with its competitors.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Equipment category">
        {PRODUCT_TYPES.map((type) => {
          const active = activeType === type.value
          const count = products.filter((product) => product.type === type.value).length

          return (
            <button
              key={type.value}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveType(type.value)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                active
                  ? 'border-helios-accent bg-helios-accent/10'
                  : 'border-helios-border bg-helios-surface hover:border-white/30'
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className={`font-semibold ${active ? 'text-helios-accent-soft' : 'text-white'}`}>
                  {type.label}
                </span>
                <span className="text-xs text-white/40">{count} products</span>
              </span>
              <span className="mt-1 block text-sm text-white/50">{type.hint}</span>
            </button>
          )
        })}
      </div>

      <p className="rounded-lg border border-helios-warn/30 bg-helios-warn/5 px-3 py-2 text-xs text-helios-warn">
        Listed prices use different source currencies. Check each product's notes before comparing
        price.
      </p>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24">
          <ProductGroup
            title="Helios Fitness"
            description="Helios products in this category"
            products={heliosProducts}
            accent
          />
        </div>
        <ProductGroup
          title="Competitors"
          description="Other brands in the same category"
          products={competitorProducts}
        />
      </div>
    </div>
  )
}
