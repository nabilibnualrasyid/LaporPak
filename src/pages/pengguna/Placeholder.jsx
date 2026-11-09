// Halaman placeholder untuk fitur yang belum diimplementasikan.
// Ganti konten ini saat fitur siap dikembangkan.

function Placeholder({ judul, deskripsi }) {
  return (
    <div className="pg-content">
      <div className="pg-panel" style={{ textAlign: 'center', padding: '60px 30px' }}>
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.35 }}>⚙</div>
        <h2 style={{ margin: '0 0 10px', fontSize: 20, color: '#263238' }}>{judul}</h2>
        <p style={{ margin: 0, color: '#546E7A', fontSize: 14, lineHeight: 1.7, maxWidth: 360, marginInline: 'auto' }}>
          {deskripsi || 'Halaman ini sedang dalam pengembangan dan akan segera tersedia.'}
        </p>
      </div>
    </div>
  )
}

export default Placeholder
