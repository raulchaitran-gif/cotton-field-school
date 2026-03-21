import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { schoolInfo } from '../mock';

export default function FacebookFeed() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div id="fb-root" />
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1877f2 0%, #0c5fc9 100%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Ministry of Education Updates</h1>
          <p>Live updates from the official Ministry of Education Guyana Facebook page</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>f</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Ministry of Education Guyana</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Live Facebook Feed</div>
              </div>
            </div>
            <a href={schoolInfo.moeFacebook} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#1877f2', fontSize: '0.85rem' }}>
              Follow Page <ExternalLink size={14} />
            </a>
          </div>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <div className="fb-page" data-href="https://www.facebook.com/MinistryOfEducationGuyana" data-tabs="timeline" data-width="650" data-height="800" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" />
          </div>
          <div className="card" style={{ padding: '1.25rem 1.5rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>f</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Cotton Field Secondary School</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Follow our school page too</div>
              </div>
            </div>
            <a href={schoolInfo.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
              Follow Page <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}