import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PAGE: Null Model of Uniform Fragmentation
// ─────────────────────────────────────────────────────────────────────────────
export default function UniformFragmentation({ t, setActive }) {
  return (
    <div
      style={{
        maxWidth:  "760px",
        margin:    "0 auto",
        padding:   "8rem 2rem 8rem",
        textAlign: "left",
      }}
    >
      <BackButton
        onClick={() => setActive("Research")}
        label="Back to Research"
        t={t}
      />

      <SectionHeader
        eyebrow="Stochastic Processes · 2025 · Completed"
        title="Null Model of Uniform Fragmentation"
        t={t}
      />

      <Section title="Abstract" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Substitua pelo abstract real */}
          This work studies the leading particle effect using statistical models
          and computational analysis of energy splitting processes...
        </p>
      </Section>

      <Section title="Motivation" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Escreva a motivação */}
          Describe the motivation here...
        </p>
      </Section>

      <Section title="Methodology" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Descreva a metodologia */}
          Describe methodology here...
        </p>
      </Section>

      <Section title="Results" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Coloque os resultados */}
          Describe the results here...
        </p>
      </Section>

      <Section title="Links" t={t}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <ExternalLink label="arXiv Preprint" url="#" t={t} />
          <ExternalLink label="GitHub Repository" url="#" t={t} />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children, t }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: t.textDim, marginBottom: "0.8rem" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function ExternalLink({ label, url, t }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", color: t.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = t.accentSolid)}
      onMouseLeave={(e) => (e.currentTarget.style.color = t.accent)}
    >
      <span style={{ width: "20px", height: "1px", background: "currentColor", display: "inline-block" }} />
      {label}
    </a>
  );
}

function bodyStyle(t) {
  return { fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: t.textMuted };
}
