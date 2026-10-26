import { Chevron } from './Icons.jsx'
export default function Header({ title, onBack, right }) {
  return (
    <div className="hdr">
      <button className="hdr-btn" onClick={onBack} aria-label="Back"><Chevron dir="left" size={24} /></button>
      <h1>{title}</h1>
      <span className="hdr-btn">{right}</span>
    </div>
  )
}
