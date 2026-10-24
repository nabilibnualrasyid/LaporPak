
import { useState } from 'react'

const semuaKolom = {
  id: {
    judul: 'ID Laporan',
    isi: (item) => item.id,
  },
  fasilitas: {
    judul: 'Fasilitas / Lokasi',
    isi: (item) => (
      <>
        <strong>{item.fasilitas}</strong>
        <small>{item.lokasi}</small>
      </>
    ),
  },
  kerusakan: {
    judul: 'Kerusakan',
    isi: (item) => item.kerusakan,
  },
  dampak: {
    judul: 'Dampak',
    isi: (item) => item.dampak,
  },
  prioritas: {
    judul: 'Prioritas',
    isi: (item) => (
      <span
        className={`admin-priority priority-${item.prioritas.toLowerCase()}`}
      >
        {item.prioritas}
      </span>
    ),
  },
  teknisi: {
    judul: 'Petugas Teknisi',
    isi: (item) => item.teknisi || 'Belum ditugaskan',
  },
  status: {
    judul: 'Status',
    isi: (item) => item.status,
  },
}

function ReportTable({
  laporan,
  onSelect,
  limit,
  kolom = ['id', 'fasilitas', 'kerusakan', 'prioritas', 'status'],
  judul = 'Daftar Laporan Kerusakan',
  deskripsi = 'Cari laporan atau pilih status untuk mempersempit data.',
}) {
  const [pencarian, setPencarian] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua')

  const laporanTerfilter = laporan.filter((item) => {
    const kataKunci = pencarian.toLowerCase()

    const cocokPencarian = [
      item.id,
      item.fasilitas,
      item.lokasi,
      item.kerusakan,
      item.dampak,
      item.prioritas,
      item.teknisi || '',
      item.status,
    ].some((nilai) =>
      String(nilai).toLowerCase().includes(kataKunci)
    )

    const cocokStatus =
      filterStatus === 'Semua' || item.status === filterStatus

    return cocokPencarian && cocokStatus
  })

  const data = limit
    ? laporanTerfilter.slice(0, limit)
    : laporanTerfilter

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>{judul}</h2>
<p>{deskripsi}</p>
        </div>
      </div>

      <div className="admin-table-filters">
        <input
          type="text"
          placeholder="Cari ID, fasilitas, lokasi, atau teknisi..."
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          aria-label="Cari laporan"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          aria-label="Filter status laporan"
        >
          <option value="Semua">Semua Status</option>
          <option value="Menunggu verifikasi">
            Menunggu verifikasi
          </option>
          <option value="Dalam penanganan">
            Dalam penanganan
          </option>
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {kolom.map((nama) => (
                <th key={nama}>{semuaKolom[nama].judul}</th>
              ))}
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {kolom.map((nama) => (
                  <td key={nama}>{semuaKolom[nama].isi(item)}</td>
                ))}
                <td>
                  <button
                    className="admin-detail-button"
                    type="button"
                    onClick={() => onSelect(item)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={kolom.length + 1}
                  className="admin-empty"
                >
                  Tidak ada laporan yang sesuai dengan pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ReportTable
