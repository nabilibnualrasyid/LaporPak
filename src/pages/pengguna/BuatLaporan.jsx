import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const LOKASI_OPTIONS = [
  'Gedung A', 'Gedung B', 'Gedung C', 'Gedung Utama',
  'Gedung Laboratorium', 'Gedung Perpustakaan', 'Gedung Rektorat',
  'Area Parkir', 'Kantin', 'Lapangan', 'Aula',
]

const JENIS_OPTIONS = [
  'AC', 'Komputer', 'Proyektor', 'Lampu', 'Meja', 'Kursi',
  'Toilet', 'Pintu', 'Jaringan Internet', 'Lainnya',
]

const KATEGORI_PELAPOR = [
  { value: 'Mahasiswa',                   namaLabel: 'Nama Mahasiswa',                  namaPlaceholder: 'Masukkan nama lengkap mahasiswa', nomorLabel: 'NIM',                        nomorPlaceholder: 'Masukkan NIM' },
  { value: 'Dosen',                        namaLabel: 'Nama Dosen',                       namaPlaceholder: 'Masukkan nama lengkap dosen',      nomorLabel: 'NIP',                        nomorPlaceholder: 'Masukkan NIP' },
  { value: 'Tenaga Kependidikan (Tendik)', namaLabel: 'Nama Tendik',                      namaPlaceholder: 'Masukkan nama lengkap tendik',     nororLabel: 'NIP/Nomor Induk Pegawai',    nomorPlaceholder: 'Masukkan nomor induk pegawai' },
]

// Kembalikan config label/placeholder berdasarkan kategori yang dipilih
function konfKategori(kategori) {
  return KATEGORI_PELAPOR.find(k => k.value === kategori) || null
}

// Field wajib untuk detail kerusakan (tidak termasuk identitas karena divalidasi terpisah)
const FIELD_WAJIB_KERUSAKAN = ['lokasi', 'detailLokasi', 'jenisFasilitas', 'namaFasilitas', 'deskripsi']

function buatId() {
  const now = new Date()
  const tgl = now.toISOString().slice(2, 10).replace(/-/g, '')
  const acak = Math.floor(Math.random() * 900 + 100)
  return `LP-${tgl}-${acak}`
}

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

const FORM_AWAL = {
  // Identitas pelapor
  kategoriPelapor: '',
  namaPelapor: '',
  nomorIndukPelapor: '',
  // Detail kerusakan
  lokasi: '',
  detailLokasi: '',
  jenisFasilitas: '',
  namaFasilitas: '',
  deskripsi: '',
}

