import { useState, useEffect, useRef } from 'react';

/* ─── KaTeX via CDN ──────────────────────────────────────────────────────────
   Carrega JS+CSS uma única vez e notifica todos os componentes KTex via
   evento customizado — imune ao minificador do Vite no GitHub Pages.
─────────────────────────────────────────────────────────────────────────── */
let katexLoadStarted = false;

export function ensureKatex() {
  if (window.katex || katexLoadStarted) return;
  katexLoadStarted = true;

  if (!document.getElementById('katex-cdn-css')) {
    const link  = document.createElement('link');
    link.id     = 'katex-cdn-css';
    link.rel    = 'stylesheet';
    link.href   = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);
  }

  const script    = document.createElement('script');
  script.id       = 'katex-cdn-js';
  script.src      = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
  script.onload   = () => window.dispatchEvent(new Event('katex-ready'));
  document.head.appendChild(script);
}

export function useKatexReady() {
  const [ready, setReady] = useState(!!window.katex);
  useEffect(() => {
    if (window.katex) { setReady(true); return; }
    ensureKatex();
    const handler = () => setReady(true);
    window.addEventListener('katex-ready', handler);
    return () => window.removeEventListener('katex-ready', handler);
  }, []);
  return ready;
}

/* KTex: renderiza LaTeX via window.katex.render() diretamente no DOM.
   As strings math nunca passam pelo minificador do Vite. */
export function KTex({ math, block = false, color }) {
  const ref   = useRef(null);
  const ready = useKatexReady();

  useEffect(() => {
    if (!ready || !ref.current) return;
    try {
      window.katex.render(math, ref.current, {
        throwOnError: false,
        displayMode:  !!block,
      });
      if (color) ref.current.style.color = color;
    } catch (_) {}
  }, [ready, math, block, color]);

  return (
    <span
      ref={ref}
      style={{
        display: block ? 'block' : 'inline-block',
        margin:  block ? '0.6rem 0' : '0 1px',
      }}
    />
  );
}
