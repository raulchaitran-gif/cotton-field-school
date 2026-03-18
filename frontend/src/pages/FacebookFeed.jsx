import React from 'react';
import { ThumbsUp, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { facebookPosts, schoolInfo } from '../mock';

export default function FacebookFeed() {
  return (
    <div>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1877f2 0%, #0c5fc9 100%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1>Ministry of Education Updates</h1>
          <p>Latest news and announcements from the Ministry of Education — Guyana</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          {/* Official page link */}
          <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>f</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Ministry of Education — Guyana</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Official Facebook Page</div>
              </div>
            </div>
            <a href={schoolInfo.moeFacebook} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#1877f2', fontSize: '0.85rem' }}>
              Follow Page <ExternalLink size={14} />
            </a>
          </div>

          {/* Posts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {facebookPosts.map(post => (
              <div key={post.id} className="card" style={{ padding: '1.5rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'white', fontWeight: 700 }}>f</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{post.author}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{post.date}</div>
                  </div>
                </div>

                {/* Content */}
                <p style={{ fontSize: '0.92rem', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '1rem' }}>{post.content}</p>

                {/* Engagement */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', gap: '1.5rem' }}>
                  {[
                    { icon: <ThumbsUp size={15} />, count: post.likes, label: 'Likes' },
                    { icon: <MessageCircle size={15} />, count: post.comments, label: 'Comments' },
                    { icon: <Share2 size={15} />, count: post.shares, label: 'Shares' },
                  ].map((stat, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', color: 'var(--text-light)', fontSize: '0.82rem' }}>
                      <span style={{ color: '#1877f2' }}>{stat.icon}</span>
                      <span style={{ fontWeight: 500, color: 'var(--text-mid)' }}>{stat.count.toLocaleString()}</span>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href={schoolInfo.moeFacebook} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View All Posts on Facebook <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
