import ReportTable from '../../components/admin/ReportTable'

function ProgresPerbaikan({ laporan, onSelect }) {
  const data = laporan.filter((item) => item.status === 'Dalam penanganan')

  return (
    <ReportTable
      laporan={data}
      onSelect={onSelect}
      kolom={['id', 'fasilitas', 'teknisi', 'status']}
      judul="Progres Perbaikan"
      deskripsi="Laporan yang sedang dalam penanganan."
    />
  )
}

export default ProgresPerbaikan