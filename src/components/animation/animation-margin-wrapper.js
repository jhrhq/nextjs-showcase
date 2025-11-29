
function AnimationMarginWrapper({ title, children }) {
  return (
    <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
      <h2 style={{ marginBottom: "1rem" }}>{title}</h2>
      {children}
    </div>
  )
}

export default AnimationMarginWrapper