const { useState, useEffect, useRef } = React;

/* ============ CONFIGURAÇÃO ============ */
const WHATSAPP_URL = "https://wa.me/5518996241216";
const INSTAGRAM_URL = "https://www.instagram.com/odante.edit/";

const VIDEOS = [
  { n: 1, g: "166,60,240", src: "./video1.mp4" },
  { n: 2, g: "255,46,133", src: "./video2.mp4" },
  { n: 3, g: "209,43,214", src: "./video3.mp4" },
  { n: 4, g: "124,58,237", src: "./video4.mp4" },
];

const FERRAMENTAS = ["DaVinci Resolve", "CapCut", "Photoshop", "Sound Design", "Premiere Pro", "After Effects"];

const SERVICOS = [
  { n: "01", titulo: "Vídeos curtos", texto: "Edição de Reels, TikTok, YouTube Shorts e legendas para prender a atenção." },
  { n: "02", titulo: "SFX", texto: "Efeitos sonoros profissionais, com ênfase para edição dinamica." },
  { n: "03", titulo: "Anúncios e criativos", texto: "Edição de vídeos e criativos pensados para anúncios e campanhas." },
];

/* ============ ESTILO ============ */
const css = `
html, body, #root { margin: 0 !important; padding: 0 !important; width: 100%; min-height: 100%; background: #050506 !important; }
body { overflow-x: hidden; }

.mz, .mz * { box-sizing: border-box; }
.mz {
  --bg: #050506; --fg: #f3f3f5; --muted: #8d8d99;
  --line: rgba(255,255,255,.14);
  --accent: #d9a6ff; --pp: #a63cf0; --pk: #ff2e85;
  --glass: rgba(18,18,20,.72);
  --panel: linear-gradient(180deg,#1c1c1f 0%,#121214 100%);
  --rim: inset 0 1px 0 rgba(255,255,255,.07), 0 30px 60px rgba(0,0,0,.45);
  --ease: cubic-bezier(.2,.7,.2,1);
  --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  color-scheme: dark;
  position: relative;
  font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: var(--bg); color: var(--fg);
  overflow-x: hidden; -webkit-font-smoothing: antialiased;
}
.mz a { color: inherit; text-decoration: none; }
.mz button { font-family: inherit; }
.mz ::selection { background: #a63cf0; color: #fff; }
.mz :focus-visible { outline: 3px solid #9446f0; outline-offset: 3px; border-radius: 12px; }
.mz section, .mz header { scroll-margin-top: 84px; }
.mz-wrap { width: min(100%, 1240px); margin: 0 auto; padding-inline: 22px; }

.mz .grad { background: linear-gradient(90deg,#b57bff 0%,#a63cf0 28%,#e04fd0 55%,#ff4fa3 80%,#ff8fb8 100%); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
.mz .grad-short { background: linear-gradient(90deg,#b57bff,#e04fd0 55%,#ff4fa3); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }

.mz-progress { position: fixed; inset: 0 0 auto 0; height: 5px; z-index: 60; transform-origin: 0 50%; transform: scaleX(0); will-change: transform;
  background: linear-gradient(90deg,#a63cf0,#d12bd6,#ff2e85); }

.mz-top { position: fixed; z-index: 50; top: calc(14px + env(safe-area-inset-top,0px)); left: 14px; right: 14px; max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: flex-end; gap: 18px; padding: 8px 8px 8px 24px; border-radius: 999px;
  background: var(--glass); backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255,255,255,.14); box-shadow: var(--rim);
  transform: translateY(-170%); transition: transform .45s var(--ease); }
.mz-top.on { transform: none; }
.mz-top a.l { font-size: 14px; color: #b8b8c6; transition: color .25s; }
.mz-top a.l:hover { color: #fff; }
.mz .mz-fab { position: fixed; z-index: 50; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom,0px)); display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 999px; font-weight: 500; font-size: 15px; color: #fff; border: 1px solid rgba(255,255,255,.28);
  background: linear-gradient(100deg, rgba(196,64,248,.95) 0%, rgba(132,42,196,.6) 55%, rgba(48,22,70,.65) 100%), #17171a;
  box-shadow: 0 0 30px rgba(176,38,255,.5), inset 0 1px 0 rgba(255,255,255,.2);
  transform: translateY(170%); transition: transform .45s var(--ease), box-shadow .25s; }
.mz .mz-fab.on { transform: none; }
.mz .mz-fab:hover { box-shadow: 0 0 44px rgba(255,46,133,.55), inset 0 1px 0 rgba(255,255,255,.25); }

.mz-hero { position: relative; overflow: hidden; isolation: isolate; padding: 14px 14px 0; background: #050506; }
.mz-hero::before { content: ""; position: absolute; z-index: -1; top: -25%; right: -10%; width: 75%; height: 80%; pointer-events: none;
  background: radial-gradient(ellipse at top, rgba(255,255,255,.17), transparent 65%); filter: blur(30px); }
.mz-hero::after { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .06; mix-blend-mode: screen;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
.mz-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); pointer-events: none; animation: mz-drift 16s ease-in-out infinite alternate; }
.mz-blob.a { width: 60vw; height: 60vw; max-width: 620px; max-height: 620px; left: -18%; top: 6%; background: #a63cf0; opacity: .38; }
.mz-blob.b { width: 55vw; height: 55vw; max-width: 560px; max-height: 560px; right: -20%; bottom: -6%; background: #ff2e85; opacity: .3; animation-delay: -5s; }
.mz-blob.c { width: 40vw; height: 40vw; max-width: 420px; max-height: 420px; right: 8%; top: 18%; background: #7c3aed; opacity: .35; animation-delay: -9s; }
@keyframes mz-drift { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(6%,-8%,0) scale(1.15); } }

.mz-hero-inner { position: relative; z-index: 1; max-width: 1240px; margin: 0 auto; padding: 18px 20px 48px; border-radius: 36px; overflow: hidden; isolation: isolate;
  border: 1px solid rgba(255,255,255,.1); box-shadow: var(--rim);
  background: linear-gradient(180deg, rgba(28,28,31,.82), rgba(18,18,20,.9)); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
.mz-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
.mz-hero-inner > *:not(.mz-canvas), .mz-contato > *:not(.mz-canvas) { position: relative; z-index: 1; }

.mz-nav { display: flex; align-items: center; justify-content: flex-end; gap: clamp(18px, 4vw, 34px); min-height: 60px; padding-bottom: 14px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(90deg, transparent, rgba(255,255,255,.16) 20%, rgba(255,255,255,.16) 80%, transparent) 1; }
.mz-nav a.l { font-size: 14px; color: #b8b8c6; transition: color .25s; }
.mz-nav a.l:hover { color: #fff; }
.mz-nav .mz-nav-cta { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; color: #f3f3f5; padding: 11px 20px;
  border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: rgba(255,255,255,.04);
  transition: border-color .25s, background .25s, transform .25s var(--ease); }
.mz-nav .mz-nav-cta:hover { border-color: #ff5fa8; background: rgba(255,79,163,.08); transform: translateY(-2px); }
.mz-nav-cta i { font-style: normal; font-size: 11px; }

.mz-pill { display: inline-flex; align-items: center; gap: 12px; margin-top: clamp(44px, 9vw, 100px); padding: 10px 18px;
  border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: rgba(255,255,255,.04);
  font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: #f3f3f5; }
.mz-dot { width: 10px; height: 10px; border-radius: 50%; background: #ff4fa3; flex-shrink: 0; animation: mz-ping 2s infinite; }
@keyframes mz-ping { 0% { box-shadow: 0 0 0 0 rgba(255,79,163,.8); } 70%, 100% { box-shadow: 0 0 0 12px rgba(255,79,163,0); } }

.mz-h1 { margin: 28px 0 0; font-weight: 800; line-height: .98; font-size: clamp(54px, 15.5vw, 190px); letter-spacing: -.065em; }
.mz-h1 span { display: inline-block; padding-right: .06em; }
.mz-lead { margin: 30px 0 0; max-width: 600px; font-weight: 300; font-size: clamp(17px, 2vw, 22px); line-height: 1.75; color: #a9a9b6; letter-spacing: -.2px; }
.mz-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
.mz-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px; white-space: nowrap; flex-shrink: 0;
  font-weight: 500; font-size: 15px; letter-spacing: -.1px; padding: 14px 24px; border-radius: 999px; border: 1px solid transparent; cursor: pointer;
  transition: transform .2s var(--ease), box-shadow .25s, border-color .25s; }
.mz-btn:hover { transform: translateY(-2px); }
.mz-btn:active { transform: scale(.97); }
.mz-btn .ar { display: inline-block; transition: transform .25s var(--ease); }
.mz-btn:hover .ar { transform: translate(3px,-3px); }
.mz .mz-btn-dark {
  color: #fff; border-color: rgba(255,255,255,.28);
  background: linear-gradient(100deg, rgba(196,64,248,.95) 0%, rgba(132,42,196,.6) 55%, rgba(48,22,70,.65) 100%), #17171a;
  box-shadow: 0 0 34px rgba(176,38,255,.38), inset 0 1px 0 rgba(255,255,255,.2); }
.mz .mz-btn-dark:hover { box-shadow: 0 0 48px rgba(255,46,133,.45), inset 0 1px 0 rgba(255,255,255,.25); }
.mz .mz-btn-line { background: rgba(255,255,255,.04); color: #f3f3f5; border-color: rgba(255,255,255,.18); }
.mz .mz-btn-line:hover { border-color: #ff5fa8; }
.mz .mz-cta .mz-btn-dark::before {
  content: ""; position: absolute; left: -16px; top: 50%; width: 3px; height: 20px; margin-top: -10px; border-radius: 3px;
  background: linear-gradient(#ff4fa3,#a63cf0); box-shadow: 0 0 14px #d12bd6; }
.mz-ico { display: inline-block; flex-shrink: 0; }

.mz-hero [data-in] { animation: mz-rise .9s var(--ease) both; animation-delay: var(--d, 0ms); }
@keyframes mz-rise { from { opacity: 0; transform: translateY(26px); } }

.mz-band-wrap { position: relative; z-index: 2; overflow: hidden; padding: clamp(46px, 7vw, 70px) 0; }
.mz-band { background: var(--panel); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 0 60px rgba(166,60,240,.28);
  transform: rotate(-1.6deg) scale(1.06); padding: 4px 0; overflow: hidden; }
.mz-row { display: flex; width: max-content; animation: mz-slide 38s linear infinite; }
.mz-row.rev { animation-direction: reverse; animation-duration: 44s; }
.mz-grp { display: flex; align-items: center; flex-shrink: 0; }
.mz-item { font-weight: 800; text-transform: uppercase; letter-spacing: -.045em; font-size: clamp(30px, 6vw, 64px); line-height: 1; padding: 20px 0; white-space: nowrap; color: #f3f3f5; }
.mz-row.rev .mz-item { background: linear-gradient(90deg,#b57bff,#e04fd0 55%,#ff4fa3); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
.mz-star { width: .55em; height: .55em; font-size: clamp(30px, 6vw, 64px); margin: 0 clamp(30px, 6vw, 70px); flex-shrink: 0; color: #ff4fa3; filter: drop-shadow(0 0 10px rgba(255,46,133,.7)); }
@keyframes mz-slide { to { transform: translateX(-50%); } }

.mz-main { background: radial-gradient(50% 30% at 100% 45%, rgba(166,60,240,.13), transparent 70%), radial-gradient(45% 25% at 0% 85%, rgba(255,46,133,.09), transparent 70%), var(--bg); }
.mz-sec { padding: clamp(60px, 10vw, 130px) 0 clamp(40px, 7vw, 90px); }
.mz-eyebrow { display: block; margin: 0 0 22px; font-family: var(--mono); font-weight: 500; font-size: 13px; letter-spacing: .18em; text-transform: uppercase; color: var(--accent); }
.mz-eyebrow::before { content: ""; display: inline-block; width: 3px; height: 16px; margin-right: 12px; vertical-align: -3px; border-radius: 3px;
  background: linear-gradient(#ff4fa3,#a63cf0); box-shadow: 0 0 12px #c03cf0; }
.mz-h2 { margin: 0; font-weight: 800; font-size: clamp(34px, 7.6vw, 84px); line-height: 1.1; letter-spacing: -.05em; }
.mz-sub { margin: 22px 0 0; font-size: 16px; color: var(--muted); line-height: 1.6; }

.mz [data-reveal].in { opacity: 1; transform: none; }
.mz-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity .7s var(--ease),
    transform .7s var(--ease);
  transition-delay: var(--d, 0ms);
}

.mz-reveal.in {
  opacity: 1;
  transform: none;
}

.mz-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: clamp(36px, 6vw, 70px); }
.mz-card { padding: 18px 18px 14px; border-radius: 32px; border: 1px solid rgba(255,255,255,.1); color: #f3f3f5;
  background: radial-gradient(90% 70% at 100% 0%, rgba(var(--g),.22), transparent 65%), var(--panel); box-shadow: var(--rim); }
.mz .mz-card[data-reveal].in { transition: transform .35s var(--ease), border-color .35s, box-shadow .35s, opacity .7s; transition-delay: 0ms; }
.mz .mz-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--g), .6);
  box-shadow:
    0 0 44px rgba(var(--g), .28),
    inset 0 1px 0 rgba(255,255,255,.1);
}
.mz-stage { position: relative; aspect-ratio: 16 / 9; border-radius: 22px; overflow: hidden; cursor: pointer; background: linear-gradient(180deg,#121218 0%,#000 100%); }
.mz-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; background: transparent; }

.mz-stage::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,.6) 100%); transition: opacity .3s; }
.mz-card.playing .mz-stage::after { opacity: .3; }
.mz-play { position: absolute; z-index: 2; top: 50%; left: 50%; width: clamp(44px, 19%, 80px); aspect-ratio: 1; margin: 0; transform: translate(-50%,-50%);
  border: 0; border-radius: 50%; background: #ececf0; color: #0c0c16; cursor: pointer; display: grid; place-items: center;
  transition: transform .3s var(--ease), opacity .3s, background .3s, box-shadow .3s; }
.mz-play svg { width: 38%; height: 38%; fill: currentColor; }
.mz-play .i-play { margin-left: 6%; }
.mz-stage:hover .mz-play { transform: translate(-50%,-50%) scale(1.08); background: #fff; box-shadow: 0 0 44px rgba(255,46,133,.5), 0 0 24px rgba(166,60,240,.5); }
.mz-card.playing .mz-play { opacity: 0; }
.mz-card.playing .mz-stage:hover .mz-play, .mz-card.playing .mz-play:focus-visible { opacity: 1; }
.mz-bar { position: absolute; z-index: 3; left: 18px; right: 18px; bottom: 12px; height: 22px; cursor: pointer; touch-action: none; display: flex; align-items: center; outline-offset: 0; }
.mz-bar::before { content: ""; position: absolute; left: 0; right: 0; height: 3px; border-radius: 3px; background: rgba(255,255,255,.26); }
.mz-fill { position: absolute; left: 0; height: 3px; border-radius: 3px; width: 0; background: linear-gradient(90deg,#a63cf0,#ff2e85); }
.mz-thumb { position: absolute; top: 50%; width: 13px; height: 13px; margin: -6.5px 0 0 -6.5px; border-radius: 50%; background: #fff; box-shadow: 0 0 12px rgba(255,46,133,.7); transition: transform .2s; }
.mz-bar:hover .mz-thumb { transform: scale(1.3); }
.mz-card-t { margin: 0; padding: 20px 8px 6px; font-size: clamp(16px, 2.2vw, 22px); font-weight: 500; letter-spacing: -.02em; }

.mz-acc { display: grid; gap: 14px; margin-top: clamp(36px, 6vw, 70px); }
.mz-acc-item { border: 1px solid rgba(255,255,255,.1); border-radius: 28px; background: var(--panel); box-shadow: var(--rim); overflow: hidden;
  transition: border-color .35s, box-shadow .35s, background .35s; }
.mz-acc-item:hover { border-color: rgba(166,60,240,.45); }
.mz-acc-item.open { border-color: rgba(166,60,240,.6); box-shadow: 0 0 44px rgba(166,60,240,.22), inset 0 1px 0 rgba(255,255,255,.1);
  background: radial-gradient(80% 100% at 100% 0%, rgba(255,46,133,.15), transparent 65%), var(--panel); }
.mz-acc-h { display: grid; grid-template-columns: clamp(46px, 7vw, 70px) 1fr auto; align-items: center; width: 100%; padding: 24px 24px 24px 28px;
  background: none; border: 0; color: inherit; text-align: left; cursor: pointer; }
.mz-acc-n { font-family: var(--mono); font-weight: 500; font-size: 12px; letter-spacing: .1em; color: var(--muted); }
.mz-acc-t { font-size: clamp(21px, 3vw, 30px); font-weight: 500; letter-spacing: -.035em; }
.mz-acc-i { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; font-size: 22px; font-weight: 300; line-height: 1; color: #fff;
  border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.05); transition: transform .35s var(--ease), background .35s, border-color .35s; }
.mz-acc-h:hover .mz-acc-i { border-color: #ff5fa8; }
.mz-acc-item.open .mz-acc-i { transform: rotate(45deg); background: linear-gradient(135deg, rgba(166,60,240,.9), rgba(255,46,133,.7)); border-color: transparent; }
.mz-acc-b { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .4s var(--ease); }
.mz-acc-item.open .mz-acc-b { grid-template-rows: 1fr; }
.mz-acc-b > div { overflow: hidden; }
.mz-acc-b p { margin: 0; padding: 0 28px 28px clamp(74px, 7vw + 28px, 98px); max-width: 720px; font-size: 16px; line-height: 1.65; color: #a9a9b6; }

.mz-contato { position: relative; isolation: isolate; overflow: hidden; text-align: center; margin: clamp(40px, 6vw, 80px) 14px 0;
  padding: clamp(80px, 13vw, 140px) 22px; border: 1px solid rgba(255,255,255,.1); border-radius: 36px; box-shadow: var(--rim);
  background: radial-gradient(60% 50% at 50% 0%, rgba(166,60,240,.45), transparent 70%), radial-gradient(50% 45% at 92% 100%, rgba(255,46,133,.35), transparent 70%), var(--panel); }
.mz-contato .mz-h2 { margin-inline: auto; max-width: 960px; }
.mz-contato .mz-sub { margin-top: 24px; font-weight: 300; font-size: clamp(17px, 2vw, 22px); }
.mz-contato .mz-cta { justify-content: center; margin-top: 40px; }
.mz-contato .mz-eyebrow::before { display: none; }

.mz-foot { background: #050506; margin-top: clamp(50px, 8vw, 90px); border-top: 1px solid rgba(255,255,255,.1); padding: 36px 0 calc(36px + env(safe-area-inset-bottom,0px)); }
.mz-foot-in { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.mz-brand { display: inline-flex; align-items: center; gap: 14px; }
.mz-brand b { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; font-size: 14px; font-weight: 800;
  border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.04); }
.mz-brand span.t { font-size: 14px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; transition: color .25s; }
.mz-brand:hover span.t { color: #ff7ab8; }
.mz-copy { font-size: 13px; color: var(--muted); }

@media (max-width: 640px) {
  .mz-cards { gap: 12px; }
  .mz-card { padding: 10px 10px 8px; border-radius: 22px; }
  .mz-stage { border-radius: 14px; }
  .mz-bar { left: 12px; right: 12px; bottom: 5px; }
  .mz-card-t { padding: 12px 6px 6px; }
  .mz-acc-h { padding: 20px 18px 20px 20px; }
  .mz-acc-b p { padding: 0 20px 24px 20px; }
  .mz-acc-i { width: 38px; height: 38px; }
  .mz-eyebrow { font-size: 11px; letter-spacing: .14em; }
  .mz-pill { font-size: 10px; letter-spacing: .12em; padding: 9px 14px; }
  .mz-top { padding-left: 18px; gap: 14px; }
  .mz-top a.l.hide-s { display: none; }
}
@media (max-width: 340px) { .mz-cards { grid-template-columns: 1fr; } }
@media (min-width: 820px) {
  .mz-hero { padding: 18px 18px 0; }
  .mz-hero-inner { padding: 22px 44px 64px; border-radius: 44px; }
  .mz-wrap { padding-inline: 44px; }
  .mz-contato { margin-inline: 18px; border-radius: 44px; padding-inline: 56px; }
  .mz-btn { padding: 15px 28px; font-size: 16px; }
  .mz-cards { gap: 28px; }
  .mz-card { padding: 22px 22px 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .mz *, .mz *::before, .mz *::after { animation: none !important; transition: none !important; }
  .mz [data-reveal] { opacity: 1; transform: none; }
}
`;
/* ============ COMPONENTES ============ */

