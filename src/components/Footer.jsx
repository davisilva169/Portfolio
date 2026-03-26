// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// Props:
//   t → objeto de tema
// ─────────────────────────────────────────────────────────────────────────────
export default function Footer({ t }) {
  return (
    <footer
      style={{
        borderTop: `1px solid ${t.border}`,
        padding:   "2.5rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily:    "'DM Mono', monospace",
          fontSize:      "0.62rem",
          letterSpacing: "0.15em",
          color:         t.accent,
          textTransform: "uppercase",
          opacity:       0.5,
        }}
      >
        © 2026 Davi Santos-Silva · Built with curiosity and coffee
      </p>
    </footer>
  );
}
