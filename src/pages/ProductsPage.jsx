import { useEffect, useMemo, useRef, useState } from 'react'
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

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

function DesktopProductGroup({ title, description, products: groupedProducts, accent = false }) {
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

function MobileComparisonPanel({ title, description, products: groupedProducts, accent, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(null)
  const activeProduct = groupedProducts[activeIndex]
  const canSwitch = groupedProducts.length > 1

  function showPrevious() {
    if (!canSwitch) return
    setActiveIndex((current) => (current - 1 + groupedProducts.length) % groupedProducts.length)
  }

  function showNext() {
    if (!canSwitch) return
    setActiveIndex((current) => (current + 1) % groupedProducts.length)
  }

  function handleTouchStart(event) {
    touchStartX.current = event.changedTouches[0].clientX
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return
    const distance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(distance) < 45) return
    if (distance < 0) showNext()
    else showPrevious()
  }

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null
      }}
      className={`min-w-0 touch-pan-y space-y-3 rounded-2xl border p-3 ${
        accent
          ? 'border-helios-accent/40 bg-helios-accent/5'
          : 'border-helios-border bg-white/[0.02]'
      }`}
      aria-label={`${title} product switcher`}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className={`text-lg font-semibold ${accent ? 'text-helios-accent-soft' : 'text-white'}`}>
            {title}
          </h2>
          <p className="text-xs text-white/50">{description}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span className="min-w-10 text-center text-[11px] text-white/40">
            {groupedProducts.length === 0 ? '0 / 0' : `${activeIndex + 1} / ${groupedProducts.length}`}
          </span>
          <button
            type="button"
            onClick={showPrevious}
            disabled={!canSwitch}
            aria-label={`Previous ${title} product`}
            className="flex size-9 items-center justify-center rounded-full border border-helios-border text-lg text-white/70 disabled:cursor-not-allowed disabled:opacity-25"
          >
            ←
          </button>
          <button
            type="button"
            onClick={showNext}
            disabled={!canSwitch}
            aria-label={`Next ${title} product`}
            className="flex size-9 items-center justify-center rounded-full border border-helios-border text-lg text-white/70 disabled:cursor-not-allowed disabled:opacity-25"
          >
            →
          </button>
        </div>
      </header>

      {activeProduct ? (
        <ProductCard product={activeProduct} mode="summary" onOpen={onOpen} />
      ) : (
        <EmptyState label={`${title.toLowerCase()} products`} />
      )}

      {canSwitch && (
        <p className="text-center text-[11px] text-white/40">
          Swipe anywhere in this panel, or use the arrows
        </p>
      )}
    </section>
  )
}

function ProductDetailModal({ product, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name ?? 'Product'} details`}
      className="fixed inset-0 z-50 flex items-end bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="max-h-[94dvh] w-full overflow-y-auto rounded-t-2xl border border-helios-border bg-helios-bg p-3 shadow-2xl sm:max-w-2xl sm:rounded-2xl sm:p-4">
        <div className="sticky top-0 z-10 mb-3 flex items-center justify-between rounded-lg border border-helios-border bg-helios-bg/95 px-3 py-2 backdrop-blur">
          <p className="text-sm font-medium text-white">Full product details</p>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="flex size-9 items-center justify-center rounded-full border border-helios-border text-xl text-white/70 hover:text-white"
            aria-label="Close product details"
          >
            ×
          </button>
        </div>
        <ProductCard product={product} mode="detail" anchor={false} />
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [activeType, setActiveType] = useState('ice-bath')
  const [detailProduct, setDetailProduct] = useState(null)
  const desktopLayout = useMediaQuery('(min-width: 1024px)')

  const selectedProducts = useMemo(
    () => products.filter((product) => product.type === activeType),
    [activeType],
  )

  const heliosProducts = selectedProducts.filter((product) => product.source === 'helios')
  const competitorProducts = selectedProducts.filter((product) => product.source === 'competitor')

  function selectType(type) {
    setActiveType(type)
    setDetailProduct(null)
  }

  return (
    <div className="space-y-4 overflow-x-hidden sm:space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-white">Product Comparison</h1>
        <p className="hidden text-sm text-white/60 sm:block">
          Choose one equipment category, then compare Helios Fitness with its competitors.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:gap-3" aria-label="Equipment category">
        {PRODUCT_TYPES.map((type) => {
          const active = activeType === type.value
          const count = products.filter((product) => product.type === type.value).length

          return (
            <button
              key={type.value}
              type="button"
              aria-pressed={active}
              onClick={() => selectType(type.value)}
              className={`rounded-xl border p-3 text-left transition-colors sm:p-4 ${
                active
                  ? 'border-helios-accent bg-helios-accent/10'
                  : 'border-helios-border bg-helios-surface hover:border-white/30'
              }`}
            >
              <span className="block">
                <span
                  className={`block text-sm font-semibold sm:text-base ${
                    active ? 'text-helios-accent-soft' : 'text-white'
                  }`}
                >
                  {type.label}
                </span>
                <span className="block text-[11px] text-white/40 sm:text-xs">{count} products</span>
              </span>
              <span className="mt-1 hidden text-sm text-white/50 sm:block">{type.hint}</span>
            </button>
          )
        })}
      </div>

      <details className="rounded-lg border border-helios-warn/30 bg-helios-warn/5 px-3 py-2 text-xs text-helios-warn sm:hidden">
        <summary className="cursor-pointer">Price currency note</summary>
        <p className="mt-2">
          Listed prices use different source currencies. Check each product's notes before comparing
          price.
        </p>
      </details>

      <p className="hidden rounded-lg border border-helios-warn/30 bg-helios-warn/5 px-3 py-2 text-xs text-helios-warn sm:block">
        Listed prices use different source currencies. Check each product's notes before comparing
        price.
      </p>

      {desktopLayout ? (
        <div className="grid grid-cols-2 items-start gap-6">
          <div className="sticky top-24">
            <DesktopProductGroup
              title="Helios Fitness"
              description="Helios products in this category"
              products={heliosProducts}
              accent
            />
          </div>
          <DesktopProductGroup
            title="Competitors"
            description="Other brands in the same category"
            products={competitorProducts}
          />
        </div>
      ) : (
        <div className="grid gap-4">
          <MobileComparisonPanel
            key={`${activeType}-helios`}
            title="Helios Fitness"
            description="Helios products in this category"
            products={heliosProducts}
            accent
            onOpen={setDetailProduct}
          />
          <MobileComparisonPanel
            key={`${activeType}-competitors`}
            title="Competitors"
            description="Other brands in the same category"
            products={competitorProducts}
            onOpen={setDetailProduct}
          />
        </div>
      )}

      {detailProduct && (
        <ProductDetailModal product={detailProduct} onClose={() => setDetailProduct(null)} />
      )}
    </div>
  )
}
