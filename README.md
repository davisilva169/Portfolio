# Davi Santos-Silva — portfólio

Site acadêmico bilíngue com pesquisas, projetos, textos e apresentações.

## Trabalhar no computador

Use Node.js 22. Execute `npm ci` na primeira instalação e `npm run dev` para abrir a prévia em `http://localhost:5173/Portfolio/`.

Antes de publicar, execute `npm run lint` e `npm run build`.

## Publicação

Endereço: https://davisilva169.github.io/Portfolio/

Cada atualização enviada para a branch `main` dispara o workflow **Publish portfolio**, que verifica, compila e publica o site. O GitHub Pages deve usar **GitHub Actions** como fonte.

Também é possível republicar pelo botão **Run workflow** no GitHub ou por `npm run deploy` com a CLI `gh` autenticada. Não é necessário atualizar manualmente a branch `gh-pages`.

## Conteúdo e idiomas

- Páginas: `src/pages/`.
- Cartões de pesquisa: `src/data/research.js`; o carrossel cresce com a coleção.
- Traduções para português: `src/i18n/pt.json`; o texto em inglês é a chave.
- Currículo original em português: `public/cv-pt.pdf`.
- Tema editorial: `src/editorial.css` e `src/themes.js`.

Ao acrescentar um texto, envolva-o em `tr(...)` e adicione a tradução ao dicionário. As fórmulas permanecem em KaTeX. O idioma escolhido é salvo no navegador.

## Logo Física VW

A imagem usada no site está em `src/pages/projects/data_projects/Fisica-VW-APOEMA.png`.
O código reproduzível do Manim está em `branding/fisica_vw.py`, com instruções para exportar uma imagem estática ou a animação. Usa Cambria Bold: Física em creme `#FFF5E5`, VW no gradiente `#F2A900 → #B5651D` e anel no gradiente `#B5651D → #F2A900 → #FFE9C7`, sobre `#0A0A0A`.

Manim é necessário apenas para gerar a arte, não para compilar o site.
