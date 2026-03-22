import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import StudentLife from './pages/StudentLife';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Calendar from './pages/Calendar';
import FacebookFeed from './pages/FacebookFeed';
import Admin from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const main = document.querySelector('main');
    if (main) {
      main.classList.remove('page-transition');
      void main.offsetWidth;
      main.classList.add('page-transition');
    }
  }, [pathname]);
  return null;
}
function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/student-life" element={<StudentLife />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/moe-updates" element={<FacebookFeed />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}