import { useEffect, useRef, useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import HomeIndicator from '../components/HomeIndicator.jsx'
import { Chevron, Scooter, Bean, Target, Phone, Star } from '../components/Icons.jsx'
import { Check, Close, Message } from '../components/OrderIcons.jsx'
import courierImg from '../assets/images/courier.png'
import { DESTINATION, MAP_HEIGHT, MAP_WIDTH, ROADS, BLOCKS, OUTLINES, ROUTE, SHOP, STREET_LABELS } from '../data/mapData.js'

/* ---- Order progress simulation ---- */
const STEPS = ['Confirmed', 'Brewing', 'On the Way', 'Delivered']
const ETA_BY_STAGE = ['10–15 minutes left', '8–12 minutes left', '3–5 minutes left', 'Order delivered!']
const LAST_STAGE = STEPS.length - 1
// ms spent in stages 0, 1 and 2 (the courier rides during stage 2)
const STAGE_DURATIONS = [4000, 5000, 14000]
const ZOOM_LEVEL = 1.8

function Pulse({ color, from, to }) {
  return (
    <circle r={from} fill={color} opacity="0.3">
      <animate attributeName="r" values={`${from};${to}`} dur="1.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0" dur="1.8s" repeatCount="indefinite" />
    </circle>
  )
}

/* ---- Map ---- */
function CityMap({ stage, progress, courier, routeRef }) {
  return (
    <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} preserveAspectRatio="xMidYMid slice" className="tw-absolute tw-inset-0 tw-h-full tw-w-full" role="img" aria-label="Delivery route from the coffee shop to your address">
      <defs>
        <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#F5F5F5" />
      {BLOCKS.map((b) => <rect key={`${b.x}-${b.y}`} {...b} />)}
      <g fill="none" stroke="#E6E6E6">{ROADS.map((r) => <path key={`c-${r.d}`} d={r.d} strokeWidth={r.width + 4} />)}</g>
      <g fill="none" stroke="#FFFFFF">{ROADS.map((r) => <path key={`r-${r.d}`} d={r.d} strokeWidth={r.width} />)}</g>
      {OUTLINES.map((o) => <rect key={`${o.x}-${o.y}`} {...o} rx="10" fill="none" stroke="#FFFFFF" strokeWidth="6" />)}
      <g fontSize="22" fill="#666" letterSpacing="0.3" textAnchor="middle" dominantBaseline="central">
        {STREET_LABELS.map(({ text, x, y, rotate = 0 }) => (
          <text key={`${text}-${x}-${y}`} transform={`translate(${x} ${y}) rotate(${rotate})`}>{text}</text>
        ))}
      </g>

      {/* Invisible copy of the route, used to measure length / courier position */}
      <path ref={routeRef} d={ROUTE} fill="none" stroke="none" />
      {/* Remaining route; pathLength=1 lets the dash pattern use 0-1 progress */}
      <path d={ROUTE} pathLength="1" fill="none" stroke="#C67C4E" strokeWidth="9" strokeLinejoin="round" strokeDasharray={`0 ${progress} ${1 - progress} 1`} />

      {/* Coffee shop marker */}
      <g transform={`translate(${SHOP.x} ${SHOP.y})`}>
        {stage < 2 && <Pulse color="#313131" from={34} to={64} />}
        <circle r="34" fill="#313131" stroke="#fff" strokeWidth="6" filter="url(#markerShadow)" />
        <g transform="translate(-16 -16)" color="#fff"><Bean size={32} /></g>
      </g>

      {/* Destination pin */}
      <g transform={`translate(${DESTINATION.x - 2} ${DESTINATION.y - 3})`}>
        <ellipse rx="14" ry="6" fill="#C67C4E" opacity="0.25">
          <animate attributeName="rx" values="10;38" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="ry" values="4;16" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0" dur="1.8s" repeatCount="indefinite" />
        </ellipse>
        <path d="M0 0 C-6 -10 -22 -26 -22 -40 A22 22 0 0 1 22 -40 C22 -26 6 -10 0 0 Z" fill="#C67C4E" />
        <circle cy="-40" r="8.5" fill="#fff" />
      </g>

      {/* Courier */}
      {stage >= 2 && (
        <g transform={`translate(${courier.x} ${courier.y})`}>
          {stage < LAST_STAGE && <Pulse color="#C67C4E" from={40} to={72} />}
          <circle r="40" fill="#fff" filter="url(#markerShadow)" />
          <g transform="translate(-17 -17)" color="#C67C4E"><Scooter size={34} /></g>
        </g>
      )}
    </svg>
  )
}

