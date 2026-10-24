
import { Routes, Route, Navigate } from 'react-router-dom'
import PetugasLayout from './PetugasLayout'

import Dashboard from '../../pages/petugas/Dashboard'
import DaftarPenugasan from '../../pages/petugas/DaftarPenugasan'
import DetailPenugasan from '../../pages/petugas/DetailPenugasan'
import RiwayatPenugasan from '../../pages/petugas/RiwayatPenugasan'

function PetugasRoutes({ onLogout, laporan, setLaporan }) {
  return (
    <Routes>
      <Route
        path="/petugas"
        element={<PetugasLayout onLogout={onLogout} />}
      >
        {/* Halaman Dashboard */}
        <Route
          index
          element={<Dashboard laporan={laporan} />}
        />

        {/* Halaman Daftar Penugasan */}
        <Route
          path="penugasan"
          element={<DaftarPenugasan laporan={laporan} />}
        />

        {/* Halaman Detail Penugasan */}
        <Route
          path="penugasan/:id"
          element={
            <DetailPenugasan
              laporan={laporan}
              setLaporan={setLaporan}
            />
          }
        />
        <Route
  path="riwayat"
  element={<RiwayatPenugasan laporan={laporan} />}
/>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/petugas" replace />}
      />
    </Routes>
  )
}

export default PetugasRoutes
