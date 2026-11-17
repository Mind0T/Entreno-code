/* ============================================================
   Python · Fundamentos — Tema 5: Clases y objetos
   Lección viva: class, __init__, self, métodos y herencia.
   ============================================================ */
(function () {
  "use strict";
  var E = window.EST, h = E.h, ui = E.ui;

  function prosa(cont, html) { cont.append(h("div", { class: "prosa", html: html })); }
  function callout(cont, html, color) {
    cont.append(h("div", { class: "lz-callout", style: color ? { "--c": color } : null,
      html: '<span class="ic"><svg viewBox="0 0 24 24"><path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg></span><p>' + html + '</p>' }));
  }
  function tryHint(cont) { cont.append(h("p", { class: "lz-try" }, "▶ Pruébalo: edita y ejecuta")); }
  function celda(cont, code) { ui.PyCell(cont, { code: code }); }

  function leccion(cont) {
    prosa(cont,
      '<h2>Clases y objetos</h2>' +
      '<p>Una <b>clase</b> es un molde; un <b>objeto</b> es algo hecho con ese molde. Si <i>Perro</i> es la clase, tu perro <i>Firulais</i> es un objeto (una <b>instancia</b>). Las clases juntan <b>datos</b> (atributos) y <b>acciones</b> (métodos) en un mismo lugar. Corre cada celda para verlo.</p>');

    prosa(cont, '<h3>1 · Definir una clase: <code>__init__</code> y <code>self</code></h3><p><code>__init__</code> es el <b>constructor</b>: corre al crear el objeto y fija sus atributos. <code>self</code> es el propio objeto — así cada instancia guarda sus propios datos.</p>');
    tryHint(cont);
    celda(cont,
      'class Perro:\n' +
      '    def __init__(self, nombre, edad):\n' +
      '        self.nombre = nombre\n' +
      '        self.edad = edad\n\n' +
      '# crear objetos (instancias):\n' +
      'firu = Perro("Firulais", 3)\n' +
      'print(firu.nombre, "tiene", firu.edad, "anios")');
    callout(cont, 'Cada objeto es independiente: crea <code>otro = Perro("Lola", 5)</code> y verás que <code>firu</code> no cambia. Mismo molde, datos distintos.', 'var(--azul)');

    prosa(cont, '<h3>2 · Métodos</h3><p>Un <b>método</b> es una función que vive dentro de la clase y actúa sobre el objeto. Siempre recibe <code>self</code> como primer parámetro.</p>');
    celda(cont,
      'class Perro:\n' +
      '    def __init__(self, nombre):\n' +
      '        self.nombre = nombre\n\n' +
      '    def ladrar(self):\n' +
      '        return f"{self.nombre} dice: Guau!"\n\n' +
      'firu = Perro("Firulais")\n' +
      'print(firu.ladrar())');

    prosa(cont, '<h3>3 · Estado que cambia</h3><p>Los métodos pueden <b>modificar</b> los atributos del objeto. Aquí una cuenta que sube y baja.</p>');
    celda(cont,
      'class Cuenta:\n' +
      '    def __init__(self, saldo=0):\n' +
      '        self.saldo = saldo\n\n' +
      '    def depositar(self, monto):\n' +
      '        self.saldo = self.saldo + monto\n\n' +
      '    def retirar(self, monto):\n' +
      '        if monto <= self.saldo:\n' +
      '            self.saldo = self.saldo - monto\n' +
      '        else:\n' +
      '            print("Fondos insuficientes")\n\n' +
      'c = Cuenta(100)\n' +
      'c.depositar(50)\n' +
      'c.retirar(30)\n' +
      'print("Saldo:", c.saldo)   # 120');

    prosa(cont, '<h3>4 · Herencia</h3><p>Una clase puede <b>heredar</b> de otra: reutiliza lo que ya existe y agrega o cambia lo suyo. <code>Gato</code> es un <code>Animal</code>, pero maúlla.</p>');
    celda(cont,
      'class Animal:\n' +
      '    def __init__(self, nombre):\n' +
      '        self.nombre = nombre\n' +
      '    def describir(self):\n' +
      '        return f"Soy {self.nombre}"\n\n' +
      'class Gato(Animal):           # hereda de Animal\n' +
      '    def hablar(self):\n' +
      '        return "Miau"\n\n' +
      'g = Gato("Michi")\n' +
      'print(g.describir())   # metodo heredado\n' +
      'print(g.hablar())      # metodo propio');

    prosa(cont, '<h3>5 · ¿Por qué clases?</h3><p>Cuando un programa crece, agrupar datos y acciones del mismo concepto (un usuario, un pedido, una figura) lo hace más fácil de entender y mantener. Es la base de la <b>programación orientada a objetos</b>.</p>');

    prosa(cont, '<h3>6 · Tu turno</h3><p>Completa la clase <code>Rectangulo</code> para que su método <code>area</code> devuelva base × altura.</p>');
    celda(cont,
      'class Rectangulo:\n' +
      '    def __init__(self, base, altura):\n' +
      '        self.base = base\n' +
      '        self.altura = altura\n\n' +
      '    def area(self):\n' +
      '        return \n\n' +
      'r = Rectangulo(4, 5)\n' +
      'print("Area:", r.area())   # 20');
    callout(cont, 'Si <code>r.area()</code> imprime <code>20</code>, ¡cerraste los fundamentos de POO! Pasa al <b>Quiz</b>.', 'var(--verde)');
  }

  var QUIZ = [
    { p: "¿Qué es un objeto respecto a su clase?", op: ["Un sinónimo de clase", "Una instancia creada a partir del molde de la clase", "Una función de la clase", "Un atributo"], ok: 1, porque: "La <b>clase</b> es el molde; el <b>objeto</b> es una <b>instancia</b> concreta hecha con ese molde." },
    { p: "¿Para qué sirve <code>__init__</code>?", op: ["Para destruir el objeto", "Es el constructor: fija los atributos al crear el objeto", "Para imprimir el objeto", "Para heredar"], ok: 1, porque: "<code>__init__</code> es el <b>constructor</b>: se ejecuta al crear la instancia y define sus atributos." },
    { p: "¿Qué representa <code>self</code> dentro de un método?", op: ["La clase entera", "El propio objeto (la instancia actual)", "Una variable global", "El valor de retorno"], ok: 1, porque: "<code>self</code> es el <b>propio objeto</b>: por eso cada instancia guarda sus propios atributos (<code>self.nombre</code>)." },
    { p: "Con <code>class Gato(Animal):</code>, ¿qué ocurre?", op: ["Gato borra a Animal", "Gato hereda de Animal: reutiliza sus métodos y atributos", "Animal hereda de Gato", "Da error"], ok: 1, porque: "Es <b>herencia</b>: <code>Gato</code> recibe lo de <code>Animal</code> y puede agregar o cambiar lo suyo." },
    { p: "¿Cómo se llama al método <code>ladrar</code> de un objeto <code>firu</code>?", op: ["<code>ladrar(firu)</code>", "<code>firu.ladrar()</code>", "<code>Perro.ladrar</code>", "<code>firu->ladrar()</code>"], ok: 1, porque: "Se usa la notación de punto: <code>firu.ladrar()</code>. El objeto se pasa solo como <code>self</code>." }
  ];

  E.registrar({
    id: "py-clases",
    grupo: "py-fundamentos",
    lenguaje: "py",
    orden: 5,
    titulo: "Clases y objetos",
    sub: "Python · Fundamentos",
    resumen: "class, __init__, self, métodos y herencia: agrupar datos y acciones en objetos — los fundamentos de la POO, con código en vivo.",
    chips: [{ k: "Nivel", v: "Intermedio" }, { k: "Práctica", v: "Código en vivo" }],
    pestanas: {
      leccion: { titulo: "Lección", render: function (cont) { leccion(cont); } },
      quiz: ui.pestanaQuiz("py-clases", QUIZ)
    }
  });
})();
