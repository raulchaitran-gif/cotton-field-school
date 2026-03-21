import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const categories = ['All', 'Examinations', 'Sports', 'Facilities', 'Events', 'Administration', 'Academic'];

export default function News() {
  const [active, setActive] = useState('All');
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/announcements`)
      .then(r => r.json())
      .then(data => setAnnouncements(Array.isArray(data) ? data : []))
      .catch(() => setAnnouncements([]));
  }, []);

  const filtered = active === 'All' ? announcements : announcements.filter(a => a.category === active);

  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>News & Announcements</h1>
          <p>Stay informed with the latest news, events, and announcements from Cotton Field Secondary School</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} className="btn"
                style={{ fontSize: '0.82rem', padding: '0.4rem 1rem', background: active === cat ? 'var(--burgundy)' : 'white', color: active === cat ? 'white' : 'var(--text-mid)', border: '1.5px solid', borderColor: active === cat ? 'var(--burgundy)' : 'var(--border)' }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 800, margin: '0 auto' }}>
            {filtered.map((item, i) => (
              <div key={item.id || i} className="card" style={{ padding: '1.75rem', borderLeft: `4px solid ${item.important ? 'var(--burgundy)' : 'var(--seafoam)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="badge badge-burgundy">{item.category}</span>
                    {item.important && (
                      <span className="badge" style={{ background: 'rgba(128,0,32,0.12)', color: 'var(--burgundy)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Bell size={11} /> Important
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{item.date}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>{item.excerpt}</p>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="loading" style={{ flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '2rem' }}>📋</span>
                <span>No announcements yet.</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}