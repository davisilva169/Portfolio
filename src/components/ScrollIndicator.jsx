import { useI18n } from "../i18n/context";import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL INDICATOR — lateral esquerdo, fixo
// Aparece apenas quando há conteúdo abaixo para rolar (threshold: 80px).
// Some quando o usuário chega perto do final da página.
// Não aparece em telas de dispositivos móveis (largura <= 768px).
// Props:
//   t → objeto de tema
// ─────────────────────────────────────────────────────────────────────────────
export default function ScrollIndicator({ t }) {const { tr } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const winWidth = window.innerWidth;
      const docHeight = document.documentElement.scrollHeight;

      // Verifica se é celular baseado na largura da tela
      const isMobile = winWidth <= 768;

      // Só mostra se a página tem conteúdo suficiente para rolar
      const pageIsScrollable = docHeight > winHeight + 80;
      // Some quando está perto do fim (80px antes do fundo)
      const nearBottom = scrollY + winHeight >= docHeight - 80;
      // Some quando o usuário já rolou um pouco
      const hasScrolled = scrollY > 80;

      // Se for mobile, garante que fique invisível. Se não, aplica a lógica normal.
      if (isMobile) {
        setVisible(false);
      } else {
        setVisible(pageIsScrollable && !nearBottom && !hasScrolled);
      }
    };

    check(); // checa imediatamente ao montar
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: '2.2rem',
        bottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        opacity: visible ? 0.55 : 0,
        transition: 'opacity 0.6s ease',
        zIndex: 10,
        pointerEvents: 'none'
      }}>

      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          color: t.accentSolid || t.accent,
          writingMode: 'vertical-rl',
          textTransform: 'uppercase'
        }}>{tr("scroll")}


      </span>
      <div
        style={{
          width: '1px',
          height: '50px',
          background: `linear-gradient(to bottom, ${t.accentSolid || t.accent}, transparent)`,
          animation: 'pulse 2s ease infinite'
        }} />

    </div>);

}
