
import './Login.css'

function Login({
  username,
  setUsername,
  password,
  setPassword,
  error,
  onSubmit,
  onBack,
}) {
  return (
    <main className="login-page">
      <div className="login-overlay" />

      <section className="login-card">
        <div className="login-brand">
          <span className="login-brand-icon">LP</span>
          <div>
            <p className="eyebrow">LAPORPAK</p>
            <span className="login-brand-subtitle">
              Smart Facility Reporting
            </span>
          </div>
        </div>

        <div className="login-heading">
          <p className="login-welcome">Selamat datang kembali</p>
          <h1>Masuk ke akun</h1>
          <p className="login-description">
            Masuk untuk mengelola laporan fasilitas kampus.
          </p>
        </div>

        <form onSubmit={onSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Masukkan username"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Masukkan password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Masuk ke Dashboard
            <span aria-hidden="true"></span>
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="login-back-button"
            onClick={onBack}
          >
            Kembali ke Beranda
          </button>

          <p>Smart Facility Reporting Kampus</p>
        </div>
      </section>
    </main>
  )
}

export default Login
