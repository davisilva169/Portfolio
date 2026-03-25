import { useState, useEffect, useRef } from "react";

// ─── THEMES ───────────────────────────────────────────────────────────────────
const DARK = {
  bg: "#06060a", bgCard: "rgba(255,255,255,0.025)", bgCardHover: "rgba(109,40,217,0.09)",
  border: "rgba(255,255,255,0.06)", borderHover: "rgba(139,92,246,0.3)",
  borderLeft: "rgba(124,58,237,0.3)", borderLeftHover: "#7c3aed",
  text: "#e8e2d9", textMuted: "rgba(180,175,195,0.6)", textDim: "rgba(200,195,210,0.65)",
  accent: "rgba(167,139,250,0.7)", accentSolid: "#a78bfa",
  navBg: "rgba(6,6,10,0.88)", scrollbar: "rgba(124,58,237,0.4)", scrollbarTrack: "#06060a",
};
const LIGHT = {
  bg: "#f4f1ec", bgCard: "rgba(255,255,255,0.75)", bgCardHover: "rgba(124,58,237,0.06)",
  border: "rgba(0,0,0,0.09)", borderHover: "rgba(124,58,237,0.3)",
  borderLeft: "rgba(124,58,237,0.2)", borderLeftHover: "#7c3aed",
  text: "#1a1625", textMuted: "rgba(40,32,60,0.55)", textDim: "rgba(40,32,60,0.5)",
  accent: "rgba(109,40,217,0.65)", accentSolid: "#6d28d9",
  navBg: "rgba(244,241,236,0.9)", scrollbar: "rgba(109,40,217,0.3)", scrollbarTrack: "#f4f1ec",
};

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
function ParticleCanvas({ dark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const COUNT = 160;
    const MOUSE_RADIUS = 120;
    const pts = [];
    for (let i = 0; i < COUNT; i++) {
      const bvx = (Math.random() - 0.5) * 0.4, bvy = (Math.random() - 0.5) * 0.4;
      pts.push({ x: Math.random()*W, y: Math.random()*H, vx: bvx, vy: bvy, baseVx: bvx, baseVy: bvy, r: Math.random()*1.6+0.4, alpha: Math.random()*0.5+0.15 });
    }
    particlesRef.current = pts;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const p = particlesRef.current, m = mouseRef.current;
      const lc = dark ? "139,92,246" : "109,40,217", dc = dark ? "167,139,250" : "109,40,217";
      for (let i = 0; i < p.length; i++)
        for (let j = i+1; j < p.length; j++) {
          const dx = p[i].x-p[j].x, dy = p[i].y-p[j].y, d = Math.sqrt(dx*dx+dy*dy);
          if (d < 120) { ctx.beginPath(); ctx.strokeStyle=`rgba(${lc},${0.13*(1-d/120)})`; ctx.lineWidth=0.5; ctx.moveTo(p[i].x,p[i].y); ctx.lineTo(p[j].x,p[j].y); ctx.stroke(); }
        }
      p.forEach(q => {
        const mdx=q.x-m.x, mdy=q.y-m.y, md=Math.sqrt(mdx*mdx+mdy*mdy);
        if (md < MOUSE_RADIUS && md > 0) { const f=(MOUSE_RADIUS-md)/MOUSE_RADIUS; q.vx+=(mdx/md)*f*0.2; q.vy+=(mdy/md)*f*0.2; }
        q.vx+=(q.baseVx-q.vx)*0.03; q.vy+=(q.baseVy-q.vy)*0.03;
        q.x+=q.vx; q.y+=q.vy;
        if(q.x<0)q.x=W; if(q.x>W)q.x=0; if(q.y<0)q.y=H; if(q.y>H)q.y=0;
        ctx.beginPath(); ctx.arc(q.x,q.y,q.r,0,Math.PI*2); ctx.fillStyle=`rgba(${dc},${dark?q.alpha:q.alpha*0.5})`; ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onR=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    const onM=(e)=>{mouseRef.current={x:e.clientX,y:e.clientY};};
    const onL=()=>{mouseRef.current={x:-9999,y:-9999};};
    window.addEventListener("resize",onR); window.addEventListener("mousemove",onM); window.addEventListener("mouseleave",onL);
    return ()=>{ cancelAnimationFrame(animRef.current); window.removeEventListener("resize",onR); window.removeEventListener("mousemove",onM); window.removeEventListener("mouseleave",onL); };
  }, [dark]);

  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", opacity: dark?0.7:0.4 }} />;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home","Research","Projects","Blog","About"];
function Navbar({ active, setActive, dark, setDark, t }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); },[]);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, transition:"all 0.4s ease", background:scrolled?t.navBg:"transparent", backdropFilter:scrolled?"blur(18px)":"none", borderBottom:scrolled?`1px solid ${t.border}`:"none", padding:"0 2.5rem", height:"68px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div onClick={()=>setActive("Home")} style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.35rem", letterSpacing:"0.04em", color:t.text, cursor:"pointer", fontWeight:600 }}>
        λ <span style={{ color:t.accentSolid }}>Physics</span>
      </div>
      <div style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
        {NAV_LINKS.map(link=>(
          <button key={link} onClick={()=>setActive(link)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", letterSpacing:"0.12em", textTransform:"uppercase", color:active===link?t.accentSolid:t.textDim, transition:"color 0.25s", padding:"4px 0", borderBottom:active===link?`1px solid ${t.accentSolid}`:"1px solid transparent" }}>{link}</button>
        ))}
        {/* Botão tema claro/escuro */}
        <button onClick={()=>setDark(!dark)} title={dark?"Tema claro":"Tema escuro"}
          style={{ background:"none", border:`1px solid ${t.border}`, cursor:"pointer", borderRadius:"20px", padding:"5px 12px", display:"flex", alignItems:"center", gap:"6px", transition:"all 0.25s", color:t.textDim, fontSize:"0.68rem", fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em" }}
          onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=t.accentSolid; e.currentTarget.style.color=t.accentSolid; }}
          onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.textDim; }}
        >{dark ? "☀ LIGHT" : "◐ DARK"}</button>
      </div>
    </nav>
  );
}

