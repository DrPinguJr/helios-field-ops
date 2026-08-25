export default function Warning({ children }) {
  if (!children) return null

  return (
    <div className="flex gap-2 rounded-lg border border-helios-danger/40 bg-helios-danger/10 px-3 py-2 text-sm text-helios-danger">
      <span aria-hidden="true">⚠</span>
      <p>{children}</p>
    </div>
  )
}
