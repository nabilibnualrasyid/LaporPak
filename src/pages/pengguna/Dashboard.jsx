import { useNavigate } from 'react-router-dom'

function IconPlusCircle() {
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

function PenggunaDashboard({ laporanPengguna, onLogout }) {
  const navigate = useNavigate()

  const total    = laporanPengguna.length
  const diproses = laporanPengguna.filter(l =>
    l.status === 'Dalam penanganan' || l.status === 'Sedang diperbaiki' || l.status === 'Menunggu penanganan'
  ).length
  const selesai  = laporanPengguna.filter(l => l.status === 'Selesai').length

  const aksesMenu = [
    { icon: <IconPlusCircle />, label: 'Buat Laporan',    to: '/pengguna/laporan',  warna: '#455A64' },
    { icon: <IconActivity />,   label: 'Status Laporan',  to: '/pengguna/status',   warna: '#607D8B' },
    { icon: <IconHistory />,    label: 'Riwayat Laporan', to: '/pengguna/riwayat',  warna: '#455A64' },
  ]

  function labelStatus(status) {
    const s = status?.toLowerCase()
    if (s?.includes('selesai')) return 'selesai'
    if (s?.includes('diperbaiki') || s?.includes('penanganan') || s?.includes('dalam')) return 'proses'
    return 'menunggu'
  }

  return (
    <div className="pg-content">
      {/* Hero card */}
      <div className="pg-welcome">
        <div className="pg-welcome-text">
          <p className="pg-welcome-label">SELAMAT DATANG</p>
          <h2>Halo, Pengguna!</h2>
          <span>
            Selamat datang di LaporPak. Laporkan kerusakan fasilitas kampus
            dan pantau proses penanganannya.
          </span>
        </div>
        <div className="pg-welcome-icon">▤</div>
      </div>

      {/* Statistik */}
      <div className="pg-stat-grid">
        <div className="pg-stat-card">
          <div className="pg-stat-top">
            <span>Total Laporan</span>
            <span className="pg-stat-icon">▤</span>
          </div>
          <strong>{total}</strong>
          <small>Semua laporan Anda</small>
        </div>
        <div className="pg-stat-card">
          <div className="pg-stat-top">
            <span>Sedang Diproses</span>
            <span className="pg-stat-icon">↗</span>
          </div>
          <strong>{diproses}</strong>
          <small>Dalam penanganan</small>
        </div>
        <div className="pg-stat-card">
          <div className="pg-stat-top">
            <span>Selesai</span>
            <span className="pg-stat-icon">✓</span>
          </div>
          <strong>{selesai}</strong>
          <small>Perbaikan selesai</small>
        </div>
      </div>

      {/* Hero CTA */}
      <div className="pg-cta-card">
        <div>
          <h3>Menemukan Fasilitas yang Rusak?</h3>
          <p>Bantu menjaga fasilitas kampus dengan melaporkan kerusakan yang Anda temukan.</p>
        </div>
        <button className="pg-btn-primary" onClick={() => navigate('/pengguna/laporan')}>
          <IconPlusCircle /> Buat Laporan
        </button>
      </div>

      {/* Akses cepat */}
      <div className="pg-panel">
        <div className="pg-panel-heading">
          <h2>Akses Cepat</h2>
        </div>
        <div className="pg-akses-grid">
          {aksesMenu.map((item) => (
            <button
              key={item.label}
              className="pg-akses-card"
              onClick={() => navigate(item.to)}
              style={{ '--akses-warna': item.warna }}
            >
              <span className="pg-akses-icon" style={{ background: item.warna + '18', color: item.warna }}>
                {item.icon}
              </span>
              <span className="pg-akses-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Laporan terbaru */}
      <div className="pg-panel">
        <div className="pg-panel-heading">
          <h2>Laporan Terbaru</h2>
          {laporanPengguna.length > 0 && (
            <button className="pg-btn-link" onClick={() => navigate('/pengguna/riwayat')}>
              Lihat semua →
            </button>
          )}
        </div>

        {laporanPengguna.length === 0 ? (
          <div className="pg-empty">
            <p>Belum ada laporan yang dibuat.</p>
            <button className="pg-btn-primary pg-btn-sm" onClick={() => navigate('/pengguna/laporan')}>
              <IconPlusCircle /> Buat Laporan Pertama
            </button>
          </div>
        ) : (
          <div className="pg-table-wrap">
            <table className="pg-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fasilitas</th>
                  <th>Lokasi</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {laporanPengguna.slice(0, 5).map((lap) => (
                  <tr key={lap.id}>
                    <td><code>{lap.id}</code></td>
                    <td><strong>{lap.fasilitas}</strong></td>
                    <td><small>{lap.lokasi}</small></td>
                    <td><small>{lap.tanggal || '-'}</small></td>
                    <td>
                      <span className={`pg-badge pg-badge--${labelStatus(lap.status)}`}>
                        {lap.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PenggunaDashboard