/* ---- Bottom sheet pieces ---- */
function ProgressStepper({ stage }) {
  const isComplete = stage === LAST_STAGE
  return (
    <ol className="tw-mt-4 tw-flex" aria-label="Order progress">
      {STEPS.map((label, i) => {
        const done = i < stage || isComplete
        const current = i === stage && !isComplete
        return (
          <li key={label} className="tw-relative tw-flex tw-flex-1 tw-flex-col tw-items-center">
            {i < STEPS.length - 1 && (
              <span aria-hidden className={'tw-absolute tw-left-1/2 tw-top-3 tw-h-0.5 tw-w-full tw--translate-y-1/2 tw-transition-colors tw-duration-500 ' + (i < stage ? 'tw-bg-success' : 'tw-bg-coffee-muted')} />
            )}
            <span className={'tw-relative tw-z-10 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-transition-colors tw-duration-500 ' + (done ? 'tw-border-success tw-bg-success tw-text-white' : current ? 'tw-border-coffee tw-bg-white' : 'tw-border-coffee-muted tw-bg-white')}>
              {done && <Check size={13} w={3} />}
              {current && (
                <>
                  <span className="tw-absolute tw-inset-0 tw-animate-ping tw-rounded-full tw-bg-coffee/40" />
                  <span className="tw-relative tw-h-2 tw-w-2 tw-rounded-full tw-bg-coffee" />
                </>
              )}
            </span>
            <span className={'tw-mt-1.5 tw-whitespace-nowrap tw-text-[10px] ' + (done || current ? 'tw-font-semibold tw-text-coffee-dark' : 'tw-text-gray-400')}>{label}</span>
          </li>
        )
      })}
    </ol>
  )
}

function CourierCard() {
  const action = 'tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-xl tw-transition active:tw-scale-90'
  return (
    <div className="tw-mt-4 tw-flex tw-items-center tw-gap-3 tw-rounded-2xl tw-border tw-border-coffee-muted tw-p-3">
      <img src={courierImg} alt="" className="tw-h-12 tw-w-12 tw-shrink-0 tw-rounded-2xl tw-object-cover" />
      <div className="tw-min-w-0 tw-flex-1">
        <p className="tw-truncate tw-text-sm tw-font-semibold">Brooklyn Simmons</p>
        <p className="tw-mt-0.5 tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-[#a2a2a2]">
          <Star size={12} />
          <span className="tw-font-semibold tw-text-coffee-dark">4.9</span>
          <span>· Personal Courier</span>
        </p>
      </div>
      <button aria-label="Message courier" className={`${action} tw-border tw-border-coffee-muted`}><Message size={18} /></button>
      <button aria-label="Call courier" className={`${action} tw-bg-coffee tw-text-white`}><Phone size={18} /></button>
    </div>
  )
}

