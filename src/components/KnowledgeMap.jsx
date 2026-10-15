import { useI18n } from "../i18n/context";import { useRef, useState } from 'react';
import { RESEARCH } from '../data/research';
import { POSTS } from '../data/posts';
import { PROJECTS } from '../data/projects';
import ResearchArtwork from './ResearchArtwork';

const nodes = [
{ ...RESEARCH[0], id: 'cosmic', label: 'Astroparticle physics', x: 640, y: 92, main: true },
{ id: 'statistics', label: 'Statistical physics', x: 205, y: 96, main: true, pageKey: 'Research', title: 'Statistical physics', excerpt: 'Statistical physics, stochastic processes, and mathematical modeling.' },
{ ...RESEARCH[1], id: 'stochastic', label: 'Stochastic processes', x: 155, y: 219 },
{ ...RESEARCH[1], id: 'fragmentation', label: 'Uniform fragmentation', x: 442, y: 245, main: true },
{ ...RESEARCH[0], id: 'leading', label: 'Leading particle effect', x: 749, y: 214 },
{ ...RESEARCH[2], id: 'dynamics', label: 'Dynamical systems', x: 191, y: 355, main: true },
{ ...RESEARCH[2], id: 'poincare', label: 'Poincaré maps', x: 344, y: 427 },
{ ...POSTS[0], id: 'probability', label: 'The Error Theorem', x: 580, y: 414 },
{ ...PROJECTS[0], id: 'visualization', label: 'VW Physics', x: 769, y: 352, excerpt: PROJECTS[0].description }];

const edges = [
['statistics', 'stochastic'], ['statistics', 'fragmentation'], ['statistics', 'cosmic'],
['stochastic', 'fragmentation'], ['fragmentation', 'leading'], ['leading', 'cosmic'],
['statistics', 'dynamics'], ['dynamics', 'poincare'], ['fragmentation', 'probability'],
['stochastic', 'probability'], ['poincare', 'visualization'], ['cosmic', 'visualization']];


export default function KnowledgeMap({ setActive }) {const { tr } = useI18n();
  const [selectedId, setSelectedId] = useState('fragmentation');
  const [hoverId, setHoverId] = useState(null);
  const [mode, setMode] = useState(() => window.matchMedia('(max-width: 700px)').matches ? 'list' : 'map');
  const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
  const drag = useRef(null);
  const selected = nodes.find((node) => node.id === selectedId);
  const highlighted = hoverId || selectedId;
  const changeZoom = (amount) => setView((v) => ({ ...v, zoom: Math.max(0.75, Math.min(1.6, v.zoom + amount)) }));
  const startDrag = (event) => {
    if (event.target.closest('button') || event.button !== 0) return;
    drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, origin: view };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event) => {
    const d = drag.current;
    if (!d || d.pointer !== event.pointerId) return;
    setView({ ...d.origin, x: Math.max(-220, Math.min(220, d.origin.x + event.clientX - d.x)), y: Math.max(-160, Math.min(160, d.origin.y + event.clientY - d.y)) });
  };
  return <section className="atlas" aria-label={tr("Explore connected research")}>
    <div className="atlas-toolbar">
      <div className="view-switch" role="group" aria-label={tr("Research view")}>
        <button aria-pressed={mode === 'map'} onClick={() => setMode('map')}>{tr("Map")}</button>
        <button aria-pressed={mode === 'list'} onClick={() => setMode('list')}>{tr("List")}</button>
      </div>
      <span className="atlas-caption"><span />{tr(" Connected ideas")}</span>
    </div>
    {tr(mode === 'map' ? <div className="map-viewport" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => {drag.current = null;}} onPointerCancel={() => {drag.current = null;}}>
      <div className="map-plane" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}>
        <svg viewBox="0 0 900 490" preserveAspectRatio="none" className="map-edges" aria-hidden="true">
          {tr(edges.map(([from, to]) => {
            const a = nodes.find((n) => n.id === from),b = nodes.find((n) => n.id === to);
            return <path key={`${from}-${to}`} className={from === highlighted || to === highlighted ? 'is-highlighted' : ''} d={`M${a.x},${a.y} C${a.x},${(a.y + b.y) / 2 + 55} ${b.x},${(a.y + b.y) / 2 - 55} ${b.x},${b.y}`} />;
          }))}
        </svg>
        {tr(nodes.map((node) => <button key={node.id} className={`map-node ${node.main ? 'is-main' : ''} ${selectedId === node.id ? 'is-selected' : ''}`} style={{ left: `${node.x / 9}%`, top: `${node.y / 4.9}%` }} aria-pressed={selectedId === node.id} onClick={() => setSelectedId(node.id)} onMouseEnter={() => setHoverId(node.id)} onMouseLeave={() => setHoverId(null)} onFocus={() => setHoverId(node.id)} onBlur={() => setHoverId(null)}>
          <span className="node-dot" /><span className="node-label">{tr(node.label)}</span>
        </button>))}
      </div>
      <div className="map-zoom" aria-label={tr("Map controls")}>
        <button aria-label={tr("Zoom in")} onClick={() => changeZoom(0.15)} disabled={view.zoom >= 1.6}>+</button>
        <button aria-label={tr("Zoom out")} onClick={() => changeZoom(-0.15)} disabled={view.zoom <= 0.75}>−</button>
        <button aria-label={tr("Reset map")} onClick={() => setView({ x: 0, y: 0, zoom: 1 })}>↺</button>
      </div>
      <p className="map-hint">{tr("Drag to explore \xB7 Select an idea")}</p>
    </div> : <div className="atlas-list">
      {tr(nodes.filter((node) => node.main || ['probability', 'visualization'].includes(node.id)).map((node) => <button key={node.id} aria-pressed={selectedId === node.id} onClick={() => setSelectedId(node.id)}><span>{tr(node.label)}</span><span aria-hidden="true">↗</span></button>))}
    </div>)}
    <div className="atlas-detail" aria-live="polite" aria-atomic="true">
      <ResearchArtwork kind={selected.pageKey} />
      <div><span className="eyebrow">{tr("Selected idea")}</span><h2>{tr(selected.title)}</h2><p>{tr(selected.excerpt)}</p></div>
      <button className="text-link" onClick={() => setActive(selected.pageKey)}>{tr("Explore ")}<span aria-hidden="true">↗</span></button>
    </div>
  </section>;
}
