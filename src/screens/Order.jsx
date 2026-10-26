import { useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import HomeIndicator from '../components/HomeIndicator.jsx'
import Header from '../components/Header.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import { Pencil, Note, Discount, Chevron, Wallet } from '../components/Icons.jsx'

const DELIVERY_FEE = 2.0
const DELIVERY_DISCOUNT = 1.0
const money = (v) => `$ ${v.toFixed(2)}`

export default function Order({ cart, onUpdateQuantity, onBack, onBrowse, onOrder }) {
  const [mode, setMode] = useState('Deliver')
  const isDelivery = mode === 'Deliver'

  const subtotal = cart.reduce((sum, l) => sum + l.product.price * l.quantity, 0)
  const deliveryFee = isDelivery ? DELIVERY_FEE - DELIVERY_DISCOUNT : 0
  const total = subtotal + deliveryFee

  return (
    <section className="screen tw-root tw-flex tw-flex-col">
      <StatusBar />
      <Header title="Order" onBack={onBack} />
      <div className="tw-h-[124px] tw-shrink-0" />

      {cart.length === 0 ? (
        <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-px-10 tw-pb-24 tw-text-center">
          <h2 className="tw-text-lg tw-font-semibold">Your cart is empty</h2>
          <p className="tw-text-sm tw-text-[#a2a2a2]">Add a coffee from the menu to get started.</p>
          <button onClick={onBrowse} className="tw-mt-4 tw-rounded-xl tw-bg-coffee tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-text-white">Browse Menu</button>
        </div>
      ) : (
        <>
          <div className="tw-no-scrollbar tw-min-h-0 tw-flex-1 tw-overflow-y-auto tw-px-6 tw-pb-6">
            <div className="tw-flex tw-rounded-xl tw-bg-[#ededed] tw-p-1">
              {['Deliver', 'Pick Up'].map((m) => (
                <button key={m} onClick={() => setMode(m)} className={'tw-h-[35px] tw-flex-1 tw-rounded-[10px] tw-text-base tw-transition-all tw-duration-200 ' + (mode === m ? 'tw-bg-coffee tw-font-semibold tw-text-white' : '')}>{m}</button>
              ))}
            </div>

            {isDelivery && (
              <section className="tw-mt-6">
                <h3 className="tw-text-base tw-font-semibold">Delivery Address</h3>
                <p className="tw-mt-4 tw-text-sm tw-font-semibold tw-text-[#303336]">Jl. Kpg Sutoyo</p>
                <p className="tw-mt-1 tw-text-xs tw-text-[#a2a2a2]">Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.</p>
                <div className="tw-mt-4 tw-flex tw-gap-2">
                  <button className="tw-flex tw-h-[26px] tw-items-center tw-gap-1.5 tw-rounded-2xl tw-border tw-border-[#a2a2a2] tw-px-3 tw-text-xs"><Pencil size={16} />Edit Address</button>
                  <button className="tw-flex tw-h-[26px] tw-items-center tw-gap-1.5 tw-rounded-2xl tw-border tw-border-[#a2a2a2] tw-px-3 tw-text-xs"><Note size={16} />Add Note</button>
                </div>
              </section>
            )}

            <div className="tw-my-5 tw-h-px tw-bg-[#e3e3e3]" />

            <ul className="tw-space-y-4">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="tw-flex tw-items-center tw-gap-4">
                  <img src={product.image} alt="" className="tw-h-[54px] tw-w-[54px] tw-rounded-[14px] tw-object-cover" />
                  <div className="tw-min-w-0 tw-flex-1">
                    <p className="tw-truncate tw-text-base tw-font-semibold">{product.name}</p>
                    <p className="tw-mt-0.5 tw-text-xs tw-text-[#a2a2a2]">{product.sub}</p>
                  </div>
                  <QuantityStepper quantity={quantity} onIncrease={() => onUpdateQuantity(product.id, 1)} onDecrease={() => onUpdateQuantity(product.id, -1)} />
                </li>
              ))}
            </ul>

            {isDelivery && (
              <button className="tw-mt-6 tw-flex tw-h-[55px] tw-w-full tw-items-center tw-gap-3 tw-rounded-2xl tw-border tw-border-[#ededed] tw-bg-white tw-px-4 tw-text-left">
                <Discount size={24} className="tw-text-coffee" />
                <b className="tw-flex-1 tw-text-sm tw-font-semibold">1 Discount is Applies</b>
                <Chevron dir="right" size={22} />
              </button>
            )}

            <section className="tw-mt-6">
              <h3 className="tw-text-base tw-font-semibold">Payment Summary</h3>
              <dl className="tw-mt-4 tw-space-y-2 tw-text-sm">
                <div className="tw-flex tw-justify-between"><dt>Price</dt><dd className="tw-font-bold">{money(subtotal)}</dd></div>
                {isDelivery && (
                  <div className="tw-flex tw-justify-between">
                    <dt>Delivery Fee</dt>
                    <dd className="tw-font-bold"><s className="tw-mr-1.5 tw-font-normal">$ {DELIVERY_FEE.toFixed(1)}</s>$ {deliveryFee.toFixed(1)}</dd>
                  </div>
                )}
              </dl>
            </section>
          </div>

          <footer className="tw-shrink-0 tw-rounded-t-[28px] tw-bg-white tw-px-6 tw-pb-9 tw-pt-4 tw-shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
            <div className="tw-mb-4 tw-flex tw-items-center tw-gap-2.5">
              <Wallet size={26} className="tw-text-coffee" />
              <div className="tw-flex-1">
                <b className="tw-block tw-text-sm tw-font-semibold">Cash/Wallet</b>
                <span className="tw-block tw-text-xs tw-font-semibold tw-text-coffee">{money(total)}</span>
              </div>
              <Chevron size={24} />
            </div>
            <button onClick={onOrder} className="tw-grid tw-h-14 tw-w-full tw-place-items-center tw-rounded-2xl tw-bg-coffee tw-text-base tw-font-semibold tw-text-white tw-transition active:tw-scale-[0.98]">Order</button>
          </footer>
        </>
      )}
      <HomeIndicator />
    </section>
  )
}
