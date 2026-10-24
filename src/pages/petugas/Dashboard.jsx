import { Link } from 'react-router-dom'

function Dashboard({ laporan }) {
  const penugasanSaya = laporan.filter(
    (item) => item.teknisi?.trim() === 'Petugas Teknis',
  )

  const selesai = penugasanSaya.filter(
    (item) => item.status === 'Selesai',
  ).length

  const berjalan = penugasanSaya.filter(
    (item) =>
      item.status === 'Dalam penanganan' ||
      item.status === 'Dalam perbaikan',
  ).length

  const terbaru = [...penugasanSaya].slice(-3).reverse()

  return (
    <section className="petugas-page">
      <div className="petugas-page-heading">
        <div>
          <p className="petugas-eyebrow">DASHBOARD</p>
          <h1>Dashboard Petugas</h1>
          <p>Ringkasan penugasan perbaikan fasilitas kampus.</p>
        </div>
      </div>
      

      <div className="petugas-stats">
        <div className="petugas-stat-card">
          <span>Total Penugasan</span>
          <strong>{penugasanSaya.length}</strong>
        </div>

        

        <div className="petugas-stat-card">
          <span>Dalam Penanganan</span>
          <strong>{berjalan}</strong>
        </div>

        <div className="petugas-stat-card">
          <span>Selesai</span>
          <strong>{selesai}</strong>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
  <Link
    to="/petugas/penugasan"
    className="petugas-detail-link"
  >
    Lihat Semua Penugasan →
  </Link>
</div>

      <div className="petugas-section-heading">
        <div>
          <h2>Penugasan Terbaru</h2>
          <p>Laporan yang ditugaskan kepada petugas.</p>
        </div>
      </div>

      {terbaru.length === 0 ? (
        <div className="petugas-empty-state">
          <div className="petugas-empty-icon">▤</div>
          <h2>Belum ada penugasan</h2>
          <p>Penugasan dari admin akan muncul di bagian ini.</p>
        </div>
      ) : (
        <div className="petugas-report-list">
          {terbaru.map((item) => (
            <article className="petugas-report-card" key={item.id}>
              <div className="petugas-report-header">
                <span className="petugas-report-id">{item.id}</span>
                <span className="petugas-report-priority">
                  {item.prioritas || 'Prioritas belum ditentukan'}
                </span>
              </div>

              <h2>{item.fasilitas || item.jenis || 'Fasilitas'}</h2>
              <p className="petugas-report-location">{item.lokasi}</p>

              <div className="petugas-report-footer">
                <span className="petugas-report-status">
                  {item.status || 'Belum ada status'}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Dashboard
