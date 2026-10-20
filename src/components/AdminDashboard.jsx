
import { useState } from 'react'
import './AdminDashboard.css'

const menuAdmin = [
  { label: 'Dashboard', icon: '▦' },
  { label: 'Laporan Kerusakan', icon: '▤' },
  { label: 'Prioritas & Dampak', icon: '⚑' },
  { label: 'Penugasan Teknisi', icon: '♙' },
  { label: 'Progres Perbaikan', icon: '↗' },
  { label: 'Rekapitulasi', icon: '▥' },
]

const laporanContoh = [
  {
    id: 'LP-001',
    fasilitas: 'Lampu ruang kelas',
    lokasi: 'Gedung A - Ruang 201',
    kerusakan: 'Sedang',
    dampak: 'Kegiatan belajar',
    prioritas: 'Menengah',
    status: 'Menunggu verifikasi',
  },
  {
    id: 'LP-002',
    fasilitas: 'Kursi mahasiswa',
    lokasi: 'Gedung B - Ruang 105',
    kerusakan: 'Ringan',
    dampak: 'Kenyamanan',
    prioritas: 'Rendah',
    status: 'Menunggu verifikasi',
  },
  {
    id: 'LP-003',
    fasilitas: 'AC ruang laboratorium',
    lokasi: 'Gedung C - Lab Komputer',
    kerusakan: 'Berat',
    dampak: 'Praktikum',
    prioritas: 'Tinggi',
    status: 'Dalam penanganan',
  },
]

