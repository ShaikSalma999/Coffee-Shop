import { Plus } from './Icons.jsx'
export default function ProductCard({ p, onOpen }) {
  return (
    <article className="card" onClick={() => onOpen(p)}>
      <img src={p.card} alt={p.name} />
      <h3>{p.name}</h3>
      <p>{p.sub}</p>
      <div className="card-row"><b>$ {p.price.toFixed(2)}</b><button className="add" aria-label="Add"><Plus size={18} /></button></div>
    </article>
  )
}
