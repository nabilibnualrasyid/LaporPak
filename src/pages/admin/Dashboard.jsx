import StatCard from '../../components/admin/StatCard'
import ReportTable from '../../components/admin/ReportTable'

function Dashboard({ laporan, onSelect, nama }) {
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
    <>
      <div className="admin-welcome">
        <div>
          <p>HALO, {nama.toUpperCase()}</p>
          <h2>Ringkasan Laporan Fasilitas</h2>
          <span>Pantau laporan dan proses perbaikan fasilitas kampus.</span>
        </div>
        <div className="welcome-icon">▤</div>
      </div>

      <div className="admin-stat-grid">
        <StatCard
          title="Total Laporan"
          value={jumlah}
          icon="▤"
          note="Seluruh laporan masuk"
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
  onSelect={onSelect}
  limit={3}
  judul="Laporan Masuk"
  deskripsi="Cuplikan tiga laporan pertama. Lihat selengkapnya di menu Laporan Kerusakan."
/>
    </>
  )
}

export default Dashboard