import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// Props:
//   setActive → função de navegação
//   t         → objeto de tema
//   dark      → boolean
// ─────────────────────────────────────────────────────────────────────────────
export default function Home({ setActive, t, dark }) {
  const [loaded,   setLoaded]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        position:       "relative",
        padding:        "0 2rem",
        textAlign:      "center",
      }}
    >
      {/* Glow ambiente central */}
      <div
        style={{
          position:      "absolute",
          width:         "600px",
          height:        "600px",
          borderRadius:  "50%",
          background:    "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Conteúdo com fade de entrada */}
      <div
        style={{
          opacity:    loaded ? 1 : 0,
          transform:  loaded ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.1s ease 0.2s, transform 1.1s ease 0.2s",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "1.2rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         t.accent,
            marginBottom:  "1.8rem",
          }}
        >
          <span style={{ display: "block", marginBottom: "0.4rem" }}>
            IFSC - USP
          </span>
          <span style={{ fontSize: "0.85rem" }}>
            D.S.S · Theoretical Physicist
          </span>
        </p>

        {/* Nome */}
        <h1
          style={{
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
            fontSize:      "clamp(3.2rem, 8vw, 7rem)",
            fontWeight:    700,
            lineHeight:    1.05,
            letterSpacing: "-0.01em",
            color:         t.text,
            marginBottom:  "1.6rem",
          }}
        >
          Davi
          <br />
          <span
            style={{
              background:           "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #c4b5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
            }}
          >
            Santos-Silva
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily:  "'Cormorant Garamond', serif",
            fontSize:    "clamp(1.1rem, 2.5vw, 1.55rem)",
            fontStyle:   "italic",
            fontWeight:  400,
            color:       dark ? "rgba(210,204,220,0.6)" : "rgba(28,24,48,0.5)",
            maxWidth:    "560px",
            margin:      "0 auto 3rem",
            lineHeight:  1.55,
          }}
        >
          "Where mathematics meets the hidden structure of reality — exploring
          entropy, complexity, and the equations beneath." - D.S.S.
        </p>

        {/* Botões CTA */}
        <div
          style={{
            display:        "flex",
            gap:            "1.2rem",
            justifyContent: "center",
            flexWrap:       "wrap",
          }}
        >
          <button
            onClick={() => setActive("Research")}
            style={{
              padding:       "0.78rem 2.2rem",
              background:    "linear-gradient(135deg, #7c3aed, #5b21b6)",
              border:        "none",
              borderRadius:  "2px",
              color:         "#f0ece6",
              fontFamily:    "'DM Sans', sans-serif",
              fontSize:      "0.8rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor:        "pointer",
              transition:    "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View Research
          </button>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding:        "0.78rem 2.2rem",
              background:     "transparent",
              border:         `1px solid ${t.border}`,
              borderRadius:   "2px",
              color:          t.textDim,
              fontFamily:     "'DM Sans', sans-serif",
              fontSize:       "0.8rem",
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              cursor:         "pointer",
              transition:     "border-color 0.2s, color 0.2s",
              textDecoration: "none",
              display:        "inline-flex",
              alignItems:     "center",
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
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator — lateral esquerdo, desaparece ao rolar */}
      <div
        style={{
          position:      "fixed",
          left:          "2.2rem",
          bottom:        "2.5rem",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "10px",
          opacity:       loaded && !scrolled ? 0.55 : 0,
          transition:    "opacity 0.6s ease",
          zIndex:        10,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "0.55rem",
            letterSpacing: "0.22em",
            color:         t.accentSolid,
            writingMode:   "vertical-rl",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width:      "1px",
            height:     "50px",
            background: `linear-gradient(to bottom, ${t.accentSolid}, transparent)`,
            animation:  "pulse 2s ease infinite",
          }}
        />
      </div>
    </div>
  );
}
