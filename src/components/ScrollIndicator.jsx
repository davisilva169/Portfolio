import { useState, useEffect } from 'react';

/* ─── Indicador de scroll lateral fixo ──────────────────────────────────── */
export default function ScrollIndicator({ t }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY < maxScroll - 120);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position:      'fixed',
      left:          '2.2rem',
      bottom:        '2.5rem',
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           '10px',
      opacity:       visible ? 0.55 : 0,
      transition:    'opacity 0.6s ease',
      zIndex:        10,
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily:    "'DM Mono', monospace",
        fontSize:      '0.55rem',
        letterSpacing: '0.22em',
        color:         t.accentSolid || t.accent,
        writingMode:   'vertical-rl',
        textTransform: 'uppercase',
      }}>
        scroll
      </span>
      <div style={{
        width:      '1px',
        height:     '50px',
        background: `linear-gradient(to bottom, ${t.accentSolid || t.accent}, transparent)`,
        animation:  'pulse 2s ease infinite',
      }} />
    </div>
  );
}
