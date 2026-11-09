import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URUTAN_STATUS = [
  'Menunggu verifikasi',
  'Diverifikasi',
  'Menunggu penanganan',
  'Sedang diperbaiki',
  'Selesai',
]

function indexStatus(status) {
  const s = status?.toLowerCase()
  if (s?.includes('selesai')) return 4
  if (s?.includes('diperbaiki') || s?.includes('penanganan') || s?.includes('dalam')) return 3
  if (s?.includes('menunggu penanganan')) return 2
  if (s?.includes('diverifikasi') || s?.includes('verifikasi') && !s?.includes('menunggu')) return 1
  return 0
}

function badgeKelas(status) {
  const s = status?.toLowerCase()
  if (s?.includes('selesai')) return 'pg-badge--selesai'
  if (s?.includes('diperbaiki') || s?.includes('penanganan') || s?.includes('dalam')) return 'pg-badge--proses'
  return 'pg-badge--menunggu'
}

function Timeline({ statusSaat }) {
  const idx = indexStatus(statusSaat)
  return (
    <div className="pg-timeline">
      {URUTAN_STATUS.map((s, i) => (
        <div key={s} className={`pg-timeline-item ${i <= idx ? 'pg-timeline-item--done' : ''} ${i === idx ? 'pg-timeline-item--active' : ''}`}>
          <div className="pg-timeline-dot">{i < idx ? '✓' : i + 1}</div>
          <div className="pg-timeline-label">{s}</div>
          {i < URUTAN_STATUS.length - 1 && <div className="pg-timeline-line" />}
        </div>
      ))}
    </div>
  )
}

function StatusLaporan({ laporanPengguna }) {
  const navigate = useNavigate()
  const [dipilih, setDipilih] = useState(null)

  if (dipilih) {
    const lap = laporanPengguna.find(l => l.id === dipilih)
    if (!lap) { setDipilih(null); return null }
    return (
      <div className="pg-content">
        <button className="pg-btn-link" style={{ marginBottom: 8 }} onClick={() => setDipilih(null)}>
          ← Kembali ke daftar
        </button>
        <div className="pg-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: '#546E7A' }}>ID Laporan</p>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#263238', fontFamily: 'monospace' }}>{lap.id}</h2>
            </div>
            <span className={`pg-badge ${badgeKelas(lap.status)}`}>{lap.status}</span>
          </div>

          <div className="pg-konfirmasi-grid" style={{ marginBottom: 24 }}>
            <div className="pg-konfirmasi-row"><span>Fasilitas</span><strong>{lap.fasilitas}</strong></div>
            <div className="pg-konfirmasi-row"><span>Lokasi</span><strong>{lap.lokasi}</strong></div>
            <div className="pg-konfirmasi-row"><span>Tanggal Laporan</span><strong>{lap.tanggal || '-'}</strong></div>
            {lap.deskripsi && <div className="pg-konfirmasi-row"><span>Deskripsi</span><strong>{lap.deskripsi}</strong></div>}
          </div>

          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#263238' }}>Progress Penanganan</h3>
          <Timeline statusSaat={lap.status} />

          {lap.fotoPreview && (
            <div style={{ marginTop: 20 }}>
              <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#546E7A' }}>Foto Kerusakan</p>
              <img src={lap.fotoPreview} alt="foto" style={{ maxWidth: 280, borderRadius: 10, border: '1px solid #DDE5EB' }} />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="pg-content">
      <div className="pg-panel-heading" style={{ marginBottom: 0 }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#263238' }}>Status Laporan</h2>
          <p style={{ margin: 0, fontSize: 13, color: '#546E7A' }}>Pantau perkembangan laporan yang Anda kirim</p>
        </div>
      </div>

      {laporanPengguna.length === 0 ? (
        <div className="pg-panel">
          <div className="pg-empty">
            <p>Belum ada laporan yang dibuat.</p>
            <button className="pg-btn-dark pg-btn-sm" onClick={() => navigate('/pengguna/laporan')}>
              Buat Laporan Pertama
            </button>
          </div>
        </div>
      ) : (
        <div className="pg-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="pg-table-wrap">
            <table className="pg-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fasilitas</th>
                  <th>Lokasi</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {laporanPengguna.map(lap => (
                  <tr key={lap.id}>
                    <td><code>{lap.id}</code></td>
                    <td><strong>{lap.fasilitas}</strong></td>
                    <td><small>{lap.lokasi}</small></td>
                    <td><small>{lap.tanggal || '-'}</small></td>
                    <td><span className={`pg-badge ${badgeKelas(lap.status)}`}>{lap.status}</span></td>
                    <td>
                      <button className="pg-btn-outline-sm" onClick={() => setDipilih(lap.id)}>
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusLaporan
