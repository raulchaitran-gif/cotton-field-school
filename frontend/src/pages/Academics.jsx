import React, { useState } from 'react';
import { programs } from '../mock';
import { ChevronDown, ChevronUp } from 'lucide-react';

const icons = { flask: '🔬', calculator: '📐', book: '📖', briefcase: '💼', tool: '🔧' };

export default function Academics() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Academic Programs</h1>
          <p>Comprehensive Caribbean Secondary Education Certificate (CSEC) preparation across five program areas</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Programs</h2>
          <div className="divider" />
          <p className="section-subtitle">Our curriculum is aligned with the Caribbean Examinations Council (CXC) standards, preparing students for CSEC and CAPE examinations</p>

          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {programs.map(prog => (
              <div key={prog.id} className="card" style={{ overflow: 'hidden' }}>
                <button
                  onClick={() => setOpen(open === prog.id ? null : prog.id)}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}'center', gap: '1rem', textAlign: 'left' }}
                >
                  <div style={{ width: 52, height: 52, background: 'rgba(128,0,32,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    {icons[prog.icon]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{prog.name}</h3>
                    <p style={{ fontSize: '0.87rem', color: 'var(--text-light)' }}>{prog.description}</p>
                  </div>
                  {open === prog.id ? <ChevronUp size={20} color="var(--burgundy)" /> : <ChevronDown size={20} color="var(--text-light)" />}
                </button>
                {open === prog.id && (
                  <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--seafoam-dark)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Subjects Offered</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {prog.subjects.map(subj => (
                          <span key={subj} className="badge badge-burgundy">{subj}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Academic Support</h2>
          <div className="divider" />
          <div className="grid-3">
            {[
              { title: 'Remedial Classes', desc: 'Extra support sessions for students who need additional help in core subjects, held after school hours.' },
              { title: 'CSEC Preparation', desc: 'Dedicated past paper practice, mock examinations, and intensive revision sessions before major exams.' },
              { title: 'Guidance Counselling', desc: 'Professional counsellors available to support students with academic choices, career planning, and personal development.' },
              { title: 'Library Resources', desc: 'A well-stocked library with textbooks, reference materials, and internet access for research and self-study.' },
              { title: 'Science Labs', desc: 'Hands-on laboratory sessions that reinforce theoretical knowledge across Biology, Chemistry, and Physics.' },
              { title: 'Computer Lab Access', desc: 'Students have scheduled and open access to the computer lab for research, typing, and digital skills development.' },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--burgundy)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.87rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
