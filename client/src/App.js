
import FeaturedProperties from './components/featuredProperties/featuredProperties';
import Newsletter from './components/newsletter/newsletter';
import PopularProperties from './components/popularProperties/popularProperties';
import Properties from './components/properties/properties';
import PropertyDetail from './components/propertyDetails/propertyDetails';
import SignIn from './components/signin/signin';
import Signup from './components/signup/Signup';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Hero from './components/hero/hero'
import Footer from './components/footer/footer'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <> 
           <Navbar/>
           <Hero/>
           <PopularProperties/>
           <FeaturedProperties/>
           <Newsletter/>
           <Footer/>
          </>
        }/>


        <Route path="/properties" element={
          <>
          <Navbar/>
          <Properties/>
          <Footer /> 
          </>
        }/>


        <Route path="/propertyDetail/:id" element={
          <>
          <Navbar/>
          <PropertyDetail/>
          <Footer/> 
          </>
        }/>

        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        </Routes>
    </div>
  );
}

export default App;