import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { holidays2026 } from '../mock';

const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthColors = {
  January: '#800020', February: '#9b2335', March: '#b04060',
  April: '#5aada3', May: '#3d9e94', June: '#2a8c82',
  July: '#7a6020', August: '#5c8a30', September: '#3d6b20',
  October: '#6a3090', November: '#8a4010', December: '#800020'
};

export default function Calendar() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? holidays2026 : holidays2026.filter(h => h.month === active);

  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Public Holidays 2026</h1>
          <p>Official Guyana public holidays for the 2026 calendar year</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Month filter */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2.5rem', justifyContent: 'center' }}>
            {months.filter(m => m === 'All' || holidays2026.some(h => h.month === m)).map(month => (
              <button key={month} onClick={() => setActive(month)}
                className="btn"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem', background: active === month ? 'var(--burgundy)' : 'white', color: active === month ? 'white' : 'var(--text-mid)', border: '1.5px solid', borderColor: active === month ? 'var(--burgundy)' : 'var(--border)' }}>
                {month}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filtered.sort((a, b) => new Date(a.date) - new Date(b.date)).map(holiday => (
                <div key={holiday.id} className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: monthColors[holiday.month] || 'var(--burgundy)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ color: 'white', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1 }}>{holiday.month.slice(0, 3)}</div>
                    <div style={{ color: 'white', fontSize: '1.1rem', fontFamily: 'Merriweather, serif', fontWeight: 700, lineHeight: 1.2 }}>
                      {holiday.date.split(' ')[1].replace(',', '')}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.97rem', marginBottom: '0.15rem' }}>{holiday.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{holiday.day}, {holiday.date}</div>
                  </div>
                  <CalendarDays size={16} color="var(--seafoam-dark)" />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', background: 'rgba(128,0,32,0.05)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--seafoam)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                <strong>Note:</strong> The above holidays are the official public holidays declared for Guyana in 2026. School term dates may be confirmed separately by the Ministry of Education.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
