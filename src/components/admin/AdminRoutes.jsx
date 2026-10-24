
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import Dashboard from '../../pages/admin/Dashboard'
import LaporanKerusakan from '../../pages/admin/LaporanKerusakan'
import PrioritasDampak from '../../pages/admin/PrioritasDampak'
import PenugasanTeknisi from '../../pages/admin/PenugasanTeknisi'
import ProgresPerbaikan from '../../pages/admin/ProgresPerbaikan'
import Rekapitulasi from '../../pages/admin/Rekapitulasi'

function AdminRoutes({ onLogout, laporan, setLaporan }) {
  const profilAdmin = {
    nama: 'Admin',
    jabatan: 'Pengelola fasilitas',
  }

  const [pilihanLaporan, setPilihanLaporan] = useState(null)
  const [form, setForm] = useState({
    kerusakan: 'Sedang',
    dampak: 'Kegiatan belajar',
    prioritas: 'Menengah',
    teknisi: '',
  })
  const [errors, setErrors] = useState({})

  function bukaLaporan(item) {
    setErrors({})
    setPilihanLaporan(item)
    setForm({
      kerusakan: item.kerusakan,
      dampak: item.dampak,
      prioritas: item.prioritas,
      teknisi: item.teknisi || '',
    })
  }

  function validasiForm() {
    const hasil = {}
    const nama = form.teknisi.trim()

    if (nama !== '') {
      if (nama.length < 3) {
        hasil.teknisi = 'Nama petugas minimal 3 karakter.'
      } else if (!isNaN(Number(nama))) {
        hasil.teknisi = 'Nama petugas tidak boleh berupa angka saja.'
      }
    }

    return hasil
  }

  function simpanPenilaian(e) {
    e.preventDefault()

    const hasil = validasiForm()
    setErrors(hasil)

    if (Object.keys(hasil).length > 0) {
      return
    }

    setLaporan((sebelumnya) =>
      sebelumnya.map((item) => {
        if (item.id !== pilihanLaporan.id) {
          return item
        }

        const sudahDitugaskan = form.teknisi.trim() !== ''
        const statusBaru =
          sudahDitugaskan && item.status === 'Menunggu verifikasi'
            ? 'Dalam penanganan'
            : item.status

        return {
          ...item,
          ...form,
          teknisi: form.teknisi.trim(),
          status: statusBaru,
        }
      }),
    )

    setPilihanLaporan(null)
  }

  function tutupModal() {
    setErrors({})
    setPilihanLaporan(null)
  }

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminLayout
            onLogout={onLogout}
            profil={profilAdmin}
            pilihanLaporan={pilihanLaporan}
            form={form}
            setForm={setForm}
            errors={errors}
            onSimpan={simpanPenilaian}
            onTutup={tutupModal}
          />
        }
      >
        <Route
          index
          element={
            <Dashboard
              laporan={laporan}
              onSelect={bukaLaporan}
              nama={profilAdmin.nama}
            />
          }
        />

        <Route
          path="laporan"
          element={
            <LaporanKerusakan
              laporan={laporan}
              onSelect={bukaLaporan}
            />
          }
        />

        <Route
          path="prioritas"
          element={
            <PrioritasDampak
              laporan={laporan}
              onSelect={bukaLaporan}
            />
          }
        />

        <Route
          path="penugasan"
          element={
            <PenugasanTeknisi
              laporan={laporan}
              onSelect={bukaLaporan}
            />
          }
        />

        <Route
          path="progres"
          element={
            <ProgresPerbaikan
              laporan={laporan}
              onSelect={bukaLaporan}
            />
          }
        />

        <Route
          path="rekapitulasi"
          element={<Rekapitulasi laporan={laporan} />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default AdminRoutes
