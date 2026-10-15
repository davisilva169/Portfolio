// ─────────────────────────────────────────────────────────────────────────────
// RESEARCH DATA
//
// Para adicionar um novo paper:
//   1. Copie um dos objetos abaixo e cole no final do array
//   2. Preencha os campos
//   3. Crie o arquivo de detalhe em src/pages/research/NomeDaPagina.jsx
//   4. Registre o pageKey no switch do App.jsx
//
// Campos:
//   id        → número único (incremental)
//   tag       → área do conhecimento
//   title     → título do trabalho
//   excerpt   → resumo curto para o card (1-2 frases)
//   year      → ano
//   status    → "In Progress" | "Completed" | "Published" | "Preprint"
//   pageKey   → nome do case no switch do App.jsx (ex: "MuonPaper")
// ─────────────────────────────────────────────────────────────────────────────

export const RESEARCH = [
  {
    id:      1,
    tag:     "High-Energy Astroparticle Physics",
    title:   "Muon Puzzle & Leading Particle Effect",
    excerpt:
      "Completed thesis on leading-particle effects across five generations, with a multiplicity-weighted null model and an analysis of hybrid-simulation thresholds.",
    year:    "2026",
    status:  "Completed",
    pageKey: "MuonPaper",
  },
  {
    id:      2,
    tag:     "Stochastic Processes",
    title:   "Null Model of Uniform Fragmentation",
    excerpt:
      "This work studies the leading particle effect using statistical models and computational analysis of energy splitting processes.",
    year:    "2025",
    status:  "Completed",
    pageKey: "UniformFragmentation",
  },
  {
    id:      3,
    tag:     "Discrete Dynamical System",
    title:   "Poincaré Maps",
    excerpt:
      "This monograph presents a visual introduction to Poincaré maps through the Duffing oscillator, illustrating the transition from regular motion to chaos.",
    year:    "2025",
    status:  "Completed",
    pageKey: "PoincareMaps",
  },
];
