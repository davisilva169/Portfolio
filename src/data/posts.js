// ─────────────────────────────────────────────────────────────────────────────
// BLOG DATA
//
// Para adicionar um novo post:
//   1. Copie um dos objetos abaixo e cole no final do array
//   2. Preencha os campos
//   3. Crie o arquivo de detalhe em src/pages/blog/NomeDaPagina.jsx
//   4. Registre o pageKey no switch do App.jsx
//
// Campos:
//   id       → número único (incremental)
//   date     → data de publicação (ex: "March 2026")
//   readTime → tempo estimado de leitura (ex: "9 min")
//   category → categoria do post (ex: "Probabilities")
//   title    → título do post
//   excerpt  → resumo curto para o card (2-3 frases)
//   pageKey  → nome do case no switch do App.jsx (ex: "ErrorTheorem")
// ─────────────────────────────────────────────────────────────────────────────

export const POSTS = [
  {
    id:       1,
    date:     "March 2026",
    readTime: "9 min",
    category: "Probabilities",
    title:    "The Error Theorem: When Intuition Fails the Math",
    excerpt:
      "Can we 'hack' a multiple-choice test by trying to be wrong? I developed a theory called 'The Error Theorem' to prove that eliminating a random guess could boost success. Here is the story of how a seemingly clever strategy met the cold, invariant reality of probability.",
    pageKey:  "ErrorTheorem",
  },
];
