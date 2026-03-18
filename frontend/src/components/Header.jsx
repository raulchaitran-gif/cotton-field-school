import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/academics', label: 'Academics' },
  { to: '/student-life', label: 'Student Life' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/news', label: 'News' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/moe-updates', label: 'MOE Updates' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(128,0,32,0.97)' : '#800020',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      {/* Top bar */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>
          <span>Cotton Field, Anna Regina, Region 2, Guyana</span>
          <span>+592-771-0000 &nbsp;|&nbsp; info@cottonfieldschool.gy</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: 44, height: 44,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            <GraduationCap size={24} color="white" />
          </div>
          <div>
            <div style={{ color: 'white', fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
              Cotton Field
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
              SECONDARY SCHOOL
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: location.pathname === link.to ? 'white' : 'rgba(255,255,255,0.75)',
                fontWeight: location.pathname === link.to ? 600 : 400,
                fontSize: '0.82rem',
                padding: '0.4rem 0.6rem',
                borderRadius: 6,
                background: location.pathname === link.to ? 'rgba(255,255,255,0.15)' : 'transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { if (location.pathname !== link.to) e.target.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { if (location.pathname !== link.to) e.target.style.background = 'transparent'; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '0.5rem', display: 'none' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div style={{ background: 'var(--burgundy-dark)', borderTop: '1px solid rgba(255,255,255,0.1)' }} className="mobile-nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'block',
                color: location.pathname === link.to ? 'white' : 'rgba(255,255,255,0.8)',
                fontWeight: location.pathname === link.to ? 600 : 400,
                padding: '0.85rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
