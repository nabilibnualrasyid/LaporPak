import { useState, useEffect } from 'react'
import './LandingPage.css'

// ─── Icons (inline SVG, tanpa dependency baru) ────────────────────────────────
function IconClipboard() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  )
}
function IconAlertTriangle() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}
function IconEyeOff() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}
function IconSortDesc() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="11" y1="5" x2="17" y2="5"/><line x1="11" y1="9" x2="17" y2="9"/>
      <line x1="11" y1="13" x2="17" y2="13"/><polyline points="7 20 4 17 7 14"/>
      <line x1="4" y1="17" x2="10" y2="17"/>
    </svg>
  )
}
function IconFilePlus() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  )
}
function IconImage() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  )
}
function IconActivity() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}
function IconHistory() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 8 12 12 14 14"/>
      <path d="M3.05 11a9 9 0 1 0 .5-4.5L1 4v6h6"/>
    </svg>
  )
}
function IconQr() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="4" y="4" width="5" height="5" fill="currentColor" stroke="none"/>
      <rect x="15" y="4" width="5" height="5" fill="currentColor" stroke="none"/>
      <rect x="4" y="15" width="5" height="5" fill="currentColor" stroke="none"/>
      <line x1="14" y1="14" x2="14" y2="14"/><line x1="17" y1="14" x2="17" y2="14"/>
      <line x1="20" y1="14" x2="20" y2="14"/><line x1="14" y1="17" x2="14" y2="17"/>
      <line x1="20" y1="17" x2="20" y2="17"/><line x1="17" y1="20" x2="17" y2="20"/>
      <line x1="14" y1="20" x2="20" y2="20"/>
    </svg>
  )
}
function IconUser() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}
function IconMenu() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
function IconX() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// ─── Komponen ──────────────────────────────────────────────────────────────────
function LandingPage({ onGoToLogin }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollTo(id) {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="lp-root">
      {/* ── NAVBAR ── */}
      <header className={`lp-navbar${scrolled ? ' lp-navbar--scrolled' : ''}`}>
        <div className="lp-navbar__inner">
          <div className="lp-navbar__brand">
            <span className="lp-navbar__icon"><IconClipboard /></span>
            <span className="lp-navbar__name">LaporPak</span>
          </div>

          {/* Desktop nav */}
          <nav className="lp-navbar__links">
            <button className="lp-nav-link" onClick={() => scrollTo('hero')}>Beranda</button>
            <button className="lp-nav-link" onClick={() => scrollTo('tentang')}>Tentang</button>
            <button className="lp-nav-link" onClick={() => scrollTo('fitur')}>Fitur</button>
            <button className="lp-nav-link" onClick={() => scrollTo('cara-kerja')}>Cara Kerja</button>
            <button className="lp-btn lp-btn--primary lp-btn--sm" onClick={onGoToLogin}>
              <IconShield /> Login Admin / Petugas
            </button>
          </nav>

          {/* Hamburger */}
          <button className="lp-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lp-mobile-menu">
            <button className="lp-nav-link" onClick={() => scrollTo('hero')}>Beranda</button>
            <button className="lp-nav-link" onClick={() => scrollTo('tentang')}>Tentang</button>
            <button className="lp-nav-link" onClick={() => scrollTo('fitur')}>Fitur</button>
            <button className="lp-nav-link" onClick={() => scrollTo('cara-kerja')}>Cara Kerja</button>
            <button className="lp-btn lp-btn--primary lp-btn--full" onClick={() => { setMenuOpen(false); onGoToLogin() }}>
              Login Admin / Petugas
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="lp-hero">
        <div className="lp-container">
          <div className="lp-hero__content">
            <span className="lp-eyebrow">Sistem Pelaporan Fasilitas Kampus</span>
            <h1 className="lp-hero__title">
              Pelaporan Fasilitas Kampus<br />
              <span className="lp-highlight">Lebih Cepat</span> dan Transparan
            </h1>
            <p className="lp-hero__desc">
              LaporPak membantu mahasiswa, dosen, laboran, dan tenaga kependidikan
              melaporkan kerusakan fasilitas kampus serta memantau proses
              penanganannya secara lebih terstruktur.
            </p>
            <p className="lp-hero__sub">Untuk Mahasiswa, Dosen, Laboran, dan Tendik</p>
            <div className="lp-hero__actions">
              <button className="lp-btn lp-btn--primary lp-btn--lg" onClick={() => scrollTo('akses')}>
                <IconQr /> Laporkan Kerusakan
              </button>
              <button className="lp-btn lp-btn--outline lp-btn--lg" onClick={onGoToLogin}>
                Login Admin / Petugas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TENTANG ── */}
      <section id="tentang" className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section__head">
            <h2 className="lp-section__title">Pelaporan Fasilitas Tidak Harus Rumit</h2>
            <p className="lp-section__desc">
              LaporPak membantu proses pelaporan kerusakan fasilitas menjadi lebih
              terstruktur, mudah dipantau, dan transparan.
            </p>
          </div>
          <div className="lp-card-grid lp-card-grid--3">
            <div className="lp-problem-card">
              <span className="lp-problem-card__icon"><IconAlertTriangle /></span>
              <h3>Pelaporan Tidak Terstruktur</h3>
              <p>Laporan kerusakan dapat tersebar sehingga sulit dipantau dan ditindaklanjuti.</p>
            </div>
            <div className="lp-problem-card">
              <span className="lp-problem-card__icon"><IconEyeOff /></span>
              <h3>Status Tidak Jelas</h3>
              <p>Pengguna membutuhkan informasi yang jelas mengenai perkembangan laporan yang telah dikirim.</p>
            </div>
            <div className="lp-problem-card">
              <span className="lp-problem-card__icon"><IconSortDesc /></span>
              <h3>Prioritas Perbaikan</h3>
              <p>Fasilitas dengan kerusakan yang lebih mendesak perlu mendapatkan penanganan yang sesuai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FITUR ── */}
      <section id="fitur" className="lp-section">
        <div className="lp-container">
          <div className="lp-section__head">
            <h2 className="lp-section__title">Fitur Utama LaporPak</h2>
          </div>
          <div className="lp-card-grid lp-card-grid--4">
            {[
              { icon: <IconFilePlus />, title: 'Laporan Kerusakan', desc: 'Laporkan fasilitas yang mengalami kerusakan dengan informasi yang lengkap.' },
              { icon: <IconImage />, title: 'Upload Foto', desc: 'Tambahkan foto untuk memberikan informasi kondisi kerusakan dengan lebih jelas.' },
              { icon: <IconActivity />, title: 'Monitoring Status', desc: 'Pantau perkembangan laporan mulai dari verifikasi hingga proses perbaikan selesai.' },
              { icon: <IconHistory />, title: 'Riwayat Laporan', desc: 'Lihat kembali laporan kerusakan yang pernah dikirim.' },
            ].map((f) => (
              <div className="lp-feature-card" key={f.title}>
                <span className="lp-feature-card__icon">{f.icon}</span>
                <h3 className="lp-feature-card__title">{f.title}</h3>
                <p className="lp-feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARA KERJA ── */}
      <section id="cara-kerja" className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section__head">
            <h2 className="lp-section__title">Cara Kerja LaporPak</h2>
          </div>
          <div className="lp-steps">
            {[
              { n: '1', title: 'Scan QR', desc: 'Pengguna mengakses layanan LaporPak melalui QR Code.' },
              { n: '2', title: 'Buat Laporan', desc: 'Pengguna mengisi lokasi, fasilitas, deskripsi kerusakan, dan foto.' },
              { n: '3', title: 'Verifikasi', desc: 'Admin memeriksa laporan dan menentukan penanganan.' },
              { n: '4', title: 'Perbaikan', desc: 'Petugas teknisi menerima penugasan dan melakukan perbaikan.' },
              { n: '5', title: 'Pantau Status', desc: 'Pengguna dapat memantau perkembangan laporan hingga selesai.' },
            ].map((s, i, arr) => (
              <div className="lp-steps__item" key={s.n}>
                <div className="lp-step-card">
                  <span className="lp-step-card__num">{s.n}</span>
                  <h3 className="lp-step-card__title">{s.title}</h3>
                  <p className="lp-step-card__desc">{s.desc}</p>
                </div>
                {i < arr.length - 1 && <span className="lp-steps__arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AKSES SESUAI PERAN ── */}
      <section id="akses" className="lp-section">
        <div className="lp-container">
          <div className="lp-section__head">
            <h2 className="lp-section__title">Akses Sesuai Peran</h2>
          </div>
          <div className="lp-role-grid">
            {/* Card Pengguna */}
            <div className="lp-role-card lp-role-card--user">
              <div className="lp-role-card__icon"><IconUser /></div>
              <h3 className="lp-role-card__title">Pengguna</h3>
              <ul className="lp-role-card__list">
                <li>Mahasiswa</li><li>Dosen</li><li>Laboran</li><li>Tendik</li>
              </ul>
              <p className="lp-role-card__desc">
                Laporkan kerusakan fasilitas dan pantau perkembangan penanganannya.
              </p>
              <button className="lp-btn lp-btn--primary lp-btn--full">
                <IconQr /> Akses Pengguna
              </button>
            </div>

            {/* Card Admin */}
            <div className="lp-role-card lp-role-card--admin">
              <div className="lp-role-card__icon"><IconShield /></div>
              <h3 className="lp-role-card__title">Admin &amp; Petugas Teknisi</h3>
              <p className="lp-role-card__desc">
                Kelola laporan, penugasan, prioritas, dan progres perbaikan fasilitas.
              </p>
              <button className="lp-btn lp-btn--outline-white lp-btn--full" onClick={onGoToLogin}>
                <IconShield /> Login Admin / Petugas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta">
        <div className="lp-container lp-cta__inner">
          <h2 className="lp-cta__title">Menemukan Fasilitas yang Rusak?</h2>
          <p className="lp-cta__desc">
            Laporkan melalui LaporPak dan bantu menciptakan lingkungan kampus yang lebih nyaman.
          </p>
          <button className="lp-btn lp-btn--white lp-btn--lg" onClick={() => scrollTo('akses')}>
            <IconFilePlus /> Buat Laporan
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer__inner">
          <div className="lp-footer__brand">
            <span className="lp-footer__name"><IconClipboard /> LaporPak</span>
            <p className="lp-footer__tagline">
              Sistem Pelaporan dan Monitoring Perbaikan Fasilitas Kampus
            </p>
          </div>
          <nav className="lp-footer__links">
            <button className="lp-footer-link" onClick={() => scrollTo('hero')}>Beranda</button>
            <button className="lp-footer-link" onClick={() => scrollTo('tentang')}>Tentang</button>
            <button className="lp-footer-link" onClick={() => scrollTo('fitur')}>Fitur</button>
            <button className="lp-footer-link" onClick={() => scrollTo('cara-kerja')}>Cara Kerja</button>
          </nav>
        </div>
        <div className="lp-footer__copy">
          © 2026 LaporPak. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
