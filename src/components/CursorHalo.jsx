import { useEffect, useRef } from 'react';

export default function CursorHalo() {
  const halo = useRef(null);
  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const element = halo.current;
    let frame;
    const hide = () => { element.style.opacity = '0'; };
    const move = (event) => {
      if (!query.matches || event.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${event.clientX - 170}px, ${event.clientY - 170}px, 0)`;
        element.style.opacity = '1';
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    query.addEventListener('change', hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      query.removeEventListener('change', hide);
    };
  }, []);
  return <div ref={halo} className="cursor-halo" aria-hidden="true" />;
}
