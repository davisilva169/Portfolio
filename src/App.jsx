import { useState } from "react";

// ─── Tema ─────────────────────────────────────────────────────────────────────
import { DARK, LIGHT } from "./themes";

// ─── Componentes globais ──────────────────────────────────────────────────────
import ParticleCanvas from "./components/ParticleCanvas";
import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";

// ─── Páginas principais ───────────────────────────────────────────────────────
import Home     from "./pages/Home";
import Research from "./pages/Research";
import Projects from "./pages/Projects";
import Blog     from "./pages/Blog";
import About    from "./pages/About";

// ─── Páginas de detalhe: Research ─────────────────────────────────────────────
import MuonPaper             from "./pages/research/MuonPaper";
import UniformFragmentation  from "./pages/research/UniformFragmentation";
import PoincareMaps          from "./pages/research/PoincareMaps";

// ─── Páginas de detalhe: Projects ─────────────────────────────────────────────
import VWPhysics from "./pages/projects/VWPhysics";

// ─── Páginas de detalhe: Blog ─────────────────────────────────────────────────
import ErrorTheorem from "./pages/blog/ErrorTheorem";

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [active,      setActive]      = useState("Home");
  const [dark,        setDark]        = useState(true);
  const [particlesOn, setParticlesOn] = useState(true);

  const t = dark ? DARK : LIGHT;

  const renderPage = () => {
    switch (active) {

      // ── Páginas principais ──────────────────────────────────────────────────
      case "Home":
        return <Home setActive={setActive} t={t} dark={dark} />;
      case "Research":
        return <Research t={t} setActive={setActive} />;
      case "Projects":
        return <Projects t={t} setActive={setActive} />;
      case "Blog":
        return <Blog t={t} setActive={setActive} />;
      case "About":
        return <About t={t} />;

      // ── Detalhes de Research ────────────────────────────────────────────────
      case "MuonPaper":
        return <MuonPaper t={t} setActive={setActive} />;
      case "UniformFragmentation":
        return <UniformFragmentation t={t} setActive={setActive} />;
      case "PoincareMaps":
        return <PoincareMaps t={t} setActive={setActive} />;

      // ── Detalhes de Projects ────────────────────────────────────────────────
      case "VWPhysics":
        return <VWPhysics t={t} setActive={setActive} />;

      // ── Detalhes de Blog ────────────────────────────────────────────────────
      case "ErrorTheorem":
        return (
          <ErrorTheorem
            t={t}
            setActive={setActive}
            toggleParticles={setParticlesOn}
            particlesOn={particlesOn}
          />
        );

      // ── Fallback ────────────────────────────────────────────────────────────
      default:
        return <Home setActive={setActive} t={t} dark={dark} />;
    }
  };

  return (
    <>
      {/* Estilos globais */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin:     0;
          padding:    0;
        }

        html { scroll-behavior: smooth; }

        body {
          background: ${t.bg};
          color:      ${t.text};
          min-height: 100vh;
          overflow-x: hidden;
          transition: background 0.4s ease, color 0.4s ease;
        }

        body::before {
          content:          '';
          position:         fixed;
          inset:            0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events:   none;
          z-index:          1;
          opacity:          ${dark ? 0.4 : 0.15};
        }

        @keyframes pulse {
          0%,  100% { opacity: 0.6; transform: scaleY(1);   }
          50%        { opacity: 1;   transform: scaleY(1.1); }
        }

        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: ${t.scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollbar}; border-radius: 2px; }
      `}</style>

      {/* Canvas de partículas — recebe visible para ligar/desligar */}
      <ParticleCanvas dark={dark} visible={particlesOn} />

      {/* Glow sutil no topo */}
      <div
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          right:         0,
          height:        "80px",
          background:    "linear-gradient(to bottom, rgba(124,58,237,0.07), transparent)",
          zIndex:        99,
          pointerEvents: "none",
        }}
      />

      {/* Navegação */}
      <Navbar
        active={active}
        setActive={setActive}
        dark={dark}
        setDark={setDark}
        t={t}
      />

      {/* Página atual */}
      <main style={{ position: "relative", zIndex: 2, textAlign: "left" }}>
        {renderPage()}
      </main>

      <Footer t={t} />
    </>
  );
}
