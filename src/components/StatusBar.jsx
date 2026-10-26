export default function StatusBar({ light = false }) {
  const c = light ? '#fff' : '#000'
  return (
    <div className="status" style={{ color: c }}>
      <span>9:41</span>
      <svg width="68" height="12" viewBox="0 0 68 12" fill={c}>
        <rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
        <path d="M30 2.2c2.4 0 4.6.9 6.3 2.5l-1.2 1.2A7.3 7.3 0 0030 4a7.300 7.300 0 00-5.100 1.900L23.700 4.700A9 9 0 0130 2.200zm0 3.600c1.400 0 2.700.5 3.700 1.400l-1.200 1.200a4 4 0 00-5 0l-1.200-1.200A5.500 5.500 0 0130 5.800zm0 3.500l1.700 1.700L30 12.700l-1.700-1.700z" />
        <rect x="42.500" y="0.500" width="22" height="11" rx="3.500" fill="none" stroke={c} opacity=".4" /><rect x="44" y="2" width="19" height="8" rx="2.200" /><rect x="66" y="4" width="1.500" height="4" rx=".7" opacity=".4" />
      </svg>
    </div>
  )
}
