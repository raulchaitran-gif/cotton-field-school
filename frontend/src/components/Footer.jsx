import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Facebook, ExternalLink } from 'lucide-react';
import { schoolInfo } from '../mock';

export default function Footer() {
  return (
    <footer style={{ background: '#1a0008', color: 'rgba(255,255,255,0.75)', marginTop: 'auto' }}>
      {/* Seafoam accent bar */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #7fc8be, #5aada3)' }} />

      <div className="container" style={{ padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Cotton Field Secondary School Logo"
  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ color: 'white', fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: '0.95rem' }}>Cotton Field</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.05em' }}>SECONDARY SCHOOL</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Established 1965. Formerly Anna Regina Community High School. Serving the Anna Regina community with quality education.
            </p>
            <div style={{ fontStyle: 'italic', color: '#7fc8be', fontSize: '0.9rem' }}>
              "Towards Community Development"
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'Merriweather, serif', fontSize: '0.95rem', marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { to: '/about', label: 'About Us' },
                { to: '/academics', label: 'Academics' },
                { to: '/admissions', label: 'Admissions' },
                { to: '/news', label: 'News & Announcements' },
                { to: '/calendar', label: 'School Calendar' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <Link key={link.to} to={link.to} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.87rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#7fc8be'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'Merriweather, serif', fontSize: '0.95rem', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={15} color="#7fc8be" style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem' }}>{schoolInfo.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Phone size={15} color="#7fc8be" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem' }}>{schoolInfo.phone}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Mail size={15} color="#7fc8be" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem' }}>{schoolInfo.email}</span>
              </div>
              <a href={schoolInfo.facebook} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#7fc8be'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
              >
                <Facebook size={15} color="#7fc8be" style={{ flexShrink: 0 }} />
                <span>Follow us on Facebook <ExternalLink size={11} style={{ display: 'inline', marginLeft: 2 }} /></span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
          <span>© {new Date().getFullYear()} Cotton Field Secondary School. All rights reserved.</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Anna Regina, Region 2, Guyana</span>
        </div>
      </div>
    </footer>
  );
}
