export default function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
        active
          ? 'border-helios-accent bg-helios-accent/15 text-helios-accent-soft'
          : 'border-helios-border text-white/60 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}
