import React, { useState, useEffect } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import Fade       from '../../components/Fade';
import BackButton from '../../components/BackButton';
import pdfFile from './data_blog/The_Error_Theorem.pdf';
/* ─────────────────────────────────────────────────────────────────────────────
   FIX GITHUB PAGES: injetar CSS do KaTeX via CDN ao invés de depender do
   bundle do Vite (que não copia os fontes corretamente em produção).
   O import 'katex/dist/katex.min.css' é removido — este useEffect substitui.
───────────────────────────────────────────────────────────────────────────── */
function useKatexCSS() {
  useEffect(() => {
    if (document.getElementById('katex-cdn-css')) return;
    const link = document.createElement('link');
    link.id   = 'katex-cdn-css';
    link.rel  = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);
  }, []);
}

/* ─── Divisor centralizado ───────────────────────────────────────────────── */
const Divider = ({ t = {} }) => {
  const accent = t.accentSolid || t.accent || '#b58cff';
  return (
    <div style={{ margin: '3.5rem auto', width: 50 }}>
      <div style={{
        width: '50px',
        height: '3px',
        background: `linear-gradient(90deg, ${accent} 0%, ${accent}80 55%, transparent 100%)`,
        borderRadius: '999px',
      }} />
    </div>
  );
};

/* ─── Label de seção ─────────────────────────────────────────────────────── */
const SectionLabel = ({ number, label, t }) => (
  <div style={{ marginBottom: '1rem' }}>
    <span style={{
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.68rem',
      color: t.accent,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      opacity: 0.9,
    }}>
      {number < 10 ? `0${number}` : number} · {label}
    </span>
  </div>
);

/* ─── Título de seção ────────────────────────────────────────────────────── */
const SectionTitle = ({ children, t }) => (
  <h2 style={{
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
    fontWeight: 600,
    color: t.text,
    margin: '0 0 1.4rem',
    lineHeight: 1.15,
  }}>
    {children}
  </h2>
);

/* ─── Bloco de equação colorido ─────────────────────────────────────────── */
/*
  FIX CLIPPING: `overflowX: auto` no container pai cria um novo contexto de
  formatação e clipa filhos com `position: absolute` que ultrapassam a borda.
  Solução: separar em dois divs — o externo cuida do posicionamento/label,
  o interno cuida do overflow do conteúdo matemático.
*/
const EqBlock = ({ math, color, t, label }) => {
  const borderColor = color || t.accent;
  return (
    /* Wrapper externo: posicionamento, margem, label flutuante */
    <div style={{
      position: 'relative',
      margin: label ? '3rem 0 2.5rem' : '2.5rem 0',
    }}>
      {label ? (
        <span style={{
          position: 'absolute',
          top: -11, left: 16,
          background: borderColor,
          color: '#06060a',
          fontSize: '0.6rem',
          fontFamily: 'DM Mono, monospace',
          padding: '2px 10px',
          borderRadius: 20,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}>
          {label}
        </span>
      ) : null}

      {/* Inner: visual do bloco + overflow apenas aqui */}
      <div style={{
        padding: '1.4rem 2rem',
        background: `${borderColor}0a`,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: '0 8px 8px 0',
        boxShadow: `0 0 20px ${borderColor}14`,
        overflowX: 'auto',   /* overflow confinado ao inner — label não é cortada */
        color: t.text,
      }}>
        <BlockMath math={math} />
      </div>
    </div>
  );
};

/* ─── Pullquote ──────────────────────────────────────────────────────────── */
const Pullquote = ({ children, t }) => (
  <blockquote style={{
    margin: '2.5rem 0',
    padding: '1.2rem 2rem',
    borderLeft: `2px solid ${t.accent}`,
    background: `linear-gradient(to right, ${t.accent}0d, transparent)`,
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '1.3rem',
    fontStyle: 'italic',
    color: t.textDim,
    lineHeight: 1.65,
  }}>
    {children}
  </blockquote>
);

/* ─── Scroll indicator ───────────────────────────────────────────────────── */
export const ScrollIndicator = ({ t }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY < maxScroll - 120);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      left: '2.2rem',
      bottom: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      opacity: visible ? 0.55 : 0,
      transition: 'opacity 0.6s ease',
      zIndex: 10,
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.55rem',
        letterSpacing: '0.22em',
        color: t.accentSolid || t.accent,
        writingMode: 'vertical-rl',
        textTransform: 'uppercase',
      }}>
        scroll
      </span>
      <div style={{
        width: '1px',
        height: '50px',
        background: `linear-gradient(to bottom, ${t.accentSolid || t.accent}, transparent)`,
        animation: 'pulse 2s ease infinite',
      }} />
    </div>
  );
};

