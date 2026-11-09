import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './PenggunaLayout.css'

// ─── Icons ───────────────────────────────────────────
function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}
function IconActivity() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}
function IconHistory() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 0 .5-4.5L1 4v6h6" />
    </svg>
  )
}
function IconLogout() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
// ──────────────────────────────────────────────────────

const menuPengguna = [
  { label: 'Beranda',         icon: <IconHome />,     to: '/pengguna',         end: true },
  { label: 'Buat Laporan',    icon: <IconPlus />,     to: '/pengguna/laporan', end: false },
  { label: 'Status Laporan',  icon: <IconActivity />, to: '/pengguna/status',  end: false },
  { label: 'Riwayat Laporan', icon: <IconHistory />,  to: '/pengguna/riwayat', end: false },
]

function PenggunaLayout({ onLogout }) {
  const [menuTerbuka, setMenuTerbuka] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const judulHalaman =
    menuPengguna.find(m =>
      m.end
        ? location.pathname === m.to
        : location.pathname.startsWith(m.to)
    )?.label || 'Beranda'

  function handleLogout() {
    setMenuTerbuka(false)
    navigate('/', { replace: true })
    onLogout()
  }

  return (
    <div className="pg-layout">
      {/* Overlay mobile */}
      {menuTerbuka && (
        <div className="pg-overlay" onClick={() => setMenuTerbuka(false)} />
      )}

      {/* Sidebar */}
      <aside className={`pg-sidebar ${menuTerbuka ? 'pg-sidebar--open' : ''}`}>
        <div className="pg-brand">
          <span className="pg-brand-icon">LP</span>
          <div>
            <h2>LaporPak</h2>
            <p>Portal Pengguna</p>
          </div>
        </div>

        <p className="pg-menu-label">MENU UTAMA</p>

        <nav className="pg-nav">
          {menuPengguna.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuTerbuka(false)}
              className={({ isActive }) =>
                isActive ? 'pg-nav-link pg-nav-link--active' : 'pg-nav-link'
              }
            >
              <span className="pg-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="pg-sidebar-bottom">
          <div className="pg-user-info">
            <div className="pg-avatar">P</div>
            <div>
              <strong>Pengguna</strong>
              <small>Pengguna LaporPak</small>
            </div>
          </div>
          <button className="pg-logout-btn" onClick={handleLogout}>
            <IconLogout /> Keluar
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="pg-main">
        {/* Header */}
        <header className="pg-header">
          <div className="pg-header-left">
            <button
              type="button"
              className="pg-toggle-btn"
              aria-label="Buka menu"
              onClick={() => setMenuTerbuka(!menuTerbuka)}
            >
              {menuTerbuka ? '✕' : '☰'}
            </button>
            <div>
              <p className="pg-breadcrumb">LaporPak / Pengguna</p>
              <h1>{judulHalaman}</h1>
            </div>
          </div>

          <div className="pg-header-right">
            <button className="pg-notif-btn" aria-label="Notifikasi">
              <IconBell />
            </button>
            <div className="pg-header-user">
              <div className="pg-avatar">P</div>
              <div className="pg-header-user-info">
                <strong>Pengguna</strong>
                <small>Pengguna LaporPak</small>
              </div>
            </div>
            <button className="pg-header-logout" onClick={handleLogout}>
              <IconLogout /> Keluar
            </button>
          </div>
        </header>

        {/* Page content */}
        <section className="pg-page">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default PenggunaLayout
