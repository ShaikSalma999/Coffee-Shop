import { Plus, Minus } from './Icons.jsx'

export default function QuantityStepper({ quantity, onIncrease, onDecrease }) {
  const btn = 'tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-shadow-[0_0_0_1px_#ededed] tw-transition active:tw-scale-90'
  return (
    <div className="tw-flex tw-items-center tw-gap-3">
      <button onClick={onDecrease} aria-label="Decrease quantity" className={btn}><Minus size={14} /></button>
      <span className="tw-w-4 tw-text-center tw-text-sm tw-font-medium">{quantity}</span>
      <button onClick={onIncrease} aria-label="Increase quantity" className={btn}><Plus size={14} /></button>
    </div>
  )
}
