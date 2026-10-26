import { useContext } from 'react'
import { Home, Heart, Bag, Bell } from './Icons.jsx'
import { HomeOutline } from './OrderIcons.jsx'
import { NavContext } from './NavContext.js'

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'bag', label: 'Cart' },
  { id: 'notifications', label: 'Notifications' },
]

export default function BottomNav() {
  const { active, onChange, cartCount } = useContext(NavContext)
  const icon = (id, on) => {
    if (id === 'home') return on ? <Home /> : <HomeOutline size={28} />
    const Icon = { favorites: Heart, bag: Bag, notifications: Bell }[id]
    return <Icon size={28} />
  }
  return (
    <nav className="nav">
      {ITEMS.map(({ id, label }) => {
        const on = active === id
        return (
          <button key={id} className={'nav-item tw-relative' + (on ? ' on' : '')} aria-label={label} aria-current={on ? 'page' : undefined} onClick={() => onChange(id)}>
            {icon(id, on)}
            {on && <i />}
            {id === 'bag' && cartCount > 0 && (
              <span className="tw-absolute tw-right-[-4px] tw-top-[16px] tw-flex tw-h-4 tw-min-w-4 tw-items-center tw-justify-center tw-rounded-full tw-bg-danger tw-px-1 tw-text-[10px] tw-font-semibold tw-text-white">
                {cartCount}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
