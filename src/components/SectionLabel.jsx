/* ─── Label de seção numerada  (ex: "01 · INTRODUCTION") ────────────────── */
export default function SectionLabel({ number, label, t }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <span style={{
        fontFamily:    'DM Mono, monospace',
        fontSize:      '0.68rem',
        color:         t.accent,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        opacity:       0.9,
      }}>
        {number < 10 ? `0${number}` : number} · {label}
      </span>
    </div>
  );
}
