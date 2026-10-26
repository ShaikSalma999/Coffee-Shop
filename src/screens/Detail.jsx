import { useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import HomeIndicator from '../components/HomeIndicator.jsx'
import Header from '../components/Header.jsx'
import { Heart, Star, Scooter, Bean, Milk } from '../components/Icons.jsx'

export default function Detail({ product, onBack, onBuy }) {
  const [size, setSize] = useState('M')
  return (
    <section className="screen detail">
      <StatusBar />
      <Header title="Detail" onBack={onBack} right={<Heart size={26} />} />
      <img className="d-img" src={product.image} alt={product.name} />
      <div className="d-head">
        <div>
          <h2>{product.name}</h2><p>Ice/Hot</p>
          <div className="rate"><Star size={22} /><b>4.8</b><span>(230)</span></div>
        </div>
        <div className="tiles"><i><Scooter /></i><i><Bean /></i><i><Milk /></i></div>
      </div>
      <hr />
      <h3>Description</h3>
      <p className="desc">A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo.. <b>Read More</b></p>
      <h3 className="sz">Size</h3>
      <div className="sizes">
        {['S', 'M', 'L'].map((s) => <button key={s} className={s === size ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}
      </div>
      <div className="sheet buy">
        <div><span>Price</span><b>$ {product.price.toFixed(2)}</b></div>
        <button className="btn" onClick={onBuy}>Buy Now</button>
      </div>
      <HomeIndicator />
    </section>
  )
}