// ─── FADE WRAPPER ─────────────────────────────────────────────────────────────
function Fade({ children, style={} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setV(true); },{threshold:0.05}); if(ref.current)o.observe(ref.current); return ()=>o.disconnect(); },[]);
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(24px)", transition:"opacity 0.7s ease, transform 0.7s ease", overflow:"visible", ...style }}>{children}</div>;
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, t }) {
  return (
    <div style={{ marginBottom:"3.5rem", overflow:"visible" }}>
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.25em", textTransform:"uppercase", color:t.accent, marginBottom:"0.85rem" }}>{eyebrow}</p>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:700, color:t.text, letterSpacing:"-0.01em", lineHeight:1, marginBottom:"1.2rem" }}>{title}</h2>
      <div style={{ width:"48px", height:"1px", background:`linear-gradient(to right, ${t.accentSolid}, transparent)` }} />
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeSection({ setActive, t, dark }) {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const id=setTimeout(()=>setLoaded(true),150); return ()=>clearTimeout(id); },[]);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>60); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); },[]);

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", padding:"0 2rem", textAlign:"center" }}>
      <div style={{ position:"absolute", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
      <div style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(30px)", transition:"opacity 1.1s ease 0.2s, transform 1.1s ease 0.2s" }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"1.2rem", letterSpacing:"0.28em", textTransform:"uppercase", color:t.accent, marginBottom:"1.8rem" }}>
          <span style={{ display:"block", marginBottom:"0.4rem" }}>IFSC - USP</span>
          <span style={{ opacity:1, fontSize:"0.85rem" }}>D.S.S · Theoretical Physicist</span>
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(3.2rem,8vw,7rem)", fontWeight:700, lineHeight:1.05, letterSpacing:"-0.01em", color:t.text, marginBottom:"1.6rem" }}>
          Davi<br />
          <span style={{ background:"linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #c4b5fd 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Santos-Silva</span>
        </h1>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.1rem,2.5vw,1.55rem)", fontStyle:"italic", fontWeight:400, color:dark?"rgba(210,204,220,0.6)":"rgba(40,32,60,0.55)", maxWidth:"560px", margin:"0 auto 3rem", lineHeight:1.55 }}>
          "Where mathematics meets the hidden structure of reality — exploring entropy, complexity, and the equations beneath."
        </p>
        <div style={{ display:"flex", gap:"1.2rem", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>setActive("Research")} style={{ padding:"0.78rem 2.2rem", background:"linear-gradient(135deg, #7c3aed, #5b21b6)", border:"none", borderRadius:"2px", color:"#f0ece6", fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer", transition:"opacity 0.2s" }}
            onMouseEnter={(e)=>e.currentTarget.style.opacity="0.82"} onMouseLeave={(e)=>e.currentTarget.style.opacity="1"}>View Research</button>
          <a href="http://lattes.cnpq.br/4597220987852921" target="_blank" rel="noopener noreferrer" style={{ padding:"0.78rem 2.2rem", background:"transparent", border:`1px solid ${t.border}`, borderRadius:"2px", color:t.textDim, fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer", transition:"border-color 0.2s, color 0.2s", textDecoration:"none", display:"inline-flex", alignItems:"center" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.borderColor=t.accentSolid; e.currentTarget.style.color=t.accentSolid; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.textDim; }}>Download CV</a>
        </div>
      </div>
      {/* Scroll indicator lateral */}
      <div style={{ position:"fixed", left:"2.2rem", bottom:"2.5rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"10px", opacity:loaded&&!scrolled?0.55:0, transition:"opacity 0.6s ease", zIndex:10, pointerEvents:"none" }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.22em", color:t.accentSolid, writingMode:"vertical-rl", textTransform:"uppercase" }}>scroll</span>
        <div style={{ width:"1px", height:"50px", background:`linear-gradient(to bottom, ${t.accentSolid}, transparent)`, animation:"pulse 2s ease infinite" }} />
      </div>
    </div>
  );
}

// ─── RESEARCH ─────────────────────────────────────────────────────────────────
const RESEARCH = [
  { id:1, tag:"High-Energy Astroparticle Physics", title:"Muon Puzzle & Leading Particle Effect", excerpt:"Investigating how energy concentration in leader pions alters muon production in cosmic ray cascades.", year:"2026", status:"In Progress", link:"#" },
  { id:2, tag:"Stochastic Processes", title:"Null Model of Uniform Fragmentation", excerpt:"This work studies the leading particle effect using statistical models and computational analysis of energy splitting processes.", year:"2025", status:"Completed", link:"#" },
  { id:3, tag:"Discrete Dynamical System", title:"Poincaré Maps", excerpt:"This monograph presents a visual introduction to Poincaré maps through the Duffing oscillator, illustrating the transition from regular motion to chaos.", year:"2025", status:"Completed", link:"#" },
];

function ResearchCard({ item, t }) {
  const [h, setH] = useState(false);
  const sc = { "In Progress":"#f59e0b", Published:"#34d399", Completed:"#34d399", Preprint:"#a78bfa" }[item.status]||"#a78bfa";
  return (
    <a href={item.link} onClick={(e)=>item.link==="#"&&e.preventDefault()} style={{ textDecoration:"none", display:"block", marginBottom:"1.2rem" }}>
      <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ padding:"2rem 2.2rem", border:`1px solid ${h?t.borderHover:t.border}`, borderLeft:`3px solid ${h?t.borderLeftHover:t.borderLeft}`, background:h?t.bgCardHover:t.bgCard, borderRadius:"4px", cursor:"pointer",
        transform:h?"perspective(900px) translateY(-8px) rotateX(2deg)":"perspective(900px) translateY(0) rotateX(0deg)",
        boxShadow:h?`0 24px 48px rgba(0,0,0,0.25), 0 0 0 1px ${t.borderHover}`:"none",
        transition:"transform 0.3s ease, box-shadow 0.3s ease, background 0.3s, border 0.3s" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.9rem" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", color:t.accent }}>{item.tag}</span>
          <div style={{ display:"flex", gap:"1rem", alignItems:"center" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:t.textMuted, letterSpacing:"0.1em" }}>{item.year}</span>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", letterSpacing:"0.12em", textTransform:"uppercase", color:sc, border:`1px solid ${sc}44`, padding:"2px 8px", borderRadius:"2px" }}>{item.status}</span>
          </div>
        </div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.32rem", fontWeight:600, color:h?t.text:t.textDim, marginBottom:"0.75rem", lineHeight:1.35, transition:"color 0.3s" }}>{item.title}</h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", lineHeight:1.7, color:t.textMuted }}>{item.excerpt}</p>
      </div>
    </a>
  );
}

function ResearchSection({ t }) {
  return (
    <div style={{ maxWidth:"820px", margin:"0 auto", padding:"8rem 2rem 6rem", textAlign:"left", overflow:"visible" }}>
      <Fade><SectionHeader eyebrow="Academic Work" title="Research" t={t} /></Fade>
      {RESEARCH.map(r=><Fade key={r.id}><ResearchCard item={r} t={t} /></Fade>)}
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id:1, title:"VW Physics", description:"Bringing physics to life through art. Visualizing the beauty of mathematical structures and the fundamental laws of nature.", tags:["Physics","Math","MANIM","Science Communication"], featured:true, link:"#" },
];

function ProjectCard({ project, t }) {
  const [h, setH] = useState(false);
  return (
    <a href={project.link} onClick={(e)=>project.link==="#"&&e.preventDefault()} style={{ textDecoration:"none", display:"block" }}>
      <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ padding:"1.8rem", background:h?t.bgCardHover:t.bgCard, border:`1px solid ${h?t.borderHover:t.border}`, borderRadius:"4px", position:"relative", overflow:"hidden", cursor:"pointer",
        transform:h?"perspective(900px) translateY(-8px) rotateX(2deg)":"perspective(900px) translateY(0) rotateX(0deg)",
        boxShadow:h?`0 24px 48px rgba(0,0,0,0.25), 0 0 0 1px ${t.borderHover}`:"none",
        transition:"transform 0.3s ease, box-shadow 0.3s ease, background 0.3s, border 0.3s" }}>
        {project.featured&&<div style={{ position:"absolute", top:0, right:0, background:"linear-gradient(135deg, #7c3aed, #5b21b6)", padding:"3px 12px", fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"#e8e2d9" }}>Featured</div>}
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:600, color:h?t.text:t.textDim, marginBottom:"0.7rem", transition:"color 0.3s" }}>{project.title}</h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.83rem", lineHeight:1.7, color:t.textMuted, marginBottom:"1.2rem" }}>{project.description}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem" }}>
          {project.tags.map(tag=><span key={tag} style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.08em", color:t.accent, border:`1px solid ${t.borderLeft}`, padding:"3px 10px", borderRadius:"1px" }}>{tag}</span>)}
        </div>
      </div>
    </a>
  );
}

