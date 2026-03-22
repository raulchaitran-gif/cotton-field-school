import React from 'react';
import { schoolInfo } from '../mock';

const timeline = [
  { year: '1965', title: 'Founded', desc: 'Established as Anna Regina Community High School to serve the growing educational needs of Region 2.' },
  { year: '1975', title: 'Expansion', desc: 'New science laboratories and library facilities added to accommodate the growing student population.' },
  { year: '1985', title: 'CSEC Recognition', desc: 'School achieves outstanding CSEC results, establishing reputation for academic excellence in the region.' },
  { year: '1995', title: 'Sports Achievements', desc: 'Cotton Field athletes begin winning regional and national competitions across multiple disciplines.' },
  { year: '2001', title: 'Renamed', desc: 'School renamed Cotton Field Secondary School, reflecting its deep roots in the Cotton Field community.' },
  { year: '2015', title: 'Golden Jubilee', desc: '50 years of excellence celebrated with alumni reunions, community events, and new facility upgrades.' },
  { year: '2024', title: 'Digital Upgrade', desc: 'New computer laboratory with 40 workstations and high-speed internet launched for students and staff.' },
  { year: '2026', title: 'Today', desc: 'Over 800 students, dedicated faculty, and a proud tradition of community service and academic achievement.' },
];

const values = [
  { title: 'Excellence', desc: 'We hold ourselves to the highest academic and personal standards.' },
  { title: 'Integrity', desc: 'Honesty, fairness, and ethical conduct in all we do.' },
  { title: 'Community', desc: 'Deep commitment to Anna Regina and Region 2 as a whole.' },
  { title: 'Inclusion', desc: 'Every student belongs and is valued regardless of background.' },
  { title: 'Innovation', desc: 'Embracing new ideas, technologies, and teaching approaches.' },
  { title: 'Service', desc: 'Giving back to the community that has supported us for 60 years.' },
];

export default function About() {
  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge" style={{ background: 'rgba(127,200,190,0.2)', color: '#7fc8be', marginBottom: '1rem' }}>Established 1965</span>
          <h1>About Our School</h1>
          <p>Over six decades of shaping minds and building community in Anna Regina, Guyana</p>
        </div>
      </div>

      {/* Motto, Mission, Philosophy */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'Our Motto', content: schoolInfo.motto, color: 'var(--burgundy)' },
              { label: 'Our Mission', content: schoolInfo.mission, color: 'var(--seafoam-dark)' },
              { label: 'Our Philosophy', content: schoolInfo.philosophy, color: 'var(--burgundy)' },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '2rem', borderTop: `4px solid ${item.color}` }}>
                <div style={{ color: item.color, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{item.label}</div>
                <p style={{ fontFamily: i === 0 ? 'Merriweather, serif' : 'inherit', fontStyle: i === 0 ? 'italic' : 'normal', fontSize: i === 0 ? '1.1rem' : '0.93rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Our History</h2>
          <div className="divider" />
          <p className="section-subtitle">A proud journey from a small community school to a leading secondary institution in Region 2</p>

          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
            {/* Centre line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--border)', transform: 'translateX(-50%)' }} />

            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '2rem', position: 'relative' }}>
                {/* Dot */}
                <div style={{ position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: 'var(--burgundy)', border: '3px solid white', boxShadow: '0 0 0 2px var(--burgundy)', zIndex: 1 }} />

                <div style={{ width: '44%', background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', borderTop: '3px solid var(--burgundy)' }}>
                  <div style={{ color: 'var(--seafoam-dark)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{item.year}</div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="divider" />
          <div className="grid-3" style={{ marginTop: '1rem' }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(128,0,32,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--burgundy)', fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: '0.85rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.87rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
