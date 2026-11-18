/* ============================================================
   Fundamentos · Ciencias de la Computación e IA
   Desarrollo Asistido por IA (Kiro) y Fundamentos de AWS
   Agentes en el IDE · Nube · Seguridad y gobernanza
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, cog = E.cog, ui = E.ui;
  var AZ = "var(--azul)", MO = "var(--morado)", VE = "var(--verde)", AM = "var(--ambar)", RO = "var(--rojo)";

  /* SVG — Responsabilidad compartida: la línea que divide la nube */
  var SVG_RESP =
    '<svg viewBox="0 0 560 170" role="img" aria-label="Modelo de responsabilidad compartida de AWS">' +
    '<g font-size="11.5">' +
    '<rect x="20" y="24" width="250" height="122" rx="12" fill="none" stroke="var(--verde)" stroke-width="2"/><text x="145" y="46" text-anchor="middle" fill="var(--verde)" font-weight="600">CLIENTE</text><text x="145" y="62" text-anchor="middle" font-size="10" fill="currentColor" opacity=".7">seguridad EN la nube</text>' +
    '<text x="145" y="88" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".8">· Gestión de accesos (IAM)</text>' +
    '<text x="145" y="106" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".8">· Cifrado de tus datos</text>' +
    '<text x="145" y="124" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".8">· Configuración segura</text>' +
    '<rect x="290" y="24" width="250" height="122" rx="12" fill="none" stroke="var(--azul)" stroke-width="2"/><text x="415" y="46" text-anchor="middle" fill="var(--azul)" font-weight="600">AWS</text><text x="415" y="62" text-anchor="middle" font-size="10" fill="currentColor" opacity=".7">seguridad DE la nube</text>' +
    '<text x="415" y="88" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".8">· Hardware y servidores</text>' +
    '<text x="415" y="106" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".8">· Centros de datos</text>' +
    '<text x="415" y="124" text-anchor="middle" font-size="10.5" fill="currentColor" opacity=".8">· Energía y red física</text>' +
    '<text x="280" y="162" text-anchor="middle" font-size="10" fill="currentColor" opacity=".55">la línea se mueve según el servicio (IaaS ← → PaaS)</text>' +
    '</g></svg>';

  function leccion(cont) {
    cog.prosa(cont,
      '<h2>Desarrollo Asistido por IA (Kiro) y AWS</h2>' +
      '<p>El trabajo de desarrollo cambió: ya no solo escribes código, <b>diriges a un agente</b> que lo escribe contigo, y lo despliegas en una <b>nube</b> que no administras. Este módulo une tres capas que hoy van juntas: cómo se gobierna a un agente de IA en el IDE (con <b>Kiro</b> como ejemplo), qué es realmente la nube (<b>AWS</b>) y cómo se asegura todo sin dejar una llave tirada en el código.</p>');

    cog.epigrafe(cont, "“La ambigüedad es el enemigo. Un requerimiento que no se puede verificar, no se puede cumplir.”", "Principio del Spec-Driven Development");

    cog.prosa(cont, '<h3>1 · El ecosistema del agente (Kiro)</h3>' +
      '<p>Un agente de IA en el IDE no es solo autocompletado: es un conjunto de piezas que le dan <b>memoria</b>, <b>reflejos</b> y <b>método</b>.</p>');
    cog.tabla(cont, {
      criterio: "Pieza",
      cols: [{ nombre: "Qué es", color: AZ }, { nombre: "Cuándo actúa", color: VE }],
      filas: [
        { k: "Skills", v: ["Capacidades invocables", "<b>Bajo demanda</b> (tú o el modelo las llaman)"] },
        { k: "Hooks", v: ["Acciones automáticas", "Ante un <b>evento</b> (ej. al guardar un .py → corre linters)"] },
        { k: "Steering", v: ["Contexto persistente (stack, convenciones)", "Siempre: memoria entre sesiones"] },
        { k: "MCP", v: ["Puente a servicios externos", "Al necesitar datos/APIs/docs frescas"] },
        { k: "Powers", v: ["Paquete que combina las anteriores", "Compartible entre proyectos/equipos"] }
      ]
    });
    cog.nota(cont, 'Diferencia clave: una <b>Skill</b> se activa cuando alguien la invoca (bajo demanda); un <b>Hook</b> se dispara solo ante un evento del sistema. Y un <b>Power</b> empaqueta skills + hooks + steering + MCPs en una personalización reutilizable. El <b>Steering</b> es la cognición extendida del agente: una memoria externa que le recuerda tu stack y tus convenciones entre sesiones.', AZ);

    cog.prosa(cont, '<h3>2 · Spec-Driven Development: de la idea verificable</h3>' +
      '<p>La trampa más cara al usar un agente es pedir cosas <b>ambiguas</b>. “La app debe funcionar bien y responder rápido” no es un requerimiento: es un deseo. El <i>Spec-Driven Development</i> convierte ideas en lenguaje natural en <b>criterios objetivos y verificables</b> — y de paso reduce el consumo de créditos/tokens, porque evita iteraciones erráticas.</p>');
    cog.grid(cont, [
      { color: RO, etiqueta: "Antes (ambiguo)", titulo: "No verificable",
        cuerpo: '<i>“La aplicación debe funcionar bien y responder rápidamente.”</i><br><span class="cog-mini">¿Qué es “bien”? ¿“rápido” para quién? Imposible de probar.</span>' },
      { color: VE, etiqueta: "Después (verificable)", titulo: "Criterio medible",
        cuerpo: '<i>“El 95% de las peticiones (latencia p95) responden en &lt; 300 ms y devuelven HTTP 200.”</i><br><span class="cog-mini">Una métrica, un umbral, un formato. Se puede probar automáticamente (Gherkin/SMART).</span>' }
    ]);

    cog.prosa(cont, '<h3>3 · Fundamentos de la nube (AWS)</h3>' +
      '<p>La <b>nube</b> es alquilar cómputo bajo demanda: pagas por uso y escalas de forma elástica. ¿Cuánto administras tú? Depende del modelo de servicio.</p>');
    cog.tabla(cont, {
      criterio: "Modelo",
      cols: [{ nombre: "IaaS", color: AZ }, { nombre: "PaaS", color: VE }],
      filas: [
        { k: "Qué alquilas", v: ["Máquinas virtuales (recursos base)", "Una plataforma lista"] },
        { k: "Tú gestionas", v: ["SO, instalación, mantenimiento", "Solo tu código y la app"] },
        { k: "Analogía", v: ["Rentar el terreno y construir", "Rentar depto amueblado"] }
      ]
    });
    cog.grid(cont, [
      { color: AZ, etiqueta: "Cómputo", titulo: "EC2 · Lambda",
        cuerpo: '<b>EC2</b>: máquinas virtuales. <b>Lambda</b>: funciones <i>serverless</i> que corren sin administrar servidor.' },
      { color: VE, etiqueta: "Datos", titulo: "S3 · DynamoDB",
        cuerpo: '<b>S3</b>: almacenamiento de objetos (cualquier cantidad de datos). <b>DynamoDB</b>: base NoSQL rápida y predecible.' },
      { color: AM, etiqueta: "Observabilidad", titulo: "CloudWatch · CLI",
        cuerpo: '<b>CloudWatch</b>: monitoreo, invocaciones y errores. La <b>AWS CLI</b> opera por comandos (ej. <code>aws sts get-caller-identity</code> confirma quién eres).' }
    ]);

    cog.prosa(cont, '<h3>4 · Seguridad y gobernanza</h3>' +
      '<p>La nube es segura por diseño… hasta que el cliente deja una puerta abierta. Aquí está dónde empieza <i>tu</i> responsabilidad.</p>');
    cog.figura(cont, { color: VE, titulo: "La línea que divide la seguridad",
      svg: SVG_RESP,
      pie: "AWS asegura la infraestructura <b>de</b> la nube (hardware, data centers, energía); tú aseguras lo que pones <b>en</b> la nube (accesos IAM, cifrado, configuración). La línea se desplaza según el servicio: en IaaS cargas más tú; en PaaS, más AWS." });
    cog.nota(cont, '<b>Mínimos privilegios</b> en acción: si una función Lambda solo debe <b>leer</b> de un bucket, su rol debe permitir únicamente <code>s3:GetObject</code> sobre <b>ese</b> bucket — nada más. Una política IAM comentada:<br><code>{ "Effect": "Allow", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::mi-bucket/*" }</code><br>El <b>ARN</b> es la dirección única del recurso. Un <i>Execution Role</i> (rol temporal) es muy superior a <b>Access Keys estáticas</b>: no hay credenciales permanentes que robar del código.', VE);
    cog.acordeon(cont, [
      { q: "Higiene de datos: .env vs. Secrets vs. .kiroignore", a: 'Tres cajas distintas: en un <code>.env</code> va la <b>configuración no sensible</b> (puerto, nombre de la región). En <b>AWS Secrets Manager</b> van las <b>credenciales cifradas</b> (contraseñas, tokens, llaves de API). Y en <code>.kiroignore</code> van los <b>patrones de archivos que el agente de IA nunca debe leer</b> (<code>.env</code>, <code>*.pem</code>, <code>secrets/</code>, <code>.aws/credentials</code>). Juntos materializan tu parte del modelo de responsabilidad compartida.' },
      { q: "¿Cómo funciona el protocolo MCP?", a: 'MCP (<i>Model Context Protocol</i>) es <b>cliente-servidor</b>: el agente (cliente) pide, un servidor MCP expone herramientas y datos (una API, una base, la documentación oficial de AWS). Resuelve el problema del <b>contexto desactualizado</b>: en vez de que el LLM “recuerde” docs viejas de su entrenamiento, consulta en vivo la fuente fresca a través del servidor MCP.' }
    ], "Profundiza");

    cog.distingue(cont, {
      titulo: "Distingue", intro: "Elige la opción correcta y revisa el porqué.",
      reactivos: [
        { p: 'Quieres que al guardar un archivo .py se corran los tests automáticamente. Eso es un…',
          opciones: [{ t: "Hook (se dispara por un evento)", ok: true }, { t: "Skill (bajo demanda)" }, { t: "un Secret" }],
          porque: "Un <b>Hook</b> reacciona automáticamente a un evento del sistema (como “archivo guardado”); una Skill se invoca manualmente." },
        { p: 'En el modelo de responsabilidad compartida, cifrar <i>tus</i> datos y gestionar accesos IAM es responsabilidad de…',
          opciones: [{ t: "el cliente (seguridad EN la nube)", ok: true }, { t: "AWS (seguridad DE la nube)" }, { t: "nadie, es automático" }],
          porque: "El cliente es responsable de la seguridad <b>en</b> la nube (datos, accesos, configuración); AWS, de la seguridad <b>de</b> la nube." },
        { p: 'Una Lambda que solo lee de un bucket debe tener un rol que permita…',
          opciones: [{ t: "solo s3:GetObject sobre ese bucket (mínimos privilegios)", ok: true }, { t: "permisos de administrador" }, { t: "acceso a todos los buckets" }],
          porque: "El <b>principio de mínimos privilegios</b>: exactamente los permisos necesarios y ni uno más, acotados al recurso concreto." }
      ]
    });
    cog.nota(cont, 'Cuando termines, pon a prueba lo aprendido en la pestaña <b>Quiz</b>.', VE);
  }

  var QUIZ = [
    { p: "La diferencia entre una Skill y un Hook es que…", op: ["Son lo mismo", "La Skill se invoca bajo demanda; el Hook se dispara automáticamente por un evento", "El Hook es más lento", "La Skill solo funciona en la nube"], ok: 1, porque: "Las <b>Skills</b> se activan por invocación explícita; los <b>Hooks</b> se ejecutan solos ante un evento (ej. guardar un archivo)." },
    { p: "El objetivo del Spec-Driven Development es…", op: ["Escribir más código", "Convertir requerimientos ambiguos en criterios verificables", "Eliminar las pruebas", "Evitar la nube"], ok: 1, porque: "Transforma ideas vagas en criterios objetivos y medibles, lo que mejora la arquitectura y reduce iteraciones (y consumo de tokens)." },
    { p: "En IaaS, ¿quién gestiona el sistema operativo y el mantenimiento?", op: ["AWS", "El cliente/usuario", "Nadie", "El agente de IA"], ok: 1, porque: "En <b>IaaS</b> alquilas recursos base (VMs) y tú gestionas SO, instalación y mantenimiento; en PaaS de eso se encarga el proveedor." },
    { p: "El principio de mínimos privilegios recomienda…", op: ["Dar permisos de administrador por comodidad", "Otorgar solo los permisos estrictamente necesarios para la tarea", "Compartir las Access Keys", "Desactivar IAM"], ok: 1, porque: "Mínimos privilegios: exactamente los permisos requeridos y acotados al recurso (ej. solo <code>s3:GetObject</code> sobre un bucket)." },
    { p: "El protocolo MCP resuelve principalmente…", op: ["La velocidad de la red", "El problema del contexto desactualizado, conectando al agente con fuentes frescas", "El cifrado de discos", "La facturación de la nube"], ok: 1, porque: "MCP (cliente-servidor) deja que el agente consulte en vivo APIs, datos y documentación actual, en lugar de depender de su entrenamiento viejo." }
  ];

  E.registrar({
    id: "fund-computo-kiro-aws",
    grupo: "fund-computo",
    lenguaje: "fund",
    orden: 14,
    titulo: "Desarrollo Asistido por IA y AWS",
    sub: "Agentes en el IDE (Kiro), nube y seguridad",
    resumen: "Cómo se gobierna un agente de IA en el desarrollo (Skills, Hooks, Steering, Specs, MCP), los fundamentos de AWS (IaaS/PaaS, EC2, S3, Lambda) y la seguridad: responsabilidad compartida, mínimos privilegios/IAM y gestión de secretos.",
    chips: [{ k: "Bloque", v: "Ingeniería y nube" }, { k: "Tipo", v: "Conceptos y práctica" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("fund-computo-kiro-aws", QUIZ)
    }
  });
})();
