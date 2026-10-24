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

  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onTutup()
        }
      }}
    >
      <form className="admin-modal" onSubmit={onSimpan}>
        <div className="admin-modal-heading">
          <div>
            <p>{pilihanLaporan.id}</p>
            <h2>Detail Laporan</h2>
          </div>
          <button type="button" className="admin-close" onClick={onTutup}>
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