import ReportTable from '../../components/admin/ReportTable'

function PrioritasDampak({ laporan, onSelect }) {
  return (
    <ReportTable
      laporan={laporan}
      onSelect={onSelect}
      kolom={['id', 'fasilitas', 'kerusakan', 'dampak', 'prioritas']}
      judul="Prioritas & Dampak"
      deskripsi="Atur tingkat kerusakan, dampak, dan prioritas lewat tombol Detail."
    />
  )
}

export default PrioritasDampak