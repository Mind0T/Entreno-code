let rangoNumeroAleatorio;
let numeroSecreto;
let numeroUsuario;
let intentos;
let maxIntentos;
let listaNumerosSorteados=[];

function asignarTextoElemento(elemento,texto)
    {
        let titulo=document.querySelector(elemento);
        titulo.innerHTML=texto;
    }

function verificarIntento()
    {
        
        numeroUsuario=parseInt(document.getElementById('valorUsuario').value);
        console.log(`numero de intentos ${intentos} restan: ${maxIntentos}`);
        
        if(numeroUsuario===numeroSecreto)
            {
                asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos==1 ? 'intento':'intentos')} `);
                document.getElementById('reiniciar').removeAttribute('disabled'); // para cuando acierte el numero se habilite el boton
            }
        else   
            {
                if(numeroUsuario>numeroSecreto)
                    {
                        asignarTextoElemento('p',`El numero secreto es menor<br>Te quedan: ${maxIntentos} ${maxIntentos>1 ? 'intentos' : 'intento'}<br>Rango entre el 1 y el ${rangoNumeroAleatorio}`);
                    }
                else   
                    {
                        asignarTextoElemento('p',`El numero secreto es mayor<br>Te quedan: ${maxIntentos} ${maxIntentos>1 ? 'intentos' : 'intento'}<br>Rango entre el 1 y el ${rangoNumeroAleatorio}`);
                    }
                if (maxIntentos==0)
                    {
                        asignarTextoElemento('h1','GAME OVER');
                        asignarTextoElemento('p',`Numero de intetos disponibles ${maxIntentos}. El numero era el ${numeroSecreto}`);
                        document.getElementById('reiniciar').removeAttribute('disabled');
                    }
                intentos++;
                maxIntentos--;
                limpiarCaja();
            }
        
        return;
    }

function rangoNoAleatorio()
    {
        return Math.floor(Math.random()*10+1)*10; // darle a100
    }

function condicionesIniciales()
    {
        intentos=1;
        rangoNumeroAleatorio=rangoNoAleatorio();
        maxIntentos=rangoNumeroAleatorio<=20 ? 3 : 6;
        asignarTextoElemento('h1','Adivina el numero secreto');
        asignarTextoElemento('p',`Ingrese un numero entre el 1 y el ${rangoNumeroAleatorio} tienes: ${maxIntentos+1} intentos`);
        numeroSecreto=generarNumeroSecreto();
        console.log(`Veamos el numero secreto ${numeroSecreto}`);
        console.log(`Rango entre 1 y el ${rangoNumeroAleatorio}`);
        console.log(listaNumerosSorteados);
        intentos=1;
        maxIntentos=rangoNumeroAleatorio<=20 ? 3 : 6;
    }
    
function reiniciarJuego()
    {
        //limpiar caja
        limpiarCaja();
        //Indicar mensaje de intervalo de numeros
        //Generar nuevo numero aleatorio al jugador
        //Reiniciar contador
        condicionesIniciales();
        //Deshabilitar boton de nuevo juego
        document.getElementById('reiniciar').setAttribute('disabled','true'); //Aca se le devuelve el atributo para desahabilitar el boton de nuevo juego
    }

function limpiarCaja()
    {
        document.getElementById('valorUsuario').value='';
    }

function generarNumeroSecreto()
    {
        let numeroGenerado=Math.floor(Math.random()*rangoNumeroAleatorio)+1;
        //Si ya sorteamos todos los numeros
        if(listaNumerosSorteados.length==rangoNumeroAleatorio)
            {
                asignarTextoElemento('p','Ya se sortearon todos los numeros posibles')
            }

        else
            {
                //Si el numero generado esta incluido en la lista 
                if(listaNumerosSorteados.includes(numeroGenerado))
                    {
                        return generarNumeroSecreto();
                    }
                else
                    {
                        listaNumerosSorteados.push(numeroGenerado);
                        return numeroGenerado;
                    }
            }
        
    }

condicionesIniciales();
//Asignar texto a mis elementos desde la funcion

