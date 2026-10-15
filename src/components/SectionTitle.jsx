import { useI18n } from "../i18n/context"; /* ─── Título grande de seção ─────────────────────────────────────────────── */
export default function SectionTitle({ children, t }) {const { tr } = useI18n();
  return (
    <h2 style={{
      fontFamily: 'Georgia, Cambria, serif',
      fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
      fontWeight: 600,
      color: t.text,
      margin: '0 0 1.4rem',
      lineHeight: 1.15
    }}>
      {tr(children)}
    </h2>);

}
