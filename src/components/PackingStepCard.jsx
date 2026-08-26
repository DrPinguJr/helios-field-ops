import { assetUrl } from '../lib/assetUrl'
import Warning from './Warning'

export default function PackingStepCard({ step, displayOrder, totalSteps, connected, first, last }) {
  const substeps = step.substeps ?? []

  return (
    <article id={step.id} className="grid scroll-mt-24 grid-cols-[2.5rem_minmax(0,1fr)] gap-2 sm:gap-3">
      <div className="relative flex justify-center" aria-hidden="true">
        {connected && !first && (
          <span className="absolute top-0 h-2 w-0.5 bg-helios-accent/60" />
        )}
        {connected && !last && (
          <span className="absolute top-8 bottom-0 w-0.5 bg-helios-accent/60" />
        )}
        <span
          className={`relative z-[1] flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold ${
            connected
              ? 'border-helios-accent bg-helios-bg text-helios-accent-soft'
              : 'border-helios-border bg-helios-bg text-white/60'
          }`}
        >
          {displayOrder}
        </span>
      </div>

      <div className={`min-w-0 space-y-3 ${last ? 'pb-1' : 'border-b border-helios-border/60 pb-6'}`}>
        <header>
          <p className="text-xs uppercase tracking-wide text-white/40">
            {connected ? `Step ${displayOrder} of ${totalSteps}` : 'Standalone task'}
          </p>
          <h4 className="text-base font-semibold text-white sm:text-lg">{step.title}</h4>
        </header>

        {step.detail && <p className="text-sm leading-relaxed text-white/75">{step.detail}</p>}

        <Warning>{step.warning}</Warning>

        {substeps.length > 0 && (
          <div className="rounded-lg border border-helios-border/60 bg-black/20 p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">
              Inside this step
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-white/70">
              {substeps
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((sub) => (
                  <li key={sub.order}>{sub.text}</li>
                ))}
            </ol>
          </div>
        )}

        {step.image && (
          <img
            src={assetUrl(step.image)}
            alt={`${step.title} reference`}
            className="max-h-72 w-full rounded-lg border border-helios-border bg-white object-contain"
          />
        )}
      </div>
    </article>
  )
}
