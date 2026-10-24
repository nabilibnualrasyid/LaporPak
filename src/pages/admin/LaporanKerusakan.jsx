import ReportTable from '../../components/admin/ReportTable'

function LaporanKerusakan({ laporan, onSelect }) {
  return (
    <ReportTable
      laporan={laporan}
      onSelect={onSelect}
      kolom={['id', 'fasilitas', 'kerusakan', 'status']}
      judul="Laporan Kerusakan"
      deskripsi="Semua laporan yang masuk. Pilih Detail untuk menilai laporan."
    />
  )
}

export default LaporanKerusakan