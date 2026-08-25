import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchBar({ autoFocus = false }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [value, setValue] = useState(params.get('q') ?? '')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = value.trim()
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search')
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="flex-1">
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search steps, symptoms, products…"
        autoFocus={autoFocus}
        className="w-full rounded-lg border border-helios-border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-helios-accent focus:outline-none"
      />
    </form>
  )
}
