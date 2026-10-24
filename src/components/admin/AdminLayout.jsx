import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import DetailModal from './DetailModal'
import '../AdminDashboard.css'

const menuAdmin = [
  { label: 'Dashboard', icon: '▦', to: '/admin' },
  { label: 'Laporan Kerusakan', icon: '▤', to: '/admin/laporan' },
  { label: 'Prioritas & Dampak', icon: '⚑', to: '/admin/prioritas' },
  { label: 'Penugasan Teknisi', icon: '♙', to: '/admin/penugasan' },
  { label: 'Progres Perbaikan', icon: '↗', to: '/admin/progres' },
  { label: 'Rekapitulasi', icon: '▥', to: '/admin/rekapitulasi' },
]

function AdminLayout({
  onLogout,
  profil,
  pilihanLaporan,
  form,
  setForm,
  errors,
  onSimpan,
  onTutup,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuTerbuka, setMenuTerbuka] = useState(false)

  const menuAktif =
    menuAdmin.find((menu) => menu.to === location.pathname)?.label || 'Dashboard'

  function handleLogout() {
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

      <aside className={`admin-sidebar ${menuTerbuka ? 'terbuka' : ''}`}>
        <div className="admin-brand">
          <span className="admin-brand-icon">▤</span>
          <div>
            <h2>LaporPak</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <p className="admin-menu-title">MENU UTAMA</p>

        <nav className="admin-nav">
          {menuAdmin.map((menu) => (
            <NavLink
              key={menu.to}
              to={menu.to}
              end={menu.to === '/admin'}
              onClick={() => setMenuTerbuka(false)}
              className={({ isActive }) =>
                isActive ? 'admin-nav-link active' : 'admin-nav-link'
              }
            >
              <span>{menu.icon}</span>
              {menu.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">

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
              <p className="admin-breadcrumb">LaporPak / Admin</p>
              <h1>{menuAktif}</h1>
            </div>
          </div>
          

          <div className="admin-header-user">
            <div className="admin-avatar">{profil.nama.charAt(0)}</div>
            <div>
              <strong>{profil.nama}</strong>
              <small>{profil.jabatan}</small>
            </div>
          </div>
        </header>
          

          <section className="admin-content">
            <Outlet />

            <DetailModal
              pilihanLaporan={pilihanLaporan}
              form={form}
              setForm={setForm}
              errors={errors}
              onSimpan={onSimpan}
              onTutup={onTutup}
            />
          </section>
      </main>
    </div>
  )
}

export default AdminLayout