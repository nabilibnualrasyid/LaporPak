import ReportTable from '../../components/admin/ReportTable'

function PenugasanTeknisi({ laporan, onSelect }) {
  const data = laporan.filter((item) => item.status !== 'Menunggu verifikasi')

  return (
    <ReportTable
      laporan={data}
      onSelect={onSelect}
      kolom={['id', 'fasilitas', 'prioritas', 'teknisi', 'status']}
      judul="Penugasan Teknisi"
      deskripsi="Laporan yang sudah masuk tahap penanganan teknisi."
    />
  )
}

export default PenugasanTeknisi