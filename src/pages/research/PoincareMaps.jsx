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

import pdfFile from './data_research/Poincare.pdf';

/* ─── Componente principal ───────────────────────────────────────────────── */
const PoincareMaps = ({ t, setActive, toggleParticles, particlesOn }) => {const { tr } = useI18n();

  const [showParticles, setShowParticles] = useState(particlesOn !== false);

  /* Restaura partículas ao sair da página */
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

  /* Corpo do texto: textDim — mais apagado que o título (t.text) */
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
            }}>{tr("Discrete Dynamical Systems \xB7 2025 \xB7 Completed")}

            </div>

            <h1 style={{
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: t.text,
              fontWeight: 500,
              margin: '0 0 1rem',
              lineHeight: 1.08,
              letterSpacing: '-0.02em'
            }}>{tr("Poincar\xE9 Maps")}

            </h1>

            <p style={{
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: '1.15rem',
              color: t.textDim,
              fontStyle: 'italic',
              lineHeight: 1.65,
              margin: '0 0 1.5rem',
              maxWidth: 600
            }}>{tr("From Hamiltonian geometry to deterministic chaos \u2014 a visual monograph on how order dissolves into complexity in the Duffing oscillator.")}


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
              <span>2025</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{tr("Monograph")}</span>
            </div>

            <Divider t={t} />
          </div>
        </Fade>

        {/* ── Conteúdo ── */}
        <article style={{ maxWidth: 850, margin: '0 auto', padding: '0 max(5vw, 20px) 6rem', width: '100%' }}>

          {/* §1 — Abstract */}
          <Fade>
            <SectionLabel number={1} label={tr("Abstract")} t={t} />
            <SectionTitle t={t}>{tr("A visual introduction to chaos.")}</SectionTitle>

            <p style={p}>{tr("This monograph proposes a visual introduction to the study of Poincar\xE9 maps through the analysis of the Duffing Oscillator: a non-linear dynamical system that exemplifies, with remarkable clarity, the transition from regular motion to chaos.")}



            </p>
            <p style={p}>{tr("The work is structured in four stages: we begin with the Hamiltonian formulation in the conservative regime. Next, we explore the effects of introducing damping and periodic forcing into the Duffing equation, discussing its bifurcations and qualitative regimes. Based on this, we analyze the structure of phase space and the organization of trajectories around critical points. Finally, we present the Poincar\xE9 map as a fundamental tool for reducing continuous systems to discrete dynamics \u2014 clearly visualizing the emergence of limit cycles and the progressive complexification to the chaotic regime.")}








            </p>

            <Pullquote t={t}>{tr("Through computational simulations and diagrams, we reveal how chaos emerges from simple deterministic systems.")}


            </Pullquote>
          </Fade>

          <Divider t={t} />

          {/* §2 — Hamiltonian structure */}
          <Fade delay={0.1}>
            <SectionLabel number={2} label={tr("Hamiltonian Systems")} t={t} />
            <SectionTitle t={t}>{tr("Symplectic geometry of phase space.")}</SectionTitle>

            <p style={p}>{tr("A physical system is described by all conceivable permutations of configurations admitted by the laws of physics. This generates a ")}

              <em>{tr("phase space")}</em>{tr(' ')}
              <KTex math={String.raw`\mathcal{M}`} />{tr(", decomposed in terms of generalized coordinates ")}
              <KTex math={String.raw`\mathbf{q}`} />{tr(" and their conjugate momenta")}{tr(' ')}
              <KTex math={String.raw`\mathbf{p}`} />{tr(". With ")}<KTex math={String.raw`n`} />{tr(" degrees of freedom, we obtain a manifold of dimension ")}
              <KTex math={String.raw`2n`} />.
            </p>

            <p style={p}>{tr("Phase spaces admit a ")}
              <em>{tr("symplectic geometry")}</em>{tr(" defined by a closed, non-degenerate 2-form ")}
              <KTex math={String.raw`\omega`} />:
            </p>

            <EqBlock
              math={String.raw`\omega = \sum_{i=1}^{n} dp_i \wedge dq_i = d\mathbf{p} \wedge d\mathbf{q}`}
              color={accent} label={tr("symplectic form")} t={t} />


            <p style={p}>{tr("The Hamiltonian equations of motion follow naturally from this structure. Given a Hamiltonian ")}

              <KTex math={String.raw`\mathcal{H}(\mathbf{p}, \mathbf{q}, t)`} />{tr(", the dynamics read:")}

            </p>

            <EqBlock
              math={String.raw`\frac{d\mathbf{p}}{dt} = -\frac{\partial \mathcal{H}}{\partial \mathbf{q}}, \qquad \frac{d\mathbf{q}}{dt} = \frac{\partial \mathcal{H}}{\partial \mathbf{p}}`}
              color={teal} label={tr("Hamilton's equations")} t={t} />


            <p style={p}>{tr("Solutions of these equations define integral curves, or ")}
              <em>{tr("flows")}</em>{tr(", in phase space. Associated to each point in ")}
              <KTex math={String.raw`\mathcal{M}`} />{tr(", the solutions stream like a fluid \u2014 a picture that proves surprisingly fruitful.")}

            </p>
          </Fade>

          <Divider t={t} />

          {/* §3 — Liouville */}
          <Fade delay={0.1}>
            <SectionLabel number={3} label={tr("Liouville's Theorem")} t={t} />
            <SectionTitle t={t}>{tr("Volume is conserved under Hamiltonian flow.")}</SectionTitle>

            <p style={p}>{tr("A fundamental consequence of symplectic structure is the preservation of phase space volume. The total volume element is given by the Liouville form:")}


            </p>

            <EqBlock
              math={String.raw`\Omega = \frac{\omega^n}{n!} = \pm\, d^n\mathbf{p}\, d^n\mathbf{q}`}
              color={gold} label={tr("Liouville volume")} t={t} />


            <p style={p}>{tr("Using Cartan's magic formula and the fact that")}
              {tr(' ')}
              <KTex math={String.raw`d\mathcal{H} = -i_\phi\,\omega`} />{tr(", one shows that the Lie derivative of ")}
              <KTex math={String.raw`\omega`} />{tr(" along the Hamiltonian flow vanishes:")}

            </p>

            <EqBlock
              math={String.raw`\mathcal{L}_\phi\,\omega = d(i_\phi\,\omega) + i_\phi(d\omega) = d(d\mathcal{H}) + 0 = 0`}
              color={gold} label={tr("proof sketch")} t={t} />


            <DefBox title={tr("Liouville's Theorem")} t={t} color={gold}>
              <p style={{ ...p, marginBottom: 0, textAlign: 'left', fontStyle: 'italic' }}>{tr("The volume of any region in phase space is conserved under Hamiltonian evolution. Equivalently,")}

                {tr(' ')}
                <KTex math={String.raw`\mathcal{L}_\phi\,\Omega = n\,\omega^{n-1}(\mathcal{L}_\phi\,\omega) = 0`} />.
              </p>
            </DefBox>

            <p style={p}>{tr("This result has deep physical content: phase space flows are incompressible. A cloud of initial conditions may stretch and deform, but its volume is eternal.")}


            </p>
          </Fade>

          <Divider t={t} />

          {/* §4 — Equilibrium classification */}
          <Fade delay={0.1}>
            <SectionLabel number={4} label={tr("Classification of Flows")} t={t} />
            <SectionTitle t={t}>{tr("Poincar\xE9's stability criterion.")}</SectionTitle>

            <p style={p}>{tr("To classify the qualitative behavior of Hamiltonian flows near equilibria, we linearize. At an equilibrium point ")}

              <KTex math={String.raw`\mathbf{x}_e`} />{tr(" where")}{tr(' ')}
              <KTex math={String.raw`\dot{\mathbf{x}}_e = 0`} />{tr(", a Taylor expansion gives:")}
            </p>

            <EqBlock
              math={String.raw`\dot{\mathbf{a}} \approx A\,\mathbf{a}, \quad A = DX(\mathbf{x}_e), \quad \mathbf{a} = \mathbf{x} - \mathbf{x}_e`}
              color={violet} label={tr("linearization")} t={t} />


            <p style={p}>{tr("The nature of the equilibrium is determined entirely by the eigenvalues of")}
              {tr(' ')}
              <KTex math={String.raw`A`} />{tr(", which satisfy:")}
            </p>

            <EqBlock
              math={String.raw`\lambda^2 - \tau\lambda + \delta = 0, \quad \tau = \operatorname{tr} A,\quad \delta = \det A,\quad \Delta = \tau^2 - 4\delta`}
              color={violet} label={tr("characteristic equation")} t={t} />


            <div style={{
              margin: '2rem 0',
              padding: '1.4rem 2rem',
              background: `${violet}08`,
              border: `1px solid ${violet}30`,
              borderRadius: 8,
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: '1.1rem',
              color: t.textDim,
              lineHeight: 2.0
            }}>
              {tr([
              { cond: String.raw`\delta < 0`, type: 'Saddle point', stability: 'Unstable', color: t.error },
              { cond: String.raw`\delta > 0,\, \tau < 0,\, \Delta > 0`, type: 'Stable node', stability: 'Asymptotically stable', color: teal },
              { cond: String.raw`\delta > 0,\, \tau < 0,\, \Delta < 0`, type: 'Stable spiral', stability: 'Asymptotically stable', color: teal },
              { cond: String.raw`\delta > 0,\, \tau = 0`, type: 'Center', stability: 'Neutrally stable', color: gold }].
              map(({ cond, type, stability, color }, i) =>
              <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <KTex math={cond} />
                  <span style={{ opacity: 0.4 }}>→</span>
                  <strong style={{ color }}>{tr(type)}</strong>
                  <span style={{ opacity: 0.5, fontSize: '0.9em' }}>({tr(stability)})</span>
                </div>
              ))}
            </div>

            <p style={p}>{tr("For the simple pendulum, the equilibrium at")}
              {tr(' ')}
              <KTex math={String.raw`(0,0)`} />{tr(" is a center and the points")}{tr(' ')}
              <KTex math={String.raw`(\pm\pi, 0)`} />{tr(" are saddles, producing the iconic separatrix between oscillatory and rotational regimes.")}

            </p>
          </Fade>

          <Divider t={t} />

          {/* §5 — Duffing oscillator */}
          <Fade delay={0.1}>
            <SectionLabel number={5} label={tr("The Duffing Oscillator")} t={t} />
            <SectionTitle t={t}>{tr("A paradigm of nonlinear dynamics.")}</SectionTitle>

            <p style={p}>{tr("Named after engineer Georg Duffing (1861\u20131944), the Duffing oscillator is a second-order nonlinear system with damping and periodic external excitation:")}


            </p>

            <DefBox title={tr("Duffing Oscillator")} t={t} color={teal}>
              <EqBlock
                math={String.raw`\ddot{x} + \delta\dot{x} + \alpha x + \beta x^3 = \Gamma\cos(\omega t)`}
                color={teal} t={t} />

              <p style={{ ...p, marginBottom: 0, textAlign: 'left', fontSize: '1.1rem' }}>{tr("where ")}
                <KTex math={String.raw`\alpha, \beta`} />{tr(" define linear and cubic stiffness,")}{tr(' ')}
                <KTex math={String.raw`\delta`} />{tr(" is damping, and")}{tr(' ')}
                <KTex math={String.raw`\Gamma\cos(\omega t)`} />{tr(" is the periodic forcing.")}
              </p>
            </DefBox>

            <p style={p}>{tr("In the conservative regime (")}
              <KTex math={String.raw`\delta = \Gamma = 0`} />{tr("), the system evolves in a")}
              {tr(' ')}
              <strong style={{ color: teal }}>{tr("double-well potential")}</strong>:
            </p>

            <EqBlock
              math={String.raw`V(x) = \frac{1}{4}x^4 - \frac{1}{2}x^2`}
              color={teal} label={tr("double-well potential")} t={t} />


            <p style={p}>{tr("This potential has two stable minima at ")}
              <KTex math={String.raw`x = \pm 1`} />{tr(" and an unstable maximum at ")}
              <KTex math={String.raw`x = 0`} />{tr(". Low-energy trajectories oscillate around one well; above the separatrix energy, trajectories can transition between wells. The three equilibrium points \u2014 one saddle and two centers \u2014 organize the entire phase portrait.")}



            </p>

            <Pullquote t={t}>{tr("At ")}
              <KTex math={String.raw`x = 0`} />{tr(", the Jacobian always yields opposite-sign eigenvalues \u2014 a permanent saddle. At ")}
              <KTex math={String.raw`x = \pm 1`} />{tr(", stability depends on ")}
              <KTex math={String.raw`\alpha`} />.
            </Pullquote>
          </Fade>

          <Divider t={t} />

          {/* §6 — Transition to chaos */}
          <Fade delay={0.1}>
            <SectionLabel number={6} label={tr("Transition to Chaos")} t={t} />
            <SectionTitle t={t}>{tr("Bifurcations and strange attractors.")}</SectionTitle>

            <p style={p}>{tr("Once we reintroduce damping and periodic forcing, the invariant structures of the Hamiltonian system are gradually destroyed. As we vary")}

              {tr(' ')}
              <KTex math={String.raw`\Gamma`} />{tr(" or ")}<KTex math={String.raw`\omega`} />{tr(", the system undergoes a cascade of fixed-point bifurcations in its Poincar\xE9 map:")}

            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
              {tr([
              { step: '01', label: 'Period-doubling', text: 'Stable orbit of period T bifurcates to period 2T.', color: gold },
              { step: '02', label: 'Cascade', text: 'Successive doublings lead to periods 2ⁿT.', color: violet },
              { step: '03', label: 'Chaos', text: 'A critical threshold where dynamics become aperiodic.', color: t.error }].
              map(({ step, label, text, color }) =>
              <div key={step} style={{
                padding: '1.4rem',
                background: `${color}08`,
                border: `1px solid ${color}33`,
                borderRadius: 8
              }}>
                  <div style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.6rem',
                  color: color,
                  letterSpacing: '0.18em',
                  marginBottom: '0.6rem'
                }}>{tr(step)}</div>
                  <div style={{
                  fontFamily: 'Georgia, Cambria, serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: t.text,
                  marginBottom: '0.5rem'
                }}>{tr(label)}</div>
                  <div style={{
                  fontFamily: 'Georgia, Cambria, serif',
                  fontSize: '1rem',
                  color: t.textDim,
                  lineHeight: 1.6
                }}>{tr(text)}</div>
                </div>
              ))}
            </div>

            <p style={p}>{tr("The largest Lyapunov exponent ")}
              <KTex math={String.raw`\lambda_L`} />{tr(" provides a quantitative measure of this sensitivity:")}

            </p>

            <EqBlock
              math={String.raw`\lambda_L = \lim_{t \to \infty} \frac{1}{t} \ln \frac{\|\delta\mathbf{x}(t)\|}{\|\delta\mathbf{x}(0)\|}`}
              color={t.error} label={tr("Lyapunov exponent")} t={t} />


            <p style={p}>{tr("Values ")}
              <KTex math={String.raw`\lambda_L > 0`} />{tr(" confirm chaotic regimes \u2014 nearby trajectories diverge exponentially. Values")}
              {tr(' ')}
              <KTex math={String.raw`\lambda_L < 0`} />{tr(" indicate attraction to stable orbits.")}
            </p>
          </Fade>

          <Divider t={t} />

          {/* §7 — Poincaré map */}
          <Fade delay={0.1}>
            <SectionLabel number={7} label={tr("Poincaré Maps")} t={t} />
            <SectionTitle t={t}>{tr("Reducing flows to discrete dynamics.")}</SectionTitle>

            <p style={p}>{tr("Given a differential equation")}
              {tr(' ')}
              <KTex math={String.raw`\dot{\mathbf{x}} = \mathcal{H}(\mathbf{x}, t)`} />{tr(", its")}{tr(' ')}
              <strong style={{ color: accent }}>{tr("Poincar\xE9 return map")}</strong>{tr(" is the map")}{tr(' ')}
              <KTex math={String.raw`P : J \to \mathbb{R}`} />{tr(" defined by:")}
            </p>

            <DefBox title={tr("Definition — Poincaré Return Map")} t={t} color={accent}>
              <EqBlock
                math={String.raw`P(x_0) = x_1 = x(T), \quad x(0) = x_0`}
                color={accent} t={t} />

              <p style={{ ...p, marginBottom: 0, textAlign: 'left', fontStyle: 'italic', fontSize: '1.1rem' }}>{tr("where ")}
                <KTex math={String.raw`J \subset \mathbb{R}`} />{tr(" is the domain of initial conditions for which the solution exists on")}
                {tr(' ')}
                <KTex math={String.raw`[0, T]`} />{tr(". Fixed points of")}{tr(' ')}
                <KTex math={String.raw`P`} />{tr(" correspond to periodic orbits of the flow.")}
              </p>
            </DefBox>

            <p style={p}>{tr("For the forced Duffing oscillator, we sample")}
              {tr(' ')}
              <KTex math={String.raw`(x(t), \dot{x}(t))`} />{tr(" at discrete times")}{tr(' ')}
              <KTex math={String.raw`t = nT`} />{tr(" where")}{tr(' ')}
              <KTex math={String.raw`T = 2\pi/\omega`} />{tr(". This discretization reveals a remarkable taxonomy:")}

            </p>

            <div style={{
              margin: '2rem 0',
              padding: '1.4rem 2rem',
              background: `${accent}08`,
              border: `1px solid ${accent}30`,
              borderRadius: 8,
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: '1.15rem',
              color: t.textDim,
              lineHeight: 2.2
            }}>
              {tr([
              { symbol: '·', label: 'Single point', meaning: 'Periodic orbit (period T)', color: teal },
              { symbol: '⋮', label: 'Finite set', meaning: 'Periodic orbit (period nT)', color: gold },
              { symbol: '∿', label: 'Dense curve', meaning: 'Quasi-periodic orbit', color: violet },
              { symbol: '✦', label: 'Fractal cloud', meaning: 'Strange attractor — chaos', color: t.error }].
              map(({ symbol, label, meaning, color }, i) =>
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <span style={{ color, fontWeight: 700, fontSize: '1.2em', minWidth: '1.5rem' }}>{tr(symbol)}</span>
                  <strong style={{ color }}>{tr(label)}</strong>
                  <span style={{ opacity: 0.4 }}>→</span>
                  <span>{tr(meaning)}</span>
                </div>
              ))}
            </div>

            <Pullquote t={t}>{tr("The Poincar\xE9 map does not simplify chaos \u2014 it makes it visible.")}

            </Pullquote>
          </Fade>

          <Divider t={t} />

          {/* §8 — Hartman–Grobman */}
          <Fade delay={0.1}>
            <SectionLabel number={8} label={tr("Hartman–Grobman Theorem")} t={t} />
            <SectionTitle t={t}>{tr("Linearization is locally exact.")}</SectionTitle>

            <p style={p}>{tr("The stability analysis via linearization is rigorously justified by a deep topological result. Let ")}

              <KTex math={String.raw`\Omega \subset \mathbb{R}^n`} />{tr(" be an open set, ")}
              <KTex math={String.raw`f \in C^1(\Omega)`} />{tr(", and")}{tr(' ')}
              <KTex math={String.raw`\phi_t`} />{tr(" the flow of the nonlinear system. Suppose")}{tr(' ')}
              <KTex math={String.raw`f(0) = 0`} />{tr(" and the matrix")}{tr(' ')}
              <KTex math={String.raw`A = Df(0)`} />{tr(" has no eigenvalues with zero real part.")}
            </p>

            <DefBox title={tr("Theorem — Hartman–Grobman")} t={t} color={violet}>
              <p style={{ ...p, fontStyle: 'italic', marginBottom: '1rem', textAlign: 'left' }}>{tr("There exists a homeomorphism ")}
                <KTex math={String.raw`h: U \to V`} />{tr(" such that for all ")}
                <KTex math={String.raw`x_0 \in U`} />:
              </p>
              <EqBlock
                math={String.raw`h \circ \phi_t(x_0) = e^{At}\, h(x_0), \quad t \in J(x_0)`}
                color={violet} t={t} />

              <p style={{ ...p, marginBottom: 0, textAlign: 'left', fontSize: '1.1rem' }}>{tr("The nonlinear flow and its linearization are")}
                {tr(' ')}
                <strong style={{ color: violet }}>{tr("topologically conjugate")}</strong>{tr(" near hyperbolic equilibria \u2014 trajectories map to trajectories with time preserved.")}

              </p>
            </DefBox>

            <p style={p}>{tr("In other words: locally, near a hyperbolic fixed point, the nonlinear system \"looks like\" its linearization up to a continuous deformation of coordinates. This theorem underpins the entire equilibrium classification above, making it not just an approximation, but an exact topological statement.")}




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
              }}>{tr("Order is not the absence of chaos.")}

                <br />{tr("It is chaos not yet unfolded.")}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem'
              }}>
                {tr([
                { label: '↓ Download PDF', href: pdfFile, download: true, primary: true },
                { label: '↗ GitHub', href: 'https://github.com/davisilva169/Poincar-Maps', download: false, primary: false }].
                map(({ label, href, download, primary }) =>
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

export default PoincareMaps;
