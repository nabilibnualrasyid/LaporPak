
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import './PetugasLayout.css'
import '../AdminDashboard.css'

const menuPetugas = [
  { label: 'Dashboard', icon: '▦', to: '/petugas' },
  { label: 'Daftar Penugasan', icon: '▤', to: '/petugas/penugasan' },
  { label: 'Riwayat Penugasan', icon: '↻', to: '/petugas/riwayat' },
]

function PetugasLayout({ onLogout }) {
  const [menuTerbuka, setMenuTerbuka] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const menuAktif =
  menuPetugas.find((menu) => menu.to === location.pathname)?.label ||
  (location.pathname.startsWith('/petugas/penugasan/')
    ? 'Detail Penugasan'
    : 'Dashboard')

  function handleLogout() {
    setMenuTerbuka(false)
    navigate('/', { replace: true })
    onLogout()
  }

  return (
    <div className="admin-layout">
      {menuTerbuka && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMenuTerbuka(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${menuTerbuka ? 'terbuka' : ''}`}
      >
        <div className="admin-brand">
          <span className="admin-brand-icon">▤</span>
          <div>
            <h2>LaporPak</h2>
            <p>Petugas Teknis</p>
          </div>
        </div>

        <p className="admin-menu-title">MENU UTAMA</p>

        <nav className="admin-nav">
          {menuPetugas.map((menu) => (
            <NavLink
              key={menu.to}
              to={menu.to}
              end={menu.to === '/petugas'}
              onClick={() => setMenuTerbuka(false)}
              className={({ isActive }) =>
                isActive
                  ? 'admin-nav-link active'
                  : 'admin-nav-link'
              }
            >
              <span>{menu.icon}</span>
              {menu.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">P</div>
            <div>
              <strong>Petugas</strong>
              <small>Petugas Teknis</small>
            </div>
          </div>

          <button className="admin-logout" onClick={handleLogout}>
            ↪ Keluar
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              type="button"
              className="admin-menu-toggle"
              aria-label="Buka menu"
              onClick={() => setMenuTerbuka(!menuTerbuka)}
            >
              {menuTerbuka ? '✕' : '☰'}
            </button>

            <div>
              <p className="admin-breadcrumb">
                LaporPak / Petugas
              </p>
              <h1>{menuAktif}</h1>
            </div>
          </div>

          <div className="admin-header-user">
            <div className="admin-avatar">P</div>
            <div>
              <strong>Petugas</strong>
              <small>Petugas Teknis</small>
            </div>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default PetugasLayout
