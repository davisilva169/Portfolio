import { useState } from "react";
import Fade from "../components/Fade";
import SectionHeader from "../components/SectionHeader";
import { PROJECTS } from "../data/projects";

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD
// Desliza para a direita no hover.
// Ao clicar, navega para a página de detalhe via pageKey.
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, t, setActive }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => setActive(project.pageKey)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:      "1.8rem",
        background:   hovered ? t.bgCardHover : t.bgCard,
        border:       `1px solid ${hovered ? t.borderHover : t.border}`,
        borderRadius: "4px",
        position:     "relative",
        overflow:     "hidden",
        cursor:       "pointer",
        transform:    hovered ? "translateX(10px)" : "translateX(0)",
        boxShadow:    hovered ? t.cardShadow : "none",
        transition:   "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s, border 0.3s",
      }}
    >
      {/* Badge "Featured" */}
      {project.featured && (
        <div
          style={{
            position:      "absolute",
            top:           0,
            right:         0,
            background:    "linear-gradient(135deg, #7c3aed, #5b21b6)",
            padding:       "3px 12px",
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "0.58rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color:         "#e8e2d9",
          }}
        >
          Featured
        </div>
      )}

      {/* Título */}
      <h3
        style={{
          fontFamily:   "'Cormorant Garamond', serif",
          fontSize:     "1.25rem",
          fontWeight:   600,
          color:        hovered ? t.text : t.textDim,
          marginBottom: "0.7rem",
          transition:   "color 0.3s",
        }}
      >
        {project.title}
      </h3>

      {/* Descrição */}
      <p
        style={{
          fontFamily:   "'DM Sans', sans-serif",
          fontSize:     "0.83rem",
          lineHeight:   1.7,
          color:        t.textMuted,
          marginBottom: "1.2rem",
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      "0.62rem",
              letterSpacing: "0.08em",
              color:         t.accent,
              border:        `1px solid ${t.borderLeft}`,
              padding:       "3px 10px",
              borderRadius:  "1px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects({ t, setActive }) {
  const [featured, ...rest] = PROJECTS;

  return (
    <div
      style={{
        maxWidth:  "1000px",
        margin:    "0 auto",
        padding:   "8rem 2rem 6rem",
        textAlign: "left",
        overflow:  "visible",
      }}
    >
      <Fade>
        <SectionHeader eyebrow="Code & Simulations" title="Projects" t={t} />
      </Fade>

      {/* Card em destaque */}
      <Fade style={{ marginBottom: "1.2rem" }}>
        <ProjectCard project={featured} t={t} setActive={setActive} />
      </Fade>

      {/* Grid dos demais projetos */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap:                 "1.2rem",
        }}
      >
        {rest.map((p) => (
          <Fade key={p.id}>
            <ProjectCard project={p} t={t} setActive={setActive} />
          </Fade>
        ))}
      </div>
    </div>
  );
}
