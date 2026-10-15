import { useI18n } from "../i18n/context";import SectionHeader from '../components/SectionHeader';

const presentations = [
{ event: 'SIICUSP', format: 'Poster', topic: 'Leading-particle effects in atmospheric showers', page: 'MuonPaper' },
{ event: 'SIIFISC', format: 'Poster', topic: 'Leading-particle effects in atmospheric showers', page: 'MuonPaper' },
{ event: 'Particle Astrophysics Summer School', institution: 'ICTP-SAIFR', format: 'Poster' },
{ event: 'Spring Meeting', institution: 'Brazilian Physical Society (SBF)', format: 'Oral presentation' }];


export default function Presentations({ t, setActive }) {const { tr } = useI18n();
  return <div className="presentations-page">
    <SectionHeader eyebrow={tr("Scientific exchange")} title={tr("Presentations")} t={t} />
    <p className="page-intro">{tr("Posters and talks shared at scientific meetings and schools.")}</p>
    <div className="presentation-list">{tr(presentations.map((item, i) => <article key={item.event} className="presentation-item"><span className="presentation-number">0{tr(i + 1)}</span><div><p className="eyebrow">{tr(item.format)}</p><h2>{tr(item.event)}</h2>{tr(item.institution && <p>{tr(item.institution)}</p>)}{tr(item.topic && <p>{tr(item.topic)}</p>)}{tr(item.page && <button className="text-link" onClick={() => setActive(item.page)}>{tr("Read the research \u2197")}</button>)}</div><span className="presentation-symbol" aria-hidden="true">↗</span></article>))}</div>
  </div>;
}
