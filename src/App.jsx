
import { useEffect, useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import AdminRoutes from './components/admin/AdminRoutes'
import PetugasRoutes from './components/petugas/PetugasRoutes'
import Login from './components/Login'

const laporanAwal = [
  {
    id: 'LP-001',
    fasilitas: 'Lampu ruang kelas',
    lokasi: 'Gedung A - Ruang 201',
    kerusakan: 'Sedang',
    dampak: 'Kegiatan belajar',
    prioritas: 'Menengah',
    status: 'Menunggu verifikasi',
  },
  {
    id: 'LP-002',
    fasilitas: 'Kursi mahasiswa',
    lokasi: 'Gedung B - Ruang 105',
    kerusakan: 'Ringan',
    dampak: 'Kenyamanan',
    prioritas: 'Rendah',
    status: 'Menunggu verifikasi',
  },
  {
    id: 'LP-003',
    fasilitas: 'AC ruang laboratorium',
    lokasi: 'Gedung C - Lab Komputer',
    kerusakan: 'Berat',
    dampak: 'Praktikum',
    prioritas: 'Tinggi',
    status: 'Dalam penanganan',
  },
]

function bacaLaporan() {
  try {
    const dataTersimpan = localStorage.getItem('laporpak_laporan')
    return dataTersimpan ? JSON.parse(dataTersimpan) : laporanAwal
  } catch {
    return laporanAwal
  }
}

function App() {
  const [view, setView] = useState('landing')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  // Satu sumber data laporan untuk admin dan petugas.
  const [laporan, setLaporan] = useState(bacaLaporan)

  // Simpan perubahan laporan ke localStorage.
  useEffect(() => {
    localStorage.setItem('laporpak_laporan', JSON.stringify(laporan))
  }, [laporan])

  function handleLogin(event) {
    event.preventDefault()

    const akun = [
      { username: 'admin', password: 'admin123' },
      { username: 'petugas', password: 'petugas123' },
    ]

    const akunDitemukan = akun.find(
      (item) =>
        item.username === username && item.password === password,
    )

    if (akunDitemukan) {
      setUser(akunDitemukan.username)
      setView('dashboard')
      setError('')
      return
    }

    setError('Username atau password salah.')
  }

  function handleLogout() {
    setUser(null)
    setUsername('')
    setPassword('')
    setError('')
    setView('landing')
  }

  
  if (view === 'dashboard' && user) {
    if (user === 'admin') {
      return (
        <AdminRoutes
          onLogout={handleLogout}
          laporan={laporan}
          setLaporan={setLaporan}
        />
      )
    }

    return (
      <PetugasRoutes
  onLogout={handleLogout}
  laporan={laporan}
  setLaporan={setLaporan}
/>
    )
  }

  if (view === 'login') {
  return (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      onSubmit={handleLogin}
      onBack={() => {
        setError('')
        setView('landing')
      }}
    />
  )
} 

  return <LandingPage onGoToLogin={() => setView('login')} />
}

export default App
