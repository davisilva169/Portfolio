import { useState } from 'react';

/* ─── Botão de ligar/desligar partículas ─────────────────────────────────────
   Props:
     accent        — cor do tema (string hex)
     showParticles — estado atual (boolean)
     onToggle      — callback ao clicar
─────────────────────────────────────────────────────────────────────────── */
export default function ParticleToggle({ accent, showParticles, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.9rem' }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '0.5rem',
          background:    'none',
          border:        `1px solid ${accent}${hovered ? '88' : '44'}`,
          borderRadius:  6,
          color:         accent,
          fontFamily:    'DM Mono, monospace',
          fontSize:      '0.65rem',
          padding:       '5px 12px',
          cursor:        'pointer',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          transition:    'border-color 0.2s, opacity 0.2s',
          opacity:       hovered ? 1 : 0.75,
        }}
      >
        <span style={{
          width:       6,
          height:      6,
          borderRadius: '50%',
          background:   showParticles ? accent : 'transparent',
          border:       `1px solid ${accent}`,
          display:      'inline-block',
          transition:   'background 0.3s',
          flexShrink:   0,
        }} />
        {showParticles ? 'particles on' : 'particles off'}
      </button>

      <span style={{
        fontFamily:    'DM Mono, monospace',
        fontSize:      '0.6rem',
        color:         accent,
        letterSpacing: '0.1em',
        opacity:       showParticles ? 0.5 : 0,
        transition:    'opacity 0.4s ease',
        whiteSpace:    'nowrap',
        pointerEvents: 'none',
      }}>
        ← for better reading
      </span>
    </div>
  );
}
