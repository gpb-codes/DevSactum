<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DevSactum — La plataforma de los desarrolladores</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #080c10;
      --surface: #0d1117;
      --border: #1e2a38;
      --accent: #a855f7;
      --accent-dim: #a855f722;
      --accent2: #c084fc;
      --text: #c9d5e0;
      --text-muted: #5a6a7a;
      --text-bright: #eaf2fa;
      --mono: 'Fira Code', monospace;
      --sans: 'DM Serif Display', serif;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--mono);
      font-size: 15px;
      line-height: 1.7;
      overflow-x: hidden;
    }

    /* ── NOISE OVERLAY ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: .5;
    }

    /* ── GRID BACKGROUND ── */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 48px 48px;
      opacity: .18;
      pointer-events: none;
      z-index: 0;
    }

    .wrap {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 32px;
    }

    /* ── NAV ── */
    nav {
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid var(--border);
      background: #080c10cc;
      backdrop-filter: blur(16px);
    }
    nav .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 18px;
      padding-bottom: 18px;
    }
    .logo {
      font-family: var(--sans);
      font-weight: 800;
      font-size: 1.15rem;
      color: var(--text-bright);
      letter-spacing: -.02em;
    }
    .logo span { color: var(--accent); }
    nav a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: .8rem;
      letter-spacing: .08em;
      text-transform: uppercase;
      transition: color .2s;
    }
    nav a:hover { color: var(--accent); }
    nav .links { display: flex; gap: 28px; }

    /* ── HERO ── */
    .hero {
      padding: 120px 0 80px;
      position: relative;
    }
    .hero-tag {
      display: inline-block;
      font-size: .72rem;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 4px 12px;
      margin-bottom: 32px;
      animation: fadeUp .6s ease both;
    }
    .hero h1 {
      font-family: var(--sans);
      font-size: clamp(2.4rem, 6vw, 4.2rem);
      font-weight: 800;
      color: var(--text-bright);
      line-height: 1.08;
      letter-spacing: -.03em;
      margin-bottom: 28px;
      animation: fadeUp .6s .1s ease both;
    }
    .hero h1 em {
      font-style: normal;
      color: var(--accent);
    }
    .hero p {
      max-width: 560px;
      color: var(--text);
      font-size: .95rem;
      margin-bottom: 44px;
      animation: fadeUp .6s .2s ease both;
    }
    .hero-cta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      animation: fadeUp .6s .3s ease both;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      font-family: var(--mono);
      font-size: .82rem;
      font-weight: 600;
      letter-spacing: .06em;
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
      transition: all .2s;
    }
    .btn-primary {
      background: var(--accent);
      color: #050a07;
      border: 1px solid var(--accent);
    }
    .btn-primary:hover {
      background: transparent;
      color: var(--accent);
      box-shadow: 0 0 24px var(--accent-dim);
    }
    .btn-ghost {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    /* Glow orb */
    .hero-orb {
      position: absolute;
      top: 60px;
      right: -120px;
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, #a855f712 0%, transparent 70%);
      pointer-events: none;
      animation: pulse 6s ease-in-out infinite;
    }

    /* ── DIVIDER ── */
    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 72px 0;
    }

    /* ── SECTION ── */
    section { padding: 72px 0; }
    .section-label {
      font-size: .7rem;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 16px;
    }
    h2 {
      font-family: var(--sans);
      font-size: clamp(1.6rem, 3.5vw, 2.4rem);
      font-weight: 800;
      color: var(--text-bright);
      letter-spacing: -.02em;
      margin-bottom: 20px;
    }
    h3 {
      font-family: var(--sans);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-bright);
      margin-bottom: 10px;
    }

    /* ── PROBLEM BLOCK ── */
    .problem-grid {
      display: grid;
      gap: 2px;
      margin-top: 40px;
    }
    .problem-row {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 0;
      border: 1px solid var(--border);
      margin-bottom: -1px;
      overflow: hidden;
      transition: border-color .2s;
    }
    .problem-row:hover { border-color: var(--accent); z-index: 1; position: relative; }
    .problem-platform {
      padding: 14px 18px;
      background: var(--surface);
      color: var(--accent);
      font-size: .82rem;
      font-weight: 600;
      border-right: 1px solid var(--border);
      display: flex;
      align-items: center;
    }
    .problem-desc {
      padding: 14px 20px;
      color: var(--text-muted);
      font-size: .82rem;
      display: flex;
      align-items: center;
    }

    /* ── SOLUTION CARDS ── */
    .solution-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      margin-top: 40px;
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .sol-card {
      padding: 28px 24px;
      background: var(--surface);
      border-right: 1px solid var(--border);
      transition: background .2s;
    }
    .sol-card:last-child { border-right: none; }
    .sol-card:hover { background: #0f1820; }
    .sol-badge {
      display: inline-block;
      font-size: .68rem;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--accent2);
      border: 1px solid var(--accent2);
      padding: 2px 8px;
      margin-bottom: 14px;
    }
    .sol-arrow {
      color: var(--text-muted);
      font-size: .8rem;
      margin-bottom: 10px;
    }
    .sol-card p { font-size: .8rem; color: var(--text-muted); }

    /* ── TABLE ── */
    .styled-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 40px;
      font-size: .82rem;
    }
    .styled-table th {
      text-align: left;
      padding: 12px 16px;
      background: var(--surface);
      color: var(--accent);
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
      font-size: .7rem;
      border-bottom: 1px solid var(--border);
    }
    .styled-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      color: var(--text);
      vertical-align: top;
    }
    .styled-table tr:hover td { background: #0d1420; }
    .styled-table td strong {
      color: var(--text-bright);
      display: block;
      margin-bottom: 2px;
    }

    /* ── FEATURES ── */
    .features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1px;
      margin-top: 40px;
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .feat {
      padding: 32px 28px;
      background: var(--surface);
      border-right: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      transition: background .25s;
    }
    .feat:hover { background: #0e1620; }
    .feat-icon {
      font-size: 1.4rem;
      margin-bottom: 14px;
    }
    .feat p { font-size: .82rem; color: var(--text-muted); }

    /* ── REPUTATION LIST ── */
    .rep-list {
      list-style: none;
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .rep-list li {
      font-size: .82rem;
      color: var(--text-muted);
      padding-left: 18px;
      position: relative;
    }
    .rep-list li::before {
      content: '›';
      position: absolute;
      left: 0;
      color: var(--accent);
    }

    /* ── STATUS TABLE ── */
    .status-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 40px;
      font-size: .82rem;
    }
    .status-table th {
      text-align: left;
      padding: 10px 16px;
      background: var(--surface);
      color: var(--accent);
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
      font-size: .7rem;
      border-bottom: 1px solid var(--border);
    }
    .status-table td {
      padding: 13px 16px;
      border-bottom: 1px solid var(--border);
      color: var(--text);
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      font-size: .68rem;
      letter-spacing: .08em;
      text-transform: uppercase;
      font-weight: 600;
    }
    .badge-dev { background: #a855f718; color: var(--accent); border: 1px solid #a855f744; }
    .badge-design { background: #c084fc18; color: var(--accent2); border: 1px solid #c084fc44; }
    .badge-plan { background: #ffffff0a; color: var(--text-muted); border: 1px solid var(--border); }

    /* ── CONTRIBUTE ── */
    .contribute-links {
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin-top: 32px;
    }
    .contrib-row {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 16px 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      text-decoration: none;
      transition: border-color .2s, background .2s;
    }
    .contrib-row:hover {
      border-color: var(--accent);
      background: #0e1620;
    }
    .contrib-row .arrow { color: var(--accent); font-size: 1rem; margin-left: auto; }
    .contrib-row .cr-title { color: var(--text-bright); font-size: .85rem; font-weight: 600; }
    .contrib-row .cr-sub { color: var(--text-muted); font-size: .75rem; }

    /* ── FOOTER ── */
    footer {
      border-top: 1px solid var(--border);
      padding: 40px 0;
      margin-top: 80px;
    }
    footer .wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    footer p { font-size: .75rem; color: var(--text-muted); }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: .8; transform: scale(1); }
      50%       { opacity: 1; transform: scale(1.06); }
    }

    /* Fade-in on scroll */
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity .6s ease, transform .6s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: none;
    }

    @media (max-width: 640px) {
      .solution-cards { grid-template-columns: 1fr; }
      .features-grid { grid-template-columns: 1fr; }
      nav .links { display: none; }
      .problem-row { grid-template-columns: 110px 1fr; }
    }
  </style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="wrap">
    <span class="logo">Dev<span>Sactum</span></span>
    <div class="links">
      <a href="#problema">Problema</a>
      <a href="#funcionalidades">Funcionalidades</a>
      <a href="#estado">Estado</a>
      <a href="#contribuir">Contribuir</a>
    </div>
  </div>
</nav>

<!-- HERO -->
<div class="wrap">
  <div class="hero">
    <div class="hero-orb"></div>
    <div class="hero-tag">// plataforma para desarrolladores</div>
    <h1>Dejá de buscar<br>tu lugar.<br><em>Empezá a construirlo.</em></h1>
    <p>Dev-Sactum unifica en un solo ecosistema todo lo que un desarrollador necesita para crecer: red profesional, proyectos reales, portafolio verificable y oportunidades laborales filtradas por stack y nivel. Sin fragmentación. Sin ruido.</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="https://devsactum.dev/waitlist">Lista de espera</a>
      <a class="btn btn-ghost" href="https://github.com/devsactum/devsactum">GitHub ↗</a>
    </div>
  </div>
</div>

<hr class="divider" style="margin:0;" />

<!-- PROBLEMA -->
<section id="problema">
  <div class="wrap">
    <p class="section-label reveal">// el problema</p>
    <h2 class="reveal">Cinco plataformas.<br>Un solo desarrollador.</h2>
    <p class="reveal" style="max-width:520px; color:var(--text-muted); font-size:.88rem;">Los desarrolladores hoy viven entre cinco plataformas que no se hablan entre sí. El resultado es un developer que tiene que mantener cinco perfiles, cinco reputaciones y cinco identidades distintas.</p>

    <div class="problem-grid reveal">
      <div class="problem-row">
        <div class="problem-platform">LinkedIn</div>
        <div class="problem-desc">Red profesional, pero sin contexto técnico real.</div>
      </div>
      <div class="problem-row">
        <div class="problem-platform">GitHub</div>
        <div class="problem-desc">Código, pero sin red ni oportunidades.</div>
      </div>
      <div class="problem-row">
        <div class="problem-platform">Slack / Discord</div>
        <div class="problem-desc">Comunidad, pero efímera y sin trazabilidad.</div>
      </div>
      <div class="problem-row">
        <div class="problem-platform">Upwork</div>
        <div class="problem-desc">Clientes, pero sin reputación técnica verificable.</div>
      </div>
      <div class="problem-row">
        <div class="problem-platform">Twitter / X</div>
        <div class="problem-desc">Visibilidad, pero sin valor profesional concreto.</div>
      </div>
    </div>

    <p class="reveal" style="margin-top:32px; font-size:.88rem;"><span style="color:var(--accent); font-weight:600;">Dev-Sactum es ese lugar.</span></p>
  </div>
</section>

<hr class="divider" style="margin:0;" />

<!-- SOLUCIÓN -->
<section>
  <div class="wrap">
    <p class="section-label reveal">// la solución</p>
    <h2 class="reveal">Un ecosistema cerrado<br>y especializado.</h2>
    <p class="reveal" style="max-width:520px; color:var(--text-muted); font-size:.88rem;">Desarrolladores, empresas y clientes conviven en el mismo espacio con reglas diseñadas para el mundo del software.</p>

    <div class="solution-cards reveal">
      <div class="sol-card">
        <div class="sol-badge">Desarrollador</div>
        <div class="sol-arrow">→</div>
        <p>Perfil técnico + reputación + proyectos + empleo</p>
      </div>
      <div class="sol-card">
        <div class="sol-badge">Empresa</div>
        <div class="sol-arrow">→</div>
        <p>Talento verificado + búsqueda por stack + contratación directa</p>
      </div>
      <div class="sol-card">
        <div class="sol-badge">Cliente</div>
        <div class="sol-arrow">→</div>
        <p>Devs con track record real + transparencia + confianza</p>
      </div>
    </div>
  </div>
</section>

<hr class="divider" style="margin:0;" />

<!-- PARA QUIÉN -->
<section>
  <div class="wrap">
    <p class="section-label reveal">// para quién</p>
    <h2 class="reveal">Para cada etapa<br>del camino.</h2>

    <table class="styled-table reveal">
      <thead>
        <tr>
          <th>Perfil</th>
          <th>Qué encuentra en Dev-Sactum</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Trainee / Junior</strong></td>
          <td>Proyectos reales desde el primer día, comunidad de soporte y visibilidad profesional desde cero.</td>
        </tr>
        <tr>
          <td><strong>Semi-Senior</strong></td>
          <td>Desafíos técnicos de mayor complejidad, mentoría activa y construcción de reputación sólida.</td>
        </tr>
        <tr>
          <td><strong>Senior</strong></td>
          <td>Liderazgo de equipos, mentoría a otros devs, acceso a proyectos de alto impacto y referencia técnica.</td>
        </tr>
        <tr>
          <td><strong>Empresa</strong></td>
          <td>Búsqueda de talento verificado por historial real, no por palabras clave en un CV.</td>
        </tr>
        <tr>
          <td><strong>Cliente independiente</strong></td>
          <td>Contratación de desarrolladores con portafolio, reviews y reputación comprobables.</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<hr class="divider" style="margin:0;" />

<!-- FUNCIONALIDADES -->
<section id="funcionalidades">
  <div class="wrap">
    <p class="section-label reveal">// funcionalidades</p>
    <h2 class="reveal">Todo lo que necesitás.<br>En un solo lugar.</h2>

    <div class="features-grid reveal">
      <div class="feat">
        <div class="feat-icon">⬡</div>
        <h3>Perfil técnico profesional</h3>
        <p>No es un CV. Es un registro vivo: stack actualizado, nivel verificado, repositorios integrados y reputación construida por otros devs que trabajaron con vos.</p>
      </div>
      <div class="feat">
        <div class="feat-icon">◈</div>
        <h3>Sistema de reputación</h3>
        <p>No se compra ni se infla. Se construye a través de proyectos, reviews de colaboradores, contribuciones a la comunidad y consistencia a lo largo del tiempo.</p>
        <ul class="rep-list">
          <li>Proyectos completados y entregados</li>
          <li>Reviews de colaboradores directos</li>
          <li>Contribuciones a la comunidad técnica</li>
          <li>Consistencia a lo largo del tiempo</li>
        </ul>
      </div>
      <div class="feat">
        <div class="feat-icon">⟐</div>
        <h3>Proyectos colaborativos</h3>
        <p>El núcleo de la plataforma. Proponé un proyecto o unite a uno existente. Roles definidos, stack declarado y resultado concreto. Cada contribución queda registrada.</p>
      </div>
      <div class="feat">
        <div class="feat-icon">◫</div>
        <h3>Bolsa de empleo especializada</h3>
        <p>Ofertas reales, filtradas por stack, nivel y modalidad. Las empresas necesitan perfil verificado. Los devs no reciben spam de posiciones que no corresponden.</p>
      </div>
      <div class="feat">
        <div class="feat-icon">⊞</div>
        <h3>Portafolio integrado</h3>
        <p>Conectado a GitHub, deployments y demos en producción. Se construye automáticamente mientras trabajás. Sin mantenimiento manual.</p>
      </div>
      <div class="feat">
        <div class="feat-icon">◧</div>
        <h3>Comunidad técnica</h3>
        <p>Canales por tecnología, mensajería directa y foros donde el contenido se rankea por valor técnico, no por engagement. Sin memes, sin ruido.</p>
      </div>
    </div>
  </div>
</section>

<hr class="divider" style="margin:0;" />

<!-- ESTADO -->
<section id="estado">
  <div class="wrap">
    <p class="section-label reveal">// estado del proyecto</p>
    <h2 class="reveal">Construido en público.</h2>

    <table class="status-table reveal">
      <thead>
        <tr>
          <th>Módulo</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Perfil técnico</td>
          <td><span class="badge badge-dev">En desarrollo</span></td>
        </tr>
        <tr>
          <td>Sistema de reputación</td>
          <td><span class="badge badge-design">En diseño</span></td>
        </tr>
        <tr>
          <td>Proyectos colaborativos</td>
          <td><span class="badge badge-design">En diseño</span></td>
        </tr>
        <tr>
          <td>Bolsa de empleo</td>
          <td><span class="badge badge-plan">Planificado</span></td>
        </tr>
        <tr>
          <td>Dashboards</td>
          <td><span class="badge badge-plan">Planificado</span></td>
        </tr>
        <tr>
          <td>App móvil</td>
          <td><span class="badge badge-plan">Planificado</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<hr class="divider" style="margin:0;" />

<!-- CONTRIBUIR -->
<section id="contribuir">
  <div class="wrap">
    <p class="section-label reveal">// contribuir</p>
    <h2 class="reveal">Sumate al proyecto.</h2>

    <div class="contribute-links reveal">
      <a class="contrib-row" href="https://devsactum.dev/waitlist">
        <div>
          <div class="cr-title">Lista de espera</div>
          <div class="cr-sub">Anotate para acceso beta anticipado</div>
        </div>
        <span class="arrow">→</span>
      </a>
      <a class="contrib-row" href="https://github.com/devsactum/devsactum/issues/new?template=feature_request.md">
        <div>
          <div class="cr-title">Proponé una funcionalidad</div>
          <div class="cr-sub">Abrí un issue con el template de feature request</div>
        </div>
        <span class="arrow">→</span>
      </a>
      <a class="contrib-row" href="https://github.com/devsactum/devsactum/issues/new?template=bug_report.md">
        <div>
          <div class="cr-title">Reportá un bug</div>
          <div class="cr-sub">Si encontrás algo roto, contanos</div>
        </div>
        <span class="arrow">→</span>
      </a>
      <a class="contrib-row" href="https://github.com/devsactum/devsactum/blob/main/CONTRIBUTING.md">
        <div>
          <div class="cr-title">Guía de contribución</div>
          <div class="cr-sub">Leé antes de abrir un PR</div>
        </div>
        <span class="arrow">→</span>
      </a>
      <a class="contrib-row" href="mailto:hola@devsactum.dev">
        <div>
          <div class="cr-title">Contacto directo</div>
          <div class="cr-sub">hola@devsactum.dev</div>
        </div>
        <span class="arrow">→</span>
      </a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="wrap">
    <p>MIT © 2025 Dev-Sactum — <em>Construido por developers, para developers.</em></p>
    <p><a href="https://github.com/devsactum/devsactum/blob/main/LICENSE">Licencia</a> · <a href="https://github.com/devsactum/devsactum/wiki">Wiki técnica</a></p>
  </div>
</footer>

<script>
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
</script>

</body>
</html>