import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import SearchBar from '../components/SearchBar'
import { search } from '../lib/search'

const CATEGORY_LABELS = {
  packing: 'Packing',
  troubleshooting: 'Troubleshooting',
  product: 'Product',
  'usage-guide': 'Usage Guide',
}

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const results = useMemo(() => search(query), [query])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Search</h1>
      <SearchBar autoFocus />

      {!query.trim() ? (
        <p className="text-sm text-white/50">Start typing to search across all content.</p>
      ) : results.length === 0 ? (
        <EmptyState label={`results for "${query}"`} />
      ) : (
        <ul className="space-y-2">
          {results.map((result) => (
            <li key={`${result.category}-${result.id}`}>
              <Link
                to={result.href}
                className="block rounded-xl border border-helios-border bg-helios-surface p-4 transition-colors hover:border-helios-accent/50"
              >
                <p className="text-xs uppercase tracking-wide text-helios-accent-soft">
                  {CATEGORY_LABELS[result.category] ?? result.category}
                </p>
                <p className="font-medium text-white">{result.title}</p>
                {result.subtitle && <p className="text-sm text-white/50">{result.subtitle}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
