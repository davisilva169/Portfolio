import { KTex } from './KaTeX';

/* ─── Bloco de equação colorido ──────────────────────────────────────────────
   Props:
     math   — string LaTeX
     color  — cor da borda/fundo (opcional; fallback = t.accent)
     t      — objeto de tema
     label  — texto do badge flutuante (opcional)
─────────────────────────────────────────────────────────────────────────── */
export default function EqBlock({ math, color, t, label }) {
  const borderColor = color || t.accent;
  return (
    /* Wrapper externo: posicionamento, margem, label flutuante */
    <div style={{
      position: 'relative',
      margin:   label ? '3rem 0 2.5rem' : '2.5rem 0',
    }}>
      {label && (
        <span style={{
          position:      'absolute',
          top:           -11,
          left:          16,
          background:    borderColor,
          color:         '#06060a',
          fontSize:      '0.6rem',
          fontFamily:    'DM Mono, monospace',
          padding:       '2px 10px',
          borderRadius:  20,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight:    700,
          whiteSpace:    'nowrap',
          zIndex:        1,
        }}>
          {label}
        </span>
      )}

      {/* Inner: visual + overflow apenas aqui — label não é cortada */}
      <div style={{
        padding:      '1.4rem 2rem',
        background:   `${borderColor}0a`,
        borderLeft:   `3px solid ${borderColor}`,
        borderRadius: '0 8px 8px 0',
        boxShadow:    `0 0 20px ${borderColor}14`,
        overflowX:    'auto',
        color:        t.text,
      }}>
        <KTex math={math} block />
      </div>
    </div>
  );
}
