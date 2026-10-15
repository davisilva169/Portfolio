import { useI18n } from "../i18n/context";import { useState } from 'react';

// Source: Table 1 and section 3.7 of the author's 2026 undergraduate thesis.
const nuclearFractions = [
{ name: 'Proton', values: [0, 0, 0, 0, 0], color: 'var(--muted)', dash: '2 5' },
{ name: 'Helium', values: [40.4, 7.9, 0.7, 0.1, 0], color: 'var(--ink)', dash: '6 5' },
{ name: 'Carbon', values: [72.4, 48.5, 27.1, 12.8, 5.3], color: '#B5651D', dash: '3 3' },
{ name: 'Silicon', values: [86.6, 64.0, 42.1, 25.7, 14.6], color: 'var(--accent)', dash: '10 4' },
{ name: 'Iron', values: [96.2, 77.0, 58.4, 41.5, 27.8], color: '#F2A900', dash: '' }];


export function NuclearLeaderFigure() {const { tr, number } = useI18n();
  const [species, setSpecies] = useState('All');
  return <figure className="thesis-figure">
    <div className="figure-heading"><h3>{tr("How long does the leader remain a nucleus?")}</h3><span>{tr("10\xB2\u2070 eV")}</span></div>
    <div className="figure-filters" role="group" aria-label={tr("Filter by primary particle")}>
      {['All', ...nuclearFractions.map((s) => s.name)].map((name) => <button key={name} aria-pressed={species === name} onClick={() => setSpecies(name)}>{name !== 'All' && <i aria-hidden="true" style={{ background: nuclearFractions.find(s => s.name === name).color }} />}{tr(name)}</button>)}
    </div>
    <svg viewBox="0 0 720 350" role="img" aria-labelledby="nuclear-chart-title">
      <title id="nuclear-chart-title">{tr("Fraction of interactions with a nuclear leader, by generation")}</title>
      {tr([0, 25, 50, 75, 100].map((value) => <g key={value}><line x1="65" x2="680" y1={285 - value * 2.35} y2={285 - value * 2.35} className="chart-grid" /><text x="48" y={290 - value * 2.35} textAnchor="end">{tr(value)}%</text></g>))}
      {tr([1, 2, 3, 4, 5].map((value, i) => <text key={value} x={75 + i * 145} y="310" textAnchor="middle">{tr(value)}</text>))}
      <text x="365" y="340" textAnchor="middle">{tr("Generation")}</text>
      {tr(nuclearFractions.map((series) => <g key={series.name} opacity={species === 'All' || species === series.name ? 1 : 0.08}>
        <polyline points={series.values.map((value, i) => `${75 + i * 145},${285 - value * 2.35}`).join(' ')} fill="none" stroke={series.color} strokeWidth="2.5" strokeDasharray={series.dash} />
        {tr(series.values.map((value, i) => <circle key={i} cx={75 + i * 145} cy={285 - value * 2.35} r="4" fill={series.color}><title>{tr(series.name)}: {number(value)}%</title></circle>))}
      </g>))}
    </svg>
    <figcaption>{tr("Redrawn from Table 1 of the thesis. Percentages refer to the recorded leading chain, not to all particles in the shower.")}</figcaption>
    <details><summary>{tr("View the data")}</summary><div className="table-scroll"><table><thead><tr><th>{tr("Primary")}</th>{tr([1, 2, 3, 4, 5].map((n) => <th key={n}>{tr("G")}{tr(n)}</th>))}</tr></thead><tbody>{tr(nuclearFractions.map((s) => <tr key={s.name}><th>{tr(s.name)}</th>{tr(s.values.map((v, i) => <td key={i}>{number(v)}%</td>))}</tr>))}</tbody></table></div></details>
  </figure>;
}

export function TransitionHeightFigure() {const { tr, number } = useI18n();
  return <figure className="thesis-figure">
    <div className="figure-heading"><h3>{tr("Two estimators, different mean heights")}</h3><span>{tr("km")}</span></div>
    <svg viewBox="0 0 720 310" role="img" aria-labelledby="height-chart-title">
      <title id="height-chart-title">{tr("Mean threshold-crossing height for all tracks and for the reconstructed leading chain")}</title>
      {tr([0, 5, 10, 15, 20, 25].map((v) => <g key={v}><line x1={140 + v * 20} x2={140 + v * 20} y1="35" y2="250" className="chart-grid" /><text x={140 + v * 20} y="277" textAnchor="middle">{tr(v)}</text></g>))}
      {tr([{ energy: '10¹⁴ eV', all: 16.39, leader: 12.52, y: 70 }, { energy: '10¹⁹ eV', all: 21.25, leader: 17.75, y: 185 }].map((row) => <g key={row.energy}>
        <text x="20" y={row.y + 12}>{tr(row.energy)}</text>
        <rect x="140" y={row.y - 16} width={row.all * 20} height="20" fill="var(--amber)" /><text x={150 + row.all * 20} y={row.y}>{number(row.all)}</text>
        <rect x="140" y={row.y + 15} width={row.leader * 20} height="20" fill="var(--energy)" /><text x={150 + row.leader * 20} y={row.y + 31}>{number(row.leader)}</text>
      </g>))}
      <text x="390" y="305" textAnchor="middle">{tr("Mean height (km)")}</text>
    </svg>
    <div className="chart-legend"><span><i style={{ background: 'var(--amber)' }} />{tr("All tracks")}</span><span><i style={{ background: 'var(--energy)' }} />{tr("Leading chain")}</span></div>
    <figcaption>{tr("Mean values reported in section 3.7. The 10\xB9\u2074 eV sample contains 100 showers. At 10\xB9\u2079 eV, only 14 of 20 showers yielded valid pairs. Bars show means, not uncertainty intervals.")}</figcaption>
  </figure>;
}
