
let titulo=document.querySelector('h1');
titulo.innerHTML='Hora del desafio';
let cuidadPrompt;
let nombreUsuario;
let primerNumero;
let segundoNumero;
let suma;

function botonConsole()
    {
        alert('El boton fue cliclado');
    }

function botonPrompt()
    {
        nombreUsuario=prompt('Hola, como te llamas?');
        cuidadPrompt=prompt('Ingrese alguna ciudad de Mexico');
        alert(`Hola ${nombreUsuario}, estuve en la ciudad de ${cuidadPrompt} y me acorde de ti`);
    }

function botonAlert()
    {
        alert('Estoy amando Java Script');
    }

function botonSuma()
    {
        alert("Hola que tal ingresa dos numeros y los sumare");
        primerNumero=prompt('Primer numero:');
        segundoNumero=prompt('Segundo numero:');
        //suma=parseInt(primerNumero)+parseInt(segundoNumero);
        alert(`La suma de ${primerNumero} y ${segundoNumero} es: ${parseInt(primerNumero)+parseInt(segundoNumero)}`);
    }