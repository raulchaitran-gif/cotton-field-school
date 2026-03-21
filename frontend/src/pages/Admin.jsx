import React, { useState } from 'react';
import { Lock, LogOut, Trash2, Edit2, Save, X, Image, Newspaper, BookOpen } from 'lucide-react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'cottonfield2026';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('news');
  const [toast, setToast] = useState('');

  // News state
  const [news, setNews] = useState([]);
  const [newsForm, setNewsForm] = useState({ title: '', date: '', category: '', excerpt: '', important: false });
  const [editingNews, setEditingNews] = useState(null);

  // Gallery state
  const [gallery, setGallery] = useState([]);
  const [galleryForm, setGalleryForm] = useState({ url: '', caption: '', category: 'Campus' });
  const [editingGallery, setEditingGallery] = useState(null);

  // MOE state
  const [moe, setMoe] = useState([]);
  const [moeForm, setMoeForm] = useState({ date: '', content: '', likes: 0, comments: 0, shares: 0 });
  const [editingMoe, setEditingMoe] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      setLoginError('');
      loadAll();
    } else {
      setLoginError('Incorrect username or password.');
    }
  };

  const loadAll = async () => {
    try {
      const [n, g, m] = await Promise.all([
        fetch(`${API}/api/announcements`).then(r => r.json()),
        fetch(`${API}/api/gallery`).then(r => r.json()),
        fetch(`${API}/api/moe`).then(r => r.json()),
      ]);
      setNews(Array.isArray(n) ? n : []);
      setGallery(Array.isArray(g) ? g : []);
      setMoe(Array.isArray(m) ? m : []);
    } catch (e) {
      showToast('Could not connect to backend.');
    }
  };

  // ── NEWS ────────────────────────────────────────────────────────────────────

  const saveNews = async () => {
    if (!newsForm.title || !newsForm.excerpt) return showToast('Please fill in title and content.');
    const item = { ...newsForm, id: editingNews ? editingNews.id : Date.now() };
    try {
      const url = editingNews ? `${API}/api/announcements/${editingNews.id}` : `${API}/api/announcements`;
      const method = editingNews ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
      showToast(editingNews ? 'Announcement updated!' : 'Announcement added!');
      setNewsForm({ title: '', date: '', category: '', excerpt: '', important: false });
      setEditingNews(null);
      loadAll();
    } catch { showToast('Error saving announcement.'); }
  };

  const deleteNews = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await fetch(`${API}/api/announcements/${id}`, { method: 'DELETE' });
      showToast('Deleted!');
      loadAll();
    } catch { showToast('Error deleting.'); }
  };

  const editNews = (item) => {
    setEditingNews(item);
    setNewsForm({ title: item.title, date: item.date, category: item.category, excerpt: item.excerpt, important: item.important || false });
  };

  // ── GALLERY ─────────────────────────────────────────────────────────────────

  const saveGallery = async () => {
    if (!galleryForm.url || !galleryForm.caption) return showToast('Please fill in URL and caption.');
    const item = { ...galleryForm, id: editingGallery ? editingGallery.id : Date.now() };
    try {
      const url = editingGallery ? `${API}/api/gallery/${editingGallery.id}` : `${API}/api/gallery`;
      const method = editingGallery ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
      showToast(editingGallery ? 'Photo updated!' : 'Photo added!');
      setGalleryForm({ url: '', caption: '', category: 'Campus' });
      setEditingGallery(null);
      loadAll();
    } catch { showToast('Error saving photo.'); }
  };

  const deleteGallery = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await fetch(`${API}/api/gallery/${id}`, { method: 'DELETE' });
      showToast('Deleted!');
      loadAll();
    } catch { showToast('Error deleting.'); }
  };

  const editGallery = (item) => {
    setEditingGallery(item);
    setGalleryForm({ url: item.url, caption: item.caption, category: item.category });
  };

  // ── MOE ─────────────────────────────────────────────────────────────────────

  const saveMoe = async () => {
    if (!moeForm.content) return showToast('Please enter post content.');
    const item = { ...moeForm, id: editingMoe ? editingMoe.id : Date.now(), author: 'Ministry of Education - Guyana' };
    try {
      const url = editingMoe ? `${API}/api/moe/${editingMoe.id}` : `${API}/api/moe`;
      const method = editingMoe ? 'PUT' : 'POST';
      await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
      showToast(editingMoe ? 'Post updated!' : 'Post added!');
      setMoeForm({ date: '', content: '', likes: 0, comments: 0, shares: 0 });
      setEditingMoe(null);
      loadAll();
    } catch { showToast('Error saving post.'); }
  };

  const deleteMoe = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await fetch(`${API}/api/moe/${id}`, { method: 'DELETE' });
      showToast('Deleted!');
      loadAll();
    } catch { showToast('Error deleting.'); }
  };

  const editMoe = (item) => {
    setEditingMoe(item);
    setMoeForm({ date: item.date, content: item.content, likes: item.likes || 0, comments: item.comments || 0, shares: item.shares || 0 });
  };

  // ── LOGIN SCREEN ─────────────────────────────────────────────────────────────

  if (!loggedIn) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div className="card" style={{ width: '100%', maxWidth: 400, padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Lock size={24} color="white" />
          </div>
          <h2 style={{ color: 'var(--burgundy)' }}>Admin Dashboard</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginTop: '0.25rem' }}>Cotton Field Secondary School</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
          </div>
          {loginError && <div style={{ color: 'var(--burgundy)', fontSize: '0.85rem', marginBottom: '1rem', background: 'rgba(128,0,32,0.08)', padding: '0.75rem', borderRadius: 6 }}>{loginError}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <Lock size={16} /> Sign In
          </button>
        </form>
      </div>
    </div>
  );

  // ── DASHBOARD ────────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'news', label: 'News', icon: <Newspaper size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={16} /> },
    { id: 'moe', label: 'MOE Updates', icon: <BookOpen size={16} /> },
  ];

  const newsCategories = ['Examinations', 'Sports', 'Facilities', 'Events', 'Administration', 'Academic'];
  const galleryCategories = ['Campus', 'Academic', 'Science', 'Sports', 'Events', 'Graduation'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'var(--burgundy)', color: 'white', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Merriweather, serif', fontWeight: 700, fontSize: '1.1rem' }}>Admin Dashboard</div>
            <div style={{ fontSize: '0.78rem', opacity: 0.75 }}>Cotton Field Secondary School</div>
          </div>
          <button onClick={() => setLoggedIn(false)} className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem' }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="btn"
              style={{ background: activeTab === tab.id ? 'var(--burgundy)' : 'white', color: activeTab === tab.id ? 'white' : 'var(--text-mid)', border: '1.5px solid', borderColor: activeTab === tab.id ? 'var(--burgundy)' : 'var(--border)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── NEWS TAB ── */}
        {activeTab === 'news' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', alignItems: 'start' }}>
            {/* Form */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ marginBottom: '1.25rem', color: 'var(--burgundy)' }}>{editingNews ? 'Edit Announcement' : 'Add Announcement'}</h3>
              <div className="form-group">
                <label>Title *</label>
                <input value={newsForm.title} onChange={e => setNewsForm(f => ({ ...f, title: e.target.value }))} placeholder="Announcement title" />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input value={newsForm.date} onChange={e => setNewsForm(f => ({ ...f, date: e.target.value }))} placeholder="e.g. March 21, 2026" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={newsForm.category} onChange={e => setNewsForm(f => ({ ...f, category: e.target.value }))}>
                  <option value="">Select category</option>
                  {newsCategories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Content *</label>
                <textarea value={newsForm.excerpt} onChange={e => setNewsForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Announcement content..." rows={4} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <input type="checkbox" id="important" checked={newsForm.important} onChange={e => setNewsForm(f => ({ ...f, important: e.target.checked }))} />
                <label htmlFor="important" style={{ fontWeight: 400, marginBottom: 0, cursor: 'pointer' }}>Mark as important</label>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={saveNews} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={15} /> {editingNews ? 'Update' : 'Save'}
                </button>
                {editingNews && (
                  <button onClick={() => { setEditingNews(null); setNewsForm({ title: '', date: '', category: '', excerpt: '', important: false }); }} className="btn btn-outline">
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ color: 'var(--burgundy)', marginBottom: '0.5rem' }}>All Announcements ({news.length})</h3>
              {news.length === 0 && <div style={{ color: 'var(--text-light)', padding: '2rem', textAlign: 'center' }}>No announcements yet. Add your first one!</div>}
              {news.map(item => (
                <div key={item.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{item.category} · {item.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                    <button onClick={() => editNews(item)} className="btn" style={{ padding: '0.4rem 0.7rem', background: 'rgba(127,200,190,0.15)', color: 'var(--seafoam-dark)', border: '1px solid var(--seafoam)', fontSize: '0.8rem' }}>
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => deleteNews(item.id)} className="btn" style={{ padding: '0.4rem 0.7rem', background: 'rgba(128,0,32,0.08)', color: 'var(--burgundy)', border: '1px solid rgba(128,0,32,0.2)', fontSize: '0.8rem' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GALLERY TAB ── */}
        {activeTab === 'gallery' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', alignItems: 'start' }}>
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ marginBottom: '1.25rem', color: 'var(--burgundy)' }}>{editingGallery ? 'Edit Photo' : 'Add Photo'}</h3>
              <div className="form-group">
                <label>Image URL *</label>
                <input value={galleryForm.url} onChange={e => setGalleryForm(f => ({ ...f, url: e.target.value }))} placeholder="https://images.unsplash.com/..." />
              </div>
              {galleryForm.url && (
                <div style={{ marginBottom: '1rem', borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={galleryForm.url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                </div>
              )}
              <div className="form-group">
                <label>Caption *</label>
                <input value={galleryForm.caption} onChange={e => setGalleryForm(f => ({ ...f, caption: e.target.value }))} placeholder="Photo caption" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={galleryForm.category} onChange={e => setGalleryForm(f => ({ ...f, category: e.target.value }))}>
                  {galleryCategories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={saveGallery} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={15} /> {editingGallery ? 'Update' : 'Save'}
                </button>
                {editingGallery && (
                  <button onClick={() => { setEditingGallery(null); setGalleryForm({ url: '', caption: '', category: 'Campus' }); }} className="btn btn-outline">
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '1rem' }}>
                Tip: Use free image sites like unsplash.com — right-click an image → Copy image address
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--burgundy)', marginBottom: '1rem' }}>All Photos ({gallery.length})</h3>
              {gallery.length === 0 && <div style={{ color: 'var(--text-light)', padding: '2rem', textAlign: 'center' }}>No photos yet.</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {gallery.map(item => (
                  <div key={item.id} className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '4/3', background: 'var(--border)' }}>
                      <img src={item.url} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '0.75rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.25rem' }}>{item.caption}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>{item.category}</div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => editGallery(item)} className="btn" style={{ flex: 1, justifyContent: 'center', padding: '0.3rem', background: 'rgba(127,200,190,0.15)', color: 'var(--seafoam-dark)', border: '1px solid var(--seafoam)', fontSize: '0.78rem' }}>
                          <Edit2 size={12} /> Edit
                        </button>
                        <button onClick={() => deleteGallery(item.id)} className="btn" style={{ flex: 1, justifyContent: 'center', padding: '0.3rem', background: 'rgba(128,0,32,0.08)', color: 'var(--burgundy)', border: '1px solid rgba(128,0,32,0.2)', fontSize: '0.78rem' }}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MOE TAB ── */}
        {activeTab === 'moe' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', alignItems: 'start' }}>
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ marginBottom: '1.25rem', color: 'var(--burgundy)' }}>{editingMoe ? 'Edit Post' : 'Add MOE Post'}</h3>
              <div className="form-group">
                <label>Date</label>
                <input value={moeForm.date} onChange={e => setMoeForm(f => ({ ...f, date: e.target.value }))} placeholder="e.g. March 21, 2026" />
              </div>
              <div className="form-group">
                <label>Post Content *</label>
                <textarea value={moeForm.content} onChange={e => setMoeForm(f => ({ ...f, content: e.target.value }))} placeholder="Paste the Ministry of Education post here..." rows={5} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {['likes', 'comments', 'shares'].map(field => (
                  <div key={field} className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ textTransform: 'capitalize' }}>{field}</label>
                    <input type="number" value={moeForm[field]} onChange={e => setMoeForm(f => ({ ...f, [field]: parseInt(e.target.value) || 0 }))} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={saveMoe} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={15} /> {editingMoe ? 'Update' : 'Save'}
                </button>
                {editingMoe && (
                  <button onClick={() => { setEditingMoe(null); setMoeForm({ date: '', content: '', likes: 0, comments: 0, shares: 0 }); }} className="btn btn-outline">
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ color: 'var(--burgundy)', marginBottom: '0.5rem' }}>All MOE Posts ({moe.length})</h3>
              {moe.length === 0 && <div style={{ color: 'var(--text-light)', padding: '2rem', textAlign: 'center' }}>No posts yet.</div>}
              {moe.map(item => (
                <div key={item.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>{item.date}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', marginBottom: '0.75rem', lineHeight: 1.6 }}>{item.content?.slice(0, 120)}...</p>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => editMoe(item)} className="btn" style={{ padding: '0.4rem 0.7rem', background: 'rgba(127,200,190,0.15)', color: 'var(--seafoam-dark)', border: '1px solid var(--seafoam)', fontSize: '0.8rem' }}>
                      <Edit2 size={13} /> Edit
                    </button>
                    <button onClick={() => deleteMoe(item.id)} className="btn" style={{ padding: '0.4rem 0.7rem', background: 'rgba(128,0,32,0.08)', color: 'var(--burgundy)', border: '1px solid rgba(128,0,32,0.2)', fontSize: '0.8rem' }}>
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
