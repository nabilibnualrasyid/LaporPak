// Opsi status penanganan yang diizinkan berdasarkan verifikasi
const STATUS_PENANGANAN = [
  'Menunggu verifikasi',
  'Menunggu Penanganan',
  'Dalam Penanganan',
  'Selesai',
]

// Badge warna untuk status — selaras tema Stormy Morning
function badgeStyle(status) {
  if (!status) return {}
  const s = status.toLowerCase()
  if (s.includes('selesai'))        return { background: '#E8F5E9', color: '#2E7D32' }
  if (s.includes('dalam'))          return { background: '#E3F0F7', color: '#1A5276' }
  if (s.includes('menunggu penanganan')) return { background: '#FFF3E0', color: '#E65100' }
  if (s.includes('terverifikasi'))  return { background: '#E3F0F7', color: '#1A5276' }
  if (s.includes('ditolak'))        return { background: '#FFEBEE', color: '#B71C1C' }
  return { background: '#ECEFF1', color: '#455A64' }
}

function DetailModal({
  pilihanLaporan,
  form,
  setForm,
  errors,
  onSimpan,
  onTutup,
}) {
  if (!pilihanLaporan) {
    return null
  }

  // Apakah laporan ditolak — kontrol kemunculan textarea alasan
  const ditolak = form.verifikasi === 'Ditolak'

  // Apakah status penanganan bisa diubah
  const bisaUbahStatus = form.verifikasi === 'Terverifikasi'

  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onTutup()
        }
      }}
    >
      <form className="admin-modal admin-modal--scrollable" onSubmit={onSimpan}>
        {/* ── Header modal ── */}
        <div className="admin-modal-heading">
          <div>
            <p>{pilihanLaporan.id}</p>
            <h2>Detail Laporan</h2>
          </div>
          <button type="button" className="admin-close" onClick={onTutup}>
            ×
          </button>
        </div>

        {/* ── Info laporan (existing) ── */}
        <div className="admin-detail-box">
          <strong>{pilihanLaporan.fasilitas}</strong>
          <span>{pilihanLaporan.lokasi}</span>
          {/* Tampilkan identitas pelapor jika tersedia (dari form pengguna) */}
          {pilihanLaporan.namaPelapor && (
            <span>
              Pelapor: {pilihanLaporan.namaPelapor}
              {pilihanLaporan.kategoriPelapor ? ` (${pilihanLaporan.kategoriPelapor})` : ''}
            </span>
          )}
          <small style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Status saat ini:&nbsp;
            <span style={{
              display: 'inline-block',
              padding: '2px 9px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              ...badgeStyle(pilihanLaporan.status),
            }}>
              {pilihanLaporan.status}
            </span>
          </small>
        </div>

        {/* ════════════════════════════════════════════
            BAGIAN BARU: Verifikasi Laporan
        ════════════════════════════════════════════ */}
        <p className="admin-modal-section-label">Verifikasi Laporan</p>

        <label>
          Status Verifikasi
          <select
            value={form.verifikasi}
            onChange={(e) => {
              const val = e.target.value
              // Jika berubah dari Ditolak, reset alasan penolakan
              // Jika berubah dari Terverifikasi, reset status penanganan ke aman
              setForm(prev => ({
                ...prev,
                verifikasi: val,
                alasanPenolakan: val !== 'Ditolak' ? '' : prev.alasanPenolakan,
                statusPenanganan:
                  val === 'Ditolak' ? 'Menunggu verifikasi'
                  : val !== 'Terverifikasi' ? 'Menunggu verifikasi'
                  : prev.statusPenanganan,
              }))
            }}
          >
            <option value="Menunggu verifikasi">Menunggu Verifikasi</option>
            <option value="Terverifikasi">Terverifikasi</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </label>

        {/* Alasan penolakan — hanya muncul jika Ditolak */}
        {ditolak && (
          <label>
            Alasan Penolakan <span style={{ color: '#B23B32' }}>*</span>
            <textarea
              rows={3}
              placeholder="Masukkan alasan laporan ditolak..."
              value={form.alasanPenolakan}
              onChange={(e) => setForm(prev => ({ ...prev, alasanPenolakan: e.target.value }))}
              className={errors.alasanPenolakan ? 'admin-input-error' : ''}
              style={{ resize: 'vertical', minHeight: 80 }}
            />
            {errors.alasanPenolakan && (
              <small className="admin-error-text">{errors.alasanPenolakan}</small>
            )}
          </label>
        )}

        {/* ════════════════════════════════════════════
            BAGIAN BARU: Status Penanganan
        ════════════════════════════════════════════ */}
        <label>
          Status Penanganan
          <select
            value={form.statusPenanganan}
            disabled={!bisaUbahStatus}
            style={!bisaUbahStatus ? { opacity: 0.55, cursor: 'not-allowed' } : {}}
            onChange={(e) => setForm(prev => ({ ...prev, statusPenanganan: e.target.value }))}
          >
            {STATUS_PENANGANAN.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {!bisaUbahStatus && (
            <small style={{ marginTop: 5, display: 'block', color: '#90A4AE', fontSize: 11 }}>
              {ditolak
                ? 'Laporan ditolak — status penanganan tidak dapat diubah.'
                : 'Status penanganan dapat diubah setelah laporan diverifikasi.'}
            </small>
          )}
          {errors.statusPenanganan && (
            <small className="admin-error-text">{errors.statusPenanganan}</small>
          )}
        </label>

        {/* ════════════════════════════════════════════
            Field existing — tidak diubah
        ════════════════════════════════════════════ */}
        <p className="admin-modal-section-label">Penilaian Kerusakan</p>

        <label>
          Tingkat Kerusakan
          <select
            value={form.kerusakan}
            onChange={(e) => setForm({ ...form, kerusakan: e.target.value })}
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
            onChange={(e) => setForm({ ...form, dampak: e.target.value })}
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
            onChange={(e) => setForm({ ...form, prioritas: e.target.value })}
          >
            <option>Rendah</option>
            <option>Menengah</option>
            <option>Tinggi</option>
          </select>
        </label>

        <label>
          Petugas Teknisi
          <input
            className={errors.teknisi ? 'admin-input-error' : ''}
            value={form.teknisi}
            onChange={(e) => setForm({ ...form, teknisi: e.target.value })}
            placeholder="Nama petugas teknis"
          />
          {errors.teknisi && (
            <small className="admin-error-text">{errors.teknisi}</small>
          )}
        </label>

        <div className="admin-modal-actions">
          <button
            type="button"
            className="admin-button-secondary"
            onClick={onTutup}
          >
            Batal
          </button>
          <button className="admin-button-primary" type="submit">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  )
}

export default DetailModal
