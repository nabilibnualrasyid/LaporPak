import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ScanQR.css'

// Icon QR sederhana (inline SVG)
function IconQR() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="4.5" y="4.5" width="4" height="4" fill="currentColor" stroke="none" rx="0.5" />
      <rect x="15.5" y="4.5" width="4" height="4" fill="currentColor" stroke="none" rx="0.5" />
      <rect x="4.5" y="15.5" width="4" height="4" fill="currentColor" stroke="none" rx="0.5" />
      <line x1="14" y1="14" x2="14" y2="14" strokeWidth="2.5" />
      <line x1="17" y1="14" x2="17" y2="14" strokeWidth="2.5" />
      <line x1="20" y1="14" x2="20" y2="14" strokeWidth="2.5" />
      <line x1="14" y1="17" x2="14" y2="17" strokeWidth="2.5" />
      <line x1="17" y1="17" x2="20" y2="17" strokeWidth="2.5" />
      <line x1="20" y1="20" x2="14" y2="20" strokeWidth="2.5" />
      <line x1="14" y1="20" x2="14" y2="17" strokeWidth="2.5" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

// Status: 'idle' | 'scanning' | 'success'
function ScanQR({ onBack, onScanSuccess }) {
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()

  function handleSimulasi() {
    setStatus('scanning')

    // Simulasi proses verifikasi QR — mudah diganti dengan kamera + API nyata
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {
        // Arahkan ke dashboard pengguna
        onScanSuccess()
        navigate('/pengguna', { replace: true })
      }, 1200)
    }, 1800)
  }

  return (
    <div className="scanqr-page">
      {/* Header */}
      <header className="scanqr-header">
        <div className="scanqr-brand">
          <span className="scanqr-brand-icon">LP</span>
          <span className="scanqr-brand-name">LaporPak</span>
        </div>
      </header>

      {/* Card utama */}
      <main className="scanqr-main">
        <div className="scanqr-card">
          {/* Title */}
          <div className="scanqr-title-block">
            <h1 className="scanqr-title">Masuk sebagai Pengguna</h1>
            <p className="scanqr-subtitle">
              Pindai QR Code untuk mengakses layanan pelaporan fasilitas kampus.
            </p>
          </div>

          {/* Area scanner */}
          <div className={`scanqr-viewport ${status === 'success' ? 'scanqr-viewport--success' : ''}`}>
            {status === 'idle' && (
              <div className="scanqr-idle">
                <div className="scanqr-icon-wrap">
                  <IconQR />
                </div>
                <div className="scanqr-corner scanqr-corner--tl" />
                <div className="scanqr-corner scanqr-corner--tr" />
                <div className="scanqr-corner scanqr-corner--bl" />
                <div className="scanqr-corner scanqr-corner--br" />
              </div>
            )}

            {status === 'scanning' && (
              <div className="scanqr-scanning">
                <div className="scanqr-spinner" />
                <p className="scanqr-status-text">Memverifikasi QR Code...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="scanqr-success">
                <div className="scanqr-check">
                  <IconCheck />
                </div>
                <p className="scanqr-status-text">QR Code berhasil diverifikasi</p>
              </div>
            )}
          </div>

          {/* Petunjuk */}
          {status === 'idle' && (
            <p className="scanqr-hint">
              Arahkan kamera ke QR Code yang tersedia di lokasi fasilitas kampus
            </p>
          )}

          {/* Tombol aksi */}
          {status === 'idle' && (
            <button className="scanqr-btn-primary" onClick={handleSimulasi}>
              Simulasikan Scan Berhasil
            </button>
          )}

          {status === 'scanning' && (
            <button className="scanqr-btn-primary" disabled>
              Memverifikasi...
            </button>
          )}

          {/* Kembali */}
          {status === 'idle' && (
            <button className="scanqr-btn-back" onClick={onBack}>
              <IconArrowLeft /> Kembali ke Beranda
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default ScanQR
