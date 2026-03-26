import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   KaTeX loader — isolado do React
───────────────────────────────────────────── */
let katexReady = false;
let katexCallbacks = [];

function loadKatex(cb) {
  if (katexReady) { cb(); return; }
  katexCallbacks.push(cb);
  if (document.getElementById("katex-script")) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.id = "katex-script";
  script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
  script.onload = () => {
    katexReady = true;
    katexCallbacks.forEach((fn) => fn());
    katexCallbacks = [];
  };
  script.onerror = () => { katexCallbacks = []; };
  document.head.appendChild(script);
}

/* ─────────────────────────────────────────────
   Componente Tex (sem conflito com Math global)
───────────────────────────────────────────── */
function Tex({ tex, display, color }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(katexReady);

  useEffect(() => {
    if (ready) return;
    loadKatex(() => setReady(true));
  }, [ready]);

  useEffect(() => {
    if (!ready || !ref.current || !tex) return;
    try {
      window.katex.render(tex, ref.current, {
        displayMode: !!display,
        throwOnError: false,
      });
      if (color) ref.current.style.color = color;
    } catch (_) {}
  }, [ready, tex, display, color]);

  const spanStyle = display
    ? { display: "block", margin: "1.4rem auto", textAlign: "center" }
    : { display: "inline-block", margin: "0 2px" };

  if (!ready) {
    return (
      <span style={{
        ...spanStyle,
        fontFamily: "'Courier New', monospace",
        fontSize: display ? "1.05rem" : "0.9em",
        color: color || "inherit",
        opacity: 0.85,
      }}>
        {tex}
      </span>
    );
  }

  return <span ref={ref} style={spanStyle} />;
}

/* ─────────────────────────────────────────────
   Sregor Gamsa — SVG (usando globalThis.Math)
───────────────────────────────────────────── */
function InsectIllustration({ accent, bgColor }) {
  const G = globalThis.Math;
  const ticks = [0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
    const a = (i / 12) * G.PI * 2 - G.PI / 2;
    return { x1: 282 + 15*G.cos(a), y1: 132 + 15*G.sin(a),
             x2: 282 + 17*G.cos(a), y2: 132 + 17*G.sin(a) };
  });

  return (
    <svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340,
        filter: "drop-shadow(0 8px 32px rgba(167,139,250,0.18))" }}>
      <ellipse cx="170" cy="200" rx="120" ry="30" fill={accent} opacity="0.07" />
      <rect x="30" y="195" width="280" height="8" rx="4" fill={accent} opacity="0.18" />
      <rect x="20" y="200" width="300" height="50" rx="6" fill={accent} opacity="0.07" />
      <ellipse cx="170" cy="185" rx="62" ry="28" fill="#1a1030" stroke={accent} strokeWidth="1.5" />
      {[0,1,2,3].map((i) => (
        <ellipse key={i} cx={170} cy={178+i*9} rx={54-i*5} ry={5}
          fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
      ))}
      <ellipse cx="170" cy="157" rx="22" ry="18" fill="#1a1030" stroke={accent} strokeWidth="1.5" />
      <circle cx="162" cy="154" r="5" fill={bgColor} stroke={accent} strokeWidth="1" />
      <circle cx="178" cy="154" r="5" fill={bgColor} stroke={accent} strokeWidth="1" />
      <circle cx="162" cy="154" r="2.5" fill={accent} opacity="0.9" />
      <circle cx="178" cy="154" r="2.5" fill={accent} opacity="0.9" />
      <circle cx="163" cy="153" r="1" fill="white" opacity="0.6" />
      <circle cx="179" cy="153" r="1" fill="white" opacity="0.6" />
      <path d="M158 145 Q140 120 120 108" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.8" />
      <path d="M182 145 Q200 120 220 108" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.8" />
      <circle cx="120" cy="108" r="3" fill={accent} opacity="0.6" />
      <circle cx="220" cy="108" r="3" fill={accent} opacity="0.6" />
      <path d="M130 178 Q95 158 75 142" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M120 188 Q80 178 55 165" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M125 198 Q90 200 68 210" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M210 178 Q245 158 265 142" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M220 188 Q260 178 285 165" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M215 198 Q250 200 272 210" stroke={accent} strokeWidth="1.4" fill="none" />
      <rect x="255" y="105" width="55" height="55" rx="5" fill="#0d0d18" stroke={accent} strokeWidth="1" opacity="0.9" />
      <circle cx="282" cy="132" r="18" fill="#0a0a14" stroke={accent} strokeWidth="1" />
      <line x1="282" y1="132" x2="282" y2="118" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="282" y1="132" x2="293" y2="136" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <circle cx="282" cy="132" r="2" fill={accent} />
      {ticks.map((tk, i) => (
        <line key={i} x1={tk.x1} y1={tk.y1} x2={tk.x2} y2={tk.y2}
          stroke={accent} strokeWidth="0.8" opacity="0.5" />
      ))}
      <text x="55"  y="80" fontSize="22" fill={accent} opacity="0.30" fontFamily="Georgia, serif" fontStyle="italic">?</text>
      <text x="170" y="55" fontSize="28" fill={accent} opacity="0.50" fontFamily="Georgia, serif" fontStyle="italic">?</text>
      <text x="295" y="75" fontSize="18" fill={accent} opacity="0.25" fontFamily="Georgia, serif" fontStyle="italic">?</text>
      <text x="40"  y="130" fontSize="11" fill={accent} opacity="0.35" fontFamily="monospace">P = 1/n</text>
      <text x="220" y="80"  fontSize="9"  fill={accent} opacity="0.25" fontFamily="monospace">P(C₂|E₁)=1/(n-1)</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Árvore de probabilidade
