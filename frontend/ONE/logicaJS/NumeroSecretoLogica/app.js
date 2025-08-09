//comentario
//uso de comillas indistinto
//usar el punto y coma
//let vendria a ser un variable cuando se declara

//alert('Hola mundo');
//let numeroDeUsuario=prompt("Me indicas un numero porfavor")
//console.log(numeroUsuario);]

/*if (numeroDeUsuario==numeroSecreto){
    alert('Acertaste el numero');\
}
else
    {
        alert('Lo siento, no acertaste el numero');
    }
        
    typeof(variable); lanza el tipo de valor
    parseInt(variable); recastea la variable esto es importante en operar logico === que compara valores y tipo de datos, como siempre lo que entra estra como string

    Math.floor(Math.random()*100)+1; genera un numero aleatorio entre 1 y 100

    */


//variables
let numMax=Math.floor(Math.random()*10+1)*10;
let numeroSecreto=Math.floor(Math.random()*numMax)+1;
let numeroUsuario=0;
let intentos=1;
//let palabraIntento='intento';
let noIntentos=numMax<=20 ? 5 : 8;
console.log(typeof(numeroSecreto),`El numero secreto es: ${numeroSecreto}`);


while(numeroUsuario!=numeroSecreto)
    {
        alert(`Vas por  ${intentos} ${intentos==1 ? 'intento' : 'intentos'}. Te quedan ${noIntentos-intentos} ${noIntentos-intentos>1 ? 'intentos' : 'intento'}`);
        numeroUsuario=prompt(`Ingrese un numero entre 1 al ${numMax} y veremos si le atinas`);
        console.log(typeof(numeroUsuario),numeroUsuario);
        //Condicional
        if (numeroUsuario==numeroSecreto)
            {
                alert(`Felicidades acertaste es: ${numeroUsuario}. Lo lograste en ${intentos} ${intentos==1 ?'intento': 'intentos'}`); //Para insertar el valor de una variable coloco comillas invertidas y ${variable}
            }
        else
            {
                if(numeroUsuario<numeroSecreto)
                    {
                        alert(`Lo siento no acertaste tu metiste: ${numeroUsuario} y el numero a adivinar es mayor a este`);
                    }
                else
                    {
                        alert(`Lo siento no acertaste tu metiste: ${numeroUsuario} y el numero a adivinar es menor a este `);
                    }
                    intentos=intentos+1;
                    //palabraIntento='intentos';
                    if(intentos>=noIntentos)
                        {
                            alert(`GAME OVER el numero era: ${numeroSecreto}`);
                            break;
                        }
            }
        
    }
