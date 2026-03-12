import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar' 
import Hero from './components/Hero' 
import TrustBar from './components/Trustbar'
import FeaturedBanners from './components/FeaturedBanners'
import Categories from './components/Categories'
import Spotlight from './components/Spotlight'
import ProductCard from './components/ProductCard'
import HighlyRecommended from './components/HighlyRecomended'
import Ticker from './components/Ticker'
import NewArrivals from './components/NewArrivals'
import BestSelling from './components/BestSelling'
import DealCountdown from './components/DealCountDown'
import Testimonials from './components/Testemonials'
import InstagramShop from './components/InstagramShop'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <FeaturedBanners />
      <Categories />
      <Spotlight />
      {/* <ProductCard/> */}
      <HighlyRecommended />
      <Ticker />
      <NewArrivals />
      <BestSelling />
      <DealCountdown />
      <Testimonials />
      <InstagramShop />
      <Newsletter />
      <Footer />
    </> 
  )
}

export default App
