import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function badgeKelas(status) {
  const s = status?.toLowerCase()
  if (s?.includes('selesai')) return 'pg-badge--selesai'
  if (s?.includes('diperbaiki') || s?.includes('penanganan') || s?.includes('dalam')) return 'pg-badge--proses'
  return 'pg-badge--menunggu'
}

function RiwayatLaporan({ laporanPengguna }) {
  const navigate = useNavigate()
  const [cari, setCari] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua')

  const statusList = ['Semua', 'Menunggu verifikasi', 'Diverifikasi', 'Menunggu penanganan', 'Sedang diperbaiki', 'Selesai']

  const filtered = laporanPengguna.filter(lap => {
    const cocokStatus = filterStatus === 'Semua' || lap.status === filterStatus
    const cocokCari = lap.fasilitas?.toLowerCase().includes(cari.toLowerCase()) ||
                      lap.lokasi?.toLowerCase().includes(cari.toLowerCase()) ||
                      lap.id?.toLowerCase().includes(cari.toLowerCase())
    return cocokStatus && cocokCari
  })

  if (laporanPengguna.length === 0) {
    return (
      <div className="pg-content">
        <div className="pg-panel">
          <div className="pg-empty">
            <p style={{ fontSize: 16, fontWeight: 600, color: '#263238', marginBottom: 6 }}>Belum ada laporan yang dibuat.</p>
            <p style={{ fontSize: 13 }}>Mulai laporkan kerusakan fasilitas kampus yang Anda temukan.</p>
            <button className="pg-btn-dark" style={{ marginTop: 8 }} onClick={() => navigate('/pengguna/laporan')}>
              Buat Laporan Pertama
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pg-content">
      <div className="pg-panel-heading" style={{ marginBottom: 0 }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#263238' }}>Riwayat Laporan</h2>
          <p style={{ margin: 0, fontSize: 13, color: '#546E7A' }}>Semua laporan yang pernah Anda buat</p>
        </div>
        <button className="pg-btn-dark pg-btn-sm" onClick={() => navigate('/pengguna/laporan')}>
          + Buat Laporan
        </button>
      </div>

      {/* Filter */}
      <div className="pg-filter-bar">
        <input
          type="text"
          className="pg-input-search"
          placeholder="Cari ID, nama fasilitas, atau lokasi..."
          value={cari}
          onChange={e => setCari(e.target.value)}
        />
        <select
          className="pg-input-select"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          {statusList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <p style={{ margin: '-4px 0 4px', fontSize: 12, color: '#78909C' }}>
        {filtered.length} laporan ditemukan
      </p>

      {filtered.length === 0 ? (
        <div className="pg-panel">
          <div className="pg-empty"><p>Tidak ada laporan yang cocok dengan filter Anda.</p></div>
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
                {filtered.map(lap => (
                  <tr key={lap.id}>
                    <td><code>{lap.id}</code></td>
                    <td><strong>{lap.fasilitas}</strong></td>
                    <td><small>{lap.lokasi}</small></td>
                    <td><small>{lap.tanggal || '-'}</small></td>
                    <td><span className={`pg-badge ${badgeKelas(lap.status)}`}>{lap.status}</span></td>
                    <td>
                      <button
                        className="pg-btn-outline-sm"
                        onClick={() => navigate('/pengguna/status')}
                      >
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

export default RiwayatLaporan
