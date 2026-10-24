
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function DetailPenugasan({ laporan, setLaporan }) {
  const { id } = useParams()

  const item = laporan.find(
    (data) => String(data.id) === decodeURIComponent(id),
  )

  const [progres, setProgres] = useState(item?.progres || '')
  const [status, setStatus] = useState(item?.status || 'Dalam penanganan')
  const [fotoBukti, setFotoBukti] = useState(item?.fotoBukti || '')
  const [pesan, setPesan] = useState('')

  if (!item) {
    return (
      <section className="petugas-page">
        <h2>Laporan tidak ditemukan</h2>
        <Link to="/petugas/penugasan">Kembali ke Daftar Penugasan</Link>
      </section>
    )
  }

  function mulaiPerbaikan() {
    const statusBaru = 'Dalam perbaikan'
    setStatus(statusBaru)

    setLaporan((sebelumnya) =>
      sebelumnya.map((data) =>
        data.id === item.id
          ? { ...data, status: statusBaru }
          : data,
      ),
    )

    setPesan('Perbaikan dimulai.')
  }

  function pilihFoto(e) {
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPesan('File harus berupa gambar.')
      e.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setPesan('Ukuran foto maksimal 2 MB.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setFotoBukti(reader.result)
      setPesan('')
    }

    reader.readAsDataURL(file)
  }

  function simpanPerbaikan(e) {
    e.preventDefault()

    setLaporan((sebelumnya) =>
      sebelumnya.map((data) =>
        data.id === item.id
          ? {
              ...data,
              progres,
              status,
              fotoBukti,
            }
          : data,
      ),
    )

    setPesan('Perubahan perbaikan berhasil disimpan.')
  }

  return (
    <section className="petugas-page">
      <div className="petugas-page-heading">
        <div>
          <p className="petugas-eyebrow">DETAIL PEKERJAAN</p>
          <h1>{item.fasilitas || item.jenis || 'Detail Laporan'}</h1>
          <p>Informasi dan pembaruan penanganan kerusakan.</p>
        </div>
      </div>

      <article className="petugas-report-card">
        <div className="petugas-report-header">
          <span className="petugas-report-id">{item.id}</span>
          <span className="petugas-report-priority">
            Prioritas {item.prioritas || 'Belum ditentukan'}
          </span>
        </div>

        <div className="petugas-report-info">
          <div>
            <span>Fasilitas</span>
            <strong>{item.fasilitas || item.jenis || '-'}</strong>
          </div>
          <div>
            <span>Lokasi</span>
            <strong>{item.lokasi || '-'}</strong>
          </div>
          <div>
            <span>Kerusakan</span>
            <strong>{item.kerusakan || '-'}</strong>
          </div>
          <div>
            <span>Dampak</span>
            <strong>{item.dampak || '-'}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{status}</strong>
          </div>
        </div>

        <h2>Deskripsi Kerusakan</h2>
        <p>{item.deskripsi || 'Deskripsi tidak tersedia.'}</p>

        {item.foto && (
          <div style={{ marginTop: 16 }}>
            <h2>Foto Kerusakan</h2>
            <img
              src={item.foto}
              alt="Foto kerusakan"
              style={{ maxWidth: '100%', maxHeight: 250, marginTop: 8 }}
            />
          </div>
        )}
      </article>

      <form
  className="petugas-report-card petugas-repair-form"
  onSubmit={simpanPerbaikan}
  style={{ marginTop: 20 }}
>
        <h2>Penanganan Perbaikan</h2>

        <button type="button" onClick={mulaiPerbaikan}>
          Mulai Perbaikan
        </button>

        <label style={{ display: 'block', marginTop: 16 }}>
          Progres Perbaikan
          <textarea
            value={progres}
            onChange={(e) => setProgres(e.target.value)}
            placeholder="Tuliskan progres perbaikan..."
            rows={4}
            style={{ display: 'block', width: '100%', marginTop: 8 }}
          />
        </label>

        <label style={{ display: 'block', marginTop: 16 }}>
          Status Penanganan
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ display: 'block', marginTop: 8 }}
          >
            <option value="Dalam penanganan">Dalam penanganan</option>
            <option value="Dalam perbaikan">Dalam perbaikan</option>
            <option value="Selesai">Selesai</option>
          </select>
        </label>

        <label style={{ display: 'block', marginTop: 16 }}>
          Foto Bukti Hasil Perbaikan (maksimal 2 MB)
          <input
            type="file"
            accept="image/*"
            onChange={pilihFoto}
            style={{ display: 'block', marginTop: 8 }}
          />
        </label>

        {fotoBukti && (
          <img
            src={fotoBukti}
            alt="Bukti hasil perbaikan"
            style={{ display: 'block', maxWidth: '100%', maxHeight: 250, marginTop: 12 }}
          />
        )}

        <button type="submit" style={{ marginTop: 20 }}>
          Simpan Perubahan
        </button>

        {pesan && <p role="status">{pesan}</p>}
      </form>

      <div style={{ marginTop: 20 }}>
        <Link to="/petugas/penugasan" className="petugas-detail-link">
          ← Kembali ke Daftar Penugasan
        </Link>
      </div>
    </section>
  )
}

export default DetailPenugasan
