import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Programs from './pages/Programs';
import About from './pages/About';
import Donation from './pages/Donation';
import AICourses from './pages/AICourses';
import Contact from './pages/Contact';
import Newsletter from './pages/Newsletter';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Events from './pages/Events';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';
import SuccessStories from './pages/SuccessStories';

import QuickDonateBar from './components/QuickDonateBar';
import CartDrawer from './components/CartDrawer';
import AIChatBot from './components/AIChatBot';
import { CartProvider } from './context/CartContext';
import SEO from './components/SEO';

const UserLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <SEO />
      <ScrollToTop />
      <Navbar />
      <main className={`main-content ${isHome ? 'home-layout' : 'page-layout'}`}>
        <Outlet />
      </main>
      <QuickDonateBar />
      <CartDrawer />
      <AIChatBot />
      <Footer />
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <ToastContainer position="top-center" rtl={true} theme="colored" />
        <Routes>
          {/* Public Website Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/ai-courses" element={<AICourses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
