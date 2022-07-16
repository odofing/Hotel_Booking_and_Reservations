import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Featured from '../../Components/Featured/Featured'
import PropertyList from '../../Components/PropertyList/PropertyList'
import FeaturedPropeties from '../../Components/FeaturedProperties/FeaturedProperties'
import MailList from '../../Components/mailList/MailList'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        <Featured />
        <h1 className='homeTitle'>Browse By Property Type</h1>
        <PropertyList />
        <h1 className='homeTitle'>Homes guests love</h1>
        <FeaturedPropeties />
        <MailList />
        <Footer />
      </div>
    </>
  )
}

export default Home