───────────────────────────────────────────── */
function ProbTree({ accent }) {
  const dim = "rgba(167,139,250,0.35)";
  const red = "#f87171";
  const green = "#34d399";
  return (
    <svg viewBox="0 0 500 300" style={{ width: "100%", maxWidth: 500 }}>
      <circle cx="250" cy="30" r="16" fill="#1a1030" stroke={accent} strokeWidth="1.5" />
      <text x="250" y="35" textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace">start</text>
      <line x1="250" y1="46" x2="130" y2="120" stroke={accent} strokeWidth="1.2" strokeDasharray="4 2" />
      <text x="165" y="88" fontSize="10" fill={dim} textAnchor="middle" fontFamily="monospace">P(E₁)=(n-1)/n</text>
      <line x1="250" y1="46" x2="370" y2="120" stroke={red} strokeWidth="1.2" strokeDasharray="4 2" opacity="0.7" />
      <text x="335" y="88" fontSize="10" fill={red} textAnchor="middle" fontFamily="monospace" opacity="0.8">P(C₁)=1/n</text>
      <circle cx="130" cy="130" r="16" fill="#1a1030" stroke={accent} strokeWidth="1.5" />
      <text x="130" y="135" textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">E₁</text>
      <circle cx="370" cy="130" r="16" fill="#1a1030" stroke={red} strokeWidth="1.5" opacity="0.8" />
      <text x="370" y="135" textAnchor="middle" fontSize="10" fill={red} fontFamily="monospace" opacity="0.9">C₁</text>
      <line x1="130" y1="146" x2="80"  y2="220" stroke={green} strokeWidth="1.2" strokeDasharray="4 2" />
      <line x1="130" y1="146" x2="180" y2="220" stroke={red}   strokeWidth="1.2" strokeDasharray="4 2" opacity="0.5" />
      <text x="90"  y="188" fontSize="9" fill={green} textAnchor="middle" fontFamily="monospace">1/(n-1)</text>
      <text x="175" y="188" fontSize="9" fill={red}   textAnchor="middle" fontFamily="monospace" opacity="0.7">(n-2)/(n-1)</text>
      <line x1="370" y1="146" x2="370" y2="210" stroke={red} strokeWidth="1" opacity="0.4" />
      <text x="370" y="228" textAnchor="middle" fontSize="10" fill={red} fontFamily="monospace" opacity="0.7">P = 0</text>
      <circle cx="80"  cy="235" r="14" fill="#0d1f15" stroke={green} strokeWidth="1.5" />
      <text x="80"  y="239" textAnchor="middle" fontSize="10" fill={green} fontFamily="monospace">{"✓ C₂"}</text>
      <circle cx="180" cy="235" r="14" fill="#1f0d0d" stroke={red} strokeWidth="1.5" opacity="0.7" />
      <text x="180" y="239" textAnchor="middle" fontSize="10" fill={red} fontFamily="monospace" opacity="0.8">{"✗"}</text>
      <rect x="278" y="210" width="190" height="58" rx="6" fill="#0d0d18" stroke={accent} strokeWidth="1" opacity="0.9" />
      <text x="373" y="229" textAnchor="middle" fontSize="10" fill={dim} fontFamily="monospace">total success:</text>
      <text x="373" y="247" textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace">(n-1)/n · 1/(n-1) = 1/n</text>
      <text x="373" y="262" textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace" fontWeight="bold">= same as before</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Utilitários de layout
───────────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Divider({ accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "3rem 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${accent}44)` }} />
      <span style={{ color: accent, fontSize: "1.1rem", opacity: 0.5 }}>◆</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${accent}44)` }} />
    </div>
  );
}

function Pullquote({ children, accent }) {
  return (
    <blockquote style={{
      margin: "2.5rem 0", padding: "1.4rem 2rem",
      borderLeft: `3px solid ${accent}`,
      background: `linear-gradient(to right, ${accent}10, transparent)`,
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "1.25rem", fontStyle: "italic",
      color: "#e2d9f3", lineHeight: 1.65,
    }}>
      {children}
    </blockquote>
  );
}

const COLORS = {
  purple: { border: "#a78bfa", bg: "rgba(167,139,250,0.06)", glow: "rgba(167,139,250,0.14)" },
  green:  { border: "#34d399", bg: "rgba(52,211,153,0.06)",  glow: "rgba(52,211,153,0.11)"  },
  red:    { border: "#f87171", bg: "rgba(248,113,113,0.06)", glow: "rgba(248,113,113,0.11)" },
  gold:   { border: "#fbbf24", bg: "rgba(251,191,36,0.06)",  glow: "rgba(251,191,36,0.11)"  },
};

function FormulaBlock({ children, label, highlight }) {
  const c = COLORS[highlight] || COLORS.purple;
  return (
    <div style={{
      margin: "2rem 0", padding: "1.5rem 2rem",
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.border}`,
      borderRadius: "0 8px 8px 0",
      boxShadow: `0 0 22px ${c.glow}`,
      position: "relative",
    }}>
      {label ? (
        <span style={{
          position: "absolute", top: -11, left: 16,
          background: c.border, color: "#06060a",
          fontSize: "0.63rem", fontFamily: "'DM Mono', monospace",
          padding: "2px 10px", borderRadius: 20,
          letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700,
        }}>
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
}

function IllustrationBox({ children, accent, cardBg, caption }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
      gap: "1rem", margin: "3rem 0", padding: "2rem", background: cardBg,
      borderRadius: 12, border: `1px solid ${accent}22` }}>
      {children}
      {caption ? (
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
          color: "#9d8ec0", textAlign: "center", letterSpacing: "0.06em", margin: 0 }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Página principal
───────────────────────────────────────────── */
export default function ErrorTheorem({ t, setActive }) {
  const theme   = (t && typeof t === "object") ? t : {};
  const accent  = theme.accent  || "#a78bfa";
  const bg      = theme.bg      || "#06060a";
  const text    = theme.text    || "#e2d9f3";
  const cardBg  = theme.cardBg  || "#0f0f18";
  const subtext = theme.subtext || "#9d8ec0";
  const isDark  = String(bg).startsWith("#0") || String(bg).startsWith("#1");

  const pStyle = {
    fontSize: "1.02rem", lineHeight: 1.88,
    color: isDark ? "#ccc0e0" : "#3a2a5a",
    margin: "0 0 1.2rem",
  };

  const h2Style = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700,
    color: text, margin: "0 0 1.2rem", lineHeight: 1.2,
  };

  const sectionLabelStyle = {
    display: "inline-block",
    fontFamily: "'DM Mono', monospace", fontSize: "0.68rem",
    color: accent, letterSpacing: "0.18em", textTransform: "uppercase",
    marginBottom: "0.5rem", opacity: 0.8,
  };

  const backBtnStyle = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "10px 20px", background: `${accent}15`,
    border: `1px solid ${accent}44`, borderRadius: 8,
    color: accent, cursor: "pointer", fontSize: "0.85rem",
    fontFamily: "'DM Mono', monospace", transition: "background 0.2s",
  };

  const handleBack = useCallback(() => {
    if (typeof setActive === "function") setActive("Blog");
  }, [setActive]);

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text,
      fontFamily: "'DM Sans', sans-serif", padding: "0 0 6rem" }}>

      {/* Hero */}
      <div style={{ position: "relative", padding: "5rem 2rem 4rem",
        textAlign: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${accent}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <Reveal>
          <div style={{ marginBottom: "2rem" }}>
            <button style={backBtnStyle} onClick={handleBack}
              onMouseEnter={e => { e.currentTarget.style.background = `${accent}28`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${accent}15`; }}>
              ← back to blog
            </button>
          </div>
          <div style={{
            display: "inline-block", background: `${accent}20`, color: accent,
            border: `1px solid ${accent}44`, borderRadius: 20, padding: "4px 16px",
            fontSize: "0.72rem", fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            Essay · Probability · Literature
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05,
            marginBottom: "1.5rem",
            background: `linear-gradient(135deg, ${text} 40%, ${accent})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            The Error Theorem
          </h1>
          <p style={{ fontSize: "1.05rem", color: subtext, maxWidth: 560,
            margin: "0 auto 2rem", lineHeight: 1.7, fontStyle: "italic" }}>
            An experiment between literature and mathematics — on absurdity, multiple choice,
            and the dangerous difference between information and hope.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center",
            fontSize: "0.78rem", color: subtext, fontFamily: "'DM Mono', monospace" }}>
            <span>Davi Silva</span>
            <span>·</span>
            <span>March 2026</span>
            <span>·</span>
            <span>~10 min read</span>
          </div>
        </Reveal>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem" }}>

        {/* §1 */}
        <Reveal>
          <Divider accent={accent} />
          <div style={sectionLabelStyle}>§ 1 — Introduction</div>
          <h2 style={h2Style}>Imagine.</h2>
          <p style={pStyle}>
            One morning, after waking from troubled dreams and still trapped in bed, Sregor Gamsa
            discovered that he had been transformed into a monstrous insect.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <IllustrationBox accent={accent} cardBg={cardBg}
            caption={"Fig. 0 — Sregor Gamsa contemplating the ceiling and the exam he will not attend.\nThe clock disagrees with his situation."}>
            <InsectIllustration accent={accent} bgColor={bg} />
          </IllustrationBox>
        </Reveal>

        <Reveal>
          <p style={pStyle}>
            Lying on his back, he looked at the clock ticking on the dresser and felt, with the
            clarity of a mathematical punishment, that he was already late. But that was not the
            worst of his problems. His real problem: that morning there would be a multiple-choice
            exam in Statistics VI.
          </p>
          <Pullquote accent={accent}>
            "If I am going to get almost everything wrong by chance, maybe I can find a way
            to be wrong more intelligently."
          </Pullquote>
          <p style={pStyle}>
            The first intuition was simple: in a question with four alternatives, his chance of
            success was only <Tex tex="\tfrac{1}{4}" color={accent} />. If he could eliminate one
            option, his chance would rise to <Tex tex="\tfrac{1}{3}" color="#34d399" />.
          </p>
          <p style={pStyle}>
            Thus was born — or perhaps merely revealed — what we call here the{" "}
            <em style={{ color: accent }}>Error Theorem</em>.
          </p>
        </Reveal>

        {/* §2 */}
        <Reveal>
          <Divider accent={accent} />
          <div style={sectionLabelStyle}>§ 2 — The Problem</div>
          <h2 style={h2Style}>Where intuition betrays us.</h2>
          <p style={pStyle}>
            Consider a multiple-choice question with <Tex tex="n" color={accent} /> alternatives,
            exactly one correct. Under symmetry:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock label="baseline" highlight="purple">
            <Tex tex="P(\text{correct}) = \dfrac{1}{n}" display />
          </FormulaBlock>
        </Reveal>

        <Reveal>
          <p style={pStyle}>
            Sregor imagines: (1) choose one alternative at random; (2) eliminate it;
            (3) choose again from the remaining ones. With only <Tex tex="n-1" color={accent} /> options
            remaining, the probability appears to be <Tex tex="\frac{1}{n-1}" color="#34d399" />.
          </p>
          <Pullquote accent="#f87171">
            But this is exactly where intuition betrays us.
          </Pullquote>
          <p style={pStyle}>
            The reduction did not come from real information — it came from a previous random
            choice. Define the events:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock highlight="purple" label="definitions">
            <ul style={{ margin: 0, padding: "0 0 0 1.2rem", color: subtext, lineHeight: 2.4 }}>
              <li><Tex tex="E_1" color={accent} /> — first guess is <strong style={{ color: "#f87171" }}>wrong</strong></li>
              <li><Tex tex="C_1" color={accent} /> — first guess is <strong style={{ color: "#34d399" }}>correct</strong></li>
              <li><Tex tex="C_2" color={accent} /> — second guess is <strong style={{ color: "#34d399" }}>correct</strong></li>
            </ul>
          </FormulaBlock>

          <FormulaBlock label="if first was wrong" highlight="green">
            <Tex tex="P(C_2 \mid E_1) = \dfrac{1}{n-1}" display color="#34d399" />
          </FormulaBlock>

          <FormulaBlock label="if first was correct — fatal" highlight="red">
            <Tex tex="P(C_2 \mid C_1) = 0" display color="#f87171" />
            <p style={{ ...pStyle, fontSize: "0.88rem", margin: 0, color: subtext }}>
              The correct alternative was eliminated. No recovery possible.
            </p>
          </FormulaBlock>

          <FormulaBlock label="total probability" highlight="gold">
            <Tex tex="P(C_2) = \dfrac{n-1}{n}\cdot\dfrac{1}{n-1} + \dfrac{1}{n}\cdot 0" display />
            <Tex tex="P(C_2) = \dfrac{1}{n}" display color="#fbbf24" />
          </FormulaBlock>
        </Reveal>

        <Reveal delay={0.1}>
          <IllustrationBox accent={accent} cardBg={cardBg}
            caption="Fig. 1 — Probability tree. The green path gains, the red path destroys — they cancel perfectly.">
            <ProbTree accent={accent} />
          </IllustrationBox>
        </Reveal>

        <Reveal>
          <Pullquote accent={accent}>
            Seeming to reduce the problem is not the same as reducing uncertainty.
          </Pullquote>
        </Reveal>

        {/* §3 */}
        <Reveal>
          <Divider accent={accent} />
          <div style={sectionLabelStyle}>§ 3 — The Error Theorem</div>
          <h2 style={h2Style}>The theorem, stated precisely.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{
            margin: "3rem 0", padding: "2rem 2.5rem",
            background: `linear-gradient(135deg, ${accent}12, ${accent}06)`,
            border: `1px solid ${accent}55`, borderRadius: 12,
            boxShadow: `0 0 40px ${accent}18, inset 0 1px 0 ${accent}22`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 200, height: 200,
              background: `radial-gradient(circle, ${accent}20, transparent 70%)`,
              pointerEvents: "none",
            }} />
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
              color: accent, letterSpacing: "0.15em", textTransform: "uppercase",
              marginBottom: "1rem" }}>
              Theorem 1 — Error Theorem
            </p>
            <p style={{ ...pStyle, fontStyle: "italic", marginBottom: "1.2rem" }}>
              In a multiple-choice problem with <Tex tex="n" color={accent} /> equiprobable
              alternatives, eliminating one option changes the probability of success{" "}
              <strong style={{ color: accent }}>if and only if</strong> that elimination is
              informative — carrying some correlation with the correct answer.
            </p>
            <Tex tex="P = \dfrac{1}{n}" display color={accent} />
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1.5rem 0" }}>
            <FormulaBlock highlight="green" label="case 1 — informative">
              <p style={{ ...pStyle, margin: 0, fontSize: "0.9rem" }}>
                Eliminated because <strong style={{ color: "#34d399" }}>something was learned</strong>.
                The space of possibilities <em>really</em> is reduced.
              </p>
            </FormulaBlock>
            <FormulaBlock highlight="red" label="case 2 — random">
              <p style={{ ...pStyle, margin: 0, fontSize: "0.9rem" }}>
                A consequence of a <strong style={{ color: "#f87171" }}>previous guess</strong>.
                The problem was not simplified — merely reorganized.
              </p>
            </FormulaBlock>
          </div>
          <Pullquote accent={accent}>
            The first operation can change the mathematics.
            The second changes only the narrative.
          </Pullquote>
        </Reveal>

        {/* §4 */}
        <Reveal>
          <Divider accent={accent} />
          <div style={sectionLabelStyle}>§ 4 — A Formal View</div>
          <h2 style={h2Style}>In the language of probability.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock highlight="purple" label="prior">
            <Tex tex="P(I = i) = \dfrac{1}{n}, \quad i \in \Omega = \{1, 2, \dots, n\}" display />
          </FormulaBlock>
          <FormulaBlock highlight="green" label="if elimination E is informative">
            <Tex tex="P(I = i \mid E) = \dfrac{1}{n-1}, \quad i \neq k" display color="#34d399" />
          </FormulaBlock>
          <FormulaBlock highlight="red" label="if E is independent of I">
            <Tex tex="P(I = i \mid E) = P(I = i) = \dfrac{1}{n}" display color="#f87171" />
            <p style={{ ...pStyle, fontSize: "0.85rem", margin: 0, color: subtext }}>
              By Bayes: since <Tex tex="E \perp I" />, we have{" "}
              <Tex tex="P(E \mid I=i) = P(E)" />, so the prior is unchanged.
            </p>
          </FormulaBlock>
        </Reveal>

        {/* §5 */}
        <Reveal>
          <Divider accent={accent} />
          <div style={sectionLabelStyle}>§ 5 — A Quantum Information Perspective</div>
          <h2 style={h2Style}>When mechanics makes the distinction unavoidable.</h2>
          <p style={pStyle}>
            Consider a quantum system in uniform superposition of <Tex tex="n" color={accent} /> orthonormal states:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FormulaBlock highlight="purple" label="quantum superposition">
            <Tex tex="|\psi\rangle = \dfrac{1}{\sqrt{n}} \sum_{i=1}^{n} |i\rangle" display />
          </FormulaBlock>
          <FormulaBlock highlight="green" label="after informative measurement">
            <Tex tex="|\psi'\rangle = \dfrac{1}{\sqrt{n-1}} \sum_{i \neq k} |i\rangle" display color="#34d399" />
            <Tex tex="P(i \mid \text{elim. of } k) = \dfrac{1}{n-1}, \quad i \neq k" display color="#34d399" />
          </FormulaBlock>
          <FormulaBlock highlight="red" label="uncorrelated operation">
            <Tex tex="P(i \mid E) = \dfrac{1}{n}" display color="#f87171" />
          </FormulaBlock>
        </Reveal>

        <Reveal>
          <div style={{ margin: "2rem 0", padding: "1.5rem 2rem", background: `${accent}08`,
            borderRadius: 10, border: `1px solid ${accent}33` }}>
            <p style={{ ...pStyle, margin: "0 0 0.8rem", fontWeight: 600, color: accent }}>
              The central distinction:
            </p>
            <ul style={{ margin: 0, padding: "0 0 0 1.2rem", lineHeight: 2.2 }}>
              <li style={{ color: "#34d399" }}>
                Nonzero <strong>mutual information</strong> with the observable → reduces entropy
              </li>
              <li style={{ color: "#f87171" }}>
                <strong>Independent</strong> operation → does not alter relevant entropy,
                even if the apparent state space shrinks
              </li>
            </ul>
          </div>
          <Pullquote accent={accent}>
            It is not the transformation of the system that generates information, but the
            correlation between that transformation and what one wishes to know.
          </Pullquote>
          <p style={pStyle}>
            In both Sregor Gamsa's problem and the quantum setting, the error lies in
            confusing{" "}
            <strong style={{ color: "#f87171" }}>structural reduction of the space</strong> with{" "}
            <strong style={{ color: "#34d399" }}>informational reduction of uncertainty</strong>.
          </p>
        </Reveal>

        {/* Fim */}
        <Reveal delay={0.1}>
          <Divider accent={accent} />
          <div style={{ textAlign: "center", padding: "3rem 2rem",
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${accent}0d, transparent)`,
            borderRadius: 16 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.5rem", fontStyle: "italic", color: subtext,
              marginBottom: "2rem", lineHeight: 1.65 }}>
              And Sregor Gamsa? He never made it to the exam.
              <br />But he had solved a more interesting problem.
            </p>
            <button style={backBtnStyle} onClick={handleBack}
              onMouseEnter={e => { e.currentTarget.style.background = `${accent}28`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${accent}15`; }}>
              ← back to blog
            </button>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
