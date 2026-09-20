import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  function handleLogin(event) {
    event.preventDefault()

    const akun = [
      { username: 'admin', password: 'admin123' },
      { username: 'petugas', password: 'petugas123' },
    ]

    const akunDitemukan = akun.find(
      (item) => item.username === username && item.password === password,
    )

    if (akunDitemukan) {
      setUser(akunDitemukan.username)
      setError('')
      return
    }

    setError('Username atau password salah.')
  }

  function handleLogout() {
    setUser(null)
    setUsername('')
    setPassword('')
  }

  if (user) {
    const namaPengguna = user === 'admin' ? 'Admin' : 'Petugas'

    return (
      <div className="app-shell">
        <aside className="sidebar">
          <div className="logo">LaporPak</div>
          <nav className="sidebar-menu">
            <a href="#dashboard" className="menu-item active">Dashboard</a>
            <button type="button" className="menu-item logout-button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </aside>

        <main className="dashboard">
          <h1>Halo, {namaPengguna}</h1>
          <p>Selamat datang di Dashboard {namaPengguna} LaporPak.</p>
        </main>
      </div>
    )
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">LAPORPAK</p>
        <h1>Masuk ke akun</h1>
        <p className="login-description">Silakan masuk untuk melanjutkan ke dashboard.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Masukkan username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Masukkan password"
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
