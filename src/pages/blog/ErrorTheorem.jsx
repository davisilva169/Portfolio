import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   KaTeX via CDN  (loaded once)
───────────────────────────────────────────── */
function useMath() {
  const [ready, setReady] = useState(!!window.katex);
  useEffect(() => {
    if (window.katex) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);
  return ready;
}

function Math({ tex, display = false, color }) {
  const ref = useRef();
  const ready = useMath();
  useEffect(() => {
    if (!ready || !ref.current) return;
    window.katex.render(tex, ref.current, {
      displayMode: display,
      throwOnError: false,
    });
    if (color && ref.current) {
      ref.current.style.color = color;
    }
  }, [ready, tex, display, color]);
  return (
    <span
      ref={ref}
      style={{ display: display ? "block" : "inline-block", margin: display ? "1.4rem auto" : "0 2px" }}
    />
  );
}

/* ─────────────────────────────────────────────
   Sregor Gamsa — insect illustration in SVG
───────────────────────────────────────────── */
function InsectIllustration({ theme }) {
  const accent = theme?.accent || "#a78bfa";
  const bg = theme?.cardBg || "#0f0f18";
  return (
    <svg
      viewBox="0 0 340 260"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340, filter: "drop-shadow(0 8px 32px rgba(167,139,250,0.18))" }}
    >
      {/* Background glow */}
      <ellipse cx="170" cy="200" rx="120" ry="30" fill={accent} opacity="0.07" />

      {/* Bed / floor suggestion */}
      <rect x="30" y="195" width="280" height="8" rx="4" fill={accent} opacity="0.18" />
      <rect x="20" y="200" width="300" height="50" rx="6" fill={accent} opacity="0.07" />

      {/* Body (on back) */}
      <ellipse cx="170" cy="185" rx="62" ry="28" fill="#1a1030" stroke={accent} strokeWidth="1.5" />

      {/* Abdomen segments */}
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={i}
          cx={170}
          cy={178 + i * 9}
          rx={54 - i * 5}
          ry={5}
          fill="none"
          stroke={accent}
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}

      {/* Head */}
      <ellipse cx="170" cy="157" rx="22" ry="18" fill="#1a1030" stroke={accent} strokeWidth="1.5" />

      {/* Eyes — wide open staring at ceiling */}
      <circle cx="162" cy="154" r="5" fill={bg} stroke={accent} strokeWidth="1" />
      <circle cx="178" cy="154" r="5" fill={bg} stroke={accent} strokeWidth="1" />
      <circle cx="162" cy="154" r="2.5" fill={accent} opacity="0.9" />
      <circle cx="178" cy="154" r="2.5" fill={accent} opacity="0.9" />
      <circle cx="163" cy="153" r="1" fill="white" opacity="0.6" />
      <circle cx="179" cy="153" r="1" fill="white" opacity="0.6" />

      {/* Antennae */}
      <path d="M158 145 Q140 120 120 108" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M182 145 Q200 120 220 108" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.8" />
      <circle cx="120" cy="108" r="3" fill={accent} opacity="0.6" />
      <circle cx="220" cy="108" r="3" fill={accent} opacity="0.6" />

      {/* Legs — 6 legs flailing upward */}
      {/* Left legs */}
      <path d="M130 178 Q95 158 75 142" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M120 188 Q80 178 55 165" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M125 198 Q90 200 68 210" stroke={accent} strokeWidth="1.4" fill="none" />
      {/* Right legs */}
      <path d="M210 178 Q245 158 265 142" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M220 188 Q260 178 285 165" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M215 198 Q250 200 272 210" stroke={accent} strokeWidth="1.4" fill="none" />

      {/* Clock on dresser — top right */}
      <rect x="255" y="105" width="55" height="55" rx="5" fill="#0d0d18" stroke={accent} strokeWidth="1" opacity="0.9" />
      <circle cx="282" cy="132" r="18" fill="#0a0a14" stroke={accent} strokeWidth="1" />
      {/* Clock hands — almost late */}
      <line x1="282" y1="132" x2="282" y2="118" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="282" y1="132" x2="293" y2="136" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <circle cx="282" cy="132" r="2" fill={accent} />
      {/* Tick marks */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = 282 + 15 * Math.cos(a);
        const y1 = 132 + 15 * Math.sin(a);
        const x2 = 282 + 17 * Math.cos(a);
        const y2 = 132 + 17 * Math.sin(a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="0.8" opacity="0.5" />;
      })}

      {/* Floating question marks */}
      {["?", "?", "?"].map((c, i) => (
        <text
          key={i}
          x={[55, 170, 295][i]}
          y={[80, 55, 75][i]}
          fontSize={[22, 28, 18][i]}
          fill={accent}
          opacity={[0.3, 0.5, 0.25][i]}
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          {c}
        </text>
      ))}

      {/* Floating formula fragments */}
      <text x="40" y="130" fontSize="11" fill={accent} opacity="0.35" fontFamily="monospace">
        P = 1/n
      </text>
      <text x="240" y="80" fontSize="10" fill={accent} opacity="0.25" fontFamily="monospace">
        P(C₂|E₁)=1/(n-1)
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Animated probability tree
───────────────────────────────────────────── */
function ProbTree({ theme }) {
  const accent = theme?.accent || "#a78bfa";
  const dim = "rgba(167,139,250,0.25)";
  const red = "#f87171";
  const green = "#34d399";

  return (
    <svg viewBox="0 0 500 300" style={{ width: "100%", maxWidth: 500 }}>
      {/* Root */}
      <circle cx="250" cy="30" r="16" fill="#1a1030" stroke={accent} strokeWidth="1.5" />
      <text x="250" y="35" textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace">
        start
      </text>

      {/* Branch: E1 (wrong first) */}
      <line x1="250" y1="46" x2="130" y2="120" stroke={accent} strokeWidth="1.2" strokeDasharray="4 2" />
      <text x="165" y="88" fontSize="10" fill={dim} textAnchor="middle" fontFamily="monospace">
        P(E₁)=(n-1)/n
      </text>

      {/* Branch: C1 (correct first — fatal) */}
      <line x1="250" y1="46" x2="370" y2="120" stroke={red} strokeWidth="1.2" strokeDasharray="4 2" opacity="0.7" />
      <text x="335" y="88" fontSize="10" fill={red} textAnchor="middle" fontFamily="monospace" opacity="0.8">
        P(C₁)=1/n
      </text>

      {/* E1 node */}
      <circle cx="130" cy="130" r="16" fill="#1a1030" stroke={accent} strokeWidth="1.5" />
      <text x="130" y="135" textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">
        E₁
      </text>

      {/* C1 node — dead end */}
      <circle cx="370" cy="130" r="16" fill="#1a1030" stroke={red} strokeWidth="1.5" opacity="0.8" />
      <text x="370" y="135" textAnchor="middle" fontSize="10" fill={red} fontFamily="monospace" opacity="0.9">
        C₁
      </text>

      {/* From E1: second guess */}
      <line x1="130" y1="146" x2="80" y2="220" stroke={green} strokeWidth="1.2" strokeDasharray="4 2" />
      <line x1="130" y1="146" x2="180" y2="220" stroke={red} strokeWidth="1.2" strokeDasharray="4 2" opacity="0.5" />

      <text x="90" y="188" fontSize="9" fill={green} textAnchor="middle" fontFamily="monospace">
        1/(n-1)
      </text>
      <text x="175" y="188" fontSize="9" fill={red} textAnchor="middle" fontFamily="monospace" opacity="0.7">
        (n-2)/(n-1)
      </text>

      {/* From C1: dead end */}
      <line x1="370" y1="146" x2="370" y2="210" stroke={red} strokeWidth="1" opacity="0.4" />
      <text x="370" y="230" textAnchor="middle" fontSize="10" fill={red} fontFamily="monospace" opacity="0.7">
        P=0
      </text>

      {/* Leaf nodes */}
      <circle cx="80" cy="235" r="14" fill="#0d1f15" stroke={green} strokeWidth="1.5" />
      <text x="80" y="239" textAnchor="middle" fontSize="10" fill={green} fontFamily="monospace">
        ✓ C₂
      </text>
      <circle cx="180" cy="235" r="14" fill="#1f0d0d" stroke={red} strokeWidth="1.5" opacity="0.7" />
      <text x="180" y="239" textAnchor="middle" fontSize="10" fill={red} fontFamily="monospace" opacity="0.8">
        ✗
      </text>

      {/* Total probability annotation */}
      <rect x="280" y="210" width="185" height="55" rx="6" fill="#0d0d18" stroke={accent} strokeWidth="1" opacity="0.8" />
      <text x="372" y="229" textAnchor="middle" fontSize="10" fill={dim} fontFamily="monospace">
        total success:
      </text>
      <text x="372" y="247" textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace">
        (n-1)/n · 1/(n-1) = 1/n
      </text>
      <text x="372" y="260" textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace" fontWeight="bold">
        = same as before
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Fade-in on scroll
───────────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Highlighted formula block
───────────────────────────────────────────── */
function FormulaBlock({ children, label, highlight }) {
  const colors = {
    purple: { border: "#a78bfa", bg: "rgba(167,139,250,0.06)", glow: "rgba(167,139,250,0.15)" },
    green:  { border: "#34d399", bg: "rgba(52,211,153,0.06)",  glow: "rgba(52,211,153,0.12)" },
    red:    { border: "#f87171", bg: "rgba(248,113,113,0.06)", glow: "rgba(248,113,113,0.12)" },
    gold:   { border: "#fbbf24", bg: "rgba(251,191,36,0.06)",  glow: "rgba(251,191,36,0.12)" },
  };
  const c = colors[highlight] || colors.purple;
  return (
    <div style={{
      margin: "2rem 0",
      padding: "1.5rem 2rem",
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.border}`,
      borderRadius: "0 8px 8px 0",
      boxShadow: `0 0 24px ${c.glow}`,
      position: "relative",
    }}>
      {label && (
        <span style={{
          position: "absolute", top: "-11px", left: "16px",
          background: c.border, color: "#06060a",
          fontSize: "0.65rem", fontFamily: "'DM Mono', monospace",
          padding: "2px 10px", borderRadius: "20px", letterSpacing: "0.1em",
          textTransform: "uppercase", fontWeight: 700,
        }}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section divider
───────────────────────────────────────────── */
function Divider({ accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "3rem 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${accent}44)` }} />
      <span style={{ color: accent, fontSize: "1.2rem", opacity: 0.5 }}>◆</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${accent}44)` }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Pull-quote
───────────────────────────────────────────── */
function Pullquote({ children, accent }) {
  return (
    <blockquote style={{
      margin: "2.5rem 0",
      padding: "1.5rem 2rem",
      borderLeft: `3px solid ${accent}`,
      background: `linear-gradient(to right, ${accent}10, transparent)`,
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.3rem",
      fontStyle: "italic",
      color: "#e2d9f3",
      lineHeight: 1.6,
    }}>
      {children}
    </blockquote>
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function ErrorTheorem({ t, setActive }) {
  const theme = t || {};
  const accent = theme.accent || "#a78bfa";
  const bg = theme.bg || "#06060a";
  const text = theme.text || "#e2d9f3";
  const cardBg = theme.cardBg || "#0f0f18";
  const subtext = theme.subtext || "#9d8ec0";
  const isDark = bg === "#06060a" || bg?.startsWith("#0");

  const styles = {
    page: {
      minHeight: "100vh",
      background: bg,
      color: text,
      fontFamily: "'DM Sans', sans-serif",
      padding: "0 0 6rem",
    },
    hero: {
      position: "relative",
      padding: "5rem 2rem 4rem",
      textAlign: "center",
      overflow: "hidden",
    },
    heroGlow: {
      position: "absolute", inset: 0,
      background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${accent}18 0%, transparent 70%)`,
      pointerEvents: "none",
    },
    tag: {
      display: "inline-block",
      background: `${accent}20`,
      color: accent,
      border: `1px solid ${accent}44`,
      borderRadius: "20px",
      padding: "4px 16px",
      fontSize: "0.72rem",
      fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: "1.5rem",
    },
    title: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "clamp(2.8rem, 6vw, 5rem)",
      fontWeight: 700,
      lineHeight: 1.05,
      marginBottom: "1.5rem",
      background: `linear-gradient(135deg, ${text} 40%, ${accent})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "1.05rem",
      color: subtext,
      maxWidth: 560,
      margin: "0 auto 2rem",
      lineHeight: 1.7,
      fontStyle: "italic",
    },
    meta: {
      display: "flex", gap: "2rem", justifyContent: "center",
      fontSize: "0.78rem", color: subtext,
      fontFamily: "'DM Mono', monospace",
    },
    content: {
      maxWidth: 720,
      margin: "0 auto",
      padding: "0 2rem",
    },
    sectionLabel: {
      display: "inline-block",
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.68rem",
      color: accent,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      marginBottom: "0.5rem",
      opacity: 0.8,
    },
    h2: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
      fontWeight: 700,
      color: text,
      margin: "0 0 1.2rem",
      lineHeight: 1.2,
    },
    p: {
      fontSize: "1.02rem",
      lineHeight: 1.85,
      color: isDark ? "#ccc0e0" : "#3a2a5a",
      margin: "0 0 1.2rem",
    },
    theoremBox: {
      margin: "3rem 0",
      padding: "2rem 2.5rem",
      background: `linear-gradient(135deg, ${accent}12, ${accent}06)`,
      border: `1px solid ${accent}55`,
      borderRadius: "12px",
      boxShadow: `0 0 40px ${accent}18, inset 0 1px 0 ${accent}22`,
      position: "relative",
      overflow: "hidden",
    },
    theoremGlow: {
      position: "absolute", top: 0, right: 0,
      width: 200, height: 200,
      background: `radial-gradient(circle, ${accent}20, transparent 70%)`,
      pointerEvents: "none",
    },
    illBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      margin: "3rem 0",
      padding: "2rem",
      background: cardBg,
      borderRadius: 12,
      border: `1px solid ${accent}22`,
    },
    caption: {
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.72rem",
      color: subtext,
      textAlign: "center",
      letterSpacing: "0.06em",
    },
    backBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "10px 20px",
      background: `${accent}15`,
      border: `1px solid ${accent}44`,
      borderRadius: 8,
      color: accent,
      cursor: "pointer",
      fontSize: "0.85rem",
      fontFamily: "'DM Mono', monospace",
      marginBottom: "3rem",
      transition: "background 0.2s",
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroGlow} />
        <Reveal>
          <div style={{ marginBottom: "2rem" }}>
            <button
              style={styles.backBtn}
              onClick={() => setActive("Blog")}
              onMouseEnter={e => e.currentTarget.style.background = `${accent}28`}
              onMouseLeave={e => e.currentTarget.style.background = `${accent}15`}
            >
              ← back to blog
            </button>
          </div>
          <div style={styles.tag}>Essay · Probability · Literature</div>
          <h1 style={styles.title}>The Error Theorem</h1>
          <p style={styles.subtitle}>
            An experiment between literature and mathematics — on absurdity, multiple choice,
            and the dangerous difference between information and hope.
          </p>
          <div style={styles.meta}>
            <span>Davi Silva</span>
            <span>·</span>
            <span>March 2026</span>
            <span>·</span>
            <span>~10 min read</span>
          </div>
        </Reveal>
      </div>

      <div style={styles.content}>

        {/* ── §1 Introduction ── */}
        <Reveal>
          <Divider accent={accent} />
          <div style={styles.sectionLabel}>§ 1 — Introduction</div>
          <h2 style={styles.h2}>Imagine.</h2>
          <p style={styles.p}>
            One morning, after waking from troubled dreams and still trapped in bed, Sregor Gamsa
            discovered that he had been transformed into a monstrous insect.
          </p>
        </Reveal>

        {/* Sregor illustration */}
        <Reveal delay={0.1}>
          <div style={styles.illBox}>
            <InsectIllustration theme={{ accent, cardBg: bg }} />
            <p style={styles.caption}>
              Fig. 0 — Sregor Gamsa contemplating the ceiling and the exam he will not attend.
              <br />The clock disagrees with his situation.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p style={styles.p}>
            Lying on his back, he looked at the clock ticking on the dresser and felt, with the
            clarity of a mathematical punishment, that he was already late. But that was not the
            worst of his problems.
          </p>
          <p style={styles.p}>
            His real problem was different: that morning there would be a multiple-choice exam in
            Statistics VI.
          </p>
          <p style={styles.p}>
            He tried to move. He could not. He tried to convince himself that the world might show
            some compassion toward the metamorphosed. That also failed.
          </p>

          <Pullquote accent={accent}>
            "If I am going to get almost everything wrong by chance, maybe I can find a way
            to be wrong more intelligently."
          </Pullquote>

          <p style={styles.p}>
            He stared at the ceiling as if staring at a cursed system of equations. The first
            intuition was simple: in a question with four alternatives, if he knew nothing, his
            chance of success was only <Math tex="\tfrac{1}{4}" color={accent} />. Therefore, if he
            could eliminate one option, his chance would rise to <Math tex="\tfrac{1}{3}" color="#34d399" />.
          </p>
          <p style={styles.p}>
            But the human mind is a strange machine. It does not content itself with noticing that
            chance improves when there is information.
          </p>
          <p style={styles.p}>
            Thus was born — or perhaps merely revealed — what we call here the{" "}
            <em style={{ color: accent }}>Error Theorem</em>.
          </p>
        </Reveal>

        {/* ── §2 The Problem ── */}
        <Reveal>
          <Divider accent={accent} />
          <div style={styles.sectionLabel}>§ 2 — The Problem</div>
          <h2 style={styles.h2}>Where intuition betrays us.</h2>
          <p style={styles.p}>
            Consider a multiple-choice question with <Math tex="n" color={accent} /> alternatives,
            exactly one of which is correct. Under symmetry, the probability of a correct guess is:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock label="baseline" highlight="purple">
            <Math tex="P(\text{correct}) = \dfrac{1}{n}" display />
            <p style={{ ...styles.p, fontSize: "0.88rem", margin: 0, color: subtext }}>
              For <Math tex="n = 4" color={accent} />, this gives <Math tex="\frac{1}{4}" color={accent} />.
            </p>
          </FormulaBlock>
        </Reveal>

        <Reveal>
          <p style={styles.p}>
            The problem arises when Sregor imagines the following procedure: (1) choose one
            alternative at random; (2) eliminate it; (3) choose again from the remaining ones.
          </p>
          <p style={styles.p}>
            At first glance, this seems advantageous — the new problem has only <Math tex="n-1" color={accent} />{" "}
            options, suggesting a probability of <Math tex="\frac{1}{n-1}" color="#34d399" />. For <Math tex="n=4" color={accent} />,
            this appears to be an improvement from <Math tex="\frac{1}{4}" color="#f87171" /> to <Math tex="\frac{1}{3}" color="#34d399" />.
          </p>

          <Pullquote accent="#f87171">
            But this is exactly where intuition betrays us.
          </Pullquote>

          <p style={styles.p}>
            The reduction from <Math tex="n" color={accent} /> to <Math tex="n-1" color={accent} /> alternatives
            did not come from real information about the correct answer. It came from a previous
            random choice. The problem was not simplified — it was merely reorganized into
            conditioned stages.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={styles.p}>Define the events:</p>
          <FormulaBlock highlight="purple" label="definitions">
            <ul style={{ margin: 0, padding: "0 0 0 1.2rem", color: subtext, lineHeight: 2.2 }}>
              <li><Math tex="E_1" color={accent} /> — first guess is <strong style={{ color: "#f87171" }}>wrong</strong></li>
              <li><Math tex="C_1" color={accent} /> — first guess is <strong style={{ color: "#34d399" }}>correct</strong></li>
              <li><Math tex="C_2" color={accent} /> — second guess is <strong style={{ color: "#34d399" }}>correct</strong></li>
            </ul>
          </FormulaBlock>
        </Reveal>

        <Reveal>
          <p style={styles.p}>
            The second guess can only be analyzed conditional on the result of the first:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock label="if first was wrong" highlight="green">
            <Math tex="P(C_2 \mid E_1) = \dfrac{1}{n-1}" display color="#34d399" />
            <p style={{ ...styles.p, fontSize: "0.88rem", margin: 0, color: subtext }}>
              One correct answer remains among <Math tex="n-1" color={accent} /> alternatives.
            </p>
          </FormulaBlock>

          <FormulaBlock label="if first was correct — fatal" highlight="red">
            <Math tex="P(C_2 \mid C_1) = 0" display color="#f87171" />
            <p style={{ ...styles.p, fontSize: "0.88rem", margin: 0, color: subtext }}>
              The correct alternative was eliminated. No recovery possible.
            </p>
          </FormulaBlock>
        </Reveal>

        <Reveal>
          <p style={styles.p}>Now apply the law of total probability:</p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock label="total probability" highlight="gold">
            <Math
              tex="P(C_2) = \underbrace{P(E_1)}_{\displaystyle\frac{n-1}{n}} \cdot \underbrace{P(C_2 \mid E_1)}_{\displaystyle\frac{1}{n-1}} \;+\; \underbrace{P(C_1)}_{\displaystyle\frac{1}{n}} \cdot \underbrace{P(C_2 \mid C_1)}_{\displaystyle 0}"
              display
            />
            <Math tex="P(C_2) = \dfrac{1}{n}" display color="#fbbf24" />
          </FormulaBlock>
        </Reveal>

        {/* Probability tree */}
        <Reveal delay={0.1}>
          <div style={styles.illBox}>
            <ProbTree theme={{ accent, cardBg }} />
            <p style={styles.caption}>
              Fig. 1 — Probability tree for the two-guess procedure.<br />
              The green path gains, the red path destroys — they cancel perfectly.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p style={styles.p}>
            The apparent advantage exists only within the subset of cases where the first guess
            was wrong. But there is a probability of <Math tex="\frac{1}{n}" color={accent} /> that
            the first guess eliminates precisely the correct alternative — making success impossible.
            This case cancels the apparent gain.
          </p>

          <Pullquote accent={accent}>
            Seeming to reduce the problem is not the same as reducing uncertainty.
          </Pullquote>

          <p style={styles.p}>
            The system did not become smaller because it knew more. It became smaller because a
            random choice had already been made.
          </p>
        </Reveal>

        {/* ── §3 The Theorem ── */}
        <Reveal>
          <Divider accent={accent} />
          <div style={styles.sectionLabel}>§ 3 — The Error Theorem</div>
          <h2 style={styles.h2}>The theorem, stated precisely.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={styles.theoremBox}>
            <div style={styles.theoremGlow} />
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              color: accent,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}>
              Theorem 1 — Error Theorem
            </p>
            <p style={{ ...styles.p, fontStyle: "italic", marginBottom: "1.2rem" }}>
              In a multiple-choice problem with <Math tex="n" color={accent} /> equiprobable
              alternatives, eliminating one option changes the probability of success{" "}
              <strong style={{ color: accent }}>if and only if</strong> that elimination is
              informative — that is, if it carries some correlation with the correct answer.
            </p>
            <p style={{ ...styles.p, marginBottom: "0.5rem" }}>
              If the elimination occurs at random, or without any knowledge of which alternative is
              true, then there is no real probabilistic gain:
            </p>
            <Math tex="P = \dfrac{1}{n}" display color={accent} />
            <p style={{ ...styles.p, margin: 0, fontSize: "0.9rem", color: subtext }}>
              The apparent transition from <Math tex="n" color={accent} /> to <Math tex="n-1" color={subtext} />{" "}
              alternatives does not, by itself, constitute a reduction of uncertainty — it does so
              only when it introduces new information.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p style={styles.p}>
            The mind tends to confuse two distinct situations:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1.5rem 0" }}>
            <FormulaBlock highlight="green" label="case 1 — informative">
              <p style={{ ...styles.p, margin: 0, fontSize: "0.9rem" }}>
                An alternative is eliminated because <strong style={{ color: "#34d399" }}>something was learned</strong>.
                The space of possibilities <em>really</em> is reduced.
              </p>
            </FormulaBlock>
            <FormulaBlock highlight="red" label="case 2 — random">
              <p style={{ ...styles.p, margin: 0, fontSize: "0.9rem" }}>
                The elimination is only a consequence of a <strong style={{ color: "#f87171" }}>previous guess</strong>.
                The problem was not simplified — merely reorganized.
              </p>
            </FormulaBlock>
          </div>

          <Pullquote accent={accent}>
            The first operation can change the mathematics.
            The second changes only the narrative.
          </Pullquote>
        </Reveal>

        {/* ── §4 Formal View ── */}
        <Reveal>
          <Divider accent={accent} />
          <div style={styles.sectionLabel}>§ 4 — A Formal View</div>
          <h2 style={styles.h2}>In the language of probability.</h2>
          <p style={styles.p}>
            Let <Math tex="\Omega = \{1, 2, \dots, n\}" color={accent} /> be the set of possible
            alternatives, and let <Math tex="I" color={accent} /> be the random variable indicating
            the correct one. Assume a uniform prior:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock highlight="purple" label="prior">
            <Math tex="P(I = i) = \dfrac{1}{n}, \quad i \in \Omega" display />
          </FormulaBlock>

          <p style={styles.p}>
            The central question: does an elimination event <Math tex="E" color={accent} /> carry
            information about <Math tex="I" color={accent} />?
          </p>

          <FormulaBlock highlight="green" label="if E is informative">
            <Math
              tex="P(I = i \mid E) = \dfrac{1}{n-1}, \quad i \neq k"
              display
              color="#34d399"
            />
          </FormulaBlock>

          <FormulaBlock highlight="red" label="if E is independent of I">
            <Math
              tex="P(I = i \mid E) = P(I = i) = \dfrac{1}{n}"
              display
              color="#f87171"
            />
            <p style={{ ...styles.p, fontSize: "0.85rem", margin: 0, color: subtext }}>
              By Bayes: since <Math tex="E \perp I" />, we have{" "}
              <Math tex="P(E \mid I=i) = P(E)" />, so the prior is unchanged.
            </p>
          </FormulaBlock>
        </Reveal>

        {/* ── §5 Quantum ── */}
        <Reveal>
          <Divider accent={accent} />
          <div style={styles.sectionLabel}>§ 5 — A Quantum Information Perspective</div>
          <h2 style={styles.h2}>When mechanics makes the distinction unavoidable.</h2>
          <p style={styles.p}>
            The conceptual structure of the Error Theorem finds a natural parallel in Quantum
            Information Theory. In quantum mechanics, the state of a system is described by a
            vector <Math tex="|\psi\rangle" color={accent} /> in a Hilbert space.
          </p>
          <p style={styles.p}>
            Consider a quantum system prepared in a uniform superposition of <Math tex="n" color={accent} />{" "}
            orthonormal states:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock highlight="purple" label="quantum superposition">
            <Math
              tex="|\psi\rangle = \dfrac{1}{\sqrt{n}} \sum_{i=1}^{n} |i\rangle"
              display
            />
            <p style={{ ...styles.p, fontSize: "0.88rem", margin: 0, color: subtext }}>
              The probability of outcome <Math tex="i" color={accent} /> is{" "}
              <Math tex="P(i) = \frac{1}{n}" color={accent} /> — perfect analogy with the classical
              problem.
            </p>
          </FormulaBlock>
        </Reveal>

        <Reveal>
          <p style={styles.p}>
            If we perform an <strong style={{ color: "#34d399" }}>informative projective measurement</strong> that
            discards state <Math tex="|k\rangle" color={accent} />, the system collapses to:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock highlight="green" label="after informative measurement">
            <Math
              tex="|\psi'\rangle = \dfrac{1}{\sqrt{n-1}} \sum_{i \neq k} |i\rangle"
              display
              color="#34d399"
            />
            <Math
              tex="P(i \mid \text{elim. of } k) = \dfrac{1}{n-1}, \quad i \neq k"
              display
              color="#34d399"
            />
          </FormulaBlock>
        </Reveal>

        <Reveal>
          <p style={styles.p}>
            But if the operation is independent of the observable of interest — a random loss or an
            uncorrelated filtering — the effective density matrix contains no new information:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock highlight="red" label="uncorrelated operation">
            <Math tex="P(i \mid E) = \dfrac{1}{n}" display color="#f87171" />
          </FormulaBlock>

          <div style={{
            margin: "2rem 0",
            padding: "1.5rem 2rem",
            background: `${accent}08`,
            borderRadius: 10,
            border: `1px solid ${accent}33`,
          }}>
            <p style={{ ...styles.p, margin: "0 0 0.8rem", fontWeight: 600, color: accent }}>
              The central distinction:
            </p>
            <ul style={{ margin: 0, padding: "0 0 0 1.2rem", lineHeight: 2 }}>
              <li style={{ color: "#34d399" }}>
                Nonzero <strong>mutual information</strong> with the observable → reduces entropy
              </li>
              <li style={{ color: "#f87171" }}>
                <strong>Independent</strong> operation → does not alter relevant entropy, even if
                state space shrinks
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <Pullquote accent={accent}>
            Not every reduction of the state space reduces uncertainty about an observable.
          </Pullquote>

          <p style={styles.p}>
            In both Sregor Gamsa's problem and the quantum setting, the error lies in confusing{" "}
            <strong style={{ color: "#f87171" }}>structural reduction of the space</strong> with{" "}
            <strong style={{ color: "#34d399" }}>informational reduction of uncertainty</strong>.
          </p>

          <Pullquote accent={accent}>
            It is not the transformation of the system that generates information, but the
            correlation between that transformation and what one wishes to know.
          </Pullquote>

          <p style={styles.p}>
            Quantum mechanics merely makes this distinction unavoidable. It forces us to recognize
            that information is not a property of what we do to the system, but of what we are able
            to infer from it.
          </p>
        </Reveal>

        {/* End card */}
        <Reveal delay={0.15}>
          <Divider accent={accent} />
          <div style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${accent}0d, transparent)`,
            borderRadius: 16,
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.5rem",
              fontStyle: "italic",
              color: subtext,
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}>
              And Sregor Gamsa? He never made it to the exam.
              <br />
              But he had solved a more interesting problem.
            </p>
            <button
              style={styles.backBtn}
              onClick={() => setActive("Blog")}
              onMouseEnter={e => e.currentTarget.style.background = `${accent}28`}
              onMouseLeave={e => e.currentTarget.style.background = `${accent}15`}
            >
              ← back to blog
            </button>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
