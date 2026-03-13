import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import TrustBar        from './components/Trustbar'
import FeaturedBanners from './components/FeaturedBanners'
import Categories      from './components/Categories'
import Spotlight       from './components/Spotlight'
import HighlyRecommended from './components/HighlyRecomended'
import Ticker          from './components/Ticker'
import NewArrivals     from './components/NewArrivals'
import BestSelling     from './components/BestSelling'
import DealCountdown   from './components/DealCountDown'
import Testimonials    from './components/Testemonials'
import InstagramShop   from './components/InstagramShop'
import Newsletter      from './components/Newsletter'
import Footer          from './components/Footer'

function App() {
  return (
    <div className="bg-[#080808] min-h-screen overflow-x-hidden">
      <Navbar />
      {/* ✅ Hero vem direto — sem spacer entre Navbar e Hero */}
      {/* O Hero é position normal (não fixed), a Navbar é fixed por cima */}
      {/* O paddingTop: 99px dentro do Hero.jsx compensa a navbar */}
      <Hero />
      <TrustBar />
      <FeaturedBanners />
      <Categories />
      <Spotlight />
      <HighlyRecommended />
      <Ticker />
      <NewArrivals />
      <BestSelling />
      <DealCountdown />
      <Testimonials />
      <InstagramShop />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App