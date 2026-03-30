/* ─── Título grande de seção ─────────────────────────────────────────────── */
export default function SectionTitle({ children, t }) {
  return (
    <h2 style={{
      fontFamily:  'Cormorant Garamond, serif',
      fontSize:    'clamp(1.6rem, 2.8vw, 2.1rem)',
      fontWeight:  600,
      color:       t.text,
      margin:      '0 0 1.4rem',
      lineHeight:  1.15,
    }}>
      {children}
    </h2>
  );
}
