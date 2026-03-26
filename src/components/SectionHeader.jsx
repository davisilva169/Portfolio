// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// Eyebrow em monospace + título em serif + linha decorativa degradê.
// Props:
//   eyebrow → texto pequeno acima do título (ex: "Academic Work")
//   title   → título principal da seção (ex: "Research")
//   t       → objeto de tema
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionHeader({ eyebrow, title, t }) {
  return (
    <div style={{ marginBottom: "3.5rem", overflow: "visible" }}>
      <p
        style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color:         t.accent,
          marginBottom:  "0.85rem",
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      "clamp(2.2rem, 4vw, 3rem)",
          fontWeight:    700,
          color:         t.text,
          letterSpacing: "-0.01em",
          lineHeight:    1,
          marginBottom:  "1.2rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width:      "48px",
          height:     "1px",
          background: `linear-gradient(to right, ${t.accentSolid}, transparent)`,
        }}
      />
    </div>
  );
}
