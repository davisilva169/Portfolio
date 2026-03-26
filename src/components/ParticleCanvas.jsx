import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLE CANVAS
// 160 partículas animadas com interação de mouse.
// Props:
//   dark → boolean (altera as cores das partículas)
// ─────────────────────────────────────────────────────────────────────────────
export default function ParticleCanvas({ dark }) {
  const canvasRef    = useRef(null);
  const animRef      = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const COUNT        = 160;
    const MOUSE_RADIUS = 120;
    const pts          = [];

    for (let i = 0; i < COUNT; i++) {
      const bvx = (Math.random() - 0.5) * 0.4;
      const bvy = (Math.random() - 0.5) * 0.4;
      pts.push({
        x:      Math.random() * W,
        y:      Math.random() * H,
        vx:     bvx,
        vy:     bvy,
        baseVx: bvx,
        baseVy: bvy,
        r:      Math.random() * 1.6 + 0.4,
        alpha:  Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = pts;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const p = particlesRef.current;
      const m = mouseRef.current;

      const lineColor  = dark ? "124,58,237"  : "91,33,182";
      const dotColor   = dark ? "167,139,250" : "91,33,182";
      const alphaBoost = dark ? 1.0 : 1.6;

      // Linhas de conexão
      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx   = p[i].x - p[j].x;
          const dy   = p[i].y - p[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = (dark ? 0.14 : 0.22) * (1 - dist / 120);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(p[i].x, p[i].y);
            ctx.lineTo(p[j].x, p[j].y);
            ctx.stroke();
          }
        }
      }

      // Partículas
      p.forEach((q) => {
        // Repulsão do mouse
        const mdx  = q.x - m.x;
        const mdy  = q.y - m.y;
        const mdst = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdst < MOUSE_RADIUS && mdst > 0) {
          const force = (MOUSE_RADIUS - mdst) / MOUSE_RADIUS;
          q.vx += (mdx / mdst) * force * 0.2;
          q.vy += (mdy / mdst) * force * 0.2;
        }

        // Retorno à velocidade base
        q.vx += (q.baseVx - q.vx) * 0.03;
        q.vy += (q.baseVy - q.vy) * 0.03;

        q.x += q.vx;
        q.y += q.vy;

        if (q.x < 0) q.x = W;
        if (q.x > W) q.x = 0;
        if (q.y < 0) q.y = H;
        if (q.y > H) q.y = 0;

        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${Math.min(q.alpha * alphaBoost, 0.95)})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize    = ()  => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseOut  = ()  => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener("resize",     onResize);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseOut);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseOut);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
        opacity:       dark ? 0.75 : 0.85,
      }}
    />
  );
}
