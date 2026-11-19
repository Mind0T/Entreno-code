/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Service Mesh, Istio y Arquitecturas Zero Trust
   La red como infraestructura, no como código de negocio
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG 1 — Sidecar: proxy junto a cada servicio */
  var SVG_SIDECAR =
    '<svg viewBox="0 0 580 160" role="img" aria-label="Patrón sidecar y planos de datos y control">' +
    '<g font-size="10.5" text-anchor="middle">' +
    // control plane
    '<rect x="200" y="12" width="180" height="34" rx="9" fill="none" stroke="var(--ambar)" stroke-width="2"/><text x="290" y="27" fill="var(--ambar)" font-size="11">Plano de Control · Istiod</text><text x="290" y="40" font-size="9" fill="currentColor" opacity=".6">configura · reparte certificados</text>' +
    // pods
    '<g>' +
    '<rect x="30" y="86" width="130" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".5"/><rect x="40" y="98" width="50" height="30" rx="6" fill="none" stroke="var(--azul)" stroke-width="1.6"/><text x="65" y="117" fill="var(--azul)">App A</text><rect x="98" y="98" width="52" height="30" rx="6" fill="none" stroke="var(--verde)" stroke-width="1.6"/><text x="124" y="113" fill="var(--verde)" font-size="9">Envoy</text><text x="124" y="124" fill="var(--verde)" font-size="8">(proxy)</text>' +
    '<rect x="420" y="86" width="130" height="54" rx="10" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".5"/><rect x="430" y="98" width="50" height="30" rx="6" fill="none" stroke="var(--azul)" stroke-width="1.6"/><text x="455" y="117" fill="var(--azul)">App B</text><rect x="488" y="98" width="52" height="30" rx="6" fill="none" stroke="var(--verde)" stroke-width="1.6"/><text x="514" y="113" fill="var(--verde)" font-size="9">Envoy</text><text x="514" y="124" fill="var(--verde)" font-size="8">(proxy)</text>' +
    '</g>' +
    // mtls line
    '<path d="M150 113h270" stroke="var(--verde)" stroke-width="1.8" stroke-dasharray="6 4" opacity=".75"/><text x="285" y="107" fill="var(--verde)" font-size="9.5">mTLS cifrado (plano de datos)</text>' +
    // control arrows
    '<path d="M250 46q-130 20-128 40" stroke="var(--ambar)" fill="none" opacity=".4" stroke-dasharray="3 3"/><path d="M330 46q130 20 128 40" stroke="var(--ambar)" fill="none" opacity=".4" stroke-dasharray="3 3"/>' +
    '</g></svg>';

  /* SVG 2 — Circuit breaker: tres estados */
  var SVG_CB =
    '<svg viewBox="0 0 520 130" role="img" aria-label="Estados del circuit breaker: cerrado, abierto, semiabierto">' +
    '<defs><marker id="cbA" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="currentColor" opacity=".6"/></marker></defs>' +
    '<g text-anchor="middle" font-size="11">' +
    '<circle cx="80" cy="60" r="38" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="80" y="57" fill="var(--verde)">CERRADO</text><text x="80" y="73" font-size="9" fill="currentColor" opacity=".6">todo pasa</text>' +
    '<circle cx="260" cy="60" r="38" fill="none" stroke="var(--rojo)" stroke-width="2"/><text x="260" y="57" fill="var(--rojo)">ABIERTO</text><text x="260" y="73" font-size="9" fill="currentColor" opacity=".6">corta el paso</text>' +
    '<circle class="cog-pulse" cx="440" cy="60" r="38" fill="none" stroke="var(--ambar)" stroke-width="2"/><text x="440" y="54" fill="var(--ambar)">SEMI-</text><text x="440" y="68" fill="var(--ambar)">ABIERTO</text><text x="440" y="82" font-size="9" fill="currentColor" opacity=".6">prueba</text>' +
    '<path d="M118 60h104" stroke="currentColor" opacity=".55" marker-end="url(#cbA)"/><text x="170" y="44" font-size="9" fill="currentColor" opacity=".6">muchos fallos →</text>' +
    '<path d="M402 60h-104" stroke="currentColor" opacity=".55" marker-end="url(#cbA)"/><text x="350" y="44" font-size="9" fill="currentColor" opacity=".6">tras una pausa</text>' +
    '<path d="M440 98q-180 40-360 0" stroke="var(--verde)" fill="none" opacity=".5" stroke-dasharray="4 3" marker-end="url(#cbA)"/><text x="260" y="122" font-size="9" fill="var(--verde)">si se recupera → vuelve a cerrado</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Service Mesh, Istio y Zero Trust</h2>' +
      '<p>Cuando una aplicación pasa de ser un <b>monolito</b> a decenas de <b>microservicios</b>, aparece un problema invisible: cada servicio tiene que hablar con los demás por una red poco confiable, cifrar el tráfico, reintentar, medir… y ese código de <b>red</b> acaba duplicado en cada lenguaje. La <b>malla de servicios</b> (Service Mesh) saca toda esa lógica <b>fuera</b> del código de negocio y la vuelve infraestructura. Es, literalmente, el sistema nervioso de la nube moderna.</p>');

    cog.epigrafe(cont, "“Nunca confíes, siempre verifica.”", "Principio Zero Trust");

    cog.prosa(cont, '<h3>1 · El problema y la solución: el patrón Sidecar</h3>' +
      '<p>La idea central del Service Mesh es el <b>sidecar</b>: junto a cada microservicio se inyecta un <b>proxy ligero</b> que intercepta <b>todo</b> el tráfico de entrada y salida. Tu código solo habla con su proxy local; el proxy se encarga de la red, la seguridad y las métricas.</p>');
    cog.figura(cont, { color: VE, titulo: "Dos planos: datos y control",
      svg: SVG_SIDECAR,
      pie: "El <b>Plano de Datos</b> son los proxies <b>Envoy</b> (uno por servicio): ejecutan las reglas, cifran y miden. El <b>Plano de Control</b> es <b>Istiod</b>: configura y reparte certificados a los proxies, pero <b>no toca el tráfico</b>. Analogía biológica: Istiod es el sistema nervioso central; los Envoy, los músculos." });
    cog.nota(cont, 'Sobre esta base, el tráfico entre servicios (<b>este-oeste</b>) se cifra con <b>mTLS</b> de extremo a extremo e Istiod actúa como Autoridad Certificadora, rotando certificados solo. Y la <b>gestión de tráfico</b> permite <b>despliegues canarios</b>: enrutar, por ejemplo, el 90% a la versión estable y el 10% a la nueva, para validarla en producción sin riesgo.', VE);

    cog.prosa(cont, '<h3>2 · Zero Trust: no confíes ni en los de casa</h3>' +
      '<p>El modelo viejo confiaba en todo lo que estuviera <b>dentro</b> del clúster. Error: si un atacante entra, se mueve lateralmente sin resistencia. <b>Zero Trust</b> invierte la lógica — cada petición se verifica, venga de donde venga.</p>');
    cog.grid(cont, [
      { color: VE, etiqueta: "Identidad", titulo: "mTLS mutuo",
        cuerpo: 'No solo el cliente verifica al servidor (como el HTTPS normal): <b>ambos</b> se verifican. Ningún pod habla con otro sin probar quién es.' },
      { color: AZ, etiqueta: "Autorización", titulo: "JWT en el proxy",
        cuerpo: 'El proxy Envoy <b>valida el token JWT</b> antes de que la petición llegue a tu aplicación. La seguridad vive en el borde, no en tu código.' },
      { color: RO, etiqueta: "Contención", titulo: "Circuit Breakers",
        cuerpo: 'Si un servicio dependiente falla una y otra vez, el <b>cortocircuito</b> “abre” y deja de llamarlo, evitando que un fallo local se vuelva un <b>fallo en cascada</b>.' }
    ]);
    cog.figura(cont, { color: RO, titulo: "El reflejo protector: estados del Circuit Breaker",
      svg: SVG_CB,
      pie: "<b>Cerrado</b>: todo fluye normal. Tras muchos fallos seguidos pasa a <b>Abierto</b>: corta el paso para dejar que el servicio enfermo se recupere. Tras una pausa pasa a <b>Semiabierto</b>: deja pasar una prueba; si responde bien, vuelve a cerrado. Es un <b>reflejo</b>, como retirar la mano del fuego: protege al sistema entero." });

    cog.prosa(cont, '<h3>3 · La evolución: Istio Ambient Mode (sin sidecars)</h3>' +
      '<p>El modelo de sidecars tiene un costo: un proxy por pod consume <b>CPU y RAM</b>, y actualizar los proxies obliga a reiniciar pods. La respuesta es <b>Ambient Mode</b>: separar el trabajo en dos capas compartidas.</p>');
    cog.tabla(cont, {
      criterio: "Criterio",
      cols: [{ nombre: "Sidecar (clásico)", color: AZ }, { nombre: "Ambient Mode", color: VE }],
      filas: [
        { k: "Proxies", v: ["Uno por cada pod", "Compartidos por nodo / por servicio"] },
        { k: "Seguridad (L4)", v: ["En el sidecar", "<b>ztunnel</b> (por nodo): mTLS y ruteo básico"] },
        { k: "Lógica app (L7)", v: ["En el sidecar", "<b>Waypoint</b> (dedicado): HTTP, JWT, circuit breakers"] },
        { k: "Costo", v: ["Alto (CPU/RAM por pod)", "Menor: pagas L7 solo donde lo usas"] }
      ]
    });
    cog.nota(cont, 'La clave es <b>desacoplar capas</b>: el <b>ztunnel</b> se ocupa de la seguridad de transporte (Capa 4) para <b>todos</b> los servicios, barato; el <b>Waypoint</b> solo se despliega donde de verdad hace falta la lógica avanzada de aplicación (Capa 7). Pagas lo complejo solo donde lo usas — un principio de <b>diseño minimalista</b> (Esfera 3): eficiencia por sustracción.', AZ);

    cog.acordeon(cont, [
      { q: "¿Cuándo NO usar un Service Mesh?", a: 'No es gratis: añade <b>complejidad operativa</b>, consume cómputo y tiene curva de aprendizaje. Para <b>pocos servicios</b>, un <b>API Gateway</b> o un balanceador tradicional basta y sobra. Implementar Istio “porque está de moda” (<i>hype</i>) en un proyecto pequeño es cambiar un problema que no tienes por una sobrecarga que sí tendrás. Regla: adopta la malla cuando el dolor de gestionar la red a mano supere al dolor de operarla.' },
      { q: "mTLS en Istio vs. HTTPS tradicional", a: 'El HTTPS perimetral protege el tráfico <b>norte-sur</b> (del usuario al clúster) y solo el cliente verifica al servidor. El <b>mTLS</b> de Istio protege el tráfico <b>este-oeste</b> (entre servicios internos), con verificación <b>mutua</b> de identidad y rotación automática de certificados. Resuelve amenazas que el HTTPS de borde ignora: la suplantación entre pods y el movimiento lateral de un atacante ya dentro.' },
      { q: "Canary release en Istio (conceptual)", a: 'Con dos objetos: un <code>DestinationRule</code> define los “subsets” (v1 estable, v2 nueva) y un <code>VirtualService</code> reparte el peso: 90% a v1, 10% a v2. Si las métricas de v2 son buenas, subes el porcentaje poco a poco hasta 100%; si no, lo bajas a 0% sin que el usuario note nada. Despliegue progresivo y reversible.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Elige la opción correcta y revisa el porqué.",
      reactivos: [
        { p: 'En Istio, los proxies Envoy que cifran y miden el tráfico forman el…',
          opciones: [{ t: "Plano de Datos", ok: true }, { t: "Plano de Control (Istiod)" }, { t: "balanceador" }],
          porque: "El <b>Plano de Datos</b> son los Envoy que ejecutan reglas, cifran y recolectan métricas; Istiod (plano de control) los configura sin tocar el tráfico." },
        { p: 'Un servicio dependiente falla repetidamente y el sistema deja de llamarlo para evitar un fallo en cascada. Eso es un…',
          opciones: [{ t: "Circuit Breaker", ok: true }, { t: "Canary release" }, { t: "JWT" }],
          porque: "El <b>Circuit Breaker</b> “abre el circuito” ante fallos consecutivos, conteniendo el daño como un reflejo protector." },
        { p: '¿Cuándo es mala idea adoptar un Service Mesh?',
          opciones: [{ t: "En proyectos pequeños, por moda, donde un API Gateway basta", ok: true }, { t: "En sistemas de miles de microservicios" }, { t: "Cuando necesitas mTLS este-oeste" }],
          porque: "Para pocos servicios, la complejidad operativa de la malla no se justifica: un balanceador o API Gateway es más simple." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
    cog.refs(cont, REFS);
  }

  var REFS = [
    { t: "¿Qué es una malla de servicios (service mesh)?", fuente: "Red Hat (español)", url: "https://www.redhat.com/es/topics/microservices/what-is-a-service-mesh", lang: "es" },
    { t: "¿Qué es Istio?", fuente: "Red Hat (español)", url: "https://www.redhat.com/es/topics/microservices/what-is-istio", lang: "es" },
    { t: "Ambient Mesh — Overview", fuente: "Istio (documentación oficial)", url: "https://istio.io/latest/docs/ambient/overview/", lang: "en" },
    { t: "What is Istio?", fuente: "Istio (documentación oficial)", url: "https://istio.io/latest/docs/overview/what-is-istio/", lang: "en" },
    { t: "Circuit breaker design pattern", fuente: "Wikipedia", url: "https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern", lang: "en" }
  ];

  var QUIZ = [
    { p: "¿Qué problema resuelve un Service Mesh?", op: ["Entrenar modelos de IA", "Sacar la lógica de red, seguridad y observabilidad fuera del código de la app", "Diseñar bases de datos", "Comprimir imágenes"], ok: 1, porque: "Al escalar a microservicios, el código de red se duplica; la malla lo extrae a una capa de infraestructura (proxies sidecar)." },
    { p: "En Istio, ¿qué hace el Plano de Control (Istiod)?", op: ["Cifra y enruta el tráfico directamente", "Configura los proxies y reparte certificados sin tocar el tráfico", "Reemplaza a los microservicios", "Es el balanceador de carga"], ok: 1, porque: "Istiod administra, configura y distribuye reglas y certificados a los proxies Envoy, pero no manipula el tráfico (eso lo hace el plano de datos)." },
    { p: "El principio Zero Trust implica que…", op: ["Todo el tráfico interno es confiable", "Cada petición se verifica, venga de donde venga", "Solo se verifica el tráfico externo", "No hace falta cifrar"], ok: 1, porque: "“Nunca confíes, siempre verifica”: ni el tráfico interno del clúster se asume seguro, evitando el movimiento lateral." },
    { p: "Los tres estados de un Circuit Breaker son…", op: ["Inicio, proceso, fin", "Cerrado, Abierto, Semiabierto", "Rápido, lento, detenido", "Norte, sur, este"], ok: 1, porque: "Cerrado (todo pasa) → Abierto (corta tras muchos fallos) → Semiabierto (prueba) y, si se recupera, vuelve a Cerrado." },
    { p: "La ventaja de Istio Ambient Mode frente a los sidecars es…", op: ["Más proxies por pod", "Desacoplar L4 (ztunnel) y L7 (waypoint) para gastar menos recursos", "Eliminar el cifrado", "Obligar a reiniciar pods"], ok: 1, porque: "Separa la seguridad de transporte (ztunnel, L4, barato y universal) de la lógica de aplicación (waypoint, L7, solo donde hace falta)." }
  ];

  E.registrar({
    id: "fund-computo-service-mesh",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 15,
    titulo: "Service Mesh, Istio y Zero Trust",
    sub: "El sistema nervioso de la nube moderna",
    resumen: "Cómo la malla de servicios saca la red del código de negocio: patrón sidecar, Envoy/Istiod, mTLS y JWT (Zero Trust), Circuit Breakers, despliegues canarios, la evolución a Ambient Mode (ztunnel L4 + Waypoint L7) y cuándo NO usarla.",
    chips: [{ k: "Bloque", v: "Nube y sistemas" }, { k: "Tipo", v: "Arquitectura e infraestructura" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-service-mesh", QUIZ)
    }
  });
})();
