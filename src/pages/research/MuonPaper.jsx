import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PAGE: Muon Puzzle & Leading Particle Effect
//
// Edite livremente o conteúdo abaixo.
// A estrutura (BackButton, SectionHeader, seções) pode ser reaproveitada
// em qualquer outra página de detalhe de research.
// ─────────────────────────────────────────────────────────────────────────────
export default function MuonPaper({ t, setActive }) {
  return (
    <div
      style={{
        maxWidth:  "760px",
        margin:    "0 auto",
        padding:   "8rem 2rem 8rem",
        textAlign: "left",
      }}
    >
      {/* Botão de voltar */}
      <BackButton
        onClick={() => setActive("Research")}
        label="Back to Research"
        t={t}
      />

      {/* Cabeçalho */}
      <SectionHeader
        eyebrow="High-Energy Astroparticle Physics · 2026 · In Progress"
        title="Muon Puzzle & Leading Particle Effect"
        t={t}
      />

      {/* Abstract */}
      <Section title="Abstract" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Substitua pelo abstract real */}
          Investigating how energy concentration in leader pions alters muon
          production in cosmic ray cascades. Write your abstract here...
        </p>
      </Section>

      {/* Motivação */}
      <Section title="Motivation" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Escreva a motivação do trabalho */}
          Describe the motivation and context of this research...
        </p>
      </Section>

      {/* Metodologia */}
      <Section title="Methodology" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Descreva a metodologia */}
          Describe your methodology here...
        </p>
      </Section>

      {/* Resultados */}
      <Section title="Results" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Coloque resultados aqui */}
          Work in progress...
        </p>
      </Section>

      {/* Links externos */}
      <Section title="Links" t={t}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {/* ↓ Adicione links para arXiv, GitHub, PDF, etc */}
          <ExternalLink label="arXiv Preprint" url="#" t={t} />
          <ExternalLink label="GitHub Repository" url="#" t={t} />
        </div>
      </Section>
    </div>
  );
}

// ─── Sub-componentes locais ───────────────────────────────────────────────────

function Section({ title, children, t }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h3
        style={{
          fontFamily:    "'Cormorant Garamond', serif",
          fontSize:      "1.2rem",
          fontWeight:    600,
          color:         t.textDim,
          marginBottom:  "0.8rem",
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function ExternalLink({ label, url, t }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily:     "'DM Mono', monospace",
        fontSize:       "0.72rem",
        letterSpacing:  "0.1em",
        color:          t.accent,
        textDecoration: "none",
        display:        "flex",
        alignItems:     "center",
        gap:            "8px",
        transition:     "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = t.accentSolid)}
      onMouseLeave={(e) => (e.currentTarget.style.color = t.accent)}
    >
      <span style={{ width: "20px", height: "1px", background: "currentColor", display: "inline-block" }} />
      {label}
    </a>
  );
}

function bodyStyle(t) {
  return {
    fontFamily: "'DM Sans', sans-serif",
    fontSize:   "0.95rem",
    lineHeight: 1.85,
    color:      t.textMuted,
  };
}
