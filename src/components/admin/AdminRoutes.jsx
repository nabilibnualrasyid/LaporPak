
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
    verifikasi: 'Menunggu verifikasi',
    alasanPenolakan: '',
    statusPenanganan: 'Menunggu verifikasi',
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
      // Pertahankan verifikasi & status yang sudah tersimpan di item, atau default
      verifikasi: item.verifikasi || 'Menunggu verifikasi',
      alasanPenolakan: item.alasanPenolakan || '',
      statusPenanganan: item.status || 'Menunggu verifikasi',
      kerusakan: item.kerusakan,
      dampak: item.dampak,
      prioritas: item.prioritas,
      teknisi: item.teknisi || '',
    })
  }

  function validasiForm() {
    const hasil = {}

    // Validasi alasan penolakan — wajib jika status Ditolak
    if (form.verifikasi === 'Ditolak' && !form.alasanPenolakan.trim()) {
      hasil.alasanPenolakan = 'Alasan penolakan wajib diisi.'
    }

    // Validasi status penanganan tidak boleh maju jika belum terverifikasi
    const statusMaju = ['Menunggu Penanganan', 'Dalam Penanganan', 'Selesai']
    if (form.verifikasi !== 'Terverifikasi' && statusMaju.includes(form.statusPenanganan)) {
      hasil.statusPenanganan = 'Laporan harus terverifikasi terlebih dahulu.'
    }

    // Validasi status tidak boleh dilanjutkan jika laporan ditolak
    if (form.verifikasi === 'Ditolak' && form.statusPenanganan !== 'Menunggu verifikasi') {
      hasil.statusPenanganan = 'Laporan yang ditolak tidak dapat dilanjutkan penanganannya.'
    }

    // Validasi nama teknisi (sama seperti existing)
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

        return {
          ...item,
          verifikasi: form.verifikasi,
          alasanPenolakan: form.verifikasi === 'Ditolak' ? form.alasanPenolakan.trim() : '',
          status: form.statusPenanganan,
          kerusakan: form.kerusakan,
          dampak: form.dampak,
          prioritas: form.prioritas,
          teknisi: form.teknisi.trim(),
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