function BuatLaporan({ laporanPengguna, setLaporanPengguna }) {
  const navigate = useNavigate()
  const location = useLocation()
  const fasilitasDipilih = location.state?.fasilitasDipilih || null

  const [form, setForm] = useState(FORM_AWAL)
  const [errors, setErrors] = useState({})
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [fotoError, setFotoError] = useState('')
  const [langkah, setLangkah] = useState('form') // 'form' | 'konfirmasi' | 'sukses'
  const [idBaru, setIdBaru] = useState('')
  const [kirimLoading, setKirimLoading] = useState(false)

  // Auto-fill dari halaman Fasilitas (jika pernah dikunjungi sebelum dihapus)
  useEffect(() => {
    if (fasilitasDipilih) {
      const [gedung] = fasilitasDipilih.lokasi.split(' - ')
      setForm(prev => ({
        ...prev,
        lokasi: gedung || '',
        detailLokasi: fasilitasDipilih.lokasi,
        jenisFasilitas: fasilitasDipilih.kategori.split(' ')[0] || '',
        namaFasilitas: fasilitasDipilih.nama,
      }))
    }
  }, [fasilitasDipilih])

  // Reset nama/nomor saat kategori berubah agar tidak ada data kategori lama
  function handleKategoriChange(e) {
    const val = e.target.value
    setForm(prev => ({ ...prev, kategoriPelapor: val, namaPelapor: '', nomorIndukPelapor: '' }))
    setErrors(prev => ({ ...prev, kategoriPelapor: '', namaPelapor: '', nomorIndukPelapor: '' }))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleFoto(e) {
    const file = e.target.files?.[0]
    setFotoError('')
    setFoto(null)
    setFotoPreview(null)
    if (!file) return

    const tipeOk = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    if (!tipeOk) { setFotoError('Format tidak didukung. Gunakan JPG atau PNG.'); return }
    if (file.size > 5 * 1024 * 1024) { setFotoError('Ukuran foto maksimal 5 MB.'); return }

    setFoto(file)
    const reader = new FileReader()
    reader.onload = ev => setFotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  function validasi() {
    const err = {}

    // Validasi identitas pelapor
    if (!form.kategoriPelapor) err.kategoriPelapor = 'Kategori pelapor wajib dipilih.'
    if (!form.namaPelapor.trim()) err.namaPelapor = 'Field ini wajib diisi.'
    if (!form.nomorIndukPelapor.trim()) err.nomorIndukPelapor = 'Field ini wajib diisi.'

    // Validasi detail kerusakan
    FIELD_WAJIB_KERUSAKAN.forEach(k => {
      if (!form[k].trim()) err[k] = 'Field ini wajib diisi.'
    })
    if (form.deskripsi.length > 500) err.deskripsi = 'Maksimal 500 karakter.'

    // Validasi foto wajib
    if (!fotoPreview) err.foto = 'Foto kerusakan wajib diunggah.'

    return err
  }

  function handleSubmitForm(e) {
    e.preventDefault()
    const err = validasi()
    // Tampilkan error foto di fotoError agar muncul di area upload
    if (err.foto) {
      setFotoError(err.foto)
      delete err.foto
    } else {
      setFotoError('')
    }
    setErrors(err)
    if (Object.keys(err).length > 0) return
    setLangkah('konfirmasi')
  }

  function handleKirim() {
    setKirimLoading(true)
    const id = buatId()
    const tanggalIso = new Date().toISOString()
    const laporan = {
      id,
      // Identitas pelapor
      kategoriPelapor: form.kategoriPelapor,
      namaPelapor: form.namaPelapor,
      nomorIndukPelapor: form.nomorIndukPelapor,
      // Detail kerusakan
      fasilitas: form.namaFasilitas,
      lokasi: `${form.lokasi} - ${form.detailLokasi}`,
      jenisFasilitas: form.jenisFasilitas,
      deskripsi: form.deskripsi,
      status: 'Menunggu verifikasi',
      tanggal: formatTanggal(tanggalIso),
      tanggalIso,
      kerusakan: 'Sedang',
      dampak: '-',
      prioritas: 'Menengah',
      fotoPreview: fotoPreview || null,
    }

    setTimeout(() => {
      setLaporanPengguna(prev => [laporan, ...prev])
      setIdBaru(id)
      setKirimLoading(false)
      setLangkah('sukses')
    }, 800)
  }

  // ── Tampilan: Sukses ──
  if (langkah === 'sukses') {
    return (
      <div className="pg-content">
        <div className="pg-panel" style={{ textAlign: 'center', padding: '56px 32px' }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
          <h2 style={{ margin: '0 0 10px', fontSize: 22, color: '#263238' }}>Laporan Berhasil Dikirim!</h2>
          <p style={{ margin: '0 0 6px', color: '#546E7A', fontSize: 14 }}>
            ID Laporan: <strong style={{ color: '#455A64', fontFamily: 'monospace' }}>{idBaru}</strong>
          </p>
          <p style={{ margin: '0 0 28px', color: '#78909C', fontSize: 13 }}>
            Laporan Anda sedang menunggu verifikasi dari Admin.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="pg-btn-dark" onClick={() => navigate('/pengguna/status')}>
              Pantau Status Laporan
            </button>
            <button className="pg-btn-outline-dark" onClick={() => {
              setForm(FORM_AWAL); setFoto(null); setFotoPreview(null)
              setFotoError(''); setErrors({}); setLangkah('form')
            }}>
              Buat Laporan Lain
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Tampilan: Konfirmasi ──
  if (langkah === 'konfirmasi') {
    const kf = konfKategori(form.kategoriPelapor)
    const labelNomor = kf?.nororLabel || kf?.nomorLabel || 'NIM/NIP'
    return (
      <div className="pg-content">
        <div className="pg-panel">
          <h2 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: '#263238' }}>Konfirmasi Laporan</h2>
          <p style={{ margin: '0 0 22px', fontSize: 13, color: '#546E7A' }}>
            Periksa kembali data laporan sebelum mengirim.
          </p>
          <div className="pg-konfirmasi-grid">
            {/* Identitas pelapor */}
            <div className="pg-konfirmasi-row pg-konfirmasi-row--section">
              <span>Identitas Pelapor</span>
            </div>
            <div className="pg-konfirmasi-row"><span>Kategori</span><strong>{form.kategoriPelapor}</strong></div>
            <div className="pg-konfirmasi-row"><span>Nama</span><strong>{form.namaPelapor}</strong></div>
            <div className="pg-konfirmasi-row"><span>{labelNomor}</span><strong>{form.nomorIndukPelapor}</strong></div>
            {/* Detail kerusakan */}
            <div className="pg-konfirmasi-row pg-konfirmasi-row--section">
              <span>Detail Kerusakan</span>
            </div>
            <div className="pg-konfirmasi-row"><span>Lokasi</span><strong>{form.lokasi}</strong></div>
            <div className="pg-konfirmasi-row"><span>Detail Lokasi</span><strong>{form.detailLokasi}</strong></div>
            <div className="pg-konfirmasi-row"><span>Jenis Fasilitas</span><strong>{form.jenisFasilitas}</strong></div>
            <div className="pg-konfirmasi-row"><span>Nama Fasilitas</span><strong>{form.namaFasilitas}</strong></div>
            <div className="pg-konfirmasi-row"><span>Deskripsi</span><strong style={{ whiteSpace: 'pre-wrap' }}>{form.deskripsi}</strong></div>
            <div className="pg-konfirmasi-row">
              <span>Foto</span>
              {fotoPreview
                ? <img src={fotoPreview} alt="preview" style={{ maxWidth: 160, borderRadius: 8, border: '1px solid #DDE5EB' }} />
                : <strong style={{ color: '#c62828' }}>Foto belum diunggah</strong>
              }
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button className="pg-btn-outline-dark" onClick={() => setLangkah('form')} disabled={kirimLoading}>
              ← Kembali Edit
            </button>
            <button className="pg-btn-dark" onClick={handleKirim} disabled={kirimLoading}>
              {kirimLoading ? 'Mengirim...' : 'Kirim Laporan'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Tampilan: Form ──
  const kf = konfKategori(form.kategoriPelapor)

  return (
    <div className="pg-content">
      <div className="pg-panel">
        <h2 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: '#263238' }}>Buat Laporan Kerusakan</h2>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: '#546E7A' }}>
          Isi semua data dengan benar agar laporan dapat segera diproses.
        </p>

        <form onSubmit={handleSubmitForm} noValidate>

          {/* ── Identitas Pelapor ── */}
          <p className="pg-form-section-label">Identitas Pelapor</p>

          {/* Kategori Pelapor */}
          <div className="pg-field" style={{ marginBottom: 16 }}>
            <label>Kategori Pelapor <span className="pg-required">*</span></label>
            <select
              name="kategoriPelapor"
              value={form.kategoriPelapor}
              onChange={handleKategoriChange}
              className={errors.kategoriPelapor ? 'pg-input-error' : ''}
            >
              <option value="">-- Pilih Kategori Pelapor --</option>
              {KATEGORI_PELAPOR.map(k => (
                <option key={k.value} value={k.value}>{k.value}</option>
              ))}
            </select>
            {errors.kategoriPelapor && <p className="pg-field-error">{errors.kategoriPelapor}</p>}
          </div>

          {/* Nama & Nomor Induk — muncul hanya setelah kategori dipilih */}
          {kf && (
            <div className="pg-form-grid" style={{ marginBottom: 16 }}>
              <div className="pg-field">
                <label>{kf.namaLabel} <span className="pg-required">*</span></label>
                <input
                  type="text"
                  name="namaPelapor"
                  value={form.namaPelapor}
                  onChange={handleChange}
                  placeholder={kf.namaPlaceholder}
                  className={errors.namaPelapor ? 'pg-input-error' : ''}
                />
                {errors.namaPelapor && <p className="pg-field-error">{errors.namaPelapor}</p>}
              </div>
              <div className="pg-field">
                <label>{kf.nororLabel || kf.nomorLabel} <span className="pg-required">*</span></label>
                <input
                  type="text"
                  name="nomorIndukPelapor"
                  value={form.nomorIndukPelapor}
                  onChange={handleChange}
                  placeholder={kf.nomorPlaceholder}
                  className={errors.nomorIndukPelapor ? 'pg-input-error' : ''}
                />
                {errors.nomorIndukPelapor && <p className="pg-field-error">{errors.nomorIndukPelapor}</p>}
              </div>
            </div>
          )}

          {/* ── Detail Kerusakan ── */}
          <p className="pg-form-section-label">Detail Kerusakan</p>

          <div className="pg-form-grid">
            {/* Lokasi */}
            <div className="pg-field">
              <label>Lokasi Gedung <span className="pg-required">*</span></label>
              <select name="lokasi" value={form.lokasi} onChange={handleChange} className={errors.lokasi ? 'pg-input-error' : ''}>
                <option value="">-- Pilih Gedung --</option>
                {LOKASI_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              {errors.lokasi && <p className="pg-field-error">{errors.lokasi}</p>}
            </div>

            {/* Detail Lokasi */}
            <div className="pg-field">
              <label>Detail Lokasi <span className="pg-required">*</span></label>
              <input
                type="text"
                name="detailLokasi"
                value={form.detailLokasi}
                onChange={handleChange}
                placeholder="Contoh: Gedung A, Lantai 2, Ruang 204"
                className={errors.detailLokasi ? 'pg-input-error' : ''}
              />
              {errors.detailLokasi && <p className="pg-field-error">{errors.detailLokasi}</p>}
            </div>

            {/* Jenis Fasilitas */}
            <div className="pg-field">
              <label>Jenis Fasilitas <span className="pg-required">*</span></label>
              <select name="jenisFasilitas" value={form.jenisFasilitas} onChange={handleChange} className={errors.jenisFasilitas ? 'pg-input-error' : ''}>
                <option value="">-- Pilih Jenis --</option>
                {JENIS_OPTIONS.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
              {errors.jenisFasilitas && <p className="pg-field-error">{errors.jenisFasilitas}</p>}
            </div>

            {/* Nama Fasilitas */}
            <div className="pg-field">
              <label>Nama Fasilitas <span className="pg-required">*</span></label>
              <input
                type="text"
                name="namaFasilitas"
                value={form.namaFasilitas}
                onChange={handleChange}
                placeholder="Contoh: AC Ruang 704"
                className={errors.namaFasilitas ? 'pg-input-error' : ''}
              />
              {errors.namaFasilitas && <p className="pg-field-error">{errors.namaFasilitas}</p>}
            </div>
          </div>

          {/* Deskripsi */}
          <div className="pg-field" style={{ marginTop: 16 }}>
            <label>
              Deskripsi Kerusakan <span className="pg-required">*</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: form.deskripsi.length > 450 ? '#c62828' : '#78909C' }}>
                {form.deskripsi.length}/500
              </span>
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={4}
              placeholder="Jelaskan kerusakan yang Anda temukan secara detail..."
              maxLength={500}
              className={errors.deskripsi ? 'pg-input-error' : ''}
            />
            {errors.deskripsi && <p className="pg-field-error">{errors.deskripsi}</p>}
          </div>

          {/* Upload Foto — wajib */}
          <div className="pg-field" style={{ marginTop: 16 }}>
            <label>Upload Foto Kerusakan <span className="pg-required">*</span></label>
            <div
              className="pg-upload-area"
              onClick={() => document.getElementById('input-foto').click()}
            >
              {fotoPreview ? (
                <img src={fotoPreview} alt="preview" className="pg-foto-preview" />
              ) : (
                <div className="pg-upload-placeholder">
                  <span style={{ fontSize: 32, opacity: 0.4 }}>📷</span>
                  <p>Klik untuk memilih foto</p>
                  <small>JPG, JPEG, atau PNG · Maks. 5 MB</small>
                </div>
              )}
            </div>
            <input
              id="input-foto"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              style={{ display: 'none' }}
              onChange={handleFoto}
            />
            {fotoError && <p className="pg-field-error">{fotoError}</p>}
            {fotoPreview && (
              <button type="button" className="pg-btn-hapus-foto" onClick={() => { setFoto(null); setFotoPreview(null) }}>
                Hapus Foto
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="pg-form-actions">
            <button type="button" className="pg-btn-outline-dark" onClick={() => navigate('/pengguna')}>
              Batal
            </button>
            <button type="submit" className="pg-btn-dark">
              Periksa &amp; Konfirmasi →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuatLaporan
