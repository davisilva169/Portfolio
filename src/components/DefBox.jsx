/* ─── Caixa de Teorema / Definição ───────────────────────────────────────────
   Props:
     title    — texto do badge superior (ex: "Theorem 1 — Hartman–Grobman")
     children — conteúdo (pode incluir EqBlock, parágrafos etc.)
     t        — objeto de tema
     color    — cor de destaque (opcional; fallback = t.accent)
─────────────────────────────────────────────────────────────────────────── */
export default function DefBox({ title, children, t, color }) {
  const c = color || t.accent;
  return (
    <div style={{
      margin:    '2rem 0 2.5rem',
      padding:   '2rem 2.5rem',
      background: `linear-gradient(135deg, ${c}10, ${c}05)`,
      border:    `1px solid ${c}55`,
      borderRadius: 10,
      boxShadow: `0 0 36px ${c}14, inset 0 1px 0 ${c}20`,
      position:  'relative',
      overflow:  'hidden',
    }}>
      {/* brilho decorativo no canto */}
      <div style={{
        position:       'absolute',
        top:            0,
        right:          0,
        width:          180,
        height:         180,
        background:     `radial-gradient(circle, ${c}18, transparent 70%)`,
        pointerEvents:  'none',
      }} />

      <p style={{
        fontFamily:    'DM Mono, monospace',
        fontSize:      '0.68rem',
        color:         c,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        margin:        '0 0 1.2rem',
      }}>
        {title}
      </p>

      {children}
    </div>
  );
}