function ProjectsSection({ t }) {
  const [featured,...rest] = PROJECTS;
  return (
    <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"8rem 2rem 6rem", textAlign:"left", overflow:"visible" }}>
      <Fade><SectionHeader eyebrow="Code & Simulations" title="Projects" t={t} /></Fade>
      <Fade style={{ marginBottom:"1.2rem" }}><ProjectCard project={featured} t={t} /></Fade>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1.2rem" }}>
        {rest.map(p=><Fade key={p.id}><ProjectCard project={p} t={t} /></Fade>)}
      </div>
    </div>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
const POSTS = [
  { id:1, date:"March 2026", readTime:"9 min", category:"Probabilities", title:"The Error Theorem: When Intuition Fails the Math", excerpt:"Can we 'hack' a multiple-choice test by trying to be wrong? I developed a theory called 'The Error Theorem' to prove that eliminating a random guess could boost success. Here is the story of how a seemingly clever strategy met the cold, invariant reality of probability - and what it taught me about mathematical symmetry.", link:"#" },
];

function BlogPost({ post, t }) {
  const [h, setH] = useState(false);
  return (
    <a href={post.link} onClick={(e)=>post.link==="#"&&e.preventDefault()} style={{ textDecoration:"none", display:"block" }}>
      <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ padding:"2.2rem 1.8rem", marginBottom:"0.4rem", borderBottom:`1px solid ${t.border}`, cursor:"pointer", borderRadius:"4px",
        background:h?t.bgCardHover:"transparent",
        transform:h?"translateX(6px)":"translateX(0)",
        transition:"background 0.25s, transform 0.25s" }}>
        <div style={{ display:"flex", gap:"1.5rem", alignItems:"center", marginBottom:"0.9rem", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.15em", textTransform:"uppercase", color:t.accent }}>{post.category}</span>
          <span style={{ color:t.textMuted, fontSize:"0.7rem" }}>·</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:t.textMuted, letterSpacing:"0.08em" }}>{post.date}</span>
          <span style={{ color:t.textMuted, fontSize:"0.7rem" }}>·</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:t.textMuted, letterSpacing:"0.08em" }}>{post.readTime} read</span>
        </div>
        {/* Título ganha destaque */}
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.55rem", fontWeight:600, lineHeight:1.3, color:h?t.text:t.textDim, marginBottom:"0.8rem", transition:"color 0.25s" }}>{post.title}</h3>
        {/* Descrição também ganha destaque */}
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", lineHeight:1.75, color:h?t.textMuted:`${t.textMuted}88`, maxWidth:"640px", transition:"color 0.25s" }}>{post.excerpt}</p>
      </div>
    </a>
  );
}