function Asterisco() {
  return (
    <svg className="mz-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function Faixa() {
  const fila = (lista, rev) => {
    const itens = [...lista, ...lista];
    const grupo = (oculto) => (
      <div className="mz-grp" aria-hidden={oculto || undefined}>
        {itens.map((t, i) => (
          <React.Fragment key={i}>
            <span className="mz-item">{t}</span>
            <Asterisco />
          </React.Fragment>
        ))}
      </div>
    );
    return <div className={`mz-row${rev ? " rev" : ""}`}>{grupo(false)}{grupo(true)}</div>;
  };
  const segunda = [...FERRAMENTAS.slice(2), ...FERRAMENTAS.slice(0, 2)];
  return (
    <div className="mz-band-wrap" role="region" aria-label={FERRAMENTAS.join(", ")}>
      <div className="mz-band">
        {fila(FERRAMENTAS, false)}
        {fila(segunda, true)}
      </div>
    </div>
  );
}

function Particulas({ densidade = 13000 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const pai = c.parentElement;
    const ctx = c.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = ["255,79,163", "181,123,255", "224,79,208", "255,255,255"];
    let w = 0, h = 0, ps = [], raf = 0, ativo = true;

    const nova = () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.7,
      vx: (Math.random() - 0.5) * 0.14, vy: -(Math.random() * 0.16 + 0.03),
      a: Math.random() * 0.7 + 0.25, t: Math.random() * 6.28, s: Math.random() * 0.025 + 0.006,
      c: cores[Math.floor(Math.random() * cores.length)],
    });
    const desenhar = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        ctx.fillStyle = `rgba(${p.c},${p.a * (0.55 + 0.45 * Math.sin(p.t))})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
    };
    const passo = () => {
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.t += p.s;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4; else if (p.x > w + 4) p.x = -4;
      }
      desenhar();
      raf = ativo ? requestAnimationFrame(passo) : 0;
    };
    const medir = () => {
      const r = pai.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: Math.max(Math.round((w * h) / densidade), 18) }, nova);
      desenhar();
    };
medir();
    const ro = "ResizeObserver" in window ? new ResizeObserver(medir) : null;
    if (ro) ro.observe(pai);

    let io = null;
    if (!reduce) {
      io = new IntersectionObserver(([e]) => {
        ativo = e.isIntersecting;
        if (ativo && !raf) raf = requestAnimationFrame(passo);
      });
      io.observe(pai);
    }
    return () => { ativo = false; cancelAnimationFrame(raf); if (ro) ro.disconnect(); if (io) io.disconnect(); };
  }, [densidade]);
  return <canvas className="mz-canvas" ref={ref} aria-hidden="true" />;
}

const Seta = () => <span className="ar" aria-hidden="true">↗</span>;
const Bolinha = () => (
  <svg className="mz-ico" width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="#fff" /></svg>
);
const Anel = () => (
  <svg className="mz-ico" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <circle cx="5" cy="5" r="3.6" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="5" cy="5" r="1" fill="#fff" />
  </svg>
);

let videoAtivo = null;

/* ============ VÍDEOS INDIVIDUAIS ============ */

function VideoCard({ n, g, src }) {
  const vRef = useRef(null);
  const barRef = useRef(null);
  const arrasta = useRef(false);
  const [tocando, setTocando] = useState(false);
  const [p, setP] = useState(0);
  const [erro, setErro] = useState("");

  const alternar = () => {
    const v = vRef.current;
    if (!v) return;

    if (v.paused) {
      if (videoAtivo && videoAtivo !== v) videoAtivo.pause();
      videoAtivo = v;

      setErro("");

      const r = v.play();
      if (r && r.catch) {
        r.catch((err) => {
          console.error("Erro ao reproduzir:", src, err);
          setErro("Não foi possível reproduzir este vídeo.");
        });
      }
    } else {
      v.pause();
    }
  };

  const buscar = (e) => {
    const v = vRef.current, b = barRef.current;
    if (!v || !b || !v.duration) return;
    const r = b.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    v.currentTime = k * v.duration;
    setP(k);
  };
  const teclado = (e) => {
    const v = vRef.current;
    if (!v || !v.duration) return;
    if (e.key === "ArrowRight") { e.preventDefault(); v.currentTime = Math.min(v.duration, v.currentTime + 5); }
    if (e.key === "ArrowLeft") { e.preventDefault(); v.currentTime = Math.max(0, v.currentTime - 5); }
  };

  
        return (
  <div
    className="mz-reveal"
    data-reveal
    style={{ "--d": `${((n - 1) % 2) * 100}ms` }}
  >
    <article
      className={`mz-card ${tocando ? "playing" : ""}`}
      style={{ "--g": g }}
    >
      <div className="mz-stage" onClick={alternar}>
        <video
          ref={vRef}
          src={src}
          type="video/mp4"
          preload="auto"
          playsInline
          controls={false}
          muted={false}
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          onEnded={() => {
            setTocando(false);
            setP(0);
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration && !arrasta.current) {
              setP(v.currentTime / v.duration);
            }
          }}
          onError={(e) => {
            console.error("Falha ao carregar vídeo:", src, e.currentTarget.error);
            setErro("Erro ao carregar vídeo. Confira o arquivo.");
          }}
          onLoadedMetadata={() => setErro("")}
        />

        <button
          className="mz-play"
          type="button"
          aria-label={tocando ? "Pausar" : "Reproduzir"}
        >
          {tocando ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg className="i-play" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
  {erro && (
          <div
            style={{
              position: "absolute",
              zIndex: 4,
              inset: "auto 8px 35px",
              padding: "6px",
              textAlign: "center",
              fontSize: "12px",
              color: "#fff",
              background: "rgba(150,0,0,.85)",
              borderRadius: "8px",
            }}
          >
            {erro}
          </div>
        )}

        <div
          className="mz-bar"
          ref={barRef}
          role="slider"
          tabIndex={0}
          aria-label={`Progresso do Projeto ${n}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(p * 100)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={teclado}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.currentTarget.setPointerCapture(e.pointerId);
            arrasta.current = true;
            buscar(e);
          }}
          onPointerMove={(e) => {
            if (arrasta.current) buscar(e);
          }}
          onPointerUp={() => {
            arrasta.current = false;
          }}
          onPointerCancel={() => {
            arrasta.current = false;
          }}
        >
          <span className="mz-fill" style={{ width: `${p * 100}%` }} />
          <span className="mz-thumb" style={{ left: `${p * 100}%` }} />
        </div>
      </div>

      <h3 className="mz-card-t">Projeto {n}</h3>
    </article>
  </div>
);
}

