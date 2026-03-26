import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// Links centralizados, logo à esquerda, botão de tema à direita.
// Props:
//   active    → string com a página atual
//   setActive → função para navegar
//   dark      → boolean
//   setDark   → função para alternar tema
//   t         → objeto de tema (DARK ou LIGHT)
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Research", "Projects", "Blog", "About"];

export default function Navbar({ active, setActive, dark, setDark, t }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position:       "fixed",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         100,
        transition:     "all 0.4s ease",
        background:     scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom:   scrolled ? `1px solid ${t.border}` : "none",
        padding:        "0 2.5rem",
        height:         "68px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo — lado esquerdo */}
      <div
        onClick={() => setActive("Home")}
        style={{
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      "1.35rem",
          letterSpacing: "0.04em",
          color:         t.text,
          cursor:        "pointer",
          fontWeight:    600,
          zIndex:        1,
        }}
      >
        λ <span style={{ color: t.accentSolid }}>Physics</span>
      </div>

      {/* Links — centralizados com position absolute */}
      <div
        style={{
          position:   "absolute",
          left:       "50%",
          transform:  "translateX(-50%)",
          display:    "flex",
          gap:        "2.5rem",
          alignItems: "center",
        }}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => setActive(link)}
            style={{
              background:    "none",
              border:        "none",
              cursor:        "pointer",
              fontFamily:    "'DM Sans', sans-serif",
              fontSize:      "0.82rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         active === link ? t.accentSolid : t.textDim,
              transition:    "color 0.25s ease",
              padding:       "4px 0",
              borderBottom:  active === link
                ? `1px solid ${t.accentSolid}`
                : "1px solid transparent",
            }}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Botão de tema — lado direito */}
      <button
        onClick={() => setDark(!dark)}
        title={dark ? "Tema claro" : "Tema escuro"}
        style={{
          background:    "none",
          border:        `1px solid ${t.border}`,
          cursor:        "pointer",
          borderRadius:  "20px",
          padding:       "5px 14px",
          display:       "flex",
          alignItems:    "center",
          gap:           "6px",
          transition:    "all 0.25s ease",
          color:         t.textDim,
          fontSize:      "0.68rem",
          fontFamily:    "'DM Mono', monospace",
          letterSpacing: "0.1em",
          zIndex:        1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = t.accentSolid;
          e.currentTarget.style.color       = t.accentSolid;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = t.border;
          e.currentTarget.style.color       = t.textDim;
        }}
      >
        {dark ? "☀ LIGHT" : "◐ DARK"}
      </button>
    </nav>
  );
}