/* ─── Botão de partículas ────────────────────────────────────────────────── */
const ParticleToggle = ({ accent, showParticles, onToggle }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.9rem' }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'none',
          border: `1px solid ${accent}${hovered ? '88' : '44'}`,
          borderRadius: 6, color: accent,
          fontFamily: 'DM Mono, monospace', fontSize: '0.65rem',
          padding: '5px 12px', cursor: 'pointer',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          transition: 'border-color 0.2s, opacity 0.2s',
          opacity: hovered ? 1 : 0.75,
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: showParticles ? accent : 'transparent',
          border: `1px solid ${accent}`,
          display: 'inline-block',
          transition: 'background 0.3s',
          flexShrink: 0,
        }} />
        {showParticles ? 'particles on' : 'particles off'}
      </button>

      {/* "← for better reading" some quando partículas são desligadas */}
      <span style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.6rem',
        color: accent, letterSpacing: '0.1em',
        opacity: showParticles ? 0.5 : 0,
        transition: 'opacity 0.4s ease',
        whiteSpace: 'nowrap', pointerEvents: 'none',
      }}>
        ← for better reading
      </span>
    </div>
  );
};

/* ─── Componente principal ───────────────────────────────────────────────── */
const ErrorTheorem = ({ t, setActive, toggleParticles, particlesOn }) => {
  useKatexCSS();   /* garante o CSS do KaTeX mesmo no GitHub Pages */

  const [showParticles, setShowParticles] = useState(particlesOn !== false);

  /* FIX PARTÍCULAS: restaura ao sair da página */
  useEffect(() => {
    return () => {
      if (typeof toggleParticles === 'function') toggleParticles(true);
    };
  }, [toggleParticles]);

  const handleParticleToggle = () => {
    const next = !showParticles;
    setShowParticles(next);
    if (typeof toggleParticles === 'function') toggleParticles(next);
  };

  const p = {
    fontFamily: 'Crimson Text, serif',
    fontSize: '1.25rem',
    color: t.textDim,
    lineHeight: '1.85',
    marginBottom: '1.6rem',
    textAlign: 'justify',
  };

  const accent = t.accent;
  const green  = '#34d399';
  const red    = '#f87171';
  const gold   = '#fbbf24';

  return (
    <div style={{ background: t.background, minHeight: '100vh', position: 'relative' }}>
      <ScrollIndicator t={t} />

      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        paddingTop: 'max(10vh, 80px)',
      }}>

        {/* ── Hero ── */}
        <Fade>
          <div style={{ maxWidth: 850, margin: '0 auto', padding: '0 max(5vw, 20px)', width: '100%' }}>

            <div style={{ marginBottom: '0.6rem' }}>
              <BackButton t={t} onClick={() => setActive('Blog')} label="BACK TO BLOG" />
            </div>

            {typeof toggleParticles === 'function' ? (
              <ParticleToggle accent={accent} showParticles={showParticles} onToggle={handleParticleToggle} />
            ) : null}

            <div style={{ marginTop: '2rem' }} />

            <div style={{
              display: 'inline-block',
              background: `${accent}18`, color: accent,
              border: `1px solid ${accent}44`, borderRadius: 20,
              padding: '4px 14px', fontSize: '0.68rem',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              Essay · Probability · Literature
            </div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: t.text, fontWeight: 500,
              margin: '0 0 1rem', lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}>
              The Error Theorem
            </h1>

            <p style={{
              fontFamily: 'Crimson Text, serif',
              fontSize: '1.15rem', color: t.textDim,
              fontStyle: 'italic', lineHeight: 1.65,
              margin: '0 0 1.5rem', maxWidth: 580,
            }}>
              A small experiment between literature and mathematics — on absurdity, multiple choice,
              and the dangerous difference between real information and imaginary hope.
            </p>

            <div style={{
              display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap',
              fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: t.textDim,
            }}>
              <span>Davi Silva</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>IFSC-USP</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>March 2026</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>~10 min read</span>
            </div>

            <Divider t={t} />
          </div>
        </Fade>

        {/* ── Conteúdo ── */}
        <main style={{ maxWidth: 850, margin: '0 auto', padding: '0 max(5vw, 20px) 6rem', width: '100%' }}>

          {/* §1 */}
          <Fade>
            <SectionLabel number={1} label="Introduction" t={t} />
            <SectionTitle t={t}>Imagine.</SectionTitle>

            <p style={p}>
              One morning, after waking from troubled dreams and still trapped in bed, Sregor Gamsa
              discovered that he had been transformed into a monstrous insect. Lying on his back, he
              looked at the clock ticking on the dresser and felt, with the clarity of a mathematical
              punishment, that he was already late.
            </p>
            <p style={p}>
              But that was not the worst of his problems. His real problem was different: that morning
              there would be a multiple-choice exam in Statistics VI.
            </p>
            <p style={p}>
              He tried to move. He could not. He tried to convince himself that the world might show
              some compassion toward the metamorphosed. That also failed. So, like any man who realizes
              that time and logic are against him, Sregor did what remained to a being cornered between
              absurdity and urgency: he <em>thought</em>.
            </p>

            <Pullquote t={t}>
              "If I am going to get almost everything wrong by chance, maybe I can find a way
              to be wrong more intelligently."
            </Pullquote>

            <p style={p}>
              He stared at the ceiling as if staring at a cursed system of equations. The first intuition
              was simple: in a question with four alternatives, if he knew nothing, his chance of success
              was only <InlineMath math="\tfrac{1}{4}" />. If he could eliminate one option, his chance
              would rise to <InlineMath math="\tfrac{1}{3}" />.
            </p>
            <p style={p}>
              But the human mind is a strange machine. It does not content itself with noticing that
              chance improves when there is information. Thus was born — or perhaps merely revealed —
              what we call here the <em style={{ color: accent }}>Error Theorem</em>.
            </p>
          </Fade>

          <Divider t={t} />

          {/* §2 */}
          <Fade delay={0.1}>
            <SectionLabel number={2} label="The Problem" t={t} />
            <SectionTitle t={t}>Where intuition betrays us.</SectionTitle>

            <p style={p}>
              Consider a multiple-choice question with <InlineMath math="n" /> alternatives, exactly
              one of which is correct. Under symmetry, the chance of answering correctly on a single
              guess is:
            </p>

            <EqBlock math="P(\text{correct}) = \frac{1}{n}" color={accent} label="baseline" t={t} />

            <p style={p}>
              The problem arises when Sregor imagines the following procedure: (1) choose one
              alternative at random; (2) eliminate that alternative; (3) choose again, at random,
              one alternative among the remaining ones. With only <InlineMath math="n-1" /> options,
              the probability of success on the second guess would <em>seem</em> to be{' '}
              <InlineMath math="\tfrac{1}{n-1}" /> — an apparent improvement from{' '}
              <InlineMath math="\tfrac{1}{4}" /> to <InlineMath math="\tfrac{1}{3}" />.
            </p>

            <Pullquote t={t}>
              But this is exactly where intuition betrays us.
            </Pullquote>

            <p style={p}>
              The reduction from <InlineMath math="n" /> to <InlineMath math="n-1" /> alternatives
              did not come from real information about the correct answer — it came from a previous
              random choice. To make this explicit, define the events:
            </p>

            <div style={{
              margin: '1.5rem 0 2rem',
              padding: '1.4rem 2rem',
              background: `${accent}08`,
              border: `1px solid ${accent}30`,
              borderRadius: 8,
              fontFamily: 'Crimson Text, serif',
              fontSize: '1.15rem',
              color: t.textDim,
              lineHeight: 2.2,
            }}>
              <div><InlineMath math="E_1" /> — first guess is <strong style={{ color: red }}>wrong</strong></div>
              <div><InlineMath math="C_1" /> — first guess is <strong style={{ color: green }}>correct</strong></div>
              <div><InlineMath math="C_2" /> — second guess is <strong style={{ color: green }}>correct</strong></div>
            </div>

            <p style={p}>The second guess can only be analyzed conditional on the result of the first:</p>

            <EqBlock math="P(C_2 \mid E_1) = \frac{1}{n-1}" color={green} label="if first was wrong" t={t} />
            <EqBlock math="P(C_2 \mid C_1) = 0" color={red} label="if first was correct — fatal" t={t} />

            <p style={p}>Now apply the law of total probability:</p>

            <EqBlock
              math="P(C_2) = \underbrace{P(E_1)}_{\displaystyle\frac{n-1}{n}} \cdot \underbrace{P(C_2 \mid E_1)}_{\displaystyle\frac{1}{n-1}} + \underbrace{P(C_1)}_{\displaystyle\frac{1}{n}} \cdot \underbrace{P(C_2 \mid C_1)}_{\displaystyle 0}"
              color={gold} label="total probability" t={t}
            />
            <EqBlock math="P(C_2) = \frac{1}{n}" color={gold} t={t} />

            <p style={p}>
              The apparent advantage exists only within the subset of cases where the first guess was
              wrong. But there is a probability of <InlineMath math="\tfrac{1}{n}" /> that the first
              guess eliminates precisely the correct alternative — making success impossible. This case
              cancels the apparent gain exactly.
            </p>

            <Pullquote t={t}>
              Seeming to reduce the problem is not the same as reducing uncertainty.
            </Pullquote>
          </Fade>

          <Divider t={t} />

          {/* §3 */}
          <Fade delay={0.1}>
            <SectionLabel number={3} label="The Error Theorem" t={t} />
            <SectionTitle t={t}>The theorem, stated precisely.</SectionTitle>

            <div style={{
              margin: '2rem 0 2.5rem',
              padding: '2rem 2.5rem',
              background: `linear-gradient(135deg, ${accent}10, ${accent}05)`,
              border: `1px solid ${accent}55`,
              borderRadius: 10,
              boxShadow: `0 0 36px ${accent}14, inset 0 1px 0 ${accent}20`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 180, height: 180,
                background: `radial-gradient(circle, ${accent}18, transparent 70%)`,
                pointerEvents: 'none',
              }} />
              <p style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: accent,
                letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 1.2rem',
              }}>
                Theorem 1 — Error Theorem
              </p>
              <p style={{ ...p, fontStyle: 'italic', marginBottom: '1.2rem', textAlign: 'left' }}>
                In a multiple-choice problem with <InlineMath math="n" /> equiprobable alternatives,
                eliminating one option changes the probability of success{' '}
                <strong style={{ color: accent }}>if and only if</strong> that elimination is
                informative — carrying some correlation with the correct answer. If the elimination
                occurs at random, there is no real probabilistic gain:
              </p>
              <BlockMath math="P = \frac{1}{n}" />
            </div>

            <p style={p}>The mind tends to confuse two distinct situations:</p>

            {/* Cards — mesmo fix do EqBlock: label fora do container com overflow */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '3rem 0 2rem' }}>
              {[
                {
                  color: green,
                  label: 'Case 1 — Informative',
                  text: <>An alternative is eliminated because <strong style={{ color: green }}>something was learned</strong> about it. The space of possibilities <em>really</em> is reduced.</>
                },
                {
                  color: red,
                  label: 'Case 2 — Random',
                  text: <>The elimination occurs as a consequence of a <strong style={{ color: red }}>previous random guess</strong>. The problem was not simplified — merely reorganized.</>
                },
              ].map(({ color, label, text }, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', top: -11, left: 12,
                    background: color, color: '#06060a',
                    fontSize: '0.58rem', fontFamily: 'DM Mono, monospace',
                    padding: '2px 8px', borderRadius: 20,
                    letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
                    whiteSpace: 'nowrap', zIndex: 1,
                  }}>
                    {label}
                  </span>
                  <div style={{
                    padding: '1.6rem 1.6rem 1.4rem',
                    background: `${color}08`,
                    border: `1px solid ${color}44`,
                    borderLeft: `3px solid ${color}`,
                    borderRadius: '0 8px 8px 0',
                  }}>
                    <p style={{ ...p, margin: 0, fontSize: '1.1rem', textAlign: 'left' }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Pullquote t={t}>
              The first operation can change the mathematics.
              The second changes only the narrative.
            </Pullquote>
          </Fade>

          <Divider t={t} />

          {/* §4 */}
          <Fade delay={0.1}>
            <SectionLabel number={4} label="A Formal View" t={t} />
            <SectionTitle t={t}>In the language of probability.</SectionTitle>

            <p style={p}>
              Let <InlineMath math="\Omega = \{1, 2, \dots, n\}" /> be the set of alternatives and{' '}
              <InlineMath math="I" /> the random variable indicating the correct one. Assume a uniform prior:
            </p>

            <EqBlock math="P(I = i) = \frac{1}{n}, \qquad i \in \Omega" color={accent} label="prior" t={t} />

            <p style={p}>
              If the elimination event <InlineMath math="E" /> is{' '}
              <strong style={{ color: green }}>informative</strong> — implying that alternative{' '}
              <InlineMath math="A_k" /> is false — then by symmetry among the remaining alternatives:
            </p>

            <EqBlock
              math="P(I = i \mid E) = \frac{1}{n-1}, \qquad i \neq k"
              color={green} label="informative elimination" t={t}
            />

            <p style={p}>
              If instead <InlineMath math="E" /> is{' '}
              <strong style={{ color: red }}>independent of <InlineMath math="I" /></strong>,
              then by Bayes' formula — since <InlineMath math="P(E \mid I=i) = P(E)" /> for
              all <InlineMath math="i" /> — the prior is entirely unchanged:
            </p>

            <EqBlock
              math="P(I = i \mid E) = P(I = i) = \frac{1}{n}"
              color={red} label="independent elimination" t={t}
            />
          </Fade>

          <Divider t={t} />

          {/* §5 */}
          <Fade delay={0.1}>
            <SectionLabel number={5} label="A Quantum Information Perspective" t={t} />
            <SectionTitle t={t}>When mechanics makes the distinction unavoidable.</SectionTitle>

            <p style={p}>
              The conceptual structure of the Error Theorem finds a natural parallel in Quantum
              Information Theory. Consider a quantum system prepared in a uniform superposition of{' '}
              <InlineMath math="n" /> orthonormal states:
            </p>

            <EqBlock
              math="|\psi\rangle = \frac{1}{\sqrt{n}} \sum_{i=1}^{n} |i\rangle"
              color={accent} label="quantum superposition" t={t}
            />

            <p style={p}>
              The probability of outcome <InlineMath math="i" /> is{' '}
              <InlineMath math="P(i) = \tfrac{1}{n}" /> — in perfect analogy with the classical
              multiple-choice problem. If an{' '}
              <strong style={{ color: green }}>informative projective measurement</strong> discards
              state <InlineMath math="|k\rangle" />, the system collapses to:
            </p>

            <EqBlock
              math="|\psi'\rangle = \frac{1}{\sqrt{n-1}} \sum_{i \neq k} |i\rangle \quad \Longrightarrow \quad P(i \mid \text{elim. of } k) = \frac{1}{n-1}"
              color={green} label="informative measurement" t={t}
            />

            <p style={p}>
              But if the operation is{' '}
              <strong style={{ color: red }}>uncorrelated with the observable</strong> — a random
              loss, or a filtering process that does not depend on the correct basis — the effective
              density matrix contains no additional information:
            </p>

            <EqBlock math="P(i \mid E) = \frac{1}{n}" color={red} label="uncorrelated operation" t={t} />

            <div style={{
              margin: '2rem 0',
              padding: '1.4rem 2rem',
              background: `${accent}08`,
              border: `1px solid ${accent}30`,
              borderRadius: 8,
              fontFamily: 'Crimson Text, serif',
              fontSize: '1.15rem',
              color: t.textDim,
              lineHeight: 2.2,
            }}>
              <div><span style={{ color: green, fontWeight: 600 }}>Nonzero mutual information</span> with the observable → reduces the system's entropy.</div>
              <div><span style={{ color: red, fontWeight: 600 }}>Independent operation</span> → does not alter the relevant entropy, even if the apparent state space shrinks.</div>
            </div>

            <p style={p}>
              In both Sregor Gamsa's problem and the quantum setting, the error lies in confusing{' '}
              <strong style={{ color: red }}>structural reduction of the space</strong> with{' '}
              <strong style={{ color: green }}>informational reduction of uncertainty</strong>.
              Quantum mechanics merely makes this distinction unavoidable — it forces us to recognize
              that information is not a property of what we do to the system, but of what we are able
              to infer from it.
            </p>

            <Pullquote t={t}>
              It is not the transformation of the system that generates information, but the
              correlation between that transformation and what one wishes to know.
            </Pullquote>
          </Fade>

          <Divider t={t} />

          {/* Fim */}
          <Fade delay={0.1}>
            <div style={{
              textAlign: 'center', padding: '3rem 2rem',
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${accent}0c, transparent)`,
              borderRadius: 12,
            }}>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem', fontStyle: 'italic',
                color: t.textDim, marginBottom: '2.5rem', lineHeight: 1.65,
              }}>
                And Sregor Gamsa? He never made it to the exam.
                <br />But he had solved a more interesting problem.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {[
                  { label: '↓ Download PDF', href: pdfFile, download: true, primary: true },
                  { label: '↗ GitHub', href: 'https://github.com/davisilva169/The_Error_Theorem', primary: false },
                ].map(({ label, href, download, primary }) => (
                  <a
                    key={label}
                    href={href}
                    download={download ? true : undefined}
                    target={download ? undefined : '_blank'}
                    rel={download ? undefined : 'noopener noreferrer'}
                    style={{
                      padding: '11px 22px',
                      border: `1px solid ${primary ? accent : accent + '66'}`,
                      color: primary ? accent : t.textDim,
                      fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
                      letterSpacing: '0.1em', textDecoration: 'none',
                      borderRadius: 6, textTransform: 'uppercase',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${accent}18`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {label}
                  </a>
                ))}
              </div>

              <BackButton t={t} onClick={() => setActive('Blog')} label="BACK TO BLOG" />
            </div>
          </Fade>

        </main>
      </div>
    </div>
  );
};

export default ErrorTheorem;
