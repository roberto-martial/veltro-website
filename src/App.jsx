
import { useState, useEffect, useRef, useCallback } from "react";

/* ── Logo (embedded) ─────────────────────────────── */
const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAo0AAAEnCAYAAADMwnlYAAAgAElEQVR4Xu2dC/x1U53/N2NGIpfcL10UurrMEKWohAaRMZFrLiVlXEISjTzVpBEKMRSpDBml6S5CV/ciCo+UWyqEqSFipvH8/+/daz+v/TvP3mfttc8+56xzfu/v6/V7uZy11177vfbZ57PX+l4WWmaZZeZlmgQkIAEJSEACEpCABPoQWEjR6P0hAQlIQAISkIAEJBAioGgMEfJzCUhAAhKQgAQkIIFM0ehNIAEJSEACEpCABCQQJKBoDCKygQQkIAEJSEACEpCAotF7QAISkIAEJCABCUggSEDRGERkAwlIQAISkIAEJCABRaP3gAQkIAEJSEACEpBAkICiMYjIBhKQgAQkIAEJSEACikbvAQlIQAISkIAEJCCBIAFFYxCRDSQgAQlIQAISkIAEFI3eAxKQgAQkIAEJSEACQQKKxiAiG0hAAhKQgAQkIAEJKBq9ByQgAQlIQAISkIAEggQUjUFENpCABCQgAQlIQAISUDR6D0hAAhKQgAQkIAEJBAkoGoOIbCABCUhAAhKQgAQkoGj0HpCABCQgAQlIQAISCBJQNAYR2UACEpCABCQgAQlIQNHoPSABCUhAAhKQgAQkECSgaAwisoEEJCABCUhAAhKQgKLRe0ACEpCABCQgAQlIIEhA0RhEZAMJSEACEpCABCQgAUWj94AEJCABCUhAAhKQQJCAojGIyAYSkIAEJCABCUhAAopG7wEJSEACEpCABCQggSABRWMQkQ0kIAEJSEACEpCABBSN3gMSkIAEJCABCUhAAkECisYgIhtIQAISkIAEJCABCSgavQckIAEJSEACEpCABIIEFI1BRDaQgAQkIAEJSEACElA0eg9IQAISkIAEJCABCQQJKBqDiGwgAQlIQAISkIAEJKBo9B6QgAQkIAEJSEACEggSUDQGEdlAAhKQgAQkIAEJSEDR6D0gAQlIQAISkIAEJBAkoGgMIrKBBCQgAQlIQAISkICi0XtAAhKQgAQkIAEJSCBIQNEYRGQDCUhAAhKQgAQkIAFFo/eABCQgAQlIQAISkECQgKIxiMgGEpCABCQgAQlIQAKKRu8BCUhAAhKQgAQkIIEgAUVjEJENJCABCUhAAhKQgAQUjd4DEpCABCQgAQlIQAJBAorGICIbSEACEpCABCQgAQkoGr0HJCABCUhAAhKQgASCBBSNQUQ2kIAEJCABCUhAAhJQNHoPSEACEpCABCQgAQkECSgag4hsIAEJSEACEpCABCSgaPQekIAEJCABCUhAAhIIElA0BhHZQAISkIAEJCABCUhA0eg9IAEJSEACEpCABCQQJKBoDCKygQQkIAEJSEACEpCAotF7QAISkIAEJCABCUggSEDRGERkAwlIQAISkIAEJCABRaP3gAQkIAEJSEACEpBAkICiMYjIBhKQgAQkIAEJSEACikbvAQlIQAISkIAEJCCBIAFFYxCRDSQgAQlIQAISkIAEFI3eAxKQgAQkIAEJSEACQQKKxiAiG0hAAhKQgAQkIAEJKBq9ByQgAQlIQAISkIAEggQUjUFENpCABCQgAQlIQAISUDR6D0hAAhKQgAQkIAEJBAkoGoOIbCABCUhAAhKQgAQkoGj0HpCABCQgAQlIQAISCBJQNAYR2UACEpCABCQgAQlIQNHoPSABCUhAAhKQgAQkECSgaAwisoEEJCABCUhAAhKQgKLRe0ACEpCABCQgAQlIIEhA0RhEZAMJSEACEpCABCQgAUWj94AEJCABCUhAAhKQQJCAojGIyAYSkIAEJCABCUhAAopG7wEJSEACEpCABCQggSABRWMQkQ0kIAEJSEACEpCABBSN3gMSkIAEJCABCUhAAkECisYgIhtIQAISkIAEJCABCSgavQckIAEJSEACEpCABIIEFI1BRDaQgAQkIAEJSEACElA0eg9IQAISkIAEJCABCQQJKBqDiGwgAQlIQAISkIAEJKBo9B6QgAQkIAEJSEACEggSUDQGEdlAAhKQgAQkIAEJSEDR6D0gAQlIQAISkIAEJBAkoGgMIrKBBCQgAQlIQAISkICi0XtAAhKQgAQkIAEJSCBIQNEYRGQDCUhAAhKQgAQkIAFFo/eABCQgAQlIQAISkECQgKIxiMgGEpCABCQgAQlIQAKKRu8BCUhAAhKQgAQkIIEgAUVjEJENJCABCUhAAhKQgAQUjd4DEpCABCQgAQlIQAJBAorGICIbSEACEpCABCQgAQkoGr0HJCABCUhAAhKQgASCBBSNQUQ2kIAEJCABCUhAAhJQNHoPSEACEpCABCQgAQkECSgag4hsIAEJSEACEpCABCSgaPQekIAEJCABCUhAAhIIElA0BhHZQAISkIAEJCABCUhA0eg9IAEJSEACEpCABCQQJKBoDCKygQTSJfBf//Vf8wf3zGc+M92BOjIJSEACEph4AorGiZ9CL2A2E1A0zubZ99olIAEJjJaAonG0vD2bBDoloGjsFKedSUACEpBAHwKKRm8PCUwwAUXjBE+eQ5eABCQwYQQUjRM2YQ5XAmUCikbvBwlIQAISGBUBReOoSM+i82yyySbZpptumhGYsfTSS2dLLbVUtuiii2bz5s3LfvOb32R33HHH/L/bb789e+KJJ2YRnW4vVdHYLU97k4AEJCCBegKKRu+OTgggDt/61rdmu+66a7b66qtH9XnllVdmX/3qV/O/Bx98MOrY2d5Y0Tjb7wCvXwISkMDoCCgaR8d6as+05ZZbZqecckq2wgorDHyNP/zhD7MvfvGL2Ve+8pXsj3/848D9TXsHisZpn2GvTwISkEA6BBSN6czFRI7k5JNPzvbYY4/Ox/7oo49mZ555ZnbGGWdkDz30UOf9T0uHisZpmUmvQwISkED6BBSN6c9RsiM84YQTsn322Sc4PnwWf//732cInMceeyxbfvnls5VWWilbbLHFgsfS4Oyzz85XMn/1q181aj+bGikaZ9Nse60SkIAExktA0The/hN79v333z/7l3/5l8rxs0qIf+L3vve97Kqrrsruv//+ynZLLLFEtuKKK+Z/L3vZyzICaDbeeOPsaU97WmX7f//3f88++MEPZg8//PDEcut64IrGronanwQkIAEJ1BFQNHpvRBNYcskls1tvvTV7+tOfvsCx1113Xfa2t70t+/Wvfx3db3HAhhtumL3iFa/IXvnKV2abb775jH7++7//Ozv22GPzrWsty1dvC7OMoHeEBCQgAQkMk4CicZh0p7TvfffdNzvuuOMWuLrvfve72T/+4z92etXLLbdcttNOO2W77bZb9qIXvWh+33Pnzs0OPfTQ7Nprrx3ofGyTr7rqqvnW9yRGbisaB5p+D5aABCQggQgCisYIWDb9CwG2ntlK7rWNNtoo+8UvfjE0TH/7t3+bi9I3velN8yO1/+M//iN773vfmz3yyCONzsvq6HbbbZf3sf766+c5JAvD3/Lmm2/OzjnnnOz8889v1N+4Gykaxz0Dnl8CEpDA7CGgaJw9c93Zlf72t79dwO/wtttuy/0RR2V///d/nx122GG58LvnnnuyvffeO7vxxhtrT09y8SOPPDJ7+9vfXusz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";

