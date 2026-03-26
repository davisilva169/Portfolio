import { useState } from "react";
import Fade from "../components/Fade";
import SectionHeader from "../components/SectionHeader";
import { POSTS } from "../data/posts";

// ─────────────────────────────────────────────────────────────────────────────
// BLOG POST CARD
// Hover: apenas as letras iluminam — sem fundo, sem caixa, sem movimento.
// Ao clicar, navega para a página de detalhe via pageKey.
// ─────────────────────────────────────────────────────────────────────────────
function BlogPostCard({ post, t, setActive }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => setActive(post.pageKey)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:      "2.2rem 0",
        borderBottom: `1px solid ${t.border}`,
        cursor:       "pointer",
        background:   "transparent",
      }}
    >
      {/* Metadados */}
      <div
        style={{
          display:      "flex",
          gap:          "1.5rem",
          alignItems:   "center",
          marginBottom: "0.9rem",
          flexWrap:     "wrap",
        }}
      >
        <span
          style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color:         hovered ? t.accentSolid : t.accent,
            transition:    "color 0.25s",
          }}
        >
          {post.category}
        </span>
        <span style={{ color: t.textMuted, fontSize: "0.7rem" }}>·</span>
        <span
          style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "0.62rem",
            color:         t.textMuted,
            letterSpacing: "0.08em",
          }}
        >
          {post.date}
        </span>
        <span style={{ color: t.textMuted, fontSize: "0.7rem" }}>·</span>
        <span
          style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "0.62rem",
            color:         t.textMuted,
            letterSpacing: "0.08em",
          }}
        >
          {post.readTime} read
        </span>
      </div>

      {/* Título — ilumina no hover */}
      <h3
        style={{
          fontFamily:   "'Cormorant Garamond', serif",
          fontSize:     "1.55rem",
          fontWeight:   600,
          lineHeight:   1.3,
          marginBottom: "0.8rem",
          color:        hovered ? t.text : t.textDim,
          transition:   "color 0.25s",
        }}
      >
        {post.title}
      </h3>

      {/* Excerpt — também ilumina no hover */}
      <p
        style={{
          fontFamily:  "'DM Sans', sans-serif",
          fontSize:    "0.88rem",
          lineHeight:  1.75,
          maxWidth:    "640px",
          color:       hovered ? t.textDim : t.textMuted,
          transition:  "color 0.25s",
        }}
      >
        {post.excerpt}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Blog({ t, setActive }) {
  return (
    <div
      style={{
        maxWidth:  "760px",
        margin:    "0 auto",
        padding:   "8rem 2rem 6rem",
        textAlign: "left",
        overflow:  "visible",
      }}
    >
      <SectionHeader eyebrow="Writing & Ideas" title="Blog" t={t} />
      {POSTS.map((p) => (
        <Fade key={p.id}>
          <BlogPostCard post={p} t={t} setActive={setActive} />
        </Fade>
      ))}
    </div>
  );
}
