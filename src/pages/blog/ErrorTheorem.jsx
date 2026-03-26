import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PAGE: The Error Theorem
//
// Esta é a página completa do post. Escreva o conteúdo do artigo nas seções
// abaixo. Cada <Section> vira um bloco com título e parágrafo(s).
// ─────────────────────────────────────────────────────────────────────────────
export default function ErrorTheorem({ t, setActive }) {
  return (
    <div
      style={{
        maxWidth:  "720px",
        margin:    "0 auto",
        padding:   "8rem 2rem 8rem",
        textAlign: "left",
      }}
    >
      {/* Botão de voltar */}
      <BackButton
        onClick={() => setActive("Blog")}
        label="Back to Blog"
        t={t}
      />

      {/* Metadados do post */}
      <div
        style={{
          display:      "flex",
          gap:          "1.5rem",
          alignItems:   "center",
          marginBottom: "2rem",
          flexWrap:     "wrap",
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t.accent }}>
          Probabilities
        </span>
        <span style={{ color: t.textMuted, fontSize: "0.7rem" }}>·</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: t.textMuted, letterSpacing: "0.08em" }}>
          March 2026
        </span>
        <span style={{ color: t.textMuted, fontSize: "0.7rem" }}>·</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: t.textMuted, letterSpacing: "0.08em" }}>
          9 min read
        </span>
      </div>

      {/* Título */}
      <SectionHeader
        eyebrow=""
        title="The Error Theorem: When Intuition Fails the Math"
        t={t}
      />

      {/* Conteúdo do post — edite livremente */}
      <Section t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Introdução */}
          Can we "hack" a multiple-choice test by trying to be wrong? This is
          the question I asked myself during a slow afternoon, and it led me
          down a rabbit hole of probability theory that I am still thinking
          about...
        </p>
      </Section>

      <Section title="The Setup" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Descreva o problema */}
          Imagine a multiple-choice test with 4 options per question. You have
          no idea about a particular answer. The naive strategy is to guess at
          random — giving you a 25% chance of being right...
        </p>
      </Section>

      <Section title="The Error Theorem" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Apresente o teorema */}
          My initial claim was that if you could reliably identify wrong
          answers, you could boost your success rate above 25%. Here is the
          formal statement...
        </p>
      </Section>

      <Section title="Where Intuition Fails" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Explique onde a intuição falha */}
          The cold reality of mathematical symmetry reveals a surprising
          invariance. No matter how you eliminate options, the underlying
          probability structure remains unchanged...
        </p>
      </Section>

      <Section title="What This Teaches Us" t={t}>
        <p style={bodyStyle(t)}>
          {/* ↓ Conclusão */}
          This small exercise is a reminder that probability is deeply
          counter-intuitive. The lesson is not just about multiple-choice tests
          — it is about how symmetry constrains what is possible...
        </p>
      </Section>
    </div>
  );
}

// ─── Sub-componentes locais ───────────────────────────────────────────────────

function Section({ title, children, t }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      {title && (
        <h3
          style={{
            fontFamily:   "'Cormorant Garamond', serif",
            fontSize:     "1.2rem",
            fontWeight:   600,
            color:        t.textDim,
            marginBottom: "0.8rem",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
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