/* ── Palette perfectly matched to the logo's #0d0d0d ─ */
const C = {
  bg:       "#0d0d0d",   /* exact logo background */
  bgCard:   "#111111",
  bgHover:  "#161616",
  bgSoft:   "#0f0f0f",
  gold:     "#C9A84C",
  goldLt:   "#E2C87A",
  goldDim:  "#7a6428",
  goldGlow: "rgba(201,168,76,0.10)",
  white:    "#F0EBE0",   /* warm parchment — not pure white */
  whiteDim: "rgba(240,235,224,0.48)",
  border:   "rgba(201,168,76,0.16)",
  borderFt: "rgba(240,235,224,0.055)",
};

/* ── Global styles injected once ─────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tenor+Sans&family=DM+Mono:wght@300;400&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth;font-size:16px}
  body{background:${C.bg};color:${C.white};font-family:'Tenor Sans',sans-serif;overflow-x:hidden}
  ::selection{background:${C.gold};color:${C.bg}}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-track{background:${C.bg}}
  ::-webkit-scrollbar-thumb{background:${C.goldDim};border-radius:2px}
  a{text-decoration:none;color:inherit}
`;

/* ══════════════════════════════════════════════════
   CANVAS — animated particle network background
══════════════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const state     = useRef({ particles:[], mouse:{x:-999,y:-999} });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const gold   = C.gold;
    const COUNT  = 72;
    const CONNECT= 130;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    /* spawn particles */
    state.current.particles = Array.from({length:COUNT}, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - .5) * .38,
      vy: (Math.random() - .5) * .38,
      r:  Math.random() * 1.4 + .6,
      op: Math.random() * .45 + .12,
    }));

    const onMove = e => { state.current.mouse = {x:e.clientX, y:e.clientY}; };
    window.addEventListener("mousemove", onMove);

    function draw() {
      const {particles, mouse} = state.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* move */
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        /* mouse repulsion */
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 90) { p.x += dx/d*1.4; p.y += dy/d*1.4; }
      });

      /* lines */
      for (let i=0;i<particles.length;i++) {
        for (let j=i+1;j<particles.length;j++) {
          const a=particles[i], b=particles[j];
          const dx=a.x-b.x, dy=a.y-b.y, d=Math.sqrt(dx*dx+dy*dy);
          if (d < CONNECT) {
            const alpha = (1 - d/CONNECT) * .22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
            ctx.lineWidth   = .6;
            ctx.stroke();
          }
        }
      }

      /* dots */
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(201,168,76,${p.op})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:"absolute", inset:0, zIndex:0,
      pointerEvents:"none", opacity:.85,
    }} />
  );
}

