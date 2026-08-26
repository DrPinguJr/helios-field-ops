import { assetUrl } from '../lib/assetUrl'

const TYPE_LABELS = {
  'ice-bath': 'Cold plunge',
  'compression-boots': 'Compression boots',
}

const SOURCE_LABELS = {
  helios: 'Helios Fitness',
  competitor: 'Competitor',
}

const priceFormatter = new Intl.NumberFormat('en-SG', {
  maximumFractionDigits: 2,
})

function Field({ label, value, suffix = '' }) {
  return (
    <div className="flex justify-between gap-2 border-b border-helios-border/40 py-1 text-sm last:border-0">
      <dt className="text-white/50">{label}</dt>
      <dd className="text-right text-white/85">
        {value !== null && value !== undefined ? `${value}${suffix}` : '—'}
      </dd>
    </div>
  )
}

export default function ProductCard({ product, mode = 'full', onOpen, anchor = true }) {
  const summary = mode === 'summary'
  const detail = mode === 'detail'

  return (
    <article
      id={anchor ? product.id : undefined}
      className={`w-full scroll-mt-24 space-y-3 rounded-xl border border-helios-border bg-helios-surface ${
        summary ? 'p-3' : 'p-4'
      }`}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-white/40">
            {TYPE_LABELS[product.type] ?? product.type} ·{' '}
            {SOURCE_LABELS[product.source] ?? product.source}
          </p>
          <h3 className="break-words text-base font-semibold text-white sm:text-lg">
            {product.name ?? 'TBC'}
          </h3>
        </div>
        {product.price !== null && product.price !== undefined && (
          <span className="shrink-0 rounded-full bg-helios-accent/15 px-3 py-1 text-sm font-medium text-helios-accent-soft">
            Listed {priceFormatter.format(product.price)}
          </span>
        )}
      </header>

      {!summary &&
        (product.image ? (
          <img
            src={assetUrl(product.image)}
            alt={product.name ? `${product.name} product` : 'Product'}
            className={`w-full rounded-lg border border-helios-border bg-white object-contain p-1 ${
              detail ? 'max-h-[52dvh] min-h-52' : 'aspect-video'
            }`}
          />
        ) : detail ? (
          <div className="flex h-52 items-center justify-center rounded-lg border border-dashed border-helios-border bg-black/20 text-sm text-white/30">
            No confirmed product image
          </div>
        ) : null)}

      {summary ? (
        <button
          type="button"
          onClick={() => onOpen?.(product)}
          className="w-full rounded-lg border border-helios-accent/50 bg-helios-accent/10 px-3 py-2.5 text-sm font-medium text-helios-accent-soft transition-colors hover:bg-helios-accent/15"
        >
          View image &amp; full details
        </button>
      ) : (
        <>
          <dl>
            <Field label="Material" value={product.material} />
            <Field label="Capacity" value={product.capacity_liters} suffix=" L" />
            <Field label="Temp range" value={product.temp_range_c} suffix=" °C" />
          </dl>

          {product.notes && <p className="text-sm leading-relaxed text-white/70">{product.notes}</p>}

          <p className="text-xs text-white/30">
            Researched: {product.research_date ?? 'unverified'}
          </p>
        </>
      )}
    </article>
  )
}
