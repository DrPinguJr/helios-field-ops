import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'

const links = [
  { to: '/packing', label: 'Packing' },
  { to: '/troubleshooting', label: 'Troubleshooting' },
  { to: '/products', label: 'Products' },
  { to: '/usage-guide', label: 'Usage Guide' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-helios-border bg-helios-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
        <NavLink to="/" className="shrink-0 text-lg font-semibold text-white">
          Helios <span className="text-helios-accent">Field Ops</span>
        </NavLink>
        <nav className="flex w-full gap-1 overflow-x-auto pb-1 text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:flex-wrap sm:pb-0 sm:text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `shrink-0 rounded-md px-2 py-1.5 transition-colors sm:px-3 ${
                  isActive
                    ? 'bg-helios-accent/15 text-helios-accent-soft'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sm:ml-auto sm:w-64">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
