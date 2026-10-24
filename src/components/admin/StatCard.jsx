function StatCard({ title, value, icon, note }) {
  return (
    <article className="admin-stat-card">
      <div className="admin-stat-top">
        <span>{title}</span>
        <span className="admin-stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{note || 'Ringkasan laporan'}</small>
    </article>
  )
}

export default StatCard