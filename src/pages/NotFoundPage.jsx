import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="space-y-3 py-16 text-center">
      <h1 className="text-2xl font-bold text-white">Page not found</h1>
      <p className="text-white/60">That page doesn't exist.</p>
      <Link to="/" className="text-helios-accent hover:underline">
        Back home
      </Link>
    </div>
  )
}
