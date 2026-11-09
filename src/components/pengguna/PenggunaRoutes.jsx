import { Routes, Route, Navigate } from 'react-router-dom'
import PenggunaLayout from './PenggunaLayout'
import Dashboard from '../../pages/pengguna/Dashboard'
import BuatLaporan from '../../pages/pengguna/BuatLaporan'
import StatusLaporan from '../../pages/pengguna/StatusLaporan'
import RiwayatLaporan from '../../pages/pengguna/RiwayatLaporan'

function PenggunaRoutes({ onLogout, laporanPengguna, setLaporanPengguna }) {
  return (
    <Routes>
      <Route
        path="/pengguna"
        element={<PenggunaLayout onLogout={onLogout} />}
      >
        <Route
          index
          element={
            <Dashboard
              laporanPengguna={laporanPengguna}
              onLogout={onLogout}
            />
          }
        />
        <Route
          path="laporan"
          element={
            <BuatLaporan
              laporanPengguna={laporanPengguna}
              setLaporanPengguna={setLaporanPengguna}
            />
          }
        />
        <Route
          path="status"
          element={<StatusLaporan laporanPengguna={laporanPengguna} />}
        />
        <Route
          path="riwayat"
          element={<RiwayatLaporan laporanPengguna={laporanPengguna} />}
        />
        {/* /pengguna/fasilitas dihapus — redirect ke beranda pengguna */}
        <Route path="fasilitas" element={<Navigate to="/pengguna" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/pengguna" replace />} />
    </Routes>
  )
}

export default PenggunaRoutes