/* ══════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════ */
function Counter({ target, suffix="", duration=1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold:.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ══════════════════════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════════════════════ */
function useReveal(delay=0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(()=>setVis(true), delay); obs.disconnect(); }
    }, { threshold:.08, rootMargin:"0px 0px -40px 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, vis];
}

function Reveal({ children, delay=0, style={} }) {
  const [ref, vis] = useReveal(delay);
  return (
    <div ref={ref} style={{
      opacity: vis?1:0,
      transform: vis?"translateY(0)":"translateY(30px)",
      transition: `opacity .75s ease ${delay}ms, transform .75s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════════════════ */
function MagBtn({ href, gold=true, children, style={} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({x:0,y:0});
  const [hov, setHov] = useState(false);

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x:(e.clientX-r.left-r.width/2)*.25, y:(e.clientY-r.top-r.height/2)*.25 });
  };

  const base = {
    display:"inline-block", padding:"1rem 2.8rem",
    fontFamily:"'DM Mono',monospace", fontSize:".7rem",
    letterSpacing:".2em", textTransform:"uppercase",
    cursor:"pointer", border:"none", outline:"none",
    transition:"transform .2s ease, box-shadow .3s ease",
    transform: hov ? `translate(${pos.x}px,${pos.y}px) scale(1.03)` : "translate(0,0) scale(1)",
    position:"relative", overflow:"hidden",
    ...style,
  };

  if (gold) return (
    <a href={href} ref={ref}
      onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setPos({x:0,y:0});}}
      style={{...base, background:C.gold, color:C.bg,
        boxShadow: hov ? `0 0 32px rgba(201,168,76,.35)` : "0 0 0 rgba(0,0,0,0)",
      }}>
      <span style={{position:"relative",zIndex:1}}>{children}</span>
      <span style={{
        position:"absolute", inset:0, background:C.goldLt,
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin:"left", transition:"transform .35s ease",
      }}/>
    </a>
  );

  return (
    <a href={href} ref={ref}
      onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setPos({x:0,y:0});}}
      style={{...base, background:"transparent", color:C.gold,
        border:`1px solid ${hov?C.gold:C.border}`,
        boxShadow: hov ? `0 0 24px rgba(201,168,76,.15), inset 0 0 24px rgba(201,168,76,.06)` : "none",
      }}>
      {children}
    </a>
  );
}

/* ══════════════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════════════ */
function SLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:".9rem",
      fontFamily:"'DM Mono',monospace", fontSize:".62rem",
      letterSpacing:".3em", textTransform:"uppercase", color:C.gold,
      marginBottom:"1.4rem",
    }}>
      {children}
      <span style={{width:44,height:1,background:C.goldDim,display:"block"}}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TICKER
══════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  "AI-Powered Matching","Private Equity","Family Offices",
  "Deal Flow Intelligence","Intelligent Introductions",
  "We Only Win When You Win","Private Markets","Data-Driven Deal Sourcing",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      background:C.bgSoft, overflow:"hidden", padding:".9rem 0",
      borderTop:`1px solid ${C.borderFt}`, borderBottom:`1px solid ${C.borderFt}`,
    }}>
      <div style={{
        display:"flex", width:"max-content",
        animation:"ticker 30s linear infinite",
      }}>
        {items.map((t,i)=>(
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:"1.6rem", padding:"0 1.8rem",
            fontFamily:"'DM Mono',monospace", fontSize:".6rem",
            letterSpacing:".18em", textTransform:"uppercase", color:C.whiteDim,
            whiteSpace:"nowrap",
          }}>
            <span style={{width:3,height:3,background:C.gold,borderRadius:"50%",display:"block"}}/>
            {t}
          </div>
        ))}
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HOW IT WORKS CARD
══════════════════════════════════════════════════ */
function HowCard({ num, icon, name, desc, last }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        padding:"2.8rem 2.2rem", position:"relative", overflow:"hidden",
        borderRight: last ? "none" : `1px solid ${C.borderFt}`,
        background: hov ? C.bgCard : "transparent",
        transition:"background .4s",
        cursor:"default",
      }}>
      {/* glow overlay */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:`radial-gradient(ellipse at 50% 0%, ${C.goldGlow} 0%, transparent 70%)`,
        opacity: hov?1:0, transition:"opacity .4s",
      }}/>
      <div style={{
        fontFamily:"'Cormorant Garamond',serif", fontSize:"3.6rem", fontWeight:300,
        color: hov ? "rgba(201,168,76,.32)" : "rgba(201,168,76,.1)",
        lineHeight:1, marginBottom:"1.4rem", transition:"color .4s",
      }}>{num}</div>
      <div style={{fontSize:"1.5rem", marginBottom:"1rem"}}>{icon}</div>
      <div style={{
        fontFamily:"'DM Mono',monospace", fontSize:".66rem",
        letterSpacing:".18em", textTransform:"uppercase",
        color:C.gold, marginBottom:".7rem",
      }}>{name}</div>
      <div style={{fontSize:".86rem", lineHeight:1.78, color:C.whiteDim}}>{desc}</div>
      {!last && (
        <div style={{
          position:"absolute", top:"50%", right:-10, transform:"translateY(-50%)",
          width:20, height:20, background:C.bg, border:`1px solid ${C.borderFt}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:".65rem", color:C.gold, zIndex:2,
        }}>›</div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE ROW
══════════════════════════════════════════════════ */
function Feature({ name, desc, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{
          padding:"1.8rem 0",
          paddingLeft: hov ? ".7rem" : "0",
          borderBottom:`1px solid ${C.borderFt}`,
          display:"flex", gap:"1.4rem", alignItems:"flex-start",
          transition:"padding-left .3s ease",
        }}>
        <div style={{color:C.gold, fontSize:".9rem", marginTop:".2rem", flexShrink:0}}>◈</div>
        <div>
          <div style={{
            fontFamily:"'DM Mono',monospace", fontSize:".7rem",
            letterSpacing:".1em", textTransform:"uppercase",
            color:C.white, marginBottom:".4rem",
          }}>{name}</div>
          <div style={{fontSize:".86rem", lineHeight:1.78, color:C.whiteDim}}>{desc}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════
   VALUE CARD
══════════════════════════════════════════════════ */
function ValueCard({ icon, name, desc, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{
          padding:"4rem 3rem", textAlign:"center",
          position:"relative", overflow:"hidden",
          borderRight:`1px solid ${C.borderFt}`,
          cursor:"default",
        }}>
        {/* bottom bar */}
        <div style={{
          position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
          height:2, background:C.gold,
          width: hov ? "65%" : "0%",
          transition:"width .5s ease",
        }}/>
        {/* bg glow */}
        <div style={{
          position:"absolute", inset:0,
          background:`radial-gradient(ellipse at 50% 100%, ${C.goldGlow} 0%, transparent 60%)`,
          opacity: hov?1:0, transition:"opacity .4s",
        }}/>
        <div style={{fontSize:"2rem", marginBottom:"1.4rem", position:"relative"}}>{icon}</div>
        <div style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"1.75rem", fontWeight:300,
          color:C.gold, marginBottom:".9rem", letterSpacing:".04em", position:"relative",
        }}>{name}</div>
        <div style={{fontSize:".86rem", lineHeight:1.82, color:C.whiteDim, position:"relative"}}>{desc}</div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════ */
function StatCard({ num, suffix, label, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{
          background: hov ? C.bgHover : C.bgCard,
          padding:"2.8rem 2.4rem", transition:"background .3s",
        }}>
        <div style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"3.2rem", fontWeight:300,
          color:C.gold, lineHeight:1, marginBottom:".5rem",
        }}>
          <Counter target={num} suffix={suffix} />
        </div>
        <div style={{
          fontFamily:"'DM Mono',monospace", fontSize:".58rem",
          letterSpacing:".14em", textTransform:"uppercase", color:C.whiteDim,
        }}>{label}</div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════
   FORM INPUT
══════════════════════════════════════════════════ */
function FInput({ label, type="text", placeholder, isSelect, options=[] }) {
  const [foc, setFoc] = useState(false);
  const shared = {
    background:C.bgCard,
    border:`1px solid ${foc ? C.gold : C.borderFt}`,
    color:C.white, padding:".85rem 1.1rem",
    fontFamily:"'Tenor Sans',sans-serif", fontSize:".88rem",
    outline:"none", width:"100%",
    transition:"border-color .3s",
    appearance:"none",
  };
  return (
    <div style={{display:"flex",flexDirection:"column",gap:".4rem"}}>
      <label style={{
        fontFamily:"'DM Mono',monospace", fontSize:".6rem",
        letterSpacing:".2em", textTransform:"uppercase", color:C.gold,
      }}>{label}</label>
      {isSelect ? (
        <select style={{...shared, background:C.bgCard}}
          onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}>
          <option value="" disabled selected>Select your profile</option>
          {options.map(o=><option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder}
          style={{...shared}} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      padding:"1.3rem 4rem",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background: scrolled ? "rgba(13,13,13,.94)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.borderFt}` : "1px solid transparent",
      transition:"all .4s ease",
    }}>
      <a href="#home">
        <img src={LOGO_SRC} alt="Veltro" style={{height:34, display:"block"}} />
      </a>
      <ul style={{display:"flex",alignItems:"center",gap:"2.5rem",listStyle:"none"}}>
        {["how","why","values","contact"].map(s=>(
          <li key={s}>
            <a href={`#${s}`} style={{
              fontFamily:"'DM Mono',monospace", fontSize:".63rem",
              letterSpacing:".18em", textTransform:"uppercase", color:C.whiteDim,
              transition:"color .3s",
            }}
            onMouseEnter={e=>e.target.style.color=C.gold}
            onMouseLeave={e=>e.target.style.color=C.whiteDim}>
              {s === "contact" ? (
                <span style={{
                  background:C.gold, color:C.bg,
                  padding:".5rem 1.3rem",
                }}>Request Access</span>
              ) : s}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ══════════════════════════════════════════════════
   HERO TYPEWRITER
══════════════════════════════════════════════════ */
function Typewriter({ words, speed=90, pause=2400 }) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    let timeout;
    if (!deleting && ci < word.length) {
      timeout = setTimeout(()=>{ setDisplay(word.slice(0,ci+1)); setCi(c=>c+1); }, speed);
    } else if (!deleting && ci === word.length) {
      timeout = setTimeout(()=>setDeleting(true), pause);
    } else if (deleting && ci > 0) {
      timeout = setTimeout(()=>{ setDisplay(word.slice(0,ci-1)); setCi(c=>c-1); }, speed/2);
    } else if (deleting && ci === 0) {
      setDeleting(false);
      setWi(w=>(w+1)%words.length);
    }
    return ()=>clearTimeout(timeout);
  },[display, wi, ci, deleting]);

  return (
    <span style={{color:C.gold, fontStyle:"italic"}}>
      {display}
      <span style={{
        borderRight:`2px solid ${C.gold}`,
        animation:"blink .8s step-end infinite",
        marginLeft:2,
      }}/>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </span>
  );
}

/* ══════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVis,  setHeroVis]  = useState(false);

  useEffect(()=>{
    const injectStyle = () => {
      if (!document.getElementById("veltro-global")) {
        const s = document.createElement("style");
        s.id = "veltro-global";
        s.textContent = GLOBAL_CSS;
        document.head.appendChild(s);
      }
    };
    injectStyle();
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    setTimeout(()=>setHeroVis(true), 100);
    return ()=>window.removeEventListener("scroll", onScroll);
  },[]);

  const section = (children, id, extra={}) => (
    <section id={id} style={{
      padding:"9rem 5rem", maxWidth:1180, margin:"0 auto", ...extra,
    }}>{children}</section>
  );

  const divider = () => (
    <div style={{height:1, background:`linear-gradient(to right, transparent, ${C.border}, transparent)`}}/>
  );

  const fadeIn = (delay=0) => ({
    opacity:  heroVis?1:0,
    transform:heroVis?"translateY(0)":"translateY(24px)",
    transition:`opacity .9s ease ${delay}ms, transform .9s ease ${delay}ms`,
  });

  return (
    <div style={{background:C.bg, minHeight:"100vh"}}>
      <Nav scrolled={scrolled} />

      {/* ── HERO ───────────────────────────────── */}
      <section id="home" style={{
        minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        textAlign:"center", padding:"9rem 2rem 5rem",
        position:"relative", overflow:"hidden",
      }}>
        {/* particle canvas */}
        <ParticleCanvas />

        {/* radial glow */}
        <div style={{
          position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
          background:`radial-gradient(ellipse 80% 60% at 50% 42%, rgba(201,168,76,.06) 0%, transparent 65%)`,
        }}/>

        {/* vignette */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:"35%",
          background:`linear-gradient(to top, ${C.bg} 0%, transparent 100%)`,
          zIndex:1, pointerEvents:"none",
        }}/>

        {/* content */}
        <div style={{position:"relative", zIndex:2}}>
          {/* badge */}
          <div style={{...fadeIn(150),
            display:"inline-flex", alignItems:"center", gap:".9rem",
            fontFamily:"'DM Mono',monospace", fontSize:".6rem",
            letterSpacing:".3em", textTransform:"uppercase", color:C.gold,
            marginBottom:"2rem",
          }}>
            <span style={{width:32,height:1,background:C.goldDim}}/>
            Private Capital Intelligence
            <span style={{width:32,height:1,background:C.goldDim}}/>
          </div>

          {/* logo */}
          <div style={{...fadeIn(300), marginBottom:"2.5rem"}}>
            <img src={LOGO_SRC} alt="Veltro" style={{height:60}} />
          </div>

          {/* title with typewriter */}
          <h1 style={{...fadeIn(500),
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(3rem,7.2vw,6.8rem)",
            fontWeight:300, lineHeight:1.07, marginBottom:".9rem",
          }}>
            Where{" "}
            <Typewriter words={["Private Capital","Intelligence","Opportunity"]} />
            <br/>Meets Private Companies
          </h1>

          <p style={{...fadeIn(700),
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(1.1rem,2vw,1.55rem)",
            fontWeight:300, fontStyle:"italic",
            color:C.whiteDim, marginBottom:"2.6rem",
          }}>
            The intelligence layer for private markets
          </p>

          <p style={{...fadeIn(900),
            fontSize:".93rem", lineHeight:1.88,
            color:C.whiteDim, maxWidth:500, margin:"0 auto 3rem",
          }}>
            Veltro connects PE firms and family offices with qualified private
            companies through AI-powered matching — replacing slow,
            network-dependent deal sourcing with data-driven introductions.
          </p>

          <div style={{...fadeIn(1100),
            display:"flex", gap:"1.2rem", justifyContent:"center", flexWrap:"wrap",
          }}>
            <MagBtn href="#contact" gold>Request Early Access</MagBtn>
            <MagBtn href="#how" gold={false}>How It Works</MagBtn>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{...fadeIn(1500),
          position:"absolute", bottom:"2.2rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem", zIndex:2,
        }}>
          <div style={{
            width:1, height:48,
            background:`linear-gradient(to bottom, ${C.goldDim}, transparent)`,
            animation:"scrollPulse 2s ease infinite",
          }}/>
          <span style={{
            fontFamily:"'DM Mono',monospace", fontSize:".56rem",
            letterSpacing:".2em", textTransform:"uppercase", color:C.whiteDim,
          }}>Scroll</span>
          <style>{`
            @keyframes scrollPulse{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:.3;transform:scaleY(.6)}}
          `}</style>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────── */}
      <Ticker />

      {/* ── HOW IT WORKS ───────────────────────── */}
      {section(<>
        <Reveal><SLabel>How It Works</SLabel></Reveal>
        <Reveal delay={80}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(2.4rem,4.5vw,3.8rem)",fontWeight:300,lineHeight:1.1,marginBottom:"1.4rem"}}>
            Four steps.<br/><em style={{fontStyle:"italic",color:C.gold}}>One outcome.</em>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{fontSize:".93rem",lineHeight:1.9,color:C.whiteDim,maxWidth:500,marginBottom:"5rem"}}>
            Veltro orchestrates the entire deal introduction process — from intelligent
            matching to structured introductions — without owning a single dollar of capital.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",
            border:`1px solid ${C.borderFt}`}}>
            <HowCard num="01" icon="👥" name="Investors"
              desc="PE firms and family offices build intelligent profiles. We learn your thesis, sector focus, ticket size, and portfolio gaps." />
            <HowCard num="02" icon="🏢" name="Private Companies"
              desc="Qualified companies seeking capital or strategic partnerships are sourced, vetted, and profiled by our AI engine." />
            <HowCard num="03" icon="🤝" name="Deals Done"
              desc="We facilitate structured introductions and support due diligence — closing the gap between capital and opportunity." />
            <HowCard num="04" icon="📊" name="Veltro Fee" last
              desc="We take a success fee only when the deal is done. Our incentives are perfectly aligned with yours from day one." />
          </div>
        </Reveal>
      </>, "how")}

      {divider()}

      {/* ── WHY VELTRO ─────────────────────────── */}
      {section(<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"center"}}>
          <div>
            <Reveal><SLabel>Why Veltro</SLabel></Reveal>
            <Reveal delay={80}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(2.4rem,4.5vw,3.8rem)",fontWeight:300,lineHeight:1.1,marginBottom:"1.4rem"}}>
                The private market<br/>is <em style={{fontStyle:"italic",color:C.gold}}>broken.</em><br/>We fix it.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p style={{fontSize:".93rem",lineHeight:1.9,color:C.whiteDim,maxWidth:500,marginBottom:"2.5rem"}}>
                Today, deal flow runs on personal networks. Great companies miss funding.
                Great investors miss deals. Billions in capital sit undeployed while viable
                companies die without access.
              </p>
            </Reveal>
            <div style={{borderTop:`1px solid ${C.borderFt}`}}>
              <Feature delay={0}  name="Intelligent Matching"   desc="Our AI profiles both investors and companies — then ranks matches by fit, not by who you know." />
              <Feature delay={80} name="Data Compounding"       desc="Every deal made on the platform makes the next match smarter. The moat grows with every introduction." />
              <Feature delay={160} name="Aligned Incentives"    desc="We earn only when deals close. No subscription required for companies. No risk, maximum access." />
              <Feature delay={240} name="Proprietary Deal Flow" desc="Access opportunities invisible to traditional networks — across geographies, sectors, and stages." />
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:C.borderFt,
            border:`1px solid ${C.borderFt}`}}>
            <StatCard num={4}  suffix="T+"  label="Private equity AUM globally"                  delay={0} />
            <StatCard num={12} suffix="mo"  label="Avg months founders spend finding investors"   delay={80} />
            <StatCard num={80} suffix="%"   label="Of deals sourced through personal networks"    delay={160} />
            <StatCard num={0}  suffix=""    label="Dominant AI marketplace for private markets"   delay={240} />
          </div>
        </div>
      </>, "why")}

      {/* ── VALUES ─────────────────────────────── */}
      <div id="values" style={{
        background:C.bgSoft,
        borderTop:`1px solid ${C.borderFt}`,
        borderBottom:`1px solid ${C.borderFt}`,
      }}>
        <div style={{maxWidth:1180,margin:"0 auto",padding:"9rem 5rem"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>
            <ValueCard icon="🛡" name="Trust" delay={0}
              desc="Built on confidentiality, integrity, and alignment. Every introduction is vetted. Every relationship is protected." />
            <ValueCard icon="◎" name="Intelligence" delay={120}
              desc="Data-driven insights and proprietary deal flow. Our AI learns continuously — making every match smarter than the last." />
            <ValueCard icon="↗" name="Performance" delay={240}
              desc="Focused on execution and long-term value. We measure ourselves by deals closed, not users acquired." />
          </div>
        </div>
      </div>

      {/* ── WIN BANNER ─────────────────────────── */}
      <div style={{textAlign:"center",padding:"9rem 4rem",position:"relative",overflow:"hidden"}}>
        <div style={{
          position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
          width:700,height:700,borderRadius:"50%",
          background:`radial-gradient(ellipse, rgba(201,168,76,.055) 0%, transparent 65%)`,
          pointerEvents:"none",
        }}/>
        <Reveal>
          <p style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(2rem,5vw,3.8rem)",
            fontWeight:300,fontStyle:"italic",lineHeight:1.2,marginBottom:"1.2rem",
          }}>
            "We only win<br/>
            <em style={{fontStyle:"normal",color:C.gold}}>when you win."</em>
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p style={{
            fontFamily:"'DM Mono',monospace",fontSize:".65rem",
            letterSpacing:".25em",textTransform:"uppercase",
            color:C.whiteDim,marginBottom:"3rem",
          }}>
            Aligned incentives &nbsp;·&nbsp; Transparent process &nbsp;·&nbsp; Superior outcomes
          </p>
        </Reveal>
        <Reveal delay={240}>
          <MagBtn href="#contact" gold>Join the Waiting List</MagBtn>
        </Reveal>
      </div>

      {/* ── CONTACT ────────────────────────────── */}
      <div id="contact" style={{background:C.bgSoft,borderTop:`1px solid ${C.borderFt}`}}>
        <div style={{
          display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",
          alignItems:"center",padding:"9rem 5rem",maxWidth:1180,margin:"0 auto",
        }}>
          <div>
            <Reveal><SLabel>Early Access</SLabel></Reveal>
            <Reveal delay={80}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(2.4rem,4.5vw,3.8rem)",fontWeight:300,lineHeight:1.1,marginBottom:"1.4rem"}}>
                Be among<br/>the <em style={{fontStyle:"italic",color:C.gold}}>first.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p style={{fontSize:".93rem",lineHeight:1.9,color:C.whiteDim,maxWidth:440,marginBottom:"2rem"}}>
                Veltro is in private beta. We are onboarding a select group of PE firms,
                family offices, and private companies to shape the platform from the ground up.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".68rem",
                letterSpacing:".1em",color:C.whiteDim,lineHeight:2.3}}>
                <div>📩 <a href="mailto:roberto@veltro.vc" style={{color:C.gold}}>roberto@veltro.vc</a></div>
                <div>🌐 <a href="https://veltro.vc" style={{color:C.gold}}>veltro.vc</a></div>
                <div>📍 Canada</div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div style={{display:"flex",flexDirection:"column",gap:".9rem"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem"}}>
                <FInput label="First Name" placeholder="John" />
                <FInput label="Last Name"  placeholder="Smith" />
              </div>
              <FInput label="Email Address" type="email" placeholder="john@fund.com" />
              <FInput label="I am a" isSelect options={[
                "PE Fund Manager","Family Office Director",
                "Private Company Founder / CEO","M&A Advisor","Other"
              ]} />
              <FInput label="Company / Fund" placeholder="Your organization" />
              <MagBtn href="mailto:roberto@veltro.vc" gold style={{textAlign:"center",marginTop:".4rem"}}>
                Request Early Access
              </MagBtn>
              <p style={{
                fontFamily:"'DM Mono',monospace",fontSize:".58rem",
                letterSpacing:".08em",color:C.whiteDim,textAlign:"center",
              }}>
                By submitting, you agree to be contacted by the Veltro team.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer style={{
        borderTop:`1px solid ${C.borderFt}`,
        padding:"2.5rem 5rem",
        display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.5rem",
      }}>
        <img src={LOGO_SRC} alt="Veltro" style={{height:26}} />
        <ul style={{display:"flex",gap:"2rem",listStyle:"none"}}>
          {["how","why","values","contact"].map(s=>(
            <li key={s}>
              <a href={`#${s}`} style={{
                fontFamily:"'DM Mono',monospace",fontSize:".6rem",
                letterSpacing:".14em",textTransform:"uppercase",color:C.whiteDim,
                transition:"color .3s",
              }}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color=C.whiteDim}>
                {s}
              </a>
            </li>
          ))}
          <li>
            <a href="https://linkedin.com/company/veltro-vc" target="_blank"
              style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",
                letterSpacing:".14em",textTransform:"uppercase",color:C.whiteDim}}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color=C.whiteDim}>
              LinkedIn
            </a>
          </li>
        </ul>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:".56rem",
          letterSpacing:".08em",color:"rgba(240,235,224,.18)"}}>
          © 2026 Veltro · Where Private Capital Meets Private Companies
        </div>
      </footer>
    </div>
  );
}