function BlogSection({ t }) {
  return (
    // padding-top 8rem garante que o título não fica cortado pelo navbar
    <div style={{ maxWidth:"760px", margin:"0 auto", padding:"8rem 2rem 6rem", textAlign:"left", overflow:"visible" }}>
      <SectionHeader eyebrow="Writing & Ideas" title="Blog" t={t} />
      {POSTS.map(p=><Fade key={p.id}><BlogPost post={p} t={t} /></Fade>)}
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutSection({ t }) {
  return (
    <div style={{ maxWidth:"820px", margin:"0 auto", padding:"8rem 2rem 10rem", textAlign:"left", overflow:"visible" }}>
      <Fade><SectionHeader eyebrow="Background" title="About" t={t} /></Fade>
      <Fade>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"4rem", alignItems:"start" }}>
          <div>
            <img src="Davi.jpeg" alt="Davi Santos-Silva" style={{ width:"100%", aspectRatio:"0.8", objectFit:"cover", borderRadius:"2px", border:`1px solid ${t.borderHover}`, filter:"grayscale(20%) contrast(1.05)" }} />
            <div style={{ marginTop:"1.5rem", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {[{label:"Lattes",url:"http://lattes.cnpq.br/4597220987852921"},{label:"GitHub",url:"https://github.com/davisilva169"},{label:"Email",url:"mailto:davisilva169@usp.br"}].map(link=>(
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", letterSpacing:"0.12em", textTransform:"uppercase", color:t.accent, textDecoration:"none", transition:"color 0.2s", display:"flex", alignItems:"center", gap:"8px" }}
                  onMouseEnter={(e)=>e.currentTarget.style.color=t.accentSolid}
                  onMouseLeave={(e)=>e.currentTarget.style.color=t.accent}>
                  <span style={{ width:"20px", height:"1px", background:"currentColor", display:"inline-block" }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontStyle:"italic", lineHeight:1.65, color:t.textDim, marginBottom:"1.8rem", fontWeight:400 }}>
              Physics student and researcher at the intersection of statistical physics, stochastic processes, and mathematical modeling.
            </p>
            {["I'm an undergraduate student in Physics at the University of São Paulo (USP), with a focus on Applied Statistical Physics and computational methods. I work with numerical simulations, data analysis, mathematical methods and scientific visualization in Python, often exploring ways to make complex physical ideas more intuitive and visually accessible.","Currently, my work is oriented towards astrophysics and complex systems, but I have an interest in dynamical systems, statistical methods, and nonlinear phenomena. I approach these problems with a combination of analytical methods and numerical simulation.","Beyond research, I am interested in the interplay between rigor and intuition — how deep ideas can be expressed with clarity, simplicity, and elegance. I enjoy writing, visual design, and quiet disciplines such as chess, traveling, reading and cooking."].map((p,i)=>(
              <p key={i} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", lineHeight:1.82, color:t.textMuted, marginBottom:"1.2rem" }}>{p}</p>
            ))}
            <div style={{ marginTop:"2rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
              {["Statistical Physics","Python · NumPy · SciPy","Stochastic Processes","Monte Carlo Methods","Quantum Mechanics","Numerical Simulation","Complex Systems","Nonlinear Dynamical Systems"].map(s=>(
                <div key={s} style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.63rem", letterSpacing:"0.08em", color:t.accent, display:"flex", alignItems:"center", gap:"8px" }}>
                  <span style={{ width:"4px", height:"4px", borderRadius:"50%", background:t.accentSolid, flexShrink:0 }} />{s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer style={{ borderTop:`1px solid ${t.border}`, padding:"2.5rem", textAlign:"center" }}>
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.15em", color:t.accent, textTransform:"uppercase", opacity:0.5 }}>
        © 2026 Davi Santos-Silva · Built with curiosity and coffee
      </p>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  const [dark, setDark] = useState(true);
  const t = dark ? DARK : LIGHT;

  const renderSection = () => {
    switch (active) {
      case "Home":     return <HomeSection setActive={setActive} t={t} dark={dark} />;
      case "Research": return <ResearchSection t={t} />;
      case "Projects": return <ProjectsSection t={t} />;
      case "Blog":     return <BlogSection t={t} />;
      case "About":    return <AboutSection t={t} />;
      default:         return <HomeSection setActive={setActive} t={t} dark={dark} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${t.bg}; color: ${t.text}; min-height: 100vh; overflow-x: hidden; transition: background 0.4s ease, color 0.4s ease; }
        body::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E"); pointer-events:none; z-index:1; opacity:${dark?0.4:0.15}; }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.1)} }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${t.scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background:${t.scrollbar}; border-radius:2px; }
      `}</style>

      <ParticleCanvas dark={dark} />
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"80px", background:"linear-gradient(to bottom, rgba(124,58,237,0.07), transparent)", zIndex:99, pointerEvents:"none" }} />
      <Navbar active={active} setActive={setActive} dark={dark} setDark={setDark} t={t} />

      <main style={{ position:"relative", zIndex:2, textAlign:"left" }}>
        {renderSection()}
      </main>
      <Footer t={t} />
    </>
  );
}
