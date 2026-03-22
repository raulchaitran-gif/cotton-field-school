import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Clock, Send } from 'lucide-react';
import { schoolInfo } from '../mock';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const submissions = JSON.parse(localStorage.getItem('cf_submissions') || '[]');
    submissions.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('cf_submissions', JSON.stringify(submissions));
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setLoading(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  const contactItems = [
    { icon: <MapPin size={20} />, label: 'Address', value: schoolInfo.address },
    { icon: <Phone size={20} />, label: 'Phone', value: schoolInfo.phone },
    { icon: <Mail size={20} />, label: 'Email', value: schoolInfo.email },
    { icon: <Clock size={20} />, label: 'Office Hours', value: 'Monday – Friday: 7:30 AM – 4:00 PM' },
    { icon: <Facebook size={20} />, label: 'Facebook', value: 'Cotton Field Secondary School', link: schoolInfo.facebook },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you — reach out to the school administration anytime</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            {/* Info */}
            <div>
              <h2 style={{ color: 'var(--burgundy)', marginBottom: '0.5rem' }}>Get In Touch</h2>
              <div className="divider divider-left" />
              <p style={{ color: 'var(--text-mid)', marginBottom: '2rem', fontSize: '0.93rem' }}>
                Whether you have a question about admissions, academics, or school events — we're here to help.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(128,0,32,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--burgundy)', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.label}</div>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--burgundy)', fontSize: '0.92rem' }}>{item.value}</a>
                      ) : (
                        <div style={{ color: 'var(--text-mid)', fontSize: '0.92rem' }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div style={{ marginTop: '2rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 220, background: 'var(--border)', position: 'relative' }}>
                <iframe
                  title="School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.1234567890!2d-58.505!3d7.265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnNTQuMCJOIDU4wrAzMCczMC4wIlc!5e0!3m2!1sen!2sgy!4v1234567890"
                  width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <h3 style={{ marginBottom: '0.25rem' }}>Send a Message</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.87rem', marginBottom: '1.75rem' }}>Fill in the form below and we'll get back to you as soon as possible.</p>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+592-000-0000" />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required>
                      <option value="">Select subject</option>
                      <option>Admissions Enquiry</option>
                      <option>Academic Information</option>
                      <option>General Enquiry</option>
                      <option>Complaint / Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Write your message here..." rows={5} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {toast && (
        <div className="toast">
          ✓ Message sent! We'll be in touch soon.
        </div>
      )}
    </div>
  );
}
