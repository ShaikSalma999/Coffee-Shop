import StatusBar from '../components/StatusBar.jsx'
import HomeIndicator from '../components/HomeIndicator.jsx'
import BottomNav from '../components/BottomNav.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Chevron, Search, Sliders } from '../components/Icons.jsx'
import { categories, products } from '../data/products.js'
import banner from '../assets/images/banner-promo.png'
import { useState } from 'react'

export default function Home({ onOpen }) {
  const [cat, setCat] = useState(0)
  return (
    <section className="screen home">
      <div className="home-top" />
      <StatusBar light />
      <div className="loc"><span>Location</span><b>Bilzen, Tanjungbalai <Chevron size={18} /></b></div>
      <div className="search">
        <label><Search size={24} /><input placeholder="Search coffee" /></label>
        <button className="btn filter" aria-label="Filter"><Sliders size={22} /></button>
      </div>
      <img className="banner" src={banner} alt="Promo: Buy one get one free" />
      <div className="chips">
        {categories.map((c, i) => (
          <button key={c} className={'chip' + (i === cat ? ' on' : '')} onClick={() => setCat(i)}>{c}</button>
        ))}
      </div>
      <div className="grid">{products.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}</div>
      <BottomNav />
      <HomeIndicator />
    </section>
  )
}
