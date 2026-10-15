import { useI18n } from "../i18n/context"; /* ─── Label de seção numerada  (ex: "01 · INTRODUCTION") ────────────────── */
export default function SectionLabel({ number, label, t }) {const { tr } = useI18n();
  return (
    <div style={{ marginBottom: '1rem' }}>
      <span style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.68rem',
        color: t.accent,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        opacity: 0.9
      }}>
        {tr(number < 10 ? `0${number}` : number)} · {tr(label)}
      </span>
    </div>);

}
