import { useState } from 'react'
import Onboarding from './screens/Onboarding.jsx'
import Home from './screens/Home.jsx'
import Detail from './screens/Detail.jsx'
import Order from './screens/Order.jsx'
import Delivery from './screens/Delivery.jsx'
import TabEmpty from './screens/TabEmpty.jsx'
import { NavContext } from './components/NavContext.js'
import useFitScreen from './hooks/useFitScreen.js'
import { products } from './data/products.js'

const TAB_SCREENS = ['favorites', 'notifications']

export default function App() {
  const [stack, setStack] = useState([{ name: 'onboarding' }])
  const [cart, setCart] = useState([]) // [{ product, quantity }]
  const fit = useFitScreen()
  const cur = stack[stack.length - 1]
  const go = (name, params) => setStack((s) => [...s, { name, ...params }])
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
  const goHome = () => setStack([{ name: 'home' }])
  const product = cur.product || products[0]
  // Onboarding is a fluid layout, so on phones it fills the real viewport without scaling.
  const fluid = fit.isPhone && cur.name === 'onboarding'

  const cartCount = cart.reduce((n, l) => n + l.quantity, 0)
  const addToCart = (p) =>
    setCart((c) =>
      c.some((l) => l.product.id === p.id)
        ? c.map((l) => (l.product.id === p.id ? { ...l, quantity: l.quantity + 1 } : l))
        : [...c, { product: p, quantity: 1 }]
    )
  const updateQuantity = (id, delta) =>
    setCart((c) => c.map((l) => (l.product.id === id ? { ...l, quantity: l.quantity + delta } : l)).filter((l) => l.quantity > 0))

  // Placing an order empties the cart and opens tracking; Back from tracking lands on Home.
  const placeOrder = () => {
    setCart([])
    setStack([{ name: 'home' }, { name: 'delivery' }])
  }

  // Bottom navigation: Home / Favorites / Notifications switch tabs, Cart opens the order screen.
  const onTabChange = (id) => (id === 'bag' ? go('order') : setStack([{ name: id }]))
  const activeTab = TAB_SCREENS.includes(cur.name) ? cur.name : 'home'

  return (
    <NavContext.Provider value={{ active: activeTab, cartCount, onChange: onTabChange }}>
      <div className="stage">
        <div className="fit" style={{ width: fluid ? fit.vw : fit.boxW, height: fluid ? fit.vh : fit.boxH }}>
          <div
            className="phone"
            style={fluid
              ? { width: fit.vw, height: fit.vh, transform: 'none' }
              : { width: fit.width, height: fit.height, transform: `scale(${fit.scale})` }}
          >
            <div key={`${stack.length}-${cur.name}`} className="tw-absolute tw-inset-0 tw-animate-fade-in">
              {cur.name === 'onboarding' && <Onboarding onStart={goHome} />}
              {cur.name === 'home' && <Home onOpen={(p) => go('detail', { product: p })} />}
              {TAB_SCREENS.includes(cur.name) && <TabEmpty tab={cur.name} />}
              {cur.name === 'detail' && (
                <Detail product={product} onBack={back} onBuy={() => { addToCart(product); go('order') }} />
              )}
              {cur.name === 'order' && (
                <Order cart={cart} onUpdateQuantity={updateQuantity} onBack={back} onBrowse={goHome} onOrder={placeOrder} />
              )}
              {cur.name === 'delivery' && <Delivery onBack={back} />}
            </div>
          </div>
        </div>
      </div>
    </NavContext.Provider>
  )
}
