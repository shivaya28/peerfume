import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LenisScrollWrapper from './components/LenisScrollWrapper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import MyAccount from './pages/MyAccount';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import ContactUs from './pages/ContactUs';
import ShippingPolicy from './pages/ShippingPolicy';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import BuyNow from './pages/BuyNow';
import About from './pages/About'; // NEW IMPORT

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <LenisScrollWrapper>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/buynow/:id" element={<BuyNow />} />
                <Route path="/about" element={<About />} /> {/* NEW ROUTE */}
              </Routes>
            </main>
            <Footer />
          </div>
        </LenisScrollWrapper>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
