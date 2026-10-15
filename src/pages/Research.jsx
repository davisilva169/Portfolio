import { useI18n } from "../i18n/context";import { useState } from "react";
import Fade from "../components/Fade";
import SectionHeader from "../components/SectionHeader";
import { RESEARCH } from "../data/research";

// ─────────────────────────────────────────────────────────────────────────────
// RESEARCH CARD
// Desliza para a direita no hover.
// Ao clicar, navega para a página de detalhe via pageKey.
// ─────────────────────────────────────────────────────────────────────────────
function ResearchCard({ item, t, setActive }) {const { tr } = useI18n();
  const [hovered, setHovered] = useState(false);

  const statusColor = {
    "In Progress": t.accent,
    Published: t.success,
    Completed: t.success,
    Preprint: t.accent
  }[item.status] || t.accent;

  return (
    <div
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {if (event.key === "Enter") setActive(item.pageKey);}}
      onClick={() => setActive(item.pageKey)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2rem 2.2rem",
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        borderLeft: `3px solid ${hovered ? t.borderLeftHover : t.borderLeft}`,
        background: hovered ? t.bgCardHover : t.bgCard,
        borderRadius: "4px",
        cursor: "pointer",
        marginBottom: "1.2rem",
        transform: hovered ? "translateY(-2px)" : "translateX(0)",
        boxShadow: hovered ? t.cardShadow : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s, border 0.3s"
      }}>

      {/* Tag + ano + status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.9rem"
        }}>

        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: t.accent
          }}>

          {tr(item.tag)}
        </span>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              color: t.textMuted,
              letterSpacing: "0.1em"
            }}>

            {tr(item.year)}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: statusColor,
              border: `1px solid ${statusColor}44`,
              padding: "2px 8px",
              borderRadius: "2px"
            }}>

            {tr(item.status)}
          </span>
        </div>
      </div>

      {/* Título */}
      <h3
        style={{
          fontFamily: "Georgia, Cambria, serif",
          fontSize: "1.32rem",
          fontWeight: 600,
          color: hovered ? t.text : t.textDim,
          marginBottom: "0.75rem",
          lineHeight: 1.35,
          transition: "color 0.3s"
        }}>

        {tr(item.title)}
      </h3>

      {/* Excerpt */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          color: t.textMuted
        }}>

        {tr(item.excerpt)}
      </p>
    </div>);

}

// ─────────────────────────────────────────────────────────────────────────────
// RESEARCH PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Research({ t, setActive }) {const { tr } = useI18n();
  return (
    <div
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "8rem 2rem 6rem",
        textAlign: "left",
        overflow: "visible"
      }}>

      <Fade>
        <SectionHeader eyebrow={tr("Academic Work")} title={tr("Research")} t={t} />
      </Fade>
      {tr(RESEARCH.map((r) =>
      <Fade key={r.id}>
          <ResearchCard item={r} t={t} setActive={setActive} />
        </Fade>
      ))}
    </div>);

}
