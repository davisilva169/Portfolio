// ─────────────────────────────────────────────────────────────────────────────
// BACK BUTTON
// Botão de voltar usado em todas as páginas de detalhe.
// Props:
//   onClick → função chamada ao clicar (ex: () => setActive("Research"))
//   label   → texto do botão (ex: "Back to Research")
//   t       → objeto de tema
// ─────────────────────────────────────────────────────────────────────────────
export default function BackButton({ onClick, label = "Back", t }) {
  return (
    <button
      onClick={onClick}
      style={{
        background:    "none",
        border:        "none",
        cursor:        "pointer",
        color:         t.accent,
        fontFamily:    "'DM Mono', monospace",
        fontSize:      "0.7rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom:  "3rem",
        display:       "flex",
        alignItems:    "center",
        gap:           "8px",
        transition:    "color 0.2s",
        padding:       0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = t.accentSolid)}
      onMouseLeave={(e) => (e.currentTarget.style.color = t.accent)}
    >
      ← {label}
    </button>
  );
}