/* ---- Screen ---- */
export default function Delivery({ onBack }) {
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0) // 0-1 along the route
  const [courier, setCourier] = useState(SHOP)
  const [isZoomed, setIsZoomed] = useState(false)
  const routeRef = useRef(null)
  const isDelivered = stage === LAST_STAGE

  // Confirmed -> Brewing -> On the Way -> Delivered
  useEffect(() => {
    if (stage >= LAST_STAGE) return undefined
    const t = setTimeout(() => setStage((s) => s + 1), STAGE_DURATIONS[stage])
    return () => clearTimeout(t)
  }, [stage])

  // Drive the courier along the route while "On the Way"
  useEffect(() => {
    if (stage < 2) return undefined
    if (isDelivered) { setProgress(1); return undefined }
    const startedAt = performance.now()
    let frame
    const tick = (now) => {
      const ratio = Math.min((now - startedAt) / STAGE_DURATIONS[2], 1)
      setProgress(ratio)
      if (ratio < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [stage, isDelivered])

  // Route progress -> x/y for the courier marker
  useEffect(() => {
    const route = routeRef.current
    if (!route) return
    const p = route.getPointAtLength(route.getTotalLength() * progress)
    setCourier({ x: p.x, y: p.y })
  }, [progress])

  return (
    <section className="screen tw-root tw-flex tw-flex-col tw-overflow-hidden tw-bg-white">
      <div className="tw-relative tw-min-h-0 tw-flex-1 tw-overflow-hidden tw-bg-gray-100">
        <div
          className="tw-absolute tw-inset-0 tw-transition-transform tw-duration-500 tw-ease-out"
          style={{ transform: `scale(${isZoomed ? ZOOM_LEVEL : 1})`, transformOrigin: `${(courier.x / MAP_WIDTH) * 100}% ${(courier.y / MAP_HEIGHT) * 100}%` }}
        >
          <CityMap stage={stage} progress={progress} courier={courier} routeRef={routeRef} />
        </div>
        <div className="tw-absolute tw-inset-x-6 tw-top-[68px] tw-z-10 tw-flex tw-items-center tw-justify-between">
          <button onClick={onBack} aria-label="Back" className="tw-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-[14px] tw-bg-[#f1f1f1]/90 tw-transition active:tw-scale-90"><Chevron dir="left" size={22} /></button>
          <button onClick={() => setIsZoomed((z) => !z)} aria-label={isZoomed ? 'Zoom out' : 'Zoom to courier'} aria-pressed={isZoomed} className={'tw-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-[14px] tw-transition active:tw-scale-90 ' + (isZoomed ? 'tw-bg-coffee tw-text-white' : 'tw-bg-[#f1f1f1]/90')}><Target size={22} /></button>
        </div>
      </div>

      <div className="tw-relative tw-z-[8] tw--mt-8 tw-max-h-[60%] tw-shrink-0 tw-overflow-y-auto tw-rounded-t-[2rem] tw-bg-white tw-px-6 tw-pb-9 tw-pt-3 tw-shadow-[0_-8px_30px_rgba(0,0,0,0.1)] tw-no-scrollbar">
        <div className="tw-mx-auto tw-mb-3 tw-h-1 tw-w-10 tw-rounded-full tw-bg-coffee-muted" />
        <div className="tw-flex tw-items-start tw-justify-between tw-gap-3">
          <div>
            <h2 className="tw-text-lg tw-font-semibold">{ETA_BY_STAGE[stage]}</h2>
            <p className="tw-mt-1 tw-text-xs tw-text-[#a2a2a2]">Delivery to <b className="tw-font-semibold tw-text-[#303336]">Jl. Kpg Sutoyo</b></p>
          </div>
          <button onClick={onBack} aria-label="Close tracking" className="tw-flex tw-h-9 tw-w-9 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-coffee-cream tw-text-coffee tw-transition active:tw-scale-90"><Close size={18} /></button>
        </div>
        <ProgressStepper stage={stage} />
        <CourierCard />
        <button onClick={onBack} className="tw-mt-4 tw-grid tw-h-12 tw-w-full tw-place-items-center tw-rounded-2xl tw-bg-coffee tw-text-sm tw-font-semibold tw-text-white tw-transition active:tw-scale-[0.98]">Back to Home</button>
      </div>

      <StatusBar />
      <HomeIndicator />
    </section>
  )
}
