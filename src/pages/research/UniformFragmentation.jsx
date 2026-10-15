import { useI18n } from "../../i18n/context";import { useState, useEffect } from 'react';

import Fade from '../../components/Fade';
import BackButton from '../../components/BackButton';
import { KTex } from '../../components/KaTeX';
import Divider from '../../components/Divider';
import SectionLabel from '../../components/SectionLabel';
import SectionTitle from '../../components/SectionTitle';
import EqBlock from '../../components/EqBlock';
import Pullquote from '../../components/Pullquote';
import DefBox from '../../components/DefBox';
import ParticleToggle from '../../components/ParticleToggle';

/* ─── Componente principal ───────────────────────────────────────────────── */
const UniformFragmentation = ({ t, setActive, toggleParticles, particlesOn }) => {const { tr } = useI18n();

  const [showParticles, setShowParticles] = useState(particlesOn !== false);

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
    fontFamily: 'Georgia, Cambria, serif',
    fontSize: '1.25rem',
    color: t.textDim,
    lineHeight: '1.85',
    marginBottom: '1.6rem',
    textAlign: 'justify'
  };

  const accent = t.accent;
  const teal = t.accent;
  const gold = t.accentSolid;
  const violet = t.amber;

  return (
    <div style={{ background: t.background, minHeight: '100vh', position: 'relative' }}>

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'max(10vh, 80px)'
      }}>

        {/* ── Hero ── */}
        <Fade>
          <div style={{ maxWidth: 850, margin: '0 auto', padding: '0 max(5vw, 20px)', width: '100%' }}>

            <div style={{ marginBottom: '0.6rem' }}>
              <BackButton t={t} onClick={() => setActive('Research')} label={tr("BACK TO RESEARCH")} />
            </div>

            {tr(typeof toggleParticles === 'function' &&
            <ParticleToggle
              accent={accent}
              showParticles={showParticles}
              onToggle={handleParticleToggle} />)

            }

            <div style={{ marginTop: '2rem' }} />

            <div style={{
              display: 'inline-block',
              background: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}44`,
              borderRadius: 20,
              padding: '4px 14px',
              fontSize: '0.68rem',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}>{tr("Stochastic Processes \xB7 Cosmic Rays \xB7 2025 \xB7 Completed")}

            </div>

            <h1 style={{
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: t.text,
              fontWeight: 500,
              margin: '0 0 1rem',
              lineHeight: 1.08,
              letterSpacing: '-0.02em'
            }}>{tr("Null Model of Uniform Fragmentation")}

            </h1>

            <p style={{
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: '1.15rem',
              color: t.textDim,
              fontStyle: 'italic',
              lineHeight: 1.65,
              margin: '0 0 1.5rem',
              maxWidth: 620
            }}>{tr("A statistical hypothesis test for energy asymmetry in hadronic interactions \u2014 and its unexpected connection to the Muon Puzzle.")}


            </p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.75rem',
              color: t.textDim
            }}>
              <span>{tr("Davi Silva")}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{tr("IFSC-USP")}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{tr("FAPESP 2024/21601-7")}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{tr("Undergraduate Research")}</span>
            </div>

            <aside className="reading-path"><p>{tr("This page documents the earlier phase of the project. The completed thesis extends the analysis to multiple generations and revisits leader composition and simulation thresholds.")}</p><button className="text-link" onClick={() => setActive('MuonPaper')}>{tr("Continue to the completed thesis \u2197")}</button></aside>
            <Divider t={t} />
          </div>
        </Fade>

        {/* ── Conteúdo ── */}
        <article style={{ maxWidth: 850, margin: '0 auto', padding: '0 max(5vw, 20px) 6rem', width: '100%' }}>

          {/* §1 — Abstract */}
          <Fade>
            <SectionLabel number={1} label={tr("Abstract")} t={t} />
            <SectionTitle t={t}>{tr("A statistical test for the leading particle effect.")}</SectionTitle>

            <p style={p}>{tr("When a high-energy cosmic ray enters the atmosphere and collides with a nitrogen nucleus, it initiates a complex cascade of secondary particles \u2014 an")}

              {tr(' ')}
              <strong style={{ color: accent }}>{tr("Extensive Air Shower")}</strong>{tr(". In the early stages of this cascade, hadronic interactions produce pions and other secondaries; their energy sharing affects the subsequent development of the shower. This work investigates whether such splitting is truly uniform or whether a single secondary particle systematically dominates, carrying the majority of the primary energy forward.")}




            </p>
            <p style={p}>{tr("To answer this, we constructed a")}
              {tr(' ')}
              <strong style={{ color: accent }}>{tr("Null Model of Uniform Fragmentation")}</strong>{tr(" \u2014 a mathematical reference describing purely random, symmetric energy division \u2014 and confronted it directly with realistic shower simulations generated by the CONEX Monte Carlo software. The divergence between the two was not subtle.")}



            </p>

            <Pullquote t={t}>{tr("The system does not divide energy democratically. It privileges a single secondary particle.")}


            </Pullquote>
          </Fade>

          <Divider t={t} />

          {/* §2 — Motivation */}
          <Fade delay={0.1}>
            <SectionLabel number={2} label={tr("Motivation")} t={t} />
            <SectionTitle t={t}>{tr("The leading particle effect and the Muon Puzzle.")}</SectionTitle>

            <p style={p}>{tr("One of the open problems in astroparticle physics is the")}
              {tr(' ')}
              <strong style={{ color: gold }}>{tr("Muon Puzzle")}</strong>{tr(": a systematic deficit in the number of muons predicted by simulations relative to what is measured experimentally in air showers. Muons at ground level are produced predominantly by the decay of charged pions, so any mechanism that alters the energy available for pion decay directly impacts muon production.")}




            </p>
            <p style={p}>{tr("The ")}
              <strong style={{ color: accent }}>{tr("leading particle effect")}</strong>{tr(" refers to the hypothesis that, in the initial hadronic interactions of a shower, one secondary particle carries a disproportionately large fraction of the primary energy \u2014 effectively dominating the subsequent development of the cascade. If this secondary is a pion, it could fundamentally alter the muonic component of the shower relative to models assuming uniform energy splitting.")}





            </p>
            <p style={p}>{tr("The simple observation of a secondary with more energy than the rest is not, by itself, evidence for the leading particle effect. In any partition of a whole, one piece will inevitably be the largest. The null model transforms this into a quantitative question: how much more energetic should the leading fragment be, on average, if the division were purely random and uniform?")}





            </p>
          </Fade>

          <Divider t={t} />

          {/* §3 — Methodology */}
          <Fade delay={0.1}>
            <SectionLabel number={3} label={tr("Methodology")} t={t} />
            <SectionTitle t={t}>{tr("CONEX simulations and Python analysis.")}</SectionTitle>

            <p style={p}>{tr("Realistic shower data were produced with")}
              {tr(' ')}
              <strong style={{ color: accent }}>{tr("CONEX")}</strong>{tr(", a Monte Carlo event generator implementing the EPOS-LHC hadronic interaction model. Proton-initiated showers were simulated across energies from")}

              {tr(' ')}
              <KTex math={String.raw`10^{10}`} />{tr(" to")}{tr(' ')}
              <KTex math={String.raw`10^{20}`} />{tr(" eV. The primary dataset comprises 192,000 showers at ")}
              <KTex math={String.raw`10^{13}`} />{tr(" eV and 1,000,000 showers at")}{tr(' ')}
              <KTex math={String.raw`10^{17}`} />{tr(" eV.")}
            </p>
            <p style={p}>{tr("The null model itself was implemented in Python, using Monte Carlo sampling for validation and the analytical expressions derived from order statistics for exact reference distributions. Data extraction, multiplicity weighting, and comparison plots were all produced in Python. The full codebase is available in the GitHub repository linked below.")}





            </p>
          </Fade>

          <Divider t={t} />

          {/* §4 — The Null Model */}
          <Fade delay={0.1}>
            <SectionLabel number={4} label={tr("The Null Model")} t={t} />
            <SectionTitle t={t}>{tr("Uniform breaking of a unit segment.")}</SectionTitle>

            <p style={p}>{tr("The null model treats energy fragmentation as a problem analogous to the")}
              {tr(' ')}
              <em>{tr("uniform breaking of a unit segment")}</em>{tr(". Given a primary particle with energy")}{tr(' ')}
              <KTex math={String.raw`E_0`} />{tr(", its partition among")}{tr(' ')}
              <KTex math={String.raw`n`} />{tr(" secondaries is modeled by drawing")}{tr(' ')}
              <KTex math={String.raw`n - 1`} />{tr(" uniform random points on")}{tr(' ')}
              <KTex math={String.raw`[0, 1]`} />{tr(", dividing it into")}{tr(' ')}
              <KTex math={String.raw`n`} />{tr(" segments. The length of the largest segment is recorded, and the process is repeated millions of times to build the probability distribution of maximum fragment sizes.")}


            </p>
            <p style={p}>{tr("While the Monte Carlo simulation provides a robust numerical approximation, the distribution of the maximum fragment admits a")}

              {tr(' ')}
              <strong style={{ color: accent }}>{tr("closed analytical solution")}</strong>{tr(" via order statistics.")}
            </p>

            <DefBox title={tr("Survival function — Maximum fragment")} t={t} color={accent}>
              <EqBlock
                math={String.raw`P\!\left(V^{(n)} > x\right) = \sum_{k=1}^{\lfloor 1/x \rfloor} (-1)^{k-1} \binom{n}{k}(1-kx)^{n-1}`}
                color={accent} t={t} />

              <p style={{ ...p, marginBottom: 0, textAlign: 'left', fontStyle: 'italic', fontSize: '1.1rem' }}>{tr("The sum runs over indices")}
                {tr(' ')}
                <KTex math={String.raw`k`} />{tr(" such that")}{tr(' ')}
                <KTex math={String.raw`1 - kx > 0`} />.{tr(' ')}
                <KTex math={String.raw`V^{(n)}`} />{tr(" denotes the maximum of")}{tr(' ')}
                <KTex math={String.raw`n`} />{tr(" uniform spacings.")}
              </p>
            </DefBox>

            <p style={p}>{tr("Differentiating with respect to")}
              {tr(' ')}
              <KTex math={String.raw`x`} />{tr(" yields the exact probability density function of the null model:")}

            </p>

            <DefBox title={tr("PDF — Null Model (fixed multiplicity)")} t={t} color={teal}>
              <EqBlock
                math={String.raw`f(x) = n(n-1)\sum_{k=1}^{\lfloor 1/x \rfloor} (-1)^{k-1} \binom{n-1}{k-1}(1-kx)^{n-2}`}
                color={teal} t={t} />

              <p style={{ ...p, marginBottom: 0, textAlign: 'left', fontStyle: 'italic', fontSize: '1.1rem' }}>{tr("This is the exact limiting behavior of the null model for a fixed secondary multiplicity ")}

                <KTex math={String.raw`n`} />{tr(". The histograms in the simulations are discrete representations of this function.")}

              </p>
            </DefBox>

            <p style={p}>{tr("For ")}
              <KTex math={String.raw`n = 3`} />{tr(", the expected maximum fragment carries roughly ")}
              <KTex math={String.raw`61\%`} />{tr(" of the total energy on average. As multiplicity grows, this bias shrinks: for")}
              {tr(' ')}
              <KTex math={String.raw`n = 100`} />{tr(", the expected maximum is near")}{tr(' ')}
              <KTex math={String.raw`5\%`} />{tr(". This is the selection bias the null model quantifies.")}
            </p>
          </Fade>

          <Divider t={t} />

          {/* §5 — Variable Multiplicity */}
          <Fade delay={0.1}>
            <SectionLabel number={5} label={tr("Variable Multiplicity")} t={t} />
            <SectionTitle t={t}>{tr("Refinement via the Law of Total Probability.")}</SectionTitle>

            <p style={p}>{tr("A fundamental incompatibility arose when preparing the direct comparison: the initial null model operated with a fixed secondary multiplicity")}

              {tr(' ')}
              <KTex math={String.raw`n`} />{tr(", while CONEX simulations produce a variable number of secondaries per event \u2014 reflecting the stochastic nature of hadronic interactions. In the 192,000 proton-initiated showers at")}

              {tr(' ')}
              <KTex math={String.raw`10^{13}`} />{tr(" eV, the multiplicity distribution had median 50, mode 40, and ranged from 16 to 242.")}

            </p>
            <p style={p}>{tr("The solution was to apply the")}
              {tr(' ')}
              <strong style={{ color: violet }}>{tr("Law of Total Probability")}</strong>{tr(", weighting each fixed-")}
              <KTex math={String.raw`n`} />{tr(" null model distribution by the empirical frequency of that multiplicity observed in CONEX:")}

            </p>

            <DefBox title={tr("Null Model — Stochastic multiplicity")} t={t} color={violet}>
              <EqBlock
                math={String.raw`\mathbb{P}(A) = \sum_{n} \mathbb{P}(A \mid B_n)\,\mathbb{P}(B_n)`}
                color={violet} t={t} />

              <p style={{ ...p, marginBottom: 0, textAlign: 'left', fontStyle: 'italic', fontSize: '1.1rem' }}>
                <KTex math={String.raw`\mathbb{P}(A \mid B_n)`} />{tr(" is the null model prediction for fixed multiplicity ")}
                <KTex math={String.raw`n`} />{tr(", and")}{tr(' ')}
                <KTex math={String.raw`\mathbb{P}(B_n)`} />{tr(" is the frequency of multiplicity")}{tr(' ')}
                <KTex math={String.raw`n`} />{tr(" observed in CONEX. The resulting")}{tr(' ')}
                <KTex math={String.raw`\mathbb{P}(A)`} />{tr(" is the fully refined reference distribution.")}
              </p>
            </DefBox>

            <p style={p}>{tr("This refinement yielded a null model that peaks sharply at low energy fractions (near ")}

              <KTex math={String.raw`x \approx 0.05`} />{tr("), consistent with the high multiplicities typically observed. This is the correct reference against which the CONEX data must be compared.")}


            </p>
          </Fade>

          <Divider t={t} />

          {/* §6 — Results */}
          <Fade delay={0.1}>
            <SectionLabel number={6} label={tr("Results")} t={t} />
            <SectionTitle t={t}>{tr("A radical departure from uniformity.")}</SectionTitle>

            <p style={p}>{tr("Confronting the refined null model against the CONEX simulations revealed a")}
              {tr(' ')}
              <strong style={{ color: accent }}>{tr("striking discrepancy")}</strong>{tr(". While the null model concentrates near low energy fractions, the CONEX distribution exhibits a pronounced peak at very high fractions \u2014 including a sharp spike near")}

              {tr(' ')}
              <KTex math={String.raw`x \to 1`} />{tr(", indicating events where nearly all the primary energy is transferred to a single secondary. This pattern persisted across all energy regimes tested, from")}

              {tr(' ')}
              <KTex math={String.raw`10^{10}`} />{tr(" to")}{tr(' ')}
              <KTex math={String.raw`10^{20}`} />{tr(" eV.")}
            </p>
            <p style={p}>{tr("The divergence was so evident that a formal statistical test became unnecessary. The physical models predict energy splitting far more asymmetric than any purely uniform process \u2014 providing strong evidence for the leading particle effect. The shower development is not democratic: it is dominated by the branch initiated by the single most energetic secondary.")}





            </p>

            <Pullquote t={t}>{tr("The incompatibility between the null model and CONEX was so pronounced that it rendered a formal hypothesis test redundant.")}


            </Pullquote>

            <p style={p}>{tr("The central remaining question was: ")}
              <em>{tr("which particle is this leader?")}</em>{tr(" Analyzing the secondaries that received the largest energy fraction in each shower, pions were found to be predominant across all events \u2014 including those where nearly the full primary energy was concentrated in a single secondary.")}



            </p>

            {/* Tabela */}
            <div style={{
              margin: '2rem 0',
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.78rem',
                color: t.textDim
              }}>
                <thead>
                  <tr>
                    {tr(['Energy Fraction', 'Proton', 'Neutron', 'Pion', 'Other'].map((h, i) =>
                    <th key={i} style={{
                      padding: '0.6rem 1rem',
                      borderBottom: `1px solid ${accent}44`,
                      color: accent,
                      fontWeight: 400,
                      textAlign: i === 0 ? 'left' : 'center',
                      letterSpacing: '0.08em'
                    }}>{tr(h)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tr([
                  { label: 'All events', p: 33461, n: 34947, pi: '~largest share', o: 24811 },
                  { label: 'eMax > 0.9', p: 4587, n: 5064, pi: 5564, o: 1245 },
                  { label: 'eMax > 0.99', p: 2274, n: 2970, pi: 1847, o: 413 }].
                  map((row, i) =>
                  <tr key={i} style={{ borderBottom: `1px solid ${accent}18` }}>
                      <td style={{ padding: '0.55rem 1rem', color: t.text, textAlign: 'left' }}>{tr(row.label)}</td>
                      <td style={{ padding: '0.55rem 1rem', textAlign: 'center' }}>{tr(row.p.toLocaleString())}</td>
                      <td style={{ padding: '0.55rem 1rem', textAlign: 'center' }}>{tr(row.n.toLocaleString())}</td>
                      <td style={{ padding: '0.55rem 1rem', textAlign: 'center', color: gold, fontWeight: 600 }}>
                        {tr(typeof row.pi === 'number' ? row.pi.toLocaleString() : row.pi)}
                      </td>
                      <td style={{ padding: '0.55rem 1rem', textAlign: 'center' }}>{tr(row.o.toLocaleString())}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.68rem',
                color: t.textDim,
                opacity: 0.6,
                marginTop: '0.6rem',
                textAlign: 'left'
              }}>{tr("Tab. 1 \u2014 Secondary particle composition across 192,000 proton-initiated showers at 10\xB9\xB3 eV. The rows distinguish different energy thresholds. Note: the total pion count in the \"All events\" row was subject to a counting error in the original report and is under revision; the dominance of pions remains significant after recount.")}





              </p>
            </div>
          </Fade>

          <Divider t={t} />

          {/* §7 — Muon Puzzle */}
          <Fade delay={0.1}>
            <SectionLabel number={7} label={tr("Connection to the Muon Puzzle")} t={t} />
            <SectionTitle t={t}>{tr("Pions as leaders \u2014 a new investigative front.")}</SectionTitle>

            <p style={p}>{tr("The muonic component of extensive air showers is generated predominantly by the decay of charged pions. If a pion carries a disproportionately large fraction of the primary energy \u2014 acting as the leading particle \u2014 it directly modifies the dynamics of that decay and, consequently, the total number of muons reaching the ground.")}




            </p>
            <p style={p}>{tr("A highly energetic leading pion can suppress or delay muon production relative to a uniform fragmentation scenario: rather than distributing energy democratically across many decay chains, the shower concentrates it in a single pion branch. This mechanism offers a physically plausible pathway toward explaining the systematic excess of muons observed experimentally over what current simulations predict.")}





            </p>

            <div style={{
              margin: '2rem 0',
              padding: '1.4rem 2rem',
              background: `${gold}08`,
              border: `1px solid ${gold}30`,
              borderRadius: 8,
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: '1.15rem',
              color: t.textDim,
              lineHeight: 2.0
            }}>
              {tr([
              { label: 'Uniform fragmentation', desc: 'Energy spreads across many secondaries → standard muon yield', color: teal },
              { label: 'Leading pion effect', desc: 'Single energetic pion dominates → altered decay dynamics', color: gold },
              { label: 'Observable consequence', desc: 'Modified muon count at ground level → potential resolution of the Puzzle', color: accent }].
              map(({ label, desc, color }, i) =>
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                  <span style={{ color, fontWeight: 700, minWidth: '1rem' }}>→</span>
                  <strong style={{ color }}>{tr(label)}:</strong>
                  <span style={{ opacity: 0.75 }}>{tr(desc)}</span>
                </div>
              ))}
            </div>

            <p style={p}>{tr("This line of investigation emerged as an unexpected result beyond the original project scope, substantially raising its scientific impact. It motivates the current renewal of the FAPESP grant, with the next phase dedicated to quantifying how the leading particle mechanism modifies the muon count across a range of primary energies and particle types.")}





            </p>
          </Fade>

          <Divider t={t} />

          {/* ── Encerramento ── */}
          <Fade delay={0.1}>
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${accent}0c, transparent)`,
              borderRadius: 12
            }}>
              <p style={{
                fontFamily: 'Georgia, Cambria, serif',
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: t.textDim,
                marginBottom: '2.5rem',
                lineHeight: 1.65
              }}>{tr("Energy is not shared.")}
                <br />{tr("It is surrendered to one.")}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem'
              }}>
                {tr([
                { label: '↗ GitHub', href: 'https://github.com/davisilva169/Null-Model-of-Uniform-Fragmentation', primary: true },
                { label: '↗ FAPESP 2024/21601-7', href: 'https://bv.fapesp.br/en/bolsas/224660/building-a-statistical-test-for-energetic-splitting-in-cosmic-ray-cascades/?q=2024/21601-7', primary: false }].
                map(({ label, href, primary }) =>
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '11px 22px',
                    border: `1px solid ${primary ? accent : accent + '66'}`,
                    color: primary ? accent : t.textDim,
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                    borderRadius: 6,
                    textTransform: 'uppercase',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {e.currentTarget.style.background = `${accent}18`;}}
                  onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';}}>

                    {tr(label)}
                  </a>
                ))}
              </div>

              <BackButton t={t} onClick={() => setActive('Research')} label={tr("BACK TO RESEARCH")} />
            </div>
          </Fade>

        </article>
      </div>
    </div>);

};

export default UniformFragmentation;
