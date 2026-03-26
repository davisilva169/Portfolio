import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// FADE
// Wrapper que anima a entrada de qualquer elemento ao rolar a página.
// Uso: <Fade><SeuComponente /></Fade>
// ─────────────────────────────────────────────────────────────────────────────
export default function Fade({ children, style = {} }) {
  const ref             = useRef(null);
  const [visible, setV] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setV(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        overflow:   "visible",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
