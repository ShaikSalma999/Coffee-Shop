import { createContext } from 'react'

// Lets the (prop-less) BottomNav used inside Home know which tab is active,
// how many items are in the cart, and how to switch tabs - without having to
// change the Home screen itself.
export const NavContext = createContext({
  active: 'home',
  cartCount: 0,
  onChange: () => {},
})
