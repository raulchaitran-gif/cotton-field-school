import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const categories = ['All', 'Campus', 'Academic', 'Science', 'Sports', 'Events', 'Graduation'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/gallery`)
      .then(r => r.json())
      .then(data => setImages(Array.isArray(data) ? data : []))
      .catch(() => setImages([]));
  }, []);

  const filtered = active === 'All' ? images : images.filter(g => g.category === active);

  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Photo Gallery</h1>
          <p>Moments from campus life, academic achievements, sports, and community events</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} className="btn"
                style={{ fontSize: '0.82rem', padding: '0.4rem 1rem', background: active === cat ? 'var(--burgundy)' : 'white', color: active === cat ? 'white' : 'var(--text-mid)', border: '1.5px solid', borderColor: active === cat ? 'var(--burgundy)' : 'var(--border)' }}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="loading" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>🖼️</span>
              <span>No photos in this category yet.</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {filtered.map((img, i) => (
              <div key={img.id || i} onClick={() => setLightbox(img)}
                style={{ cursor: 'pointer', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', background: 'var(--border)' }}
                className="card">
                <img src={img.url} alt={img.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '1.5rem 1rem 0.75rem' }}>
                  <div style={{ color: 'white', fontSize: '0.8rem', fontWeight: 500 }}>{img.caption}</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.72rem' }}>{img.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <X size={20} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '100%' }}>
            <img src={lightbox.url} alt={lightbox.caption} style={{ width: '100%', borderRadius: 12, maxHeight: '80vh', objectFit: 'contain' }} />
            <div style={{ textAlign: 'center', marginTop: '1rem', color: 'white' }}>
              <div style={{ fontWeight: 500 }}>{lightbox.caption}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{lightbox.category}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}