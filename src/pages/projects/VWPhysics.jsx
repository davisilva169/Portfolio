import { useI18n } from "../../i18n/context";import { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Fade from '../../components/Fade';

import capaVW from './data_projects/Fisica-VW-APOEMA.png';

/* ─── palette retirada da logo ─────────────────────────────────────────────── */
const COPPER_LIGHT = '#F2A900';
const COPPER_MID = '#B5651D';
const COPPER_DARK = '#955017';

/* ─── componente principal ──────────────────────────────────────────────────── */
const VWPhysics = ({ t, setActive }) => {const { tr } = useI18n();

  const [logoLoaded, setLogoLoaded] = useState(false);
  const [hovered, setHovered] = useState(null);

  /* Garante que a animação de entrada só roda após a imagem carregar */
  useEffect(() => {
    const img = new Image();
    img.src = capaVW;
    img.onload = () => setLogoLoaded(true);
  }, []);

  const socials = [
  {
    id: 'youtube',
    label: 'YouTube',
    sub: '@FísicaVW',
    href: 'https://www.youtube.com/@FisicaVW',
    icon:
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z" />
        </svg>

  },
  {
    id: 'instagram',
    label: 'Instagram',
    sub: '@fisica.vw',
    href: 'https://www.instagram.com/fisica.vw',
    icon:
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>

  },
  {
    id: 'github',
    label: 'GitHub',
    sub: 'davisilva169',
    href: 'https://github.com/davisilva169',
    icon:
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>

  }];


  return (
    <div style={{
      background: t.background,
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* ── Halo de fundo cobre ── */}
      <div style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: `radial-gradient(ellipse at center, ${COPPER_MID}0a 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 'max(10vh, 80px)',
        paddingBottom: '6rem'
      }}>

        {/* ── Back button ── */}
        <div style={{ width: '100%', maxWidth: 850, padding: '0 max(5vw, 20px)', marginBottom: '3rem' }}>
          <BackButton t={t} onClick={() => setActive('Projects')} label={tr("BACK TO PROJECTS")} />
        </div>

        {/* ── Logo hero ── */}
        <Fade>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
            marginBottom: '4rem'
          }}>

            {/* Anel decorativo externo */}
            <div style={{
              position: 'relative',
              width: 'clamp(220px, 30vw, 320px)',
              height: 'clamp(220px, 30vw, 320px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* SVG ring animado */}
              <svg
                viewBox="0 0 320 320"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: logoLoaded ? 1 : 0,
                  transition: 'opacity 1.2s ease'
                }}>

                <defs>
                  <linearGradient id="copperRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={COPPER_LIGHT} stopOpacity="0.15" />
                    <stop offset="50%" stopColor={COPPER_MID} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={COPPER_DARK} stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <circle
                  cx="160" cy="160" r="152"
                  fill="none"
                  stroke="url(#copperRing)"
                  strokeWidth="1"
                  strokeDasharray="955"
                  strokeDashoffset={logoLoaded ? 0 : 955}
                  style={{ transition: 'stroke-dashoffset 2s ease' }} />

              </svg>

              {/* Logo */}
              <img
                src={capaVW}
                alt={tr("Física VW logo")}
                style={{
                  width: '88%',
                  height: '88%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  opacity: logoLoaded ? 1 : 0,
                  transform: logoLoaded ? 'scale(1)' : 'scale(0.92)',
                  transition: 'opacity 1s ease, transform 1.2s ease',
                  display: 'block'
                }} />

            </div>

            {/* Nome e tagline */}
            <div style={{
              marginTop: '2.4rem',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontFamily: 'Georgia, Cambria, serif',
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: t.text,
                margin: 0,
                lineHeight: 1
              }}>{tr("F\xEDsica")}

                <span style={{
                  background: `linear-gradient(135deg, ${COPPER_LIGHT}, ${COPPER_MID})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginLeft: '0.3em'
                }}>{tr("VW")}</span>
              </h1>

              <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: t.textDim,
                opacity: 0.55,
                marginTop: '1rem'
              }}>{tr("Science \xB7 Art \xB7 Animation")}

              </p>
            </div>
          </div>
        </Fade>

        {/* ── Linha divisória fina ── */}
        <div style={{
          width: 'clamp(40px, 6vw, 80px)',
          height: '1px',
          background: `linear-gradient(to right, transparent, ${COPPER_MID}66, transparent)`,
          marginBottom: '3.5rem'
        }} />

        {/* ── Descrição ── */}
        <Fade delay={0.15}>
          <div style={{
            maxWidth: '520px',
            padding: '0 max(5vw, 24px)',
            textAlign: 'center',
            marginBottom: '3.5rem'
          }}>
            <p style={{
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: '1.22rem',
              lineHeight: 1.85,
              color: t.textDim
            }}>{tr("A science communication project exploring the beauty of mathematics and physics through animated video essays. Built with")}

              {tr(' ')}
              <span style={{ color: COPPER_LIGHT, fontStyle: 'italic' }}>{tr("MANIM")}</span>{tr(" and Python, each video is a visual argument for the elegance hidden inside equations.")}

            </p>
          </div>
        </Fade>

        {/* ── Social links ── */}
        <Fade delay={0.25}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            width: 'clamp(280px, 50vw, 420px)',
            padding: '0 max(5vw, 24px)'
          }}>
            {tr(socials.map(({ id, label, sub, href, icon }, i) =>
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.1rem 0',
                borderBottom: i < socials.length - 1 ?
                `1px solid ${COPPER_MID}22` :
                'none',
                textDecoration: 'none',
                color: hovered === id ? COPPER_LIGHT : t.textDim,
                transition: 'color 0.25s ease',
                cursor: 'pointer'
              }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                  color: hovered === id ? COPPER_LIGHT : COPPER_DARK,
                  transition: 'color 0.25s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                    {tr(icon)}
                  </span>
                  <div>
                    <div style={{
                    fontFamily: 'Georgia, Cambria, serif',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    color: hovered === id ? COPPER_LIGHT : t.text,
                    transition: 'color 0.25s ease'
                  }}>
                      {tr(label)}
                    </div>
                    <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.67rem',
                    letterSpacing: '0.1em',
                    color: t.textDim,
                    opacity: 0.5,
                    marginTop: '1px'
                  }}>
                      {tr(sub)}
                    </div>
                  </div>
                </div>

                {/* Seta */}
                <span style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.9rem',
                color: COPPER_MID,
                opacity: hovered === id ? 1 : 0.3,
                transform: hovered === id ? 'translateX(4px)' : 'translateX(0)',
                transition: 'opacity 0.25s, transform 0.25s'
              }}>
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Fade>

        {/* ── Rodapé da página ── */}
        <Fade delay={0.35}>
          <p style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: t.textDim,
            opacity: 0.3,
            marginTop: '4rem',
            textAlign: 'center'
          }}>{tr("S\xE3o Carlos \xB7 IFSC-USP \xB7 2026")}

          </p>
        </Fade>

      </div>
    </div>);

};

export default VWPhysics;
