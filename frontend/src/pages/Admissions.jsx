import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  { num: '01', title: 'Check Requirements', desc: 'Ensure your child meets the minimum requirements: National Grade Six Assessment (NGSA) results and age requirement of 11–12 years.' },
  { num: '02', title: 'Collect Application Form', desc: 'Visit the school office to collect an application form, or download it from the Ministry of Education website. Forms are free of charge.' },
  { num: '03', title: 'Submit Documents', desc: 'Submit the completed form along with required documents: birth certificate, NGSA results, two passport photos, and proof of address.' },
  { num: '04', title: 'Confirmation', desc: 'Receive confirmation of placement from the school. New students are assigned to forms and notified of orientation dates.' },
];

const requirements = [
  'Original birth certificate and one copy',
  'NGSA results slip (original)',
  'Two recent passport-size photographs',
  'Proof of address (utility bill or letter)',
  'Immunisation card',
  'Transfer certificate (if transferring from another school)',
];

const dates = [
  { event: 'Application Forms Available', date: 'February 2026' },
  { event: 'Application Deadline', date: 'April 30, 2026' },
  { event: 'Placement Notifications', date: 'May 2026' },
  { event: 'New Student Orientation', date: 'August 2026' },
  { event: 'First Day of School', date: 'September 7, 2026' },
];

export default function Admissions() {
  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Admissions</h1>
          <p>Join the Cotton Field Secondary School family — a simple four-step process</p>
        </div>
      </div>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Application Process</h2>
          <div className="divider" />
          <div className="grid-4">
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--burgundy)', color: 'white', fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ display: 'none' }} className="step-arrow" />
                )}
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Dates */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 style={{ color: 'var(--burgundy)', marginBottom: '1rem' }}>Required Documents</h2>
              <div className="divider divider-left" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {requirements.map((req, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle size={18} color="var(--seafoam-dark)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.93rem', color: 'var(--text-mid)' }}>{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ color: 'var(--burgundy)', marginBottom: '1rem' }}>Important Dates</h2>
              <div className="divider divider-left" />
              <div className="card" style={{ overflow: 'hidden' }}>
                {dates.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: i < dates.length - 1 ? '1px solid var(--border)' : 'none', gap: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-mid)' }}>{item.event}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--burgundy)', whiteSpace: 'nowrap' }}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--burgundy)', padding: '4rem 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Questions About Admissions?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Our admissions team is happy to help. Visit us during school hours or send us a message.</p>
          <Link to="/contact" className="btn btn-seafoam">Contact Us <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
