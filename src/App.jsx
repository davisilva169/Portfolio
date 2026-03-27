import { useState, useEffect, useCallback } from "react";

import { DARK, LIGHT } from "./themes";

import ParticleCanvas from "./components/ParticleCanvas";
import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";

import Home     from "./pages/Home";
import Research from "./pages/Research";
import Projects from "./pages/Projects";
import Blog     from "./pages/Blog";
import About    from "./pages/About";

import MuonPaper             from "./pages/research/MuonPaper";
import UniformFragmentation  from "./pages/research/UniformFragmentation";
import PoincareMaps          from "./pages/research/PoincareMaps";

import VWPhysics    from "./pages/projects/VWPhysics";
import ErrorTheorem from "./pages/blog/ErrorTheorem";

// ─────────────────────────────────────────────────────────────────────────────
// Hash routing — mapeia URL hash ↔ nome de página interno
// Permite deep links como davisilva169.github.io/Portfolio/#/blog/error-theorem
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_TO_HASH = {
  Home:                 "#/",
  Research:             "#/research",
  Projects:             "#/projects",
  Blog:                 "#/blog",
  About:                "#/about",
  MuonPaper:            "#/research/muon-paper",
  UniformFragmentation: "#/research/uniform-fragmentation",
  PoincareMaps:         "#/research/poincare-maps",
  VWPhysics:            "#/projects/vw-physics",
  ErrorTheorem:         "#/blog/error-theorem",
};

const HASH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_TO_HASH).map(([page, hash]) => [hash, page])
);

function hashToPage(hash) {
  return HASH_TO_PAGE[hash] || "Home";
}

function pageFromCurrentHash() {
  return hashToPage(window.location.hash || "#/");
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [active,      setActiveState] = useState(pageFromCurrentHash);
  const [dark,        setDark]        = useState(true);
  const [particlesOn, setParticlesOn] = useState(true);

  const t = dark ? DARK : LIGHT;

  // Navega para uma página e atualiza o hash da URL
  const setActive = useCallback((page) => {
    const hash = PAGE_TO_HASH[page] || "#/";
    window.location.hash = hash;
    setActiveState(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Sincroniza com o botão "voltar/avançar" do navegador
  useEffect(() => {
    const onHashChange = () => {
      setActiveState(pageFromCurrentHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderPage = () => {
    switch (active) {
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

      case "MuonPaper":
        return <MuonPaper t={t} setActive={setActive} />;
      case "UniformFragmentation":
        return <UniformFragmentation t={t} setActive={setActive} />;
      case "PoincareMaps":
        return <PoincareMaps t={t} setActive={setActive} />;

      case "VWPhysics":
        return <VWPhysics t={t} setActive={setActive} />;

      case "ErrorTheorem":
        return (
          <ErrorTheorem
            t={t}
            setActive={setActive}
            toggleParticles={setParticlesOn}
            particlesOn={particlesOn}
          />
        );

      default:
        return <Home setActive={setActive} t={t} dark={dark} />;
    }
  };

  return (
    <>
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

      <ParticleCanvas dark={dark} visible={particlesOn} />

      <div style={{
        position:      "fixed",
        top:           0, left: 0, right: 0,
        height:        "80px",
        background:    "linear-gradient(to bottom, rgba(124,58,237,0.07), transparent)",
        zIndex:        99,
        pointerEvents: "none",
      }} />

      <Navbar
        active={active}
        setActive={setActive}
        dark={dark}
        setDark={setDark}
        t={t}
      />

      <main style={{ position: "relative", zIndex: 2, textAlign: "left" }}>
        {renderPage()}
      </main>

      <Footer t={t} />
    </>
  );
}
