
import { Link } from 'react-router-dom'

function RiwayatPenugasan({ laporan }) {
  const riwayat = laporan.filter(
    (item) =>
      item.teknisi?.trim() === 'Petugas Teknis' &&
      item.status === 'Selesai',
  )

  return (
    <section className="petugas-page">
      <div className="petugas-page-heading">
        <div>
          <p className="petugas-eyebrow">RIWAYAT PEKERJAAN</p>
          <h1>Riwayat Penugasan</h1>
          <p>Daftar perbaikan fasilitas yang telah diselesaikan.</p>
        </div>
      </div>

      {riwayat.length === 0 ? (
        <div className="petugas-empty-state">
          <div className="petugas-empty-icon">↻</div>
          <h2>Belum ada riwayat penugasan</h2>
          <p>Penugasan yang sudah selesai akan muncul di sini.</p>
        </div>
      ) : (
        <div className="petugas-report-list">
          {riwayat.map((item) => (
            <article className="petugas-report-card" key={item.id}>
              <div className="petugas-report-header">
                <span className="petugas-report-id">{item.id}</span>
                <span className="petugas-report-status">{item.status}</span>
              </div>

              <h2>{item.fasilitas || item.jenis || 'Fasilitas'}</h2>
              <p className="petugas-report-location">
                {item.lokasi || 'Lokasi belum tersedia'}
              </p>

              <p>
                <strong>Progres:</strong>{' '}
                {item.progres || 'Tidak ada catatan progres.'}
              </p>

              <Link
                to={`/petugas/penugasan/${encodeURIComponent(item.id)}`}
                className="petugas-detail-link"
              >
                Lihat Detail →
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default RiwayatPenugasan
