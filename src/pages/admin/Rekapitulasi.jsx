const daftarKelompok = [
  {
    judul: 'Berdasarkan Status',
    kunci: 'status',
    nilai: ['Menunggu verifikasi', 'Dalam penanganan'],
  },
  {
    judul: 'Berdasarkan Prioritas',
    kunci: 'prioritas',
    nilai: ['Tinggi', 'Menengah', 'Rendah'],
  },
  {
    judul: 'Berdasarkan Tingkat Kerusakan',
    kunci: 'kerusakan',
    nilai: ['Berat', 'Sedang', 'Ringan'],
  },
  {
    judul: 'Berdasarkan Dampak',
    kunci: 'dampak',
    nilai: ['Keselamatan', 'Praktikum', 'Kegiatan belajar', 'Kenyamanan'],
  },
]

function hitungPer(laporan, kunci) {
  return laporan.reduce((hasil, item) => {
    hasil[item[kunci]] = (hasil[item[kunci]] || 0) + 1
    return hasil
  }, {})
}

function Rekapitulasi({ laporan }) {
  const total = laporan.length

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>Rekapitulasi</h2>
          <p>Ringkasan seluruh laporan. Total saat ini {total} laporan.</p>
        </div>
      </div>

      <div className="rekap-grid">
        {daftarKelompok.map((kelompok) => {
          const hitungan = hitungPer(laporan, kelompok.kunci)

          return (
            <article key={kelompok.kunci} className="rekap-card">
              <h3>{kelompok.judul}</h3>

              {kelompok.nilai.map((nilai) => {
                const jumlah = hitungan[nilai] || 0
                const persen = total === 0 ? 0 : Math.round((jumlah / total) * 100)

                return (
                  <div key={nilai} className="rekap-row">
                    <div className="rekap-label">
                      <span>{nilai}</span>
                      <strong>{jumlah}</strong>
                    </div>
                    <div className="rekap-bar">
                      <div
                        className="rekap-bar-fill"
                        style={{ width: `${persen}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Rekapitulasi