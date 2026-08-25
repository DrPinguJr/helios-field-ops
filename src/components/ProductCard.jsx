function Field({ label, value, suffix = '' }) {
  return (
    <div className="flex justify-between gap-2 border-b border-helios-border/40 py-1 text-sm last:border-0">
      <dt className="text-white/50">{label}</dt>
      <dd className="text-white/85">
        {value !== null && value !== undefined ? `${value}${suffix}` : '—'}
      </dd>
    </div>
  )
}

export default function ProductCard({ product }) {
  return (
    <article
      id={product.id}
      className="scroll-mt-24 space-y-2 rounded-xl border border-helios-border bg-helios-surface p-4"
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">
            {product.type} · {product.source}
          </p>
          <h3 className="text-lg font-semibold text-white">{product.name ?? 'TBC'}</h3>
        </div>
        {product.price !== null && product.price !== undefined && (
          <span className="shrink-0 rounded-full bg-helios-accent/15 px-3 py-1 text-sm font-medium text-helios-accent-soft">
            ${product.price}
          </span>
        )}
      </header>

      <dl>
        <Field label="Material" value={product.material} />
        <Field label="Capacity" value={product.capacity_liters} suffix=" L" />
        <Field label="Temp range" value={product.temp_range_c} suffix=" °C" />
      </dl>

      {product.notes && <p className="text-sm text-white/70">{product.notes}</p>}

      <p className="text-xs text-white/30">
        Researched: {product.research_date ?? 'unverified'}
      </p>
    </article>
  )
}
