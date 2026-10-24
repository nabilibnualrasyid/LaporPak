
import { Link } from 'react-router-dom'

function DaftarPenugasan({ laporan }) {
  const penugasanSaya = laporan.filter(
    (item) => item.teknisi?.trim() === 'Petugas Teknis',
  )

  return (
    <section className="petugas-page">
      <div className="petugas-page-heading">
        <div>
          <p className="petugas-eyebrow">PEKERJAAN</p>
          <h1>Daftar Penugasan</h1>
          <p>Laporan fasilitas yang ditugaskan kepada Anda.</p>
        </div>
      </div>

      {penugasanSaya.length === 0 ? (
        <div className="petugas-empty-state">
          <div className="petugas-empty-icon">▤</div>
          <h2>Belum ada penugasan</h2>
          <p>
            Laporan akan muncul setelah admin menetapkan
            petugas untuk menangani perbaikan.
          </p>
        </div>
      ) : (
        <div className="petugas-report-list">
          {penugasanSaya.map((item) => (
            <article className="petugas-report-card" key={item.id}>
              <div className="petugas-report-header">
                <span className="petugas-report-id">{item.id}</span>
                <span className="petugas-report-priority">
                  Prioritas {item.prioritas || 'Belum ditentukan'}
                </span>
              </div>

              <h2>{item.fasilitas || item.jenis || 'Fasilitas'}</h2>
              <p className="petugas-report-location">
                {item.lokasi || 'Lokasi belum tersedia'}
              </p>

              <div className="petugas-report-info">
                <div>
                  <span>Tingkat Kerusakan</span>
                  <strong>{item.kerusakan || 'Belum ditentukan'}</strong>
                </div>
                <div>
                  <span>Dampak</span>
                  <strong>{item.dampak || 'Belum ditentukan'}</strong>
                </div>
              </div>

              <div className="petugas-report-footer">
                <span className="petugas-report-status">
                  {item.status || 'Belum ada status'}
                </span>

                <Link
                  to={`/petugas/penugasan/${encodeURIComponent(item.id)}`}
                  className="petugas-detail-link"
                >
                  Lihat Detail →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default DaftarPenugasan
