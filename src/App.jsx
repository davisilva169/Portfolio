import { useI18n } from "./i18n/context";import { useState, useEffect, useCallback } from "react";

import { DARK, LIGHT } from "./themes";

import CursorHalo from "./components/CursorHalo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Research from "./pages/Research";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Presentations from "./pages/Presentations";

import MuonPaper from "./pages/research/MuonPaper";
import UniformFragmentation from "./pages/research/UniformFragmentation";
import PoincareMaps from "./pages/research/PoincareMaps";

import VWPhysics from "./pages/projects/VWPhysics";
import ErrorTheorem from "./pages/blog/ErrorTheorem";

// ─────────────────────────────────────────────────────────────────────────────
// Hash routing — mapeia URL hash ↔ nome de página interno
// Permite deep links como davisilva169.github.io/Portfolio/#/blog/error-theorem
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_TO_HASH = {
  Home: "#/",
  Research: "#/research",
  Projects: "#/projects",
  Blog: "#/blog",
  About: "#/about",
  Presentations: "#/presentations",
  MuonPaper: "#/research/muon-paper",
  UniformFragmentation: "#/research/uniform-fragmentation",
  PoincareMaps: "#/research/poincare-maps",
  VWPhysics: "#/projects/vw-physics",
  ErrorTheorem: "#/blog/error-theorem"
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
export default function App() {const { tr } = useI18n();
  const [active, setActiveState] = useState(pageFromCurrentHash);
  const [dark, setDark] = useState(() => {
    try {return localStorage.getItem('portfolio-theme') === 'dark';} catch {return false;}
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try {localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');} catch {/* Storage is optional. */}
  }, [dark]);


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
      case "Presentations":
        return <Presentations t={t} setActive={setActive} />;
      case "About":
        return <About t={t} />;

      case "MuonPaper":
        return (
          <MuonPaper
            t={t}
            setActive={setActive} />);


      case "UniformFragmentation":
        return (
          <UniformFragmentation
            t={t}
            setActive={setActive} />);


      case "PoincareMaps":
        return (
          <PoincareMaps
            t={t}
            setActive={setActive} />);



      case "VWPhysics":
        return <VWPhysics t={t} setActive={setActive} />;

      case "ErrorTheorem":
        return (
          <ErrorTheorem
            t={t}
            setActive={setActive} />);



      default:
        return <Home setActive={setActive} t={t} dark={dark} />;
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById('main-content');
        main?.focus();
        main?.scrollIntoView();
      }}>{tr("Skip to content")}</a>
      <CursorHalo />

      <Navbar
        active={active}
        setActive={setActive}
        dark={dark}
        setDark={setDark}
        t={t} />


      <main id="main-content" tabIndex={-1} className={`site-main ${active === "Home" ? "is-home" : "is-inner"}`} key={active}>
        {tr(renderPage())}
      </main>

      <Footer t={t} />
    </>);

}
