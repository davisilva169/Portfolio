// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS DATA
//
// Para adicionar um novo projeto:
//   1. Copie um dos objetos abaixo e cole no final do array
//   2. Preencha os campos
//   3. Crie o arquivo de detalhe em src/pages/projects/NomeDaPagina.jsx
//   4. Registre o pageKey no switch do App.jsx
//
// Campos:
//   id          → número único (incremental)
//   title       → nome do projeto
//   description → descrição curta para o card (2-3 frases)
//   tags        → array de tecnologias/áreas (ex: ["Python", "NumPy"])
//   featured    → true para o projeto principal (aparece em destaque)
//   pageKey     → nome do case no switch do App.jsx (ex: "VWPhysics")
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id:          1,
    title:       "VW Physics",
    description:
      "Bringing physics to life through art. Visualizing the beauty of mathematical structures and the fundamental laws of nature.",
    tags:        ["Physics", "Math", "MANIM", "Science Communication"],
    featured:    true,
    pageKey:     "VWPhysics",
  },
];
