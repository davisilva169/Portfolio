import { useI18n } from "../i18n/context";import { useEffect, useRef, useState } from 'react';
import { RESEARCH } from '../data/research';
import ResearchArtwork from './ResearchArtwork';

export default function ResearchCarousel({ setActive }) {const { tr } = useI18n();
  const track = useRef(null);
  const [edges, setEdges] = useState({ first: true, last: true, overflow: false });
  useEffect(() => {
    const element = track.current;
    const update = () => setEdges({ first: element.scrollLeft < 6, last: element.scrollLeft + element.clientWidth >= element.scrollWidth - 6, overflow: element.scrollWidth > element.clientWidth + 2 });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => {observer.disconnect();element.removeEventListener('scroll', update);};
  }, []);
  const step = (direction) => {
    const element = track.current;
    const card = element.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section className="featured-research" aria-labelledby="featured-title">
    <div className="section-line"><h2 id="featured-title">{tr("Research in focus")}</h2><div className="carousel-actions"><button className="text-link" onClick={() => setActive('Research')}>{tr("All research ")}<span aria-hidden="true">↗</span></button>{tr(edges.overflow && <div className="carousel-controls"><button aria-label={tr("Previous research")} aria-controls="research-carousel" disabled={edges.first} onClick={() => step(-1)}>←</button><button aria-label={tr("Next research")} aria-controls="research-carousel" disabled={edges.last} onClick={() => step(1)}>→</button></div>)}</div></div>
    <div ref={track} id="research-carousel" className="research-strip research-carousel" tabIndex={0} role="region" aria-label={tr("Featured research carousel")} onKeyDown={(event) => {if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault();step(event.key === 'ArrowLeft' ? -1 : 1);}}}>
      {tr(RESEARCH.map((item) => <button className="research-preview" key={item.id} onClick={() => setActive(item.pageKey)}><ResearchArtwork kind={item.pageKey} /><span className="preview-copy"><span className="eyebrow">{tr(item.tag)}</span><span className="preview-title">{tr(item.title)}</span><span className="preview-description">{tr(item.excerpt)}</span><span className="preview-arrow" aria-hidden="true">↗</span></span></button>))}
    </div>
  </section>;
}
