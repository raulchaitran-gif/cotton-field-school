import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = window.location;
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
