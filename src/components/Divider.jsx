/* ─── Divisor centralizado ───────────────────────────────────────────────── */
export default function Divider({ t = {} }) {
  const accent = t.accentSolid || t.accent || '#b58cff';
  return (
    <div style={{ margin: '3.5rem auto', width: 50 }}>
      <div style={{
        width:        '50px',
        height:       '3px',
        background:   `linear-gradient(90deg, ${accent} 0%, ${accent}80 55%, transparent 100%)`,
        borderRadius: '999px',
      }} />
    </div>
  );
}