function Servicos() {
  const [aberto, setAberto] = useState(0);
  return (
    <div className="mz-acc" data-reveal>
      {SERVICOS.map((s, i) => {
        const on = aberto === i;
        return (
          <div className={`mz-acc-item${on ? " open" : ""}`} key={s.n}>
            <button
              className="mz-acc-h"
              type="button"
              aria-expanded={on}
              aria-controls={`serv-${i}`}
              onClick={() => setAberto(on ? -1 : i)}
            >
              <span className="mz-acc-n">{s.n}</span>
              <span className="mz-acc-t">{s.titulo}</span>
              <span className="mz-acc-i" aria-hidden="true">+</span>
            </button>
            <div className="mz-acc-b" id={`serv-${i}`} role="region">
              <div><p>{s.texto}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Menezes() {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) html.style.scrollBehavior = "smooth";
    const onScroll = () => {
      const max = html.scrollHeight - html.clientHeight;
      const k = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${k})`;
      setScrolled(window.scrollY > 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); html.style.scrollBehavior = prev; };
  }, []);
useEffect(() => {
  const els = rootRef.current.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in");
      io.unobserve(e.target); }
  }), { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
  return () => io.disconnect();
}, []);

const tab = scrolled ? 0 : -1;

return (
    <div className="mz" id="top" ref={rootRef}>
      <style>{css}</style>
      <div className="mz-progress" ref={barRef} aria-hidden="true" />

      <div className={`mz-top${scrolled ? " on" : ""}`}>
        <a className="l" href="#projetos" tabIndex={tab}>Projetos</a>
        <a className="l hide-s" href="#servicos" tabIndex={tab}>Serviços</a>
        <a className="mz-btn mz-btn-dark" href="#contato" tabIndex={tab} style={{ padding: "10px 18px", fontSize: 15 }}>Contato <Seta /></a>
      </div>

      <a className={`mz-fab${scrolled ? " on" : ""}`} href={WHATSAPP_URL} tabIndex={tab} aria-label="Chamar no WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-3.6-.9-3-1.3-4.9-4.4-5.1-4.6-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" /></svg>
        WhatsApp
      </a>
  {/* HERO */}
      <header className="mz-hero">
        <span className="mz-blob a" /><span className="mz-blob b" /><span className="mz-blob c" />
        <div className="mz-hero-inner">
          <Particulas />
          <nav className="mz-nav" aria-label="Principal">
            <a className="l" href="#projetos">Projetos</a>
            <a className="l" href="#servicos">Serviços</a>
            <a className="mz-nav-cta" href="#contato">Contato <i aria-hidden="true">↗</i></a>
          </nav>

          <span className="mz-pill" data-in style={{ "--d": "60ms" }}><i className="mz-dot" />Disponível para novos projetos</span>

          <h1 className="mz-h1" data-in style={{ "--d": "160ms" }}><span className="grad">MENEZES</span></h1>

          <p className="mz-lead" data-in style={{ "--d": "280ms" }}>
            Editor de vídeo especializado em criar conteúdos dinâmicos e que prendem a atenção.
          </p>

          <div className="mz-cta" data-in style={{ "--d": "400ms" }}>
            <a className="mz-btn mz-btn-dark" href="#projetos">Ver projetos <Seta /></a>
            <a className="mz-btn mz-btn-line" href={WHATSAPP_URL}><Bolinha />Falar no WhatsApp</a>
          </div>
        </div>
      </header>

      <Faixa />

      <main className="mz-main">
        <section className="mz-sec" id="projetos">
          <div className="mz-wrap">
            <span className="mz-eyebrow" data-reveal>(01) Projetos selecionados</span>
            <h2 className="mz-h2" data-reveal style={{ "--d": "80ms" }}>Edições que prendem <span className="grad-short">a atenção.</span></h2>
            <p className="mz-sub" data-reveal style={{ "--d": "140ms" }}>Uma seleção dos meus trabalhos.</p>

            <div className="mz-cards">
              {VIDEOS.map((v) => (
                <VideoCard
                  key={v.n}
                  n={v.n}
                  g={v.g}
                  src={v.src}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mz-sec" id="servicos">
          <div className="mz-wrap">
            <span className="mz-eyebrow" data-reveal>(02) O que eu faço</span>
            <h2 className="mz-h2" data-reveal style={{ "--d": "80ms" }}>alguns outros serviços <span className="grad-short">que faço.</span></h2>
            <p className="mz-sub" data-reveal style={{ "--d": "140ms" }}>Recursos e técnicas que ajudam a construir vídeos mais profissionais.</p>
            <Servicos />
          </div>
        </section>
      </main>

      <section className="mz-contato" id="contato">
        <Particulas densidade={10000} />
        <span className="mz-eyebrow" data-reveal>(03) Vamos conversar?</span>
        <h2 className="mz-h2" data-reveal style={{ "--d": "80ms" }}>O próximo projeto <span className="grad-short">pode ser o seu.</span></h2>
        <p className="mz-sub" data-reveal style={{ "--d": "140ms" }}>Me conte sua ideia e vamos criar algo incrível juntos.</p>
        <div className="mz-cta" data-reveal style={{ "--d": "220ms" }}>
          <a className="mz-btn mz-btn-dark" href={WHATSAPP_URL}><Bolinha />Começar uma conversa <Seta /></a>
          <a className="mz-btn mz-btn-line" href={INSTAGRAM_URL}><Anel />Instagram</a>
        </div>
      </section>

      <footer className="mz-foot">
        <div className="mz-wrap mz-foot-in">
          <a href="#top" className="mz-brand" aria-label="Voltar ao topo"><b className="grad-short">M</b><span className="t">Menezes</span></a>
          <span className="mz-copy">© {new Date().getFullYear()} MENEZES.</span>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Menezes));