function AdminDashboard({ onLogout }) {
  const [menuAktif, setMenuAktif] = useState('Dashboard')

  const [laporan, setLaporan] = useState(laporanContoh)

  const [pilihanLaporan, setPilihanLaporan] = useState(null)

  const [form, setForm] = useState({
    kerusakan: 'Sedang',
    dampak: 'Kegiatan belajar',
    prioritas: 'Menengah',
    teknisi: '',
  })

  function bukaLaporan(item) {
    setPilihanLaporan(item)
    setForm({
      kerusakan: item.kerusakan,
      dampak: item.dampak,
      prioritas: item.prioritas,
      teknisi: item.teknisi || '',
    })
  }

  function simpanPenilaian(e) {
    e.preventDefault()

    setLaporan((sebelumnya) =>
      sebelumnya.map((item) =>
        item.id === pilihanLaporan.id
          ? { ...item, ...form }
          : item
      )
    )

    setPilihanLaporan(null)
  }

  const jumlah = laporan.length
  const menunggu = laporan.filter(
    (item) => item.status === 'Menunggu verifikasi'
  ).length
  const ditangani = laporan.filter(
    (item) => item.status === 'Dalam penanganan'
  ).length
  const prioritasTinggi = laporan.filter(
    (item) => item.prioritas === 'Tinggi'
  ).length

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
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
            <button
              key={menu.label}
              className={`admin-nav-link ${
                menuAktif === menu.label ? 'active' : ''
              }`}
              onClick={() => {
                setMenuAktif(menu.label)
                setPilihanLaporan(null)
              }}
            >
              <span>{menu.icon}</span>
              {menu.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>

          <button className="admin-logout" onClick={onLogout}>
            ↪ Keluar
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-breadcrumb">LaporPak / Admin</p>
            <h1>{menuAktif}</h1>
          </div>

          <div className="admin-header-user">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Admin</strong>
              <small>Pengelola fasilitas</small>
            </div>
          </div>
        </header>

        <section className="admin-content">
          {menuAktif === 'Dashboard' && (
            <>
              <div className="admin-welcome">
                <div>
                  <p>HALO, ADMIN</p>
                  <h2>Ringkasan Laporan Fasilitas</h2>
                  <span>
                    Pantau laporan dan proses perbaikan fasilitas kampus.
                  </span>
                </div>
                <div className="welcome-icon">▤</div>
              </div>

              <div className="admin-stat-grid">
                <StatCard
                  title="Total Laporan"
                  value={jumlah}
                  icon="▤"
                  note="Laporan contoh"
                />
                <StatCard
                  title="Menunggu Verifikasi"
                  value={menunggu}
                  icon="◷"
                  note="Perlu diperiksa"
                />
                <StatCard
                  title="Dalam Penanganan"
                  value={ditangani}
                  icon="⚒"
                  note="Sedang diperbaiki"
                />
                <StatCard
                  title="Prioritas Tinggi"
                  value={prioritasTinggi}
                  icon="⚑"
                  note="Perlu perhatian"
                />
              </div>

              <ReportTable
                laporan={laporan}
                onSelect={bukaLaporan}
                limit={3}
              />
            </>
          )}

          {menuAktif !== 'Dashboard' && (
            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>{menuAktif}</h2>
                  <p>
                    Pilih laporan untuk melihat dan mengelola informasinya.
                  </p>
                </div>
              </div>

              {menuAktif === 'Rekapitulasi' ? (
                <div className="admin-stat-grid">
                  <StatCard title="Total Laporan" value={jumlah} icon="▤" />
                  <StatCard title="Menunggu Verifikasi" value={menunggu} icon="◷" />
                  <StatCard title="Dalam Penanganan" value={ditangani} icon="⚒" />
                  <StatCard title="Prioritas Tinggi" value={prioritasTinggi} icon="⚑" />
                </div>
              ) : (
                <ReportTable
                  laporan={
                    menuAktif === 'Laporan Kerusakan'
                      ? laporan
                      : menuAktif === 'Prioritas & Dampak'
                        ? laporan
                        : menuAktif === 'Penugasan Teknisi'
                          ? laporan.filter((item) => item.status !== 'Menunggu verifikasi')
                          : laporan.filter((item) => item.status === 'Dalam penanganan')
                  }
                  onSelect={bukaLaporan}
                />
              )}
            </section>
          )}

          {pilihanLaporan && (
            <div className="admin-modal-backdrop">
              <form className="admin-modal" onSubmit={simpanPenilaian}>
                <div className="admin-modal-heading">
                  <div>
                    <p>{pilihanLaporan.id}</p>
                    <h2>Detail Laporan</h2>
                  </div>
                  <button
                    type="button"
                    className="admin-close"
                    onClick={() => setPilihanLaporan(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="admin-detail-box">
                  <strong>{pilihanLaporan.fasilitas}</strong>
                  <span>{pilihanLaporan.lokasi}</span>
                  <small>Status: {pilihanLaporan.status}</small>
                </div>

                <label>
                  Tingkat Kerusakan
                  <select
                    value={form.kerusakan}
                    onChange={(e) =>
                      setForm({ ...form, kerusakan: e.target.value })
                    }
                  >
                    <option>Ringan</option>
                    <option>Sedang</option>
                    <option>Berat</option>
                  </select>
                </label>

                <label>
                  Dampak Kerusakan
                  <select
                    value={form.dampak}
                    onChange={(e) =>
                      setForm({ ...form, dampak: e.target.value })
                    }
                  >
                    <option>Kenyamanan</option>
                    <option>Kegiatan belajar</option>
                    <option>Praktikum</option>
                    <option>Keselamatan</option>
                  </select>
                </label>

                <label>
                  Prioritas Penanganan
                  <select
                    value={form.prioritas}
                    onChange={(e) =>
                      setForm({ ...form, prioritas: e.target.value })
                    }
                  >
                    <option>Rendah</option>
                    <option>Menengah</option>
                    <option>Tinggi</option>
                  </select>
                </label>

                <label>
                  Petugas Teknisi
                  <input
                    value={form.teknisi}
                    onChange={(e) =>
                      setForm({ ...form, teknisi: e.target.value })
                    }
                    placeholder="Nama petugas teknis"
                  />
                </label>

                <div className="admin-modal-actions">
                  <button
                    type="button"
                    className="admin-button-secondary"
                    onClick={() => setPilihanLaporan(null)}
                  >
                    Batal
                  </button>
                  <button className="admin-button-primary" type="submit">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon, note }) {
  return (
    <article className="admin-stat-card">
      <div className="admin-stat-top">
        <span>{title}</span>
        <span className="admin-stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{note || 'Ringkasan laporan'}</small>
    </article>
  )
}

function ReportTable({ laporan, onSelect, limit }) {
  const data = limit ? laporan.slice(0, limit) : laporan

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Daftar Laporan Kerusakan</h2>
          <p>Data contoh untuk rancangan awal dashboard.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Laporan</th>
              <th>Fasilitas / Lokasi</th>
              <th>Kerusakan</th>
              <th>Prioritas</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <strong>{item.fasilitas}</strong>
                  <small>{item.lokasi}</small>
                </td>
                <td>{item.kerusakan}</td>
                <td>
                  <span className={`admin-priority priority-${item.prioritas.toLowerCase()}`}>
                    {item.prioritas}
                  </span>
                </td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="admin-detail-button"
                    onClick={() => onSelect(item)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="admin-empty">
                  Belum ada laporan pada bagian ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminDashboard
