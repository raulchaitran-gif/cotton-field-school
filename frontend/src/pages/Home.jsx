import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Building2, ArrowRight, Bell } from 'lucide-react';
import { heroSlides, announcements, facilities, schoolInfo } from '../mock';

export default function Home() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const facilityIcons = { flask: '🔬', monitor: '💻', 'book-open': '📚', activity: '⚽' };

  return (
    <div>
      {/* Hero Slideshow */}
      <section style={{ position: 'relative', height: 'clamp(420px, 70vh, 700px)', overflow: 'hidden' }}>
        {heroSlides.map((s, i) => (
          <div key={s.id} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(92,0,24,0.85) 0%, rgba(128,0,32,0.6) 50%, rgba(0,0,0,0.3) 100%)' }} />
          </div>
        ))}

        {/* Slide content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ color: '#7fc8be', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Cotton Field Secondary School
            </div>
            <h1 style={{ color: 'white', marginBottom: '1rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {heroSlides[slide].title}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              {heroSlides[slide].subtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-seafoam">{heroSlides[slide].cta} <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}>Contact Us</Link>
            </div>
          </div>
        </div>
     

        {/* Indicators */}
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: '0.5rem' }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 8, height: 8, borderRadius: 4, background: i === slide ? '#7fc8be' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: 'var(--burgundy)', color: 'white' }}>
        <div className="container stats-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '1.5rem' }}>
          {[
            { icon: <BookOpen size={20} />, value: '1965', label: 'Established' },
            { icon: <Users size={20} />, value: '800+', label: 'Students' },
            { icon: <Award size={20} />, value: '60+', label: 'Years of Excellence' },
            { icon: <Building2 size={20} />, value: '5', label: 'Program Areas' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0.5rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem', opacity: 0.8 }}>{stat.icon}</div>
              <div style={{ fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: 'clamp(1rem, 3vw, 1.4rem)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.75, marginTop: '0.1rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span className="badge badge-seafoam" style={{ marginBottom: '1rem' }}>Our Mission</span>
            <h2 style={{ color: 'var(--burgundy)', marginBottom: '1rem' }}>Building Tomorrow's Leaders Today</h2>
            <div className="divider divider-left" />
            <p style={{ marginBottom: '1rem', color: 'var(--text-mid)' }}>{schoolInfo.mission}</p>
            <p style={{ color: 'var(--text-mid)' }}>{schoolInfo.philosophy}</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-primary">Our Story <ArrowRight size={16} /></Link>
              <Link to="/academics" className="btn btn-outline">Academic Programs</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}
>
            {[
              { title: 'Quality Education', desc: 'Rigorous academics aligned with CXC standards', color: 'var(--burgundy)' },
              { title: 'Character Development', desc: 'Values, ethics, and civic responsibility', color: 'var(--seafoam-dark)' },
              { title: 'Community Focus', desc: 'Deeply rooted in the Anna Regina community', color: 'var(--seafoam-dark)' },
              { title: 'Future Ready', desc: 'Preparing students for tertiary education and careers', color: 'var(--burgundy)' },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Latest News</h2>
              <div className="divider divider-left" />
            </div>
            <Link to="/news" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>View All <ArrowRight size={14} /></Link>
          </div>
          <div className="grid-3">
            {announcements.slice(0, 3).map(item => (
              <div key={item.id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-burgundy">{item.category}</span>
                  {item.important && <Bell size={14} color="var(--burgundy)" />}
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.75rem' }}>{item.excerpt.slice(0, 100)}...</p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Facilities</h2>
          <div className="divider" />
          <p className="section-subtitle">Modern learning environments designed to inspire students</p>
          <div className="grid-4">
            {facilities.map(f => (
              <div key={f.id} className="card" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{facilityIcons[f.icon] || '🏫'}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{f.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--burgundy) 0%, var(--burgundy-dark) 100%)', padding: '4rem 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Join Our School?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Applications are open for the new academic year. Join over 800 students thriving at Cotton Field Secondary School.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admissions" className="btn btn-seafoam">Apply Now <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.3)' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
