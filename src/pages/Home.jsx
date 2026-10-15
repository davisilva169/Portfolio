import { useI18n } from "../i18n/context";import KnowledgeMap from '../components/KnowledgeMap';
import ResearchCarousel from '../components/ResearchCarousel';
export default function Home({ setActive }) {const { tr } = useI18n();
  return <div className="home-page">
    <div className="home-layout">
      <section className="home-intro">
        <p className="eyebrow">{tr("IFSC \u2014 USP")}</p>
        <h1>{tr("Davi")}<br />{tr("Santos-Silva")}</h1>
        <p className="home-role">{tr("D.S-S. \xB7 Theoretical Physicist")}</p>
        <blockquote>{tr("\u201CWhere mathematics meets the hidden structure of reality \u2014 exploring entropy, complexity, and the equations beneath.\u201D")}<cite>{tr("\u2014 D.S-S.")}</cite></blockquote>
        <div className="home-actions"><button className="text-link" onClick={() => setActive('Research')}>{tr("View Research ")}<span aria-hidden="true">↗</span></button><a className="text-link" href={`${import.meta.env.BASE_URL}cv-pt.pdf`} target="_blank" rel="noopener noreferrer" download="Davi-Santos-Silva-CV-PT.pdf">{tr("Download CV \xB7 PDF in Portuguese ")}<span aria-hidden="true">↓</span></a></div>
        <span className="intro-rule" />
        <p className="intro-note">{tr("Physics \xB7 Mathematics")}<br />{tr("Research & visual explorations")}</p>
      </section>
      <KnowledgeMap setActive={setActive} />
    </div>
    <ResearchCarousel setActive={setActive} />
  </div>;
}
