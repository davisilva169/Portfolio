import { useI18n } from "../i18n/context"; /* ─── Pullquote / citação em destaque ────────────────────────────────────── */
export default function Pullquote({ children, t }) {const { tr } = useI18n();
  return (
    <blockquote style={{
      margin: '2.5rem 0',
      padding: '1.2rem 2rem',
      borderLeft: `2px solid ${t.accent}`,
      background: `linear-gradient(to right, ${t.accent}0d, transparent)`,
      fontFamily: 'Georgia, Cambria, serif',
      fontSize: '1.3rem',
      fontStyle: 'italic',
      color: t.textDim,
      lineHeight: 1.65
    }}>
      {tr(children)}
    </blockquote>);

}
