import React from 'react';
import { studentLife } from '../mock';

const categoryColors = { Sports: 'badge-burgundy', Clubs: 'badge-seafoam', Achievements: 'badge-gold' };

export default function StudentLife() {
  const categories = ['All', 'Sports', 'Clubs', 'Achievements'];
  const [active, setActive] = React.useState('All');
  const filtered = active === 'All' ? studentLife : studentLife.filter(s => s.category === active);

  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Student Life</h1>
          <p>Beyond the classroom — sports, clubs, culture, and community at Cotton Field Secondary School</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Activities & Achievements</h2>
          <div className="divider" />

          {/* Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className="btn"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', background: active === cat ? 'var(--burgundy)' : 'white', color: active === cat ? 'white' : 'var(--text-mid)', border: '1.5px solid', borderColor: active === cat ? 'var(--burgundy)' : 'var(--border)' }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map(item => (
              <div key={item.id} className="card" style={{ padding: '1.5rem' }}>
                <span className={`badge ${categoryColors[item.category] || 'badge-burgundy'}`} style={{ marginBottom: '0.75rem' }}>{item.category}</span>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.87rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ background: 'var(--burgundy)', padding: '4rem 0', textAlign: 'center', color: 'white' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <blockquote style={{ fontFamily: 'Merriweather, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            "Student life at Cotton Field is about more than passing exams — it's about discovering who you are and what you can become."
          </blockquote>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>— School Administration</div>
        </div>
      </section>
    </div>
  );
}
